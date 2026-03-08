import { motion } from 'framer-motion';
import heroNecklaceFlat from '@/assets/hero-necklace-flat.jpg';
import heroNecklaceModel from '@/assets/hero-necklace-model.jpg';
import heroRingModel from '@/assets/hero-ring-model.jpg';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' as const, delay },
});

const HeroSection = () => {
  return (
    <section className="min-h-[90vh] bg-background relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-[60px] flex flex-col lg:flex-row items-center py-16 lg:py-0 min-h-[90vh]">
        {/* Left 55% */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center py-12">
          <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[1px] bg-primary" />
            <span className="font-body text-[12px] uppercase tracking-[0.2em] text-primary">
              India's First AI Jewelry Photography Bot
            </span>
          </motion.div>

          <motion.h1 {...fadeUp(0.1)} className="leading-[1.1]" style={{ fontSize: 'clamp(52px, 7vw, 88px)' }}>
            <span className="font-heading font-light italic text-foreground block">Your Jewelry.</span>
            <span className="font-heading font-semibold text-foreground block">On a Model.</span>
            <span className="font-heading font-light italic text-foreground block">In 60 Seconds.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.2)} className="font-body text-[17px] text-nakshi-text-body max-w-[480px] mt-6 leading-relaxed">
            Send a photo of any jewelry piece to our WhatsApp bot. Get it back on a professional model — photorealistic, ready to share, ready to sell.
            <br /><br />
            No studio. No photographer. No app to download. Just WhatsApp.
          </motion.p>

          <motion.div {...fadeUp(0.35)}>
            <a
              href="#waitlist"
              className="inline-block font-body text-[16px] font-semibold bg-primary text-primary-foreground px-8 py-4 mt-8 hover:bg-foreground hover:scale-[1.02] transition-all duration-200"
              style={{ borderRadius: 2 }}
            >
              Join the Waitlist — It's Free →
            </a>
          </motion.div>

          <motion.p {...fadeUp(0.45)} className="font-body text-[13px] text-muted-foreground mt-4">
            🔒 No credit card required &nbsp;·&nbsp; 📱 WhatsApp only &nbsp;·&nbsp; ⚡ 60-second results
          </motion.p>
        </div>

        {/* Right 45% */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
          className="w-full lg:w-[45%] flex justify-center items-center relative mt-12 lg:mt-0"
        >
          <div className="relative" style={{ width: 360, height: 440 }}>
            {/* Card 1 — Back */}
            <div
              className="absolute overflow-hidden"
              style={{
                width: 280, height: 380, borderRadius: 4,
                transform: 'rotate(-3deg)',
                top: 20, left: 0,
                boxShadow: '0 24px 60px rgba(41,28,14,0.15)',
              }}
            >
              <img src={heroNecklaceFlat} alt="Gold necklace flat lay on marble" className="w-full h-full object-cover" loading="lazy" />
              <span className="absolute bottom-3 left-3 font-body text-[11px] text-muted-foreground bg-background/80 px-2 py-1" style={{ borderRadius: 2 }}>
                Original Photo
              </span>
            </div>

            {/* Card 2 — Middle */}
            <div
              className="absolute overflow-hidden"
              style={{
                width: 280, height: 380, borderRadius: 4,
                transform: 'rotate(1deg)',
                top: 10, left: 40,
                boxShadow: '0 24px 60px rgba(41,28,14,0.15)',
              }}
            >
              <img src={heroNecklaceModel} alt="Same necklace on professional model" className="w-full h-full object-cover" loading="lazy" />
              <span className="absolute bottom-3 left-3 font-body text-[11px] text-muted-foreground bg-background/80 px-2 py-1" style={{ borderRadius: 2 }}>
                AI Model Shot
              </span>
            </div>

            {/* Card 3 — Front */}
            <div
              className="absolute overflow-hidden"
              style={{
                width: 280, height: 380, borderRadius: 4,
                top: 0, left: 80,
                boxShadow: '0 24px 60px rgba(41,28,14,0.15)',
              }}
            >
              <img src={heroRingModel} alt="Diamond ring on model finger" className="w-full h-full object-cover" loading="lazy" />
              <span className="absolute bottom-3 left-3 font-body text-[11px] text-muted-foreground bg-background/80 px-2 py-1" style={{ borderRadius: 2 }}>
                60 Seconds
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative rotating star */}
      <div
        className="absolute top-20 right-10 pointer-events-none"
        style={{ animation: 'star-spin 60s linear infinite', opacity: 0.2 }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path
            d="M60 0L67.3 42.1L100.4 19.6L77.9 52.7L120 60L77.9 67.3L100.4 100.4L67.3 77.9L60 120L52.7 77.9L19.6 100.4L42.1 67.3L0 60L42.1 52.7L19.6 19.6L52.7 42.1L60 0Z"
            fill="#D3A376"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
