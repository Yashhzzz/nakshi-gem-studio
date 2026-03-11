import { motion } from 'framer-motion';

const GoldCheck = ({ delay }: { delay: number }) => (
  <motion.span
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20, delay }}
    viewport={{ once: true }}
    className="inline-flex items-center justify-center w-6 h-6 font-bold text-[11px]"
    style={{
      background: 'hsl(var(--primary))',
      borderRadius: '50%',
      color: 'hsl(var(--primary-foreground))',
      boxShadow: '0 0 16px hsl(var(--primary) / 0.3)',
    }}
  >
    ✓
  </motion.span>
);

const Dash = () => (
  <span className="text-[16px]" style={{ color: 'rgba(255,255,255,0.15)' }}>—</span>
);

const ExtraCost = () => (
  <span className="font-body text-[11px] italic" style={{ color: 'rgba(255,255,255,0.35)' }}>Extra ₹</span>
);

const features = [
  { feature: 'Cost', studio: '₹15K–50K/session', freelancer: '₹30–80/image', nakshi: '₹699–3,999/mo', highlight: true },
  { feature: 'Turnaround', studio: '2–5 days', freelancer: '1–3 days', nakshi: '⚡ 60 seconds', highlight: true },
  { feature: 'Works on WhatsApp', studio: false, freelancer: false, nakshi: true },
  { feature: 'Gemstone color swap', studio: false, freelancer: 'extra', nakshi: true },
  { feature: 'Batch 10 images', studio: false, freelancer: 'extra', nakshi: true },
  { feature: 'Available 24/7', studio: false, freelancer: false, nakshi: true },
  { feature: 'No coordination', studio: false, freelancer: false, nakshi: true },
];

const renderVal = (val: string | boolean, delay: number) => {
  if (val === true) return <GoldCheck delay={delay} />;
  if (val === false) return <Dash />;
  if (val === 'extra') return <ExtraCost />;
  return <span className="font-body text-[12px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{val}</span>;
};

const renderValMobile = (val: string | boolean, delay: number) => {
  if (val === true) return <GoldCheck delay={delay} />;
  if (val === false) return <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.15)' }}>✕</span>;
  if (val === 'extra') return <ExtraCost />;
  return <span className="font-body text-[11px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{val}</span>;
};

