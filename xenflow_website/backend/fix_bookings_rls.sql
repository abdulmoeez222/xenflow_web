-- ============================================
-- Fix: Allow backend (anon key) to INSERT into bookings and contacts
-- ============================================
-- Run this in Supabase SQL Editor if you get:
-- "new row violates row-level security policy for table 'bookings'"
--
-- Your backend uses SUPABASE_ANON_KEY (anon role). Supabase returns the inserted
-- row after INSERT, so anon needs both INSERT and SELECT policies.

-- 1. Bookings
DROP POLICY IF EXISTS "Allow public inserts" ON bookings;
DROP POLICY IF EXISTS "Allow anon select bookings" ON bookings;

CREATE POLICY "Allow public inserts" ON bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Required: INSERT returns the new row, so anon must be allowed to SELECT
CREATE POLICY "Allow anon select bookings" ON bookings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 2. Contacts (same)
DROP POLICY IF EXISTS "Allow public inserts" ON contacts;
DROP POLICY IF EXISTS "Allow anon select contacts" ON contacts;

CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow anon select contacts" ON contacts
  FOR SELECT
  TO anon, authenticated
  USING (true);
