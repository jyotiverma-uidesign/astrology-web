import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MessageCircle, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useStore } from '../store/useStore';
import type { Astrologer } from '../data/astrologers';

export default function AstrologerCard({ astrologer, index = 0 }: { astrologer: Astrologer; index?: number }) {
  const navigate = useNavigate();
  const { language } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="glass-card rounded-xl p-4 hover:shadow-xl transition-shadow group cursor-pointer"
      onClick={() => navigate(`/astrologer/${astrologer.id}`)}
    >
      <div className="flex gap-4">
        <div className="relative">
          <img
            src={astrologer.avatar}
            alt={astrologer.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
          />
          <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${astrologer.isOnline ? 'bg-green-500' : 'bg-muted-foreground/40'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-foreground truncate">
            {language === 'en' ? astrologer.name : astrologer.nameHi}
          </h3>
          <p className="text-sm text-muted-foreground">
            {language === 'en' ? astrologer.speciality : astrologer.specialityHi}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-0.5">
              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
              <span className="text-xs font-medium">{astrologer.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">({astrologer.reviews})</span>
            <span className="text-xs text-muted-foreground">• {astrologer.experience}y exp</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
        <span className="text-sm font-semibold text-foreground">₹{astrologer.pricePerMin}/min</span>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="h-8 text-xs" onClick={(e) => { e.stopPropagation(); navigate(`/chat/${astrologer.id}`); }}>
            <MessageCircle className="w-3.5 h-3.5 mr-1" />
            {language === 'en' ? 'Chat' : 'चैट'}
          </Button>
          <Button size="sm" className="h-8 text-xs gradient-bg text-primary-foreground" onClick={(e) => { e.stopPropagation(); navigate(`/booking`); }}>
            <Phone className="w-3.5 h-3.5 mr-1" />
            {language === 'en' ? 'Call' : 'कॉल'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
