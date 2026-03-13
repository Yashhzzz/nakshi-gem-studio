import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Do I need to download any app?',
    a: 'No. Nakshi AI works entirely inside WhatsApp. You get a personal bot link on launch day — tap it, and you\'re in. No install, no login, no learning curve.',
  },
  {
    q: 'How does the AI put my jewelry on a model?',
    a: 'You send a photo of any jewelry piece — ring, necklace, earrings, bangles — to the bot. Our AI identifies the piece, removes the background, and places it photorealistically on a professional model. The result is back in your WhatsApp in under 60 seconds.',
  },
  {
    q: 'Is my jewelry photo stored or shared?',
    a: 'Your photos are processed in real-time and deleted immediately after the model shot is generated. We never store, share, or use your jewelry images for any other purpose.',
  },
  {
    q: 'What happens after I join the waitlist?',
    a: 'You get your personal Nakshi AI bot link on launch day via WhatsApp. Waitlist members also get 20 free image generations — double the normal free trial — and founding member pricing locked in for life.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? -1 : i));

  return (
    <section id="faq" className="relative py-[72px] md:py-[140px] overflow-hidden" style={{ background: 'hsl(var(--secondary))' }}>
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-[60px] relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="badge-editorial mb-5">
            <span>✦&nbsp;&nbsp;FAQ&nbsp;&nbsp;✦</span>
          </div>
          <h2 className="font-heading text-[clamp(30px,6vw,60px)] leading-[1.05] text-foreground">
            <span className="font-light italic">Frequently Asked </span>
            <em className="font-semibold not-italic text-gold-shine">Questions</em>
          </h2>
          <p className="font-body text-[14px] md:text-[16px] text-muted-foreground mt-4 max-w-[460px] mx-auto leading-relaxed">
            Everything you need to know before joining.
          </p>
        </motion.div>

        {/* Accordion */}
        <div ref={ref} className="max-w-[720px] mx-auto">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                className={i < faqs.length - 1 ? 'border-b border-border' : ''}
                style={{ padding: '28px 0' }}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer bg-transparent border-0"
                >
                  <span className="font-heading text-[18px] md:text-[22px] font-medium text-foreground">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={20}
                    className="text-primary flex-shrink-0 transition-transform duration-250 ease-out"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? 300 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 300ms ease',
                  }}
                >
                  <p className="font-body text-[14px] md:text-[16px] leading-[1.7] pt-4 text-muted-foreground">
                    {faq.a}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="/faq"
            className="font-body text-[13px] font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1.5"
          >
            View all FAQs →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
