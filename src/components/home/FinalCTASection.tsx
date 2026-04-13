import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, MessageCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useStore } from '../../store/useStore';

export default function FinalCTASection() {
  const navigate = useNavigate();
  const { language } = useStore();

  return (
    <section className="py-24 bg-card relative overflow-hidden">
      <div className="absolute inset-0 warm-bg opacity-50" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 leading-snug">
            {language === 'en'
              ? <>If you are looking for <span className="gradient-text">clarity, alignment and deeper understanding</span> — you are in the right place.</>
              : <>यदि आप <span className="gradient-text">स्पष्टता, संरेखण और गहरी समझ</span> की तलाश में हैं — तो आप सही जगह पर हैं।</>}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Button size="lg" className="gradient-bg text-white text-base px-8 glow-gold group" onClick={() => navigate('/courses')}>
              <BookOpen className="w-5 h-5 mr-2 " />
              {language === 'en' ? 'Join a Course' : 'कोर्स में शामिल हों'}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 border-primary/30" onClick={() => navigate('/consultations')}>
              <MessageCircle className="w-5 h-5 mr-2" />
              {language === 'en' ? 'Book Guidance' : 'मार्गदर्शन बुक करें'}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
