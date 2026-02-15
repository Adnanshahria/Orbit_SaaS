
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLang } from '@/contexts/LanguageContext';
import { useContent } from '@/contexts/ContentContext';
import { sendToGroq, ChatMessage } from '@/services/aiService';

export function Chatbot() {
  const { t, lang } = useLang();
  const { content } = useContent(); // Access dynamic content
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 1. Prepare Dynamic Knowledge Base
      // We use the current language's content, falling back to English if missing
      const activeContent = content[lang] || content['en'];

      let knowledgeBase = "Here is the comprehensive context about various sections of the website:\n\n";

      // --- Projects ---
      const projects = (activeContent.projects as any)?.items || [];
      if (projects.length > 0) {
        knowledgeBase += "## PORTFOLIO / PROJECTS:\n";
        projects.forEach((p: any) => {
          knowledgeBase += `- Name: ${p.title}\n  Description: ${p.desc}\n  Tech Stack/Tags: ${(p.tags || []).join(', ')}\n  Link: ${p.link}\n\n`;
        });
      }

      // --- Services ---
      const services = (activeContent.services as any)?.items || [];
      if (services.length > 0) {
        knowledgeBase += "## SERVICES WE OFFER:\n";
        services.forEach((s: any) => {
          knowledgeBase += `- ${s.title}: ${s.desc}\n`;
        });
        knowledgeBase += "\n";
      }

      // --- Tech Stack ---
      const techStack = (activeContent.techStack as any)?.items || []; // Assuming tech stack might have items, otherwise just general knowledge
      if (techStack.length > 0) {
        knowledgeBase += "## TECH STACK:\n" + techStack.map((t: any) => t.name || t).join(', ') + "\n\n";
      }

      // --- Company Info (Hero/Why Us) ---
      const hero = (activeContent.hero as any);
      if (hero) {
        knowledgeBase += `## COMPANY OVERVIEW:\nTagline: ${hero.title}\nSummary: ${hero.subtitle}\n\n`;
      }

      const whyUs = (activeContent.whyUs as any)?.items || [];
      if (whyUs.length > 0) {
        knowledgeBase += "## WHY CHOOSE US:\n";
        whyUs.forEach((w: any) => {
          knowledgeBase += `- ${w.title}: ${w.desc}\n`;
        });
        knowledgeBase += "\n";
      }

      // --- Leadership ---
      const leadership = (activeContent.leadership as any)?.members || [];
      if (leadership.length > 0) {
        knowledgeBase += "## LEADERSHIP TEAM:\n";
        leadership.forEach((l: any) => {
          knowledgeBase += `- ${l.name} (${l.role})\n`;
        });
        knowledgeBase += "\n";
      }

      // --- Contact ---
      const contact = (activeContent.contact as any);
      if (contact) {
        knowledgeBase += `## CONTACT INFO:\nCTA: ${contact.cta}\nTitle: ${contact.title}\n\n`;
      }

      // 2. Prepare System Prompt
      const systemPrompt = t.chatbot.systemPrompt || `You are Orbit AI, the advanced AI assistant for Orbit SaaS (a web development agency). 
      Your goal is to help potential clients understand our services, view our portfolio, and book appointments.
      
      Tone: Professional, enthusiastic, knowledgeable, and helpful.
      Format: Use Markdown for readable responses (bolding key terms, bullet points for lists).
      
      CRITICAL INSTRUCTIONS:
      - You have access to the FULL website content below. USE IT to answer specific questions.
      - If asked about projects, mention specific ones from the Portfolio section.
      - If asked about services, detail our specific offerings.
      - If unsure, ask the user to clarify or suggest booking a consultation.
      - Do NOT make up facts not present in the context.`;

      // 3. Prepare Q&A Context
      const qaContext = (t.chatbot.qaPairs || [])
        .map((qa: { question: string; answer: string }) => `Q: ${qa.question}\nA: ${qa.answer}`)
        .join('\n\n');

      // 4. Combine everything
      const fullSystemMessage = `${systemPrompt}\n\n=== WEBSITE CONTENT / KNOWLEDGE BASE ===\n${knowledgeBase}\n\n=== SPECIFIC Q&A TRAINING ===\n${qaContext ? qaContext : 'No specific Q&A pairs.'}`;

      const conversationHistory = messages.length === 0
        ? [
          {
            role: 'system',
            content: fullSystemMessage
          } as ChatMessage,
          ...messages,
          userMessage
        ]
        : [...messages, userMessage];

      const responseContent = await sendToGroq(conversationHistory);

      setMessages(prev => [...prev, { role: 'assistant', content: responseContent }]);
    } catch (error) {
      console.error('Failed to get response:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 md:bottom-6 right-4 sm:right-6 z-[200] w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center neon-glow cursor-pointer shadow-2xl"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-40 md:bottom-24 right-4 sm:right-6 z-[200] w-[calc(100vw-2rem)] sm:w-[340px] max-w-[340px] rounded-2xl overflow-hidden border border-border bg-card shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-primary/10 border-b border-border">
              <h4 className="font-display font-semibold text-foreground text-base">{t.chatbot.title}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Online</p>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3 bg-card/50">
              {/* Greeting */}
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="bg-secondary rounded-xl rounded-tl-none px-3 py-2 text-sm text-foreground max-w-[85%] shadow-sm">
                  {t.chatbot.greeting}
                </div>
              </div>

              {messages.filter(m => m.role !== 'system').map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                  <div className={`rounded-xl px-3 py-2 text-sm max-w-[85%] shadow-sm ${msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-none'
                    : 'bg-secondary text-foreground rounded-tl-none'
                    }`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="bg-secondary rounded-xl rounded-tl-none px-3 py-2 text-sm text-foreground shadow-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-border flex gap-2 bg-card">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={t.chatbot.placeholder}
                disabled={isLoading}
                className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 gentle-animation cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
