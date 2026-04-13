import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { astrologers } from '../../data/astrologers';
import { useStore } from '../../store/useStore';

export default function LiveAstrologersSection() {
  const navigate = useNavigate();
  const { language } = useStore();
  const onlineAstrologers = astrologers.filter(a => a.isOnline);

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 justify-center mb-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <h2 className="text-3xl font-heading font-bold">
            {language === 'en' ? 'Live Astrologers' : 'लाइव ज्योतिषी'}
          </h2>
        </div>
        <p className="text-muted-foreground text-center mb-10">
          {language === 'en' ? `${onlineAstrologers.length} astrologers online right now` : `${onlineAstrologers.length} ज्योतिषी अभी ऑनलाइन हैं`}
        </p>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {onlineAstrologers.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center min-w-35 p-4 rounded-xl bg-background border border-green-200 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => navigate(`/astrologer/${a.id}`)}
            >
              <div className="relative mb-3">
                <img src={a.avatar} alt={a.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-green-400" />
                <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-background"></span>
              </div>
              <span className="text-sm font-semibold text-center leading-tight">{language === 'en' ? a.name.split(' ').slice(-1)[0] : a.nameHi.split(' ').slice(-1)[0]}</span>
              <span className="text-xs text-muted-foreground">{language === 'en' ? a.speciality : a.specialityHi}</span>
              <span className="text-xs font-bold text-primary mt-1">₹{a.pricePerMin}/min</span>
              <Button size="sm" className="mt-2 gradient-bg text-primary-foreground text-xs h-7 px-3" onClick={(e) => { e.stopPropagation(); navigate(`/chat/${a.id}`); }}>
                <MessageCircle className="w-3 h-3 mr-1" /> Chat
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
