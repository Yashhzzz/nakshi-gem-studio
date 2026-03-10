import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageSquare, Camera, Sparkles } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: MessageSquare,
    title: 'Register on WhatsApp',
    body: "Join the waitlist. On launch day, you get a WhatsApp message with your personal bot link. Tap it. You're in.",
    accent: 'hsl(var(--nakshi-whatsapp))',
  },
  {
    num: '02',
    icon: Camera,
    title: 'Send Your Jewelry Photo',
    body: "Click a photo of any piece — ring, necklace, earrings, anything. Send it to the bot. Choose your model. That's it.",
    accent: 'hsl(var(--primary))',
  },
  {
    num: '03',
    icon: Sparkles,
    title: 'Get Your Model Shot',
    body: 'Within 60 seconds, the same jewelry appears on a professional model. Download it. Share it. Done.',
    accent: 'hsl(var(--nakshi-gold-light))',
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Map scroll progress to active step (0, 1, 2)
  const progressValue = useTransform(scrollYProgress, [0.15, 0.35, 0.5, 0.65], [0, 0.5, 1, 1]);

  return (
    <section
      ref={sectionRef}
      className="py-[72px] md:py-[140px] section-editorial"
      id="how-it-works"
      style={{ background: 'hsl(var(--nakshi-darkest))' }}
    >
      {/* Subtle grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--nakshi-text-on-dark)) 0.5px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />

      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="badge-editorial justify-center mb-5" style={{ color: 'hsl(var(--nakshi-gold-light))' }}>
            How It Works
          </p>
          <h2 className="font-heading text-[clamp(32px,6vw,60px)] font-light text-nakshi-text-on-dark">
            Three Steps. <em className="font-semibold not-italic text-gold-shine">Zero Friction.</em>
          </h2>
          <p className="font-body text-[13px] md:text-[15px] text-nakshi-text-on-dark/50 max-w-[420px] mx-auto mt-5">
            From raw photo to model shot in under a minute.
          </p>
        </motion.div>

        {/* Mobile: Vertical scroll-driven timeline */}
        <div className="md:hidden space-y-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollStep key={i} index={i} sectionProgress={scrollYProgress}>
                {(isActive) => (
                  <div className="flex gap-5">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500"
                        style={{
                          boxShadow: isActive
                            ? `0 0 0 1px ${step.accent}, 0 8px 32px -4px ${step.accent}40`
                            : '0 0 0 1px rgba(255,255,255,0.08)',
                          background: isActive ? `${step.accent}15` : 'rgba(255,255,255,0.03)',
                        }}
                      >
                        <Icon size={22} strokeWidth={1.5} style={{ color: isActive ? step.accent : 'rgba(255,255,255,0.3)', transition: 'color 0.4s' }} />
                      </div>
                      {i < 2 && <div className="w-[1px] flex-1 min-h-[16px] mt-3" style={{ background: 'rgba(255,255,255,0.06)' }} />}
                    </div>
                    <div className="pb-2 pt-2">
                      <p className="font-body text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: step.accent }}>{step.num}</p>
                      <h3 className="font-heading text-[22px] font-semibold text-nakshi-text-on-dark mb-2">{step.title}</h3>
                      <p className="font-body text-[13px] text-nakshi-text-on-dark/60 leading-[1.7]">{step.body}</p>
                    </div>
                  </div>
                )}
              </ScrollStep>
            );
          })}
        </div>

        {/* Desktop: Horizontal scroll-driven */}
        <div className="hidden md:block">
          {/* Progress line */}
          <div className="relative mb-16">
            <div className="absolute top-[28px] left-[16.67%] right-[16.67%] h-[1px] bg-white/[0.06]">
              <motion.div
                className="h-full"
                style={{
                  background: 'hsl(var(--primary))',
                  scaleX: progressValue,
                  transformOrigin: 'left',
                }}
              />
            </div>

            {/* Icons on the line */}
            <div className="flex justify-between px-[16.67%]" style={{ position: 'relative', zIndex: 2 }}>
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <ScrollStepDesktop key={i} index={i} sectionProgress={scrollYProgress}>
                    {(isActive) => (
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500"
                        style={{
                          boxShadow: isActive
                            ? `0 0 0 1px ${step.accent}, 0 12px 40px -8px ${step.accent}35`
                            : '0 0 0 1px rgba(255,255,255,0.08)',
                          background: isActive ? `${step.accent}12` : 'rgba(255,255,255,0.02)',
                        }}
                      >
                        <Icon size={24} strokeWidth={1.5} style={{ color: isActive ? step.accent : 'rgba(255,255,255,0.25)', transition: 'color 0.4s' }} />
                      </div>
                    )}
                  </ScrollStepDesktop>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <ScrollStepDesktop key={i} index={i} sectionProgress={scrollYProgress}>
                {(isActive) => (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: i * 0.15 }}
                    viewport={{ once: true, margin: '-80px' }}
                    className="text-center"
                  >
                    <p className="font-body text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: step.accent }}>{step.num}</p>
                    <h3
                      className="font-heading text-[28px] font-semibold mb-4 transition-colors duration-500"
                      style={{ color: isActive ? 'hsl(var(--nakshi-text-on-dark))' : 'hsl(var(--nakshi-text-on-dark) / 0.4)' }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="font-body text-[14px] leading-[1.75] max-w-[300px] mx-auto transition-colors duration-500"
                      style={{ color: isActive ? 'hsl(var(--nakshi-text-on-dark) / 0.7)' : 'hsl(var(--nakshi-text-on-dark) / 0.35)' }}
                    >
                      {step.body}
                    </p>

                    <div
                      className="mx-auto mt-8 h-[2px] rounded-full transition-all duration-500"
                      style={{
                        background: step.accent,
                        width: isActive ? 40 : 0,
                        opacity: isActive ? 0.6 : 0,
                      }}
                    />
                  </motion.div>
                )}
              </ScrollStepDesktop>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-16"
        >
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 font-body text-[12px] md:text-[13px] tracking-wider uppercase text-nakshi-gold-light/80 hover:text-nakshi-gold-light transition-colors group"
          >
            Join the Waitlist to Try It First
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

