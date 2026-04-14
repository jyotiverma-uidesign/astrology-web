import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Star, Moon, Sun, Eye, Flame, Heart, Shield, Zap,
  Crown, Gem, Compass, Feather, Leaf, Waves, Wind, RotateCcw,
 ChevronDown, Quote, BookOpen, Users, Wand2,
  MoveRight, CircleDot, Flower2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import "../App.css"
import { useNavigate } from 'react-router-dom';
/* ─────────────────────── TAROT DATA ─────────────────────── */
const MAJOR_ARCANA = [
  { name: 'The Fool', numeral: '0', icon: Feather, meaning: 'New beginnings, innocence, spontaneity, and a free spirit. Trust the journey ahead — leap into the unknown with faith.', reversed: 'Recklessness, fear of the unknown, holding back from growth.', element: 'Air', keywords: ['Beginning', 'Freedom', 'Adventure'] },
  { name: 'The Magician', numeral: 'I', icon: Sparkles, meaning: 'Manifestation, resourcefulness, inspired action. You have everything you need — channel your willpower and make it happen.', reversed: 'Manipulation, untapped talents, poor planning.', element: 'Mercury', keywords: ['Power', 'Skill', 'Action'] },
  { name: 'The High Priestess', numeral: 'II', icon: Moon, meaning: 'Intuition, sacred knowledge, the subconscious mind. Be still and listen to the whispers of your inner wisdom.', reversed: 'Secrets, withdrawal, silence hiding truth.', element: 'Water', keywords: ['Intuition', 'Mystery', 'Wisdom'] },
  { name: 'The Empress', numeral: 'III', icon: Leaf, meaning: 'Femininity, beauty, nature, abundance. Nurture yourself and others — creation flows through compassion and love.', reversed: 'Dependence, smothering, creative block.', element: 'Earth', keywords: ['Abundance', 'Nurture', 'Growth'] },
  { name: 'The Emperor', numeral: 'IV', icon: Crown, meaning: 'Authority, structure, a solid foundation. Take control and establish order — lead with strength and wisdom.', reversed: 'Tyranny, rigidity, loss of control.', element: 'Fire', keywords: ['Authority', 'Structure', 'Control'] },
  { name: 'The Hierophant', numeral: 'V', icon: Shield, meaning: 'Tradition, conformity, spiritual wisdom. Seek knowledge from established teachings and trusted mentors.', reversed: 'Rebellion, subversiveness, new approaches.', element: 'Earth', keywords: ['Tradition', 'Teaching', 'Belief'] },
  { name: 'The Lovers', numeral: 'VI', icon: Heart, meaning: 'Love, harmony, relationships, alignment of values. A choice approaches — follow your heart with clarity and honesty.', reversed: 'Disharmony, imbalance, misalignment of values.', element: 'Air', keywords: ['Love', 'Union', 'Choice'] },
  { name: 'The Chariot', numeral: 'VII', icon: Compass, meaning: 'Determination, willpower, triumph. Harness opposing forces and drive forward — victory is within reach.', reversed: 'Lack of direction, aggression, no control.', element: 'Water', keywords: ['Victory', 'Drive', 'Ambition'] },
  { name: 'Strength', numeral: 'VIII', icon: Flame, meaning: 'Inner strength, courage, patience. True power comes not from force, but from gentleness and compassion.', reversed: 'Self-doubt, weakness, insecurity.', element: 'Fire', keywords: ['Courage', 'Patience', 'Compassion'] },
  { name: 'The Hermit', numeral: 'IX', icon: Eye, meaning: 'Soul-searching, introspection, inner guidance. Retreat from the noise — the answers you seek are within.', reversed: 'Isolation, loneliness, withdrawal.', element: 'Earth', keywords: ['Solitude', 'Search', 'Guidance'] },
  { name: 'Wheel of Fortune', numeral: 'X', icon: Sun, meaning: 'Change, cycles, destiny. The wheel turns — embrace the natural flow of life and trust in divine timing.', reversed: 'Bad luck, resistance to change, breaking cycles.', element: 'Jupiter', keywords: ['Destiny', 'Cycles', 'Luck'] },
  { name: 'Justice', numeral: 'XI', icon: Zap, meaning: 'Fairness, truth, law, cause and effect. Karmic balance is at play — act with integrity and accept what is due.', reversed: 'Unfairness, dishonesty, unaccountability.', element: 'Air', keywords: ['Truth', 'Fairness', 'Karma'] },
  { name: 'The Star', numeral: 'XVII', icon: Star, meaning: 'Hope, faith, renewal, serenity. After the storm comes peace — trust the universe and let healing begin.', reversed: 'Lack of faith, despair, disconnection.', element: 'Air', keywords: ['Hope', 'Renewal', 'Serenity'] },
  { name: 'The Moon', numeral: 'XVIII', icon: Moon, meaning: 'Illusion, fear, subconscious, intuition. Not everything is as it seems — look beyond the surface and trust your instincts.', reversed: 'Release of fear, clarity, truth revealed.', element: 'Water', keywords: ['Illusion', 'Dreams', 'Subconscious'] },
  { name: 'The Sun', numeral: 'XIX', icon: Sun, meaning: 'Positivity, warmth, success, vitality. Radiant joy and achievement shine upon you — celebrate life and share your light.', reversed: 'Temporary sadness, lack of clarity.', element: 'Fire', keywords: ['Joy', 'Success', 'Vitality'] },
  { name: 'The World', numeral: 'XXI', icon: Gem, meaning: 'Completion, accomplishment, wholeness, travel. A cycle ends and fulfillment is yours — the world opens its arms to you.', reversed: 'Incompletion, stagnation, lack of closure.', element: 'Earth', keywords: ['Completion', 'Harmony', 'Achievement'] },
  { name: 'The Tower', numeral: 'XVI', icon: Zap, meaning: 'Sudden upheaval, revelation, awakening. Structures crumble to make way for truth — transformation through disruption.', reversed: 'Avoidance of disaster, fear of change.', element: 'Mars', keywords: ['Upheaval', 'Awakening', 'Change'] },
  { name: 'Temperance', numeral: 'XIV', icon: Waves, meaning: 'Balance, moderation, patience, purpose. Blend opposing forces into harmony — walk the middle path with grace.', reversed: 'Imbalance, excess, lack of long-term vision.', element: 'Fire', keywords: ['Balance', 'Patience', 'Harmony'] },
  { name: 'Death', numeral: 'XIII', icon: Wind, meaning: 'Endings, transformation, transition. Let go of the old to embrace the new — death is rebirth in disguise.', reversed: 'Resistance to change, stagnation, decay.', element: 'Water', keywords: ['Transformation', 'Endings', 'Rebirth'] },
  { name: 'The Devil', numeral: 'XV', icon: Flame, meaning: 'Bondage, materialism, shadow self. Recognize the chains you\'ve placed upon yourself — freedom awaits your awareness.', reversed: 'Release, breaking free, reclaiming power.', element: 'Earth', keywords: ['Shadow', 'Bondage', 'Temptation'] },
];

