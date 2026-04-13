import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';

const signs = [
  { symbol: '♈', name: 'Aries', nameHi: 'मेष', dates: 'Mar 21 - Apr 19', prediction: 'A great day for new beginnings and bold decisions.' },
  { symbol: '♉', name: 'Taurus', nameHi: 'वृषभ', dates: 'Apr 20 - May 20', prediction: 'Financial stability improves. Focus on savings.' },
  { symbol: '♊', name: 'Gemini', nameHi: 'मिथुन', dates: 'May 21 - Jun 20', prediction: 'Communication is your superpower today. Express yourself.' },
  { symbol: '♋', name: 'Cancer', nameHi: 'कर्क', dates: 'Jun 21 - Jul 22', prediction: 'Family matters take center stage. Nurture your bonds.' },
  { symbol: '♌', name: 'Leo', nameHi: 'सिंह', dates: 'Jul 23 - Aug 22', prediction: 'Creative energy is high. Showcase your talents.' },
  { symbol: '♍', name: 'Virgo', nameHi: 'कन्या', dates: 'Aug 23 - Sep 22', prediction: 'Attention to detail pays off at work today.' },
  { symbol: '♎', name: 'Libra', nameHi: 'तुला', dates: 'Sep 23 - Oct 22', prediction: 'Harmony in relationships brings inner peace.' },
  { symbol: '♏', name: 'Scorpio', nameHi: 'वृश्चिक', dates: 'Oct 23 - Nov 21', prediction: 'Trust your intuition. Transformation awaits.' },
  { symbol: '♐', name: 'Sagittarius', nameHi: 'धनु', dates: 'Nov 22 - Dec 21', prediction: 'Adventure calls. Explore new opportunities.' },
  { symbol: '♑', name: 'Capricorn', nameHi: 'मकर', dates: 'Dec 22 - Jan 19', prediction: 'Hard work is recognized. A promotion may come.' },
  { symbol: '♒', name: 'Aquarius', nameHi: 'कुंभ', dates: 'Jan 20 - Feb 18', prediction: 'Innovation leads to breakthroughs. Think differently.' },
  { symbol: '♓', name: 'Pisces', nameHi: 'मीन', dates: 'Feb 19 - Mar 20', prediction: 'Dreams are vivid and meaningful. Journal them.' },
];

export default function DailyHoroscopeSection() {
  const navigate = useNavigate();
  const { language } = useStore();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-center mb-3">
          {language === 'en' ? "Today's Horoscope" : 'आज का राशिफल'}
        </h2>
        <p className="text-muted-foreground text-center mb-10">
          {language === 'en' ? 'Select your zodiac sign for daily predictions' : 'दैनिक भविष्यवाणी के लिए अपनी राशि चुनें'}
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {signs.map((sign, i) => (
            <motion.div
              key={sign.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              onClick={() => navigate('/blog')}
              className="flex flex-col items-center p-3 rounded-xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group"
            >
              <span className="text-3xl mb-1 group-hover:scale-125 transition-transform">{sign.symbol}</span>
              <span className="text-xs font-semibold">{language === 'en' ? sign.name : sign.nameHi}</span>
              <span className="text-[10px] text-muted-foreground">{sign.dates}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
