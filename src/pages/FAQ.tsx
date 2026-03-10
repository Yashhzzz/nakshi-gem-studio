import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

const FAQ = () => {
  document.title = 'FAQ | Nakshi AI';

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AccordionSection />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
};

function HeroSection() {
  return (
    <section className="pt-[100px] pb-[80px]" style={{ background: '#F4F1EA' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-center px-5"
      >
        <p className="font-body text-[12px] uppercase tracking-[0.2em] mb-5" style={{ color: '#B8860B' }}>
          ✦&nbsp;&nbsp;FAQ&nbsp;&nbsp;✦
        </p>
        <h1 className="font-heading text-[clamp(40px,8vw,64px)] font-medium" style={{ color: '#291C0E' }}>
          Questions? Answered.
        </h1>
        <p className="font-body text-[15px] md:text-[17px] mt-4" style={{ color: '#6E473B' }}>
          Everything you need to know before joining.
        </p>
      </motion.div>
    </section>
  );
}

function AccordionSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? -1 : i));

  return (
    <section className="py-[80px] px-5" style={{ background: '#FAF9F6' }}>
      <div ref={ref} className="max-w-[720px] mx-auto">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              className={i < faqs.length - 1 ? 'border-b' : ''}
              style={{ borderColor: '#D7C9B8', padding: '28px 0' }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 text-left cursor-pointer bg-transparent border-0"
              >
                <span className="font-heading text-[20px] md:text-[22px] font-medium" style={{ color: '#291C0E' }}>
                  {faq.q}
                </span>
                <ChevronDown
                  size={20}
                  style={{
                    color: '#B8860B',
                    flexShrink: 0,
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 250ms ease',
                  }}
                />
              </button>
              <div
                style={{
                  maxHeight: isOpen ? 300 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 300ms ease',
                }}
              >
                <p className="font-body text-[15px] md:text-[16px] leading-[1.7] pt-4" style={{ color: '#6E473B' }}>
                  {faq.a}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function BottomCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="py-[80px] px-5" style={{ background: '#291C0E' }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-center"
      >
        <h2 className="font-heading text-[clamp(28px,5vw,36px)] font-medium" style={{ color: '#FFF2DF' }}>
          Still have questions?
        </h2>
        <p className="font-body text-[16px] mt-3" style={{ color: '#D3A376' }}>
          Chat with us on WhatsApp — we reply fast.
        </p>
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-body text-[15px] font-semibold text-white mt-8 px-8 py-3.5 hover:opacity-90 transition-opacity"
          style={{ background: '#25D366', borderRadius: 2 }}
        >
          Chat on WhatsApp →
        </a>
      </motion.div>
    </section>
  );
}

export default FAQ;
