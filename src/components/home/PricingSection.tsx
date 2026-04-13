import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Star, MessageCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useStore } from '../../store/useStore';

const plans = [
  {
    en: 'Basic Numerology Course', hi: 'बुनियादी अंकशास्त्र कोर्स',
    price: '₹5,00', duration: '1 Month',
    descEn: 'A beginner-friendly course designed to help you understand the fundamentals of numerology, personality patterns, core numbers, Lo Shu basics and practical interpretation.',
    descHi: 'एक शुरुआती-अनुकूल कोर्स जो अंकशास्त्र की मूल बातें, व्यक्तित्व पैटर्न, कोर नंबर, लो शू बेसिक्स और व्यावहारिक व्याख्या को समझने में मदद करता है।',
    cta: { en: 'Enroll Now', hi: 'अभी नामांकन करें' },
    path: '/course/basic-numerology-course',
    featured: false,
  },
  {
    en: 'Premium Numerology Course', hi: 'प्रीमियम अंकशास्त्र कोर्स',
    price: '₹15,00', duration: '3 Months',
    descEn: 'A deeper and more guided learning experience covering numerology in greater depth along with Vedic understanding, Lagna-based observation and stronger interpretation clarity.',
    descHi: 'अंकशास्त्र को अधिक गहराई से कवर करने वाला एक गहरा और अधिक मार्गदर्शित शिक्षण अनुभव, वैदिक समझ, लग्न-आधारित अवलोकन और मजबूत व्याख्या स्पष्टता के साथ।',
    cta: { en: 'Join Premium Course', hi: 'प्रीमियम कोर्स में शामिल हों' },
    path: '/course/premium-numerology-course',
    featured: true,
  },
  {
    en: 'Tarot & Crystal Course', hi: 'टैरो और क्रिस्टल कोर्स',
    price: '₹10,00', duration: '2 Months',
    descEn: 'A structured course to help you understand tarot basics, card energy, intuitive reading approach, crystal support and practical spiritual application.',
    descHi: 'टैरो मूल बातें, कार्ड ऊर्जा, सहज पठन दृष्टिकोण, क्रिस्टल सहायता और व्यावहारिक आध्यात्मिक अनुप्रयोग को समझने के लिए एक संरचित कोर्स।',
    cta: { en: 'Join Tarot & Crystal Course', hi: 'टैरो और क्रिस्टल कोर्स में शामिल हों' },
    path: '/course/tarot-crystal-course',
    featured: false,
  },
  {
    en: 'Personal Consultation', hi: 'व्यक्तिगत परामर्श',
    price: '₹1,100', duration: '1 Hour',
    descEn: 'One-to-one guidance designed to bring clarity and understanding through numerology, pattern reading, intuitive observation and aligned spiritual insight.',
    descHi: 'अंकशास्त्र, पैटर्न रीडिंग, सहज अवलोकन और संरेखित आध्यात्मिक अंतर्दृष्टि के माध्यम से स्पष्टता और समझ लाने के लिए डिज़ाइन किया गया एक-से-एक मार्गदर्शन।',
    cta: { en: 'Book Consultation', hi: 'परामर्श बुक करें' },
    path: '/consultations',
    featured: false,
  },
];

export default function PricingSection() {
  const navigate = useNavigate();
  const { language } = useStore();

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            {language === 'en'
              ? <>Courses & <span className="gradient-text">Services</span></>
              : <>कोर्स और <span className="gradient-text">सेवाएं</span></>}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 border transition-all duration-300 hover:shadow-xl ${
                plan.featured
                  ? 'bg-card border-primary/40 shadow-lg'
                  : 'bg-card border-border/50'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-8">
                  <span className="px-4 py-1 rounded-full gradient-bg text-primary-foreground text-xs font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3" /> {language === 'en' ? 'Most Popular' : 'सबसे लोकप्रिय'}
                  </span>
                </div>
              )}
              <h3 className="font-heading font-bold text-xl mb-2">{language === 'en' ? plan.en : plan.hi}</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold gradient-text">{plan.price}</span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {plan.duration}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mt-4 mb-6">
                {language === 'en' ? plan.descEn : plan.descHi}
              </p>
              <Button
                className={`w-full group ${plan.featured ? 'gradient-bg text-primary-foreground glow-gold' : ''}`}
                variant={plan.featured ? 'default' : 'outline'}
                onClick={() => navigate(plan.path)}
              >
                {plan.path === '/consultations' && <MessageCircle className="w-4 h-4 mr-2" />}
                {language === 'en' ? plan.cta.en : plan.cta.hi}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
