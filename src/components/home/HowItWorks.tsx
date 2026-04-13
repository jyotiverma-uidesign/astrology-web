import { motion } from 'framer-motion';
import { UserPlus, Search, MessageCircle, Star } from 'lucide-react';
import { useStore } from '../../store/useStore';

const steps = [
  { icon: UserPlus, title: 'Sign Up', titleHi: 'साइन अप करें', desc: 'Create your free account in seconds', descHi: 'सेकंडों में अपना मुफ्त खाता बनाएं', color: 'from-primary to-secondary' },
  { icon: Search, title: 'Choose Astrologer', titleHi: 'ज्योतिषी चुनें', desc: 'Browse verified experts by specialty', descHi: 'विशेषज्ञता के अनुसार सत्यापित विशेषज्ञ खोजें', color: 'from-secondary to-accent' },
  { icon: MessageCircle, title: 'Start Consultation', titleHi: 'परामर्श शुरू करें', desc: 'Chat, call, or video with your astrologer', descHi: 'अपने ज्योतिषी से चैट, कॉल या वीडियो करें', color: 'from-accent to-gold' },
  { icon: Star, title: 'Get Guidance', titleHi: 'मार्गदर्शन प्राप्त करें', desc: 'Receive personalized predictions & remedies', descHi: 'व्यक्तिगत भविष्यवाणी और उपाय प्राप्त करें', color: 'from-gold to-primary' },
];

export default function HowItWorksSection() {
  const { language } = useStore();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-center mb-3">
          {language === 'en' ? 'How It Works' : 'यह कैसे काम करता है'}
        </h2>
        <p className="text-muted-foreground text-center mb-10">
          {language === 'en' ? 'Get started in 4 simple steps' : '4 आसान चरणों में शुरू करें'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center text-center relative"
            >
              <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg`}>
                <step.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">{i + 1}</div>
              <h3 className="font-semibold mb-1">{language === 'en' ? step.title : step.titleHi}</h3>
              <p className="text-sm text-muted-foreground">{language === 'en' ? step.desc : step.descHi}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
