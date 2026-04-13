import { motion } from 'framer-motion';
import { Shield, Lock, Award, CheckCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

const badges = [
  { icon: Shield, label: '100% Secure', labelHi: '100% सुरक्षित' },
  { icon: Lock, label: 'Data Encrypted', labelHi: 'डेटा एन्क्रिप्टेड' },
  { icon: Award, label: 'ISO Certified', labelHi: 'ISO प्रमाणित' },
  { icon: CheckCircle, label: 'Verified Experts', labelHi: 'सत्यापित विशेषज्ञ' },
];

export default function TrustBadgesSection() {
  const { language } = useStore();

  return (
    <section className="py-10 bg-muted/50 border-y border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <badge.icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{language === 'en' ? badge.label : badge.labelHi}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
