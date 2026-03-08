import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Camera, Sparkles } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: MessageSquare,
    title: 'Register on WhatsApp',
    body: "Join the waitlist. On launch day, you get a WhatsApp message with your personal bot link. Tap it. You're in — no app, no login.",
    accent: 'hsl(var(--nakshi-whatsapp))',
  },
  {
    num: '02',
    icon: Camera,
    title: 'Send Your Jewelry Photo',
    body: "Click a photo of any piece — ring, necklace, earrings, bangle, anything. Send it to the bot. Choose your model. That's it.",
    accent: 'hsl(var(--primary))',
  },
  {
    num: '03',
    icon: Sparkles,
    title: 'Get Your Model Shot',
    body: 'Within 60 seconds, the same jewelry appears on a professional model. Download it. Send it to your customer. Post it. Done.',
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
    <section className="bg-background py-[80px] md:py-[120px] relative overflow-hidden" id="how-it-works">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-[60px] relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: '-60px' }}
          className="font-body text-[12px] uppercase tracking-[0.2em] text-primary text-center mb-4"
        >
          ✦&nbsp; HOW IT WORKS &nbsp;✦
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, margin: '-60px' }}
          className="font-heading text-[clamp(36px,5vw,52px)] font-medium text-foreground text-center mb-6"
        >
          Three Steps. No Learning Curve.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true, margin: '-60px' }}
          className="font-body text-[15px] text-muted-foreground text-center max-w-[480px] mx-auto mb-20"
        >
          From raw photo to model shot in under a minute. Here's the entire workflow.
        </motion.p>

        {/* Steps with connecting line */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[52px] left-[16.67%] right-[16.67%] h-[2px] z-0">
            <div className="w-full h-full bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'hsl(var(--primary))' }}
                animate={{
                  width: activeStep === 0 ? '0%' : activeStep === 1 ? '50%' : '100%',
                }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative z-[1]">
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              const isPast = activeStep > i;
              const Icon = step.icon;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  viewport={{ once: true, margin: '-60px' }}
                  className="text-center relative cursor-default"
                  onHoverStart={() => setActiveStep(i)}
                >
                  {/* Step circle with icon */}
                  <div className="flex justify-center mb-8">
                    <motion.div
                      className="relative w-[104px] h-[104px] rounded-full flex items-center justify-center"
                      animate={{
                        background: isActive
                          ? `linear-gradient(135deg, ${step.accent}20, ${step.accent}08)`
                          : isPast
                            ? `linear-gradient(135deg, ${step.accent}12, transparent)`
                            : 'hsl(var(--secondary))',
                        boxShadow: isActive
                          ? `0 0 0 2px ${step.accent}, 0 12px 40px -8px ${step.accent}30`
                          : isPast
                            ? `0 0 0 2px ${step.accent}60`
                            : '0 0 0 1px hsl(var(--border))',
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Number badge */}
                      <motion.span
                        className="absolute -top-1 -right-1 font-body text-[11px] font-bold rounded-full w-7 h-7 flex items-center justify-center text-primary-foreground"
                        style={{ background: step.accent }}
                        animate={{
                          scale: isActive ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {step.num}
                      </motion.span>

                      <motion.div
                        animate={{
                          scale: isActive ? 1.15 : 1,
                          color: isActive || isPast ? step.accent : 'hsl(var(--muted-foreground))',
                        }}
                        transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                      >
                        <Icon size={36} strokeWidth={1.5} />
                      </motion.div>
                    </motion.div>
                  </div>

                  <motion.h3
                    className="font-heading text-[26px] font-semibold mb-3"
                    animate={{
                      color: isActive ? 'hsl(var(--foreground))' : 'hsl(var(--foreground))',
                    }}
                  >
                    {step.title}
                  </motion.h3>

                  <p className="font-body text-[15px] text-nakshi-text-body leading-relaxed max-w-[320px] mx-auto">
                    {step.body}
                  </p>

                  {/* Active indicator bar */}
                  <motion.div
                    className="mx-auto mt-6 h-[3px] rounded-full"
                    style={{ background: step.accent }}
                    animate={{
                      width: isActive ? 48 : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Step indicator pills (mobile-friendly) */}
        <div className="flex justify-center gap-2 mt-12">
          {steps.map((step, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveStep(i)}
              className="h-2 rounded-full border-0 outline-none cursor-pointer"
              style={{ background: step.accent }}
              animate={{
                width: activeStep === i ? 32 : 8,
                opacity: activeStep === i ? 1 : 0.3,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 font-body text-[14px] font-semibold text-primary hover:text-foreground transition-colors group"
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
