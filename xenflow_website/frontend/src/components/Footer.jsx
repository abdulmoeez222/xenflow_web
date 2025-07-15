import React from 'react';
import { Link } from 'react-router-dom';

const services = [
  { label: 'Chatbots', to: '/services' },
  { label: 'Voice Assistants', to: '/services' },
  { label: 'Lead Generation', to: '/services' },
  { label: 'Workflow Automation', to: '/services' },
  { label: 'Custom Solutions', to: '/services' },
];
const company = [
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Careers', to: '/about' },
  { label: 'Terms of service', to: '#' },
  { label: 'Privacy policy', to: '#' },
];
const socials = [
  { label: 'Youtube', href: 'https://youtube.com', icon: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.946C18.1 6 12 6 12 6s-6.1 0-7.86.055A2.75 2.75 0 0 0 2.2 8.001 28.6 28.6 0 0 0 2 12a28.6 28.6 0 0 0 .2 3.999 2.75 2.75 0 0 0 1.94 1.946C5.9 18 12 18 12 18s6.1 0 7.86-.055a2.75 2.75 0 0 0 1.94-1.946A28.6 28.6 0 0 0 22 12a28.6 28.6 0 0 0-.2-3.999zM10 15V9l6 3-6 3z" /></svg>
  ) },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm15.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" /></svg>
  ) },
  { label: 'Instagram', href: 'https://instagram.com', icon: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 2.25a6.25 6.25 0 1 1 0 12.5 6.25 6.25 0 0 1 0-12.5zm0 1.5a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5zm6.25 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" /></svg>
  ) },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200 pt-12 pb-4 px-4 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        {/* Logo & Social */}
        <div className="flex-1 min-w-[180px] mb-8 md:mb-0">
          <div className="font-extrabold text-black text-2xl mb-4 font-poppins">XenFlowTech<span className="text-accent">.</span></div>
          <div className="flex space-x-4 mb-2">
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-accent transition" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        {/* Services */}
        <div className="flex-1 min-w-[160px] mb-8 md:mb-0">
          <div className="font-bold text-neutral-900 mb-3">Services</div>
          <ul className="space-y-2">
            {services.map(s => (
              <li key={s.label}>
                <Link to={s.to} className="text-neutral-600 hover:text-accent transition">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Company */}
        <div className="flex-1 min-w-[160px]">
          <div className="font-bold text-neutral-900 mb-3">Company</div>
          <ul className="space-y-2">
            {company.map(c => (
              <li key={c.label}>
                <Link to={c.to} className="text-neutral-600 hover:text-accent transition">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-10 pt-6 border-t border-neutral-100 text-sm text-neutral-500 gap-2">
        <div>
          &copy; {new Date().getFullYear()} XenFlowTech. All rights reserved.
        </div>
        <div className="flex items-center gap-1">
          Made with <span className="text-accent text-lg">❤️</span> by XenFlowTech.
        </div>
      </div>
    </footer>
  );
} 