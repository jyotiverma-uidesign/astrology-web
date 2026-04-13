import PageTransition from '../components/PageTransition';
import HeroSection from '../components/home/HeroSection';
import BrandPositioningSection from '../components/home/BrandPositioningSection';
import SignatureApproachSection from '../components/home/SignatureApproachSection';
import OfferingsSection from '../components/home/OfferingsSection';
import PricingSection from '../components/home/PricingSection';
import AboutPreviewSection from '../components/home/AboutPreviewSection';

import TestimonialsSection from './../components/home/TestimonialsSection';
import FAQSection from '../components/home/FAQSection';
import FinalCTASection from '../components/home/FinalCTASection';
import VideoSection from '../components/home/VideoSection';

export default function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <BrandPositioningSection />
      <SignatureApproachSection />
      <OfferingsSection />
      <PricingSection />
      <VideoSection/>
    
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
    </PageTransition>
  );
}
