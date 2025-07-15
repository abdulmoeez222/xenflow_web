import React from 'react';
import { FaRobot, FaMicrophoneAlt, FaChartLine, FaBolt } from 'react-icons/fa';

const services = [
  {
    icon: <FaRobot className="text-4xl text-accent mb-2" />,
    title: 'AI Chatbots',
    desc: '24/7 customer support, lead generation, and automation with human-like bots tailored to your business.'
  },
  {
    icon: <FaMicrophoneAlt className="text-4xl text-accent mb-2" />,
    title: 'Voice Assistants',
    desc: 'AI voice agents for calls, bookings, and support that sound natural and boost efficiency.'
  },
  {
    icon: <FaChartLine className="text-4xl text-accent mb-2" />,
    title: 'Lead Generation',
    desc: 'Extract leads, contacts, and insights from any channel, at scale, with AI-powered automation.'
  },
  {
    icon: <FaBolt className="text-4xl text-accent mb-2" />,
    title: 'Workflow Automation',
    desc: 'Automate repetitive business processes and free your team to focus on what matters most.'
  },
];

export default function Services() {
  return (
    <section className="min-h-screen bg-white flex flex-col items-center px-4 py-16">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl border border-neutral-200 p-10 md:p-16 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-accent mb-6 text-center font-poppins">Our AI Automation Services</h1>
        <p className="text-lg text-neutral-700 mb-10 text-center max-w-2xl">
          XenFlowTech delivers advanced AI solutions to help your business automate, innovate, and grow. Explore our core services below:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {services.map((s, i) => (
            <div key={i} className="bg-primary/5 border border-accent/10 rounded-xl shadow-lg p-8 flex flex-col items-center text-center card-hover">
              {s.icon}
              <div className="font-bold text-xl text-accent mb-2">{s.title}</div>
              <div className="text-neutral-700 mb-2">{s.desc}</div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <span className="inline-block bg-accent text-white font-bold px-6 py-3 rounded-full shadow-lg text-lg">Ready to transform your business? <a href="/book-meeting" className="underline ml-2">Book a free consultation</a></span>
        </div>
      </div>
    </section>
  );
} 