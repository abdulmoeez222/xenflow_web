/**
 * Content Ingestion Script
 * Extracts and structures website content for RAG pipeline
 * 
 * This script processes static content from the website and creates
 * structured chunks ready for embedding and vector storage.
 */

const websiteContent = {
  // Services (from Home.jsx)
  services: [
    {
      id: 'service-1',
      title: 'AI Chatbots',
      description: 'Automate customer support and lead generation 24/7 with human-like AI chatbots.',
      features: ['24/7 Availability', 'Multi-channel Support', 'Natural Language Processing'],
      type: 'service',
      chunk: 'AI Chatbots: Automate customer support and lead generation 24/7 with human-like AI chatbots. Features include 24/7 availability, multi-channel support, and natural language processing.'
    },
    {
      id: 'service-2',
      title: 'Voice Assistants',
      description: 'Automate calls, sales, and support with natural-sounding AI voice agents.',
      features: ['Real-time Processing', 'Multi-language Support', 'CRM Integration'],
      type: 'service',
      chunk: 'Voice Assistants: Automate calls, sales, and support with natural-sounding AI voice agents. Features include real-time processing, multi-language support, and CRM integration.'
    },
    {
      id: 'service-3',
      title: 'Lead Generation',
      description: 'Extract leads, contacts, and insights from any website or channel, at scale.',
      features: ['Automated Scraping', 'Data Enrichment', 'Lead Scoring'],
      type: 'service',
      chunk: 'Lead Generation: Extract leads, contacts, and insights from any website or channel, at scale. Features include automated scraping, data enrichment, and lead scoring.'
    },
    {
      id: 'service-4',
      title: 'Workflow Automation',
      description: 'Streamline repetitive tasks and processes with custom AI automations.',
      features: ['Custom Workflows', 'API Integration', 'Process Optimization'],
      type: 'service',
      chunk: 'Workflow Automation: Streamline repetitive tasks and processes with custom AI automations. Features include custom workflows, API integration, and process optimization.'
    },
    {
      id: 'service-5',
      title: 'Custom Development',
      description: 'Tailored AI solutions and full-stack development services built to your exact specifications.',
      features: ['Bespoke Solutions', 'End-to-End Development', 'Scalable Architecture'],
      type: 'service',
      chunk: 'Custom Development: Tailored AI solutions and full-stack development services built to your exact specifications. Features include bespoke solutions, end-to-end development, and scalable architecture.'
    },
    {
      id: 'service-6',
      title: 'CRM Integration',
      description: 'Seamlessly integrate AI automation with your CRM systems for enhanced customer relationship management.',
      features: ['Salesforce Integration', 'HubSpot Automation', 'Data Synchronization'],
      type: 'service',
      chunk: 'CRM Integration: Seamlessly integrate AI automation with your CRM systems for enhanced customer relationship management. Features include Salesforce integration, HubSpot automation, and data synchronization.'
    }
  ],

  // FAQs (from Home.jsx)
  faqs: [
    {
      id: 'faq-1',
      question: 'What makes XenFlowTech different from other AI agencies?',
      answer: 'We combine full-stack development expertise with cutting-edge agentic AI solutions. Our team builds end-to-end systems, not just chatbots—from frontend interfaces to backend infrastructure, all powered by intelligent AI agents.',
      type: 'faq',
      chunk: 'Q: What makes XenFlowTech different from other AI agencies? A: We combine full-stack development expertise with cutting-edge agentic AI solutions. Our team builds end-to-end systems, not just chatbots—from frontend interfaces to backend infrastructure, all powered by intelligent AI agents.'
    },
    {
      id: 'faq-2',
      question: 'How long does it take to implement an AI automation solution?',
      answer: 'Timeline varies by project complexity. Simple chatbots can be deployed in 2-4 weeks, while comprehensive agentic AI systems typically take 6-12 weeks. We provide detailed timelines during our discovery phase.',
      type: 'faq',
      chunk: 'Q: How long does it take to implement an AI automation solution? A: Timeline varies by project complexity. Simple chatbots can be deployed in 2-4 weeks, while comprehensive agentic AI systems typically take 6-12 weeks. We provide detailed timelines during our discovery phase.'
    },
    {
      id: 'faq-3',
      question: 'Do you offer custom full-stack development services?',
      answer: 'Absolutely! We build complete web applications, APIs, databases, and cloud infrastructure. Whether you need a new platform or want to enhance existing systems with AI, we handle the entire stack.',
      type: 'faq',
      chunk: 'Q: Do you offer custom full-stack development services? A: Absolutely! We build complete web applications, APIs, databases, and cloud infrastructure. Whether you need a new platform or want to enhance existing systems with AI, we handle the entire stack.'
    },
    {
      id: 'faq-4',
      question: 'What is agentic AI and how does it differ from traditional AI?',
      answer: 'Agentic AI systems can autonomously make decisions, take actions, and learn from outcomes. Unlike traditional chatbots that just respond, our agents can execute tasks, integrate with multiple systems, and work independently to achieve goals.',
      type: 'faq',
      chunk: 'Q: What is agentic AI and how does it differ from traditional AI? A: Agentic AI systems can autonomously make decisions, take actions, and learn from outcomes. Unlike traditional chatbots that just respond, our agents can execute tasks, integrate with multiple systems, and work independently to achieve goals.'
    },
    {
      id: 'faq-5',
      question: 'Can you integrate with our existing systems?',
      answer: 'Yes! We specialize in integrating AI solutions with existing CRMs, databases, APIs, and third-party services. Our full-stack expertise ensures seamless connectivity.',
      type: 'faq',
      chunk: 'Q: Can you integrate with our existing systems? A: Yes! We specialize in integrating AI solutions with existing CRMs, databases, APIs, and third-party services. Our full-stack expertise ensures seamless connectivity.'
    },
    {
      id: 'faq-6',
      question: 'What kind of support do you provide after deployment?',
      answer: 'We offer 24/7 monitoring, regular optimization updates, performance analytics, and dedicated support. Our team ensures your AI solutions continue to evolve and improve over time.',
      type: 'faq',
      chunk: 'Q: What kind of support do you provide after deployment? A: We offer 24/7 monitoring, regular optimization updates, performance analytics, and dedicated support. Our team ensures your AI solutions continue to evolve and improve over time.'
    }
  ],

  // Process Steps (from Home.jsx)
  process: [
    {
      id: 'process-1',
      step: 1,
      title: 'Discovery',
      description: 'We analyze your business needs, challenges, and goals to understand what AI automation will deliver the most value.',
      type: 'process',
      chunk: 'Step 1 - Discovery: We analyze your business needs, challenges, and goals to understand what AI automation will deliver the most value.'
    },
    {
      id: 'process-2',
      step: 2,
      title: 'Strategy',
      description: 'Our experts design a custom AI automation roadmap tailored to your unique requirements and business objectives.',
      type: 'process',
      chunk: 'Step 2 - Strategy: Our experts design a custom AI automation roadmap tailored to your unique requirements and business objectives.'
    },
    {
      id: 'process-3',
      step: 3,
      title: 'Development',
      description: 'We build, integrate, and deploy AI solutions with cutting-edge technology, ensuring minimal disruption to your workflow.',
      type: 'process',
      chunk: 'Step 3 - Development: We build, integrate, and deploy AI solutions with cutting-edge technology, ensuring minimal disruption to your workflow.'
    },
    {
      id: 'process-4',
      step: 4,
      title: 'Deployment',
      description: 'Seamless integration and launch with comprehensive testing, ensuring your AI solutions work perfectly from day one.',
      type: 'process',
      chunk: 'Step 4 - Deployment: Seamless integration and launch with comprehensive testing, ensuring your AI solutions work perfectly from day one.'
    },
    {
      id: 'process-5',
      step: 5,
      title: 'Support',
      description: 'Ongoing optimization, monitoring, and training to ensure your AI automation continues to deliver maximum ROI.',
      type: 'process',
      chunk: 'Step 5 - Support: Ongoing optimization, monitoring, and training to ensure your AI automation continues to deliver maximum ROI.'
    }
  ],

  // Company Info (from About.jsx)
  company: [
    {
      id: 'company-1',
      type: 'company',
      chunk: 'XenFlowTech is an AI automation agency dedicated to helping businesses unlock their full potential with cutting-edge artificial intelligence solutions. Our mission is to empower companies of all sizes to automate, innovate, and grow—faster and smarter than ever before.'
    },
    {
      id: 'company-2',
      type: 'company',
      chunk: 'We combine full-stack development expertise with cutting-edge agentic AI solutions. Our team builds end-to-end systems, not just chatbots—from frontend interfaces to backend infrastructure, all powered by intelligent AI agents.'
    },
    {
      id: 'company-3',
      type: 'company',
      chunk: 'Our core values include Innovation First, Security & Trust, Client-Centric approach, and Transparency. We stay ahead of the curve, leveraging cutting-edge AI technologies to deliver solutions that give you a competitive edge.'
    }
  ],

  // Use Cases (from Home.jsx)
  useCases: [
    {
      id: 'usecase-1',
      title: 'Messenger AI',
      description: 'Automate every DM, comment, and story reply to boost engagement and sales.',
      category: 'Customer Engagement',
      metrics: '40% increase in response rate',
      type: 'usecase',
      chunk: 'Messenger AI: Automate every DM, comment, and story reply to boost engagement and sales. Category: Customer Engagement. Results: 40% increase in response rate.'
    },
    {
      id: 'usecase-2',
      title: 'Voice Booking',
      description: 'Let customers book, order, and get support via voice, 24/7.',
      category: 'Voice Automation',
      metrics: '60% reduction in call wait time',
      type: 'usecase',
      chunk: 'Voice Booking: Let customers book, order, and get support via voice, 24/7. Category: Voice Automation. Results: 60% reduction in call wait time.'
    },
    {
      id: 'usecase-3',
      title: 'E-commerce AI',
      description: 'Personalized shopping, order tracking, and support for online stores.',
      category: 'Retail Automation',
      metrics: '35% boost in conversion rates',
      type: 'usecase',
      chunk: 'E-commerce AI: Personalized shopping, order tracking, and support for online stores. Category: Retail Automation. Results: 35% boost in conversion rates.'
    },
    {
      id: 'usecase-4',
      title: 'Logistics Automation',
      description: 'Real-time shipment tracking, optimized routing, and instant updates.',
      category: 'Supply Chain',
      metrics: '50% faster delivery times',
      type: 'usecase',
      chunk: 'Logistics Automation: Real-time shipment tracking, optimized routing, and instant updates. Category: Supply Chain. Results: 50% faster delivery times.'
    },
    {
      id: 'usecase-5',
      title: 'Customer Support',
      description: '24/7 AI-powered support with instant issue resolution and escalation.',
      category: 'Support Automation',
      metrics: '95% first-contact resolution',
      type: 'usecase',
      chunk: 'Customer Support: 24/7 AI-powered support with instant issue resolution and escalation. Category: Support Automation. Results: 95% first-contact resolution.'
    },
    {
      id: 'usecase-6',
      title: 'Financial Services',
      description: 'Automated account management, fraud detection, and customer onboarding.',
      category: 'Finance',
      metrics: '70% faster processing',
      type: 'usecase',
      chunk: 'Financial Services: Automated account management, fraud detection, and customer onboarding. Category: Finance. Results: 70% faster processing.'
    },
    {
      id: 'usecase-7',
      title: 'Enterprise Integration',
      description: 'Seamless integration with CRM, ERP, and existing business systems.',
      category: 'Integration',
      metrics: 'Unified workflows',
      type: 'usecase',
      chunk: 'Enterprise Integration: Seamless integration with CRM, ERP, and existing business systems. Category: Integration. Results: Unified workflows.'
    },
    {
      id: 'usecase-8',
      title: 'Business Intelligence',
      description: 'Automated data analysis, reporting, and actionable insights generation.',
      category: 'Analytics',
      metrics: 'Real-time insights',
      type: 'usecase',
      chunk: 'Business Intelligence: Automated data analysis, reporting, and actionable insights generation. Category: Analytics. Results: Real-time insights.'
    }
  ],

  // Contact Info
  contact: [
    {
      id: 'contact-1',
      type: 'contact',
      chunk: 'Contact Information: Email - xenflowtech@gmail.com, Phone - +92 328 455 7709, Location - Lahore, Pakistan. Response time: Within 24 hours.'
    }
  ]
};

