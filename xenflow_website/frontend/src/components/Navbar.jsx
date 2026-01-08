import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/#services', label: 'Services' },
  { to: '/#use-cases', label: 'Use Cases' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/about', label: 'Why XenFlow' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Handle hash navigation when page loads
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const hash = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.pathname, location.hash]);

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
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={(e) => {
                // If Home link and already on homepage, scroll to top
                if (link.to === '/' && location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  return;
                }
                // Handle anchor links
                if (link.to.includes('#')) {
                  e.preventDefault();
                  const hash = link.to.split('#')[1];
                  if (location.pathname === '/') {
                    const element = document.getElementById(hash);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  } else {
                    window.location.href = link.to;
                  }
                }
              }}
              className="relative hover:text-accent transition-all duration-300 font-semibold text-white px-3 whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* Right: Book a Meeting button (Contact) */}
        <div className="flex-shrink-0">
          <Link to="/contact" className="ml-4 animated-border text-white font-bold text-base hidden md:inline-block">
            <span className="animated-border-content">Book a Meeting</span>
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
        <div className={`absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-neutral-900 flex flex-col items-center py-4 space-y-2 md:hidden z-40 transition-all duration-300 ease-out overflow-hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}>
          {navLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={(e) => {
                setOpen(false);
                // If Home link and already on homepage, scroll to top
                if (link.to === '/' && location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  return;
                }
                // Handle anchor links
                if (link.to.includes('#')) {
                  e.preventDefault();
                  const hash = link.to.split('#')[1];
                  if (location.pathname === '/') {
                    const element = document.getElementById(hash);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  } else {
                    window.location.href = link.to;
                  }
                }
              }}
              className="relative hover:text-accent transition-all duration-300 font-semibold text-xl text-white px-4 py-2 w-full text-center"
              style={{
                animationDelay: open ? `${index * 50}ms` : '0ms',
                animation: open ? 'fade-in 0.3s ease-out forwards' : 'none'
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            to="/contact" 
            onClick={() => setOpen(false)}
            className="mt-2 bg-accent hover:bg-accent2 text-white font-bold py-3 px-6 rounded-full shadow-none transition-all duration-300 text-base min-w-[160px] text-center"
          >
            Book a Meeting
          </Link>
        </div>
      </nav>
    </header>
  );
} 