const TESTIMONIALS = [
  { name: 'Priya M.', text: 'The reading was incredibly accurate. It gave me the clarity I needed during a confusing phase of my life. Truly grateful.', rating: 5 },
  { name: 'Arjun K.', text: 'I was skeptical at first, but the tarot card pulled was exactly what I was going through. The interpretation felt deeply personal.', rating: 5 },
  { name: 'Sneha R.', text: 'Beautiful experience! The cosmic energy and the detailed reading made me reflect on things I had been ignoring. Highly recommend.', rating: 5 },
  { name: 'Rohan D.', text: 'The Past-Present-Future spread opened my eyes to patterns I didn\'t realize existed. Such a profound tool for self-discovery.', rating: 5 },
];

const HOW_IT_WORKS = [
  { step: '01', icon: Flower2, title: 'Set Your Intention', desc: 'Focus your mind on a question or area of life you seek guidance about.' },
  { step: '02', icon: Wand2, title: 'Choose Your Spread', desc: 'Select a single card, three-card, or five-card spread based on your needs.' },
  { step: '03', icon: CircleDot, title: 'Reveal the Cards', desc: 'Click to flip each card and unveil the cosmic messages waiting for you.' },
  { step: '04', icon: BookOpen, title: 'Read Your Guidance', desc: 'Receive detailed interpretations with keywords, elements, and meaning.' },
];

