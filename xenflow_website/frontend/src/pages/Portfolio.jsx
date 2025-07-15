import React from 'react';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

const projects = [
  {
    title: 'AI Sales Agent',
    desc: 'Your own AI Sales Bot integrated on Website or Social Media',
    img: 'https://cdn-icons-png.flaticon.com/512/733/733585.png',
    badge: 'WhatsApp, Messenger, Instagram',
  },
  {
    title: 'Boost Customer Engagement',
    desc: 'Seamless Shopping: Let AI Handle Your Messenger Chats!',
    img: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png',
    badge: 'AI Chat Bots',
  },
  {
    title: 'Automated Appointment Booking',
    desc: 'Effortless Scheduling: Let AI Book Your Calendar!',
    img: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
    badge: 'Google Calendar, Telegram',
  },
  {
    title: 'AI-Powered Lead Generation',
    desc: 'Find and qualify leads automatically with AI scraping and outreach.',
    img: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    badge: 'Sales Automation',
  },
  {
    title: 'Shopify AI Assistant',
    desc: 'Automate order tracking, support, and upsells for your store.',
    img: 'https://cdn-icons-png.flaticon.com/512/5968/5968779.png',
    badge: 'E-commerce',
  },
  {
    title: 'Recruitment Automation',
    desc: 'Screen, qualify, and schedule candidates with AI workflows.',
    img: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png',
    badge: 'HR Tech',
  },
];

function accentFirstWord(title) {
  const words = title.split(' ');
  if (words.length === 1) return <span className="text-accent">{title}</span>;
  return <><span className="text-accent">{words[0]}</span> {words.slice(1).join(' ')}</>;
}

export default function Portfolio() {
  const [sectionRef, sectionRevealed] = useRevealOnScroll();
  return (
    <section ref={sectionRef} className={`min-h-screen flex flex-col items-center px-4 py-16 bg-white reveal${sectionRevealed ? ' revealed' : ''}`}> 
      <div className="max-w-6xl w-full mx-auto">
        <h2 className="text-center text-accent font-bold text-lg mb-2 tracking-widest uppercase">Use Case Solutions</h2>
        <h1 className="text-center text-5xl md:text-6xl font-extrabold mb-4 font-poppins">Automate, Optimize, and Grow with AI Solutions</h1>
        <p className="text-center text-neutral-600 mb-12 text-lg max-w-2xl mx-auto">Get started with real projects for popular use cases created by our team.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div key={i} className="bg-white border-2 border-accent/20 rounded-2xl shadow-xl hover:shadow-2xl hover:border-accent transition-all duration-200 p-8 flex flex-col items-start card-hover">
              <div className="flex items-center gap-3 mb-2">
                <img src={p.img} alt="icon" className="w-10 h-10 rounded-lg bg-white border border-neutral-200 shadow-sm" />
                <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full ml-auto">{p.badge}</span>
              </div>
              <div className="font-extrabold text-2xl text-accent mb-1 font-poppins">{accentFirstWord(p.title)}</div>
              <div className="text-neutral-700 mb-2">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 