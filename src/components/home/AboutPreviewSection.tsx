import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hash, Sun, Target, Layers, Gem, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useStore } from '../../store/useStore';
import tulikaPhoto from '../../assets/tulikadevi.jpeg';

const tags = [
  { icon: Hash, en: 'Numerology', hi: 'अंकशास्त्र' },
  { icon: Sun, en: 'Vedic Understanding', hi: 'वैदिक समझ' },
  { icon: Target, en: 'Lagna Observation', hi: 'लग्न अवलोकन' },
  { icon: Layers, en: 'Tarot Reflection', hi: 'टैरो चिंतन' },
  { icon: Gem, en: 'Crystal Support', hi: 'क्रिस्टल सहायता' },
];

export default function AboutPreviewSection() {
  const navigate = useNavigate();
  const { language } = useStore();

  return (
    <section className="py-24 warm-bg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative w-72 md:w-80 rounded-3xl overflow-hidden border-2 border-primary/20 shadow-2xl">
              <img src={tulikaPhoto} alt="Astro Tulika" className="w-full h-auto object-cover" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              {language === 'en' ? <>About <span className="gradient-text">Astro Tulika</span></> : <><span className="gradient-text">Astro Tulika</span> के बारे में</>}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {language === 'en'
                ? 'Astro Tulika is a numerology guide and spiritual educator who believes that true clarity comes from understanding patterns — not blindly following predictions.'
                : 'Astro Tulika एक अंकशास्त्र मार्गदर्शक और आध्यात्मिक शिक्षक हैं जो मानती हैं कि सच्ची स्पष्टता पैटर्न को समझने से आती है — अंधाधुंध भविष्यवाणियों का पालन करने से नहीं।'}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {language === 'en'
                ? 'Her approach is intuitive yet grounded, designed to make spiritual knowledge feel simple, useful and aligned.'
                : 'उनका दृष्टिकोण सहज लेकिन ठोस है, जो आध्यात्मिक ज्ञान को सरल, उपयोगी और संरेखित महसूस कराने के लिए डिज़ाइन किया गया है।'}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  <tag.icon className="w-3.5 h-3.5" /> {language === 'en' ? tag.en : tag.hi}
                </span>
              ))}
            </div>

            <Button variant="outline" className="border-primary/30 group" onClick={() => navigate('/about')}>
              {language === 'en' ? 'Read Full Story' : 'पूरी कहानी पढ़ें'}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
