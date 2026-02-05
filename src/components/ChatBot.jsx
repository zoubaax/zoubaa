import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2, Minimize2, Maximize2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

const ChatBot = ({ drakeMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hello! 👋 I'm your guide to Mohammed's portfolio. I can tell you about his skills, projects, experience, and more. What would you like to know?"
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const [isMinimized, setIsMinimized] = useState(false);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    useEffect(() => {
        if (isOpen && !isMinimized) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 300);
        }
    }, [isOpen, isMinimized]);

    const handleSend = async (e, directMessage = null) => {
        if (e && e.preventDefault) e.preventDefault();

        const messageToSend = directMessage || input;
        if (!messageToSend.trim() || isLoading) return;

        const userMessage = messageToSend.trim();
        if (!directMessage) setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);
        setIsTyping(true);

        try {
            const { data, error } = await supabase.functions.invoke('portfolio-chat', {
                body: { message: userMessage, history: messages }
            });

            if (error) throw error;

            // Simulate typing delay for better UX
            await new Promise(resolve => setTimeout(resolve, 800));

            setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        } catch (error) {
            console.error('Chat Error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I'm having trouble connecting right now. Feel free to reach out to Mohammed directly via the contact form or email!"
            }]);
        } finally {
            setIsLoading(false);
            setIsTyping(false);
        }
    };

    const handleQuickQuestion = (question) => {
        // Automatically send the message when a quick question is clicked
        handleSend(null, question);
    };

    const chatVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 20,
            transformOrigin: 'bottom right'
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 25
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: 20,
            transition: {
                duration: 0.2
            }
        }
    };

    const quickQuestions = [
        "Tell me about Mohammed's skills",
        "What projects has he worked on?",
        "What's his experience?",
        "How can I contact him?"
    ];

    return (
        <div className="fixed bottom-6 right-6 z-[9999] font-sans">
            {/* Floating Action Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className={`group relative p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${drakeMode
                        ? 'bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 text-white'
                        : 'bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 text-white'
                        } hover:shadow-3xl hover:shadow-blue-500/30`}
                >
                    <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <div className="absolute -top-1 -right-1">
                        <div className="relative">
                            <div className={`absolute inset-0 animate-ping ${drakeMode ? 'bg-cyan-400' : 'bg-blue-400'} rounded-full opacity-75`}></div>
                            <div className={`relative w-3 h-3 ${drakeMode ? 'bg-cyan-400' : 'bg-blue-400'} rounded-full`}></div>
                        </div>
                    </div>
                </motion.button>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={chatVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`flex flex-col rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 backdrop-blur-sm ${isMinimized ? 'h-16 w-64' : 'h-[600px] w-[380px] md:w-[440px]'
                            } ${drakeMode
                                ? 'bg-gradient-to-b from-[#0A1A3A]/95 to-[#152A55]/95 border border-cyan-500/20 text-white'
                                : 'bg-gradient-to-b from-white to-blue-50/95 border border-blue-100 text-gray-900'
                            }`}
                    >
                        {/* Header */}
                        <div className={`p-4 flex items-center justify-between ${drakeMode
                            ? 'bg-gradient-to-r from-blue-900/50 to-cyan-900/30 border-b border-cyan-500/10'
                            : 'bg-gradient-to-r from-blue-600 to-cyan-500 border-b border-blue-200'
                            } text-white shadow-lg`}>
                            <div className="flex items-center gap-3">
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                                    className={`p-2 rounded-xl ${drakeMode ? 'bg-white/10' : 'bg-white/20'} backdrop-blur-sm`}
                                >
                                    <Bot className="w-5 h-5" />
                                </motion.div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-sm">Portfolio Assistant</h3>
                                        <Sparkles className="w-3 h-3 text-yellow-300" />
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <motion.span
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
                                        ></motion.span>
                                        <span className="text-[10px] opacity-90 uppercase tracking-wider font-semibold">Ready to assist</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
                                >
                                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
                                >
                                    <X className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        {!isMinimized && (
                            <>
                                <div className={`flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-track-transparent ${drakeMode
                                    ? 'scrollbar-thumb-cyan-500/30 hover:scrollbar-thumb-cyan-500/50'
                                    : 'scrollbar-thumb-blue-200 hover:scrollbar-thumb-blue-300'
                                    }`}>
                                    {messages.map((msg, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${msg.role === 'user'
                                                    ? drakeMode
                                                        ? 'bg-gradient-to-br from-blue-500 to-cyan-400 text-white'
                                                        : 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white'
                                                    : drakeMode
                                                        ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30'
                                                        : 'bg-gradient-to-br from-blue-100 to-cyan-50 text-blue-600 border border-blue-200'
                                                    }`}>
                                                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                                </div>
                                                <motion.div
                                                    initial={{ scale: 0.95 }}
                                                    animate={{ scale: 1 }}
                                                    className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                                        ? drakeMode
                                                            ? 'bg-gradient-to-r from-blue-600/90 to-cyan-600/90 text-white rounded-br-none'
                                                            : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-br-none'
                                                        : drakeMode
                                                            ? 'bg-gradient-to-r from-blue-900/30 to-cyan-900/20 text-gray-200 rounded-bl-none border border-cyan-500/10'
                                                            : 'bg-gradient-to-r from-gray-50 to-blue-50 text-gray-800 rounded-bl-none border border-blue-100'
                                                        }`}
                                                >
                                                    {msg.content}
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {isTyping && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex justify-start"
                                        >
                                            <div className="flex gap-3 max-w-[85%]">
                                                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${drakeMode
                                                    ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30'
                                                    : 'bg-gradient-to-br from-blue-100 to-cyan-50 text-blue-600 border border-blue-200'
                                                    }`}>
                                                    <Bot className="w-4 h-4" />
                                                </div>
                                                <div className={`p-4 rounded-2xl rounded-bl-none ${drakeMode
                                                    ? 'bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-cyan-500/10'
                                                    : 'bg-gradient-to-r from-gray-50 to-blue-50 border border-blue-100'
                                                    }`}>
                                                    <div className="flex items-center gap-1">
                                                        <motion.div
                                                            animate={{ y: [0, -5, 0] }}
                                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                                            className={`w-2 h-2 rounded-full ${drakeMode ? 'bg-cyan-400' : 'bg-blue-400'}`}
                                                        />
                                                        <motion.div
                                                            animate={{ y: [0, -5, 0] }}
                                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                                            className={`w-2 h-2 rounded-full ${drakeMode ? 'bg-cyan-400' : 'bg-blue-400'}`}
                                                        />
                                                        <motion.div
                                                            animate={{ y: [0, -5, 0] }}
                                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                                            className={`w-2 h-2 rounded-full ${drakeMode ? 'bg-cyan-400' : 'bg-blue-400'}`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {messages.length === 1 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            className="mt-4"
                                        >
                                            <p className={`text-xs font-medium mb-3 ${drakeMode ? 'text-cyan-300/70' : 'text-blue-600/70'} text-center`}>
                                                Try asking about:
                                            </p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {quickQuestions.map((question, idx) => (
                                                    <motion.button
                                                        key={idx}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => handleQuickQuestion(question)}
                                                        className={`p-3 text-xs rounded-xl text-left transition-all duration-300 ${drakeMode
                                                            ? 'bg-blue-900/30 hover:bg-blue-800/40 border border-cyan-500/10 hover:border-cyan-400/30 text-gray-200'
                                                            : 'bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 text-gray-700'
                                                            }`}
                                                    >
                                                        {question}
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input Area */}
                                <motion.form
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onSubmit={handleSend}
                                    className={`p-4 pt-3 ${drakeMode
                                        ? 'bg-gradient-to-t from-blue-900/20 to-transparent border-t border-cyan-500/10'
                                        : 'bg-gradient-to-t from-blue-50/50 to-transparent border-t border-blue-100'
                                        } shadow-inner`}
                                >
                                    <div className={`flex items-center gap-2 p-2 rounded-xl border-2 transition-all duration-300 shadow-sm ${drakeMode
                                        ? 'bg-blue-900/20 border-cyan-500/20 focus-within:border-cyan-400/40 focus-within:shadow-cyan-500/10'
                                        : 'bg-white border-blue-200 focus-within:border-blue-400 focus-within:shadow-blue-200'
                                        }`}>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Ask about Mohammed's skills, projects, or experience..."
                                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm p-2 outline-none placeholder-gray-400"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSend(e);
                                                }
                                            }}
                                        />
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            type="submit"
                                            disabled={!input.trim() || isLoading}
                                            className={`p-2.5 rounded-xl transition-all duration-300 shadow-md ${!input.trim() || isLoading
                                                ? 'opacity-50 cursor-not-allowed'
                                                : drakeMode
                                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white'
                                                    : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white'
                                                }`}
                                        >
                                            <Send className="w-4 h-4" />
                                        </motion.button>
                                    </div>
                                    <p className={`text-[10px] mt-2 text-center opacity-60 ${drakeMode ? 'text-cyan-300/60' : 'text-blue-600/60'}`}>
                                        💡 Tip: Try asking specific questions for detailed responses
                                    </p>
                                </motion.form>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatBot;