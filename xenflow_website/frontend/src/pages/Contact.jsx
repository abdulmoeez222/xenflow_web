import React, { useState } from 'react';
import useRevealOnScroll from '../hooks/useRevealOnScroll';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaCheckCircle, FaExclamationCircle, FaCalendarAlt } from 'react-icons/fa';

export default function Contact() {
  const [heroRef, heroRevealed] = useRevealOnScroll();
  const [bookingRef, bookingRevealed] = useRevealOnScroll();

  // Booking form state
  const [bookingForm, setBookingForm] = useState({ 
    name: '', 
    email: '', 
    company: '', 
    date: '', 
    time: '', 
    message: '' 
  });
  const [bookingFocused, setBookingFocused] = useState({ 
    name: false, 
    email: false, 
    company: false, 
    date: false, 
    time: false, 
    message: false 
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [bookingError, setBookingError] = useState(null);

  const handleBookingChange = e => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
    if (bookingError) setBookingError(null);
  };

  const handleBookingFocus = (field) => {
    setBookingFocused({ ...bookingFocused, [field]: true });
  };

  const handleBookingBlur = (field) => {
    setBookingFocused({ ...bookingFocused, [field]: false });
  };

  const handleBookingSubmit = async e => {
    e.preventDefault();
    setBookingLoading(true);
    setBookingSuccess(null);
    setBookingError(null);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 
        (import.meta.env.DEV ? 'http://localhost:5000' : 'https://xenflow-backend.onrender.com');
      
      const res = await fetch(`${API_URL}/api/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bookingForm.name,
          email: bookingForm.email,
          company: bookingForm.company,
          date: bookingForm.date,
          time: bookingForm.time,
          message: bookingForm.message
        })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setBookingSuccess(data.message || 'Meeting booking submitted successfully! We\'ll confirm via email shortly.');
        setBookingForm({ name: '', email: '', company: '', date: '', time: '', message: '' });
        setBookingFocused({ name: false, email: false, company: false, date: false, time: false, message: false });
      } else {
        setBookingError(data.message || data.errors?.[0]?.msg || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Booking error:', err);
      setBookingError('Network error. Please check your connection and try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  // Get maximum date (3 months from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  };

  const contactInfo = [
    { icon: <FaEnvelope />, label: 'Email', value: 'xenflowtech@gmail.com', href: 'mailto:xenflowtech@gmail.com' },
    { icon: <FaPhone />, label: 'Phone', value: '+92 328 455 7709', href: 'tel:+923284557709' },
    { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Lahore, Pakistan', href: null },
    { icon: <FaClock />, label: 'Response Time', value: 'Within 24 hours', href: null },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className={`relative flex flex-col items-center justify-center min-h-[20vh] sm:min-h-[25vh] w-full bg-gradient-to-br from-neutral-950 via-primary to-neutral-900 overflow-hidden reveal${heroRevealed ? ' revealed' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-accent2/10 animate-pulse"></div>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(177, 0, 30, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(215, 38, 61, 0.15) 0%, transparent 50%)'
        }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center py-8 sm:py-10 md:py-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
            <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
              Let's Build Something Extraordinary Together
            </span>
          </h1>
        </div>
      </section>

      {/* Booking Section - Main Form */}
      <section ref={bookingRef} className={`w-full py-16 sm:py-24 md:py-32 relative overflow-hidden reveal${bookingRevealed ? ' revealed' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-primary to-neutral-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(177, 0, 30, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(215, 38, 61, 0.15) 0%, transparent 50%)'
        }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left: Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">
                  Get in Touch
                </h2>
                <p className="text-light/70 mb-6 text-sm sm:text-base leading-relaxed">
                  Schedule a consultation call with our team. Choose a date and time that works for you, and we'll confirm via email.
                </p>
                
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent group-hover:bg-accent/30 transition-all duration-300 flex-shrink-0">
                        <div className="text-lg">{info.icon}</div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-light/60 uppercase tracking-wider mb-1">{info.label}</p>
                        {info.href ? (
                          <a href={info.href} className="text-white hover:text-accent transition-colors text-sm sm:text-base font-medium">
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-white text-sm sm:text-base font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 shadow-2xl">
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    Book a Meeting
                  </h2>
                  <p className="text-light/70 text-sm sm:text-base">
                    Fill out the form below to schedule a consultation call. We'll confirm your meeting via email.
                  </p>
                </div>

                <form className="space-y-5 sm:space-y-6" onSubmit={handleBookingSubmit}>
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="relative">
                      <label className="block text-sm font-semibold text-light/80 mb-2">
                        Full Name <span className="text-accent">*</span>
                      </label>
                      <input
                        name="name"
                        value={bookingForm.name}
                        onChange={handleBookingChange}
                        onFocus={() => handleBookingFocus('name')}
                        onBlur={() => handleBookingBlur('name')}
                        className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white/5 backdrop-blur-sm text-white placeholder:text-light/40 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300 ${
                          bookingFocused.name ? 'border-accent/50 bg-white/10' : 'border-white/20'
                        }`}
                        type="text"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-semibold text-light/80 mb-2">
                        Email Address <span className="text-accent">*</span>
                      </label>
                      <input
                        name="email"
                        value={bookingForm.email}
                        onChange={handleBookingChange}
                        onFocus={() => handleBookingFocus('email')}
                        onBlur={() => handleBookingBlur('email')}
                        className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white/5 backdrop-blur-sm text-white placeholder:text-light/40 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300 ${
                          bookingFocused.email ? 'border-accent/50 bg-white/10' : 'border-white/20'
                        }`}
                        type="email"
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-light/80 mb-2">
                      Company Name <span className="text-light/50 text-xs">(Optional)</span>
                    </label>
                    <input
                      name="company"
                      value={bookingForm.company}
                      onChange={handleBookingChange}
                      onFocus={() => handleBookingFocus('company')}
                      onBlur={() => handleBookingBlur('company')}
                      className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white/5 backdrop-blur-sm text-white placeholder:text-light/40 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300 ${
                        bookingFocused.company ? 'border-accent/50 bg-white/10' : 'border-white/20'
                      }`}
                      type="text"
                      placeholder="Your Company"
                    />
                  </div>

                  {/* Date and Time Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="relative">
                      <label className="block text-sm font-semibold text-light/80 mb-2">
                        <FaCalendarAlt className="inline mr-2" />
                        Meeting Date <span className="text-accent">*</span>
                      </label>
                      <input
                        name="date"
                        value={bookingForm.date}
                        onChange={handleBookingChange}
                        onFocus={() => handleBookingFocus('date')}
                        onBlur={() => handleBookingBlur('date')}
                        className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white/5 backdrop-blur-sm text-white placeholder:text-light/40 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300 ${
                          bookingFocused.date ? 'border-accent/50 bg-white/10' : 'border-white/20'
                        }`}
                        type="date"
                        min={getMinDate()}
                        max={getMaxDate()}
                        required
                      />
                      <p className="text-xs text-light/50 mt-1">
                        Available up to 3 months ahead
                      </p>
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-semibold text-light/80 mb-2">
                        <FaClock className="inline mr-2" />
                        Meeting Time <span className="text-accent">*</span>
                      </label>
                      <input
                        name="time"
                        value={bookingForm.time}
                        onChange={handleBookingChange}
                        onFocus={() => handleBookingFocus('time')}
                        onBlur={() => handleBookingBlur('time')}
                        className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white/5 backdrop-blur-sm text-white placeholder:text-light/40 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300 ${
                          bookingFocused.time ? 'border-accent/50 bg-white/10' : 'border-white/20'
                        }`}
                        type="time"
                        min="09:00"
                        max="18:00"
                        required
                      />
                      <p className="text-xs text-light/50 mt-1">
                        Business hours: 9:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-light/80 mb-2">
                      What would you like to discuss? <span className="text-light/50 text-xs">(Optional)</span>
                    </label>
                    <textarea
                      name="message"
                      value={bookingForm.message}
                      onChange={handleBookingChange}
                      onFocus={() => handleBookingFocus('message')}
                      onBlur={() => handleBookingBlur('message')}
                      className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white/5 backdrop-blur-sm text-white placeholder:text-light/40 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300 resize-none ${
                        bookingFocused.message ? 'border-accent/50 bg-white/10' : 'border-white/20'
                      }`}
                      placeholder="Tell us about your project, goals, or what you'd like to discuss..."
                      rows="4"
                    />
                  </div>

                  {/* Success/Error Messages */}
                  {bookingSuccess && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400">
                      <FaCheckCircle className="text-lg flex-shrink-0" />
                      <p className="text-sm font-medium">{bookingSuccess}</p>
                    </div>
                  )}
                  {bookingError && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400">
                      <FaExclamationCircle className="text-lg flex-shrink-0" />
                      <p className="text-sm font-medium">{bookingError}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full animated-border mt-2 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
                  >
                    <span className="animated-border-content block text-white font-bold text-base sm:text-lg py-3.5 sm:py-4">
                      {bookingLoading ? 'Scheduling...' : 'Book Meeting'}
                    </span>
                  </button>

                  {/* Privacy Note */}
                  <p className="text-xs text-light/50 text-center mt-4">
                    We'll send you a confirmation email with meeting details. Your information is kept confidential.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
