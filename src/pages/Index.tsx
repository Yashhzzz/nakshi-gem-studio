import { useEffect } from 'react';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SocialProofMarquee from '@/components/SocialProofMarquee';
import ProblemSection from '@/components/ProblemSection';
import HowItWorks from '@/components/HowItWorks';
import FeaturesGrid from '@/components/FeaturesGrid';
import ComparisonTable from '@/components/ComparisonTable';
import PricingTeaser from '@/components/PricingTeaser';
import ReferralTeaser from '@/components/ReferralTeaser';
import CountdownWaitlist from '@/components/CountdownWaitlist';
import FooterCTA from '@/components/FooterCTA';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { trackEvent } from '@/hooks/useTrackEvent';

const Index = () => {
  useEffect(() => {
    trackEvent('page_view');
    // Track referral detection
    const params = new URLSearchParams(window.location.search);
    if (params.get('ref')) {
      trackEvent('referral_detected', { code: params.get('ref') });
    }
  }, []);

  return (
    <>
      <AnnouncementBanner />
      <Navbar />
      <ScrollProgress />
      <main>
        <HeroSection />
        <SocialProofMarquee />
        <ProblemSection />
        <HowItWorks />
        <FeaturesGrid />
        <ComparisonTable />
        <PricingTeaser />
        <ReferralTeaser />
        <CountdownWaitlist />
        <FooterCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
};

export default Index;
