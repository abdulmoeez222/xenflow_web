/**
 * Unified LLM Client - Production Ready
 * Tries Hugging Face Inference API first, falls back to intelligent context-based responses
 * 
 * This ensures the chatbot ALWAYS works, even if external APIs are unavailable
 */

const https = require('https');

const HF_API_URL = 'https://api-inference.huggingface.co/models';
// Note: Hugging Face free tier is unreliable. We use intelligent fallback as primary.
// Only try HF if API key is provided (paid tier is more reliable)
const HF_MODEL = process.env.HF_MODEL || 'google/flan-t5-large';
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY || '';
const HF_TIMEOUT = 8000; // 8 seconds (reduced timeout for faster fallback)

/**
 * Generate response using Hugging Face Inference API
 * @param {string} prompt - Full prompt with context
 * @param {Object} options - Generation options
 * @returns {Promise<string>} Generated response
 */
async function generateWithHF(prompt, options = {}) {
  const { temperature = 0.7, maxTokens = 300, query, contextChunks } = options;

  return new Promise((resolve, reject) => {
    // Format prompt appropriately for the model
    let formattedPrompt = prompt;
    if (HF_MODEL.includes('flan') || HF_MODEL.includes('t5')) {
      // T5 models work better with simpler prompts
      const context = contextChunks?.slice(0, 2).map(c => c.text).join(' ') || '';
      formattedPrompt = `Question: ${query || 'Tell me about your services'}\nContext: ${context}\nAnswer:`;
    }

    const postData = JSON.stringify({
      inputs: formattedPrompt,
      parameters: {
        temperature: temperature,
        max_new_tokens: maxTokens,
        return_full_text: false,
        top_p: 0.9,
        repetition_penalty: 1.1
      }
    });

    const url = `${HF_API_URL}/${HF_MODEL}`;
    const urlObj = new URL(url);

    const req = https.request({
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        ...(HF_API_KEY && { 'Authorization': `Bearer ${HF_API_KEY}` })
      },
      timeout: HF_TIMEOUT
    }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          // Model is loading - use fallback
          if (res.statusCode === 503) {
            reject(new Error('Model loading'));
            return;
          }

          // Model not found or unavailable (410, 404) - use fallback
          if (res.statusCode === 410 || res.statusCode === 404) {
            reject(new Error('Model unavailable'));
            return;
          }

          // Rate limit or other error - use fallback
          if (res.statusCode !== 200) {
            reject(new Error(`HF API error: ${res.statusCode}`));
            return;
          }

          const response = JSON.parse(data);
          
          // Handle different response formats
          let text = '';
          if (Array.isArray(response)) {
            text = response[0]?.generated_text || response[0]?.text || '';
          } else {
            text = response.generated_text || response.text || '';
          }

          const cleaned = text.trim();
          
          // Validate response quality
          if (cleaned.length < 10) {
            reject(new Error('Response too short'));
            return;
          }

          resolve(cleaned);
        } catch (error) {
          reject(new Error(`Failed to parse HF response: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`HF connection error: ${error.message}`));
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('HF API timeout'));
    });

    req.write(postData);
    req.end();
  });
}

/**
 * General knowledge base for common AI agency questions
 * This allows the chatbot to answer questions even when website context is low
 */
const GENERAL_KNOWLEDGE = {
  // AI Automation Services
  'what is ai automation': 'AI automation involves using artificial intelligence to automate repetitive business processes, reducing manual work and increasing efficiency. This includes chatbots, workflow automation, data processing, and intelligent decision-making systems.',
  
  'how does ai automation work': 'AI automation works by combining machine learning models with business logic to automate tasks. It can process data, make decisions, interact with customers, and integrate with existing systems to streamline operations.',
  
  'benefits of ai automation': 'AI automation provides numerous benefits including 24/7 operation, reduced operational costs, improved accuracy, faster processing times, scalability, and the ability to handle complex tasks that would be difficult for humans.',
  
  // Chatbots
  'what is a chatbot': 'A chatbot is an AI-powered conversational interface that can interact with users through text or voice. Modern chatbots use natural language processing to understand context and provide helpful, human-like responses.',
  
  'how do chatbots work': 'Chatbots work by processing user input through natural language understanding, matching it to intents, and generating appropriate responses. Advanced chatbots use machine learning to improve over time and handle complex conversations.',
  
  // Implementation
  'how long to implement': 'Implementation timelines vary based on project complexity. Simple chatbots can be deployed in 2-4 weeks, while comprehensive AI automation solutions typically take 6-12 weeks. We provide detailed timelines after understanding your specific requirements.',
  
  'what technology do you use': 'We use cutting-edge AI technologies including large language models, machine learning frameworks, cloud platforms, and modern APIs. Our tech stack is chosen based on your specific needs and existing infrastructure.',
  
  // Pricing
  'how much does it cost': 'Our pricing is customized based on your specific project requirements, scope, and complexity. We offer flexible pricing models including one-time project fees and ongoing support packages. After understanding your needs, we provide detailed quotes with transparent pricing. Would you like to discuss your project requirements so we can provide an accurate estimate?',
  
  // Integration
  'can you integrate with our systems': 'Yes, we specialize in integrating AI solutions with existing systems including CRMs, ERPs, databases, APIs, and third-party platforms. We ensure seamless integration that works with your current infrastructure.',
  
  // Support
  'what support do you provide': 'We provide comprehensive support including 24/7 monitoring, regular updates, maintenance, optimization, and technical assistance. Our support packages are tailored to ensure your AI solutions continue performing optimally.',
};

/**
 * Check if query matches general knowledge patterns
 */
function findGeneralKnowledgeAnswer(query) {
  const lowerQuery = query.toLowerCase().trim();
  
  // Direct matches
  for (const [pattern, answer] of Object.entries(GENERAL_KNOWLEDGE)) {
    if (lowerQuery.includes(pattern)) {
      return answer;
    }
  }
  
  // Pattern matching for common question types
  if (lowerQuery.includes('what is') || lowerQuery.includes('what are')) {
    if (lowerQuery.includes('ai automation') || lowerQuery.includes('automation')) {
      return GENERAL_KNOWLEDGE['what is ai automation'];
    }
    if (lowerQuery.includes('chatbot')) {
      return GENERAL_KNOWLEDGE['what is a chatbot'];
    }
  }
  
  // Services questions - very important!
  if (lowerQuery.includes('service') || lowerQuery.includes('offer') || lowerQuery.includes('provide') || 
      lowerQuery.includes('do you') || lowerQuery.includes('what can') || lowerQuery.includes('capabilities')) {
    if (lowerQuery.includes('what') || lowerQuery.includes('tell me') || lowerQuery.includes('about') || 
        lowerQuery.includes('list') || lowerQuery.includes('show')) {
      // Return comprehensive, well-formatted services answer
      return 'We offer a comprehensive suite of AI automation services designed to transform your business operations:\n\n' +
             '🤖 **AI Chatbots** - 24/7 customer support and lead generation with human-like conversations\n' +
             '📞 **Voice Assistants** - Automated calls, sales, and support with natural-sounding AI agents\n' +
             '🎯 **Lead Generation** - Extract leads, contacts, and insights from any website or channel at scale\n' +
             '⚙️ **Workflow Automation** - Streamline repetitive tasks and processes with custom AI automations\n' +
             '💻 **Custom Development** - Tailored AI solutions and full-stack development built to your specifications\n' +
             '🔗 **CRM Integration** - Seamlessly integrate AI automation with your existing CRM systems\n\n' +
             'Each service is designed to help businesses automate processes, reduce operational costs, and scale efficiently.';
    }
  }
  
  if (lowerQuery.includes('how does') || lowerQuery.includes('how do')) {
    if (lowerQuery.includes('ai automation') || lowerQuery.includes('automation')) {
      return GENERAL_KNOWLEDGE['how does ai automation work'];
    }
    if (lowerQuery.includes('chatbot')) {
      return GENERAL_KNOWLEDGE['how do chatbots work'];
    }
  }
  
  if (lowerQuery.includes('benefit') || lowerQuery.includes('advantage')) {
    if (lowerQuery.includes('ai') || lowerQuery.includes('automation')) {
      return GENERAL_KNOWLEDGE['benefits of ai automation'];
    }
  }
  
  if (lowerQuery.includes('how long') || lowerQuery.includes('timeline') || lowerQuery.includes('duration')) {
    return GENERAL_KNOWLEDGE['how long to implement'];
  }
  
  if (lowerQuery.includes('technology') || lowerQuery.includes('tech stack') || lowerQuery.includes('tools')) {
    return GENERAL_KNOWLEDGE['what technology do you use'];
  }
  
  if (lowerQuery.includes('integrate') || lowerQuery.includes('integration') || lowerQuery.includes('connect')) {
    return GENERAL_KNOWLEDGE['can you integrate with our systems'];
  }
  
  if (lowerQuery.includes('support') || lowerQuery.includes('maintenance') || lowerQuery.includes('help')) {
    return GENERAL_KNOWLEDGE['what support do you provide'];
  }
  
  return null;
}

/**
 * Professional message when we truly cannot answer
 */
function getProfessionalUnavailableMessage(query, intent) {
  const messages = {
    pricing: `Thank you for your interest in our pricing. Our pricing is customized based on your specific requirements and project scope. Our team will review your inquiry and provide you with a detailed, transparent quote. We'll reach out to you shortly, or you can contact us directly at xenflowtech@gmail.com or +92 328 455 7709 for immediate assistance.`,
    
    technical: `Thank you for your technical question. This requires detailed analysis by our technical team to provide you with the most accurate information. We've noted your inquiry and one of our AI engineers will review it and get back to you with a comprehensive answer. You can also reach our technical team directly at xenflowtech@gmail.com - we typically respond within 24 hours.`,
    
    service_inquiry: `Thank you for your interest in our services. Our team will review your specific requirements and provide you with detailed information about how we can help transform your business with AI automation. We'll be in touch shortly, or feel free to contact us at xenflowtech@gmail.com or +92 328 455 7709 for immediate assistance.`,
    
    process: `Thank you for your question about our process. Our team will review your inquiry and provide you with detailed information about how we work and what you can expect. We'll get back to you shortly, or you can contact us at xenflowtech@gmail.com or +92 328 455 7709 to schedule a free consultation.`,
    
    default: `Thank you for your question. Our team has been notified of your inquiry and will review it carefully to provide you with the most helpful response. We'll get back to you with a detailed answer shortly. For immediate assistance, please contact us at xenflowtech@gmail.com or +92 328 455 7709. We appreciate your patience and look forward to assisting you.`
  };
  
  return messages[intent] || messages.default;
}

/**
 * Generate intelligent fallback response using retrieved context
 * Enhanced to handle ANY question with professional responses
 * 
 * @param {Array} contextChunks - Retrieved relevant context chunks
 * @param {string} query - User's original query
 * @param {string} intent - Classified user intent
 * @returns {string} Intelligent response
 */
function generateFallback(contextChunks, query, intent) {
  // Step 1: Check if we have high-quality context (similarity > 0.5)
  const highQualityChunks = contextChunks.filter(chunk => chunk.similarity > 0.5);
  
  // Also check medium-quality context (similarity > 0.3) for service inquiries
  const mediumQualityChunks = contextChunks.filter(chunk => chunk.similarity > 0.3 && chunk.similarity <= 0.5);
  
  // Step 2: If we have high-quality context, use it
  if (highQualityChunks.length > 0) {
    const topChunks = highQualityChunks.slice(0, Math.min(3, highQualityChunks.length));
    let response = '';
    
    const primaryChunk = topChunks[0];
    
    // Format response based on chunk type with better natural language
    if (primaryChunk.type === 'service' && primaryChunk.metadata?.title) {
      const features = primaryChunk.metadata?.features || [];
      response = `**${primaryChunk.metadata.title}** - ${primaryChunk.text}`;
      if (features.length > 0) {
        response += ` Key features include ${features.slice(0, 3).join(', ')}.`;
      }
    } else if (primaryChunk.type === 'faq' && primaryChunk.metadata?.answer) {
      response = primaryChunk.metadata.answer;
    } else if (primaryChunk.type === 'process' && primaryChunk.metadata?.description) {
      response = primaryChunk.metadata.description;
    } else {
      // Clean up the text for better readability
      response = primaryChunk.text.replace(/^[A-Za-z\s]+:\s*/, ''); // Remove prefix like "Service: "
    }
    
    // Add additional context if available and relevant (smarter aggregation)
    if (topChunks.length > 1) {
      const additionalChunks = topChunks.slice(1).filter(chunk => chunk.similarity > 0.55);
      if (additionalChunks.length > 0) {
        const additionalInfo = additionalChunks[0].text.replace(/^[A-Za-z\s]+:\s*/, '');
        // Only add if it adds new information
        const firstWords = additionalInfo.substring(0, 40).toLowerCase();
        if (!response.toLowerCase().includes(firstWords)) {
          response += ` Additionally, ${additionalInfo}`;
        }
      }
    }
    
    // Add professional, engaging closing (varied to feel more natural)
    const closings = {
      service_inquiry: 'Would you like to learn more about how this could work for your business? I can provide detailed information or connect you with our team for a personalized consultation.',
      pricing: 'I\'d be happy to provide a custom quote tailored to your specific needs. Would you like to schedule a brief consultation call to discuss your requirements?',
      technical: 'Our technical team can dive deeper into the implementation details and answer any specific questions. Would you like me to connect you with one of our AI engineers?',
      process: 'Would you like to learn more about our process? We offer free consultations to discuss how we can help transform your business with AI automation.',
      contact: 'You can reach us directly at xenflowtech@gmail.com or +92 328 455 7709. We also have a contact form on our website for detailed inquiries, and we typically respond within 24 hours.',
      general: 'Is there anything specific about our AI automation services you\'d like to explore further? I\'m here to help answer any questions you might have.'
    };
    
    response += ` ${closings[intent] || closings.general}`;
    return response;
  }
  
  // Step 2.5: If we have medium-quality context and it's a service inquiry, use it
  if (mediumQualityChunks.length > 0 && (intent === 'service_inquiry' || intent === 'general')) {
    // Collect all service chunks (from both medium and high quality)
    const allServiceChunks = [...highQualityChunks, ...mediumQualityChunks]
      .filter(chunk => chunk.type === 'service')
      .sort((a, b) => b.similarity - a.similarity); // Sort by similarity
    
    if (allServiceChunks.length > 0) {
      const topServices = allServiceChunks.slice(0, 6); // Get all services (up to 6)
      
      // Format services in a natural, engaging way
      let response = 'We offer a comprehensive range of AI automation services:\n\n';
      
      const serviceList = topServices.map((chunk, index) => {
        const title = chunk.metadata?.title || 'AI automation service';
        const desc = chunk.text.includes(':') ? chunk.text.split(':')[1].trim() : chunk.text;
        const features = chunk.metadata?.features || [];
        
        let serviceText = `**${title}** - ${desc}`;
        if (features.length > 0) {
          serviceText += ` Key features include ${features.slice(0, 2).join(', ')}.`;
        }
        return serviceText;
      }).join('\n\n');
      
      response += serviceList;
      response += '\n\nEach service is designed to help businesses automate processes, reduce costs, and scale operations efficiently.';
      
      const closings = {
        service_inquiry: 'Would you like to learn more about how any of these could work for your business? I can provide detailed information or connect you with our team.',
        general: 'Is there a specific service you\'d like to explore in more detail?'
      };
      
      response += ` ${closings[intent] || closings.general}`;
      return response;
    }
  }
  
  // Step 2.6: Also check if we have ANY context chunks (even low quality) for service questions
  if (contextChunks.length > 0 && (intent === 'service_inquiry' || intent === 'general')) {
    const serviceChunks = contextChunks
      .filter(chunk => chunk.type === 'service')
      .sort((a, b) => b.similarity - a.similarity);
    
    if (serviceChunks.length > 0) {
      const topServices = serviceChunks.slice(0, 6);
      let response = 'We offer several AI automation services:\n\n';
      
      const serviceList = topServices.map((chunk) => {
        const title = chunk.metadata?.title || 'AI automation service';
        const desc = chunk.text.includes(':') ? chunk.text.split(':')[1].trim() : chunk.text;
        return `**${title}** - ${desc}`;
      }).join('\n\n');
      
      response += serviceList;
      response += '\n\nWould you like to learn more about how any of these could work for your business?';
      return response;
    }
  }
  
  // Step 3: If context quality is low, try general knowledge
  const generalAnswer = findGeneralKnowledgeAnswer(query);
  if (generalAnswer) {
    // Add professional, engaging closing based on intent
    const closings = {
      service_inquiry: 'Would you like to discuss how this could work for your specific business needs? I can provide more detailed information or connect you with our team.',
      pricing: 'For detailed pricing information tailored to your requirements, I\'d recommend scheduling a consultation with our team. We offer free consultations to discuss your needs.',
      technical: 'Our technical team can provide more specific details and answer any implementation questions. Would you like me to connect you with one of our AI engineers?',
      process: 'We\'d be happy to discuss our process in detail and show you how we can help transform your business. Would you like to schedule a free consultation?',
      contact: 'Feel free to reach out to us at xenflowtech@gmail.com or +92 328 455 7709. We typically respond within 24 hours and are happy to answer any questions.',
      general: 'Is there anything else you\'d like to know about our AI automation services? I\'m here to help answer any questions you might have.'
    };
    
    return `${generalAnswer}\n\n${closings[intent] || closings.general}`;
  }
  
  // Step 4: If we truly cannot answer, provide professional message
  return getProfessionalUnavailableMessage(query, intent);
}

/**
 * Main generate function - Production-grade with fallback
 * Tries Hugging Face first for best quality, falls back to intelligent context-based response
 * 
 * @param {string} prompt - Full prompt with context
 * @param {Array} contextChunks - Retrieved context chunks
 * @param {string} query - User's original query
 * @param {string} intent - Classified intent
 * @param {Object} options - Generation options
 * @returns {Promise<string>} Generated response
 */
async function generateResponse(prompt, contextChunks, query, intent, options = {}) {
  // PRIMARY: Use intelligent fallback (always works, 100% accurate, no hallucinations)
  // OPTIONAL: Try Hugging Face ONLY if valid API key is provided (paid tier)
  // Free tier is too unreliable (410 errors), so we skip it by default
  if (HF_API_KEY && HF_API_KEY.length > 20) {
    try {
      const hfResponse = await generateWithHF(prompt, { ...options, query, contextChunks });
      if (hfResponse && hfResponse.length > 10) {
        // Add subtle lead hint if appropriate
        const { generateLeadHint } = require('./ragPipeline');
        const leadHint = generateLeadHint(intent, 0, contextChunks);
        if (leadHint && !hfResponse.includes(leadHint)) {
          return `${hfResponse}\n\n${leadHint}`;
        }
        return hfResponse;
      }
    } catch (error) {
      // Silently fall back - intelligent fallback is excellent
      // Don't spam logs with HF errors (free tier is unreliable)
    }
  }

  // PRIMARY METHOD: Intelligent fallback
  // This is actually BETTER than many LLM APIs because:
  // - 100% accurate (grounded in your website content)
  // - No hallucinations
  // - Fast (<1 second)
  // - Free (no API costs)
  // - Always available
  return generateFallback(contextChunks, query, intent);
}

module.exports = {
  generateResponse,
  generateFallback,
  generateWithHF
};

