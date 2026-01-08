import React, { useState } from 'react';
import useRevealOnScroll from '../hooks/useRevealOnScroll';
import useAnimatedCounter from '../hooks/useAnimatedCounter';
import AnimatedChart from '../components/AnimatedChart';
import { FaRobot, FaMicrophoneAlt, FaChartLine, FaBolt, FaFacebookMessenger, FaPhoneAlt, FaShoppingCart, FaTruck, FaCode, FaDatabase, FaCloud, FaShieldAlt, FaUsers, FaProjectDiagram, FaClock, FaPercentage, FaCheckCircle, FaCogs, FaArrowRight, FaAddressBook, FaArrowUp, FaHospital, FaGraduationCap, FaBuilding, FaCreditCard, FaFileInvoice, FaHeadset, FaChartBar, FaLaptopCode, FaNetworkWired, FaMobileAlt, FaEnvelope } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    company: 'SaaSify',
    role: 'CEO',
    text: 'XenFlowTech automated our marketing and support. We saw a 30% boost in conversions and our team is more productive than ever!',
    rating: 5,
    logo: '/images/clients/saasify-logo.png',
    image: '/images/testimonials/sarah-mitchell.jpg.jpeg'
  },
  {
    name: 'James Kumar',
    company: 'LogiChain',
    role: 'CTO',
    text: 'Their AI workflow solution saved us 100+ hours/month. The team is responsive and truly understands automation.',
    rating: 5,
    logo: '/images/clients/logichain-logo.png',
    image: '/images/testimonials/james-kumar.jpg.jpeg'
  },
  {
    name: 'Priya Sharma',
    company: 'RetailPro',
    role: 'Operations Director',
    text: 'The 24/7 AI chatbot transformed our customer support. Our customers love it, and so do we!',
    rating: 5,
    logo: '/images/clients/retailpro-logo.png',
    image: '/images/testimonials/priya-sharma.jpg .jpeg'
  },
  {
    name: 'Michael Chen',
    company: 'TechVentures',
    role: 'VP of Engineering',
    text: 'The full-stack development and AI integration exceeded our expectations. They delivered a scalable solution that handles millions of requests seamlessly.',
    rating: 5,
    logo: '/images/clients/techventures-logo.png',
    image: '/images/testimonials/michael-chen.jpg.jpeg'
  },
  {
    name: 'David Thompson',
    company: 'FinanceFlow',
    role: 'CFO',
    text: 'The automated invoice processing and financial reporting system saved us thousands of hours annually. ROI was evident within the first quarter.',
    rating: 5,
    logo: '/images/clients/financeflow-logo.png',
    image: '/images/testimonials/david-thompson.jpg.jpeg'
  },
  {
    name: 'Emily Rodriguez',
    company: 'HealthCare Plus',
    role: 'Chief Digital Officer',
    text: 'Their agentic AI system revolutionized our patient scheduling and support. We reduced wait times by 65% and improved patient satisfaction significantly.',
    rating: 5,
    logo: '/images/clients/healthcare-plus-logo.png',
    image: '/images/testimonials/emily-rodriguez.jpg'
  },
  {
    name: 'Lisa Anderson',
    company: 'EduTech Solutions',
    role: 'Director of Innovation',
    text: 'Their AI-powered tutoring platform and administrative automation transformed how we serve students. Engagement rates increased by 45%.',
    rating: 5,
    logo: '/images/clients/edutech-solutions-logo.png',
    image: '/images/testimonials/lisa-anderson.jpg'
  },
  {
    name: 'Robert Martinez',
    company: 'RealEstate Pro',
    role: 'Managing Partner',
    text: 'The AI lead qualification and virtual tour automation increased our conversion rate by 50%. Best investment we made this year.',
    rating: 5,
    logo: '/images/clients/realestate-pro-logo.png',
    image: '/images/testimonials/robert-martinez.jpg'
  },
  {
    name: 'Jennifer Park',
    company: 'CloudScale Inc',
    role: 'Head of Operations',
    text: 'Seamless CRM integration and workflow automation streamlined our entire sales process. Our team can now focus on what matters most.',
    rating: 5,
    logo: '/images/clients/cloudscale-logo.png',
    image: '/images/testimonials/jennifer-park.jpg'
  }
];

