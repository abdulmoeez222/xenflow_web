import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services', dropdown: true },
  { to: '/portfolio', label: 'Use Cases' },
  { to: '/about', label: 'Why XenFlow' },
];

const servicesDropdown = [
  {
    icon: (
      <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2" /><rect width="14" height="10" x="5" y="6" rx="2" /><path d="M12 12v.01" /></svg>
    ),
    title: 'AI Chatbots',
    desc: '24/7 customer support, lead gen, and automation with human-like bots.',
    link: '/services#chatbots',
    cta: 'View details',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 16v.01" /><path d="M12 8v4" /></svg>
    ),
    title: 'Voice Assistants',
    desc: 'AI voice agents for calls, bookings, and support that sound natural.',
    link: '/services#voice',
    cta: 'See use cases',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2" /><path d="M2 10h20" /></svg>
    ),
    title: 'Lead Generation',
    desc: 'Extract leads and insights from any channel, at scale.',
    link: '/services#leadgen',
    cta: 'Learn more',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18" /><path d="M12 3v18" /></svg>
    ),
    title: 'Workflow Automation',
    desc: 'Automate repetitive business processes with custom AI flows.',
    link: '/services#automation',
    cta: 'Explore flows',
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); setDropdown(false); }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdown) return;
    function handle(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdown(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [dropdown]);

  return (
    <header className="sticky top-0 w-full z-30 bg-black border-b border-neutral-900 shadow-none">
      {/* Top gradient bar (optional, can remove if you want pure black) */}
      {/* <div className="h-1 w-full bg-gradient-to-r from-accent via-blue-400 to-purple-400 opacity-80" /> */}
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 relative">
        {/* Left: Logo */}
        <Link to="/" className="font-extrabold text-white text-2xl tracking-tight font-poppins flex-shrink-0">
          XenFlowTech
        </Link>
        {/* Center: Nav links */}
        <div className="hidden md:flex items-center space-x-6 text-lg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {navLinks.map(link => link.dropdown ? (
            <div key={link.to} className="relative">
              <button
                className={`relative hover:text-accent transition font-semibold text-white px-2 flex items-center gap-1 ${dropdown ? 'text-accent' : ''}`}
                onClick={() => setDropdown(d => !d)}
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
              >
                {link.label}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
              </button>
              {dropdown && (
                <div
                  ref={dropdownRef}
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                  className="absolute left-0 mt-4 min-w-[700px] bg-[#232326] text-white rounded-lg shadow-xl border border-neutral-800 flex flex-col p-6 px-12 gap-6 z-50 animate-fade-in"
                  style={{boxShadow:'0 8px 32px 0 rgba(0,0,0,0.18)'}}
                >
                  <div className="grid grid-cols-2 gap-x-12 gap-y-4 w-full">
                    {servicesDropdown.map(s => (
                      <div key={s.title} className="flex gap-5 items-start p-2">
                        <div className="flex-shrink-0">{s.icon}</div>
                        <div>
                          <div className="font-bold text-xl mb-2">{s.title}</div>
                          <div className="text-neutral-300 text-base mb-2 leading-relaxed">{s.desc}</div>
                          <Link to={s.link} className="text-accent font-semibold text-base hover:underline flex items-center gap-1">{s.cta} <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              key={link.to}
              to={link.to}
              className={`relative hover:text-accent transition font-semibold text-white px-2 ${location.pathname === link.to ? 'text-accent' : ''}`}
            >
              {link.label}
              {location.pathname === link.to && (
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-accent rounded-full" />
              )}
            </Link>
          ))}
        </div>
        {/* Right: Contact button */}
        <div className="flex-shrink-0">
          <Link to="/contact" className="ml-4 bg-accent hover:bg-accent2 text-white font-bold py-2 px-5 rounded-full shadow-none transition-all text-base hidden md:inline-block">
            Contact us
          </Link>
        </div>
        {/* Mobile menu toggle */}
        <button className="md:hidden ml-2 p-2 rounded hover:bg-accent/10 transition" onClick={() => setOpen(v => !v)}>
          <span className="sr-only">Toggle menu</span>
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Mobile menu */}
        {open && (
          <div className="absolute top-full left-0 w-full bg-black border-b border-neutral-900 flex flex-col items-center py-4 space-y-2 md:hidden z-40">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative hover:text-accent transition font-semibold text-lg text-white px-2 ${location.pathname === link.to ? 'text-accent' : ''}`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-accent rounded-full" />
                )}
              </Link>
            ))}
            <Link to="/contact" className="mt-2 bg-accent hover:bg-accent2 text-white font-bold py-2 px-5 rounded-full shadow-none transition-all text-base">
              Contact us
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
} 