/**
 * Test script: POST dummy data to contact and booking endpoints.
 * Ensures forms write to Supabase correctly. Run with: node script/test-forms.js
 * Server must be running: npm run dev
 */

const BASE = process.env.BASE_URL || 'http://localhost:5000';

const contactPayload = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '+1234567890',
  message: 'Dummy message from form test script. Please ignore.',
};

const bookingPayload = {
  name: 'Test Booker',
  email: 'booking-test@example.com',
  company: 'Test Corp',
  date: '2025-03-01',
  time: '14:00',
  message: 'Dummy booking from test script.',
};

async function post(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

async function main() {
  console.log('Testing forms against', BASE, '\n');

  // 1. Contact form
  const contactRes = await post(`${BASE}/api/contact`, contactPayload);
  if (contactRes.ok) {
    console.log('✅ Contact form: success', contactRes.data);
  } else {
    console.log('❌ Contact form: failed', contactRes.status, contactRes.data);
  }

  // 2. Booking form
  const bookingRes = await post(`${BASE}/api/booking`, bookingPayload);
  if (bookingRes.ok) {
    console.log('✅ Booking form: success', bookingRes.data);
  } else {
    console.log('❌ Booking form: failed', bookingRes.status, bookingRes.data);
  }

  console.log('\nDone. Check your Supabase dashboard for the new rows (contacts + bookings).');
}

main().catch((e) => {
  console.error('Request failed (is the server running?):', e.message);
  process.exit(1);
});