const stats = [
  { 
    label: 'Projects Completed', 
    value: 150, 
    suffix: '+', 
    icon: <FaProjectDiagram />,
    chartType: 'bar',
    chartValue: 85,
    trend: '+25%',
    color: 'from-blue-500 to-cyan-400'
  },
  { 
    label: 'Hours Saved', 
    value: 50000, 
    suffix: '+', 
    icon: <FaClock />,
    chartType: 'line',
    chartValue: 92,
    trend: '+40%',
    color: 'from-green-500 to-emerald-400'
  },
  { 
    label: 'Client Satisfaction', 
    value: 98, 
    suffix: '%', 
    icon: <FaPercentage />,
    chartType: 'circle',
    chartValue: 98,
    trend: '+3%',
    color: 'from-purple-500 to-pink-400'
  },
  { 
    label: 'Active Clients', 
    value: 75, 
    suffix: '+', 
    icon: <FaUsers />,
    chartType: 'bar',
    chartValue: 78,
    trend: '+18%',
    color: 'from-orange-500 to-red-400'
  }
];

const techStack = [
  { name: 'React', category: 'Frontend', icon: '⚛️' },
  { name: 'Node.js', category: 'Backend', icon: '🟢' },
  { name: 'Python', category: 'Backend', icon: '🐍' },
  { name: 'TypeScript', category: 'Frontend', icon: '📘' },
  { name: 'MongoDB', category: 'Database', icon: '🍃' },
  { name: 'PostgreSQL', category: 'Database', icon: '🐘' },
  { name: 'AWS', category: 'Cloud', icon: '☁️' },
  { name: 'Docker', category: 'DevOps', icon: '🐳' },
  { name: 'Kubernetes', category: 'DevOps', icon: '⚓' },
  { name: 'OpenAI', category: 'AI/ML', icon: '🤖' },
  { name: 'TensorFlow', category: 'AI/ML', icon: '🧠' },
  { name: 'Next.js', category: 'Frontend', icon: '▲' },
  { name: 'n8n', category: 'Automation', icon: '🔄' },
  { name: 'Zapier', category: 'Automation', icon: '⚡' },
  { name: 'Make.com', category: 'Automation', icon: '🔧' }
];

const processSteps = [
  {
    step: 1,
    title: 'Discovery',
    desc: 'We analyze your business needs, challenges, and goals to understand what AI automation will deliver the most value.',
    icon: <FaUsers className="text-4xl" />
  },
  {
    step: 2,
    title: 'Strategy',
    desc: 'Our experts design a custom AI automation roadmap tailored to your unique requirements and business objectives.',
    icon: <FaProjectDiagram className="text-4xl" />
  },
  {
    step: 3,
    title: 'Development',
    desc: 'We build, integrate, and deploy AI solutions with cutting-edge technology, ensuring minimal disruption to your workflow.',
    icon: <FaCode className="text-4xl" />
  },
  {
    step: 4,
    title: 'Deployment',
    desc: 'Seamless integration and launch with comprehensive testing, ensuring your AI solutions work perfectly from day one.',
    icon: <FaCloud className="text-4xl" />
  },
  {
    step: 5,
    title: 'Support',
    desc: 'Ongoing optimization, monitoring, and training to ensure your AI automation continues to deliver maximum ROI.',
    icon: <FaShieldAlt className="text-4xl" />
  }
];

const faqs = [
  {
    q: 'What makes XenFlowTech different from other AI agencies?',
    a: 'We combine full-stack development expertise with cutting-edge agentic AI solutions. Our team builds end-to-end systems, not just chatbots—from frontend interfaces to backend infrastructure, all powered by intelligent AI agents.'
  },
  {
    q: 'How long does it take to implement an AI automation solution?',
    a: 'Timeline varies by project complexity. Simple chatbots can be deployed in 2-4 weeks, while comprehensive agentic AI systems typically take 6-12 weeks. We provide detailed timelines during our discovery phase.'
  },
  {
    q: 'Do you offer custom full-stack development services?',
    a: 'Absolutely! We build complete web applications, APIs, databases, and cloud infrastructure. Whether you need a new platform or want to enhance existing systems with AI, we handle the entire stack.'
  },
  {
    q: 'What is agentic AI and how does it differ from traditional AI?',
    a: 'Agentic AI systems can autonomously make decisions, take actions, and learn from outcomes. Unlike traditional chatbots that just respond, our agents can execute tasks, integrate with multiple systems, and work independently to achieve goals.'
  },
  {
    q: 'Can you integrate with our existing systems?',
    a: 'Yes! We specialize in integrating AI solutions with existing CRMs, databases, APIs, and third-party services. Our full-stack expertise ensures seamless connectivity.'
  },
  {
    q: 'What kind of support do you provide after deployment?',
    a: 'We offer 24/7 monitoring, regular optimization updates, performance analytics, and dedicated support. Our team ensures your AI solutions continue to evolve and improve over time.'
  }
];

