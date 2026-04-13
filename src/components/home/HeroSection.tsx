import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useStore } from '../../store/useStore';
import tulikaPhoto from '../../assets/tulikadevi.jpeg';

export default function HeroSection() {
  const navigate = useNavigate();
  const { language } = useStore();

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center" style={{ background: 'var(--gradient-hero)' }}>
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      <div className="absolute top-0 left-0 w-full h-1 gradient-bg opacity-60" />

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left */}
          <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-sm md:text-base tracking-widest uppercase text-primary font-medium mb-4"
            >
              {language === 'en'
                ? 'Numerology • Vedic Alignment • Tarot • Crystal Guidance'
                : 'अंकशास्त्र • वैदिक संरेखण • टैरो • क्रिस्टल मार्गदर्शन'}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] mb-6"
            >
              {language === 'en' ? (
                <>Decode Your Life Through <span className="gradient-text">Numbers, Alignment & Energy</span></>
              ) : (
                <><span className="gradient-text">संख्याओं, संरेखण और ऊर्जा</span> के माध्यम से अपने जीवन को समझें</>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-3 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {language === 'en'
                ? 'Numerology is not just about numbers.'
                : 'अंकशास्त्र केवल संख्याओं के बारे में नहीं है।'}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {language === 'en'
                ? 'It is about understanding your patterns, personality, timing, energy, and alignment with your life path.'
                : 'यह आपके पैटर्न, व्यक्तित्व, समय, ऊर्जा और आपके जीवन पथ के साथ संरेखण को समझने के बारे में है।'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <Button size="lg" className="gradient-bg  text-primary-foreground text-white px-8 glow-gold group" onClick={() => navigate('/courses')}>
                <Sparkles className="w-5 h-5 mr-2" />
                {language === 'en' ? 'Explore Courses' : 'कोर्स देखें'}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 border-primary/30" onClick={() => navigate('/consultations')}>
                {language === 'en' ? 'Book Consultation' : 'परामर्श बुक करें'}
              </Button>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="mt-12 flex justify-center lg:justify-start"
            >
              <div className="px-6 py-3 rounded-full bg-primary/5 border border-primary/15">
                <p className="text-sm font-heading font-semibold italic text-foreground/70">
                  {language === 'en' ? '"Decode patterns, not just numbers."' : '"पैटर्न को समझें, न कि केवल संख्याओं को।"'}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right — Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl border border-primary/15 animate-spin-slow" style={{ animationDuration: '40s' }} />
              <div className="absolute -inset-8 rounded-3xl border border-primary/8 animate-spin-slow" style={{ animationDuration: '60s', animationDirection: 'reverse' }} />
              <div className="relative w-72 md:w-80 lg:w-88  rounded-3xl overflow-hidden border-2 border-primary/20 shadow-2xl glow-gold">
                <img src={tulikaPhoto} alt="Tulika Devi — Numerologist, Astrologer & Healer" className="w-full h-auto object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-foreground/80 via-foreground/40 to-transparent p-6">
                 
                </div>
              </div>

              <motion.div
                className="absolute -top-3 -right-3 bg-card rounded-2xl px-4 py-2.5 shadow-xl border border-primary/20"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-sm font-semibold">🔢 Numerology</span>
              </motion.div>
              <motion.div
                className="absolute -bottom-3 -left-3 bg-card rounded-2xl px-4 py-2.5 shadow-xl border border-primary/20"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              >
                <span className="text-sm font-semibold">🔮 Vedic Alignment</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
