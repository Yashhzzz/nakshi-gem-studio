import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
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

        {/* Mobile: Vertical timeline */}
        <div className="md:hidden space-y-8">
          {steps.map((step, i) => {
            const isActive = activeStep === i;
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActiveStep(i)}
                className="flex gap-5"
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <motion.div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    animate={{
                      boxShadow: isActive
                        ? `0 0 0 1px ${step.accent}, 0 8px 32px -4px ${step.accent}40`
                        : '0 0 0 1px rgba(255,255,255,0.08)',
                      background: isActive ? `${step.accent}15` : 'rgba(255,255,255,0.03)',
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon size={22} strokeWidth={1.5} style={{ color: isActive ? step.accent : 'rgba(255,255,255,0.3)' }} />
                  </motion.div>
                  {i < 2 && <div className="w-[1px] flex-1 min-h-[16px] mt-3" style={{ background: 'rgba(255,255,255,0.06)' }} />}
                </div>
                <div className="pb-2 pt-2">
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: step.accent }}>{step.num}</p>
                  <h3 className="font-heading text-[22px] font-semibold text-nakshi-text-on-dark mb-2">{step.title}</h3>
                  <p className="font-body text-[13px] text-nakshi-text-on-dark/60 leading-[1.7]">{step.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop: Horizontal */}
        <div className="hidden md:block">
          {/* Progress line */}
          <div className="relative mb-16">
            <div className="absolute top-[28px] left-[16.67%] right-[16.67%] h-[1px] bg-white/[0.06]">
              <motion.div
                className="h-full"
                style={{ background: 'hsl(var(--primary))' }}
                animate={{ width: activeStep === 0 ? '0%' : activeStep === 1 ? '50%' : '100%' }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-10">
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  viewport={{ once: true, margin: '-80px' }}
                  className="text-center cursor-default"
                  onHoverStart={() => setActiveStep(i)}
                >
                  <div className="flex justify-center mb-10">
                    <motion.div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      animate={{
                        boxShadow: isActive
                          ? `0 0 0 1px ${step.accent}, 0 12px 40px -8px ${step.accent}35`
                          : '0 0 0 1px rgba(255,255,255,0.08)',
                        background: isActive ? `${step.accent}12` : 'rgba(255,255,255,0.02)',
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <Icon size={24} strokeWidth={1.5} style={{ color: isActive ? step.accent : 'rgba(255,255,255,0.25)' }} />
                    </motion.div>
                  </div>

                  <p className="font-body text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: step.accent }}>{step.num}</p>
                  <h3 className="font-heading text-[28px] font-semibold text-nakshi-text-on-dark mb-4">{step.title}</h3>
                  <p className="font-body text-[14px] text-nakshi-text-on-dark/50 leading-[1.75] max-w-[300px] mx-auto">
                    {step.body}
                  </p>

                  <motion.div
                    className="mx-auto mt-8 h-[2px] rounded-full"
                    style={{ background: step.accent }}
                    animate={{ width: isActive ? 40 : 0, opacity: isActive ? 0.6 : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex justify-center gap-2 mt-10 md:mt-16">
          {steps.map((step, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveStep(i)}
              className="h-1.5 rounded-full border-0 outline-none cursor-pointer"
              style={{ background: step.accent }}
              animate={{ width: activeStep === i ? 28 : 6, opacity: activeStep === i ? 0.8 : 0.2 }}
              transition={{ duration: 0.3 }}
            />
          ))}
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

export default HowItWorks;
