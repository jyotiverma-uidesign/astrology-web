import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, ArrowLeft, MoreVertical } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/Input';
import PageTransition from '../components/PageTransition';
import { astrologers } from '../data/astrologers';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'astrologer';
  time: string;
}

const autoReplies = [
  "I can see interesting planetary alignments in your chart. Let me analyze further...",
  "Based on the current transit of Jupiter, positive changes are coming your way.",
  "Your Moon sign suggests strong emotional intelligence. Use it wisely.",
  "I sense a career breakthrough approaching in the next few months.",
  "The stars indicate this is a favorable time for new beginnings.",
];

export default function ChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Namaste 🙏 Welcome! How can I help you today?', sender: 'astrologer', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const astrologer = astrologers.find((a) => a.id === id);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), text: reply, sender: 'astrologer', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1500 + Math.random() * 1500);
  };

  return (
    <PageTransition>
      <div className="flex flex-col h-[calc(100vh-64px)]">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50 bg-card">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}><ArrowLeft className="w-4 h-4" /></Button>
          {astrologer && (
            <div className="flex items-center gap-3 flex-1">
              <div className="relative">
                <img src={astrologer.avatar} alt={astrologer.name} className="w-10 h-10 rounded-full object-cover" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-card" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{astrologer.name}</h3>
                <p className="text-xs text-green-600">Online</p>
              </div>
            </div>
          )}
          <Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4" /></Button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ background: 'var(--gradient-hero)' }}>
          {messages.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${msg.sender === 'user' ? 'gradient-bg text-primary-foreground rounded-br-md' : 'bg-card shadow-sm rounded-bl-md'}`}>
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{msg.time}</p>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-card shadow-sm rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-border/50 bg-card">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1"
          />
          <Button size="sm" className="gradient-bg text-primary-foreground" onClick={sendMessage} disabled={!input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
