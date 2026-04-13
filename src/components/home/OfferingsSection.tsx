import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, MessageCircle, Layers, Gem, ArrowRight } from 'lucide-react';

import { useStore } from '../../store/useStore';

const offerings = [
  {
    icon: BookOpen,
    en: 'Courses', hi: 'कोर्स',
    descEn: 'Structured learning designed to help you understand numerology and spiritual systems in a simple, practical way.',
    descHi: 'संरचित शिक्षण जो आपको अंकशास्त्र और आध्यात्मिक प्रणालियों को सरल, व्यावहारिक तरीके से समझने में मदद करता है।',
    path: '/courses',
  },
  {
    icon: MessageCircle,
    en: 'Personal Guidance', hi: 'व्यक्तिगत मार्गदर्शन',
    descEn: 'One-to-one guidance sessions to help you understand your patterns, blocks, timing, relationships and life questions.',
    descHi: 'आपके पैटर्न, अवरोध, समय, रिश्ते और जीवन के सवालों को समझने में मदद के लिए एक-से-एक मार्गदर्शन सत्र।',
    path: '/consultations',
  },
  {
    icon: Layers,
    en: 'Tarot Guidance', hi: 'टैरो मार्गदर्शन',
    descEn: 'A reflective and intuitive tool for emotional clarity and current energy understanding.',
    descHi: 'भावनात्मक स्पष्टता और वर्तमान ऊर्जा समझ के लिए एक चिंतनशील और सहज उपकरण।',
    path: '/tarot',
  },
  {
    icon: Gem,
    en: 'Crystal Guidance', hi: 'क्रिस्टल मार्गदर्शन',
    descEn: 'Supportive crystal suggestions for grounding, confidence, calmness and energetic balance.',
    descHi: 'ग्राउंडिंग, आत्मविश्वास, शांति और ऊर्जावान संतुलन के लिए सहायक क्रिस्टल सुझाव।',
    path: '/crystals',
  },
];

export default function OfferingsSection() {
  const navigate = useNavigate();
  const { language } = useStore();

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            {language === 'en'
              ? <>What You Can <span className="gradient-text">Explore Here</span></>
              : <>आप यहां क्या <span className="gradient-text">खोज सकते हैं</span></>}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {offerings.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-background rounded-2xl p-8 border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => navigate(item.path)}
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl mb-2">{language === 'en' ? item.en : item.hi}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                    {language === 'en' ? item.descEn : item.descHi}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    {language === 'en' ? 'Learn More' : 'और जानें'} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
