# 🚀 Quick Setup Checklist

Follow these steps in order to set up your new Supabase project:

## ✅ Step-by-Step Checklist

### 1. Create Supabase Project
- [ ] Go to [supabase.com](https://supabase.com) and sign in
- [ ] Click **"New Project"**
- [ ] Fill in project details (name, password, region)
- [ ] Wait for project to initialize (~2-3 minutes)

### 2. Get Connection Details
- [ ] Go to **Settings** → **API**
- [ ] Copy **Project URL** (e.g., `https://xxxxx.supabase.co`)
- [ ] Copy **anon public** key (under "Project API keys")
- [ ] Save these somewhere safe!

### 3. Create Database Tables
**Option A: Quick Setup (Recommended)**
- [ ] Open `backend/supabase_setup.sql` in Supabase SQL Editor
- [ ] Click **"Run"** to execute the entire script
- [ ] Verify tables created: Go to **Table Editor** → Should see `bookings`, `contacts`, `users`

**Option B: Manual Setup**
- [ ] Follow detailed SQL scripts in `SUPABASE_SETUP.md` (Step 3)

### 4. Update Render Environment Variables
- [ ] Go to Render Dashboard → Your Backend Service → **Environment**
- [ ] Add/Update:
  - `SUPABASE_URL` = Your Project URL
  - `SUPABASE_ANON_KEY` = Your anon public key
- [ ] Click **"Save Changes"** (auto-redeploys)

### 5. Create Admin User
- [ ] Get **Service Role Key**: Supabase Dashboard → Settings → API → Copy `service_role` key (secret)
- [ ] Create `.env` file in `backend/` directory:
  ```
  SUPABASE_URL=https://your-project-id.supabase.co
  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
  ```
  (Or use `SUPABASE_ANON_KEY` if service role not available)
- [ ] Run: `cd xenflow_website/backend && node createAdminSupabase.js`
- [ ] Enter username (default: `admin`) and password
- [ ] Confirm user created successfully

### 6. Verify Everything Works
- [ ] Test Supabase connection:
  ```
  https://xenflow-backend.onrender.com/api/test/supabase
  ```
  Should return: `{"success": true, ...}`

- [ ] Test booking form:
  - Go to `https://www.xenflow.tech/contact`
  - Fill out and submit booking form
  - Check Supabase → Table Editor → `bookings` table for new entry

- [ ] Test admin login:
  - Go to `https://www.xenflow.tech/admin/login`
  - Login with admin credentials
  - Should see admin dashboard

## 🐛 Troubleshooting

### Connection Test Fails
- Check `SUPABASE_URL` and `SUPABASE_ANON_KEY` in Render env vars
- Verify project is active (not paused)
- Check Supabase dashboard → Settings → API for correct values

### Booking Form Returns 500 Error
- Check Render logs for detailed error messages
- Verify tables exist: `bookings`, `contacts`, `users`
- Check RLS policies are set correctly (run SQL script again)

### Admin Login Doesn't Work
- Verify admin user exists: Check `users` table in Supabase
- Make sure password was hashed correctly (use `createAdminSupabase.js`)
- Check Render logs for authentication errors

## 📝 Files Created

- `SUPABASE_SETUP.md` - Detailed setup guide
- `backend/supabase_setup.sql` - Complete SQL setup script
- `backend/createAdminSupabase.js` - Admin user creation script
- `QUICK_SETUP_CHECKLIST.md` - This checklist

## 🎉 You're Done!

Once all checkboxes are checked, your booking system should be fully functional!
