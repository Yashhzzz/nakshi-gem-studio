import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { usePlanTracking } from '@/hooks/usePlanTracking';
import { trackEvent } from '@/hooks/useTrackEvent';

const plans = [
  { name: 'starter', label: 'STARTER', price: 699, priceStr: '₹699', popular: false, features: ['40 image generations/month', '3 model options', 'Gemstone & metal swap'] },
  { name: 'growth', label: 'GROWTH', price: 1799, priceStr: '₹1,799', popular: true, features: ['150 image generations/month', '8 model options', 'Batch processing — up to 5 images', 'Priority queue — under 60 seconds', 'Diamond rate calculator'] },
  { name: 'pro', label: 'PRO', price: 3999, priceStr: '₹3,999', popular: false, features: ['400 image generations/month', 'Batch up to 10 images', 'Catalog shoot mode', 'Custom prompts + no watermark'] },
];

const PricingTeaser = () => {
  const { trackPlanView, trackPlanCTA } = usePlanTracking();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  if (isInView) {
    trackEvent('pricing_viewed');
  }

  return (
    <section ref={sectionRef} className="bg-background py-[60px] md:py-[120px]" id="pricing">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-[60px]">
        <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, margin: '-60px' }} className="font-body text-[11px] md:text-[12px] uppercase tracking-[0.18em] md:tracking-[0.2em] text-primary text-center mb-3 md:mb-4">
          ✦&nbsp; SIMPLE PRICING &nbsp;✦
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true, margin: '-60px' }} className="font-heading text-[clamp(28px,6vw,52px)] font-medium text-foreground text-center mb-3 md:mb-4">
          Less Than ₹25 a Day.
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} viewport={{ once: true, margin: '-60px' }} className="font-body text-[14px] md:text-[18px] text-nakshi-text-body text-center max-w-[500px] mx-auto mb-10 md:mb-16">
          A studio shoot costs ₹15,000–50,000. Nakshi AI costs ₹699 a month.
        </motion.p>

        {/* Mobile: Horizontal scroll pricing cards */}
        <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 scrollbar-hide">
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} isMobile onView={() => trackPlanView(plan.name, plan.price)} onCTA={() => trackPlanCTA(plan.name, plan.price)} />
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} onView={() => trackPlanView(plan.name, plan.price)} onCTA={() => trackPlanCTA(plan.name, plan.price)} />
          ))}
        </div>

        <div className="text-center mt-8 md:mt-10">
          <a href="/pricing" className="font-body text-[13px] md:text-[14px] text-primary underline hover:text-foreground transition-colors">See all plans →</a>
        </div>
      </div>
    </section>
  );
};

const PlanCard = ({ plan, index, isMobile, onView, onCTA }: { plan: typeof plans[0]; index: number; isMobile?: boolean; onView: () => void; onCTA: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  if (isInView) onView();

  const handleCTA = (e: React.MouseEvent) => {
    e.preventDefault();
    onCTA();
    trackEvent('cta_click', { plan: plan.name, source: 'pricing' });
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-60px' }}
      className={`relative flex flex-col overflow-visible ${
        isMobile ? 'snap-center flex-shrink-0 w-[280px] p-6' : 'p-8'
      } ${
        plan.popular
          ? 'border-2 border-primary md:-mt-4 md:mb-[-16px]'
          : 'bg-background border border-border'
      }`}
      style={{
        borderRadius: 8,
        background: plan.popular ? '#FFF2DF' : undefined,
        boxShadow: plan.popular
          ? '0 12px 40px rgba(184,134,11,0.15)'
          : '0 2px 12px rgba(41,28,14,0.04)',
      }}
    >
      {plan.popular && (
        <span
          className="absolute -top-[14px] left-1/2 -translate-x-1/2 font-body text-[10px] md:text-[11px] font-semibold uppercase bg-primary text-primary-foreground px-4 md:px-5 py-1.5 whitespace-nowrap"
          style={{ borderRadius: 100, letterSpacing: '0.08em' }}
        >
          ★ Most Popular
        </span>
      )}
      <p className="font-body text-[11px] md:text-[12px] uppercase tracking-[0.15em] text-primary mb-3 md:mb-4">{plan.label}</p>
      <div className="flex items-baseline gap-1 mb-4 md:mb-6">
        <span className="font-heading text-[36px] md:text-[48px] font-semibold text-foreground leading-none">{plan.priceStr}</span>
        <span className="font-body text-[14px] md:text-[15px] text-muted-foreground">/month</span>
      </div>
      <div className="border-t border-border my-3 md:my-4" />
      <ul className="space-y-2.5 md:space-y-3 mb-6 md:mb-8 flex-1">
        {plan.features.map((f, j) => (
          <li key={j} className="flex items-start gap-2 md:gap-2.5 font-body text-[13px] md:text-[14px] text-nakshi-text-body">
            <span className="text-primary font-bold mt-0.5 flex-shrink-0">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={handleCTA}
        className="block w-full text-center font-body text-[13px] md:text-[14px] font-semibold bg-primary text-primary-foreground py-3 md:py-3.5 hover:bg-foreground active:scale-[0.98] transition-all duration-200"
        style={{ borderRadius: 4 }}
      >
        Join Waitlist →
      </button>
    </motion.div>
  );
};

export default PricingTeaser;
