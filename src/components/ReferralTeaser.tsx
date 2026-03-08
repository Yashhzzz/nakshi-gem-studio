import { motion } from 'framer-motion';

const ReferralTeaser = () => {
  return (
    <section className="bg-secondary py-[72px] md:py-[120px] section-editorial" id="referral">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="badge-editorial mb-5">Refer & Earn</p>
          <h2 className="font-heading text-[clamp(28px,5vw,48px)] font-light text-foreground mb-5">
            Share Nakshi AI. <em className="font-semibold not-italic">Earn ₹250</em> Every Time.
          </h2>
          <p className="font-body text-[13px] md:text-[15px] text-nakshi-text-body max-w-[440px] leading-[1.75] mb-6">
            Every time someone you refer subscribes to Growth or Pro, you earn ₹250 — straight to your Nakshi AI wallet. They get ₹250 off their first month too.
          </p>
          <a href="#referral" className="font-body text-[12px] md:text-[13px] text-primary underline underline-offset-4 hover:text-foreground transition-colors block mb-6">
            Learn How Referrals Work →
          </a>

          <div className="card-luxury p-5 md:p-6" style={{ borderRadius: 6, borderStyle: 'dashed', borderColor: 'hsl(var(--primary) / 0.3)' }}>
            <p className="font-body text-[11px] text-muted-foreground mb-1.5 tracking-wide">Your personal link will look like:</p>
            <p className="font-body text-[13px] text-primary font-mono mb-2 break-all">nakshiai.com/?ref=NAK-X7K2MP</p>
            <a href="#waitlist" className="font-body text-[12px] text-primary underline underline-offset-4 hover:text-foreground transition-colors">
              Get Your Link → Join the Waitlist
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          viewport={{ once: true, margin: '-80px' }}
          className="p-8 md:p-12 text-center md:text-left"
          style={{ background: 'hsl(var(--nakshi-darkest))', borderRadius: 6 }}
        >
          <p className="font-body text-[11px] uppercase tracking-[0.2em] text-nakshi-text-on-dark/40 mb-3">Earn up to</p>
          <p className="font-heading text-[60px] md:text-[80px] font-light leading-none mb-2 text-gold-shine">₹2,500</p>
          <p className="font-body text-[16px] md:text-[18px] text-nakshi-text-on-dark/80 mb-2">every month</p>
          <p className="font-body text-[12px] text-nakshi-text-on-dark/40 mb-6">10 referrals × ₹250 each</p>
          <div className="h-[1px] mb-4" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <p className="font-body text-[11px] italic text-nakshi-text-on-dark/30">Capped at ₹2,500/month per user</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ReferralTeaser;
