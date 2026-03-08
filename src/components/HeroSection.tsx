import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import heroCardRing from '@/assets/hero-card-ring.jpg';
import heroCardNecklace from '@/assets/hero-card-necklace.jpg';
import heroCardBangles from '@/assets/hero-card-bangles.jpg';
import heroCardEarrings from '@/assets/hero-card-earrings.jpg';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' as const, delay },
});

const cardData = [
  { src: heroCardRing, alt: 'Diamond ring on model hand', label: '60 Seconds' },
  { src: heroCardNecklace, alt: 'Gold kundan necklace on model', label: 'AI Model Shot' },
  { src: heroCardBangles, alt: 'Gold bangles on wrist', label: 'Gemstone Swap' },
  { src: heroCardEarrings, alt: 'Diamond earrings', label: 'Batch Ready' },
];

const desktopPos = [
  { x: 0, y: 0, scale: 1, zIndex: 40, overlay: 0, shadow: '0 32px 80px rgba(41,28,14,0.22)' },
  { x: 16, y: 16, scale: 1, zIndex: 30, overlay: 0.12, shadow: '0 24px 60px rgba(41,28,14,0.16)' },
  { x: 32, y: 32, scale: 1, zIndex: 20, overlay: 0.24, shadow: '0 16px 40px rgba(41,28,14,0.10)' },
  { x: 48, y: 48, scale: 1, zIndex: 10, overlay: 0.36, shadow: '0 8px 24px rgba(41,28,14,0.06)' },
];

const mobilePos = [
  { x: 0, y: 0, scale: 1, zIndex: 40, overlay: 0, shadow: '0 20px 50px rgba(41,28,14,0.22)' },
  { x: 8, y: 8, scale: 1, zIndex: 30, overlay: 0.12, shadow: '0 16px 40px rgba(41,28,14,0.16)' },
  { x: 16, y: 16, scale: 1, zIndex: 20, overlay: 0.24, shadow: '0 12px 30px rgba(41,28,14,0.10)' },
  { x: 24, y: 24, scale: 1, zIndex: 10, overlay: 0.36, shadow: '0 6px 16px rgba(41,28,14,0.06)' },
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
    }, 2500);
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
            className="absolute overflow-hidden"
            style={{
              width: cardW,
              height: cardH,
              borderRadius: 12,
              top: 0,
              left: 0,
              transform: `translateX(${pos.x}px) translateY(${pos.y}px) scale(${pos.scale})`,
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
                borderRadius: 12,
                background: pos.overlay > 0 ? `rgba(41,28,14,${pos.overlay})` : 'transparent',
                zIndex: 2,
              }}
            />
            <span
              className="absolute bottom-3 left-3 font-body text-[11px] font-medium"
              style={{
                background: 'rgba(250,249,246,0.92)',
                backdropFilter: 'blur(8px)',
                borderRadius: 4,
                padding: '5px 12px',
                color: '#291C0E',
                zIndex: 3,
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
    <section className="min-h-[85vh] md:min-h-[90vh] bg-background relative overflow-x-clip">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-[60px] flex flex-col lg:flex-row items-center py-8 md:py-16 lg:py-0 min-h-[85vh] md:min-h-[90vh]">
        {/* Left — text content */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center py-6 md:py-12">
          <motion.div {...fadeUp(0)} className="flex items-center gap-2.5 mb-4 md:mb-6">
            <div className="w-8 md:w-10 h-[1px] bg-primary" />
            <span className="font-body text-[11px] md:text-[12px] uppercase tracking-[0.18em] md:tracking-[0.2em] text-primary">
              India's First AI Jewelry Photography Bot
            </span>
          </motion.div>

          <motion.h1 {...fadeUp(0.1)} className="leading-[1.08]" style={{ fontSize: 'clamp(36px, 8vw, 88px)' }}>
            <span className="font-heading font-light italic text-foreground block">Your Jewelry.</span>
            <span className="font-heading font-semibold text-foreground block" style={{ fontStyle: 'normal' }}>On a Model.</span>
            <span className="font-heading font-light italic text-foreground block">In 60 Seconds.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.2)} className="font-body text-[15px] md:text-[17px] text-nakshi-text-body max-w-[480px] mt-4 md:mt-6 leading-relaxed">
            Send a photo of any jewelry piece to our WhatsApp bot. Get it back on a professional model — photorealistic, ready to share, ready to sell.
            <br /><br />
            No studio. No photographer. No app to download. Just WhatsApp.
          </motion.p>

          <motion.div {...fadeUp(0.35)}>
            <a
              href="#waitlist"
              className="inline-block font-body text-[15px] md:text-[16px] font-semibold bg-primary text-primary-foreground px-6 md:px-8 py-3.5 md:py-4 mt-6 md:mt-8 hover:bg-foreground hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              style={{ borderRadius: 2 }}
            >
              Join the Waitlist — It's Free →
            </a>
          </motion.div>

          <motion.p {...fadeUp(0.45)} className="font-body text-[12px] md:text-[13px] text-muted-foreground mt-3 md:mt-4">
            🔒 No credit card &nbsp;·&nbsp; 📱 WhatsApp only &nbsp;·&nbsp; ⚡ 60s results
          </motion.p>
        </div>

        {/* Right — Card Stack */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
          className="w-full lg:w-[45%] flex justify-center items-center relative mt-6 lg:mt-0"
        >
          {/* Desktop */}
          <div className="hidden md:flex justify-center">
            <CardStack positions={desktopPos} cardW={300} cardH={400} containerW={340} containerH={460} />
          </div>
          {/* Mobile — smaller cards */}
          <div className="flex md:hidden justify-center">
            <CardStack positions={mobilePos} cardW={220} cardH={300} containerW={250} containerH={340} />
          </div>
        </motion.div>
      </div>

      {/* Decorative rotating star — hidden on mobile for cleaner look */}
      <div
        className="absolute top-20 right-10 pointer-events-none z-0 hidden md:block"
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
