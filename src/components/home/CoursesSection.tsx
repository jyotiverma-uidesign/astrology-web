import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Users, BookOpen, Award, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useStore } from '../../store/useStore';
import { courses } from '../../data/Courses';

export default function CoursesSection() {
  const navigate = useNavigate();
  const { language } = useStore();

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {language === 'en' ? '📚 Learn from Tulika Devi' : '📚 तुलिका देवी से सीखें'}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
            {language === 'en' ? 'Our Courses' : 'हमारे कोर्स'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'en'
              ? 'Master astrology, numerology, and tarot with structured courses designed by Tulika Devi. Learn at your own pace.'
              : 'तुलिका देवी द्वारा डिज़ाइन किए गए कोर्स से ज्योतिष, अंकशास्त्र और टैरो में महारत हासिल करें।'}
          </p>
        </motion.div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold">
                    {language === 'en' ? course.level : course.levelHi}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-foreground text-xs font-semibold">
                    {course.language}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-heading font-bold text-lg mb-1">
                  {language === 'en' ? course.title : course.titleHi}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {language === 'en' ? course.subtitle : course.subtitleHi}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {course.modules} {language === 'en' ? 'Modules' : 'मॉड्यूल'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {course.learners.toLocaleString()}+
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`w-3.5 h-3.5 ${j < Math.floor(course.rating) ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold">{course.rating}</span>
                  <span className="text-xs text-muted-foreground">({course.reviews})</span>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-foreground">₹{course.price}</span>
                    <span className="text-sm text-muted-foreground line-through">₹{course.originalPrice}</span>
                  </div>
                  <Button
                    size="sm"
                    className="gradient-bg text-primary-foreground group-hover:glow-gold transition-shadow"
                    onClick={() => navigate(`/course/${course.slug}`)}
                  >
                    {language === 'en' ? 'Enroll' : 'नामांकन'}
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-primary/5 border border-primary/20">
            <Award className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">
              {language === 'en'
                ? `${courses.reduce((a, c) => a + c.learners, 0).toLocaleString()}+ learners enrolled across all courses`
                : `सभी कोर्स में ${courses.reduce((a, c) => a + c.learners, 0).toLocaleString()}+ शिक्षार्थी नामांकित`}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
