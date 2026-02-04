/**
 * RAG Pipeline Module
 * Retrieval Augmented Generation pipeline
 * 
 * Combines vector search with LLM generation for contextual responses
 */

const { generateEmbedding } = require('./embeddings');
const { searchSimilar } = require('./vectorStore');

/**
 * Retrieve relevant context for a query
 * @param {string} query - User query
 * @param {number} topK - Number of chunks to retrieve (default: 5)
 * @returns {Promise<Array>} Relevant chunks with metadata
 */
async function retrieveContext(query, topK = 5) {
  try {
    // Generate embedding for query
    const queryEmbedding = await generateEmbedding(query);

    // Search for similar chunks
    const similarChunks = searchSimilar(queryEmbedding, topK);

    return similarChunks.map(chunk => ({
      text: chunk.text,
      type: chunk.type,
      metadata: chunk.metadata,
      similarity: chunk.similarity
    }));
  } catch (error) {
    console.error('❌ Error retrieving context:', error);
    return [];
  }
}

/**
 * Build prompt for LLM with context
 * @param {string} query - User query
 * @param {Array} contextChunks - Retrieved context chunks
 * @param {Array} conversationHistory - Previous messages
 * @returns {string} Formatted prompt
 */
function buildPrompt(query, contextChunks, conversationHistory = []) {
  // System instructions
  const systemPrompt = `You are a senior AI consultant and automation expert representing XenFlowTech, an AI automation agency. Your role is to:

1. Answer questions accurately based ONLY on the provided context
2. Be helpful, professional, and conversational
3. If information isn't in the context, say so honestly
4. Gently guide interested users toward booking a consultation (only when appropriate)
5. Never fabricate pricing, timelines, or capabilities
6. Keep responses concise but informative (2-4 sentences typically)

Context about XenFlowTech:
${contextChunks.map((chunk, i) => `${i + 1}. ${chunk.text}`).join('\n')}

${conversationHistory.length > 0 ? `\nRecent conversation:\n${conversationHistory.slice(-3).map(msg => `${msg.role}: ${msg.content}`).join('\n')}` : ''}

User Question: ${query}

Provide a helpful, accurate response based on the context above. If the user seems interested in services, you may gently suggest booking a consultation.`;

  return systemPrompt;
}

/**
 * Classify user intent
 * @param {string} query - User query
 * @returns {string} Intent category
 */
function classifyIntent(query) {
  const lowerQuery = query.toLowerCase();

  // Enhanced intent patterns (more comprehensive)
  const intents = {
    service_inquiry: ['service', 'services', 'offer', 'offering', 'provide', 'providing', 'do you', 'what can', 
                      'what do', 'capabilities', 'solutions', 'chatbot', 'chatbots', 'automation', 'ai', 
                      'assistant', 'assistants', 'tool', 'tools', 'product', 'products'],
    pricing: ['price', 'prices', 'cost', 'costs', 'pricing', 'how much', 'fee', 'fees', 'quote', 'quotes', 
              'budget', 'afford', 'expensive', 'cheap', 'investment', 'pay', 'payment'],
    technical: ['how', 'how to', 'implement', 'implementation', 'integrate', 'integration', 'technical', 
                'technically', 'api', 'apis', 'code', 'coding', 'develop', 'development', 'build', 'built', 
                'setup', 'configure', 'architecture', 'tech', 'technology'],
    process: ['process', 'processes', 'timeline', 'timelines', 'how long', 'duration', 'steps', 'step', 
              'workflow', 'workflows', 'delivery', 'deliver', 'method', 'approach', 'way', 'procedure'],
    contact: ['contact', 'email', 'emails', 'phone', 'call', 'reach', 'reach out', 'get in touch', 
              'speak', 'talk', 'connect', 'communication', 'address', 'location', 'office'],
    general: ['what', 'who', 'about', 'tell me', 'explain', 'describe', 'information', 'info', 'know', 
              'learn', 'understand', 'help', 'assist']
  };

  // Score each intent
  const scores = {};
  for (const [intent, keywords] of Object.entries(intents)) {
    scores[intent] = keywords.filter(keyword => lowerQuery.includes(keyword)).length;
  }

  // Return highest scoring intent
  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) {
    return 'general';
  }

  return Object.keys(scores).find(intent => scores[intent] === maxScore);
}

/**
 * Generate lead conversion hint based on intent and engagement
 * @param {string} intent - User intent
 * @param {number} messageCount - Number of messages in session
 * @param {Array} contextChunks - Retrieved context
 * @returns {string|null} Subtle CTA or null
 */
function generateLeadHint(intent, messageCount, contextChunks) {
  // Only suggest after some engagement
  if (messageCount < 2) {
    return null;
  }

  const hints = {
    service_inquiry: 'Would you like to discuss how this could work for your business?',
    pricing: 'I\'d be happy to provide a custom quote. Would you like to schedule a brief call?',
    technical: 'Our team can dive deeper into the technical details. Shall I connect you with an expert?',
    process: 'Would you like to learn more about our process? We offer free consultations.',
    contact: null, // Already asking for contact
    general: messageCount >= 3 ? 'It sounds like you\'re exploring AI solutions. Would you like to book a free consultation?' : null
  };

  return hints[intent] || null;
}

module.exports = {
  retrieveContext,
  buildPrompt,
  classifyIntent,
  generateLeadHint
};

