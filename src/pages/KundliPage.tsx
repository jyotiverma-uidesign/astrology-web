import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Moon, Sun, Zap, Shield, Heart, Briefcase, Activity, Clock, ChevronRight, ArrowRight, Download, Share2,  RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/label';
import PageTransition from '../components/PageTransition';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { useState,  useEffect } from 'react';
const rashiData = [
  { name: 'Aries', nameHi: 'मेष', symbol: '♈', lord: 'Mars', element: 'Fire', color: 'hsl(var(--destructive))', quality: 'Cardinal', lucky: '9, 18, 27', gem: 'Red Coral' },
  { name: 'Taurus', nameHi: 'वृषभ', symbol: '♉', lord: 'Venus', element: 'Earth', color: 'hsl(var(--accent))', quality: 'Fixed', lucky: '6, 15, 24', gem: 'Diamond' },
  { name: 'Gemini', nameHi: 'मिथुन', symbol: '♊', lord: 'Mercury', element: 'Air', color: 'hsl(var(--secondary))', quality: 'Mutable', lucky: '5, 14, 23', gem: 'Emerald' },
  { name: 'Cancer', nameHi: 'कर्क', symbol: '♋', lord: 'Moon', element: 'Water', color: 'hsl(var(--primary))', quality: 'Cardinal', lucky: '2, 11, 20', gem: 'Pearl' },
  { name: 'Leo', nameHi: 'सिंह', symbol: '♌', lord: 'Sun', element: 'Fire', color: 'hsl(var(--accent))', quality: 'Fixed', lucky: '1, 10, 19', gem: 'Ruby' },
  { name: 'Virgo', nameHi: 'कन्या', symbol: '♍', lord: 'Mercury', element: 'Earth', color: 'hsl(var(--secondary))', quality: 'Mutable', lucky: '5, 14, 23', gem: 'Emerald' },
  { name: 'Libra', nameHi: 'तुला', symbol: '♎', lord: 'Venus', element: 'Air', color: 'hsl(var(--primary))', quality: 'Cardinal', lucky: '6, 15, 24', gem: 'Diamond' },
  { name: 'Scorpio', nameHi: 'वृश्चिक', symbol: '♏', lord: 'Mars', element: 'Water', color: 'hsl(var(--destructive))', quality: 'Fixed', lucky: '9, 18, 27', gem: 'Red Coral' },
  { name: 'Sagittarius', nameHi: 'धनु', symbol: '♐', lord: 'Jupiter', element: 'Fire', color: 'hsl(var(--accent))', quality: 'Mutable', lucky: '3, 12, 21', gem: 'Yellow Sapphire' },
  { name: 'Capricorn', nameHi: 'मकर', symbol: '♑', lord: 'Saturn', element: 'Earth', color: 'hsl(var(--primary))', quality: 'Cardinal', lucky: '8, 17, 26', gem: 'Blue Sapphire' },
  { name: 'Aquarius', nameHi: 'कुंभ', symbol: '♒', lord: 'Saturn', element: 'Air', color: 'hsl(var(--secondary))', quality: 'Fixed', lucky: '8, 17, 26', gem: 'Blue Sapphire' },
  { name: 'Pisces', nameHi: 'मीन', symbol: '♓', lord: 'Jupiter', element: 'Water', color: 'hsl(var(--primary))', quality: 'Mutable', lucky: '3, 12, 21', gem: 'Yellow Sapphire' },
];

const nakshatras = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Moola', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'];

const doshaChecks = [
  { name: 'Mangal Dosha', nameHi: 'मंगल दोष', icon: '🔴', desc: 'Mars placement affecting marriage prospects' },
  { name: 'Kaal Sarp Dosha', nameHi: 'काल सर्प दोष', icon: '🐍', desc: 'All planets between Rahu and Ketu' },
  { name: 'Pitra Dosha', nameHi: 'पितृ दोष', icon: '🙏', desc: 'Ancestral karmic influences' },
  { name: 'Shani Dosha', nameHi: 'शनि दोष', icon: '⚫', desc: 'Saturn\'s challenging influence' },
];

const features = [
  { icon: '📊', title: 'Birth Chart', titleHi: 'जन्म कुंडली', desc: 'Complete Lagna & Navamsa charts' },
  { icon: '🌟', title: 'Dasha Periods', titleHi: 'दशा अवधि', desc: 'Vimshottari Dasha analysis' },
  { icon: '💎', title: 'Gemstone Guide', titleHi: 'रत्न मार्गदर्शन', desc: 'Personalized gemstone recommendations' },
  { icon: '🔮', title: 'AI Predictions', titleHi: 'AI भविष्यवाणी', desc: 'AI-powered life predictions' },
  { icon: '❤️', title: 'Compatibility', titleHi: 'अनुकूलता', desc: 'Marriage & partner matching' },
  { icon: '🛡️', title: 'Remedies', titleHi: 'उपाय', desc: 'Personalized dosha remedies' },
];

