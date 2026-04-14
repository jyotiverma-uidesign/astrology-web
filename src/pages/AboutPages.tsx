import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hash, Sun, Target, Layers, Gem, ArrowRight, BookOpen, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useStore } from '../store/useStore';
import PageTransition from '../components/PageTransition';
import tulikaPhoto from '../assets/tulikadevi.jpeg';
import { FaMapMarkerAlt } from "react-icons/fa";

const practices = [
  { icon: Hash, en: 'Numerology', hi: 'अंकशास्त्र' },
  { icon: Sun, en: 'Vedic Understanding', hi: 'वैदिक समझ' },
  { icon: Target, en: 'Lagna-based Observation', hi: 'लग्न-आधारित अवलोकन' },
  { icon: Layers, en: 'Tarot Reflection', hi: 'टैरो चिंतन' },
  { icon: Gem, en: 'Crystal Support', hi: 'क्रिस्टल सहायता' },
];

const beliefs = [
  { en: 'Understand themselves better', hi: 'खुद को बेहतर समझें' },
  { en: 'Feel more aware of their path', hi: 'अपने रास्ते के प्रति अधिक जागरूक महसूस करें' },
  { en: 'Make more conscious decisions', hi: 'अधिक सचेत निर्णय लें' },
  { en: 'Feel less lost and more aligned', hi: 'कम खोया हुआ और अधिक संरेखित महसूस करें' },
];

const style = [
  { en: 'Intuitive but practical', hi: 'सहज लेकिन व्यावहारिक' },
  { en: 'Spiritual but grounded', hi: 'आध्यात्मिक लेकिन ठोस' },
  { en: 'Deep but simple to understand', hi: 'गहरा लेकिन समझने में सरल' },
];

