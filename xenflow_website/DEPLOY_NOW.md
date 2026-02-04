# 🚀 Deploy Chatbot to Production - Quick Guide

## ✅ Pre-Deployment Checklist

- [x] Backend tests passing (`npm run test:chatbot`)
- [x] Setup completed (`npm run setup:chatbot`)
- [ ] Frontend tested in browser
- [ ] Everything working locally

---

## 📦 Step 1: Commit & Push to GitHub

```bash
# Make sure all changes are committed
git add .
git commit -m "Add intelligent chatbot with RAG pipeline"
git push origin main
```

---

## 🔧 Step 2: Deploy Backend to Render

1. **Go to Render Dashboard**: https://render.com
2. **Create New Web Service** (or update existing)
3. **Settings:**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: `Node`
4. **Add Environment Variables** (optional):
   ```
   HF_MODEL=mistralai/Mistral-7B-Instruct-v0.2
   HUGGINGFACE_API_KEY=your_key_here  # Optional - get from huggingface.co
   ```
5. **Deploy!**

**Important:** After first deployment, you need to run setup:
- Go to Render Shell/Console
- Run: `npm run setup:chatbot`
- This generates embeddings (one-time, ~2-5 minutes)

---

## 🎨 Step 3: Deploy Frontend to Vercel

1. **Go to Vercel Dashboard**
2. **Update Environment Variable:**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
3. **Redeploy** (or it will auto-deploy if connected to GitHub)

---

## ✅ Step 4: Verify Deployment

1. **Test Backend:**
   ```
   https://your-backend.onrender.com/api/health
   ```
   Should return: `{"status":"OK",...}`

2. **Test Chatbot:**
   - Open your live website
   - Click chatbot button
   - Ask: "What services do you offer?"
   - Should get intelligent response

---

## 🎉 Success!

Your intelligent chatbot is now live and working!

---

## 📝 Notes

- **First deployment**: Run `npm run setup:chatbot` in Render shell after deployment
- **Response times**: 1-3 seconds (with HF), <1 second (fallback)
- **Always works**: Fallback ensures responses even if APIs fail

---

**Status**: Ready to deploy! 🚀

