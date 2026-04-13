import { useState, useEffect } from 'react';
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

  // 🔒 Prevent background scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
  <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm ">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Astro Tulika" className="w-10 h-10 rounded-full object-cover" />
            <span className="font-bold text-xl">
              Astro<span className="text-primary">Tulika</span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-3 py-2 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-primary/5"
              >
                {language === 'en' ? link.labelEn : link.labelHi}
              </Link>
            ))}
          </div>

          {/* RIGHT ACTIONS (DESKTOP) */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-2 py-1 text-xs flex items-center gap-1 rounded-md hover:bg-muted"
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'हिं' : 'EN'}
            </button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate('/consultations')}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              {language === 'en' ? 'Book' : 'मार्गदर्शन'}
            </Button>

            <Button
              size="sm"
              className="gradient-bg text-white"
              onClick={() => navigate('/courses')}
            >
              <BookOpen className="w-4 h-4 mr-1" />
              {language === 'en' ? 'Join courses' : 'कोर्स'}
            </Button>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '100vh', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden fixed left-0 right-0 top-16 bg-white text-black border-t border-gray-200 overflow-y-auto"
          >
            <div className="px-4 py-4 flex flex-col gap-2">

              {/* LINKS */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="py-3 px-4 rounded-lg text-sm font-medium hover:bg-primary/5"
                >
                  {language === 'en' ? link.labelEn : link.labelHi}
                </Link>
              ))}

              {/* ACTION BUTTONS */}
              <div className="flex flex-col gap-3 pt-4">
                <Button
                  className="w-full gradient-bg"
                  onClick={() => {
                    navigate('/courses');
                    setIsOpen(false);
                  }}
                >
                  {language === 'en' ? 'Join Course' : 'कोर्स जॉइन'}
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Switch to हिंदी' : 'Switch to English'}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}