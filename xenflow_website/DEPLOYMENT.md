# XenFlowTech Deployment Guide

This guide provides detailed instructions for deploying the XenFlowTech website to production environments.

## 🚀 Deployment Overview

### Frontend Deployment Options
- **Netlify** (Recommended for beginners)
- **Vercel** (Great for React apps)
- **GitHub Pages** (Free hosting)

### Backend Deployment Options
- **Render** (Recommended - free tier available)
- **Heroku** (Popular choice)
- **Railway** (Modern alternative)

## 📱 Frontend Deployment

### Option 1: Netlify (Recommended)

#### Step 1: Prepare Your Files
1. Ensure all frontend files are in the `frontend/` directory
2. Verify `index.html` is in the root of the frontend folder

#### Step 2: Deploy to Netlify
1. Go to [Netlify](https://netlify.com) and sign up/login
2. Click "New site from Git" or drag and drop the `frontend` folder
3. If using Git:
   - Connect your GitHub repository
   - Set build command: `echo "No build required"`
   - Set publish directory: `frontend`
4. Click "Deploy site"

#### Step 3: Configure Custom Domain (Optional)
1. Go to "Domain settings" in your Netlify dashboard
2. Click "Add custom domain"
3. Follow the DNS configuration instructions

### Option 2: Vercel

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
cd frontend
vercel
```

#### Step 3: Follow Prompts
- Link to existing project or create new
- Set project name
- Confirm deployment

### Option 3: GitHub Pages

#### Step 1: Create GitHub Repository
1. Create a new repository on GitHub
2. Upload your frontend files

#### Step 2: Enable GitHub Pages
1. Go to repository Settings
2. Scroll to "Pages" section
3. Select source branch (usually `main`)
4. Save

## 🔧 Backend Deployment

### Option 1: Render (Recommended)

#### Step 1: Prepare Backend
1. Ensure all backend files are in the `backend/` directory
2. Verify `package.json` exists and has correct scripts

#### Step 2: Deploy to Render
1. Go to [Render](https://render.com) and sign up/login
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `xenflowtech-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

#### Step 3: Set Environment Variables
1. Go to "Environment" tab
2. Add the following variables:
   ```
   MONGODB_URI=your-mongodb-atlas-connection-string
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-domain.netlify.app
   PORT=10000
   ```

#### Step 4: Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Copy the provided URL (e.g., `https://xenflowtech-backend.onrender.com`)

### Option 2: Heroku

#### Step 1: Install Heroku CLI
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Windows
# Download from https://devcenter.heroku.com/articles/heroku-cli
```

#### Step 2: Login and Create App
```bash
heroku login
heroku create xenflowtech-backend
```

#### Step 3: Set Environment Variables
```bash
heroku config:set MONGODB_URI="your-mongodb-atlas-connection-string"
heroku config:set NODE_ENV="production"
heroku config:set FRONTEND_URL="https://your-frontend-domain.netlify.app"
```

#### Step 4: Deploy
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

### Option 3: Railway

#### Step 1: Connect Repository
1. Go to [Railway](https://railway.app)
2. Connect your GitHub repository
3. Select the backend directory

#### Step 2: Configure Environment
1. Set environment variables in Railway dashboard
2. Add the same variables as Render/Heroku

#### Step 3: Deploy
1. Railway will automatically detect Node.js
2. Deploy will start automatically

## 🔗 Connect Frontend to Backend

### Update API Base URL
1. In your frontend code, update the fetch URLs to point to your backend
2. Replace `http://localhost:5000` with your backend URL

### Example Update
```javascript
// In Contact.js and BookMeeting.js, update the fetch URLs:
const response = await fetch('https://your-backend-url.onrender.com/api/contact', {
    // ... rest of the code
});
```

## 🗄️ MongoDB Atlas Production Setup

### Step 1: Create Production Cluster
1. Go to MongoDB Atlas dashboard
2. Create a new cluster (M0 Free tier is fine for starting)
3. Choose your preferred cloud provider and region

### Step 2: Configure Network Access
1. Go to "Network Access"
2. Add your deployment platform's IP ranges:
   - **Render**: `0.0.0.0/0` (allow all)
   - **Heroku**: `0.0.0.0/0` (allow all)
   - **Railway**: `0.0.0.0/0` (allow all)

### Step 3: Create Database User
1. Go to "Database Access"
2. Create a new user with read/write permissions
3. Save the username and password

### Step 4: Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your actual password
5. Add `/xenflowtech` before the query parameters

## 🔒 Security Considerations

### Environment Variables
- Never commit `.env` files to Git
- Use deployment platform's environment variable system
- Rotate secrets regularly

### CORS Configuration
- Update `FRONTEND_URL` in backend environment variables
- Ensure it matches your frontend domain exactly

### Rate Limiting
- The backend includes rate limiting (100 requests per 15 minutes)
- Adjust in `server.js` if needed

## 📊 Monitoring and Analytics

### Add Google Analytics
1. Create a Google Analytics account
2. Get your tracking ID
3. Add to frontend `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Health Monitoring
- Backend includes `/api/health` endpoint
- Use uptime monitoring services like UptimeRobot

## 🚨 Troubleshooting

### Common Deployment Issues

#### Frontend Issues
1. **404 Errors**: Ensure `index.html` is in the correct location
2. **Styling Issues**: Check if CDN links are accessible
3. **API Errors**: Verify backend URL is correct

#### Backend Issues
1. **MongoDB Connection**: Check connection string and network access
2. **CORS Errors**: Verify `FRONTEND_URL` environment variable
3. **Port Issues**: Ensure `PORT` environment variable is set

#### Debugging Steps
1. Check deployment logs in your platform's dashboard
2. Test API endpoints with Postman or curl
3. Verify environment variables are set correctly
4. Check browser console for frontend errors

### Performance Optimization

#### Frontend
- Images are already optimized with Unsplash CDN
- CSS and JS are minified via CDN
- Consider adding image lazy loading for better performance

#### Backend
- Compression is enabled
- Rate limiting prevents abuse
- Database indexes are configured for performance

## 🔄 Continuous Deployment

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: |
          # Add your deployment commands here
```

## 📞 Support

If you encounter issues during deployment:
1. Check the troubleshooting section above
2. Review deployment platform documentation
3. Contact support at xenflowtech@gmail.com

## 🎉 Post-Deployment Checklist

- [ ] Frontend loads without errors
- [ ] Backend API responds to health check
- [ ] Contact form submits successfully
- [ ] Booking form submits successfully
- [ ] Chatbot works correctly
- [ ] All pages are accessible
- [ ] Mobile responsiveness works
- [ ] SSL certificate is active (https)
- [ ] Google Analytics is tracking
- [ ] Environment variables are secure

---

**Happy Deploying! 🚀** 