const testimonials = [
  { text: 'The AI predictions were eerily accurate. Got warned about a job change 3 months before!', name: 'Rohit S.', rating: 5 },
  { text: 'Best free kundli I\'ve found. The dosha analysis helped me understand my marriage delays.', name: 'Meena P.', rating: 5 },
  { text: 'The gemstone recommendation actually worked! Wearing Yellow Sapphire changed my fortune.', name: 'Amit K.', rating: 5 },
];

export default function KundliPage() {
  const { language } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', dob: '', time: '', place: '' });
  const [result, setResult] = useState<typeof rashiData[0] | null>(null);
  const [nakshatra, setNakshatra] = useState('');
  const [aiPrediction, setAiPrediction] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'chart' | 'dosha' | 'dasha' | 'ai'>('chart');
const [doshaResults, setDoshaResults] = useState<boolean[]>([]);
const [particles, setParticles] = useState<Particle[]>([]);


  const generateKundli = () => {
    if (!form.name || !form.dob) return;
    const d = new Date(form.dob);
    const rashi = rashiData[d.getDate() % 12];
    const nak = nakshatras[(d.getDate() + d.getMonth()) % 27];
    setResult(rashi);
    setNakshatra(nak);
    setAiLoading(true);
    setTimeout(() => {
      setAiPrediction(`Based on your birth details, your ascendant falls in ${rashi.name} (${rashi.nameHi}), ruled by ${rashi.lord}. Your Nakshatra is ${nak}.\n\n🔮 Career: Strong planetary support indicates growth in professional life, especially after mid-year.\n\n❤️ Relationships: ${rashi.element === 'Fire' ? 'Your fiery nature attracts passionate connections. Be mindful of ego in partnerships.' : rashi.element === 'Water' ? 'Deep emotional intelligence guides your relationships. Trust your intuition in love.' : rashi.element === 'Earth' ? 'Stability and loyalty define your relationships. A grounded partner complements you.' : 'Communication is your superpower in relationships. Express feelings openly.'}\n\n💎 Recommended Gemstone: ${rashi.gem}\n🔢 Lucky Numbers: ${rashi.lucky}`);
      setAiLoading(false);
    }, 2000);
;
  };

  const planets = ['Su', 'Mo', 'Ma', 'Me', 'Ju', 'Ve', 'Sa', 'Ra', 'Ke'];
  type Particle = {
  width: number;
  height: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
};


useEffect(() => {
  setDoshaResults(doshaChecks.map(() => Math.random() > 0.5));

  setParticles(
    Array.from({ length: 30 }, () => ({
      width: 2 + Math.random() * 4,
      height: 2 + Math.random() * 4,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
    }))
  );
}, []);

  return (
    <PageTransition>
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary/10 via-secondary/5 to-accent/10 py-10">
        <div className="absolute inset-0">
        {particles.map((p, i) =>  (

  <motion.div
    key={i}
    className="absolute rounded-full bg-primary/20"
    style={{
      width: p.width,
      height: p.height,
      left: `${p.left}%`,
      top: `${p.top}%`,
    }}
    animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
    transition={{
      duration: p.duration,
      repeat: Infinity,
      delay: p.delay,
    }}
  />
))}
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" /> {language === 'en' ? 'AI-Powered Analysis' : 'AI-संचालित विश्लेषण'}
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              <span className="gradient-text">{language === 'en' ? 'Free Kundli Generator' : 'मुफ्त कुंडली जनरेटर'}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{language === 'en' ? 'Get your complete birth chart analysis with AI-powered predictions, dosha check, and personalized remedies' : 'AI-संचालित भविष्यवाणियों, दोष जांच और व्यक्तिगत उपायों के साथ अपना पूर्ण जन्म कुंडली विश्लेषण प्राप्त करें'}</p>
          </motion.div>
        </div>
      </section>

      {/* 2. Features Grid */}
      <section className="py-10 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card rounded-xl p-4 text-center hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
                <div className="text-2xl mb-2">{f.icon}</div>
                <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{language === 'en' ? f.title : f.titleHi}</h3>
                <p className="text-xs text-muted-foreground mt-1 hidden md:block">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Kundli Form */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
              <Moon className="w-5 h-5 text-primary" />
              {language === 'en' ? 'Enter Birth Details' : 'जन्म विवरण दर्ज करें'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>{language === 'en' ? 'Full Name' : 'पूरा नाम'}</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={language === 'en' ? 'Enter your name' : 'अपना नाम दर्ज करें'} className="mt-1" />
              </div>
              <div>
                <Label>{language === 'en' ? 'Date of Birth' : 'जन्म तिथि'}</Label>
                <Input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>{language === 'en' ? 'Time of Birth' : 'जन्म समय'}</Label>
                <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>{language === 'en' ? 'Place of Birth' : 'जन्म स्थान'}</Label>
                <Input value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} placeholder={language === 'en' ? 'e.g., Delhi' : 'जैसे, दिल्ली'} className="mt-1" />
              </div>
            </div>
            <Button className="w-full mt-6 gradient-bg text-primary-foreground h-12 text-base" size="lg" onClick={generateKundli} disabled={!form.name || !form.dob}>
              <Sparkles className="w-5 h-5 mr-2" />
              {language === 'en' ? 'Generate Kundli' : 'कुंडली बनाएं'}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 4-8. Results Section (shows after generation) */}
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

            {/* 4. Quick Overview Cards */}
            <section className="py-8">
              <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold gradient-text">{form.name}'s Kundli</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm"><Share2 className="w-4 h-4 mr-1" /> Share</Button>
                    <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" /> PDF</Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Rashi', value: `${result.symbol} ${result.name}`, sub: result.nameHi },
                    { label: 'Nakshatra', value: nakshatra, sub: 'Birth Star' },
                    { label: 'Lord', value: result.lord, sub: `${result.element} Sign` },
                    { label: 'Gemstone', value: result.gem, sub: `Lucky: ${result.lucky}` },
                  ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="glass-card rounded-xl p-4 text-center">
                      <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                      <div className="font-heading font-bold text-lg text-primary">{item.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{item.sub}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. Tabbed Analysis */}
            <section className="py-8">
              <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex gap-2 mb-6 overflow-x-auto">
                  {[
                    { key: 'chart' as const, label: 'Birth Chart', icon: Sun },
                    { key: 'dosha' as const, label: 'Dosha Check', icon: Shield },
                    { key: 'dasha' as const, label: 'Dasha Periods', icon: Clock },
                    { key: 'ai' as const, label: 'AI Insights', icon: Sparkles },
                  ].map((tab) => (
                    <Button key={tab.key} variant={activeTab === tab.key ? 'default' : 'outline'} className={`rounded-full ${activeTab === tab.key ? 'gradient-bg text-primary-foreground' : ''}`} onClick={() => setActiveTab(tab.key)}>
                      <tab.icon className="w-4 h-4 mr-1.5" />{tab.label}
                    </Button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === 'chart' && (
                    <motion.div key="chart" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="glass-card rounded-2xl p-6">
                      <h3 className="font-heading font-bold text-lg mb-4">Lagna Chart (D1)</h3>
                      <div className="w-72 h-72 mx-auto relative">
                        <svg viewBox="0 0 300 300" className="w-full h-full">
                          <rect x="10" y="10" width="280" height="280" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" rx="4" />
                          <line x1="10" y1="10" x2="290" y2="290" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.5" />
                          <line x1="290" y1="10" x2="10" y2="290" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.5" />
                          <line x1="150" y1="10" x2="150" y2="290" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.5" />
                          <line x1="10" y1="150" x2="290" y2="150" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.5" />
                          <text x="150" y="75" textAnchor="middle" fontSize="14" fill="hsl(var(--primary))" fontWeight="bold">{result.symbol}</text>
                          <text x="150" y="95" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">Lagna</text>
                          {planets.map((p, i) => {
                            const positions = [
                              { x: 70, y: 50 }, { x: 230, y: 50 }, { x: 50, y: 130 },
                              { x: 250, y: 130 }, { x: 50, y: 200 }, { x: 250, y: 200 },
                              { x: 70, y: 260 }, { x: 230, y: 260 }, { x: 150, y: 240 },
                            ];
                            return <text key={p} x={positions[i].x} y={positions[i].y} textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))">{p}</text>;
                          })}
                        </svg>
                      </div>
                      <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {planets.map((p) => (
                          <span key={p} className="px-2.5 py-1 rounded-full bg-muted text-xs font-medium">{p}</span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'dosha' && (
                    <motion.div key="dosha" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-3">
                      {doshaChecks.map((dosha, i) => {
                        const hasDosha = doshaResults[i] ?? false;
                        return (
                          <div key={i} className="glass-card rounded-xl p-5 flex items-center gap-4">
                            <div className="text-2xl">{dosha.icon}</div>
                            <div className="flex-1">
                              <h4 className="font-heading font-semibold">{language === 'en' ? dosha.name : dosha.nameHi}</h4>
                              <p className="text-sm text-muted-foreground">{dosha.desc}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${hasDosha ? 'bg-destructive/10 text-destructive' : 'bg-green-100 text-green-700'}`}>
                              {hasDosha ? 'Present' : 'Not Present'}
                            </span>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}

                  {activeTab === 'dasha' && (
                    <motion.div key="dasha" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="glass-card rounded-2xl p-6">
                      <h3 className="font-heading font-bold mb-4">Vimshottari Dasha Timeline</h3>
                      <div className="space-y-3">
                        {[
                          { planet: 'Jupiter', period: '2020-2036', status: 'current', effect: 'Growth & expansion' },
                          { planet: 'Saturn', period: '2036-2055', status: 'upcoming', effect: 'Discipline & rewards' },
                          { planet: 'Mercury', period: '2055-2072', status: 'future', effect: 'Communication & intellect' },
                        ].map((d, i) => (
                          <div key={i} className={`flex items-center gap-4 p-4 rounded-xl ${d.status === 'current' ? 'bg-primary/10 border border-primary/30' : 'bg-muted/50'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${d.status === 'current' ? 'gradient-bg text-primary-foreground' : 'bg-muted'}`}>
                              <Star className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{d.planet} Mahadasha</h4>
                                {d.status === 'current' && <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs">Active</span>}
                              </div>
                              <p className="text-sm text-muted-foreground">{d.period} • {d.effect}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'ai' && (
                    <motion.div key="ai" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="glass-card rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-heading font-bold">AI Astrologer Analysis</h3>
                          <p className="text-xs text-muted-foreground">Powered by cosmic intelligence</p>
                        </div>
                      </div>
                      {aiLoading ? (
                        <div className="py-8 text-center">
                          <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground">Analyzing planetary positions...</p>
                        </div>
                      ) : (
                        <div className="prose prose-sm max-w-none">
                          {aiPrediction.split('\n\n').map((para, i) => (
                            <p key={i} className="text-sm text-muted-foreground mb-3">{para}</p>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* 6. Life Prediction Cards */}
            <section className="py-8">
              <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" /> {language === 'en' ? 'Life Predictions' : 'जीवन भविष्यवाणी'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: Heart, title: 'Love & Marriage', titleHi: 'प्रेम और विवाह', desc: `${result.element} signs seek deep emotional connections. Marriage prospects look favorable after ${result.lord} transit.`, color: 'text-destructive' },
                    { icon: Briefcase, title: 'Career', titleHi: 'करियर', desc: `With ${result.lord} as your ruling planet, leadership roles and creative fields suit you best.`, color: 'text-primary' },
                    { icon: Activity, title: 'Health', titleHi: 'स्वास्थ्य', desc: `${result.element} element natives should focus on ${result.element === 'Fire' ? 'liver and blood pressure' : result.element === 'Water' ? 'kidneys and emotional balance' : result.element === 'Earth' ? 'bones and digestion' : 'respiratory system'}.`, color: 'text-secondary' },
                  ].map((pred, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card rounded-xl p-5 hover:shadow-lg transition-all">
                      <pred.icon className={`w-8 h-8 ${pred.color} mb-3`} />
                      <h3 className="font-heading font-semibold mb-2">{language === 'en' ? pred.title : pred.titleHi}</h3>
                      <p className="text-sm text-muted-foreground">{pred.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* 7. Remedies */}
            <section className="py-8 bg-linear-to-r from-accent/5 to-primary/5">
              <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" /> {language === 'en' ? 'Personalized Remedies' : 'व्यक्तिगत उपाय'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { emoji: '💎', title: `Wear ${result.gem}`, desc: `Strengthens ${result.lord}'s positive influence` },
                    { emoji: '🕉️', title: `Chant ${result.lord} Mantra`, desc: 'Recite 108 times daily for best results' },
                    { emoji: '🙏', title: `${result.element === 'Fire' ? 'Havan' : result.element === 'Water' ? 'Abhishek' : 'Puja'} Ritual`, desc: 'Perform on auspicious days' },
                    { emoji: '🎁', title: 'Charity on Saturday', desc: `Donate ${result.element === 'Fire' ? 'red items' : result.element === 'Water' ? 'white items' : result.element === 'Earth' ? 'green items' : 'blue items'}` },
                  ].map((rem, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="glass-card rounded-xl p-4 flex items-start gap-3">
                      <span className="text-2xl">{rem.emoji}</span>
                      <div>
                        <h4 className="font-semibold text-sm">{rem.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{rem.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. Zodiac Wheel */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading font-bold mb-6 text-center">{language === 'en' ? 'All 12 Rashis' : 'सभी 12 राशियाँ'}</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {rashiData.map((rashi, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.05 }} className={`glass-card rounded-xl p-4 text-center cursor-pointer transition-all ${result?.name === rashi.name ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'}`}>
                <div className="text-3xl mb-1">{rashi.symbol}</div>
                <div className="text-sm font-semibold">{rashi.name}</div>
                <div className="text-xs text-muted-foreground">{rashi.nameHi}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. How Kundli Works */}
      <section className="py-10 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading font-bold mb-8 text-center">{language === 'en' ? 'How It Works' : 'यह कैसे काम करता है'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { step: 1, icon: '📝', title: 'Enter Details', desc: 'Fill in your birth date, time, and place' },
              { step: 2, icon: '🔭', title: 'Calculate Positions', desc: 'AI calculates planetary positions at your birth' },
              { step: 3, icon: '📊', title: 'Generate Chart', desc: 'Complete Lagna and Navamsa charts created' },
              { step: 4, icon: '🔮', title: 'AI Analysis', desc: 'Get personalized predictions and remedies' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center">
                <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center mx-auto mb-3 text-2xl">{s.icon}</div>
                <div className="text-xs font-medium text-primary mb-1">Step {s.step}</div>
                <h3 className="font-heading font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Statistics */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '2.5M+', label: 'Kundlis Generated' },
              { value: '99.2%', label: 'Accuracy Rate' },
              { value: '500+', label: 'Expert Astrologers' },
              { value: '4.9★', label: 'User Rating' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-4">
                <div className="text-2xl md:text-3xl font-heading font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Testimonials */}
      <section className="py-10 bg-linear-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading font-bold mb-6 text-center">{language === 'en' ? 'User Reviews' : 'उपयोगकर्ता समीक्षाएँ'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card rounded-xl p-5">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-accent text-accent" />)}
                </div>
                <p className="text-sm text-muted-foreground italic">"{t.text}"</p>
                <p className="text-sm font-medium mt-3">— {t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FAQ */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-heading font-bold mb-6 text-center">{language === 'en' ? 'Frequently Asked Questions' : 'अक्सर पूछे जाने वाले प्रश्न'}</h2>
          <div className="space-y-3">
            {[
              { q: 'Is the Kundli really free?', a: 'Yes! Our basic kundli generation with AI analysis is completely free. Premium detailed reports are available for a small fee.' },
              { q: 'How accurate is AI Kundli?', a: 'Our AI uses precise astronomical calculations and traditional Vedic astrology principles to deliver 99%+ accuracy in chart generation.' },
              { q: 'Do I need exact birth time?', a: 'While exact birth time gives the most accurate results, our AI can still provide meaningful analysis with approximate timing.' },
              { q: 'Can I get a detailed consultation?', a: 'Yes! After generating your kundli, you can connect with our expert astrologers for in-depth analysis and personalized guidance.' },
            ].map((faq, i) => (
              <motion.details key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass-card rounded-xl p-5 group cursor-pointer">
                <summary className="font-heading font-semibold flex items-center justify-between list-none">
                  {faq.q} <ChevronRight className="w-5 h-5 text-muted-foreground group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-sm text-muted-foreground mt-3">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* 13. CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="cosmic-bg rounded-3xl p-10 text-center text-primary-foreground max-w-3xl mx-auto">
            <Sparkles className="w-10 h-10 mx-auto mb-4 text-accent" />
            <h2 className="text-3xl font-heading font-bold mb-3">{language === 'en' ? 'Need Expert Analysis?' : 'विशेषज्ञ विश्लेषण चाहिए?'}</h2>
            <p className="text-primary-foreground/80 mb-6">{language === 'en' ? 'Get your kundli analyzed by certified Vedic astrologers with 15+ years experience' : 'प्रमाणित वैदिक ज्योतिषियों से अपनी कुंडली का विश्लेषण करवाएं'}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="gradient-gold text-foreground rounded-full" onClick={() => navigate('/astrologers')}>
                {language === 'en' ? 'Consult Astrologer' : 'ज्योतिषी से परामर्श'} <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" onClick={() => { setResult(null); setAiPrediction(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <RefreshCw className="w-5 h-5 mr-2" /> {language === 'en' ? 'Generate Another' : 'दोबारा बनाएं'}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
