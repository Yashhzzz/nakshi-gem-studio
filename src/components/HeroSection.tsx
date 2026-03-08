import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import heroCardRing from '@/assets/hero-card-ring.jpg';
import heroCardNecklace from '@/assets/hero-card-necklace.jpg';
import heroCardBangles from '@/assets/hero-card-bangles.jpg';
import heroCardEarrings from '@/assets/hero-card-earrings.jpg';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], delay },
});

const cardData = [
  { src: heroCardRing, alt: 'Diamond ring on model hand', label: '60 Seconds' },
  { src: heroCardNecklace, alt: 'Gold kundan necklace on model', label: 'AI Model Shot' },
  { src: heroCardBangles, alt: 'Gold bangles on wrist', label: 'Gemstone Swap' },
  { src: heroCardEarrings, alt: 'Diamond earrings', label: 'Batch Ready' },
];

const desktopPos = [
  { x: 0, y: 0, zIndex: 40, overlay: 0, shadow: '0 32px 80px -8px rgba(20,12,4,0.28)' },
  { x: 14, y: 14, zIndex: 30, overlay: 0.15, shadow: '0 24px 60px rgba(20,12,4,0.18)' },
  { x: 28, y: 28, zIndex: 20, overlay: 0.30, shadow: '0 16px 40px rgba(20,12,4,0.12)' },
  { x: 42, y: 42, zIndex: 10, overlay: 0.45, shadow: '0 8px 24px rgba(20,12,4,0.06)' },
];

const mobilePos = [
  { x: 0, y: 0, zIndex: 40, overlay: 0, shadow: '0 20px 50px rgba(20,12,4,0.25)' },
  { x: 8, y: 8, zIndex: 30, overlay: 0.15, shadow: '0 16px 40px rgba(20,12,4,0.18)' },
  { x: 16, y: 16, zIndex: 20, overlay: 0.30, shadow: '0 12px 30px rgba(20,12,4,0.12)' },
  { x: 24, y: 24, zIndex: 10, overlay: 0.45, shadow: '0 6px 16px rgba(20,12,4,0.06)' },
];

const CardStack = ({ positions, cardW, cardH, containerW, containerH }: {
  positions: typeof desktopPos; cardW: number; cardH: number; containerW: number; containerH: number;
}) => {
  const [order, setOrder] = useState([0, 1, 2, 3]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrder(prev => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getPosition = (cardIndex: number) => {
    const slot = order.indexOf(cardIndex);
    return positions[slot];
  };

  return (
    <div className="relative flex-shrink-0" style={{ width: containerW, height: containerH }}>
      {[0, 1, 2, 3].map((cardIndex) => {
        const pos = getPosition(cardIndex);
        return (
          <div
            key={cardIndex}
            className="absolute overflow-hidden transition-all duration-700 ease-out"
            style={{
              width: cardW,
              height: cardH,
              borderRadius: 8,
              top: 0,
              left: 0,
              transform: `translateX(${pos.x}px) translateY(${pos.y}px)`,
              transformOrigin: 'top left',
              zIndex: pos.zIndex,
              pointerEvents: 'none',
              boxShadow: pos.shadow,
            }}
          >
            <img
              src={cardData[cardIndex].src}
              alt={cardData[cardIndex].alt}
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: pos.overlay > 0 ? `rgba(20,12,4,${pos.overlay})` : 'transparent',
                zIndex: 2,
              }}
            />
            <span
              className="absolute bottom-3 left-3 font-body text-[10px] md:text-[11px] font-medium tracking-wider uppercase"
              style={{
                background: 'rgba(255,255,255,0.88)',
                backdropFilter: 'blur(12px)',
                borderRadius: 2,
                padding: '5px 12px',
                color: 'hsl(var(--foreground))',
                zIndex: 3,
                letterSpacing: '0.08em',
              }}
            >
              {cardData[cardIndex].label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="min-h-[88vh] md:min-h-[92vh] bg-background relative overflow-x-clip section-editorial texture-noise">
      {/* Subtle warm gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 60% at 30% 50%, hsl(38 72% 42% / 0.04), transparent)',
      }} />

      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 flex flex-col lg:flex-row items-center py-10 md:py-16 lg:py-0 min-h-[88vh] md:min-h-[92vh] relative z-10">
        {/* Left — Editorial text */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center py-6 md:py-12">
          <motion.div {...fadeUp(0)} className="badge-editorial mb-6 md:mb-8">
            India's First AI Jewelry Photography Bot
          </motion.div>

          <motion.h1
            {...fadeUp(0.12)}
            className="leading-[1.05] md:leading-[1.02]"
            style={{ fontSize: 'clamp(40px, 8.5vw, 96px)' }}
          >
            <span className="font-heading font-light italic text-foreground block">Your Jewelry.</span>
            <span className="font-heading font-semibold text-foreground block" style={{ fontStyle: 'normal' }}>On a Model.</span>
            <span className="font-heading font-light italic block text-gold-shine">In 60 Seconds.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.24)} className="font-body text-[14px] md:text-[16px] text-nakshi-text-body max-w-[440px] mt-6 md:mt-8 leading-[1.7] tracking-[0.01em]">
            Send a photo of any jewelry piece to our WhatsApp bot. Get it back on a professional model — photorealistic, ready to share, ready to sell.
          </motion.p>

          <motion.p {...fadeUp(0.3)} className="font-body text-[13px] md:text-[15px] text-muted-foreground max-w-[440px] mt-3 leading-[1.7]">
            No studio. No photographer. No app. Just WhatsApp.
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8 md:mt-10">
            <a
              href="#waitlist"
              className="inline-block font-body text-[13px] md:text-[14px] font-semibold tracking-wider uppercase bg-foreground text-background px-7 md:px-9 py-3.5 md:py-4 hover:bg-primary hover:text-primary-foreground active:scale-[0.98] transition-all duration-300"
              style={{ borderRadius: 1 }}
            >
              Join the Waitlist — It's Free
            </a>
            <a
              href="#how-it-works"
              className="font-body text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-300 underline underline-offset-4 decoration-border hover:decoration-foreground"
            >
              See how it works →
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.5)} className="flex items-center gap-6 mt-6 md:mt-8">
            {['No credit card', 'WhatsApp only', '60s results'].map((item, i) => (
              <span key={i} className="font-body text-[11px] md:text-[12px] text-muted-foreground tracking-wide">
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right — Card Stack */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
          className="w-full lg:w-[45%] flex justify-center items-center relative mt-8 lg:mt-0"
        >
          <div className="hidden md:flex justify-center">
            <CardStack positions={desktopPos} cardW={280} cardH={380} containerW={330} containerH={440} />
          </div>
          <div className="flex md:hidden justify-center">
            <CardStack positions={mobilePos} cardW={220} cardH={300} containerW={250} containerH={340} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
