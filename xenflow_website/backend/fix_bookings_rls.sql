-- ============================================
-- Fix: Allow backend (anon key) to INSERT into bookings and contacts
-- ============================================
-- Run this in Supabase SQL Editor if you get:
-- "new row violates row-level security policy for table 'bookings'"
--
-- Your backend uses SUPABASE_ANON_KEY, so the "anon" role must be allowed to INSERT.

-- 1. Bookings: drop existing insert policy if any, then allow anon to insert
DROP POLICY IF EXISTS "Allow public inserts" ON bookings;
CREATE POLICY "Allow public inserts" ON bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Optional: allow anon to read own rows (not required for form submit)
-- DROP POLICY IF EXISTS "Allow anon select" ON bookings;
-- CREATE POLICY "Allow anon select" ON bookings FOR SELECT TO anon USING (true);

-- 2. Contacts: same fix
DROP POLICY IF EXISTS "Allow public inserts" ON contacts;
CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Verify: list policies (run separately if you want to check)
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
-- FROM pg_policies WHERE tablename IN ('bookings', 'contacts');
