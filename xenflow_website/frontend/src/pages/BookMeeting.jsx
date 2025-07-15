import React, { useState } from 'react';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

export default function BookMeeting() {
  const [sectionRef, sectionRevealed] = useRevealOnScroll();
  const [cardRef, cardRevealed] = useRevealOnScroll();
  const [form, setForm] = useState({ name: '', email: '', company: '', date: '', time: '', purpose: '' });
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
      const res = await fetch('http://localhost:5000/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Your meeting is booked! We will contact you soon.');
        setForm({ name: '', email: '', company: '', date: '', time: '', purpose: '' });
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
    <section ref={sectionRef} className={`max-w-xl mx-auto py-16 px-4 reveal${sectionRevealed ? ' revealed' : ''}`}>
      <div ref={cardRef} className={`bg-dark/80 backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-accent/10 reveal${cardRevealed ? ' revealed' : ''}`}>
        <h2 className="text-4xl font-extrabold text-accent mb-8 text-center font-poppins drop-shadow-xl">Book a Meeting</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-light font-semibold">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full p-3 rounded bg-primary border border-accent/20 text-light focus:ring-2 focus:ring-accent outline-none transition" type="text" placeholder="Enter your full name" required />
          </div>
          <div>
            <label className="block mb-1 text-light font-semibold">Email</label>
            <input name="email" value={form.email} onChange={handleChange} className="w-full p-3 rounded bg-primary border border-accent/20 text-light focus:ring-2 focus:ring-accent outline-none transition" type="email" placeholder="you@email.com" required />
          </div>
          <div>
            <label className="block mb-1 text-light font-semibold">Company <span className='text-xs text-neutral-400'>(optional)</span></label>
            <input name="company" value={form.company} onChange={handleChange} className="w-full p-3 rounded bg-primary border border-accent/20 text-light focus:ring-2 focus:ring-accent outline-none transition" type="text" placeholder="Your Company Name" />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block mb-1 text-light font-semibold">Date</label>
              <input name="date" value={form.date} onChange={handleChange} className="w-full p-3 rounded bg-primary border border-accent/20 text-light focus:ring-2 focus:ring-accent outline-none transition" type="date" required />
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-light font-semibold">Time</label>
              <input name="time" value={form.time} onChange={handleChange} className="w-full p-3 rounded bg-primary border border-accent/20 text-light focus:ring-2 focus:ring-accent outline-none transition" type="time" required />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-light font-semibold">Purpose</label>
            <textarea name="purpose" value={form.purpose} onChange={handleChange} className="w-full p-3 rounded bg-primary border border-accent/20 text-light focus:ring-2 focus:ring-accent outline-none transition" rows={3} placeholder="What would you like to discuss or achieve in this meeting?" required />
            <div className="text-xs text-neutral-300 mt-1">Let us know your goals or questions for a more productive meeting.</div>
          </div>
          <button type="submit" className="w-full bg-accent hover:bg-accent2 text-white font-bold py-3 rounded-full shadow-lg transition-all text-lg" disabled={loading}>{loading ? 'Booking...' : 'Book Meeting'}</button>
          {success && <div className="text-green-400 font-semibold text-center mt-2">{success}</div>}
          {error && <div className="text-red-400 font-semibold text-center mt-2">{error}</div>}
        </form>
        <div className="text-xs text-neutral-400 mt-4 text-center max-w-md mx-auto">Your information is encrypted and kept strictly confidential. We never share your data with third parties. <a href="/privacy" className="underline text-accent">Learn more</a>.</div>
      </div>
    </section>
  );
} 