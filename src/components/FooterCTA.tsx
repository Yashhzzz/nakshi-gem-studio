import { motion } from 'framer-motion';

const FooterCTA = () => {
  return (
    <section className="bg-background py-[80px] md:py-[120px] section-editorial texture-noise">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 text-center relative z-10">
        <div className="editorial-divider max-w-[200px] mx-auto mb-8">
          <span className="text-primary/40 text-[8px]">✦</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-80px' }}
          className="font-heading text-[clamp(26px,5.5vw,52px)] font-light text-foreground max-w-[680px] mx-auto mb-5"
        >
          Your Competitors Will Find This. <em className="font-semibold not-italic block mt-1">Find It First.</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, margin: '-80px' }}
          className="font-body text-[14px] md:text-[15px] text-muted-foreground max-w-[480px] mx-auto mb-10 leading-[1.7]"
        >
          The jewelers who join in the first 15 days will have a photography advantage that takes months to close.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <a
            href="#waitlist"
            className="inline-block font-body text-[13px] md:text-[14px] font-semibold tracking-wider uppercase bg-foreground text-background px-9 md:px-12 py-4 md:py-[18px] hover:bg-primary hover:text-primary-foreground active:scale-[0.98] transition-all duration-300"
            style={{ borderRadius: 1 }}
          >
            Join the Waitlist — Free
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FooterCTA;