interface DrawnCard {
  card: typeof MAJOR_ARCANA[number];
  isReversed: boolean;
  position: string;
}

const spreadInfo = {
  single: { count: 1, label: 'Single Card', positions: ['Your Message'], desc: 'Quick clarity on one question' },
  three: { count: 3, label: 'Past · Present · Future', positions: ['Past', 'Present', 'Future'], desc: 'Understand your timeline' },
  celtic: { count: 5, label: 'Celtic Cross', positions: ['Present', 'Challenge', 'Foundation', 'Crown', 'Outcome'], desc: 'Deep multi-layered insight' },
};

/* ─────────────────────── CARD BACK SVG ─────────────────────── */
function CardBackPattern() {
  return (
    <svg viewBox="0 0 200 300" className="w-full h-full  m ">
      <defs>
        <radialGradient id="cbg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(270,45%,40%)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="hsl(40,30%,93%)" stopOpacity="1" />
        </radialGradient>
        <linearGradient id="cbgold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(35,70%,52%)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(270,45%,40%)" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <rect width="200" height="300" rx="12" fill="url(#cbg)" />
      <rect x="10" y="10" width="180" height="280" rx="8" fill="none" stroke="url(#cbgold)" strokeWidth="1" opacity="0.5" />
      <circle cx="100" cy="150" r="50" fill="none" stroke="hsl(35,70%,52%)" strokeWidth="0.7" opacity="0.35" />
      <circle cx="100" cy="150" r="35" fill="none" stroke="hsl(270,45%,40%)" strokeWidth="0.5" opacity="0.25" />
      <circle cx="100" cy="150" r="65" fill="none" stroke="hsl(35,70%,52%)" strokeWidth="0.3" opacity="0.2" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line key={deg} x1="100" y1="150" x2={100 + Math.cos((deg * Math.PI) / 180) * 48} y2={150 + Math.sin((deg * Math.PI) / 180) * 48} stroke="hsl(35,70%,52%)" strokeWidth="0.4" opacity="0.25" />
      ))}
      <text x="100" y="42" textAnchor="middle" fill="hsl(270,45%,40%)" fontSize="14" fontFamily="serif" opacity="0.3">✦</text>
      <text x="100" y="268" textAnchor="middle" fill="hsl(270,45%,40%)" fontSize="14" fontFamily="serif" opacity="0.3">✦</text>
    </svg>
  );
}

