import { motion } from 'framer-motion';

const plans = [
  {
    name: 'STARTER',
    price: '₹699',
    popular: false,
    features: ['40 image generations/month', '3 model options', 'Gemstone & metal swap'],
  },
  {
    name: 'GROWTH',
    price: '₹1,799',
    popular: true,
    features: [
      '150 image generations/month',
      '8 model options',
      'Batch processing — up to 5 images',
      'Priority queue — under 60 seconds',
      'Diamond rate calculator',
    ],
  },
  {
    name: 'PRO',
    price: '₹3,999',
    popular: false,
    features: ['400 image generations/month', 'Batch up to 10 images', 'Catalog shoot mode', 'Custom prompts + no watermark'],
  },
];

const PricingTeaser = () => {
  return (
    <section className="bg-background py-[80px] md:py-[120px]" id="pricing">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-[60px]">
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: '-60px' }}
          className="font-body text-[12px] uppercase tracking-[0.2em] text-primary text-center mb-4"
        >
          ✦&nbsp; SIMPLE PRICING &nbsp;✦
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, margin: '-60px' }}
          className="font-heading text-[clamp(36px,5vw,52px)] font-medium text-foreground text-center mb-4"
        >
          Less Than ₹25 a Day.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true, margin: '-60px' }}
          className="font-body text-[18px] text-nakshi-text-body text-center max-w-[500px] mx-auto mb-16"
        >
          A studio shoot costs ₹15,000–50,000. Nakshi AI costs ₹699 a month.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              viewport={{ once: true, margin: '-60px' }}
              className={`relative p-8 overflow-visible ${
                plan.popular
                  ? 'border-2 border-primary scale-[1.02] mt-[14px]'
                  : 'bg-background border border-border'
              }`}
              style={{
                borderRadius: 4,
                background: plan.popular ? '#FFF2DF' : undefined,
                boxShadow: plan.popular ? '0 8px 32px rgba(41,28,14,0.12)' : undefined,
              }}
            >
              {plan.popular && (
                <span
                  className="absolute -top-[14px] left-1/2 -translate-x-1/2 font-body text-[11px] font-medium uppercase bg-primary text-primary-foreground px-4 py-1 whitespace-nowrap"
                  style={{ borderRadius: 100 }}
                >
                  ★ Most Popular
                </span>
              )}
              <p className="font-body text-[12px] uppercase tracking-[0.15em] text-primary mb-4">{plan.name}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-heading text-[52px] font-semibold text-foreground">{plan.price}</span>
                <span className="font-body text-[16px] text-muted-foreground">/month</span>
              </div>
              <div className="border-t border-border my-6" />
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 font-body text-[14px] text-nakshi-text-body">
                    <span className="text-primary font-bold mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className="block w-full text-center font-body text-[14px] font-semibold bg-primary text-primary-foreground py-3 hover:bg-foreground transition-colors duration-200"
                style={{ borderRadius: 2 }}
              >
                Join Waitlist →
              </a>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="/pricing" className="font-body text-[14px] text-primary underline hover:text-foreground transition-colors">
            See all plans →
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingTeaser;
