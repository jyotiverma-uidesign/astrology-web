import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import AstrologerCard from '../AstrologerCard';
import { astrologers } from '../../data/astrologers';
import { useStore } from '../../store/useStore';

export default function FeaturedAstrologers() {
  const navigate = useNavigate();
  const { language } = useStore();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-heading font-bold">
            {language === 'en' ? 'Top Astrologers' : 'शीर्ष ज्योतिषी'}
          </h2>
          <Button variant="ghost" onClick={() => navigate('/astrologers')}>
            {language === 'en' ? 'View All' : 'सभी देखें'} <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {astrologers.slice(0, 6).map((a, i) => (
            <AstrologerCard key={a.id} astrologer={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
