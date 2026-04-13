import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from './button';
import { Input } from './Input';
import { useStore } from '../../store/useStore';

const botReplies = [
  "Based on your stars, this is a favorable period for new ventures! ✨",
  "Your planetary alignment suggests focusing on relationships this week. 💫",
  "Mercury retrograde is ending soon — communication will improve! 🌟",
  "The current Jupiter transit brings luck in career matters. 🍀",
  "I sense positive energy around your financial prospects. 💰",
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: 'Namaste! 🙏 Ask me anything about astrology.', isBot: true }]);
  const [input, setInput] = useState('');
  const { language } = useStore();

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { text: input, isBot: false }]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: botReplies[Math.floor(Math.random() * botReplies.length)], isBot: true }]);
    }, 1000);
  };

  return (
    <>
      {/* Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-bg text-primary-foreground flex items-center justify-center shadow-lg glow-purple"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-card rounded-2xl shadow-2xl border border-border/50 flex flex-col overflow-hidden"
          >
            <div className="gradient-bg text-primary-foreground px-4 py-3 flex items-center gap-2">
              <span className="text-lg">🔮</span>
              <div>
                <h3 className="font-semibold text-sm">{language === 'en' ? 'AI Astrology Bot' : 'AI ज्योतिष बॉट'}</h3>
                <p className="text-[10px] opacity-80">{language === 'en' ? 'Ask anything about your stars' : 'अपने सितारों के बारे में कुछ भी पूछें'}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs ${msg.isBot ? 'bg-muted' : 'gradient-bg text-primary-foreground'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 p-3 border-t border-border/50">
              <Input
                placeholder={language === 'en' ? 'Ask a question...' : 'एक सवाल पूछें...'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                className="flex-1 h-8 text-xs"
              />
              <Button size="sm" className="h-8 w-8 p-0 gradient-bg text-primary-foreground" onClick={send}>
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
