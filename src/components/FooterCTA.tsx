import { motion } from 'framer-motion';

const FooterCTA = () => {
  return (
    <section className="bg-background py-[100px]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-[60px] text-center">
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: '-60px' }}
          className="font-heading text-[clamp(32px,5vw,48px)] font-medium text-foreground max-w-[700px] mx-auto mb-6"
        >
          Your Competitors Are Going to Find This. You Should Find It First.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, margin: '-60px' }}
          className="font-body text-[17px] text-nakshi-text-body max-w-[560px] mx-auto mb-10 leading-relaxed"
        >
          The jewelers who join Nakshi AI in the first 15 days will have a photography advantage that takes months to close.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <a
            href="#waitlist"
            className="inline-block font-body text-[16px] font-semibold bg-primary text-primary-foreground px-10 py-[18px] hover:bg-foreground transition-colors duration-200"
            style={{ borderRadius: 2 }}
          >
            Join the Waitlist Now — Free →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FooterCTA;
