import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cards = [
  {
    icon: '₹',
    stat: '₹15K–50K',
    title: 'Per Shoot',
    body: 'The cost of a single professional studio shoot. Most jewelers can afford this once a quarter — not every week when new stock arrives.',
    accent: 'hsl(var(--primary))',
  },
  {
    icon: '⏱',
    stat: '2–5',
    title: 'Days Wasted',
    body: 'The wait between sending your jewelry to a photographer and getting edited photos back. By then, your customer has moved on.',
    accent: 'hsl(var(--nakshi-gold-light))',
  },
  {
    icon: '😤',
    stat: '0%',
    title: 'Control',
    body: 'Coordinating models, makeup, lighting, reshoots. For a jeweler running a business solo, this is a full-time job in itself.',
    accent: 'hsl(var(--destructive))',
  },
];

const CountUp = ({ target, suffix = '' }: { target: string; suffix?: string }) => {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    // Extract numeric part
    const numMatch = target.match(/[\d]+/);
    if (!numMatch) {
      setDisplayed(target);
      return;
    }
    const num = parseInt(numMatch[0]);
    const prefix = target.slice(0, target.indexOf(numMatch[0]));
    const rest = target.slice(target.indexOf(numMatch[0]) + numMatch[0].length);
    let current = 0;
    const step = Math.max(1, Math.floor(num / 30));
    const interval = setInterval(() => {
      current = Math.min(current + step, num);
      setDisplayed(`${prefix}${current}${rest}${suffix}`);
      if (current >= num) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [started, target, suffix]);

  return (
    <motion.span
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true, margin: '-100px' }}
    >
      {displayed || `${target}${suffix}`}
    </motion.span>
  );
};

const ProblemSection = () => {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-secondary py-[80px] md:py-[120px] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-[60px]">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: '-60px' }}
          className="font-body text-[12px] uppercase tracking-[0.2em] text-primary text-center mb-4"
        >
          ✦&nbsp; THE PROBLEM &nbsp;✦
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, margin: '-60px' }}
          className="font-heading text-[clamp(36px,5vw,52px)] font-semibold text-foreground text-center mb-6"
        >
          Studio Shoots Are Killing Your Margins.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true, margin: '-60px' }}
          className="font-body text-[15px] text-muted-foreground text-center max-w-[560px] mx-auto mb-16"
        >
          Every jeweler faces the same brutal trifecta. Here's what you're really paying for traditional photography.
        </motion.p>

        {/* Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card, i) => {
            const isActive = activeCard === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                viewport={{ once: true, margin: '-60px' }}
                onHoverStart={() => setActiveCard(i)}
                className="relative group cursor-default"
              >
                {/* Glow effect behind active card */}
                <motion.div
                  className="absolute -inset-[1px] rounded-lg opacity-0 pointer-events-none"
                  animate={{
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                  style={{
                    background: `linear-gradient(135deg, ${card.accent}22, transparent, ${card.accent}11)`,
                    borderRadius: 8,
                  }}
                />

                <div
                  className="relative bg-background border border-border p-8 md:p-10 transition-all duration-300 h-full flex flex-col"
                  style={{
                    borderRadius: 8,
                    borderColor: isActive ? `${card.accent}` : undefined,
                    boxShadow: isActive
                      ? `0 20px 60px -12px ${card.accent}20, 0 0 0 1px ${card.accent}30`
                      : '0 2px 8px rgba(41,28,14,0.04)',
                    transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
                  }}
                >
                  {/* Big stat number */}
                  <div className="mb-6">
                    <motion.div
                      className="font-heading font-bold leading-none"
                      style={{
                        fontSize: 'clamp(48px, 6vw, 64px)',
                        color: card.accent,
                      }}
                      animate={{
                        scale: isActive ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {card.stat}
                    </motion.div>
                    <p className="font-body text-[13px] uppercase tracking-[0.15em] text-muted-foreground mt-1">
                      {card.title}
                    </p>
                  </div>

                  {/* Animated divider */}
                  <motion.div
                    className="h-[2px] mb-5 rounded-full"
                    style={{ background: card.accent }}
                    animate={{
                      width: isActive ? '60%' : '24px',
                      opacity: isActive ? 0.8 : 0.3,
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />

                  <p className="font-body text-[15px] text-nakshi-text-body leading-relaxed flex-1">
                    {card.body}
                  </p>

                  {/* Bottom indicator dots */}
                  <div className="flex gap-1.5 mt-6">
                    {[0, 1, 2].map(dot => (
                      <motion.div
                        key={dot}
                        className="h-1 rounded-full"
                        style={{ background: card.accent }}
                        animate={{
                          width: dot === i && isActive ? 24 : 6,
                          opacity: dot === i ? 0.8 : 0.2,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom "Until now" with animated reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-5"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="h-[1px] w-16 bg-primary/30" />
            <span className="text-primary text-[14px]">✦</span>
            <div className="h-[1px] w-16 bg-primary/30" />
          </motion.div>
          <motion.p
            className="font-heading italic text-[clamp(36px,5vw,48px)] text-primary"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5, type: 'spring', stiffness: 100 }}
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
