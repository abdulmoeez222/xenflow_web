import React, { useState } from 'react';
import useRevealOnScroll from '../hooks/useRevealOnScroll';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function Contact() {
  const [heroRef, heroRevealed] = useRevealOnScroll();
  const [formRef, formRevealed] = useRevealOnScroll();
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [focused, setFocused] = useState({ name: false, email: false, company: false, message: false });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleFocus = (field) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field) => {
    setFocused({ ...focused, [field]: false });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch('https://xenflow-backend.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          message: form.message
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Thank you! We received your message. Our team will get back to you within 24 hours.');
        setForm({ name: '', email: '', company: '', message: '' });
        setFocused({ name: false, email: false, company: false, message: false });
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: <FaEnvelope />, label: 'Email', value: 'xenflowtech@gmail.com', href: 'mailto:xenflowtech@gmail.com' },
    { icon: <FaPhone />, label: 'Phone', value: '+92 328 455 7709', href: 'tel:+923284557709' },
    { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Lahore, Pakistan', href: null },
    { icon: <FaClock />, label: 'Response Time', value: 'Within 24 hours', href: null },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Premium */}
      <section ref={heroRef} className={`relative flex flex-col items-center justify-center min-h-[20vh] sm:min-h-[25vh] w-full bg-gradient-to-br from-neutral-950 via-primary to-neutral-900 overflow-hidden reveal${heroRevealed ? ' revealed' : ''}`}>
        {/* Animated background gradient */}
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

      {/* Contact Section - Premium Form */}
      <section ref={formRef} className={`w-full py-16 sm:py-24 md:py-32 relative overflow-hidden reveal${formRevealed ? ' revealed' : ''}`}>
        {/* Premium Gradient Background */}
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
                  Have a project in mind? Want to learn more about our services? We're here to help you every step of the way.
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

            {/* Right: Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 shadow-2xl">
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-light/70 text-sm sm:text-base">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="relative">
                      <label className="block text-sm font-semibold text-light/80 mb-2">
                        Full Name <span className="text-accent">*</span>
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus('name')}
                        onBlur={() => handleBlur('name')}
                        className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white/5 backdrop-blur-sm text-white placeholder:text-light/40 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300 ${
                          focused.name ? 'border-accent/50 bg-white/10' : 'border-white/20'
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
                        value={form.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={() => handleBlur('email')}
                        className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white/5 backdrop-blur-sm text-white placeholder:text-light/40 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300 ${
                          focused.email ? 'border-accent/50 bg-white/10' : 'border-white/20'
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
                      value={form.company}
                      onChange={handleChange}
                      onFocus={() => handleFocus('company')}
                      onBlur={() => handleBlur('company')}
                      className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white/5 backdrop-blur-sm text-white placeholder:text-light/40 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300 ${
                        focused.company ? 'border-accent/50 bg-white/10' : 'border-white/20'
                      }`}
                      type="text"
                      placeholder="Your Company"
                    />
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-light/80 mb-2">
                      How can we help you? <span className="text-accent">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={() => handleBlur('message')}
                      className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white/5 backdrop-blur-sm text-white placeholder:text-light/40 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300 resize-none ${
                        focused.message ? 'border-accent/50 bg-white/10' : 'border-white/20'
                      }`}
                      placeholder="Tell us about your project, goals, or questions..."
                      rows="5"
                      required
                    />
                    <p className="text-xs text-light/50 mt-2">
                      Please provide as much detail as possible for a faster and more accurate response.
                    </p>
                  </div>

                  {/* Success/Error Messages */}
                  {success && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400">
                      <FaCheckCircle className="text-lg flex-shrink-0" />
                      <p className="text-sm font-medium">{success}</p>
                    </div>
                  )}
                  {error && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400">
                      <FaExclamationCircle className="text-lg flex-shrink-0" />
                      <p className="text-sm font-medium">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full animated-border mt-2 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
                  >
                    <span className="animated-border-content block text-white font-bold text-base sm:text-lg py-3.5 sm:py-4">
                      {loading ? 'Sending...' : 'Send Message'}
                    </span>
                  </button>

                  {/* Privacy Note */}
                  <p className="text-xs text-light/50 text-center mt-4">
                    Your information is encrypted and kept strictly confidential. We never share your data with third parties.{' '}
                    <a href="/privacy" className="text-accent hover:text-accent2 underline transition-colors">
                      Learn more
                    </a>
                    .
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