/* ── Mobile: Horizontal scroll table ── */
const MobileComparison = () => (
  <div className="md:hidden -mx-5 px-5 overflow-x-auto scrollbar-hide">
    <table className="w-full min-w-[340px]" style={{ borderCollapse: 'separate', borderSpacing: 0, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
      <thead>
        <tr style={{ height: 44 }}>
          <th className="font-body text-[9px] uppercase tracking-[0.2em] text-left pl-4 pr-2 w-[110px]" style={{ color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.02)' }}>Feature</th>
          <th className="font-body text-[9px] uppercase tracking-[0.2em] text-center px-2" style={{ color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.02)' }}>Studio</th>
          <th className="font-body text-[9px] uppercase tracking-[0.2em] text-center px-2" style={{ color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.02)' }}>Freelancer</th>
          <th className="font-body text-[10px] uppercase tracking-[0.15em] text-center px-2 font-bold" style={{ color: 'hsl(var(--nakshi-darkest))', background: 'hsl(var(--primary))' }}>Nakshi AI</th>
        </tr>
      </thead>
      <tbody>
        {features.map((row, i) => (
          <motion.tr
            key={i}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            viewport={{ once: true }}
            style={{ height: 48, borderBottom: i < features.length - 1 ? '1px solid rgba(255,255,255,0.04)' : undefined }}
          >
            <td className="font-body text-[11px] pl-4 pr-2" style={{ color: 'rgba(255,255,255,0.65)' }}>{row.feature}</td>
            <td className="text-center px-2">{renderValMobile(row.studio, i * 0.04)}</td>
            <td className="text-center px-2">{renderValMobile(row.freelancer, i * 0.04)}</td>
            <td className="text-center px-2" style={{ background: 'hsl(var(--primary) / 0.06)', borderLeft: '1px solid hsl(var(--primary) / 0.15)' }}>
              {row.highlight ? (
                <span className="font-heading text-[13px] font-semibold" style={{ color: 'hsl(var(--primary))' }}>{row.nakshi as string}</span>
              ) : renderValMobile(row.nakshi, i * 0.04 + 0.15)}
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </div>
);

const DesktopComparison = () => (
  <div className="hidden md:block">
    <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: 0, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
      <thead>
        <tr style={{ height: 52 }}>
          <th className="font-body text-[10px] uppercase tracking-[0.25em] text-left pl-8" style={{ color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.02)' }}>Feature</th>
          <th className="font-body text-[10px] uppercase tracking-[0.25em] text-center px-4" style={{ color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.02)' }}>Studio</th>
          <th className="font-body text-[10px] uppercase tracking-[0.25em] text-center px-4" style={{ color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.02)' }}>Freelancer</th>
          <th className="font-body text-[11px] uppercase tracking-[0.2em] text-center px-4 font-bold" style={{ color: 'hsl(var(--nakshi-darkest))', background: 'hsl(var(--primary))' }}>Nakshi AI</th>
        </tr>
      </thead>
      <tbody>
        {features.map((row, i) => (
          <motion.tr
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            viewport={{ once: true }}
            className="group"
            style={{ height: 60, borderBottom: '1px solid rgba(255,255,255,0.04)' }}
          >
            <td className="font-body text-[13px] pl-8 pr-4" style={{ color: 'rgba(255,255,255,0.7)' }}>{row.feature}</td>
            <td className="text-center px-4">{renderVal(row.studio, i * 0.05)}</td>
            <td className="text-center px-4">{renderVal(row.freelancer, i * 0.05)}</td>
            <td className="text-center px-4" style={{ background: 'hsl(var(--primary) / 0.06)', borderLeft: '1px solid hsl(var(--primary) / 0.2)', borderRight: '1px solid hsl(var(--primary) / 0.2)' }}>
              {row.highlight ? (
                <span className="font-heading text-[20px] font-semibold" style={{ color: 'hsl(var(--primary))' }}>{row.nakshi as string}</span>
              ) : renderVal(row.nakshi, i * 0.05 + 0.2)}
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ComparisonTable = () => {
  return (
    <section className="py-[72px] md:py-[140px] section-editorial" style={{ background: 'hsl(var(--nakshi-darkest))' }}>
      <div className="max-w-[1000px] mx-auto px-5 md:px-10 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-10 md:mb-20"
        >
          <p className="badge-editorial justify-center mb-5" style={{ color: 'hsl(var(--nakshi-gold-light))' }}>See the Difference</p>
          <h2 className="font-heading text-[clamp(26px,6vw,60px)] font-light text-nakshi-text-on-dark leading-[1.15]">
            Nakshi AI vs{' '}
            <em className="font-semibold not-italic text-gold-shine">Everything Else</em>
          </h2>
        </motion.div>

        <MobileComparison />
        <DesktopComparison />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8 md:mt-14"
        >
          <div className="inline-block px-5 md:px-10 py-4 md:py-5" style={{ background: 'hsl(var(--primary) / 0.06)', border: '1px solid hsl(var(--primary) / 0.15)', borderRadius: 4 }}>
            <p className="font-body text-[11px] md:text-[13px] line-through mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Studio: ₹15,000 + 5 days</p>
            <p className="font-body text-[13px] md:text-[15px] font-medium text-nakshi-gold-light">Nakshi AI: ₹699 + 60 seconds</p>
            <a href="#waitlist" className="font-body text-[11px] md:text-[12px] mt-2 inline-block hover:underline transition-colors" style={{ color: 'hsl(var(--primary))' }}>
              Try free — 20 images, no card →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;
