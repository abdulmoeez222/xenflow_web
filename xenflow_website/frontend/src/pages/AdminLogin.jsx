import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : 'https://xenflow-backend.onrender.com');
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <form className="bg-dark/90 p-8 rounded-xl shadow-2xl w-full max-w-md flex flex-col gap-6 border border-accent/20" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-accent text-center mb-2">Admin Login</h2>
        <input name="username" value={form.username} onChange={handleChange} className="p-3 rounded bg-primary border border-accent/20 text-light focus:ring-2 focus:ring-accent outline-none" type="text" placeholder="Username" required />
        <input name="password" value={form.password} onChange={handleChange} className="p-3 rounded bg-primary border border-accent/20 text-light focus:ring-2 focus:ring-accent outline-none" type="password" placeholder="Password" required />
        <button type="submit" className="bg-accent hover:bg-accent2 text-white font-bold py-3 rounded-full shadow-lg transition-all text-lg" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        {error && <div className="text-red-400 font-semibold text-center mt-2">{error}</div>}
      </form>
    </div>
  );
} 