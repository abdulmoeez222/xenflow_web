const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const { body, validationResult } = require('express-validator');
const session = require('express-session');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import models
const Contact = require('./models/Contact');
const Booking = require('./models/Booking');

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Session middleware
app.use(session({
  name: 'xenflow.sid',
  secret: process.env.SESSION_SECRET || 'xenflowtech-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,      // Only true if using HTTPS
    httpOnly: true,     // Prevents JS access to cookies
    sameSite: false     // Disable SameSite for local development
  }
}));

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'XenFlowTech API is running',
        timestamp: new Date().toISOString()
    });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                message: 'Validation failed',
                errors: errors.array() 
            });
        }

        const { name, email, company, message } = req.body;

        // Create new contact
        const contact = new Contact({
            name,
            email,
            company: company || '',
            message,
            timestamp: new Date()
        });

        await contact.save();

        res.status(201).json({
            success: true,
            message: 'Contact saved successfully',
            data: {
                id: contact._id,
                name: contact.name,
                email: contact.email,
                timestamp: contact.timestamp
            }
        });

    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
        });
    }
});

// Booking form endpoint
app.post('/api/booking', async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                message: 'Validation failed',
                errors: errors.array() 
            });
        }

        const { name, email, company, date, time, purpose } = req.body;

        // Create new booking
        const booking = new Booking({
            name,
            email,
            company: company || '',
            date,
            time,
            purpose,
            status: 'pending',
            timestamp: new Date()
        });

        await booking.save();

        res.status(201).json({
            success: true,
            message: 'Booking saved successfully',
            data: {
                id: booking._id,
                name: booking.name,
                email: booking.email,
                date: booking.date,
                time: booking.time,
                purpose: booking.purpose,
                status: booking.status,
                timestamp: booking.timestamp
            }
        });

    } catch (error) {
        console.error('Booking submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
        });
    }
});

// Admin authentication endpoints
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied: not an admin' });
    }
    req.session.admin = true;
    req.session.username = user.username;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/admin/logout', (req, res) => {
  req.session.destroy(() => res.json({ success: true }));
});

app.get('/api/admin/session', (req, res) => {
  res.json({ loggedIn: !!req.session.admin });
});

function requireAdmin(req, res, next) {
  if (req.session && req.session.admin) return next();
  res.status(401).json({ success: false, message: 'Unauthorized' });
}

app.get('/api/admin/contacts', requireAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ timestamp: -1 }).limit(100);
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.get('/api/admin/bookings', requireAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ timestamp: -1 }).limit(100);
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Change admin password (POST /api/admin/change-password)
app.post('/api/admin/change-password', requireAdmin, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findOne({ username: req.session.username });
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ success: true, message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Start server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// MongoDB connection function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

startServer();

module.exports = app; 