export default function AboutPage() {
  const navigate = useNavigate();
  const { language } = useStore();

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative py-5 overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                {language === 'en' ? <>About <span className="gradient-text">Astro Tulika</span></> : <><span className="gradient-text">Astro Tulika</span> के बारे में</>}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {language === 'en'
                  ? 'A more grounded and intuitive approach to numerology and spiritual guidance.'
                  : 'अंकशास्त्र और आध्यात्मिक मार्गदर्शन के लिए एक अधिक ठोस और सहज दृष्टिकोण।'}
              </p>
              <div className="text-lg text-muted-foreground leading-relaxed space-y-4 font-body">
  {language === 'en' ? (
    <>
      <p className=''> 
        Tulika Devi is an Astrologer, Numerologist, Tarot Reader and Healer, with a deep connection to spiritual sciences from an early age.
      </p>
      <p>
        She comes from Assam, from a family where astrology has been practiced and respected for generations. This legacy naturally shaped her intuitive abilities and understanding of life patterns.
      
        Her approach is simple — to make spiritual knowledge practical, relatable, and useful for real-life situations like relationships, career, emotional balance, and personal growth.
    
        She combines numerology, astrology, and intuitive healing to help people understand themselves better and move forward with clarity.
      </p>
    </>
  ) : (
    <>
      <p>
        तुलिका देवी एक ज्योतिषी, अंकशास्त्री, टैरो रीडर और हीलर हैं, जिनका आध्यात्मिक विज्ञानों से गहरा जुड़ाव बचपन से रहा है।
      </p>
      <p>
        वह असम से हैं, एक ऐसे परिवार से जहां पीढ़ियों से ज्योतिष का अभ्यास और सम्मान किया जाता रहा है।
      
        उनका दृष्टिकोण सरल है — आध्यात्मिक ज्ञान को व्यावहारिक, समझने योग्य और जीवन की वास्तविक परिस्थितियों में उपयोगी बनाना।
      
        वह अंकशास्त्र, ज्योतिष और हीलिंग को मिलाकर लोगों को स्वयं को बेहतर समझने और जीवन में स्पष्टता के साथ आगे बढ़ने में मदद करती हैं।
      </p>
    </>
  )}
</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center">
              <div className="w-64 md:w-72 rounded-3xl overflow-hidden border-2 border-primary/20 shadow-2xl">
                <img src={tulikaPhoto} alt="Astro Tulika" className="w-full h-auto object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-5 bg-muted/30">
  <div className="container   mx-auto px-4 max-w-5xl text-center">

    <h2 className="text-3xl font-heading font-bold mb-12">
      {language === 'en' ? 'Presence Across India' : 'भारत में उपस्थिति'}
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { name: 'Delhi' },
        { name: 'Madhya Pradesh' },
        { name: 'Assam' }
      ].map((loc, i) => (

        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: 20 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          whileHover={{ 
            scale: 1.08,
            rotateY: 10,
            rotateX: 5
          }}
          transition={{ delay: i * 0.2, type: "spring" }}
          className="group perspective bg-purple-300 rounded-3xl"
        >
          
          <div className="relative p-8 rounded-3xl bg-card border border-border/50 shadow-xl transform transition duration-500 preserve-3d">

            {/* 3D Icon */}
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
              className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-primary/10 shadow-inner"
            >
              <FaMapMarkerAlt className="text-2xl text-primary drop-shadow-lg" />
            </motion.div>

            {/* Location */}
            <h3 className="text-xl font-heading font-semibold mb-2 group-hover:text-primary transition">
              {loc.name}
            </h3>

            <p className="text-sm text-muted-foreground">
              {language === 'en'
                ? 'Energy guidance available here'
                : 'यहाँ आध्यात्मिक मार्गदर्शन उपलब्ध है'}
            </p>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 bg-linear-to-br from-primary/20 to-transparent blur-xl transition duration-500" />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Introduction */}
      <section className="py-5 bg-card">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xl font-heading font-semibold text-foreground mb-6 leading-relaxed">
              {language === 'en'
                ? "Astro Tulika's work is rooted in one simple idea:"
                : 'Astro Tulika का काम एक सरल विचार में निहित है:'}
            </p>
            <p className="text-2xl font-heading font-bold gradient-text mb-8">
              {language === 'en'
                ? 'Patterns always speak — if we know how to read them.'
                : 'पैटर्न हमेशा बोलते हैं — अगर हम उन्हें पढ़ना जानते हैं।'}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {language === 'en'
                ? 'Whether it is through numbers, energy, timing, intuition, or recurring life experiences, every person carries patterns that can reveal deeper insight.'
                : 'चाहे वह संख्याओं, ऊर्जा, समय, अंतर्ज्ञान, या आवर्ती जीवन अनुभवों के माध्यम से हो, हर व्यक्ति पैटर्न रखता है जो गहरी अंतर्दृष्टि प्रकट कर सकते हैं।'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* My Work */}
      <section className="py-5 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-heading font-bold text-center mb-10">
            {language === 'en' ? 'My Work Brings Together' : 'मेरा काम एक साथ लाता है'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {practices.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center p-5 rounded-2xl bg-[#246E96] text-white border border-border/50 hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <p.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-center">{language === 'en' ? p.en : p.hi}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-5 bg-card">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-heading font-bold mb-6">
            {language === 'en' ? 'My Approach' : 'मेरा दृष्टिकोण'}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            {language === 'en'
              ? 'I do not believe in making spirituality complicated or fear-driven. I believe guidance should help people:'
              : 'मैं आध्यात्मिकता को जटिल या भय-प्रेरित बनाने में विश्वास नहीं करती। मेरा मानना है कि मार्गदर्शन लोगों की मदद करना चाहिए:'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
            {beliefs.map((b, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <span className="text-sm font-medium">{language === 'en' ? b.en : b.hi}</span>
              </div>
            ))}
          </div>

          <h3 className="font-heading font-semibold text-lg mb-4">{language === 'en' ? 'Style' : 'शैली'}</h3>
          <div className="flex flex-wrap gap-3 mb-12">
            {style.map((s, i) => (
              <span key={i} className="px-4 py-2 rounded-full bg-muted border border-border text-sm font-medium">
                {language === 'en' ? s.en : s.hi}
              </span>
            ))}
          </div>

          <div className="p-8 rounded-2xl bg-pink-50 border border-border/50 text-center">
            <p className="text-lg font-heading font-semibold text-foreground/80 italic">
              {language === 'en'
                ? 'Through Astro Tulika, the intention is not just to offer predictions — but to offer understanding.'
                : 'Astro Tulika के माध्यम से, इरादा केवल भविष्यवाणी देना नहीं है — बल्कि समझ देना है।'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-2 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="gradient-bg  text-white text-base px-8 group" onClick={() => navigate('/courses')}>
              <BookOpen className="w-5 h-5 mr-2" /> {language === 'en' ? 'Explore Courses' : 'कोर्स देखें'}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 border-primary-foreground/30 text-primary-foreground" onClick={() => navigate('/consultations')}>
              <MessageCircle className="w-5 h-5 mr-2" /> {language === 'en' ? 'Book Guidance' : 'मार्गदर्शन बुक करें'}
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
