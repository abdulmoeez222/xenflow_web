import React, { useState } from 'react';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

function GridBG() {
  return (
    <svg className="absolute inset-0 w-full h-full" style={{zIndex:0}} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#e5e7eb" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

export default function Contact() {
  const [sectionRef, sectionRevealed] = useRevealOnScroll();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.phone,
          message: form.message
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Thank you! We received your message.');
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={sectionRef} className={`min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-white overflow-hidden relative reveal${sectionRevealed ? ' revealed' : ''}`}
      style={{zIndex:1}}>
      {/* Grid background behind everything */}
      <div className="absolute inset-0 w-full h-full" style={{zIndex:0}}><GridBG /></div>
      <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col md:flex-row gap-0 md:gap-12 items-stretch justify-center">
        {/* Left: Heading and description */}
        <div className="flex-[1.2] flex flex-col justify-center bg-[#d7263d] rounded-l-2xl md:rounded-2xl shadow-xl border border-accent/20 p-10 md:p-16 min-h-[420px]" style={{background:'#d7263d'}}>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Let's talk about<br />
            <span className="text-accent" style={{color:'#fff'}}>AI for Business</span>
          </h1>
          <p className="text-lg text-white mb-4">Got a burning AI idea, question, or just want to chat about what we do?</p>
          <p className="text-lg text-white mb-4">Reach out, and our friendly team at XenFlowTech will be right there to guide, assist, or simply share in your excitement.</p>
          <p className="text-lg text-white">Let's make your AI journey memorable!</p>
        </div>
        {/* Right: Form and privacy note as a single card */}
        <div className="flex-1 flex flex-col justify-center bg-white rounded-r-2xl md:rounded-2xl shadow-xl border border-accent/20 p-10 md:p-16 min-h-[420px]">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block mb-1 text-neutral-700 font-semibold">Name</label>
                <input name="name" value={form.name} onChange={handleChange} className="w-full p-3 rounded border border-neutral-300 focus:ring-2 focus:ring-accent outline-none transition bg-white" type="text" placeholder="Enter your full name" required />
              </div>
              <div className="flex-1">
                <label className="block mb-1 text-neutral-700 font-semibold">Email</label>
                <input name="email" value={form.email} onChange={handleChange} className="w-full p-3 rounded border border-neutral-300 focus:ring-2 focus:ring-accent outline-none transition bg-white" type="email" placeholder="you@email.com" required />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block mb-1 text-neutral-700 font-semibold">Phone <span className='text-xs text-neutral-400'>(optional)</span></label>
                <input name="phone" value={form.phone} onChange={handleChange} className="w-full p-3 rounded border border-neutral-300 focus:ring-2 focus:ring-accent outline-none transition bg-white" type="tel" placeholder="e.g. +1 234 567 8901" />
              </div>
              <div className="flex-1"></div>
            </div>
            <div>
              <label className="block mb-1 text-neutral-700 font-semibold">How can we help you?</label>
              <textarea name="message" value={form.message} onChange={handleChange} className="w-full p-3 rounded border border-accent/40 focus:ring-2 focus:ring-accent outline-none transition" style={{background:'#ffe5ea', color:'#1A1A1A', minHeight:'120px', fontSize:'1.1rem'}} placeholder="Describe your project, question, or idea..." required />
              <div className="text-xs text-neutral-400 mt-1">Please provide as much detail as possible for a faster response.</div>
            </div>
            <button type="submit" className="w-full bg-accent hover:bg-accent2 text-white font-bold py-4 rounded-full text-lg shadow-none transition-all mt-2" disabled={loading}>{loading ? 'Sending...' : 'Send'}</button>
            {success && <div className="text-green-600 font-semibold text-center mt-2">{success}</div>}
            {error && <div className="text-red-600 font-semibold text-center mt-2">{error}</div>}
          </form>
          <div className="text-xs text-neutral-400 mt-4 text-center max-w-md mx-auto">Your information is encrypted and kept strictly confidential. We never share your data with third parties. <a href="/privacy" className="underline text-accent">Learn more</a>.</div>
        </div>
      </div>
    </section>
  );
} 