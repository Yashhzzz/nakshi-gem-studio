import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const cards = [
  {
    stat: '₹15K–50K',
    title: 'Per Shoot',
    body: 'A single professional studio shoot. Most jewelers afford this once a quarter — not every week when new stock arrives.',
    accent: 'hsl(var(--primary))',
  },
  {
    stat: '2–5 Days',
    title: 'Turnaround',
    body: 'The wait between sending your jewelry to a photographer and getting edited photos back. By then, your customer has moved on.',
    accent: 'hsl(var(--nakshi-gold-light))',
  },
  {
    stat: '0%',
    title: 'Control',
    body: 'Coordinating models, makeup, lighting, reshoots. For a jeweler running a business solo, this is a full-time job.',
    accent: 'hsl(var(--destructive))',
  },
];

const ProblemSection = () => {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-background py-[72px] md:py-[140px] section-editorial texture-noise">
      {/* Subtle radial accent */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 40% at 70% 30%, hsl(var(--primary) / 0.03), transparent)',
      }} />

      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 relative z-10">
        {/* Editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="badge-editorial justify-center mb-5">The Problem</p>
          <h2 className="font-heading text-[clamp(32px,6vw,60px)] font-light text-foreground mb-4">
            Studio Shoots Are <em className="font-semibold not-italic">Killing</em> Your Margins
          </h2>
          <div className="editorial-divider max-w-[320px] mx-auto mt-6">
            <span className="text-primary/50 text-[10px]">✦</span>
          </div>
        </motion.div>

        {/* Mobile: Horizontal swipe cards */}
        <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 scrollbar-hide">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setActiveCard(i)}
              className="snap-center flex-shrink-0 w-[280px]"
            >
              <div
                className="card-luxury p-6 h-full flex flex-col"
                style={{
                  borderRadius: 6,
                  borderColor: activeCard === i ? `${card.accent}` : undefined,
                }}
              >
                <div className="font-heading font-semibold leading-none text-[36px] mb-1" style={{ color: card.accent }}>
                  {card.stat}
                </div>
                <p className="font-body text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-4">
                  {card.title}
                </p>
                <div className="h-[1px] w-8 mb-4" style={{ background: card.accent, opacity: 0.4 }} />
                <p className="font-body text-[13px] text-nakshi-text-body leading-relaxed flex-1">
                  {card.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile indicator */}
        <div className="md:hidden flex justify-center gap-2 mt-5">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="h-1 rounded-full"
              style={{ background: card.accent }}
              animate={{ width: activeCard === i ? 28 : 6, opacity: activeCard === i ? 1 : 0.25 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Desktop: Grid with editorial treatment */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const isActive = activeCard === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true, margin: '-80px' }}
                onHoverStart={() => setActiveCard(i)}
                className="card-luxury p-10 flex flex-col cursor-default"
                style={{
                  borderRadius: 6,
                  borderColor: isActive ? card.accent : undefined,
                  transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                <motion.div
                  className="font-heading font-semibold leading-none mb-2"
                  style={{ fontSize: 'clamp(48px, 5vw, 64px)', color: card.accent }}
                  animate={{ scale: isActive ? 1.03 : 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {card.stat}
                </motion.div>
                <p className="font-body text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-6">
                  {card.title}
                </p>
                <motion.div
                  className="h-[1px] mb-6 rounded-full"
                  style={{ background: card.accent }}
                  animate={{ width: isActive ? '40%' : '24px', opacity: isActive ? 0.6 : 0.25 }}
                  transition={{ duration: 0.5 }}
                />
                <p className="font-body text-[14px] text-nakshi-text-body leading-[1.75] flex-1">
                  {card.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* "Until now" with editorial treatment */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-20 md:mt-28"
        >
          <div className="editorial-divider max-w-[200px] mx-auto mb-6">
            <span className="text-primary/40 text-[8px]">✦</span>
          </div>
          <motion.p
            className="font-heading italic text-[clamp(32px,7vw,56px)] font-light text-gold-shine"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            Until now.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
