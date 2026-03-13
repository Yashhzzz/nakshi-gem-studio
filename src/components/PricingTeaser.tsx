import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const plans = [
  { name: 'starter', label: 'Starter', price: 699, priceStr: '₹699', popular: false, features: ['40 images/month', '3 model options', 'Gemstone & metal swap'] },
  { name: 'growth', label: 'Growth', price: 1799, priceStr: '₹1,799', popular: true, features: ['150 images/month', '8 model options', 'Batch up to 5 images', 'Priority queue', 'Diamond rate calculator'] },
  { name: 'pro', label: 'Pro', price: 3999, priceStr: '₹3,999', popular: false, features: ['400 images/month', 'Batch up to 10 images', 'Catalog shoot mode', 'Custom prompts + no watermark'] },
];

const PricingTeaser = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="bg-background py-[72px] md:py-[140px] section-editorial texture-noise" id="pricing">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-14 md:mb-20"
        >
          <p className="badge-editorial justify-center mb-5">Simple Pricing</p>
          <h2 className="font-heading text-[clamp(30px,6vw,60px)] font-light text-foreground mb-4">
            Less Than <em className="font-semibold not-italic text-gold-shine">₹25 a Day</em>
          </h2>
          <p className="font-body text-[13px] md:text-[15px] text-muted-foreground max-w-[420px] mx-auto">
            A studio shoot costs ₹15,000. Nakshi AI costs ₹699 a month.
          </p>
        </motion.div>

        {/* Mobile: Swipe cards */}
        <div className="md:hidden flex flex-col gap-4">
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} isMobile />
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PlanCard = ({ plan, index, isMobile }: { plan: typeof plans[0]; index: number; isMobile?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleCTA = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-60px' }}
      className={`relative flex flex-col`}
      style={{
        borderRadius: 6,
        background: plan.popular ? 'hsl(var(--foreground))' : 'hsl(var(--card))',
        border: plan.popular ? 'none' : '1px solid hsl(var(--border))',
        boxShadow: plan.popular ? 'var(--shadow-editorial)' : 'var(--shadow-card)',
        padding: isMobile ? '24px' : '36px',
        ...(plan.popular && !isMobile ? { marginTop: -16, marginBottom: -16 } : {}),
      }}
    >
      {plan.popular && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 font-body text-[9px] font-bold uppercase tracking-[0.2em] bg-primary text-primary-foreground px-5 py-1.5 whitespace-nowrap"
          style={{ borderRadius: 100 }}
        >
          Most Popular
        </span>
      )}
      <p className={`font-body text-[10px] uppercase tracking-[0.2em] mb-4 ${plan.popular ? 'text-nakshi-gold-light' : 'text-primary'}`}>
        {plan.label}
      </p>
      <div className="flex items-baseline gap-1 mb-6">
        <span className={`font-heading text-[40px] md:text-[52px] font-semibold leading-none ${plan.popular ? 'text-nakshi-text-on-dark' : 'text-foreground'}`}>
          {plan.priceStr}
        </span>
        <span className={`font-body text-[13px] ${plan.popular ? 'text-nakshi-text-on-dark/50' : 'text-muted-foreground'}`}>/mo</span>
      </div>
      <div className="h-[1px] mb-5" style={{ background: plan.popular ? 'rgba(255,255,255,0.08)' : 'hsl(var(--border))' }} />
      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((f, j) => (
          <li key={j} className={`flex items-start gap-2.5 font-body text-[13px] ${plan.popular ? 'text-nakshi-text-on-dark/80' : 'text-nakshi-text-body'}`}>
            <span className={`font-bold mt-0.5 flex-shrink-0 text-primary`}>✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={handleCTA}
        className={`block w-full text-center font-body text-[12px] font-semibold tracking-wider uppercase py-3.5 active:scale-[0.98] transition-all duration-300 ${
          plan.popular
            ? 'bg-primary text-primary-foreground hover:bg-nakshi-gold-light'
            : 'bg-foreground text-background hover:bg-primary hover:text-primary-foreground'
        }`}
        style={{ borderRadius: 2 }}
      >
        Join Waitlist →
      </button>
    </motion.div>
  );
};

export default PricingTeaser;
