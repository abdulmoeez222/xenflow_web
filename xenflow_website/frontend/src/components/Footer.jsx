import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

const services = [
  { label: 'AI Chatbots', to: '/#services' },
  { label: 'Voice Assistants', to: '/#services' },
  { label: 'Lead Generation', to: '/#services' },
  { label: 'Workflow Automation', to: '/#services' },
  { label: 'Custom Development', to: '/#services' },
  { label: 'CRM Integration', to: '/#services' },
];
const company = [
  { label: 'About Us', to: '/about' },
  { label: 'Our Process', to: '/' },
  { label: 'Use Cases', to: '/#use-cases' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Support', to: '/contact' },
];
const resources = [];
const legal = [
  { label: 'Privacy Policy', to: '#' },
  { label: 'Terms of Service', to: '#' },
  { label: 'Cookie Policy', to: '#' },
];
const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm15.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" /></svg>
  ) },
  { label: 'Twitter', href: 'https://twitter.com', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
  ) },
  { label: 'Youtube', href: 'https://youtube.com', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.946C18.1 6 12 6 12 6s-6.1 0-7.86.055A2.75 2.75 0 0 0 2.2 8.001 28.6 28.6 0 0 0 2 12a28.6 28.6 0 0 0 .2 3.999 2.75 2.75 0 0 0 1.94 1.946C5.9 18 12 18 12 18s6.1 0 7.86-.055a2.75 2.75 0 0 0 1.94-1.946A28.6 28.6 0 0 0 22 12a28.6 28.6 0 0 0-.2-3.999zM10 15V9l6 3-6 3z" /></svg>
  ) },
  { label: 'Instagram', href: 'https://instagram.com', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 2.25a6.25 6.25 0 1 1 0 12.5 6.25 6.25 0 0 1 0-12.5zm0 1.5a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5zm6.25 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" /></svg>
  ) },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const location = useLocation();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="relative mt-16 overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-primary to-neutral-900"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 20% 80%, rgba(177, 0, 30, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(215, 38, 61, 0.15) 0%, transparent 50%)'
      }}></div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-12 items-start">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <div className="font-extrabold text-white text-3xl mb-2 font-poppins">
                XenFlow<span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">Tech</span>
                <span className="text-accent">.</span>
              </div>
              <p className="text-light/70 text-sm leading-relaxed max-w-md">
                Transforming businesses with cutting-edge AI automation and full-stack development solutions. Empowering enterprises to innovate and scale.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a href="mailto:xenflowtech@gmail.com" className="flex items-center gap-3 text-light/80 hover:text-accent transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-all">
                  <FaEnvelope className="text-accent group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm md:text-base">xenflowtech@gmail.com</span>
              </a>
              <a href="tel:+923284557709" className="flex items-center gap-3 text-light/80 hover:text-accent transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-all">
                  <FaPhone className="text-accent group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm md:text-base">+92 328 455 7709</span>
              </a>
              <div className="flex items-center gap-3 text-light/80">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-accent" />
                </div>
                <span className="text-sm md:text-base">Lahore, Pakistan</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-3">
              {socials.map(s => (
                <a 
                  key={s.label} 
                  href={s.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group w-11 h-11 rounded-lg bg-white/5 flex items-center justify-center text-light/60 hover:text-white hover:bg-accent/20 transition-all border border-white/10 hover:border-accent/30" 
                  aria-label={s.label}
                >
                  <div className="group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map(s => (
                <li key={s.label}>
                  <Link 
                    to={s.to} 
                    onClick={(e) => {
                      if (s.to.includes('#')) {
                        e.preventDefault();
                        const hash = s.to.split('#')[1];
                        if (location.pathname === '/') {
                          const element = document.getElementById(hash);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        } else {
                          window.location.href = s.to;
                        }
                      }
                    }}
                    className="text-light/70 hover:text-accent transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent transition-all"></span>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              {company.map(c => (
                <li key={c.label}>
                  <Link 
                    to={c.to} 
                    onClick={(e) => {
                      if (c.to === '/') {
                        e.preventDefault();
                        window.location.href = c.to;
                      }
                    }}
                    className="text-light/70 hover:text-accent transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent transition-all"></span>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-light/60 text-sm">
              &copy; {new Date().getFullYear()} XenFlowTech. All rights reserved.
            </div>
            <div className="flex items-center gap-6 flex-wrap justify-center">
              {legal.map(l => (
                <Link 
                  key={l.label} 
                  to={l.to} 
                  className="text-light/60 hover:text-accent transition-colors text-sm"
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/admin" className="text-light/40 hover:text-accent transition-colors text-sm">Admin</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 