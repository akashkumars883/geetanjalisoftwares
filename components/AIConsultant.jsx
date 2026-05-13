'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Minimize2, Maximize2 } from 'lucide-react';

export default function AIConsultant() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m Geetanjali Softwares AI, your digital growth consultant. I can help you understand our services and devise a strategy for your business. What\'s on your mind?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await res.json();
      if (data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      } else {
        throw new Error(data.details || data.error || "Something went wrong.");
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting right now. Please try again or reach out to our team directly!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
        aria-label="Open AI Assistant"
      >
        <div className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500"></span>
        </div>
        <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />
      </button>
    );
  }

  return (
    <div className={`fixed right-6 z-50 flex flex-col overflow-hidden bg-white/90 border border-black/10 shadow-2xl backdrop-blur-2xl transition-all duration-300 ${
      isMinimized ? 'bottom-6 w-72 h-14 rounded-2xl' : 'bottom-6 w-[90vw] sm:w-[400px] h-[580px] max-h-[85vh] rounded-3xl'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-black/5 bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-600">
            <Bot size={18} />
            <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white"></div>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 leading-none">Geetanjali Softwares AI</h3>
            <p className="text-[10px] text-slate-500 mt-1 uppercase font-semibold tracking-wider">Online & Thinking</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors"
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-thumb-black/5"
          >
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                    m.role === 'user' ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-700 border border-black/5'
                  }`}>
                    {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-orange-600 text-white rounded-tr-none' 
                      : 'bg-slate-50 text-slate-800 border border-black/5 rounded-tl-none font-normal'
                  }`}>
                    {m.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[85%]">
                   <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-700 border border-black/5 flex items-center justify-center animate-pulse">
                    <Bot size={14} />
                  </div>
                  <div className="bg-slate-50 border border-black/5 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                    <div className="flex gap-1.5 items-center h-5">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-bounce"></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 bg-slate-50/50 border-t border-black/5">
            <div className="relative flex items-center">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our services..."
                className="w-full rounded-2xl bg-white border border-black/10 px-4 py-3 pr-12 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all shadow-sm"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 h-9 w-9 flex items-center justify-center rounded-xl bg-orange-600 text-white hover:bg-orange-700 active:scale-95 transition-all duration-200 disabled:opacity-50 shadow-sm"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