/* ─────────────────────── SECTION HEADER ─────────────────────── */
function SectionHeader({ subtitle, title, description }: { subtitle: string; title: string; description?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-6 md:mb-8"   // ⬅️ FIXED (was mb-14)
    >
      {subtitle && (
        <span className="text-sm tracking-[0.3em] uppercase font-body text-mystic-light">
          {subtitle}
        </span>
      )}

      <h2 className="text-2xl md:text-4xl font-heading mt-2 mb-2 gradient-text leading-tight">
        {title}
      </h2>

      {description && (
        <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}

      {/* ⬇️ this line was creating extra visual gap, make it smaller */}
      <div className="w-16 h-px bg-linear-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
    </motion.div>
  );
}

/* ─────────────────────── MAIN PAGE ─────────────────────── */
export default function Index() {
  const [showReading, setShowReading] = useState(false);
  const [drawn, setDrawn] = useState<DrawnCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [selectedSpread, setSelectedSpread] = useState<'single' | 'three' | 'celtic'>('three');
  const [allRevealed, setAllRevealed] = useState(false);
  const [question, setQuestion] = useState('');
  const readingRef = useRef<HTMLDivElement>(null);

  const shuffleAndDraw = useCallback(() => {
    const shuffled = [...MAJOR_ARCANA].sort(() => Math.random() - 0.5);
    const info = spreadInfo[selectedSpread];
    const cards: DrawnCard[] = shuffled.slice(0, info.count).map((card, i) => ({
      card, isReversed: Math.random() > 0.7, position: info.positions[i],
    }));
    setDrawn(cards);
    setFlippedCards(new Set());
    setAllRevealed(false);
    setShowReading(true);
    setTimeout(() => readingRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  }, [selectedSpread]);
  const navigate = useNavigate();
  const handleSubmit = () => {
  if (!question.trim()) return;

  // message show
alert("Your question has been submitted successfully. You will receive a response shortly.");

  // redirect to contact page
  navigate("/contact");
};
  const flipCard = (index: number) => {
    setFlippedCards((prev) => {
      const next = new Set(prev);
      next.add(index);
      if (next.size === drawn.length) setTimeout(() => setAllRevealed(true), 600);
      return next;
    });
  };


  const revealAll = () => {
    const all = new Set<number>();
    drawn.forEach((_, i) => all.add(i));
    setFlippedCards(all);
    setTimeout(() => setAllRevealed(true), 600);
  };

  const resetReading = () => {
    setShowReading(false);
    setDrawn([]);
    setFlippedCards(new Set());
    setAllRevealed(false);
    setQuestion('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Daily card (deterministic by date)
  const today = new Date();
  const dayIndex = (today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate()) % MAJOR_ARCANA.length;
  const dailyCard = MAJOR_ARCANA[dayIndex];
  const DailyIcon = dailyCard.icon;

  return (
<div className="min-h-screen bg-background w-full overflow-x-hidden">
        {/* ═══════════ SECTION 1: HERO ═══════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-warm">
        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {[
            { x: '10%', y: '20%', delay: 0 }, { x: '85%', y: '15%', delay: 0.5 },
            { x: '75%', y: '70%', delay: 1 }, { x: '15%', y: '75%', delay: 1.5 },
            { x: '50%', y: '10%', delay: 0.8 }, { x: '90%', y: '45%', delay: 1.2 },
          ].map((p, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: p.x, top: p.y }}
              animate={{ y: [0, -12, 0], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 4, repeat: Infinity, delay: p.delay }}
            >
              <Star className="w-4 h-4 text-gold" />
            </motion.div>
          ))}
        </div>

        {/* Decorative circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <motion.div
            className="w-125 h-125 rounded-full border border-gold/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-8 rounded-full border border-mystic/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="relative z-20 text-center px-4 w-full">
          {/* Mystic eye orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative w-32 h-32 mx-auto mb-10"
          >
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-mystic/15 to-gold/10 blur-2xl" />
            <div className="absolute inset-2 rounded-full bg-linear-to-br from-mystic-soft to-card mystic-border flex items-center justify-center">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                <Eye className="w-12 h-12 text-mystic" />
              </motion.div>
            </div>
            {[0, 72, 144, 216, 288].map((deg) => (
              <motion.div
                key={deg}
                className="absolute w-2.5 h-2.5 rounded-full bg-gold/40"
                style={{
                  left: '50%', top: '50%',
                  transform: `rotate(${deg}deg) translateY(-58px) translateX(-50%)`,
                }}
                animate={{ opacity: [0.2, 0.7, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: deg / 400 }}
              />
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading gradient-text leading-tight mb-6">
              Mystic Tarot
            </h1>
            <p className="text-xl md:text-2xl font-body text-muted-foreground mb-4 w-full px-4 leading-relaxed">
              Unveil the whispers of the cosmos. Let ancient cards illuminate your path through shadow and light.
            </p>
            <p className="text-sm font-body text-mystic-light tracking-widest uppercase mb-10">
              Guidance · Clarity · Reflection
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <a href="#reading">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-lg rounded-2xl font-heading glow-mystic transition-all duration-500 hover:scale-105">
                <Sparkles className="w-5 h-5 mr-2" />
                Begin Your Reading
              </Button>
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-20">
            <ChevronDown className="w-6 h-6 text-muted-foreground mx-auto animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SECTION 2: HOW IT WORKS ═══════════ */}
     <section className="py-0 section-mystic">
  <div className="max-w-6xl mx-auto px-4">
    <SectionHeader
      subtitle=""
      title="How It Works"
      description="A sacred four-step journey from intention to illumination"
      
    />

    <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {HOW_IT_WORKS.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="text-center group bg-[#e1c8ba] rounded-xl p-4 "
        >
          <div className="relative mx-auto w-16 h-16 mb-2 font-semibold">
            <div className="absolute inset-0 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition duration-300 rotate-6" />

            <div className="relative w-full h-full rounded-xl bg-card mystic-border flex items-center justify-center group-hover:glow-mystic transition duration-300">
              <item.icon className="w-6 h-6 text-mystic group-hover:text-primary transition-colors" />
            </div>
          </div>

          <h3 className="text-md font-mono font-heading text-foreground mb-1">
            {item.title}
          </h3>

          <p className="text-sm text-muted-foreground leading-snug">
            {item.desc}
          </p>

          {i < HOW_IT_WORKS.length - 1 && (
            <MoveRight className="w-4 h-4 text-gold/30 mx-auto mt-3 hidden lg:block" />
          )}
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* ═══════════ SECTION 3: INTERACTIVE READING ═══════════ */}
      <section id="reading" ref={readingRef} className="py-5 section-warm">
        <div className="w-full px-4">
          <SectionHeader subtitle=''
           
            title="Interactive Tarot Reading"
            description="Choose your spread, focus your intention, and let the cards speak"
          />

          {!showReading ? (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full">
              {/* Question */}
              <div className="mb-8 flex justify-center">
<div className="w-full max-w-xl">
  <label className="block text-center text-sm text-mystic-light mb-2 font-body tracking-wide">
    Focus your intention (optional)
  </label>

  <div className="relative">
    <input
  type="text"
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }}
  placeholder="What does the universe want me to know?"
  className="w-full bg-blue-50 mystic-border text-sm rounded-xl px-5 py-4 pr-20 text-foreground 
  placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-sm 
  placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 font-body"
/>
    {/* Send Button */}
    <button
      onClick={handleSubmit}
      className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2  rounded-lg bg-purple-300  text-white text-sm font-medium hover:scale-105 transition-all duration-300"
    >
      Send
    </button>
  </div>
</div>
</div>

              {/* Spread selection */}
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6 w-fit mx-auto">
  {(['single', 'three', 'celtic'] as const).map((s) => (
    <button
      key={s}
      onClick={() => setSelectedSpread(s)}
      className={`w-52 p-3 rounded-lg text-center  border border-black transition-all duration-300 ${
        selectedSpread === s
          ? 'bg-primary/10 ring-2 ring-primary/30'
          : 'bg-card hover:bg-primary/5'
      }`}
    >
      <div className="flex justify-center gap-1 mb-1">
        {Array.from({ length: spreadInfo[s].count }).map((_, j) => (
          <div
            key={j}
            className={`w-3.5 h-5 rounded-sm ${
              selectedSpread === s
                ? 'bg-primary/30'
                : 'bg-muted-foreground/15'
            }`}
          />
        ))}
      </div>

      <p className=" font-heading">
        {spreadInfo[s].label}
      </p>

      <p className="text-[10px] text-muted-foreground mt-0.5">
        {spreadInfo[s].desc}
      </p>
    </button>
  ))}
</div>

              <div className="text-center">
                <Button onClick={shuffleAndDraw} className="bg-[#3783A1] text-white hover:bg-primary/90 px-10 py-6 text-lg rounded-2xl font-heading  hover:scale-105 transition-all duration-500" size="lg">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Shuffle & Draw
                </Button>
              </div>
            </motion.div>
          ) : (
            /* ── Card Display ── */
            <div>
              <div className="text-center mb-6">
                <h3 className="text-xl md:text-2xl font-heading gradient-text">{spreadInfo[selectedSpread].label}</h3>
                {question && <p className="text-muted-foreground italic font-body text-lg mt-2">"{question}"</p>}
                <p className="text-mystic-light text-sm mt-3 font-body">
                  {flippedCards.size < drawn.length ? 'Click each card to reveal its message' : 'All cards revealed ✦'}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-6 md:gap-8 w-full px-4 mb-8">
                {drawn.map((d, i) => {
                  const isFlipped = flippedCards.has(i);
                  const Icon = d.card.icon;
                  return (
                    <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 + 0.3 }} className="flex flex-col items-center gap-3">
                      <span className="text-xs text-mystic-light font-body uppercase tracking-[0.2em]">{d.position}</span>
                      <div onClick={() => !isFlipped && flipCard(i)} className="relative w-36 h-56 md:w-44 md:h-64 cursor-pointer group" style={{ perspective: '1000px' }}>
                        <motion.div animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 0.6, ease: 'easeInOut' }} style={{ transformStyle: 'preserve-3d' }} className="relative w-full h-full">
                          {/* Back */}
                          <div className="absolute inset-0 rounded-2xl overflow-hidden mystic-border group-hover:glow-gold transition-shadow duration-500 bg-card" style={{ backfaceVisibility: 'hidden' }}>
                            <CardBackPattern />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}>
                                <Star className="w-7 h-7 text-gold/25" />
                              </motion.div>
                            </div>
                          </div>
                          {/* Front */}
                          <div
                        className="absolute inset-0 rounded-2xl bg-[#e1c8ba] mystic-border p-4 flex flex-col items-center justify-between"
                            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                          >
                            <span className="text-mystic-light text-xs font-heading">{d.card.numeral}</span>
                            <div className="flex-1 flex items-center justify-center">
                              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center glow-mystic">
                                <Icon className="w-8 h-8 text-primary" />
                              </div>
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-heading text-foreground leading-tight">{d.card.name}</p>
                              {d.isReversed && <span className="text-[10px] text-accent font-body">(Reversed)</span>}
                            </div>
                            <div className="flex gap-1 mt-1">
                              {d.card.keywords.map((k) => (
                                <span key={k} className="text-[8px] px-1.5 py-0.5 rounded-full bg-primary/10 text-mystic-light">{k}</span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex justify-center gap-4 mb-5">
                {flippedCards.size < drawn.length && (
                  <Button onClick={revealAll} variant="outline" className="mystic-border text-primary hover:bg-primary/5">Reveal All</Button>
                )}
                <Button onClick={resetReading} variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <RotateCcw className="w-4 h-4 mr-2" /> New Reading
                </Button>
              </div>

              {/* Detailed Reading */}
              <AnimatePresence>
                {allRevealed && (
                  <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                      <h3 className="text-2xl md:text-3xl font-heading shimmer-text mb-2">Your Reading</h3>
                      <div className="w-24 h-px bg-linear-to-r from-transparent via-gold to-transparent mx-auto" />
                    </div>
                    {drawn.map((d, i) => {
                      const Icon = d.card.icon;
                      return (
                        <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }} className="mb-6 p-6 md:p-8 rounded-2xl bg-card mystic-border">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs text-mystic-light font-body uppercase tracking-widest mb-1">{d.position}</p>
                              <h4 className="text-xl font-heading text-foreground">
                                {d.card.name} <span className="text-gold/50 text-sm">{d.card.numeral}</span>
                                {d.isReversed && <span className="text-accent text-sm ml-2">(Reversed)</span>}
                              </h4>
                            </div>
                          </div>
                          <p className="text-foreground/80 font-body text-base leading-relaxed mb-3">
                            {d.isReversed ? d.card.reversed : d.card.meaning}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-mystic">{d.card.element}</span>
                            {d.card.keywords.map((k) => (
                              <span key={k} className="text-xs px-2 py-1 rounded-full bg-gold/10 text-gold-dim">{k}</span>
                            ))}
                          </div>
                        </motion.div>
                      );
                    })}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: drawn.length * 0.2 + 0.5 }} className="text-center p-8 rounded-2xl bg-linear-to-b from-mystic-soft to-card mystic-border mb-8">
                      <Sparkles className="w-8 h-8 text-gold mx-auto mb-4" />
                      <p className="text-muted-foreground font-body text-lg italic leading-relaxed max-w-lg mx-auto">
                        "The cards have spoken. Carry their wisdom gently, and let the cosmic tapestry guide your next step with grace and intention."
                      </p>
                      <div className="mt-6">
                        <Button onClick={resetReading} className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-5 rounded-2xl font-heading glow-mystic">
                          <RotateCcw className="w-4 h-4 mr-2" /> Draw Again
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════ SECTION 4: CARD GALLERY ═══════════ */}
   <section className="py-2 section-mystic">
  <div className="max-w-6xl mx-auto px-4">
    <SectionHeader
      subtitle=""
      title="Major Arcana Cards"
      description="Explore the 20 cards of the Major Arcana — each carrying profound cosmic significance"
    />

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {MAJOR_ARCANA.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -6, scale: 1.03 }}
            className="p-3 rounded-lg bg-[#FAEDED] mystic-border text-center cursor-default hover:glow-mystic transition-all duration-300 group"
          >
            <div className="w-9 h-9 rounded-full bg-primary/8 flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/15 transition-colors">
              <Icon className="w-4 h-4 text-primary font-bold" />
            </div>

            <p className="text-sm font-normal font-heading text-foreground leading-tight">
              {card.name}
            </p>

            <span className="text-[12px] text-muted-foreground">
              {card.numeral} · {card.element}
            </span>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>

      {/* ═══════════ SECTION 5: DAILY CARD ═══════════ */}
      <section className="py-5 section-rose">
        <div className="w-full px-4">
          <SectionHeader subtitle=''  title="Today's Card" description={`${today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}`} />
          <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="w-full"
>
  <div className="relative max-w-3xl mx-auto p-2 md:p-10 rounded-3xl bg-card mystic-border glow-gold overflow-hidden">
    
    <div className="absolute top-4 right-4 opacity-5">
      <DailyIcon className="w-40 h-40 text-primary" />
    </div>

    <div className="relative flex flex-col md:flex-row items-center gap-6">
      
      <div className="w-20 h-20 rounded-xl bg-linear-to-br from-primary/15 to-gold/10 mystic-border flex items-center justify-center shrink-0">
        <DailyIcon className="w-10 h-10 text-primary" />
      </div>

      <div className="text-center md:text-left">
        <span className="text-xs tracking-[0.3em] uppercase text-gold-dim font-body">
          {dailyCard.numeral} · {dailyCard.element}
        </span>

        <h3 className="text-xl md:text-2xl font-heading mt-1 mb-2">
          {dailyCard.name}
        </h3>

        <p className="text-md leading-relaxed mb-3">
          {dailyCard.meaning}
        </p>

        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {dailyCard.keywords.map((k) => (
            <span key={k} className="text-sm px-2 py-1 rounded-full bg-primary/10">
              {k}
            </span>
          ))}
        </div>
      </div>

    </div>
  </div>
</motion.div>
        </div>
      </section>

      {/* ═══════════ SECTION 6: TESTIMONIALS ═══════════ */}
     <section className="py-5 section-warm">
  <div className="max-w-6xl mx-auto px-4">
    <SectionHeader
      subtitle=""
      title="What Seekers Say"
      description="Real experiences from those who walked the mystical path"
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  gap-4">
      {TESTIMONIALS.map((t, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="p-4 rounded-xl bg-amber-50 mystic-border border border-gray-300 hover:glow-mystic transition-all duration-300"
        >
          <Quote className="w-5 h-5 text-gold/30 mb-2" />

          <p className="text-foreground/80 text-md leading-relaxed mb-3 italic line-clamp-3">
            "{t.text}"
          </p>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-3 h-3 text-primary" />
            </div>

            <div>
              <p className="text-xs font-heading text-foreground">
                {t.name}
              </p>

              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3 h-3 text-gold fill-gold" />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* ═══════════ SECTION 7: FOOTER ═══════════ */}
      <footer className="py-5 bg-linear-to-b from-card to-background">
        <div className="w-full px-4">
          <div className="text-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-heading font-bold gradient-text">Mystic Tarot</h3>
              </div>
              <p className="text-muted-foreground font-body text-base max-w-md mx-auto mb-6 leading-relaxed">
                The cards are a mirror — they reflect the truths you already hold within. Use them wisely, with open heart and grounded spirit.
              </p>
              <div className="flex justify-center gap-6 mb-8">
                {['Numerology', 'Vedic', 'Tarot', 'Crystal', 'Meditation'].map((item) => (
                  <span key={item} className="text-xs font-body text-muted-foreground hover:text-primary transition-colors cursor-default">{item}</span>
                ))}
              </div>
              <div className="w-16 h-px bg-linear-to-r from-transparent via-gold/30 to-transparent mx-auto mb-6" />
              <p className="text-xs text-muted-foreground/60 font-body">
                © {today.getFullYear()} Mystic Tarot · For entertainment and spiritual reflection
              </p>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
