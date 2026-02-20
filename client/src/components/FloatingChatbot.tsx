import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

export function FloatingChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: "bot",
            text: "Hi, I'm Xenflow's Assistant. How can I help you today?",
        },
    ]);
    const [inputValue, setInputValue] = useState("");

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage = inputValue;
        setMessages((prev) => [...prev, { type: "user", text: userMessage }]);
        setInputValue("");

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage }),
            });
            const data = await response.json();

            if (data.success) {
                setMessages((prev) => [
                    ...prev,
                    { type: "bot", text: data.message },
                ]);
            } else {
                throw new Error("Failed to get response");
            }
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    type: "bot",
                    text: "Sorry, I'm having trouble connecting right now. Please try again later.",
                },
            ]);
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <motion.div
                className="fixed bottom-6 right-6 z-50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
            >
                {/* Chat Toggle Button */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-16 h-16 rounded-full bg-primary hover:bg-red-600 shadow-2xl flex items-center justify-center transition-colors relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                        y: isOpen ? 0 : [0, -8, 0], // Bounce animation when closed
                    }}
                    transition={{
                        y: {
                            duration: 2,
                            repeat: isOpen ? 0 : Infinity,
                            ease: "easeInOut",
                        },
                    }}
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X className="w-7 h-7 text-white" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="chat"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <svg
                                    className="w-7 h-7 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                                </svg>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </motion.div>

            {/* Chat Window - constrained below nav, responsive width, safe on all viewports */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed right-3 sm:right-6 top-[7rem] bottom-20 w-[calc(100vw-1.5rem)] max-w-[380px] min-h-[280px] max-h-[calc(100vh-7rem-5rem)] bg-black border border-white/20 rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden"
                    >
                        {/* Header - compact */}
                        <div className="flex-shrink-0 bg-gradient-to-r from-primary to-red-600 px-3 py-2.5 sm:p-4 flex items-center gap-2 sm:gap-3">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                                <img
                                    src="/chatbot-icon.png"
                                    alt="Chatbot"
                                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.parentElement!.innerHTML = '🤖';
                                    }}
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="font-bold text-white text-sm sm:text-base truncate">Xenflow Assistant</h3>
                                <p className="text-xs text-white/80">Online</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="sm:hidden flex-shrink-0 w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                aria-label="Close chat"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages - scrollable */}
                        <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.type === "user"
                                            ? "bg-primary text-white"
                                            : "bg-white/10 text-white border border-white/10"
                                            }`}
                                    >
                                        <p className="text-sm">{message.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Input - fixed at bottom */}
                        <div className="flex-shrink-0 p-3 sm:p-4 border-t border-white/10 bg-black">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Type your message..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 text-sm"
                                />
                                <button
                                    onClick={handleSend}
                                    className="bg-primary hover:bg-red-600 rounded-xl px-4 py-3 transition-colors"
                                >
                                    <Send className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
