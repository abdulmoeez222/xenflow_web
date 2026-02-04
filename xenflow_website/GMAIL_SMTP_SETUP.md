# Gmail SMTP Setup for Booking Notifications

Booking notifications are sent to **xenflowtech@gmail.com** when someone submits a meeting request. Follow these steps to enable email.

---

## Step 1: Enable 2-Step Verification (Required)

Gmail requires **2-Step Verification** before you can create an App Password.

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under **"How you sign in to Google"**, click **2-Step Verification**
3. Turn it **On** and complete the setup (phone or authenticator app)

---

## Step 2: Create a Gmail App Password

1. Go to [App Passwords](https://myaccount.google.com/apppasswords)  
   - Or: Google Account → **Security** → **2-Step Verification** → scroll to **App passwords**
2. Sign in again if asked.
3. If you see **"Select app"** and **"Select device"**: choose **Mail** and **Other** (name it e.g. "XenFlowTech Backend"), then click **Generate**.
4. **If you don’t see app/device options:** Google’s page sometimes shows a single **Create** or **Generate** button. Use it; you may be asked to type a name (e.g. "XenFlowTech") or nothing at all. You still get a 16-character password.
5. Copy the **16-character password** (e.g. `abcd efgh ijkl mnop`). Use it **without spaces**: `abcdefghijklmnop`.
6. **Save it somewhere safe** – you can’t see it again.

**Note:** Work/school (Google Workspace) accounts may not offer App Passwords. Personal Gmail with 2-Step Verification does. If the option is missing, your admin may need to allow it, or use Resend instead (see below).

---

## Step 3: Set Environment Variables

### On Render (production)

1. Open [Render Dashboard](https://dashboard.render.com) → your backend service
2. Go to **Environment**
3. Add:

   | Key          | Value                     |
   |--------------|---------------------------|
   | `GMAIL_USER` | Your full Gmail address (e.g. `xenflowtech@gmail.com`) |
   | `GMAIL_PASS` | The 16-character App Password (no spaces) |

4. Click **Save Changes**. Render will redeploy.

### Locally (development)

In your backend folder, create or edit `.env`:

```
GMAIL_USER=xenflowtech@gmail.com
GMAIL_PASS=your-16-char-app-password
```

Never commit `.env` or your real App Password to Git.

---

## Step 4: Verify

1. Submit a test booking on your site (Contact → Book a Meeting).
2. Check the inbox for **xenflowtech@gmail.com** (and spam/junk).
3. Check Render logs: you should see either:
   - `✅ Booking email sent successfully`
   - Or an error (e.g. timeout) – see Troubleshooting below.

---

## Option B: Use Resend (recommended on Render)

Gmail SMTP is often **blocked on Render**. For reliable booking emails there, use [Resend](https://resend.com) (free tier, no SMTP).

1. Sign up at [resend.com](https://resend.com) and get an API key: **Dashboard → API Keys → Create**.
2. On Render, add env vars:
   - **`RESEND_API_KEY`** = your key (e.g. `re_...`)
   - Optional: **`RESEND_FROM`** = `XenFlowTech <onboarding@resend.dev>` (default) or your verified domain, e.g. `XenFlowTech <notify@yourdomain.com>`
   - Optional: **`BOOKING_NOTIFY_EMAIL`** = email to receive bookings (default: `xenflowtech@gmail.com`)
3. Save and redeploy. Booking emails will be sent via Resend instead of Gmail.

If **both** `RESEND_API_KEY` and Gmail are set, **Resend is used first**.

---

## Troubleshooting

### "Connection timeout" or "ETIMEDOUT" on Render

Many cloud hosts (including Render) block or restrict outbound SMTP, so Gmail may never connect from there.

- **Booking is still saved** – check Admin Dashboard or Supabase.
- **Gmail-only options:**
  1. **Try port 465 (default now):** The app uses Gmail on port 465 (SSL) first. If it still times out, set env **`GMAIL_USE_PORT_465=0`** to try port 587, then redeploy.
  2. **Deploy the backend somewhere that allows SMTP:** e.g. Railway, Fly.io, or a VPS (DigitalOcean, Linode, etc.). Gmail SMTP often works from those.
  3. **Use Gmail only on local:** Run the backend locally for testing; set `GMAIL_USER` and `GMAIL_PASS` in `.env`. Production bookings won’t send email from Render if SMTP is blocked.
- **If you’re okay using another sender:** Use [Resend](https://resend.com) (set `RESEND_API_KEY` on Render); then you can remove Gmail env vars for production.

### "Invalid credentials" or "Username and Password not accepted"

- Use the **App Password**, not your normal Gmail password.
- Ensure **2-Step Verification** is turned on for that Google account.
- In env vars, use the full email for `GMAIL_USER` and no spaces in `GMAIL_PASS`.

### "Less secure app access"

- Google no longer supports “less secure apps”.
- You **must** use an **App Password** (with 2-Step Verification enabled), as in Step 2.

### Emails go to spam

- Normal for new senders. Mark the first notification as **Not spam**.
- For better deliverability long-term, use a verified domain with Resend/SendGrid.

---

## Summary

| Item        | Value |
|------------|--------|
| **From**    | `GMAIL_USER` (your Gmail address) |
| **To**     | xenflowtech@gmail.com (hardcoded in backend) |
| **When**   | Every successful booking submission |
| **Env vars** | `GMAIL_USER`, `GMAIL_PASS` (App Password only) |

Once `GMAIL_USER` and `GMAIL_PASS` are set on Render (or in `.env` locally), the backend will use Gmail SMTP automatically. If Render blocks SMTP, consider switching to Resend or SendGrid as in the main setup docs.
