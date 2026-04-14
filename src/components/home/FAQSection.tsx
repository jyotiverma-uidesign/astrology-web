import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useStore } from '../../store/useStore';

const faqs = [
  { q: 'Do I need prior knowledge to join the course?', a: 'No. The courses are designed for beginners as well as curious spiritual learners.', qHi: 'क्या कोर्स में शामिल होने के लिए पहले से ज्ञान होना जरूरी है?', aHi: 'नहीं। कोर्स शुरुआती और जिज्ञासु आध्यात्मिक शिक्षार्थियों दोनों के लिए डिज़ाइन किए गए हैं।' },
  { q: 'Is this only a numerology platform?', a: 'No. Astro Tulika also integrates Vedic understanding, Lagna alignment, tarot and crystal guidance.', qHi: 'क्या यह केवल अंकशास्त्र मंच है?', aHi: 'नहीं। Astro Tulika वैदिक समझ, लग्न संरेखण, टैरो और क्रिस्टल मार्गदर्शन को भी एकीकृत करता है।' },
  { q: 'Will the courses be too technical?', a: 'No. The learning style is designed to be simple, practical and easy to understand.', qHi: 'क्या कोर्स बहुत तकनीकी होंगे?', aHi: 'नहीं। सीखने की शैली सरल, व्यावहारिक और समझने में आसान होने के लिए डिज़ाइन की गई है।' },
  { q: 'Can I use this learning professionally later?', a: 'Yes. These courses can help build a strong foundation for future personal or professional use.', qHi: 'क्या मैं बाद में इस शिक्षा का पेशेवर रूप से उपयोग कर सकता/सकती हूं?', aHi: 'हां। ये कोर्स भविष्य में व्यक्तिगत या पेशेवर उपयोग के लिए मजबूत नींव बनाने में मदद कर सकते हैं।' },
  { q: 'Do you offer one-to-one guidance?', a: 'Yes. Personal consultations are available at ₹1,100 per hour.', qHi: 'क्या आप एक-से-एक मार्गदर्शन प्रदान करते हैं?', aHi: 'हां। व्यक्तिगत परामर्श ₹1,100 प्रति घंटे पर उपलब्ध है।' },
  { q: 'Is tarot compulsory in your work?', a: 'No. Tarot is used only as a supportive intuitive tool where relevant.', qHi: 'क्या आपके काम में टैरो अनिवार्य है?', aHi: 'नहीं। टैरो का उपयोग केवल एक सहायक सहज उपकरण के रूप में किया जाता है जहां प्रासंगिक हो।' },
  { q: 'Are crystals a replacement for action or healing?', a: 'No. Crystals are supportive energy tools and not substitutes for conscious effort or healing work.', qHi: 'क्या क्रिस्टल कार्रवाई या उपचार का विकल्प हैं?', aHi: 'नहीं। क्रिस्टल सहायक ऊर्जा उपकरण हैं और सचेत प्रयास या उपचार कार्य का विकल्प नहीं हैं।' },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { language } = useStore();

  return (
    <section className="py-5 bg-card">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            {language === 'en' ? <>Frequently Asked <span className="gradient-text">Questions</span></> : <>अक्सर पूछे जाने वाले <span className="gradient-text">सवाल</span></>}
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-1">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border/50 bg-background overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
              >
                <span className="font-medium pr-4">{language === 'en' ? faq.q : faq.qHi}</span>
                <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {language === 'en' ? faq.a : faq.aHi}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center ">
          <p className="text-muted-foreground mb-4">{language === 'en' ? 'Still have questions?' : 'अभी भी सवाल हैं?'}</p>
          <Button variant="outline" className="border-primary/30" onClick={() => {
            window.open('https://wa.me/+918135802073?text=' + encodeURIComponent('Hi, I have a question about Astro Tulika services.'), '_blank');
          }}>
            <MessageCircle className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Ask on WhatsApp' : 'WhatsApp पर पूछें'}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
