# XenFlowTech - AI Automation Agency Website

A professional, dark-themed website for XenFlowTech AI agency, featuring modern design, AI automation services, and full-stack functionality with MongoDB integration.

## 🌟 Features

### Frontend
- **Modern Dark Theme** with gradient backgrounds and neon accents
- **Responsive Design** optimized for all devices
- **Interactive Components** with smooth animations and hover effects
- **AI Chatbot** with predefined responses and FAQ handling
- **Contact Form** with validation and MongoDB storage
- **Meeting Booking System** with date/time selection
- **Portfolio Showcase** with case studies and project details
- **Blog Section** with AI automation insights
- **SEO Optimized** with meta tags and semantic HTML

### Backend
- **Node.js/Express API** with robust error handling
- **MongoDB Atlas Integration** for data persistence
- **Input Validation & Sanitization** for security
- **Rate Limiting** to prevent abuse
- **CORS Configuration** for cross-origin requests
- **Helmet Security** middleware
- **Compression** for performance optimization

### AI Automation Services
1. **Marketing Automation** - Email campaigns, social media, customer segmentation
2. **Automated Workflows** - HR onboarding, supply chain, data processing
3. **AI-Powered Chatbots** - Customer support, lead generation, FAQ automation
4. **24/7 Customer Support** - Helpdesk automation, ticketing systems

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Modern web browser

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Open index.html in your browser:**
   - Double-click `index.html` or
   - Use a local server: `python -m http.server 8000` or `npx serve .`

3. **For development with live reload:**
   ```bash
   # Install live-server globally
   npm install -g live-server
   
   # Start development server
   live-server --port=3000
   ```

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Copy the example file
   cp env.example .env
   
   # Edit .env with your MongoDB Atlas connection string
   nano .env
   ```

4. **Start the server:**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

## 🗄️ MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project

### 2. Create Database Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider and region
4. Click "Create"

### 3. Set Up Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password (save these!)
4. Select "Read and write to any database"
5. Click "Add User"

### 4. Set Up Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your specific IP addresses
5. Click "Confirm"

### 5. Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Add `/xenflowtech` at the end of the URI (before the query parameters)

### 6. Update Environment Variables
```bash
# In backend/.env
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/xenflowtech?retryWrites=true&w=majority
```

## 📁 Project Structure

```
XENFLOW/
├── frontend/
│   ├── index.html              # Main HTML file with React app
│   ├── components/
│   │   ├── App.js              # Main React app component
│   │   ├── Navbar.js           # Navigation component
│   │   ├── Footer.js           # Footer component
│   │   └── Chatbot.js          # AI chatbot widget
│   └── pages/
│       ├── Home.js             # Home page with hero section
│       ├── About.js            # About page with team info
│       ├── Services.js         # AI automation services
│       ├── Portfolio.js        # Case studies and projects
│       ├── Contact.js          # Contact form
│       ├── BookMeeting.js      # Meeting booking form
│       └── Blog.js             # Blog articles
├── backend/
│   ├── server.js               # Express server
│   ├── package.json            # Node.js dependencies
│   ├── env.example             # Environment variables template
│   └── models/
│       ├── Contact.js          # Contact form model
│       └── Booking.js          # Booking form model
└── README.md                   # This file
```

## 🎨 Design Features

### Color Scheme
- **Primary**: #1A1A1A (Dark Gray)
- **Secondary**: #0A1F44 (Deep Blue)
- **Accent**: #00D4FF (Neon Blue)
- **Purple**: #7B2CBF (Vibrant Purple)
- **Text**: #FFFFFF (White)

### Typography
- **Headings**: Poppins (Bold)
- **Body**: Roboto (Regular)

### Animations
- Smooth fade-ins and slide-ups
- Hover effects with scale transforms
- Gradient backgrounds with particle effects
- Card hover animations

## 🔧 API Endpoints

### Contact Form
- **POST** `/api/contact`
- **Body**: `{ name, email, company?, message }`
- **Response**: `{ success: true, message: "Contact saved" }`

### Booking Form
- **POST** `/api/booking`
- **Body**: `{ name, email, company?, date, time, purpose }`
- **Response**: `{ success: true, message: "Booking saved" }`

### Health Check
- **GET** `/api/health`
- **Response**: `{ status: "OK", message: "XenFlowTech API is running" }`

### Admin Endpoints (for future use)
- **GET** `/api/contacts` - Get all contact submissions
- **GET** `/api/bookings` - Get all booking submissions

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)

1. **Netlify:**
   - Drag and drop the `frontend` folder to Netlify
   - Or connect your GitHub repository
   - Set build command: `echo "No build required"`
   - Set publish directory: `frontend`

2. **Vercel:**
   - Install Vercel CLI: `npm i -g vercel`
   - Navigate to frontend: `cd frontend`
   - Deploy: `vercel`

### Backend Deployment (Render/Heroku)

1. **Render:**
   - Connect your GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables in Render dashboard

2. **Heroku:**
   - Install Heroku CLI
   - Create Heroku app: `heroku create your-app-name`
   - Set environment variables: `heroku config:set MONGODB_URI=your-connection-string`
   - Deploy: `git push heroku main`

### Environment Variables for Production

```bash
MONGODB_URI=your-production-mongodb-uri
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
PORT=5000
```

## 🔒 Security Features

- **Input Sanitization** - Prevents XSS attacks
- **Rate Limiting** - Prevents API abuse
- **CORS Configuration** - Controls cross-origin requests
- **Helmet Security** - Adds security headers
- **Data Validation** - Server-side validation with express-validator
- **MongoDB Injection Protection** - Mongoose schema validation

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🎯 SEO Optimization

- Meta tags for all pages
- Open Graph tags for social sharing
- Semantic HTML structure
- Alt text for images
- Proper heading hierarchy
- Fast loading times

## 🔧 Customization

### Adding New Services
1. Edit `frontend/pages/Services.js`
2. Add new service object to the `services` array
3. Include icon, title, description, and use cases

### Modifying Colors
1. Edit the Tailwind config in `frontend/index.html`
2. Update the custom CSS variables
3. Modify gradient classes as needed

### Adding Blog Posts
1. Edit `frontend/pages/Blog.js`
2. Add new post object to the `blogPosts` array
3. Include title, excerpt, content, author, and image

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error:**
   - Check your connection string
   - Verify network access settings
   - Ensure database user has correct permissions

2. **CORS Errors:**
   - Update `FRONTEND_URL` in backend `.env`
   - Check that frontend URL matches exactly

3. **Form Submission Fails:**
   - Check browser console for errors
   - Verify backend server is running
   - Check network tab for API response

4. **Styling Issues:**
   - Clear browser cache
   - Check if Tailwind CSS is loading
   - Verify all CDN links are accessible

## 📞 Support

For support or questions:
- **Email**: xenflowtech@gmail.com
- **Website**: www.xenflowtech.com

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ by XenFlowTech** 