import { motion } from 'framer-motion';
import { Gift, ArrowRight, Sparkles } from 'lucide-react';

const ReferralTeaser = () => {
  return (
    <section className="section-editorial py-[72px] md:py-[140px]" id="referral" style={{ background: 'var(--gradient-editorial)' }}>
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(var(--nakshi-gold-glow)), transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--nakshi-gold-light)), transparent 40%)' }} />

      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-12 md:mb-20"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2 mb-6 md:mb-8" style={{ background: 'rgba(184, 134, 11, 0.08)', border: '1px solid rgba(184, 134, 11, 0.15)', borderRadius: 100 }}>
            <Gift size={14} className="text-primary" />
            <span className="font-body text-[11px] uppercase tracking-[0.2em] text-primary font-medium">Refer & Earn</span>
          </div>
          <h2 className="font-heading text-[clamp(32px,6vw,56px)] leading-[1.05] text-nakshi-text-on-dark">
            <span className="font-light italic">Share Nakshi AI.</span>{' '}
            <span className="font-semibold text-gold-shine">Earn ₹250</span>{' '}
            <span className="font-light">Every Time.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Left — Earnings card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-5 p-8 md:p-10 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(160deg, hsl(20 40% 10%), hsl(20 35% 6%))', borderRadius: 8, border: '1px solid rgba(184, 134, 11, 0.12)' }}
          >
            {/* Glow accent */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, hsl(var(--nakshi-gold-glow)), transparent 70%)' }} />

            <Sparkles size={20} className="text-primary mx-auto mb-4 opacity-60" />
            <p className="font-body text-[11px] uppercase tracking-[0.25em] text-nakshi-text-on-dark/40 mb-4">Earn up to</p>
            <p className="font-heading text-[72px] md:text-[96px] font-light leading-none mb-3 text-gold-shine">₹2,500</p>
            <p className="font-heading text-[18px] md:text-[20px] font-light text-nakshi-text-on-dark/80 mb-1">every month</p>
            <p className="font-body text-[13px] text-nakshi-text-on-dark/35 mb-8">10 referrals × ₹250 each</p>

            <div className="h-[1px] mb-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(184, 134, 11, 0.15), transparent)' }} />

            {/* Step indicators */}
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { num: '01', text: 'Share your link' },
                { num: '02', text: 'Friend subscribes' },
                { num: '03', text: 'You earn ₹250' },
              ].map((step) => (
                <div key={step.num}>
                  <p className="font-body text-[10px] text-primary/60 mb-1">{step.num}</p>
                  <p className="font-body text-[11px] text-nakshi-text-on-dark/50 leading-snug">{step.text}</p>
                </div>
              ))}
            </div>

            <p className="font-body text-[10px] italic text-nakshi-text-on-dark/25 mt-6">Capped at ₹2,500/month per user</p>
          </motion.div>

          {/* Right — Details + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* How it works card */}
            <div className="p-6 md:p-8" style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: 8, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <p className="font-body text-[13px] md:text-[15px] text-nakshi-text-on-dark/70 leading-[1.8] mb-5">
                Every time someone you refer subscribes to <strong className="text-nakshi-text-on-dark/90 font-medium">Growth</strong> or <strong className="text-nakshi-text-on-dark/90 font-medium">Pro</strong>, you earn ₹250 — straight to your Nakshi AI wallet. They get <span className="text-primary font-medium">₹250 off</span> their first month too.
              </p>
              <a href="#referral" className="inline-flex items-center gap-2 font-body text-[12px] md:text-[13px] text-primary hover:text-nakshi-gold-light transition-colors group">
                Learn How Referrals Work
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Referral link preview */}
            <div className="p-6 md:p-8 relative overflow-hidden" style={{ background: 'rgba(184, 134, 11, 0.04)', borderRadius: 8, border: '1px dashed rgba(184, 134, 11, 0.2)' }}>
              <p className="font-body text-[11px] uppercase tracking-[0.15em] text-nakshi-text-on-dark/35 mb-3">Your personal link will look like</p>
              <div className="flex items-center gap-3 p-3 md:p-4 mb-4" style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 6 }}>
                <code className="font-mono text-[13px] md:text-[14px] text-primary flex-1 break-all">nakshiai.com/?ref=NAK-X7K2MP</code>
              </div>
              <a
                href="#waitlist"
                className="inline-flex items-center gap-2.5 px-6 py-3 font-body text-[13px] font-semibold bg-primary text-primary-foreground hover:brightness-110 active:scale-[0.98] transition-all"
                style={{ borderRadius: 4 }}
              >
                Get Your Link — Join the Waitlist
                <ArrowRight size={14} />
              </a>
            </div>

            {/* Social proof nudge */}
            <div className="flex items-center gap-3 px-5 py-3.5" style={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: 6, border: '1px solid rgba(255, 255, 255, 0.04)' }}>
              <div className="flex -space-x-2">
                {['🟡', '🟤', '🟠'].map((dot, i) => (
                  <div key={i} className="w-7 h-7 rounded-full flex items-center justify-center text-[12px]" style={{ background: 'rgba(184, 134, 11, 0.12)', border: '2px solid hsl(20 40% 7%)' }}>
                    {dot}
                  </div>
                ))}
              </div>
              <p className="font-body text-[12px] text-nakshi-text-on-dark/45">
                <span className="text-nakshi-text-on-dark/70 font-medium">47 jewelers</span> already sharing their referral links
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReferralTeaser;
