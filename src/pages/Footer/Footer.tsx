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
      <div className="container mx-auto px-4 py-6">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src={logo}
                alt="Astro Tulika"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-heading text-lg font-bold">
                Astro Tulika
              </span>
            </div>

            <p className="text-sm text-white/70 mb-2">
              Decode patterns, not just numbers.
            </p>

            <p className="text-xs text-white/50">
              Helping you understand numbers, patterns and energy with clarity.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="border-b border-white/10 pb-4 sm:border-none sm:pb-0">
            <h4 className="font-heading font-semibold mb-3 text-white">
              Quick Links
            </h4>

            <div className="space-y-2 text-sm text-white/70">
              {mainLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* LEGAL */}
          <div className="border-b border-white/10 pb-4 sm:border-none sm:pb-0">
            <h4 className="font-heading font-semibold mb-3 text-white">
              Legal
            </h4>

            <div className="space-y-2 text-sm text-white/70">
              {legalLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-heading font-semibold mb-3 text-white">
              Contact
            </h4>

            <div className="space-y-2 text-sm text-white/70">
              <a href="https://mail.google.com/mail/u/0/#inbox?compose=new"
  className="hover:text-white transition-colors"
>
  tulikanewslive@gmail.com
</a><br></br>
             <a
  href="https://wa.me/918135802073"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-white transition-colors"
>
  +91 8135802073
</a>
              <p>Delhi • Madhya Pradesh • Assam</p>
            </div>

            <p className="text-xs text-white/50 mt-4">
              Numerology • Vedic Alignment • Tarot • Crystal Guidance
            </p>
          </div>

        </div>

        {/* BOTTOM LINE */}
        <div className="border-t border-white/10 mt-8 pt-4 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Astro Tulika. All rights reserved.
        </div>

      </div>
    </footer>
  );
}