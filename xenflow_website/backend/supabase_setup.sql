-- ============================================
-- XenFlowTech Supabase Database Setup
-- ============================================
-- Run this entire script in Supabase SQL Editor
-- Go to: Supabase Dashboard → SQL Editor → New Query

-- ============================================
-- 1. Create bookings table
-- ============================================
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

-- Indexes for bookings
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public inserts (for booking form)
CREATE POLICY "Allow public inserts" ON bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow service role to read all (for admin dashboard)
CREATE POLICY "Allow service role read" ON bookings
  FOR SELECT
  TO service_role
  USING (true);

-- ============================================
-- 2. Create contacts table
-- ============================================
CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for contacts
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_timestamp ON contacts(timestamp DESC);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public inserts (for contact form)
CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow service role to read all (for admin dashboard)
CREATE POLICY "Allow service role read" ON contacts
  FOR SELECT
  TO service_role
  USING (true);

-- ============================================
-- 3. Create users table (for admin authentication)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  admin BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index on username
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role to read users (for admin login)
CREATE POLICY "Allow service role read users" ON users
  FOR SELECT
  TO service_role
  USING (true);

-- Policy: Allow service role to insert users (for creating admin)
CREATE POLICY "Allow service role insert users" ON users
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy: Allow service role to update users (for password changes)
CREATE POLICY "Allow service role update users" ON users
  FOR UPDATE
  TO service_role
  USING (true);

-- ============================================
-- 4. Create admin user
-- ============================================
-- NOTE: You need to hash the password first using createAdminSupabase.js script
-- Or use this pre-hashed password for "xenflowtech123@aiatuo":
-- 
-- To create admin user, run: node createAdminSupabase.js
-- Or manually insert with a bcrypt-hashed password

-- Example (replace with your own hashed password):
-- INSERT INTO users (username, password, role, admin)
-- VALUES (
--   'admin',
--   '$2a$10$YourBcryptHashedPasswordHere',
--   'admin',
--   true
-- )
-- ON CONFLICT (username) DO UPDATE SET
--   password = EXCLUDED.password,
--   updated_at = NOW();

-- ============================================
-- Setup Complete!
-- ============================================
-- Next steps:
-- 1. Get your SUPABASE_URL and SUPABASE_ANON_KEY from Settings → API
-- 2. Add them to Render environment variables
-- 3. Create admin user: node createAdminSupabase.js
-- 4. Test: https://xenflow-backend.onrender.com/api/test/supabase
