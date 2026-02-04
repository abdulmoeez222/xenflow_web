# Supabase Project Setup Guide

This guide will help you set up a new Supabase project for XenFlowTech.

## Step 1: Create New Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click **"New Project"**
4. Fill in:
   - **Name**: `xenflow-tech` (or any name you prefer)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is fine for now
5. Click **"Create new project"**
6. Wait 2-3 minutes for project to initialize

## Step 2: Get Your Connection Details

Once the project is ready:

1. Go to **Settings** → **API**
2. Copy these values (you'll need them for Render):
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys" → "anon public")

## Step 3: Create Database Tables

Go to **SQL Editor** in Supabase dashboard and run these SQL scripts:

### 3.1 Create `bookings` Table

```sql
-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  purpose TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow inserts from anyone (for booking form)
CREATE POLICY "Allow public inserts" ON bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow service role to read all bookings (for admin dashboard)
CREATE POLICY "Allow service role read" ON bookings
  FOR SELECT
  TO service_role
  USING (true);
```

### 3.2 Create `contacts` Table

```sql
-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_timestamp ON contacts(timestamp DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policy: Allow inserts from anyone (for contact form)
CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow service role to read all contacts (for admin dashboard)
CREATE POLICY "Allow service role read" ON contacts
  FOR SELECT
  TO service_role
  USING (true);
```

### 3.3 Create `users` Table (for Admin Authentication)

```sql
-- Create users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  admin BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on username
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role to read users (for admin login)
CREATE POLICY "Allow service role read users" ON users
  FOR SELECT
  TO service_role
  USING (true);

-- Policy: Allow service role to update users (for password changes)
CREATE POLICY "Allow service role update users" ON users
  FOR UPDATE
  TO service_role
  USING (true);
```

### 3.4 Create Admin User

After creating the tables, create an admin user using the provided script:

**Recommended: Using the Backend Script**

1. Get your **Service Role Key** (recommended) or **Anon Key**:
   - Go to Supabase Dashboard → **Settings** → **API**
   - Copy **service_role** key (secret) - This bypasses RLS and is safer for admin operations
   - Or use **anon public** key if service_role is not available

2. Create a `.env` file in the `backend` directory with:
   ```
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```
   Or if using anon key:
   ```
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. Run the script:
   ```bash
   cd xenflow_website/backend
   node createAdminSupabase.js
   ```

4. Enter username (default: `admin`) and password when prompted

**Alternative: Quick Setup SQL File**

You can also run the entire setup at once:
1. Open `backend/supabase_setup.sql` in Supabase SQL Editor
2. Run the entire script
3. Then create admin user using the script above

## Step 4: Update Render Environment Variables

1. Go to your **Render Dashboard** → Your Backend Service → **Environment**
2. Add/Update these variables:

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-public-key-here
```

3. Click **"Save Changes"**
4. Render will automatically redeploy

## Step 5: Verify Setup

### Test Supabase Connection

After Render redeploys, visit:
```
https://xenflow-backend.onrender.com/api/test/supabase
```

You should see:
```json
{
  "success": true,
  "message": "Supabase connection successful",
  "supabaseUrl": "https://...",
  "dataReceived": true
}
```

### Test Booking Form

1. Go to `https://www.xenflow.tech/contact`
2. Fill out the booking form
3. Submit and check if it succeeds

### Check Database

1. Go to Supabase Dashboard → **Table Editor**
2. Check `bookings` table - you should see new entries
3. Check `contacts` table - contact form submissions should appear here

## Troubleshooting

### "fetch failed" errors
- ✅ Check `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set correctly in Render
- ✅ Verify the Supabase project is active (not paused)
- ✅ Check Supabase dashboard → Settings → API for correct values

### "Row Level Security policy violation"
- ✅ Make sure RLS policies are created (run the SQL scripts above)
- ✅ Check that policies allow `anon` role to INSERT

### "Table does not exist"
- ✅ Run all SQL scripts in Step 3
- ✅ Verify table names match: `bookings`, `contacts`, `users`

### Admin login not working
- ✅ Create admin user using `createAdmin.js` script
- ✅ Verify `users` table has a row with `role='admin'`

## Security Notes

- ✅ RLS (Row Level Security) is enabled on all tables
- ✅ Public can INSERT but not SELECT (admin uses service role)
- ✅ Passwords are hashed with bcrypt
- ✅ Admin routes are protected with session authentication

## Next Steps

1. ✅ Test booking form submission
2. ✅ Test contact form submission  
3. ✅ Test admin login at `/admin/login`
4. ✅ Set up email notifications (add `GMAIL_USER` and `GMAIL_PASS` to Render env vars)

---

**Need Help?** Check the logs:
- Render logs: Dashboard → Service → Logs
- Supabase logs: Dashboard → Logs → API Logs
