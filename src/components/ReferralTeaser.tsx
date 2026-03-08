import { motion } from 'framer-motion';

const ReferralTeaser = () => {
  return (
    <section className="bg-accent py-[60px] md:py-[100px]" id="referral">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-[60px] grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <p className="font-body text-[11px] md:text-[12px] uppercase tracking-[0.18em] md:tracking-[0.2em] text-primary mb-3 md:mb-4">
            ✦&nbsp; REFER & EARN &nbsp;✦
          </p>
          <h2 className="font-heading text-[clamp(26px,5vw,44px)] font-medium text-foreground mb-4 md:mb-6">
            Share Nakshi AI. Earn ₹250 Every Time.
          </h2>
          <p className="font-body text-[14px] md:text-[16px] text-nakshi-text-body max-w-[440px] leading-relaxed mb-4 md:mb-6">
            Every time someone you refer subscribes to Growth or Pro, you earn ₹250 — straight to your Nakshi AI wallet. They get ₹250 off their first month too. Earn up to ₹2,500 every month.
          </p>
          <a href="#referral" className="font-body text-[13px] md:text-[14px] text-primary underline hover:text-foreground transition-colors block mb-5 md:mb-6">
            Learn How Referrals Work →
          </a>

          <div
            className="p-4 md:p-5 bg-background"
            style={{ border: '1px dashed #B8860B', borderRadius: 4 }}
          >
            <p className="font-body text-[11px] md:text-[12px] text-muted-foreground mb-1.5 md:mb-2">Your personal link will look like:</p>
            <p className="font-body text-[13px] md:text-[14px] text-primary font-mono mb-2 md:mb-3 break-all">nakshiai.com/?ref=NAK-X7K2MP</p>
            <a
              href="#waitlist"
              className="font-body text-[12px] md:text-[13px] text-primary underline hover:text-foreground transition-colors"
            >
              Get Your Link → Join the Waitlist
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true, margin: '-60px' }}
          className="p-8 md:p-12"
          style={{ background: '#291C0E', borderRadius: 4 }}
        >
          <p className="font-body text-[12px] md:text-[13px] uppercase text-muted-foreground mb-2">Earn up to</p>
          <p className="font-heading text-[56px] md:text-[80px] font-light leading-none mb-2" style={{ color: '#D3A376' }}>
            ₹2,500
          </p>
          <p className="font-body text-[16px] md:text-[18px] text-nakshi-text-on-dark mb-2">every month</p>
          <p className="font-body text-[12px] md:text-[13px] text-muted-foreground mb-5 md:mb-6">10 referrals × ₹250 each</p>
          <div className="border-t pt-4" style={{ borderColor: '#3E2522' }}>
            <p className="font-body text-[11px] md:text-[12px] italic text-nakshi-text-body">Capped at ₹2,500/month per user</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReferralTeaser;
