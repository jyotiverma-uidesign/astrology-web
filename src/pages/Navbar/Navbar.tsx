import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle, Globe, BookOpen } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useStore } from '../../store/useStore';
import logo from '../../assets/logo.jpeg';

const navLinks = [
  { path: '/', labelEn: 'Home', labelHi: 'होम' },
  { path: '/about', labelEn: 'About', labelHi: 'परिचय' },
  { path: '/courses', labelEn: 'Courses', labelHi: 'कोर्स' },
  { path: '/consultations', labelEn: 'Consultations', labelHi: 'परामर्श' },
  { path: '/tarot', labelEn: 'Tarot', labelHi: 'टैरो' },
  { path: '/crystals', labelEn: 'Crystals', labelHi: 'क्रिस्टल' },

  { path: '/contact', labelEn: 'Contact', labelHi: 'संपर्क' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useStore();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-primary/10 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="Astro Tulika" className="w-10 h-10 rounded-full object-cover" />
            <span className="font-heading text-xl font-bold text-foreground">
              Astro<span className="gradient-text">Tulika</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors"
              >
                {language === 'en' ? link.labelEn : link.labelHi}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              {language === 'en' ? 'हिं' : 'EN'}
            </button>
            <Button size="sm" variant="outline" className="border-primary/30" onClick={() => navigate('/consultations')}>
              <MessageCircle className="w-4 h-4 mr-1" />
              {language === 'en' ? 'Book Guidance' : 'मार्गदर्शन'}
            </Button>
            <Button size="sm" className="gradient-bg text-primary-foreground glow-gold" onClick={() => navigate('/courses')}>
              <BookOpen className="w-4 h-4 mr-1" />
              {language === 'en' ? 'Join Course' : 'कोर्स जॉइन'}
            </Button>
          </div>

          <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-card border-t border-primary/10"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors"
                >
                  {language === 'en' ? link.labelEn : link.labelHi}
                </Link>
              ))}
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1 gradient-bg text-primary-foreground" onClick={() => { navigate('/courses'); setIsOpen(false); }}>
                  {language === 'en' ? 'Join Course' : 'कोर्स जॉइन'}
                </Button>
                <button
                  onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                  className="px-3 py-1 rounded-md text-sm font-medium border border-border text-muted-foreground"
                >
                  {language === 'en' ? 'हिंदी' : 'English'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
