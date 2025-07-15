import React from 'react';
import useRevealOnScroll from '../hooks/useRevealOnScroll';
import { FaRobot, FaMicrophoneAlt, FaChartLine, FaBolt, FaFacebookMessenger, FaPhoneAlt, FaShoppingCart, FaTruck } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Sarah L.',
    company: 'SaaSify',
    text: 'XenFlowTech automated our marketing and support. We saw a 30% boost in conversions and our team is more productive than ever!'
  },
  {
    name: 'James K.',
    company: 'LogiChain',
    text: 'Their AI workflow solution saved us 100+ hours/month. The team is responsive and truly understands automation.'
  },
  {
    name: 'Priya S.',
    company: 'RetailPro',
    text: 'The 24/7 AI chatbot transformed our customer support. Our customers love it, and so do we!'
  }
];

const services = [
  {
    icon: <FaRobot className="text-5xl mb-4 text-accent" />,
    title: 'AI Chatbots',
    desc: 'Automate customer support and lead generation 24/7 with human-like AI chatbots.'
  },
  {
    icon: <FaMicrophoneAlt className="text-5xl mb-4 text-accent" />,
    title: 'Voice Assistants',
    desc: 'Automate calls, sales, and support with natural-sounding AI voice agents.'
  },
  {
    icon: <FaChartLine className="text-5xl mb-4 text-accent" />,
    title: 'Lead Generation',
    desc: 'Extract leads, contacts, and insights from any website or channel, at scale.'
  },
  {
    icon: <FaBolt className="text-5xl mb-4 text-accent" />,
    title: 'Workflow Automation',
    desc: 'Streamline repetitive tasks and processes with custom AI automations.'
  }
];

const logos = [
  'https://upload.wikimedia.org/wikipedia/commons/4/44/Googleplex-Patio-Aug-2014.JPG',
  'https://upload.wikimedia.org/wikipedia/commons/0/08/Unilever_Logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/2f/Logo_TV_2015.png',
  'https://upload.wikimedia.org/wikipedia/commons/6/6e/Spotify_logo_without_text.svg',
];

const useCases = [
  {
    icon: <FaFacebookMessenger className="text-5xl mb-4 text-accent" />,
    title: 'Messenger AI',
    desc: 'Automate every DM, comment, and story reply to boost engagement and sales.'
  },
  {
    icon: <FaPhoneAlt className="text-5xl mb-4 text-accent" />,
    title: 'Voice Booking',
    desc: 'Let customers book, order, and get support via voice, 24/7.'
  },
  {
    icon: <FaShoppingCart className="text-5xl mb-4 text-accent" />,
    title: 'E-commerce AI',
    desc: 'Personalized shopping, order tracking, and support for online stores.'
  },
  {
    icon: <FaTruck className="text-5xl mb-4 text-accent" />,
    title: 'Logistics Automation',
    desc: 'Real-time shipment tracking, optimized routing, and instant updates.'
  }
];

function GridBG() {
  // SVG grid background, subtle
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

export default function Home() {
  // Section reveal hooks
  const [heroRef, heroRevealed] = useRevealOnScroll();
  const [servicesRef, servicesRevealed] = useRevealOnScroll();
  const [trustedRef, trustedRevealed] = useRevealOnScroll();
  const [useCasesRef, useCasesRevealed] = useRevealOnScroll();
  const [testimonialsRef, testimonialsRevealed] = useRevealOnScroll();
  const [contactRef, contactRevealed] = useRevealOnScroll();

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className={`relative flex flex-col items-center justify-center min-h-[70vh] px-4 py-24 bg-white overflow-hidden reveal${heroRevealed ? ' revealed' : ''}`}
        style={{zIndex:1}}>
        <GridBG />
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-center text-black leading-tight" style={{zIndex:2}}>
          Transform your business<br />
          <span className="text-accent">with AI-powered solutions</span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-center max-w-2xl text-neutral-500" style={{zIndex:2}}>
          We help companies build and launch incredible AI agents and custom automations, for any use case, faster.
        </p>
        <div className="flex flex-col md:flex-row gap-4 z-10">
          <a
            href="/book-meeting"
            className="bg-accent hover:bg-accent2 text-white font-bold py-4 px-8 rounded-full text-lg shadow-none ring-2 ring-accent/10 hover:ring-accent2 transition-all duration-200"
          >
            Let's talk — it's free
          </a>
          <a
            href="/services"
            className="bg-white border-2 border-neutral-300 hover:border-accent text-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-200"
          >
            Our solutions
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className={`max-w-6xl mx-auto py-16 px-4 reveal${servicesRevealed ? ' revealed' : ''}`}>
        <h2 className="text-3xl font-bold text-accent mb-10 text-center">Our Services</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {services.map((s, i) => {
            const [cardRef, cardRevealed] = useRevealOnScroll();
            return (
              <div
                ref={cardRef}
                key={i}
                className={`bg-dark/80 backdrop-blur-md rounded-xl shadow-xl p-8 flex flex-col items-center text-center border border-accent/10 card-hover hover:shadow-2xl hover:scale-105 transition-all reveal${cardRevealed ? ' revealed' : ''}`}
              >
                <div className="text-5xl mb-4">{s.icon}</div>
                <div className="font-bold text-lg text-accent mb-2">{s.title}</div>
                <div className="text-light/80">{s.desc}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Use Cases Section */}
      <section ref={useCasesRef} className={`max-w-6xl mx-auto py-16 px-4 reveal${useCasesRevealed ? ' revealed' : ''}`}>
        <h2 className="text-3xl font-bold text-accent mb-10 text-center">Popular Use Cases</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {useCases.map((u, i) => {
            const [cardRef, cardRevealed] = useRevealOnScroll();
            return (
              <div
                ref={cardRef}
                key={i}
                className={`bg-primary/80 backdrop-blur-md rounded-xl shadow-xl p-8 flex flex-col items-center text-center border border-accent/10 card-hover hover:shadow-2xl hover:scale-105 transition-all reveal${cardRevealed ? ' revealed' : ''}`}
              >
                <div className="text-5xl mb-4">{u.icon}</div>
                <div className="font-bold text-lg text-accent mb-2">{u.title}</div>
                <div className="text-light/80">{u.desc}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className={`max-w-5xl mx-auto py-16 px-4 reveal${testimonialsRevealed ? ' revealed' : ''}`}>
        <h2 className="text-2xl md:text-3xl font-bold text-accent mb-8 text-center">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => {
            const [cardRef, cardRevealed] = useRevealOnScroll();
            return (
              <div
                ref={cardRef}
                key={i}
                className={`bg-dark/80 backdrop-blur-md rounded-xl shadow-xl p-6 flex flex-col items-center text-center border border-accent/10 card-hover hover:shadow-2xl transition-all reveal${cardRevealed ? ' revealed' : ''}`}
              >
                <svg className="w-8 h-8 text-accent mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h7l2 2h5a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
                <p className="text-light/90 mb-4">“{t.text}”</p>
                <div className="font-bold text-accent">{t.name}</div>
                <div className="text-xs text-light/60">{t.company}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Preview Section */}
      <section ref={contactRef} className={`max-w-3xl mx-auto py-12 px-4 text-center reveal${contactRevealed ? ' revealed' : ''}`}>
        <div className="bg-dark/80 backdrop-blur-md rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-accent mb-2">Ready to Start?</h2>
          <p className="text-light/80 mb-6">Our team is here to help you automate, innovate, and grow. Reach out and let's build the future together.</p>
          <a href="/contact" className="bg-accent hover:bg-accent2 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all">Contact Us</a>
        </div>
      </section>
    </>
  );
} 