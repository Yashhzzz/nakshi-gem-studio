import { motion } from 'framer-motion';
import featureRingHand from '@/assets/feature-ring-hand.jpg';
import featureGemstoneGrid from '@/assets/feature-gemstone-grid.jpg';
import featureBatchGrid from '@/assets/feature-batch-grid.jpg';

const features = [
  {
    num: '01',
    title: 'Jewelry on Model',
    body: 'Send any phone photo of any jewelry piece. Get it back on a professional, photorealistic model in under 60 seconds.',
    image: featureRingHand,
    alt: 'Gold ring on elegant Indian woman hand',
  },
  {
    num: '02',
    title: 'Gemstone Color Swap',
    body: 'Show any piece in Ruby, Emerald, Sapphire, and Diamond — without making four pieces.',
    image: featureGemstoneGrid,
    alt: 'Same ring in 4 different gemstone colors',
  },
  {
    num: '03',
    title: 'Batch Processing',
    body: "Send 10 images at once. Get all 10 back on models in under a minute. Your entire week's new arrivals done before lunch.",
    image: featureBatchGrid,
    alt: 'Grid of 6 jewelry model shots',
  },
];

const FeaturesGrid = () => {
  return (
    <section className="bg-secondary py-[60px] md:py-[120px]" id="features">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-[60px]">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-60px' }}
          className="font-body text-[11px] md:text-[12px] uppercase tracking-[0.18em] md:tracking-[0.2em] text-primary text-center mb-3 md:mb-4"
        >
          ✦&nbsp; WHAT IT DOES &nbsp;✦
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, margin: '-60px' }}
          className="font-heading text-[clamp(26px,6vw,48px)] font-medium text-foreground text-center mb-10 md:mb-16"
        >
          Studio-Quality Photography. No Studio Required.
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: '-60px' }}
              className="bg-background border border-border p-6 md:p-10 relative overflow-hidden group"
              style={{ borderRadius: 4 }}
            >
              <div className="absolute left-0 bottom-0 w-[2px] h-0 bg-primary group-hover:h-full transition-all duration-300 ease-out" />
              <span className="font-body text-[11px] md:text-[12px] uppercase tracking-[0.15em] text-primary mb-3 md:mb-4 block">
                {f.num}
              </span>
              <h3 className="font-heading text-[22px] md:text-[26px] font-semibold text-foreground mb-2 md:mb-3">{f.title}</h3>
              <p className="font-body text-[14px] md:text-[15px] text-nakshi-text-body leading-relaxed mb-4 md:mb-6">{f.body}</p>
              <img
                src={f.image}
                alt={f.alt}
                className="w-full h-40 md:h-48 object-cover"
                style={{ borderRadius: 4 }}
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
