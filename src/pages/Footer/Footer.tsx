import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpeg';

const mainLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/courses', label: 'Courses' },
  { path: '/consultations', label: 'Consultations' },
  { path: '/tarot', label: 'Tarot' },
  { path: '/crystals', label: 'Crystals' },
  { path: '/faqs', label: 'FAQs' },
  { path: '/contact', label: 'Contact' },
];

const legalLinks = [
  { path: '/privacy', label: 'Privacy Policy' },
  { path: '/terms', label: 'Terms & Conditions' },
  { path: '/refund', label: 'Refund Policy' },
];

export default function Footer() {
  return (
    <footer className="cosmic-bg text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Astro Tulika" className="w-10 h-10 rounded-full object-cover" />
              <span className="font-heading text-lg font-bold">Astro Tulika</span>
            </div>
            <p className="text-sm opacity-70 mb-2">Decode patterns, not just numbers.</p>
            <p className="text-xs opacity-50">Helping you understand numbers, patterns and energy with more clarity and alignment.</p>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3">Quick Links</h4>
            <div className="space-y-2 text-sm opacity-70">
              {mainLinks.map((link) => (
                <Link key={link.path} to={link.path} className="block hover:opacity-100 transition-opacity">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3">Legal</h4>
            <div className="space-y-2 text-sm opacity-70">
              {legalLinks.map((link) => (
                <Link key={link.path} to={link.path} className="block hover:opacity-100 transition-opacity">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3">Contact</h4>
            <div className="space-y-2 text-sm opacity-70">
              <p>Tulikanewslive@gmail.com</p>
              <p>+918135802073</p>
              <p>Delhi • Madhya Pradesh • Assam</p>

             
            </div>
            <p className="text-xs opacity-50 mt-4">Numerology • Vedic Alignment • Tarot • Crystal Guidance</p>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-sm opacity-50">
          © {new Date().getFullYear()} Astro Tulika. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
