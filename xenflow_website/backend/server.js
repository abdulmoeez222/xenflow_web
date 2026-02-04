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
const nodemailer = require('nodemailer');

const app = express();
app.set('trust proxy', 1); // Trust first proxy (Render, Heroku, etc.)
const PORT = process.env.PORT || 5000;

// Supabase client initialization
let supabase;
try {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    console.warn('⚠️  Supabase environment variables not set. Contact form will not work.');
  } else {
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    console.log('✅ Supabase client initialized');
  }
} catch (error) {
  console.error('❌ Failed to initialize Supabase:', error);
}

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
        'http://localhost:5173',          // Local dev (Vite default)
        'http://localhost:5174',          // Local dev (alternative port)
        /^http:\/\/localhost:\d+$/        // Allow any localhost port for dev
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
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

// Chatbot routes
const chatRoutes = require('./routes/chat');
app.use('/api', chatRoutes);

// Contact form endpoint with proper validation
app.post('/api/contact', 
  // Validation middleware
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters')
      .escape(),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
    body('company')
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ max: 100 })
      .withMessage('Company name cannot exceed 100 characters')
      .escape(),
    body('message')
      .trim()
      .notEmpty()
      .withMessage('Message is required')
      .isLength({ min: 10, max: 1000 })
      .withMessage('Message must be between 10 and 1000 characters')
      .escape()
  ],
  async (req, res) => {
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

      // Validate Supabase is configured
      if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
        console.error('❌ Supabase configuration missing');
        return res.status(500).json({
          success: false,
          message: 'Server configuration error - Supabase not configured'
        });
      }

      if (!supabase) {
        console.error('❌ Supabase client not initialized');
        return res.status(500).json({
          success: false,
          message: 'Server configuration error - Supabase client not initialized'
        });
      }

      // Create new contact
      const { data, error } = await supabase
        .from('contacts')
        .insert([{
          name,
          email,
          company: company || null,
          message,
          timestamp: new Date().toISOString()
        }])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({
          success: false,
          message: 'Failed to save contact',
          error: process.env.NODE_ENV === 'development' ? error.message : 'Database error'
        });
      }

      if (!data || data.length === 0) {
        console.error('No data returned from Supabase');
        return res.status(500).json({
          success: false,
          message: 'Failed to save contact - no data returned'
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
  }
);

// Booking form endpoint with comprehensive validation and email
app.post('/api/booking',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters')
      .escape(),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
    body('company')
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ max: 100 })
      .withMessage('Company name cannot exceed 100 characters')
      .escape(),
    body('date')
      .trim()
      .notEmpty()
      .withMessage('Date is required')
      .isISO8601()
      .withMessage('Please provide a valid date'),
    body('time')
      .trim()
      .notEmpty()
      .withMessage('Time is required')
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .withMessage('Please provide a valid time (HH:MM format)'),
    body('message')
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ max: 1000 })
      .withMessage('Message cannot exceed 1000 characters')
      .escape()
  ],
  async (req, res) => {
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

      const { name, email, company, date, time, message } = req.body;
      
      // Format date for display
      const bookingDate = new Date(date);
      const formattedDate = bookingDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });

      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          name,
          email,
          company: company || '',
          date,
          time,
          purpose: message || '',
          status: 'pending',
          timestamp: new Date().toISOString()
        }])
        .select();

      if (error || !data) {
        console.error('Booking submission error:', error, data);
        return res.status(500).json({
          success: false,
          message: 'Internal server error',
          error: error?.message || 'Failed to save booking'
        });
      }

      // Send comprehensive email notification
      if (data && data[0] && process.env.GMAIL_USER && process.env.GMAIL_PASS) {
        try {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL_USER,
              pass: process.env.GMAIL_PASS
            }
          });

          const emailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #B1001E 0%, #D7263D 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
                .detail-row { margin: 15px 0; padding: 10px; background: white; border-left: 4px solid #B1001E; }
                .label { font-weight: bold; color: #B1001E; }
                .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>🎯 New Meeting Booking Request</h2>
                </div>
                <div class="content">
                  <div class="detail-row">
                    <span class="label">Name:</span> ${name}
                  </div>
                  <div class="detail-row">
                    <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
                  </div>
                  ${company ? `<div class="detail-row"><span class="label">Company:</span> ${company}</div>` : ''}
                  <div class="detail-row">
                    <span class="label">Meeting Date:</span> ${formattedDate}
                  </div>
                  <div class="detail-row">
                    <span class="label">Meeting Time:</span> ${time}
                  </div>
                  ${message ? `<div class="detail-row"><span class="label">Message:</span><br>${message.replace(/\n/g, '<br>')}</div>` : ''}
                  <div class="detail-row">
                    <span class="label">Booking ID:</span> ${data[0].id}
                  </div>
                  <div class="detail-row">
                    <span class="label">Submitted:</span> ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' })}
                  </div>
                </div>
                <div class="footer">
                  <p>This is an automated notification from XenFlowTech booking system.</p>
                  <p>Please respond to the client at: <a href="mailto:${email}" style="color: #B1001E;">${email}</a></p>
                </div>
              </div>
            </body>
            </html>
          `;

          const mailOptions = {
            from: `"XenFlowTech Booking System" <${process.env.GMAIL_USER}>`,
            to: 'xenflowtech@gmail.com',
            subject: `📅 New Meeting Booking: ${name} - ${formattedDate} at ${time}`,
            text: `
New Meeting Booking Request

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
Meeting Date: ${formattedDate}
Meeting Time: ${time}
${message ? `Message:\n${message}` : ''}

Booking ID: ${data[0].id}
Submitted: ${new Date().toLocaleString()}

Please respond to the client at: ${email}
            `.trim(),
            html: emailHtml
          };

          await transporter.sendMail(mailOptions);
          console.log('✅ Booking email sent successfully');
        } catch (emailError) {
          console.error('❌ Error sending booking email:', emailError);
          // Don't fail the request if email fails
        }
      }

      res.status(201).json({
        success: true,
        message: 'Meeting booking submitted successfully! We\'ll confirm via email shortly.',
        data: {
          id: data[0].id,
          name: data[0].name,
          email: data[0].email,
          date: formattedDate,
          time: data[0].time,
          status: 'pending'
        }
      });

    } catch (error) {
      console.error('Booking submission error (catch):', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message || 'An unexpected error occurred'
      });
    }
  }
);

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