/* Helper: determines if step is active based on scroll progress */
function useStepActive(index: number, sectionProgress: any) {
  const thresholds: [number, number][] = [
    [0.1, 0.3],
    [0.3, 0.5],
    [0.5, 0.75],
  ];
  const [start, end] = thresholds[index];
  const opacity = useTransform(sectionProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
  const isActive = useTransform(sectionProgress, (v: number) => v >= start && v <= end);
  return { opacity, isActive };
}

function ScrollStep({ index, sectionProgress, children }: { index: number; sectionProgress: any; children: (isActive: boolean) => React.ReactNode }) {
  const { isActive } = useStepActive(index, sectionProgress);
  const active = useTransform(isActive, (v: boolean) => v);

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <ScrollStepInner progress={active}>{children}</ScrollStepInner>
    </motion.div>
  );
}

function ScrollStepDesktop({ index, sectionProgress, children }: { index: number; sectionProgress: any; children: (isActive: boolean) => React.ReactNode }) {
  const { isActive } = useStepActive(index, sectionProgress);
  const active = useTransform(isActive, (v: boolean) => v);

  return <ScrollStepInner progress={active}>{children}</ScrollStepInner>;
}

function ScrollStepInner({ progress, children }: { progress: any; children: (isActive: boolean) => React.ReactNode }) {
  // We need to convert MotionValue to a boolean for rendering
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    return progress.on('change', (v: boolean) => setIsActive(v));
  }, [progress]);

  return <>{children(isActive)}</>;
}

import { useState, useEffect } from 'react';

export default HowItWorks;