/**
 * Get all content chunks for embedding
 * @returns {Array} Array of content chunks with metadata
 */
function getAllChunks() {
  const chunks = [];
  
  // Add all service chunks
  websiteContent.services.forEach(service => {
    chunks.push({
      id: service.id,
      text: service.chunk,
      type: 'service',
      metadata: {
        title: service.title,
        description: service.description,
        features: service.features
      }
    });
  });

  // Add all FAQ chunks
  websiteContent.faqs.forEach(faq => {
    chunks.push({
      id: faq.id,
      text: faq.chunk,
      type: 'faq',
      metadata: {
        question: faq.question,
        answer: faq.answer
      }
    });
  });

  // Add process chunks
  websiteContent.process.forEach(step => {
    chunks.push({
      id: step.id,
      text: step.chunk,
      type: 'process',
      metadata: {
        step: step.step,
        title: step.title,
        description: step.description
      }
    });
  });

  // Add company chunks
  websiteContent.company.forEach(company => {
    chunks.push({
      id: company.id,
      text: company.chunk,
      type: 'company',
      metadata: {}
    });
  });

  // Add use case chunks
  websiteContent.useCases.forEach(usecase => {
    chunks.push({
      id: usecase.id,
      text: usecase.chunk,
      type: 'usecase',
      metadata: {
        title: usecase.title,
        category: usecase.category,
        metrics: usecase.metrics
      }
    });
  });

  // Add contact chunks
  websiteContent.contact.forEach(contact => {
    chunks.push({
      id: contact.id,
      text: contact.chunk,
      type: 'contact',
      metadata: {}
    });
  });

  return chunks;
}

/**
 * Get chunks by type
 * @param {string} type - Type of chunk (service, faq, process, etc.)
 * @returns {Array} Filtered chunks
 */
function getChunksByType(type) {
  return getAllChunks().filter(chunk => chunk.type === type);
}

/**
 * Search chunks by keyword (simple text search)
 * @param {string} query - Search query
 * @returns {Array} Matching chunks
 */
function searchChunks(query) {
  const lowerQuery = query.toLowerCase();
  return getAllChunks().filter(chunk => 
    chunk.text.toLowerCase().includes(lowerQuery)
  );
}

module.exports = {
  getAllChunks,
  getChunksByType,
  searchChunks,
  websiteContent
};

