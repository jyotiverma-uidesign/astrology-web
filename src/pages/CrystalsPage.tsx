import { motion } from 'framer-motion';
import { Heart, Brain, Shield, Sparkles, Sun, CheckCircle, MessageCircle, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useStore } from '../store/useStore';
import PageTransition from '../components/PageTransition';

const crystalBenefits = [
  { icon: Heart, en: 'Emotional balance', hi: 'भावनात्मक संतुलन' },
  { icon: Shield, en: 'Grounding', hi: 'ग्राउंडिंग' },
  { icon: Brain, en: 'Mental clarity', hi: 'मानसिक स्पष्टता' },
  { icon: Sparkles, en: 'Confidence', hi: 'आत्मविश्वास' },
  { icon: Sun, en: 'Calmness', hi: 'शांति' },
  { icon: CheckCircle, en: 'Energy support', hi: 'ऊर्जा सहायता' },
];

export default function CrystalsPage() {
  const { language } = useStore();

  const handleContact = () => {
    const msg = encodeURIComponent('Hi, I would like to explore crystal energy guidance with Astro Tulika.');
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="py-10" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-5xl mb-4 block">💎</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              {language === 'en' ? <>Crystal <span className="gradient-text">Energy Support</span></> : <>क्रिस्टल <span className="gradient-text">ऊर्जा सहायता</span></>}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {language === 'en'
                ? 'Crystals can act as supportive energetic tools when used with awareness and intention. At Astro Tulika, crystal guidance is offered as a supportive spiritual aid — not blind dependency.'
                : 'जागरूकता और इरादे के साथ उपयोग करने पर क्रिस्टल सहायक ऊर्जावान उपकरणों के रूप में काम कर सकते हैं।'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-10 bg-card">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12">
            {language === 'en' ? 'Crystals May Support You With' : 'क्रिस्टल आपकी सहायता कर सकते हैं'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {crystalBenefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center p-6 rounded-2xl bg-[#4890b7] text-white border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <b.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold">{language === 'en' ? b.en : b.hi}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-5 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="p-8 rounded-2xl bg-card border border-primary/20 text-center"
          >
            <AlertTriangle className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-heading font-bold text-lg mb-3">{language === 'en' ? 'Important Note' : 'महत्वपूर्ण नोट'}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {language === 'en'
                ? 'Crystals are not a substitute for effort, awareness or healing work. They are simply supportive tools that may help strengthen intention and balance.'
                : 'क्रिस्टल प्रयास, जागरूकता या उपचार कार्य का विकल्प नहीं हैं। वे बस सहायक उपकरण हैं जो इरादे और संतुलन को मजबूत करने में मदद कर सकते हैं।'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 bg-card">
        <div className="container mx-auto px-4 text-center">
          <Button size="lg" className="gradient-bg text-white glow-gold" onClick={handleContact}>
            <MessageCircle className="w-5 h-5 mr-2" />
            {language === 'en' ? 'Explore Crystal Guidance' : 'क्रिस्टल मार्गदर्शन देखें'}
          </Button>
        </div>
      </section>
    </PageTransition>
  );
}
