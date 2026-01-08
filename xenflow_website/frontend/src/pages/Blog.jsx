import React from 'react';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

const posts = [
  {
    title: 'How AI is Transforming Business Automation',
    summary: 'Explore the latest trends in AI-driven automation and how they impact business efficiency.',
    date: '2025-07-01',
    link: '#',
  },
  {
    title: 'Building a 24/7 AI Chatbot for Customer Support',
    summary: 'A step-by-step guide to deploying an AI chatbot that never sleeps.',
    date: '2025-06-15',
    link: '#',
  },
  {
    title: 'Case Study: AI Workflow Automation in Logistics',
    summary: 'How a logistics company saved 100+ hours/month with AI workflow automation.',
    date: '2025-05-28',
    link: '#',
  },
];

export default function Blog() {
  const [sectionRef, sectionRevealed] = useRevealOnScroll();
  return (
    <section ref={sectionRef} className={`min-h-screen bg-gradient-to-br from-neutral-950 via-primary to-neutral-900 flex flex-col items-center py-16 px-4 reveal${sectionRevealed ? ' revealed' : ''}`}> 
      <div className="max-w-3xl w-full mx-auto">
      <h2 className="text-4xl font-extrabold text-white mb-10 text-center drop-shadow-xl font-poppins">AI Automation Blog</h2>
      <div className="space-y-8">
        {posts.map((post, i) => {
          const [cardRef, cardRevealed] = useRevealOnScroll();
          return (
            <a
              ref={cardRef}
              href={post.link}
              key={i}
              className={`relative block bg-dark/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 card-hover hover:shadow-accent/40 hover:scale-105 transition-all duration-300 group border border-accent/10 reveal${cardRevealed ? ' revealed' : ''}`}
            >
              {/* Shine animation */}
              <div className="absolute inset-0 pointer-events-none group-hover:bg-gradient-to-r group-hover:from-accent/10 group-hover:via-accent2/10 group-hover:to-transparent group-hover:animate-shine" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-bold text-accent font-poppins drop-shadow">{post.title}</h3>
                <span className="text-xs text-gray-400">{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <p className="text-light/90">{post.summary}</p>
            </a>
          );
        })}
      </div>
      </div>
    </section>
  );
} 