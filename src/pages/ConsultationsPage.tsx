import { motion } from 'framer-motion';
import { Clock, CheckCircle, MessageCircle, Heart, Briefcase, Users, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useStore } from '../store/useStore';
import PageTransition from '../components/PageTransition';
import tulikaPhoto from '../assets/tulikadevi.jpeg';

const includes = [
  'Numerology analysis', 'Pattern interpretation', 'Vedic / Lagna-based insight',
  'Intuitive guidance', 'Tarot reflection (if relevant)', 'Crystal suggestions (basic support)'
];

const seekGuidance = [
  { icon: Briefcase, en: 'Career confusion', hi: 'करियर भ्रम' },
  { icon: Heart, en: 'Relationship concerns', hi: 'रिश्ते की चिंताएं' },
  { icon: Users, en: 'Marriage questions', hi: 'विवाह के सवाल' },
  { icon: Sparkles, en: 'Emotional patterns', hi: 'भावनात्मक पैटर्न' },
  { icon: Shield, en: 'Life direction', hi: 'जीवन दिशा' },
  { icon: Sparkles, en: 'Repeating blocks', hi: 'आवर्ती अवरोध' },
  { icon: CheckCircle, en: 'Decision clarity', hi: 'निर्णय स्पष्टता' },
  { icon: ArrowRight, en: 'Personal growth', hi: 'व्यक्तिगत विकास' },
];

const expectations = [
  { en: 'A calm and grounded session', hi: 'एक शांत और ठोस सत्र' },
  { en: 'No fear-based language', hi: 'कोई भय-आधारित भाषा नहीं' },
  { en: 'No unnecessary complication', hi: 'कोई अनावश्यक जटिलता नहीं' },
  { en: 'Clear explanation and practical guidance', hi: 'स्पष्ट व्याख्या और व्यावहारिक मार्गदर्शन' },
  { en: 'A more personalised understanding of your situation', hi: 'आपकी स्थिति की अधिक व्यक्तिगत समझ' },
];

export default function ConsultationsPage() {
  const { language } = useStore();

  const handleBook = () => {
    const msg = encodeURIComponent('Hi Astro Tulika, I would like to book a personal guidance session. Please share the details.');
    window.open(`https://wa.me/+918135802073?text=${msg}`, '_blank');
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="py-20" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                {language === 'en'
                  ? <>Personal Guidance with <span className="gradient-text">Astro Tulika</span></>
                  : <><span className="gradient-text">Astro Tulika</span> के साथ व्यक्तिगत मार्गदर्शन</>}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {language === 'en'
                  ? 'Sometimes, you do not need more random advice. You need clarity that feels aligned to you.'
                  : 'कभी-कभी, आपको और अधिक यादृच्छिक सलाह की आवश्यकता नहीं होती। आपको ऐसी स्पष्टता चाहिए जो आपके अनुरूप हो।'}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'en'
                  ? 'These sessions are designed to help you understand your patterns, life themes, emotional blocks and important questions through a more integrated spiritual lens.'
                  : 'ये सत्र आपके पैटर्न, जीवन विषयों, भावनात्मक अवरोधों और महत्वपूर्ण सवालों को समझने में मदद करने के लिए डिज़ाइन किए गए हैं।'}
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center">
              <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-xl text-center max-w-sm w-full">
                <img src={tulikaPhoto} alt="Astro Tulika" className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-primary/20" />
                <h3 className="font-heading font-bold text-xl mb-2">Personal Consultation</h3>
                <div className="flex items-center justify-center gap-4 text-muted-foreground text-sm mb-2">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 1 Hour</span>
                  <span>Online</span>
                </div>
                <div className="text-3xl font-bold gradient-text mb-6">₹1,100<span className="text-sm font-normal text-muted-foreground"> / hour</span></div>
                <Button size="lg" className="w-full gradient-bg text-primary-foreground glow-gold" onClick={handleBook}>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Book Your Session' : 'अपना सत्र बुक करें'}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Includes */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
            {language === 'en' ? 'What Your Session May Include' : 'आपके सत्र में क्या शामिल हो सकता है'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {includes.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10"
              >
                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seek Guidance For */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
            {language === 'en' ? 'You Can Seek Guidance For' : 'आप मार्गदर्शन ले सकते हैं'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {seekGuidance.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center p-5 rounded-2xl bg-[#246E96] border border-border/50 hover:border-primary/30 transition-all text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium">{language === 'en' ? item.en : item.hi}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expectations */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
            {language === 'en' ? 'What to Expect' : 'क्या उम्मीद करें'}
          </h2>
          <div className="space-y-3">
            {expectations.map((exp, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-primary/5"
              >
                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="font-medium">{language === 'en' ? exp.en : exp.hi}</span>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" className="gradient-bg text-primary-foreground glow-gold" onClick={handleBook}>
              <MessageCircle className="w-5 h-5 mr-2" />
              {language === 'en' ? 'Book Your Session' : 'अपना सत्र बुक करें'}
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
