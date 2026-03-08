import { motion } from 'framer-motion';

const steps = [
  {
    num: '1.',
    title: 'Register on WhatsApp',
    body: "Join the waitlist. On launch day, you get a WhatsApp message with your personal bot link. Tap it. You're in — no app, no login.",
  },
  {
    num: '2.',
    title: 'Send Your Jewelry Photo',
    body: "Click a photo of any piece — ring, necklace, earrings, bangle, anything. Send it to the bot. Choose your model. That's it.",
  },
  {
    num: '3.',
    title: 'Get Your Model Shot',
    body: 'Within 60 seconds, the same jewelry appears on a professional model. Download it. Send it to your customer. Post it. Done.',
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-background py-[120px]" id="how-it-works">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-[60px]">
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
          className="font-heading text-[clamp(36px,5vw,52px)] font-medium text-foreground text-center mb-20"
        >
          Three Steps. No Learning Curve.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Dashed connector — desktop only */}
          <div className="hidden md:block absolute top-[48px] left-[20%] right-[20%] border-t border-dashed border-border" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              viewport={{ once: true, margin: '-60px' }}
              className="text-center relative"
            >
              <span className="font-heading text-[96px] font-light text-accent block leading-none">
                {step.num}
              </span>
              <h3 className="font-heading text-[26px] font-semibold text-foreground mt-4 mb-3">
                {step.title}
              </h3>
              <p className="font-body text-[15px] text-nakshi-text-body leading-relaxed max-w-[320px] mx-auto">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#how-it-works"
            className="font-body text-[14px] text-primary underline hover:text-foreground transition-colors"
          >
            See Full How It Works →
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
