import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Sparkles, Star, BookOpen, Users } from 'lucide-react';
import { useStore } from '../../store/useStore';

const services = [
  { icon: MessageCircle, title: 'Chat with Astrologer', titleHi: 'ज्योतिषी से चैट', desc: 'Get instant answers via chat', path: '/astrologers', color: 'from-primary to-secondary' },
  { icon: Phone, title: 'Talk to Astrologer', titleHi: 'ज्योतिषी से बात करें', desc: 'Voice call with experts', path: '/booking', color: 'from-secondary to-primary' },
  { icon: Sparkles, title: 'Free Kundli', titleHi: 'मुफ्त कुंडली', desc: 'Generate your birth chart', path: '/kundli', color: 'from-accent to-gold' },
  { icon: Star, title: 'Tarot Reading', titleHi: 'टैरो रीडिंग', desc: 'Discover your destiny', path: '/tarot-reading', color: 'from-primary to-accent' },
  { icon: BookOpen, title: 'Daily Horoscope', titleHi: 'दैनिक राशिफल', desc: 'Read your daily predictions', path: '/blog', color: 'from-gold to-accent' },
  { icon: Users, title: 'Live Sessions', titleHi: 'लाइव सत्र', desc: 'Join group astrology sessions', path: '/booking', color: 'from-secondary to-primary' },
];

export default function ServicesSection() {
  const navigate = useNavigate();
  const { language } = useStore();

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-center mb-10">
          {language === 'en' ? 'Our Services' : 'हमारी सेवाएं'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => navigate(service.path)}
              className="flex flex-col items-center p-4 rounded-xl bg-background border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${service.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-sm font-semibold text-center">{language === 'en' ? service.title : service.titleHi}</h3>
              <p className="text-xs text-muted-foreground text-center mt-1 hidden md:block">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