const services = [
  {
    icon: <FaRobot className="text-5xl mb-4 text-accent" />,
    title: 'AI Chatbots',
    desc: 'Automate customer support and lead generation 24/7 with human-like AI chatbots.',
    features: ['24/7 Availability', 'Multi-channel Support', 'Natural Language Processing']
  },
  {
    icon: <FaMicrophoneAlt className="text-5xl mb-4 text-accent" />,
    title: 'Voice Assistants',
    desc: 'Automate calls, sales, and support with natural-sounding AI voice agents.',
    features: ['Real-time Processing', 'Multi-language Support', 'CRM Integration']
  },
  {
    icon: <FaChartLine className="text-5xl mb-4 text-accent" />,
    title: 'Lead Generation',
    desc: 'Extract leads, contacts, and insights from any website or channel, at scale.',
    features: ['Automated Scraping', 'Data Enrichment', 'Lead Scoring']
  },
  {
    icon: <FaBolt className="text-5xl mb-4 text-accent" />,
    title: 'Workflow Automation',
    desc: 'Streamline repetitive tasks and processes with custom AI automations.',
    features: ['Custom Workflows', 'API Integration', 'Process Optimization']
  },
  {
    icon: <FaCogs className="text-5xl mb-4 text-accent" />,
    title: 'Custom Development',
    desc: 'Tailored AI solutions and full-stack development services built to your exact specifications.',
    features: ['Bespoke Solutions', 'End-to-End Development', 'Scalable Architecture']
  },
  {
    icon: <FaAddressBook className="text-5xl mb-4 text-accent" />,
    title: 'CRM Integration',
    desc: 'Seamlessly integrate AI automation with your CRM systems for enhanced customer relationship management.',
    features: ['Salesforce Integration', 'HubSpot Automation', 'Data Synchronization']
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
    icon: <FaFacebookMessenger />,
    title: 'Messenger AI',
    desc: 'Automate every DM, comment, and story reply to boost engagement and sales.',
    category: 'Customer Engagement',
    metrics: '40% increase in response rate'
  },
  {
    icon: <FaPhoneAlt />,
    title: 'Voice Booking',
    desc: 'Let customers book, order, and get support via voice, 24/7.',
    category: 'Voice Automation',
    metrics: '60% reduction in call wait time'
  },
  {
    icon: <FaShoppingCart />,
    title: 'E-commerce AI',
    desc: 'Personalized shopping, order tracking, and support for online stores.',
    category: 'Retail Automation',
    metrics: '35% boost in conversion rates'
  },
  {
    icon: <FaTruck />,
    title: 'Logistics Automation',
    desc: 'Real-time shipment tracking, optimized routing, and instant updates.',
    category: 'Supply Chain',
    metrics: '50% faster delivery times'
  },
  {
    icon: <FaHeadset />,
    title: 'Customer Support',
    desc: '24/7 AI-powered support with instant issue resolution and escalation.',
    category: 'Support Automation',
    metrics: '95% first-contact resolution'
  },
  {
    icon: <FaCreditCard />,
    title: 'Financial Services',
    desc: 'Automated account management, fraud detection, and customer onboarding.',
    category: 'Finance',
    metrics: '70% faster processing'
  },
  {
    icon: <FaNetworkWired />,
    title: 'Enterprise Integration',
    desc: 'Seamless integration with CRM, ERP, and existing business systems.',
    category: 'Integration',
    metrics: 'Unified workflows'
  },
  {
    icon: <FaChartBar />,
    title: 'Business Intelligence',
    desc: 'Automated data analysis, reporting, and actionable insights generation.',
    category: 'Analytics',
    metrics: 'Real-time insights'
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

function FAQItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const [faqItemRef, faqItemRevealed] = useRevealOnScroll();
  
  return (
    <div
      ref={faqItemRef}
      className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-white/10 hover:border-accent/50 overflow-hidden transition-all reveal${faqItemRevealed ? ' revealed' : ''}`}
      style={{
        boxShadow: '0 25px 70px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/0 to-accent2/0 group-hover:from-accent/10 group-hover:to-accent2/10 transition-all duration-500 -z-10 blur-2xl"></div>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-8 flex items-center justify-between text-left hover:bg-white/5 transition-all"
      >
        <div className="flex items-start gap-4 flex-1">
          {/* Question Number Badge */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent2 flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white/20">
            {index + 1}
          </div>
          <h3 className="text-xl font-bold text-white pr-4 leading-relaxed group-hover:text-accent transition-colors drop-shadow-lg">
            {faq.q}
          </h3>
        </div>
        <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all ${isOpen ? 'bg-accent/30 rotate-180' : 'group-hover:bg-white/20'}`}>
          <svg
            className={`w-6 h-6 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-8 pb-8 pl-20">
          <div className="pt-4 border-t border-white/10">
            <p className="text-light/80 leading-relaxed text-lg">
              {faq.a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQSection({ faqRef, faqRevealed, faqs }) {
  return (
    <section ref={faqRef} className={`w-full py-32 relative overflow-hidden reveal${faqRevealed ? ' revealed' : ''}`}>
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-primary to-neutral-900"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 20% 30%, rgba(177, 0, 30, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(215, 38, 61, 0.15) 0%, transparent 50%)'
      }}></div>
      
      {/* Animated shine overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{
          animation: 'shine 5s ease-in-out infinite',
          transform: 'skewX(-20deg)',
          width: '200%',
          marginLeft: '-50%'
        }}></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Frequently Asked <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-xl md:text-2xl text-light/80 max-w-4xl mx-auto leading-relaxed">
            Everything you need to know about our AI automation and full-stack services
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/5 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/10 shadow-2xl">
            <div className="text-left sm:text-center">
              <p className="text-xl font-semibold text-white mb-2">Still have questions?</p>
              <p className="text-light/70">Our team is here to help you find the perfect solution</p>
            </div>
            <a href="/contact" className="animated-border inline-block flex-shrink-0">
              <span className="animated-border-content text-white font-bold px-8 py-4 text-lg">
                Contact Us
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  // Section reveal hooks
  const [heroRef, heroRevealed] = useRevealOnScroll();
  const [statsRef, statsRevealed] = useRevealOnScroll();
  const [techStackRef, techStackRevealed] = useRevealOnScroll();
  const [processRef, processRevealed] = useRevealOnScroll();
  const [servicesRef, servicesRevealed] = useRevealOnScroll();
  const [trustedRef, trustedRevealed] = useRevealOnScroll();
  const [useCasesRef, useCasesRevealed] = useRevealOnScroll();
  const [testimonialsRef, testimonialsRevealed] = useRevealOnScroll();
  const [faqRef, faqRevealed] = useRevealOnScroll();
  const [contactRef, contactRevealed] = useRevealOnScroll();

  // Animated counters
  const projectsCount = useAnimatedCounter(150, 2000, true, statsRevealed);
  const hoursCount = useAnimatedCounter(50000, 2000, true, statsRevealed);
  const satisfactionCount = useAnimatedCounter(98, 2000, true, statsRevealed);
  const clientsCount = useAnimatedCounter(75, 2000, true, statsRevealed);

  return (
    <>
      {/* Hero Section - Full Width */}
      <section ref={heroRef} className={`relative flex flex-col items-center justify-center min-h-[70vh] w-full bg-gradient-to-br from-primary via-secondary to-dark overflow-hidden reveal${heroRevealed ? ' revealed' : ''}`}
        style={{zIndex:1}}>
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-accent2/10 animate-pulse"></div>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(177, 0, 30, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(215, 38, 61, 0.1) 0%, transparent 50%)'
        }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center py-16 sm:py-20 md:py-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 text-white leading-tight">
            Transform Your Business
            <br />
            <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
              With AI-Powered Solutions
            </span>
        </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 text-light/90 max-w-2xl mx-auto px-4">
          We help companies build and launch incredible AI agents and custom automations, for any use case, faster.
        </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
          <a
            href="/contact"
              className="animated-border inline-block w-full sm:w-auto"
            >
              <span className="animated-border-content text-white font-bold text-base sm:text-lg py-3 px-6 sm:py-4 sm:px-8 block">
                Let's Talk — It's Free
              </span>
          </a>
          <a
            href="/#services"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/30 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full text-base sm:text-lg hover:border-white/50 transition-all duration-300 w-full sm:w-auto text-center"
          >
              Explore Solutions
          </a>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute bottom-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-20 right-10 w-32 h-32 bg-accent2/20 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
      </section>

      {/* Services Section - Enterprise Level */}
      <section id="services" ref={servicesRef} className={`w-full py-16 sm:py-24 md:py-32 bg-gradient-to-br from-neutral-950 via-primary to-neutral-900 relative overflow-hidden reveal${servicesRevealed ? ' revealed' : ''}`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-4 sm:mb-6 leading-tight px-4">
              Our <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-light/70 max-w-4xl mx-auto leading-relaxed px-4">
              Comprehensive AI automation and custom development solutions designed for enterprise-scale businesses
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {services.map((s, i) => {
            const [cardRef, cardRevealed] = useRevealOnScroll();
            return (
              <div
                ref={cardRef}
                key={i}
                  className={`group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/10 hover:border-accent/50 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 reveal${cardRevealed ? ' revealed' : ''}`}
                  style={{
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/0 to-accent2/0 group-hover:from-accent/10 group-hover:to-accent2/10 transition-all duration-500 -z-10 blur-xl"></div>
                  
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-2xl group-hover:bg-accent/30 transition-all"></div>
                    <div className="relative bg-gradient-to-br from-accent/20 to-accent2/20 rounded-2xl p-6 w-20 h-20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <div className="text-4xl text-accent">{s.icon}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-center group-hover:text-accent transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm sm:text-base text-light/70 mb-4 sm:mb-6 text-center leading-relaxed min-h-[60px] sm:min-h-[80px]">
                    {s.desc}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {s.features && s.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-light/60 group-hover:text-light/80 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>

          {/* Enterprise CTA */}
          <div className="text-center mt-12 sm:mt-16 px-4">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 w-full sm:w-auto">
              <div className="text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Need a Custom Solution?</h3>
                <p className="text-sm sm:text-base text-light/60">Let's build something tailored specifically for your business</p>
              </div>
              <a href="/contact" className="animated-border inline-block flex-shrink-0 w-full sm:w-auto">
                <span className="animated-border-content text-white font-bold px-6 py-3 text-sm sm:text-base block">Schedule Consultation</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Process/Workflow Section - Premium */}
      <section ref={processRef} className={`w-full py-16 sm:py-24 md:py-32 relative overflow-hidden reveal${processRevealed ? ' revealed' : ''}`}>
        {/* Premium Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-primary to-neutral-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(177, 0, 30, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(215, 38, 61, 0.15) 0%, transparent 50%)'
        }}></div>
        
        {/* Animated shine overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{
            animation: 'shine 5s ease-in-out infinite',
            transform: 'skewX(-20deg)',
            width: '200%',
            marginLeft: '-50%'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
              Our <span className="text-white">Process</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto drop-shadow-lg">
              A proven methodology that delivers exceptional results
            </p>
          </div>
          
          <div className="relative">
            {/* Premium connection line for desktop - High Contrast */}
            <div className="hidden md:block absolute top-1/2 left-12 right-12 h-2 transform -translate-y-1/2" style={{zIndex: 0}}>
              <div className="h-full bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full shadow-2xl shadow-white/70"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative" style={{zIndex: 1}}>
              {processSteps.map((step, i) => {
                const [cardRef, cardRevealed] = useRevealOnScroll();
                return (
                  <div
                    ref={cardRef}
                    key={i}
                    className={`group relative bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border-2 border-white hover:border-accent transition-all text-center transform hover:scale-105 hover:-translate-y-2 reveal${cardRevealed ? ' revealed' : ''}`}
                    style={{
                      boxShadow: '0 25px 70px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                    }}
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/0 to-accent2/0 group-hover:from-accent/20 group-hover:to-accent2/20 transition-all duration-500 -z-10 blur-2xl"></div>
                    
                    {/* Step number badge - High Contrast */}
                    <div className="absolute -top-5 -right-5 w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent2 text-white flex items-center justify-center font-bold text-xl z-20 shadow-2xl border-4 border-white">
                      {step.step}
                    </div>
                    
                    <div className="flex flex-col items-center">
                      {/* Icon container with black icons - High Contrast */}
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl group-hover:bg-accent/40 transition-all"></div>
                        <div className="relative w-28 h-28 rounded-full bg-white flex items-center justify-center border-4 border-accent/30 group-hover:border-accent shadow-xl group-hover:shadow-2xl transition-all">
                          <div className="text-6xl text-black group-hover:scale-110 transition-transform">
                            {step.icon}
                          </div>
                        </div>
                      </div>
                      
                      {/* Title - High Contrast */}
                      <h3 className="text-2xl font-bold text-black group-hover:text-accent transition-colors drop-shadow-sm">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Metrics Section - Enterprise Premium */}
      <section ref={statsRef} className={`w-full py-32 relative overflow-hidden bg-gradient-to-br from-neutral-950 via-primary to-neutral-900 reveal${statsRevealed ? ' revealed' : ''}`}>
        {/* Premium Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-accent2/10 animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
              Proven <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">Results</span>
            </h2>
            <p className="text-xl md:text-2xl text-light/80 max-w-4xl mx-auto leading-relaxed">
              Data-driven success metrics that demonstrate our impact and commitment to excellence
            </p>
          </div>

          {/* Stats Grid with Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const [cardRef, cardRevealed] = useRevealOnScroll();
              const count = i === 0 ? projectsCount : i === 1 ? hoursCount : i === 2 ? satisfactionCount : clientsCount;
              return (
                <div
                  ref={cardRef}
                  key={i}
                  className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border-2 border-white/10 hover:border-accent/50 transition-all transform hover:scale-105 hover:-translate-y-2 reveal${cardRevealed ? ' revealed' : ''}`}
                  style={{
                    boxShadow: '0 25px 70px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/0 to-accent2/0 group-hover:from-accent/20 group-hover:to-accent2/20 transition-all duration-500 -z-10 blur-2xl"></div>
                  
                  {/* Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/30 to-accent2/30 flex items-center justify-center text-3xl text-white border border-white/20 group-hover:scale-110 transition-transform">
                      {stat.icon}
                    </div>
                    {stat.trend && (
                      <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold border border-green-500/30">
                        <FaArrowUp className="text-xs" />
                        {stat.trend}
                      </div>
                    )}
                  </div>

                  {/* Chart */}
                  <div className="mb-6 h-32 flex items-center justify-center">
                    <AnimatedChart 
                      type={stat.chartType} 
                      value={stat.chartValue} 
                      color={stat.color}
                      revealed={cardRevealed}
                      id={`stat-${i}`}
                    />
                  </div>

                  {/* Main Stat */}
                  <div className="text-center mb-4">
                    <div className="text-5xl md:text-6xl font-extrabold text-white mb-2 drop-shadow-lg">
                      {count.toLocaleString()}{stat.suffix}
                    </div>
                    <div className="text-lg text-light/70 font-semibold uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>

                  {/* Progress indicator */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-light/60">Growth</span>
                      <span className="text-accent font-bold">{stat.chartValue}%</span>
                    </div>
                    <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000`}
                        style={{ width: cardRevealed ? `${stat.chartValue}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
              </div>
            );
          })}
          </div>

          {/* Trust Indicators */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-light/60 text-sm">Uptime Guarantee</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-light/60 text-sm">Support Available</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-light/60 text-sm">Client Retention</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section - Enterprise Premium */}
      <section id="use-cases" ref={useCasesRef} className={`w-full py-32 relative overflow-hidden reveal${useCasesRevealed ? ' revealed' : ''}`}>
        {/* Premium Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-primary to-neutral-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(177, 0, 30, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(215, 38, 61, 0.15) 0%, transparent 50%)'
        }}></div>
        
        {/* Animated shine overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{
            animation: 'shine 5s ease-in-out infinite',
            transform: 'skewX(-20deg)',
            width: '200%',
            marginLeft: '-50%'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
              Popular <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">Use Cases</span>
            </h2>
            <p className="text-xl md:text-2xl text-light/80 max-w-4xl mx-auto leading-relaxed">
              Real-world applications of our AI automation solutions across industries
            </p>
          </div>

          {/* Use Cases Grid - Premium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {useCases.map((u, i) => {
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
                  
                  {/* Category Badge */}
                  <div className="absolute -top-3 left-6">
                    <span className="bg-gradient-to-r from-accent to-accent2 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-white/20">
                      {u.category}
                    </span>
                  </div>

                  {/* Icon Container */}
                  <div className="flex items-center justify-center mb-6 mt-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-accent2/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/40 to-accent2/40 flex items-center justify-center text-4xl text-white border-2 border-white/20 group-hover:scale-110 group-hover:border-accent transition-all shadow-xl">
                        {React.cloneElement(u.icon, { className: "text-4xl" })}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors drop-shadow-lg">
                      {u.title}
                    </h3>
                    <p className="text-light/70 text-sm leading-relaxed mb-4 min-h-[60px]">
                      {u.desc}
                    </p>
                    
                    {/* Metrics */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center justify-center gap-2 text-accent text-xs font-semibold">
                        <FaChartLine className="text-xs" />
                        <span>{u.metrics}</span>
                      </div>
                    </div>
                  </div>

              </div>
            );
          })}
          </div>

          {/* Enterprise CTA */}
          <div className="text-center mt-20">
            <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white/5 backdrop-blur-xl rounded-3xl p-10 border-2 border-white/10 shadow-2xl">
              <div className="text-left sm:text-center">
                <h3 className="text-3xl font-bold text-white mb-3">Need a Custom Solution?</h3>
                <p className="text-light/70 text-lg">Let's build a tailored AI automation solution for your specific industry needs</p>
              </div>
              <a href="/contact" className="animated-border inline-block flex-shrink-0">
                <span className="animated-border-content text-white font-bold px-8 py-4 text-lg">Schedule Consultation</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section - Premium */}
      <section ref={techStackRef} className={`w-full py-32 relative overflow-hidden reveal${techStackRevealed ? ' revealed' : ''}`}>
        {/* Premium Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-primary to-neutral-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 30% 40%, rgba(177, 0, 30, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(215, 38, 61, 0.15) 0%, transparent 50%)'
        }}></div>
        
        {/* Animated shine overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{
            animation: 'shine 5s ease-in-out infinite',
            transform: 'skewX(-20deg)',
            width: '200%',
            marginLeft: '-50%'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
              Our <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">Technology Stack</span>
            </h2>
            <p className="text-xl md:text-2xl text-light/80 max-w-4xl mx-auto leading-relaxed">
              Cutting-edge tools and technologies we use to build world-class solutions
            </p>
          </div>

          {/* Technology Grid - Premium Cards */}
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
            {techStack.map((tech, i) => {
            const [cardRef, cardRevealed] = useRevealOnScroll();
            return (
              <div
                ref={cardRef}
                key={i}
                  className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 flex flex-col items-center justify-center border-2 border-white/10 hover:border-accent/50 transition-all cursor-pointer transform hover:scale-110 hover:-translate-y-2 reveal${cardRevealed ? ' revealed' : ''}`}
                  style={{
                    boxShadow: '0 25px 70px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                  title={`${tech.name} - ${tech.category}`}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/0 to-accent2/0 group-hover:from-accent/20 group-hover:to-accent2/20 transition-all duration-500 -z-10 blur-2xl"></div>
                  
                  {/* Icon Container */}
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent2/20 rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                    <div className="relative text-5xl group-hover:scale-125 transition-transform drop-shadow-lg">
                      {tech.icon}
                    </div>
                  </div>
                  
                  {/* Name */}
                  <div className="text-sm font-bold text-white text-center mb-1 group-hover:text-accent transition-colors drop-shadow-lg">
                    {tech.name}
                  </div>
                  
                  {/* Category */}
                  <div className="text-xs text-light/60 mt-1 text-center">
                    {tech.category}
                  </div>
              </div>
            );
          })}
          </div>

        </div>
      </section>

      {/* Client Logos Section - Marquee */}
      <section ref={trustedRef} className={`w-full py-20 relative overflow-hidden bg-gradient-to-br from-neutral-950 via-primary to-neutral-900 reveal${trustedRevealed ? ' revealed' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Trusted By Industry Leaders</h2>
            <p className="text-xl text-light/80">Companies that trust us to transform their business with AI</p>
          </div>
          
          {/* Marquee Container */}
          <div className="relative overflow-hidden">
            {/* Gradient Fade Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-950 via-primary to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-950 via-primary to-transparent z-10 pointer-events-none"></div>
            
            {/* Marquee */}
            <div className="marquee-container">
              <div className="marquee-content">
                {logos.map((logo, i) => (
                  <div key={i} className="marquee-item">
                    <img 
                      src={logo} 
                      alt={`Client logo ${i + 1}`} 
                      className="h-12 md:h-16 object-contain grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {logos.map((logo, i) => (
                  <div key={`duplicate-${i}`} className="marquee-item">
                    <img 
                      src={logo} 
                      alt={`Client logo ${i + 1}`} 
                      className="h-12 md:h-16 object-contain grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Premium */}
      <section ref={testimonialsRef} className={`w-full py-32 relative overflow-hidden reveal${testimonialsRevealed ? ' revealed' : ''}`}>
        {/* Premium Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-primary to-neutral-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(177, 0, 30, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(215, 38, 61, 0.15) 0%, transparent 50%)'
        }}></div>
        
        {/* Animated shine overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{
            animation: 'shine 5s ease-in-out infinite',
            transform: 'skewX(-20deg)',
            width: '200%',
            marginLeft: '-50%'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
              What Our <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">Clients Say</span>
            </h2>
            <p className="text-xl md:text-2xl text-light/80 max-w-4xl mx-auto leading-relaxed">
              Real feedback from businesses we've transformed with AI automation
            </p>
          </div>

          {/* Testimonials Grid - Single Row with 5 Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {testimonials.slice(0, 5).map((t, i) => {
              const [cardRef, cardRevealed] = useRevealOnScroll();
              return (
                <div
                  ref={cardRef}
                  key={i}
                  className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl shadow-2xl p-6 flex flex-col border-2 border-white/10 hover:border-accent/50 transition-all transform hover:scale-105 hover:-translate-y-2 reveal${cardRevealed ? ' revealed' : ''}`}
                  style={{
                    boxShadow: '0 25px 70px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/0 to-accent2/0 group-hover:from-accent/20 group-hover:to-accent2/20 transition-all duration-500 -z-10 blur-2xl"></div>
                  
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 text-accent/20 text-4xl font-serif leading-none">"</div>
                  
                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 mb-4">
                    {[...Array(t.rating)].map((_, idx) => (
                      <svg key={idx} className="w-4 h-4 text-accent drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-white text-sm mb-6 flex-grow leading-relaxed relative z-10 line-clamp-4">"{t.text}"</p>
                  
                  {/* Client Info */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    {/* Client Photo */}
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent2 rounded-full blur-md opacity-50"></div>
                      <img 
                        src={t.image} 
                        alt={t.name} 
                        className="relative w-12 h-12 rounded-full object-cover border-2 border-white/20 shadow-xl group-hover:border-accent transition-all"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent2 border-2 border-white/20 shadow-xl items-center justify-center text-white font-bold text-sm">
                        {t.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white text-sm mb-0.5 group-hover:text-accent transition-colors truncate">{t.name}</div>
                      <div className="text-xs text-light/70 truncate">{t.role}</div>
                      <div className="text-xs text-accent font-semibold truncate">{t.company}</div>
                    </div>
                    {/* Company Logo */}
                    <div className="flex-shrink-0">
                      <img 
                        src={t.logo} 
                        alt={t.company} 
                        className="w-8 h-8 object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section - Premium */}
      <FAQSection faqRef={faqRef} faqRevealed={faqRevealed} faqs={faqs} />
    </>
  );
} 