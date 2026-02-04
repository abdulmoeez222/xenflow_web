/**
 * Chat API Route
 * Handles chatbot conversations with RAG pipeline
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { retrieveContext, buildPrompt, classifyIntent, generateLeadHint } = require('../chatbot/ragPipeline');
const { generateResponse: generateLLMResponse } = require('../chatbot/llmClient');

// In-memory session storage (for production, use Redis or database)
const sessions = new Map();

/**
 * Get or create session
 * @param {string} sessionId - Session ID
 * @returns {Object} Session object
 */
function getSession(sessionId) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      id: sessionId,
      messages: [],
      createdAt: new Date(),
      lastActivity: new Date()
    });
  }
  return sessions.get(sessionId);
}

/**
 * Clean up old sessions (older than 1 hour)
 */
function cleanupSessions() {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  for (const [id, session] of sessions.entries()) {
    if (session.lastActivity < oneHourAgo) {
      sessions.delete(id);
    }
  }
}

// Cleanup every 30 minutes
setInterval(cleanupSessions, 30 * 60 * 1000);

/**
 * POST /api/chat
 * Handle chat message
 */
router.post('/chat',
  [
    body('message')
      .trim()
      .notEmpty()
      .withMessage('Message is required')
      .isLength({ min: 1, max: 1000 })
      .withMessage('Message must be between 1 and 1000 characters')
      .escape(),
    body('sessionId')
      .optional()
      .trim()
      .isUUID()
      .withMessage('Invalid session ID')
  ],
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { message, sessionId } = req.body;

      // Generate or use provided session ID
      const currentSessionId = sessionId || require('crypto').randomUUID();
      const session = getSession(currentSessionId);
      session.lastActivity = new Date();

      // Add user message to history
      session.messages.push({
        role: 'user',
        content: message,
        timestamp: new Date().toISOString()
      });

      // Classify intent
      const intent = classifyIntent(message);

      // Retrieve relevant context
      const contextChunks = await retrieveContext(message, 5);

      // Build conversation history (last 5 messages for context)
      const conversationHistory = session.messages.slice(-5).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Build prompt
      const prompt = buildPrompt(message, contextChunks, conversationHistory);

      // Generate response (tries Hugging Face, falls back to intelligent context-based response)
      // This ensures the chatbot ALWAYS works, even if external APIs are unavailable
      const botResponse = await generateLLMResponse(
        prompt,
        contextChunks,
        message,
        intent,
        {
          temperature: 0.7,
          maxTokens: 300
        }
      );

      // Add bot response to history
      session.messages.push({
        role: 'assistant',
        content: botResponse,
        timestamp: new Date().toISOString()
      });

      // Return response
      res.json({
        success: true,
        message: botResponse,
        sessionId: currentSessionId,
        intent: intent,
        contextUsed: contextChunks.length > 0
      });

    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing your message. Please try again.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

/**
 * GET /api/chat/session/:sessionId
 * Get session history
 */
router.get('/chat/session/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const session = getSession(sessionId);

  res.json({
    success: true,
    session: {
      id: session.id,
      messages: session.messages,
      createdAt: session.createdAt,
      lastActivity: session.lastActivity
    }
  });
});

/**
 * DELETE /api/chat/session/:sessionId
 * Clear session
 */
router.delete('/chat/session/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  sessions.delete(sessionId);

  res.json({
    success: true,
    message: 'Session cleared'
  });
});

module.exports = router;

