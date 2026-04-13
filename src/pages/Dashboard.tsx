import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Wallet, MessageCircle, Calendar, Settings, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button';
import PageTransition from '../components/PageTransition';
import { useStore } from '../store/useStore';

const menuItems = [
  { icon: User, label: 'Profile', labelHi: 'प्रोफ़ाइल' },
  { icon: Wallet, label: 'Wallet (₹500)', labelHi: 'वॉलेट (₹500)' },
  { icon: MessageCircle, label: 'Chat History', labelHi: 'चैट इतिहास' },
  { icon: Calendar, label: 'Booking History', labelHi: 'बुकिंग इतिहास' },
  { icon: Settings, label: 'Settings', labelHi: 'सेटिंग्स' },
];

const bookings = [
  { astrologer: 'Pandit Rajesh Sharma', date: '2024-03-20', time: '10:00 AM', status: 'Completed' },
  { astrologer: 'Acharya Meera Devi', date: '2024-03-25', time: '03:00 PM', status: 'Upcoming' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { language } = useStore();

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-heading font-bold mb-6">{language === 'en' ? 'My Dashboard' : 'मेरा डैशबोर्ड'}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="glass-card rounded-xl p-4 space-y-1 h-fit">
            <div className="flex items-center gap-3 p-3 mb-3">
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center">
                <User className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <div className="font-semibold">{language === 'en' ? 'Guest User' : 'अतिथि उपयोगकर्ता'}</div>
                <div className="text-xs text-muted-foreground">guest@astrojyoti.com</div>
              </div>
            </div>
            {menuItems.map((item) => (
              <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-muted transition-colors text-left">
                <item.icon className="w-4 h-4 text-muted-foreground" />
                {language === 'en' ? item.label : item.labelHi}
              </button>
            ))}
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/5 transition-colors text-left">
              <LogOut className="w-4 h-4" />
              {language === 'en' ? 'Logout' : 'लॉगआउट'}
            </button>
          </div>

          {/* Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: language === 'en' ? 'Wallet Balance' : 'वॉलेट बैलेंस', value: '₹500', color: 'from-primary to-secondary' },
                { label: language === 'en' ? 'Total Chats' : 'कुल चैट', value: '12', color: 'from-secondary to-primary' },
                { label: language === 'en' ? 'Bookings' : 'बुकिंग', value: '5', color: 'from-accent to-gold' },
              ].map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card rounded-xl p-4 text-center">
                  <div className={`text-2xl font-heading font-bold bg-linear-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Bookings */}
            <div className="glass-card rounded-xl p-4">
              <h2 className="font-heading font-semibold mb-4">{language === 'en' ? 'Recent Bookings' : 'हाल की बुकिंग'}</h2>
              <div className="space-y-3">
                {bookings.map((b, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <div className="font-medium text-sm">{b.astrologer}</div>
                      <div className="text-xs text-muted-foreground">{b.date} at {b.time}</div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${b.status === 'Completed' ? 'bg-green-100 text-green-700' : 'gradient-bg text-primary-foreground'}`}>{b.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="gradient-bg text-primary-foreground" onClick={() => navigate('/astrologers')}>
                {language === 'en' ? 'Start New Chat' : 'नई चैट शुरू करें'}
              </Button>
              <Button variant="outline" onClick={() => navigate('/booking')}>
                {language === 'en' ? 'Book Session' : 'सत्र बुक करें'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
