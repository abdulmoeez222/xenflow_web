import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaTimes, FaSpinner } from 'react-icons/fa';

// Use localhost for development, production URL for production
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? 'http://localhost:5000' : 'https://xenflow-backend.onrender.com');

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      from: 'bot', 
      text: 'Hi! I\'m XenFlowTech\'s AI consultant. I can help you learn about our AI automation services, answer questions about our process, or connect you with our team. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Generate or retrieve session ID
  useEffect(() => {
    if (!sessionId) {
      const stored = localStorage.getItem('chatbot_session_id');
      if (stored) {
        setSessionId(stored);
      } else {
        const newId = crypto.randomUUID();
        setSessionId(newId);
        localStorage.setItem('chatbot_session_id', newId);
      }
    }
  }, [sessionId]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    const userMsg = { 
      from: 'user', 
      text: userMessage,
      timestamp: new Date()
    };

    setMessages(msgs => [...msgs, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionId
        })
      });

      const data = await response.json();

      if (data.success) {
        const botMsg = { 
          from: 'bot', 
          text: data.message,
          timestamp: new Date()
        };
        setMessages(msgs => [...msgs, botMsg]);
      } else {
        throw new Error(data.message || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      console.error('API URL:', API_BASE_URL);
      
      // More helpful error message
      let errorText = 'I apologize, but I\'m having trouble connecting right now. ';
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorText += 'Please make sure the backend server is running on http://localhost:5000. ';
      }
      errorText += 'Please try again in a moment, or feel free to contact us directly at xenflowtech@gmail.com';
      
      const errorMsg = { 
        from: 'bot', 
        text: errorText,
        timestamp: new Date(),
        error: true
      };
      setMessages(msgs => [...msgs, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      { 
        from: 'bot', 
        text: 'Hi! I\'m XenFlowTech\'s AI consultant. How can I help you today?',
        timestamp: new Date()
      }
    ]);
    if (sessionId) {
      fetch(`${API_BASE_URL}/api/chat/session/${sessionId}`, {
        method: 'DELETE'
      }).catch(console.error);
    }
  };

  const quickQuestions = [
    'What services do you offer?',
    'How much does it cost?',
    'How long does implementation take?',
    'Can you integrate with our systems?'
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5">
      {/* Message Bubble - Shows when chat is closed */}
      {!open && (
        <div className="bg-gradient-to-br from-accent/98 to-accent2/98 backdrop-blur-md text-white rounded-xl px-3.5 py-2.5 shadow-xl border border-white/30 animate-fade-in max-w-[280px] sm:max-w-[320px]">
          <div className="flex items-center gap-2.5">
            <div className="text-xl sm:text-2xl flex-shrink-0">
              🤖
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium leading-tight text-white">
                Hi, I'm <span className="font-semibold">XenFlow's Assistant</span>
              </p>
              <p className="text-[10px] sm:text-xs text-white/75 mt-0.5 leading-tight">
                How can I help you today?
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-accent hover:bg-accent2 text-white rounded-full shadow-xl w-14 h-14 flex items-center justify-center text-2xl focus:outline-none transition-all animate-float ring-2 ring-accent/30 hover:ring-accent2/50 group"
        aria-label="Open AI Chatbot"
        style={{ boxShadow: '0 4px 16px rgba(177, 0, 30, 0.4)' }}
      >
        {open ? <FaTimes className="text-xl" /> : '💬'}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="mt-2 bg-gradient-to-br from-dark/95 to-primary/95 backdrop-blur-xl text-light rounded-2xl shadow-2xl w-96 max-w-[calc(100vw-2rem)] flex flex-col border-2 border-accent/30 animate-fade-in"
          style={{ height: '600px', maxHeight: 'calc(100vh - 8rem)' }}>
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-accent/20 bg-gradient-to-r from-accent/10 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent2 flex items-center justify-center text-white font-bold text-lg">
                AI
              </div>
              <div>
                <div className="font-bold text-accent text-lg">AI Consultant</div>
                <div className="text-xs text-light/60">XenFlowTech</div>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="text-light/60 hover:text-light text-sm px-2 py-1 rounded hover:bg-white/10 transition-colors"
              title="Clear chat"
            >
              Clear
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide" style={{ maxHeight: '400px' }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-lg ${
                    msg.from === 'user'
                      ? 'bg-gradient-to-br from-accent to-accent2 text-white'
                      : 'bg-white/10 backdrop-blur-sm text-light border border-white/10'
                  } ${msg.error ? 'border-red-500/50' : ''}`}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {msg.text}
                  </div>
                  <div className={`text-xs mt-1.5 ${msg.from === 'user' ? 'text-white/70' : 'text-light/40'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white/10 backdrop-blur-sm text-light rounded-2xl px-4 py-3 shadow-lg border border-white/10">
                  <div className="flex items-center gap-2">
                    <FaSpinner className="animate-spin text-accent" />
                    <span className="text-sm text-light/70">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Questions (show when no messages or first interaction) */}
            {messages.length <= 1 && !loading && (
              <div className="space-y-2 mt-4">
                <div className="text-xs text-light/50 mb-2">Quick questions:</div>
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInput(q);
                      setTimeout(() => handleSend(), 100);
                    }}
                    className="w-full text-left text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-light/80 hover:text-light transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-accent/20 bg-gradient-to-r from-accent/5 to-transparent">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border-2 border-white/20 text-light placeholder:text-light/40 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all backdrop-blur-sm"
                placeholder="Ask me anything..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-accent hover:bg-accent2 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl px-5 py-2.5 font-bold transition-all shadow-lg hover:shadow-accent/50 flex items-center justify-center min-w-[60px]"
              >
                {loading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaPaperPlane />
                )}
              </button>
            </div>
            <div className="text-xs text-light/40 mt-2 text-center">
              Ask about our AI services, automation, or how we can help your business
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
