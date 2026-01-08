import React from 'react';
import useRevealOnScroll from '../hooks/useRevealOnScroll';
import { FaRocket, FaShieldAlt, FaUsers, FaLightbulb, FaChartLine, FaHandshake, FaCog, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const values = [
  {
    icon: <FaRocket className="text-4xl" />,
    title: 'Innovation First',
    desc: 'We stay ahead of the curve, leveraging cutting-edge AI technologies to deliver solutions that give you a competitive edge.'
  },
  {
    icon: <FaShieldAlt className="text-4xl" />,
    title: 'Security & Trust',
    desc: 'Enterprise-grade security is built into every solution. Your data and operations are protected with industry-leading standards.'
  },
  {
    icon: <FaUsers className="text-4xl" />,
    title: 'Client-Centric',
    desc: 'Your success is our success. We build lasting partnerships, not just deliver projects.'
  },
  {
    icon: <FaLightbulb className="text-4xl" />,
    title: 'Transparency',
    desc: 'Clear communication, honest timelines, and transparent processes. No surprises, just results.'
  }
];

const whyChoose = [
  {
    icon: <FaChartLine className="text-3xl" />,
    title: 'Proven Track Record',
    desc: '150+ successful projects, 98% client satisfaction, and 50,000+ hours saved for our clients.',
    metric: '150+ Projects'
  },
  {
    icon: <FaCog className="text-3xl" />,
    title: 'Full-Stack Expertise',
    desc: 'From AI automation to complete web applications, we handle every layer of your technology stack.',
    metric: 'End-to-End'
  },
  {
    icon: <FaHandshake className="text-3xl" />,
    title: 'Partnership Approach',
    desc: 'We work as an extension of your team, understanding your business deeply to deliver solutions that truly matter.',
    metric: 'True Partners'
  },
  {
    icon: <FaRocket className="text-3xl" />,
    title: 'Rapid Deployment',
    desc: 'Agile methodologies and proven frameworks mean faster time-to-market without compromising quality.',
    metric: 'Fast Delivery'
  }
];

const differentiators = [
  'AI automation simple, accessible, and effective for every business—no technical expertise required',
  'Solutions are secure, scalable, and designed for real business impact',
  'We handle the complexity, so you can focus on what matters most: growing your business',
  'Transparent communication and a partnership approach from start to finish',
  'Full-stack development combined with agentic AI for complete solutions',
  '24/7 support and continuous optimization to ensure your success'
];

export default function About() {
  const [heroRef, heroRevealed] = useRevealOnScroll();
  const [missionRef, missionRevealed] = useRevealOnScroll();
  const [valuesRef, valuesRevealed] = useRevealOnScroll();
  const [whyRef, whyRevealed] = useRevealOnScroll();
  const [visionRef, visionRevealed] = useRevealOnScroll();
  const [ctaRef, ctaRevealed] = useRevealOnScroll();

  return (
    <div className="min-h-screen">
      {/* Hero Section - Premium */}
      <section ref={heroRef} className={`relative flex flex-col items-center justify-center min-h-[70vh] w-full bg-gradient-to-br from-neutral-950 via-primary to-neutral-900 overflow-hidden reveal${heroRevealed ? ' revealed' : ''}`}>
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-accent2/10 animate-pulse"></div>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(177, 0, 30, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(215, 38, 61, 0.15) 0%, transparent 50%)'
        }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 text-center py-16 sm:py-20 md:py-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
            Why <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">XenFlow</span>?
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-light/80 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-10 px-4">
            We're not just another AI agency. We're your strategic partner in transformation, combining cutting-edge technology with deep business understanding to deliver results that matter.
          </p>
        </div>
      </section>

      {/* Mission Section - Premium */}
      <section ref={missionRef} className={`w-full py-16 sm:py-24 md:py-32 relative overflow-hidden reveal${missionRevealed ? ' revealed' : ''}`}>
        {/* Premium Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-primary to-neutral-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(177, 0, 30, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(215, 38, 61, 0.15) 0%, transparent 50%)'
        }}></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
              Our <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">Mission</span>
            </h2>
            <p className="text-xl md:text-2xl text-light/80 max-w-4xl mx-auto leading-relaxed">
              To be the leading force in AI-driven business transformation, making advanced automation accessible, secure, and impactful for every organization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border-2 border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">What We Do</h3>
              <p className="text-light/80 leading-relaxed">
                <span className="font-bold text-accent">XenFlowTech</span> is an AI automation agency dedicated to helping businesses unlock their full potential with cutting-edge artificial intelligence solutions. Our mission is to empower companies of all sizes to automate, innovate, and grow—faster and smarter than ever before.
              </p>
            </div>
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border-2 border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">How We Work</h3>
              <ul className="space-y-3 text-light/80">
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-accent mt-1 flex-shrink-0" />
                  <span><span className="font-semibold text-white">Discovery:</span> We start by understanding your business, goals, and challenges.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-accent mt-1 flex-shrink-0" />
                  <span><span className="font-semibold text-white">Strategy:</span> Our experts design a custom AI automation plan tailored to your needs.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-accent mt-1 flex-shrink-0" />
                  <span><span className="font-semibold text-white">Implementation:</span> We build, integrate, and deploy AI solutions with minimal disruption.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-accent mt-1 flex-shrink-0" />
                  <span><span className="font-semibold text-white">Support:</span> Ongoing support, optimization, and training to ensure your success.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section - Premium */}
      <section ref={valuesRef} className={`w-full py-32 relative overflow-hidden reveal${valuesRevealed ? ' revealed' : ''}`}>
        {/* Premium Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-primary to-neutral-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 30% 40%, rgba(177, 0, 30, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(215, 38, 61, 0.15) 0%, transparent 50%)'
        }}></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
              Our Core <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl md:text-2xl text-light/80 max-w-4xl mx-auto leading-relaxed">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const [cardRef, cardRevealed] = useRevealOnScroll();
              return (
                <div
                  ref={cardRef}
                  key={i}
                  className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border-2 border-white/10 hover:border-accent/50 transition-all transform hover:scale-105 hover:-translate-y-2 reveal${cardRevealed ? ' revealed' : ''}`}
                  style={{
                    boxShadow: '0 25px 70px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/0 to-accent2/0 group-hover:from-accent/20 group-hover:to-accent2/20 transition-all duration-500 -z-10 blur-2xl"></div>
                  
                  <div className="text-accent mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-accent transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-light/70 text-sm leading-relaxed text-center">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Premium */}
      <section ref={whyRef} className={`w-full py-32 relative overflow-hidden reveal${whyRevealed ? ' revealed' : ''}`}>
        {/* Premium Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-primary to-neutral-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(177, 0, 30, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(215, 38, 61, 0.15) 0%, transparent 50%)'
        }}></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
              Why Choose <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">XenFlow</span>?
            </h2>
            <p className="text-xl md:text-2xl text-light/80 max-w-4xl mx-auto leading-relaxed">
              What sets us apart in the AI automation landscape
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyChoose.map((item, i) => {
              const [cardRef, cardRevealed] = useRevealOnScroll();
              return (
                <div
                  ref={cardRef}
                  key={i}
                  className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border-2 border-white/10 hover:border-accent/50 transition-all transform hover:scale-105 hover:-translate-y-2 reveal${cardRevealed ? ' revealed' : ''}`}
                  style={{
                    boxShadow: '0 25px 70px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/0 to-accent2/0 group-hover:from-accent/20 group-hover:to-accent2/20 transition-all duration-500 -z-10 blur-2xl"></div>
                  
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/30 to-accent2/30 flex items-center justify-center text-accent border-2 border-white/20 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">
                          {item.title}
                        </h3>
                        <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-bold border border-accent/30">
                          {item.metric}
                        </span>
                      </div>
                      <p className="text-light/70 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Differentiators List */}
          <div className="mt-16 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border-2 border-white/10">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">What Makes Us Different</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {differentiators.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <FaCheckCircle className="text-accent mt-1 flex-shrink-0 text-xl" />
                  <span className="text-light/80 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section - Premium */}
      <section ref={visionRef} className={`w-full py-32 relative overflow-hidden reveal${visionRevealed ? ' revealed' : ''}`}>
        {/* Premium Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-primary to-neutral-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 30% 40%, rgba(177, 0, 30, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(215, 38, 61, 0.15) 0%, transparent 50%)'
        }}></div>

        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl p-12 border-2 border-white/10">
            <FaLightbulb className="text-6xl text-accent mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Our <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">Vision</span>
            </h2>
            <p className="text-xl md:text-2xl text-light/80 leading-relaxed max-w-3xl mx-auto">
              To be the leading force in AI-driven business transformation, making advanced automation accessible, secure, and impactful for every organization. We envision a future where AI empowers every business to achieve extraordinary results.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section ref={ctaRef} className={`w-full py-32 relative overflow-hidden reveal${ctaRevealed ? ' revealed' : ''}`}>
        {/* Premium Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-primary to-neutral-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(177, 0, 30, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(215, 38, 61, 0.15) 0%, transparent 50%)'
        }}></div>

        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl p-12 border-2 border-white/10">
            <FaRocket className="text-6xl text-accent mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-light/80 mb-8 max-w-2xl mx-auto">
              Let's discuss how XenFlowTech can help you automate, innovate, and grow with cutting-edge AI solutions.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="animated-border inline-block"
              >
                <span className="animated-border-content text-white font-bold py-4 px-8 text-lg">
                  Book a Free Consultation
                </span>
              </a>
              <a
                href="/contact"
                className="animated-border inline-block"
              >
                <span className="animated-border-content text-white font-bold py-4 px-8 text-lg">
                  Get in Touch
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 