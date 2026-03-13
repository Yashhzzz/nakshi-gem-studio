import { motion } from 'framer-motion';
import featureRingHand from '@/assets/feature-ring-hand.jpg';
import featureGemstoneGrid from '@/assets/feature-gemstone-grid.jpg';
import featureBatchGrid from '@/assets/feature-batch-grid.jpg';
import featureNecklaceModel from '@/assets/feature-necklace-model.jpg';
import featureEarringsModel from '@/assets/feature-earrings-model.jpg';

const features = [
  {
    num: '01',
    title: 'Jewelry on Model',
    body: 'Send any phone photo. Get it back on a professional, photorealistic model in under 60 seconds.',
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
    body: "Send 10 images at once. Get all 10 back on models in under a minute.",
    image: featureBatchGrid,
    alt: 'Grid of 6 jewelry model shots',
  },
  {
    num: '04',
    title: 'Necklace Sets',
    body: 'Showcase heavy necklace sets on real models — perfect for bridal and festive collections.',
    image: featureNecklaceModel,
    alt: 'Gold necklace with emerald pendant on model',
  },
  {
    num: '05',
    title: 'Earrings & Jhumkas',
    body: 'From chandbalis to jhumkas — see every earring styled on a model, ready for your catalog.',
    image: featureEarringsModel,
    alt: 'Gold jhumka earrings on Indian model',
  },
];

const FeaturesGrid = () => {
  return (
    <section className="bg-secondary py-[72px] md:py-[140px] section-editorial" id="features">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="badge-editorial justify-center mb-5">What It Does</p>
          <h2 className="font-heading text-[clamp(30px,6vw,60px)] font-light text-foreground">
            Studio-Quality. <em className="font-semibold not-italic">No Studio.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.slice(0, 3).map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: '-80px' }}
              className="card-luxury group overflow-hidden flex flex-col"
              style={{ borderRadius: 6 }}
            >
              {/* Image with overlay */}
              <div className="relative overflow-hidden">
                <img
                  src={f.image}
                  alt={f.alt}
                  className="w-full h-48 md:h-56 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute top-4 left-4 font-body text-[10px] tracking-[0.2em] uppercase text-primary bg-background/80 backdrop-blur-sm px-3 py-1.5" style={{ borderRadius: 2 }}>
                  {f.num}
                </span>
              </div>

              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <h3 className="font-heading text-[24px] md:text-[28px] font-semibold text-foreground mb-3">{f.title}</h3>
                <p className="font-body text-[13px] md:text-[14px] text-nakshi-text-body leading-[1.75] flex-1">{f.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom row: 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6 lg:max-w-[66.666%] lg:mx-auto">
          {features.slice(3).map((f, i) => (
            <motion.div
              key={i + 3}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: (i + 3) * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
              viewport={{ once: true, margin: '-80px' }}
              className="card-luxury group overflow-hidden flex flex-col"
              style={{ borderRadius: 6 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={f.image}
                  alt={f.alt}
                  className="w-full h-48 md:h-56 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute top-4 left-4 font-body text-[10px] tracking-[0.2em] uppercase text-primary bg-background/80 backdrop-blur-sm px-3 py-1.5" style={{ borderRadius: 2 }}>
                  {f.num}
                </span>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <h3 className="font-heading text-[24px] md:text-[28px] font-semibold text-foreground mb-3">{f.title}</h3>
                <p className="font-body text-[13px] md:text-[14px] text-nakshi-text-body leading-[1.75] flex-1">{f.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
