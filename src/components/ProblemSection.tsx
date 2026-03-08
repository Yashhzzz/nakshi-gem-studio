import { motion } from 'framer-motion';

const cards = [
  {
    icon: '₹',
    title: '₹15,000 – ₹50,000',
    body: 'The cost of a single professional studio shoot. Most jewelers can afford this once a quarter — not every week when new stock arrives.',
  },
  {
    icon: '⏱',
    title: '2 – 5 Days',
    body: 'The wait between sending your jewelry to a photographer and getting edited photos back. By then, your customer has moved on.',
  },
  {
    icon: '😤',
    title: 'Zero Control',
    body: 'Coordinating models, makeup, lighting, reshoots. For a jeweler running a business solo, this is a full-time job in itself.',
  },
];

const ProblemSection = () => {
  return (
    <section className="bg-secondary py-[80px] md:py-[120px]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-[60px]">
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
          className="font-heading text-[clamp(36px,5vw,52px)] font-semibold text-foreground text-center mb-16"
        >
          Studio Shoots Are Killing Your Margins.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              viewport={{ once: true, margin: '-60px' }}
              className="bg-background border border-border p-10 hover:-translate-y-1 hover:shadow-lg transition-all duration-[250ms] cursor-default"
              style={{ borderRadius: 4 }}
            >
              <span className="font-heading text-[64px] text-accent leading-none block mb-4">{card.icon}</span>
              <h3 className="font-heading text-[28px] font-semibold text-foreground mb-3">{card.title}</h3>
              <p className="font-body text-[15px] text-nakshi-text-body leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-primary text-[14px] tracking-wider mb-4">——— ✦ ———</p>
          <p className="font-heading italic text-[40px] text-primary">Until now.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
