# 📅 Meeting Booking System - Production Ready

## ✅ What's Implemented

### Frontend (Contact Page)
- ✅ **Booking Form Section** - New section on Contact page
- ✅ **Date Picker** - Calendar to select meeting date (tomorrow to 3 months ahead)
- ✅ **Time Picker** - Time selector (9:00 AM - 6:00 PM business hours)
- ✅ **Form Fields**:
  - Full Name (required)
  - Email Address (required)
  - Company Name (optional)
  - Meeting Date (required)
  - Meeting Time (required)
  - Message/Notes (optional)
- ✅ **Validation** - Client-side and server-side
- ✅ **Success/Error Messages** - User-friendly feedback
- ✅ **Responsive Design** - Works on all devices

### Backend (API)
- ✅ **Validation** - Comprehensive input validation
- ✅ **Database Storage** - Saves to Supabase `bookings` table
- ✅ **Email Notification** - Sends detailed email to xenflowtech@gmail.com
- ✅ **Error Handling** - Production-grade error handling

---

## 📧 Email Notification

When someone books a meeting, you'll receive an email with:

**Subject:** `📅 New Meeting Booking: [Name] - [Date] at [Time]`

**Content includes:**
- ✅ Name
- ✅ Email (clickable)
- ✅ Company (if provided)
- ✅ Meeting Date (formatted: "Monday, February 5, 2024")
- ✅ Meeting Time
- ✅ Message/Notes (if provided)
- ✅ Booking ID
- ✅ Submission timestamp

**Email Format:** Professional HTML email with styling

---

## 🔧 Setup Required

### 1. Environment Variables (Backend)

Add to your `.env` file or Render environment variables:

```env
GMAIL_USER=xenflowtech@gmail.com
GMAIL_PASS=your_app_password_here
```

**Important:** For Gmail, you need to:
1. Enable 2-Factor Authentication
2. Generate an "App Password" (not your regular password)
3. Use that app password in `GMAIL_PASS`

**How to get App Password:**
1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Go to "App passwords"
4. Generate password for "Mail"
5. Use that 16-character password

---

## 📊 Database Schema

The booking is saved to Supabase `bookings` table with:

```sql
- id (auto-generated)
- name (text)
- email (text)
- company (text, optional)
- date (date)
- time (time)
- purpose (text) - stores the message
- status (text) - 'pending'
- timestamp (datetime)
```

---

## 🎯 How It Works

1. **User visits Contact page**
2. **Scrolls to "Book a Meeting" section**
3. **Fills out form:**
   - Selects date (calendar picker)
   - Selects time (9 AM - 6 PM)
   - Enters name, email, company, message
4. **Submits form**
5. **Backend:**
   - Validates all fields
   - Saves to database
   - Sends email to xenflowtech@gmail.com
6. **User sees success message**

---

## ✅ Features

- ✅ **Date Validation** - Can only book from tomorrow to 3 months ahead
- ✅ **Time Validation** - Business hours only (9 AM - 6 PM)
- ✅ **Email Validation** - Proper email format required
- ✅ **Name Validation** - 2-100 characters
- ✅ **Professional Email** - HTML formatted, includes all details
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Success Feedback** - Clear confirmation message
- ✅ **Responsive** - Works on mobile, tablet, desktop

---

## 🧪 Testing

### Test the Booking Form:

1. **Go to Contact page:** `/contact`
2. **Scroll to "Book a Meeting" section**
3. **Fill out form:**
   - Name: "John Doe"
   - Email: "john@example.com"
   - Company: "Test Company"
   - Date: Select tomorrow or later
   - Time: Select between 9:00 AM - 6:00 PM
   - Message: "I'd like to discuss AI automation"
4. **Submit**
5. **Check:**
   - Success message appears
   - Email received at xenflowtech@gmail.com
   - Booking saved in database

---

## 📝 Notes

- **Email sends to:** `xenflowtech@gmail.com` (hardcoded in backend)
- **Date range:** Tomorrow to 3 months ahead
- **Time range:** 9:00 AM - 6:00 PM (business hours)
- **Timezone:** Uses server timezone (adjust if needed)

---

## 🚀 Status

✅ **Production Ready!**

Just add Gmail credentials to environment variables and it's ready to go!

---

**The booking system is fully functional and production-ready!** 🎉

