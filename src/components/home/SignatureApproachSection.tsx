import { motion } from 'framer-motion';
import { CheckCircle, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';

const points = [
  { en: 'Understanding patterns deeply', hi: 'पैटर्न को गहराई से समझना' },
  { en: 'Aligning numbers with your chart', hi: 'अपने चार्ट के साथ संख्याओं को संरेखित करना' },
  { en: 'Reading energies more consciously', hi: 'ऊर्जाओं को अधिक सचेत रूप से पढ़ना' },
  { en: 'Applying spiritual knowledge practically', hi: 'आध्यात्मिक ज्ञान को व्यावहारिक रूप से लागू करना' },
];

export default function BrandPositioningSection() {
  const { language } = useStore();

  return (
    <section className="py-5 bg-card relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              {language === 'en' ? 'Our Philosophy' : 'हमारा दर्शन'}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              {language === 'en'
                ? <>Not Just Numerology — <span className="gradient-text">A More Aligned Way of Guidance</span></>
                : <>केवल अंकशास्त्र नहीं — <span className="gradient-text">मार्गदर्शन का एक अधिक संरेखित तरीका</span></>}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {language === 'en'
                ? 'Many people learn number meanings, but very few understand how those numbers actually work in real life.'
                : 'बहुत से लोग संख्याओं के अर्थ सीखते हैं, लेकिन बहुत कम लोग समझते हैं कि वे संख्याएं वास्तविक जीवन में कैसे काम करती हैं।'}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              {language === 'en'
                ? 'At Astro Tulika, the focus is not on random "lucky number" trends or fear-based spiritual advice. The focus is on:'
                : 'Astro Tulika में, ध्यान यादृच्छिक "भाग्यशाली संख्या" ट्रेंड या भय-आधारित आध्यात्मिक सलाह पर नहीं है। ध्यान है:'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            {points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border/50 text-left"
              >
                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-medium">{language === 'en' ? point.en : point.hi}</span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-lg font-heading font-semibold gradient-text"
          >
            {language === 'en' ? 'This is where intuition meets structure.' : 'यहीं पर अंतर्ज्ञान संरचना से मिलता है।'}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
