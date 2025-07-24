const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const { body, validationResult } = require('express-validator');
const session = require('express-session');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.set('trust proxy', 1); // Trust first proxy (Render, Heroku, etc.)
const PORT = process.env.PORT || 5000;

// Supabase client initialization
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

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
    origin: [
        'https://xenflow-web.vercel.app', // Vercel frontend
        'http://localhost:5173'           // Local dev
    ],
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
        const { data, error } = await supabase
            .from('contacts')
            .insert([{
            name,
            email,
            company: company || '',
            message,
                timestamp: new Date().toISOString()
            }])
            .select(); // Ensure inserted row is returned

        if (error || !data) {
            console.error('Contact submission error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error
            });
        }

        res.status(201).json({
            success: true,
            message: 'Contact saved successfully',
            data: {
                id: data[0].id,
                name: data[0].name,
                email: data[0].email,
                timestamp: data[0].timestamp
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
        const { data, error } = await supabase
            .from('bookings')
            .insert([{
            name,
            email,
            company: company || '',
            date,
            time,
            purpose,
            status: 'pending',
                timestamp: new Date().toISOString()
            }]);

        if (error) {
            console.error('Booking submission error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Booking saved successfully',
            data: {
                id: data[0].id,
                name: name,
                email: email,
                date: date,
                time: time,
                purpose: purpose,
                status: 'pending',
                timestamp: data[0].timestamp
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
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username);

    if (error || !data || data.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const user = data[0];
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
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching contacts:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.get('/api/admin/bookings', requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching bookings:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Change admin password (POST /api/admin/change-password)
app.post('/api/admin/change-password', requireAdmin, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', req.session.username);

    if (error || !data || data.length === 0) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }
    const user = data[0];
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
    }
    const { error: updateError } = await supabase
      .from('users')
      .update({ password: await bcrypt.hash(newPassword, 10) })
      .eq('username', req.session.username);

    if (updateError) {
      console.error('Error changing password:', updateError);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
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
        // await connectDB(); // REMOVED
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// REMOVED: const connectDB = async () => { ... }
// REMOVED: await connectDB();

startServer();

module.exports = app; 