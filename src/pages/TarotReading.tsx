import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/button';
import PageTransition from '../components/PageTransition';
import { tarotCards } from '../data/astrologers';
import { useStore } from '../store/useStore';

type Category = 'love' | 'career' | 'health';
  function shuffleDeck() {
    return [...tarotCards].sort(() => Math.random() - 0.5);
  }
export default function TarotReading() {
  const { language } = useStore();
  const [mode, setMode] = useState<1 | 3>(3);
  const [category, setCategory] = useState<Category>('love');
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [deck, setDeck] = useState(() => shuffleDeck());



  const selectCard = (index: number) => {
    if (flippedCards.has(index) || selectedCards.length >= mode) return;
    setSelectedCards((prev) => [...prev, index]);
    setFlippedCards((prev) => new Set(prev).add(index));
  };

  const reset = () => {
    setSelectedCards([]);
    setFlippedCards(new Set());
    setDeck(shuffleDeck());
  };

  const selected = selectedCards.map((i) => deck[i]);

  return (
    <PageTransition>
      <div className="w-full px-4 py-5">
        <div className="text-center mb-2">
          <h1 className="text-3xl font-heading font-bold mb-2">
            🔮 {language === 'en' ? 'Tarot Card Reading' : 'टैरो कार्ड रीडिंग'}
          </h1>
          <p className="text-muted-foreground">{language === 'en' ? 'Select your cards and reveal your destiny' : 'अपने कार्ड चुनें और अपनी नियति जानें'}</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <div className="flex gap-1 p-1 rounded-lg bg-muted">
            <button onClick={() => { setMode(1); reset(); }} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === 1 ? 'gradient-bg text-primary-foreground' : ''}`}>1 Card</button>
            <button onClick={() => { setMode(3); reset(); }} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === 3 ? 'gradient-bg text-primary-foreground' : ''}`}>3 Cards</button>
          </div>
          <div className="flex gap-1 p-1 rounded-lg bg-muted">
            {(['love', 'career', 'health'] as Category[]).map((c) => (
              <button key={c} onClick={() => setCategory(c)} className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${category === c ? 'gradient-bg text-primary-foreground' : ''}`}>{c}</button>
            ))}
          </div>
        </div>

        {/* Deck */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {deck.slice(0, 8).map((card, i) => {
            const isFlipped = flippedCards.has(i);
            return (
              <motion.div
                key={`${card.id}-${i}`}
                className="cursor-pointer perspective-1000"
                whileHover={!isFlipped ? { y: -8, scale: 1.05 } : {}}
                onClick={() => selectCard(i)}
              >
                <motion.div
                  className="relative w-24 h-36 sm:w-28 sm:h-40"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Back */}
                  <div className="absolute inset-0 rounded-xl cosmic-bg border-2 border-gold/30 flex items-center justify-center backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
                    <div className="text-3xl animate-twinkle">✨</div>
                    <div className="absolute inset-2 rounded-lg border border-gold/20" />
                  </div>
                  {/* Front */}
                  <div className="absolute inset-0 rounded-xl bg-card border-2 border-primary/20 flex flex-col items-center justify-center p-2 shadow-lg" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    <span className="text-3xl mb-1">{card.image}</span>
                    <span className="text-xs font-heading font-semibold text-center leading-tight">{language === 'en' ? card.name : card.nameHi}</span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground mb-6">
          {language === 'en' ? `Select ${mode - selectedCards.length} more card(s)` : `${mode - selectedCards.length} और कार्ड चुनें`}
        </p>

        {/* Results */}
        <AnimatePresence>
          {selectedCards.length === mode && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-heading font-bold text-center gradient-text mb-6">
                {language === 'en' ? 'Your Reading' : 'आपकी रीडिंग'}
              </h2>
              <div className={`grid gap-4 ${mode === 1 ? 'grid-cols-1 max-w-sm mx-auto' : 'grid-cols-1 sm:grid-cols-3'}`}>
                {selected.map((card, i) => (
                  <motion.div key={card.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.2 }} className="glass-card rounded-xl p-5 text-center">
                    <span className="text-4xl block mb-2">{card.image}</span>
                    <h3 className="font-heading font-bold text-lg">{language === 'en' ? card.name : card.nameHi}</h3>
                    {mode === 3 && <p className="text-xs text-muted-foreground mt-1">{['Past', 'Present', 'Future'][i]}</p>}
                    <p className="text-sm text-muted-foreground mt-3">{card.meaning[category]}</p>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-6">
                <Button onClick={reset} className="gradient-bg text-primary-foreground">
                  <RotateCcw className="w-4 h-4 mr-2" /> {language === 'en' ? 'Draw Again' : 'फिर से खींचें'}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
