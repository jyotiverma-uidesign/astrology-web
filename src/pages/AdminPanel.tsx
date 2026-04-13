import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, CreditCard, Settings, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import PageTransition from '../components/PageTransition';
import { astrologers } from '../data/astrologers';
import { useStore } from '../store/useStore';

const tabs = [
  { id: 'astrologers', label: 'Astrologers', icon: Users },
  { id: 'bookings', label: 'Bookings', icon: BookOpen },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('astrologers');
  const { language } = useStore();

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-heading font-bold mb-6">{language === 'en' ? 'Admin Panel' : 'एडमिन पैनल'}</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Users', value: '10,234' },
            { label: 'Active Astrologers', value: String(astrologers.filter(a => a.isOnline).length) },
            { label: 'Bookings Today', value: '48' },
            { label: 'Revenue', value: '₹1.2L' },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card rounded-xl p-4 text-center">
              <div className="text-xl font-heading font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-lg bg-muted mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id ? 'gradient-bg text-primary-foreground' : 'hover:bg-background'}`}>
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'astrologers' && (
          <div className="glass-card rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium hidden sm:table-cell">Speciality</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {astrologers.map((a) => (
                  <tr key={a.id} className="border-t border-border/50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <img src={a.avatar} alt={a.name} className="w-8 h-8 rounded-full object-cover" />
                        <span className="font-medium">{a.name}</span>
                      </div>
                    </td>
                    <td className="p-3 hidden sm:table-cell text-muted-foreground">{a.speciality}</td>
                    <td className="p-3">
                      {a.isOnline ? (
                        <span className="flex items-center gap-1 text-green-600 text-xs"><CheckCircle className="w-3 h-3" /> Online</span>
                      ) : (
                        <span className="flex items-center gap-1 text-muted-foreground text-xs"><XCircle className="w-3 h-3" /> Offline</span>
                      )}
                    </td>
                    <td className="p-3">
                      <Button size="sm" variant="outline" className="text-xs h-7">Manage</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab !== 'astrologers' && (
          <div className="glass-card rounded-xl p-12 text-center">
            <p className="text-muted-foreground">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} management coming soon...</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
