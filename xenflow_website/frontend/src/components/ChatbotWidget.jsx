import React, { useState } from 'react';

const FAQ = [
  { q: 'What services do you offer', a: 'We offer AI chatbots, voice assistants, lead generation, and workflow automation for businesses. Each solution is tailored to your needs.' },
  { q: 'how can ai help', a: 'AI can automate repetitive tasks, improve customer support, generate leads, and boost your business efficiency.' },
  { q: 'how do i get started', a: 'Just book a meeting or contact us through the website. Our team will guide you through every step.' },
  { q: 'is my data safe', a: 'Absolutely! We use secure, encrypted databases and follow best practices to keep your data private.' },
  { q: 'do you offer custom solutions', a: 'Yes, we tailor our AI solutions to fit your unique business needs. Let us know your requirements!' },
  { q: 'contact', a: 'You can contact us via the Contact page or email us at xenflowtech@gmail.com. We respond within 24 hours.' },
  { q: 'email', a: 'Our email is xenflowtech@gmail.com. We look forward to hearing from you!' },
  { q: 'phone', a: 'You can reach us at . For the fastest response, use our contact form.' },
  { q: 'support', a: 'For support, use the Contact page or email xenflowtech@gmail.com We’re here to help!' },
  { q: 'pricing', a: 'Our pricing depends on your needs. Book a free consultation and we’ll provide a custom quote.' },
  { q: 'who are you', a: 'I am XenFlowTech’s AI assistant, here to help you with anything about our company, services, or automation.' },
  { q: 'what is xenflowtech', a: 'XenFlowTech is an AI automation agency helping businesses grow with advanced AI solutions.' },
  { q: 'book meeting', a: 'You can book a meeting directly on our website using the Book Meeting page. We look forward to speaking with you!' },
];

async function fetchAIMessage(message, history) {
  const lower = message.toLowerCase();
  const match = FAQ.find(f => lower.includes(f.q));
  if (match) return match.a;
  // Friendly fallback
  return "I'm XenFlowTech's AI assistant. I can help you with our services, booking, support, or any questions about AI automation. Try asking about our services, how to contact us, or how we can help your business!";
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I am XenFlowTech’s AI assistant. How can I help you today?' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages(msgs => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    const botReply = await fetchAIMessage(input, messages);
    setMessages(msgs => [...msgs, { from: 'bot', text: botReply }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-accent hover:bg-accent2 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl focus:outline-none transition-all animate-float ring-4 ring-accent/40 hover:ring-accent2/60"
        aria-label="Open AI Chatbot"
        style={{ boxShadow: '0 0 24px 4px #FF174488' }}
      >
        💬
      </button>
      {open && (
        <div className="mt-2 bg-dark/90 backdrop-blur-md text-light rounded-xl shadow-2xl p-4 w-80 max-w-xs animate-fade-in border border-accent/20 flex flex-col" style={{height:'420px'}}>
          <div className="font-bold text-accent mb-2 text-lg">AI Chatbot</div>
          <div className="flex-1 overflow-y-auto mb-2 pr-1" style={{maxHeight:'300px'}}>
            {messages.map((msg, i) => (
              <div key={i} className={`mb-2 flex ${msg.from==='user'?'justify-end':'justify-start'}`}>
                <div className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${msg.from==='user'?'bg-accent text-white':'bg-primary/80 text-light'}`}>{msg.text}</div>
              </div>
            ))}
            {loading && <div className="text-xs text-neutral-400">Thinking...</div>}
          </div>
          <div className="flex gap-2 mt-2">
            <input
              className="flex-1 p-2 rounded bg-primary border border-accent/20 text-light focus:ring-2 focus:ring-accent outline-none"
              placeholder="Type your question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key==='Enter') handleSend(); }}
              disabled={loading}
            />
            <button
              onClick={handleSend}
              className="bg-accent hover:bg-accent2 text-white rounded px-4 py-2 font-bold disabled:opacity-60"
              disabled={loading || !input.trim()}
            >Send</button>
          </div>
          <div className="text-xs text-gray-400 mt-2">Ask about our AI services, automation, or how we can help your business!</div>
        </div>
      )}
    </div>
  );
} 