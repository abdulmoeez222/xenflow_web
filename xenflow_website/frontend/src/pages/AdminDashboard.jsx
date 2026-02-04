import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [contacts, setContacts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState('contacts');
  const navigate = useNavigate();

  // Check admin session
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : 'https://xenflow-backend.onrender.com');
    fetch(`${API_URL}/api/admin/session`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (!data.loggedIn) navigate('/admin');
      });
  }, [navigate]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : 'https://xenflow-backend.onrender.com');
    setLoading(true);
    setError(null);
    Promise.all([
      fetch(`${API_URL}/api/admin/contacts`, { credentials: 'include' }).then(r => r.json()),
      fetch(`${API_URL}/api/admin/bookings`, { credentials: 'include' }).then(r => r.json())
    ])
      .then(([contactsRes, bookingsRes]) => {
        if (!contactsRes.success || !bookingsRes.success) throw new Error('Failed to fetch data');
        setContacts(contactsRes.data);
        setBookings(bookingsRes.data);
      })
      .catch(() => setError('Failed to load data.'))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : 'https://xenflow-backend.onrender.com');
    await fetch(`${API_URL}/api/admin/logout`, { method: 'POST', credentials: 'include' });
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-primary text-light p-0 md:p-8">
      <div className="max-w-5xl mx-auto bg-dark/90 rounded-xl shadow-2xl p-6 md:p-10 border border-accent/20 mt-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h2 className="text-3xl font-bold text-accent">Admin Dashboard</h2>
          <div className="flex gap-2">
            <button onClick={() => setTab('contacts')} className={`px-4 py-2 rounded-full font-semibold ${tab==='contacts' ? 'bg-accent text-white' : 'bg-primary text-light border border-accent/30'}`}>Contacts</button>
            <button onClick={() => setTab('bookings')} className={`px-4 py-2 rounded-full font-semibold ${tab==='bookings' ? 'bg-accent text-white' : 'bg-primary text-light border border-accent/30'}`}>Bookings</button>
            <button onClick={handleLogout} className="ml-4 px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold">Logout</button>
          </div>
        </div>
        {loading ? (
          <div className="text-center text-lg py-12">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-400 font-semibold py-12">{error}</div>
        ) : (
          <div>
            {tab === 'contacts' && (
              <div>
                <h3 className="text-xl font-bold mb-4">Contact Submissions</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-primary/80 rounded-xl">
                    <thead>
                      <tr className="text-accent border-b border-accent/20">
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Company</th>
                        <th className="p-2 text-left">Message</th>
                        <th className="p-2 text-left">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.length === 0 ? (
                        <tr><td colSpan={5} className="text-center py-4">No contacts yet.</td></tr>
                      ) : contacts.map(c => (
                        <tr key={c.id ?? c._id ?? c.email} className="border-b border-accent/10 hover:bg-dark/40">
                          <td className="p-2 font-semibold">{c.name}</td>
                          <td className="p-2">{c.email}</td>
                          <td className="p-2">{c.company}</td>
                          <td className="p-2 max-w-xs truncate" title={c.message}>{c.message}</td>
                          <td className="p-2">{new Date(c.timestamp).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {tab === 'bookings' && (
              <div>
                <h3 className="text-xl font-bold mb-4">Meeting Bookings</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-primary/80 rounded-xl">
                    <thead>
                      <tr className="text-accent border-b border-accent/20">
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Company</th>
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">Time</th>
                        <th className="p-2 text-left">Purpose</th>
                        <th className="p-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.length === 0 ? (
                        <tr><td colSpan={7} className="text-center py-4">No bookings yet.</td></tr>
                      ) : bookings.map(b => (
                        <tr key={b.id ?? b._id ?? b.email} className="border-b border-accent/10 hover:bg-dark/40">
                          <td className="p-2 font-semibold">{b.name}</td>
                          <td className="p-2">{b.email}</td>
                          <td className="p-2">{b.company}</td>
                          <td className="p-2">{b.date}</td>
                          <td className="p-2">{b.time}</td>
                          <td className="p-2 max-w-xs truncate" title={b.purpose}>{b.purpose}</td>
                          <td className="p-2">{b.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 