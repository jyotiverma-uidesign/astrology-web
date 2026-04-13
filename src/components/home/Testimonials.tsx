import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useStore } from '../../store/useStore';

const testimonials = [
  { name: 'Priya Sharma', nameHi: 'प्रिया शर्मा', city: 'Mumbai', text: 'The astrologer predicted my job change accurately. I got the offer within 2 weeks!', textHi: 'ज्योतिषी ने मेरे नौकरी बदलने की सटीक भविष्यवाणी की। मुझे 2 सप्ताह में ऑफर मिल गया!', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face' },
  { name: 'Rahul Verma', nameHi: 'राहुल वर्मा', city: 'Delhi', text: 'Amazing tarot reading session. The insights about my relationship were spot on.', textHi: 'अद्भुत टैरो रीडिंग सत्र। मेरे रिश्ते के बारे में अंतर्दृष्टि बिल्कुल सटीक थी।', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
  { name: 'Anita Patel', nameHi: 'अनीता पटेल', city: 'Ahmedabad', text: 'The kundli analysis helped me understand my strengths. Highly recommend!', textHi: 'कुंडली विश्लेषण ने मुझे अपनी ताकत समझने में मदद की। अत्यधिक अनुशंसित!', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face' },
  { name: 'Vikash Kumar', nameHi: 'विकाश कुमार', city: 'Bangalore', text: 'Best astrology app! The vastu tips transformed my home energy completely.', textHi: 'सबसे अच्छा ज्योतिष ऐप! वास्तु टिप्स ने मेरे घर की ऊर्जा को पूरी तरह बदल दिया।', rating: 4, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face' },
];

export default function TestimonialsSection() {
  const { language } = useStore();

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-center mb-3">
          {language === 'en' ? 'What Our Users Say' : 'हमारे उपयोगकर्ता क्या कहते हैं'}
        </h2>
        <p className="text-muted-foreground text-center mb-10">
          {language === 'en' ? 'Trusted by millions across India' : 'पूरे भारत में लाखों लोगों द्वारा विश्वसनीय'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-xl bg-background border border-border/50 hover:shadow-lg transition-shadow relative"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
              <div className="flex items-center gap-3 mb-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-sm">{language === 'en' ? t.name : t.nameHi}</div>
                  <div className="text-xs text-muted-foreground">{t.city}</div>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{language === 'en' ? t.text : t.textHi}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
