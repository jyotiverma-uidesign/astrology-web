import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useStore } from '../../store/useStore';

const testimonials = [
  { text: 'Everything finally made sense.', detail: 'I had seen many numerology videos before, but this approach helped me actually understand patterns.', name: 'Client', rating: 5 },
  { text: 'Very clear and practical.', detail: 'No confusion, no unnecessary complexity. Easy to apply in real life.', name: 'Learner', rating: 5 },
  { text: 'Different from usual courses.', detail: 'The Lagna alignment and deeper explanation made a big difference.', name: 'Student', rating: 5 },
  { text: 'The guidance felt very personal.', detail: "It didn't feel like a generic reading. It felt aligned to my situation.", name: 'Seeker', rating: 5 },
];

export default function TestimonialsSection() {
  const { language } = useStore();

  return (
    <section className="py-5 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            {language === 'en' ? <>What People <span className="gradient-text">Say</span></> : <>लोग क्या <span className="gradient-text">कहते हैं</span></>}
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-6 rounded-2xl bg-card border border-border/50 hover:shadow-xl transition-shadow"
            >
              <Quote className="w-8 h-8 text-primary/15 absolute top-4 right-4" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="font-heading font-bold text-lg mb-2">"{t.text}"</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
