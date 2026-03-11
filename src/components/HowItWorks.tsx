import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
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

/* Hook: returns boolean reactive to scroll */
function useScrollActive(sectionProgress: MotionValue<number>, index: number) {
  const thresholds: [number, number][] = [
    [0.1, 0.3],
    [0.28, 0.5],
    [0.48, 0.75],
  ];
  const [start, end] = thresholds[index];
  const motionActive = useTransform(sectionProgress, (v: number) => v >= start && v <= end);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    return motionActive.on('change', (v: boolean) => setIsActive(v));
  }, [motionActive]);

  return isActive;
}

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const progressValue = useTransform(scrollYProgress, [0.12, 0.25, 0.35, 0.45, 0.55, 0.65], [0, 0.15, 0.4, 0.65, 0.9, 1]);

  return (
    <section
      ref={sectionRef}
      className="py-[72px] md:py-[140px] section-editorial"
      id="how-it-works"
      style={{ background: 'hsl(var(--nakshi-darkest))' }}
    >
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

        {/* Mobile */}
        <MobileTimeline scrollProgress={scrollYProgress} />

        {/* Desktop */}
        <DesktopTimeline scrollProgress={scrollYProgress} progressValue={progressValue} />

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

/* ── Mobile vertical timeline ── */
function MobileTimeline({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <div className="md:hidden space-y-8">
      {steps.map((step, i) => (
        <MobileStep key={i} step={step} index={i} scrollProgress={scrollProgress} />
      ))}
    </div>
  );
}

function MobileStep({ step, index, scrollProgress }: { step: typeof steps[0]; index: number; scrollProgress: MotionValue<number> }) {
  const isActive = useScrollActive(scrollProgress, index);
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex gap-5"
    >
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
        {index < 2 && <div className="w-[1px] flex-1 min-h-[16px] mt-3" style={{ background: 'rgba(255,255,255,0.06)' }} />}
      </div>
      <div className="pb-2 pt-2">
        <p className="font-body text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: step.accent }}>{step.num}</p>
        <h3 className="font-heading text-[22px] font-semibold text-nakshi-text-on-dark mb-2">{step.title}</h3>
        <p className="font-body text-[13px] text-nakshi-text-on-dark/60 leading-[1.7]">{step.body}</p>
      </div>
    </motion.div>
  );
}

/* ── Desktop horizontal timeline ── */
function DesktopTimeline({ scrollProgress, progressValue }: { scrollProgress: MotionValue<number>; progressValue: MotionValue<number> }) {
  return (
    <div className="hidden md:block">
      {/* Timeline bar with icons */}
      <div className="relative mb-20">
        {/* Background line — aligned to icon centers */}
        <div className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-white/[0.06] rounded-full" style={{ left: 'calc(16.67%)', right: 'calc(16.67%)' }}>
          <motion.div
            className="h-full rounded-full origin-left"
            style={{
              background: 'linear-gradient(90deg, hsl(var(--nakshi-whatsapp)), hsl(var(--primary)), hsl(var(--nakshi-gold-light)))',
              scaleX: progressValue,
            }}
          />
        </div>

        {/* Icon nodes */}
        <div className="relative flex justify-between items-center" style={{ padding: '0 calc(16.67% - 28px)' }}>
          {steps.map((step, i) => (
            <DesktopIcon key={i} step={step} index={i} scrollProgress={scrollProgress} />
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="grid grid-cols-3 gap-10">
        {steps.map((step, i) => (
          <DesktopStepContent key={i} step={step} index={i} scrollProgress={scrollProgress} />
        ))}
      </div>
    </div>
  );
}

function DesktopIcon({ step, index, scrollProgress }: { step: typeof steps[0]; index: number; scrollProgress: MotionValue<number> }) {
  const isActive = useScrollActive(scrollProgress, index);
  const Icon = step.icon;

  return (
    <div
      className="w-[56px] h-[56px] rounded-full flex items-center justify-center transition-all duration-500 relative z-10"
      style={{
        background: isActive ? `hsl(var(--nakshi-darkest))` : 'hsl(var(--nakshi-darkest))',
        boxShadow: isActive
          ? `0 0 0 2px ${step.accent}, 0 0 24px -4px ${step.accent}50`
          : '0 0 0 1px rgba(255,255,255,0.08)',
      }}
    >
      <Icon
        size={22}
        strokeWidth={1.5}
        style={{
          color: isActive ? step.accent : 'rgba(255,255,255,0.2)',
          transition: 'color 0.5s',
        }}
      />
    </div>
  );
}

function DesktopStepContent({ step, index, scrollProgress }: { step: typeof steps[0]; index: number; scrollProgress: MotionValue<number> }) {
  const isActive = useScrollActive(scrollProgress, index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      viewport={{ once: true, margin: '-80px' }}
      className="text-center"
    >
      <p
        className="font-body text-[10px] tracking-[0.25em] uppercase mb-3 transition-opacity duration-500"
        style={{ color: step.accent, opacity: isActive ? 1 : 0.4 }}
      >
        {step.num}
      </p>
      <h3
        className="font-heading text-[28px] font-semibold mb-4 transition-all duration-500"
        style={{ color: isActive ? 'hsl(var(--nakshi-text-on-dark))' : 'hsl(var(--nakshi-text-on-dark) / 0.35)' }}
      >
        {step.title}
      </h3>
      <p
        className="font-body text-[14px] leading-[1.75] max-w-[300px] mx-auto transition-all duration-500"
        style={{ color: isActive ? 'hsl(var(--nakshi-text-on-dark) / 0.7)' : 'hsl(var(--nakshi-text-on-dark) / 0.25)' }}
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
  );
}

export default HowItWorks;
