import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Clock, Users, Award, ChevronDown, ChevronUp,
  Play, FileText, HelpCircle, CheckCircle, MessageCircle, 
  Globe, Shield, Video, GraduationCap
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { useStore } from '../store/useStore';
import { courses } from '../data/Courses';
import PageTransition from '../components/PageTransition';
import tulikaDevi from '../assets/tulikadevi.jpeg';

const tabs = [
  { id: 'overview', labelEn: 'Overview', labelHi: 'अवलोकन' },
  { id: 'content', labelEn: 'Content', labelHi: 'सामग्री' },
  { id: 'instructor', labelEn: 'Instructor', labelHi: 'प्रशिक्षक' },
  { id: 'faqs', labelEn: 'FAQs', labelHi: 'सवाल-जवाब' },
];

export default function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language } = useStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold mb-2">Course Not Found</h1>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  const handleEnroll = () => {
    const msg = encodeURIComponent(
      `Hi, I want to enroll in the "${course.title}" course (₹${course.price}). Please share the details.`
    );
    window.open(`https://wa.me/${course.whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <PageTransition>
      {/* Hero Banner */}
      <section className="relative overflow-hidden text-white " style={{ background: 'var(--gradient-cosmic)' }}>
        <div className="absolute inset-0 opacity-20">
          <img src={course.image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container mx-auto px-4 py-16 md:py-20">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Left — Info */}
            <div className="flex-1 text-primary-foreground">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-white text-xs font-semibold mb-4">
                {language === 'en' ? course.level : course.levelHi}
              </span>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                {language === 'en' ? course.title : course.titleHi}
              </h1>
              <p className="text-lg opacity-80 mb-6 max-w-xl">
                {language === 'en' ? course.subtitle : course.subtitleHi}
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                <span className="flex items-center gap-1.5">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-4 h-4 ${j < Math.floor(course.rating) ? 'fill-primary text-primary' : 'text-muted-foreground/40'}`} />
                    ))}
                  </div>
                  <span className="font-semibold">{course.rating}</span>
                  <span className="opacity-70">({course.reviews} {language === 'en' ? 'reviews' : 'समीक्षाएं'})</span>
                </span>
                <span className="flex items-center gap-1 opacity-80">
                  <Users className="w-4 h-4" />
                  {course.learners.toLocaleString()}+ {language === 'en' ? 'learners' : 'शिक्षार्थी'}
                </span>
              </div>

              <p className="text-sm opacity-70 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                {language === 'en' ? `By ${course.instructor}` : `${course.instructorHi} द्वारा`}
              </p>
            </div>

            {/* Right — Enroll Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full lg:w-96 bg-card rounded-2xl text-white shadow-2xl overflow-hidden border border-border/30"
            >
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-3xl font-bold text-foreground">₹{course.price}</span>
                  <span className="text-lg text-muted-foreground line-through">₹{course.originalPrice}</span>
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-semibold">
                    {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                  </span>
                </div>

                <Button
                  size="lg"
                  className="w-full gradient-bg text-primary-foreground text-base font-semibold mt-4 glow-gold"
                  onClick={handleEnroll}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Enroll Now via WhatsApp' : 'WhatsApp से नामांकन करें'}
                </Button>

                <div className="mt-5 space-y-3">
                  {course.highlights.map((h, i) => {
                    const icons = [Video, Award, Clock, Globe, Shield];
                    const Icon = icons[i % icons.length];
                    return (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <Icon className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-muted-foreground">{language === 'en' ? h.en : h.hi}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="sticky top-16 z-30 bg-card/95 text-white backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap text-white  border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {language === 'en' ? tab.labelEn : tab.labelHi}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Overview */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
              {/* About */}
              <div>
                <h2 className="text-2xl font-heading font-bold mb-4">
                  {language === 'en' ? 'About the Course' : 'कोर्स के बारे में'}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {language === 'en' ? course.description : course.descriptionHi}
                </p>
              </div>

              {/* Why Join */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Award, en: 'In-Demand & High Paying Skill', hi: 'उच्च मांग और अच्छी कमाई का कौशल', descEn: 'This is one of the most sought-after skills in today\'s spiritual market.', descHi: 'यह आज के आध्यात्मिक बाजार में सबसे अधिक मांग वाले कौशलों में से एक है।' },
                  { icon: GraduationCap, en: 'Enhance Your Skills', hi: 'अपने कौशल बढ़ाएं', descEn: 'After mastering basics, take advanced courses to become a professional.', descHi: 'बुनियादी बातों में महारत हासिल करने के बाद, पेशेवर बनने के लिए उन्नत कोर्स लें।' },
                  { icon: Users, en: 'Less Competition', hi: 'कम प्रतिस्पर्धा', descEn: 'A niche field with growing demand and fewer experts.', descHi: 'बढ़ती मांग और कम विशेषज्ञों वाला एक विशिष्ट क्षेत्र।' },
                  { icon: Star, en: 'Learn from the Best', hi: 'सर्वश्रेष्ठ से सीखें', descEn: 'Guided by Tulika Devi with years of practical experience.', descHi: 'तुलिका देवी द्वारा वर्षों के व्यावहारिक अनुभव से मार्गदर्शन।' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5 rounded-xl bg-muted/50 border border-border/50"
                  >
                    <item.icon className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-1">{language === 'en' ? item.en : item.hi}</h3>
                    <p className="text-sm text-muted-foreground">{language === 'en' ? item.descEn : item.descHi}</p>
                  </motion.div>
                ))}
              </div>

              {/* What You'll Learn */}
              <div>
                <h2 className="text-2xl font-heading font-bold mb-4">
                  {language === 'en' ? 'What You\'ll Learn' : 'आप क्या सीखेंगे'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.whatYouLearn.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-primary/5">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{language === 'en' ? item.en : item.hi}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Content / Modules */}
          {activeTab === 'content' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-heading font-bold mb-6">
                {language === 'en' ? 'Course Lessons' : 'कोर्स पाठ'}
              </h2>
              <div className="space-y-3">
                {course.courseModules.map((mod, i) => (
                  <div key={mod.id} className="rounded-xl border border-border/50 overflow-hidden bg-card">
                    <button
                      onClick={() => setOpenModule(openModule === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-9 h-9 rounded-lg bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">
                          {String(mod.id).padStart(2, '0')}
                        </span>
                        <div className="text-left">
                          <h3 className="font-semibold text-sm">
                            {language === 'en' ? mod.title : mod.titleHi}
                          </h3>
                          <span className="text-xs text-muted-foreground">{mod.duration}</span>
                        </div>
                      </div>
                      {openModule === i ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                    </button>
                    <AnimatePresence>
                      {openModule === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 space-y-2">
                            {mod.lessons.map((lesson, j) => (
                              <div key={j} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30 text-sm">
                                <div className="flex items-center gap-2.5">
                                  {lesson.type === 'video' && <Play className="w-4 h-4 text-primary" />}
                                  {lesson.type === 'notes' && <FileText className="w-4 h-4 text-secondary" />}
                                  {lesson.type === 'quiz' && <HelpCircle className="w-4 h-4 text-accent" />}
                                  <span>{language === 'en' ? lesson.name : lesson.nameHi}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">{lesson.detail}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Instructor */}
          {activeTab === 'instructor' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col md:flex-row gap-8 items-start">
              <img src={tulikaDevi} alt="Tulika Devi" className="w-40 h-40 rounded-2xl object-cover border-4 border-primary/20" />
              <div>
                <h2 className="text-2xl font-heading font-bold mb-2">Tulika Devi</h2>
                <p className="text-primary font-medium mb-4">
                  {language === 'en' ? 'Astrologer, Numerologist, Tarot Reader & Healer' : 'ज्योतिषी, अंकशास्त्री, टैरो रीडर और हीलर'}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {language === 'en'
                    ? 'Tulika Devi is an Astrologer, Numerologist, Tarot Reader and Healer, with a deep connection to spiritual sciences from an early age. She comes from Assam, from a family where astrology has been practiced and respected for generations. This legacy naturally shaped her intuitive abilities and understanding of life patterns.'
                    : 'तुलिका देवी एक ज्योतिषी, अंकशास्त्री, टैरो रीडर और हीलर हैं, जिनका बचपन से ही आध्यात्मिक विज्ञान से गहरा संबंध है। वे असम से हैं, एक ऐसे परिवार से जहां पीढ़ियों से ज्योतिष का अभ्यास और सम्मान किया जाता रहा है।'}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {language === 'en'
                    ? 'Her approach is simple — to make spiritual knowledge practical, relatable, and useful for real-life situations like relationships, career, emotional balance, and personal growth.'
                    : 'उनका दृष्टिकोण सरल है — आध्यात्मिक ज्ञान को व्यावहारिक, संबंधित और वास्तविक जीवन की स्थितियों के लिए उपयोगी बनाना।'}
                </p>
              </div>
            </motion.div>
          )}

          {/* FAQs */}
          {activeTab === 'faqs' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-heading font-bold mb-6">
                {language === 'en' ? 'Frequently Asked Questions' : 'अक्सर पूछे जाने वाले सवाल'}
              </h2>
              <div className="space-y-3">
                {course.faqs.map((faq, i) => (
                  <div key={i} className="rounded-xl border border-border/50 bg-card overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
                    >
                      <span className="font-medium text-sm pr-4">{language === 'en' ? faq.q : faq.qHi}</span>
                      {openFaq === i ? <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />}
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-4 text-sm text-muted-foreground">
                            {language === 'en' ? faq.a : faq.aHi}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mt-16 text-center p-8 rounded-2xl border border-primary/20 bg-primary/5"
        >
          <h3 className="text-xl font-heading font-bold mb-2">
            {language === 'en' ? 'Ready to Start Learning?' : 'सीखना शुरू करने के लिए तैयार?'}
          </h3>
          <p className="text-sm text-muted-foreground mb-5">
            {language === 'en'
              ? 'Enroll now and connect with Tulika Devi directly on WhatsApp for instant access.'
              : 'अभी नामांकन करें और तुरंत एक्सेस के लिए तुलिका देवी से सीधे WhatsApp पर जुड़ें।'}
          </p>
          <Button size="lg" className="gradient-bg text-primary-foreground text-base font-semibold glow-gold" onClick={handleEnroll}>
            <MessageCircle className="w-5 h-5 mr-2" />
            {language === 'en' ? `Enroll Now — ₹${course.price}` : `अभी नामांकन — ₹${course.price}`}
          </Button>
        </motion.div>
      </div>
    </PageTransition>
  );
}
