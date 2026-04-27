import { motion } from 'framer-motion';
import { CheckCircle, Clock, ArrowRight, Star, BookOpen, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useStore } from '../store/useStore';
import PageTransition from '../components/PageTransition';
import { useCourseStore } from '../store/CourseStore';
import { useEffect } from 'react';



export default function CoursesPage() {
  const { courses, fetchCourses } = useCourseStore();

useEffect(() => {
  fetchCourses();
}, [fetchCourses]);
  
  const { language } = useStore();

  const handleEnroll = (courseName: string) => {
    const msg = encodeURIComponent(`Hi, I want to enroll in the "${courseName}" course. Please share the details.`);
    window.open(`https://wa.me/+918135802073?text=${msg}`, '_blank');
  };
  console.log(courses);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="py-5 bg-card" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <BookOpen className="w-3.5 h-3.5" /> {language === 'en' ? 'Learn & Grow' : 'सीखें और बढ़ें'}
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              {language === 'en'
                ? <>Learn to <span className="gradient-text">Decode Patterns</span>, Not Just Numbers</>
                : <><span className="gradient-text">पैटर्न को समझना</span> सीखें, न कि केवल संख्याओं को</>}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'en'
                ? 'Spiritual learning should not feel confusing or disconnected from real life. The courses at Astro Tulika are designed to help you understand numbers, energy, intuitive tools and alignment in a more practical and meaningful way.'
                : 'आध्यात्मिक शिक्षा भ्रमित करने वाली या वास्तविक जीवन से कटी हुई नहीं लगनी चाहिए।'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Course Cards */}
      <section className="py-7">
<div className="container mx-auto px-4 space-y-8 md:space-y-10">
            {courses.map((course) => (
            <motion.div
              key={course.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`rounded-3xl border p-8 md:p-12 ${course.featured ? 'border-primary/40 bg-card shadow-xl' : 'border-border/50 bg-card'}`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                <div>
                  {course.featured && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full gradient-bg text-yellow-400 text-xs font-semibold mb-3">
                      <Star className="w-3 h-3" /> Most Popular
                    </span>
                  )}
                  <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2">{language === 'en' ? course.en : course.hi}</h2>
                  <p className="text-muted-foreground leading-relaxed max-w-xl">{language === 'en' ? course.descEn : course.descHi}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-3xl font-bold gradient-text">₹{course.price}</div>
                  <div className="text-sm text-muted-foreground flex items-center justify-end gap-1">
                    <Clock className="w-3.5 h-3.5" /> {course.duration}
                  </div>
                </div>
              </div>

            {course.topics?.length > 0 && (
  <>
    <h3 className="font-heading font-semibold mb-4">
      {language === 'en' ? 'What You Will Learn' : 'आप क्या सीखेंगे'}
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
      {course.topics.map((topic: string, j: number) => (
        <div key={j} className="flex items-start gap-2 p-1 rounded-xl bg-primary/5">
          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span className="text-sm">{topic}</span>
        </div>
      ))}
    </div>
  </>
)}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
               {course.idealFor?.length > 0 && (
  <div>
    <h4 className="text-sm font-semibold text-muted-foreground mb-2">
      {language === 'en' ? 'Ideal For:' : 'इसके लिए आदर्श:'}
    </h4>
    <div className="flex flex-wrap gap-2">
      {course.idealFor.map((item: string, j: number) => (
        <span key={j} className="px-3 py-1 rounded-full bg-muted text-xs font-medium">
          {item}
        </span>
      ))}
    </div>
  </div>
)}
                <Button
                  size="lg"
                  className={`group ${course.featured ? 'gradient-bg text-white glow-gold' : ''}`}
                  variant={course.featured ? 'default' : 'outline'}
                  onClick={() => handleEnroll(course.en)}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Enroll Now' : 'अभी नामांकन करें'}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
