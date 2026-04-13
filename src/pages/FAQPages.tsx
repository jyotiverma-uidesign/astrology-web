import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useStore } from '../store/useStore';
import PageTransition from '../components/PageTransition';

const faqs = [
  { q: 'Do I need prior knowledge to join the course?', a: 'No. The courses are designed for beginners as well as curious spiritual learners.' },
  { q: 'Is this only a numerology platform?', a: 'No. Astro Tulika also integrates Vedic understanding, Lagna alignment, tarot and crystal guidance.' },
  { q: 'Will the courses be too technical?', a: 'No. The learning style is designed to be simple, practical and easy to understand.' },
  { q: 'Can I use this learning professionally later?', a: 'Yes. These courses can help build a strong foundation for future personal or professional use.' },
  { q: 'Do you offer one-to-one guidance?', a: 'Yes. Personal consultations are available at ₹1,100 per hour.' },
  { q: 'Is tarot compulsory in your work?', a: 'No. Tarot is used only as a supportive intuitive tool where relevant.' },
  { q: 'Are crystals a replacement for action or healing?', a: 'No. Crystals are supportive energy tools and not substitutes for conscious effort or healing work.' },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { language } = useStore();

  return (
    <PageTransition>
      <section className="py-24" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              {language === 'en' ? 'Frequently Asked Questions' : 'अक्सर पूछे जाने वाले सवाल'}
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="rounded-2xl border border-border/50 bg-background overflow-hidden"
            >
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors">
                <span className="font-medium pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="outline" className="border-primary/30" onClick={() => {
            window.open('https://wa.me/919876543210?text=' + encodeURIComponent('Hi, I have a question.'), '_blank');
          }}>
            <MessageCircle className="w-4 h-4 mr-2" /> Ask on WhatsApp
          </Button>
        </div>
      </section>
    </PageTransition>
  );
}
