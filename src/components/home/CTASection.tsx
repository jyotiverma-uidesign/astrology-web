import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { useStore } from '../../store/useStore';

export default function CTASection() {
  const navigate = useNavigate();
  const { language } = useStore();

  return (
    <section className="py-16 bg-[#00586b]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          {language === 'en' ? 'Begin Your Spiritual Journey with Tulika Devi' : 'तुलिका देवी के साथ अपनी आध्यात्मिक यात्रा शुरू करें'}
        </h2>
        <p className="text-lg opacity-80 mb-8 max-w-md mx-auto">
          {language === 'en' ? 'First consultation is free. Get personalized guidance today.' : 'पहला परामर्श मुफ्त है। आज ही व्यक्तिगत मार्गदर्शन प्राप्त करें।'}
        </p>
        <Button size="lg" className="gradient-gold text-accent-foreground text-base px-10 font-semibold" onClick={() => navigate('/astrologers')}>
          {language === 'en' ? 'Get Started Free' : 'मुफ्त शुरू करें'} ✨
        </Button>
      </div>
    </section>
  );
}
