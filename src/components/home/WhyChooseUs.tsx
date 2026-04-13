import { motion } from 'framer-motion';
import { Shield, Clock, Award, Headphones, Wallet, Globe } from 'lucide-react';
import { useStore } from '../../store/useStore';

const features = [
  { icon: Shield, title: 'Verified Experts', titleHi: 'सत्यापित विशेषज्ञ', desc: 'All astrologers pass a rigorous verification process', descHi: 'सभी ज्योतिषी कठोर सत्यापन प्रक्रिया से गुज़रते हैं' },
  { icon: Clock, title: '24/7 Available', titleHi: '24/7 उपलब्ध', desc: 'Get guidance anytime, day or night', descHi: 'किसी भी समय मार्गदर्शन प्राप्त करें, दिन या रात' },
  { icon: Award, title: 'Accurate Predictions', titleHi: 'सटीक भविष्यवाणी', desc: '95% accuracy rate based on user feedback', descHi: 'उपयोगकर्ता प्रतिक्रिया के आधार पर 95% सटीकता दर' },
  { icon: Headphones, title: 'Multiple Channels', titleHi: 'कई चैनल', desc: 'Chat, call, or video — your choice', descHi: 'चैट, कॉल, या वीडियो — आपकी पसंद' },
  { icon: Wallet, title: 'Affordable Pricing', titleHi: 'किफायती मूल्य', desc: 'Starting from just ₹10/min with wallet system', descHi: 'वॉलेट सिस्टम के साथ सिर्फ ₹10/मिनट से शुरू' },
  { icon: Globe, title: 'Multilingual', titleHi: 'बहुभाषी', desc: 'Available in Hindi, English & regional languages', descHi: 'हिंदी, अंग्रेजी और क्षेत्रीय भाषाओं में उपलब्ध' },
];

export default function WhyChooseUsSection() {
  const { language } = useStore();

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-center mb-3">
          {language === 'en' ? 'Why Choose Astro Tulika?' : 'Astro Tulika क्यों चुनें?'}
        </h2>
        <p className="text-muted-foreground text-center mb-10">
          {language === 'en' ? "Guided by Tulika Devi's spiritual legacy from Assam" : 'असम से तुलिका देवी की आध्यात्मिक विरासत द्वारा निर्देशित'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 p-5 rounded-xl bg-card border border-primary/10 hover:shadow-lg hover:border-primary/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{language === 'en' ? f.title : f.titleHi}</h3>
                <p className="text-sm text-muted-foreground">{language === 'en' ? f.desc : f.descHi}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
