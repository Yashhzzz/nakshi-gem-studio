import { motion } from 'framer-motion';

const GoldCheck = ({ delay }: { delay: number }) => (
  <motion.span
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20, delay }}
    viewport={{ once: true }}
    className="inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 font-bold text-[12px] md:text-[14px]"
    style={{
      background: '#B8860B',
      borderRadius: '50%',
      color: '#FFF2DF',
      boxShadow: '0 0 12px rgba(184,134,11,0.40)',
    }}
  >
    ✓
  </motion.span>
);

const Dash = () => (
  <span className="text-[18px] md:text-[20px]" style={{ color: '#4A3728' }}>—</span>
);

const ExtraCost = () => (
  <span className="font-body text-[12px] md:text-[13px] italic" style={{ color: '#6E473B' }}>Extra cost</span>
);

const features = [
  {
    feature: 'Cost',
    studio: '₹15K–50K/session',
    freelancer: '₹30–80/image',
    nakshi: '₹699–3,999/mo',
    nakshiHighlight: true,
  },
  {
    feature: 'Turnaround',
    studio: '2–5 days',
    freelancer: '1–3 days',
    nakshi: '⚡ 60 seconds',
    nakshiHighlight: true,
  },
  { feature: 'Works on WhatsApp', studio: false, freelancer: false, nakshi: true },
  { feature: 'Gemstone color swap', studio: false, freelancer: 'extra', nakshi: true },
  { feature: 'Batch 10 images', studio: false, freelancer: 'extra', nakshi: true },
  { feature: 'Available at midnight', studio: false, freelancer: false, nakshi: true },
  { feature: 'No coordination needed', studio: false, freelancer: false, nakshi: true },
];

const renderValue = (val: string | boolean, delay: number) => {
  if (val === true) return <GoldCheck delay={delay} />;
  if (val === false) return <Dash />;
  if (val === 'extra') return <ExtraCost />;
  return <span className="font-body text-[13px] md:text-[14px]" style={{ color: '#A78D78' }}>{val}</span>;
};

// Mobile: Card-based layout
const MobileComparison = () => (
  <div className="md:hidden space-y-4">
    {features.map((row, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: i * 0.05 }}
        viewport={{ once: true, margin: '-40px' }}
        className="rounded-lg overflow-hidden"
        style={{ border: '1px solid #3E2522' }}
      >
        {/* Feature name header */}
        <div className="px-4 py-3" style={{ background: '#3E2522' }}>
          <p className="font-body text-[13px] font-medium" style={{ color: '#FFF2DF' }}>{row.feature}</p>
        </div>
        {/* Values */}
        <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="font-body text-[12px] uppercase tracking-wide" style={{ color: '#A78D78' }}>Studio</span>
            {renderValue(row.studio, i * 0.06)}
          </div>
          <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <span className="font-body text-[12px] uppercase tracking-wide" style={{ color: '#A78D78' }}>Freelancer</span>
            {renderValue(row.freelancer, i * 0.06)}
          </div>
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{
              background: 'rgba(184,134,11,0.10)',
              borderTop: '2px solid #B8860B',
            }}
          >
            <span className="font-body text-[12px] uppercase tracking-wide font-bold" style={{ color: '#B8860B' }}>Nakshi AI</span>
            {row.nakshiHighlight ? (
              <span className="font-heading text-[16px] font-semibold" style={{ color: '#B8860B' }}>
                {row.nakshi as string}
              </span>
            ) : (
              renderValue(row.nakshi, i * 0.06 + 0.2)
            )}
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

// Desktop: Table layout
const DesktopComparison = () => (
  <div className="hidden md:block">
    <table
      className="w-full"
      style={{
        border: '1px solid #3E2522',
        borderRadius: 8,
        borderCollapse: 'separate',
        borderSpacing: 0,
        overflow: 'hidden',
      }}
    >
      <thead>
        <tr style={{ background: '#3E2522', height: 56 }}>
          <th className="font-body text-[12px] uppercase tracking-[0.2em] text-left pl-8" style={{ color: '#A78D78' }}>
            Feature
          </th>
          <th className="font-body text-[12px] uppercase tracking-[0.2em] text-center px-4" style={{ color: '#A78D78' }}>
            Studio Shoot
          </th>
          <th className="font-body text-[12px] uppercase tracking-[0.2em] text-center px-4" style={{ color: '#A78D78' }}>
            Freelancer
          </th>
          <th
            className="font-body text-[13px] uppercase tracking-[0.2em] text-center px-4 font-bold relative"
            style={{ color: '#291C0E', background: '#B8860B' }}
          >
            Nakshi AI
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px]" style={{ color: '#291C0E' }}>▼</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {features.map((row, i) => {
          const isLast = i === features.length - 1;
          return (
            <motion.tr
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.06 }}
              viewport={{ once: true, margin: '-40px' }}
              className="transition-colors duration-150"
              style={{
                height: 64,
                borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.05)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <td className="font-body text-[15px] pl-8 pr-4" style={{ color: 'rgba(255,242,223,0.8)' }}>
                {row.feature}
              </td>
              <td className="text-center px-4">{renderValue(row.studio, i * 0.06)}</td>
              <td className="text-center px-4">{renderValue(row.freelancer, i * 0.06)}</td>
              <td
                className="text-center px-4"
                style={{
                  background: 'rgba(184,134,11,0.10)',
                  borderLeft: '2px solid #B8860B',
                  borderRight: '2px solid #B8860B',
                  ...(isLast ? { borderBottom: '2px solid #B8860B', borderBottomRightRadius: 8 } : {}),
                }}
              >
                {row.nakshiHighlight ? (
                  <span className="font-heading text-[22px] font-semibold" style={{ color: '#B8860B' }}>
                    {row.nakshi as string}
                  </span>
                ) : (
                  renderValue(row.nakshi, i * 0.06 + 0.2)
                )}
              </td>
            </motion.tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const ComparisonTable = () => {
  return (
    <section className="py-[60px] md:py-[120px]" style={{ background: '#291C0E' }}>
      <div className="max-w-[1000px] mx-auto px-5 md:px-10 lg:px-[60px]">
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: '-60px' }}
          className="font-body text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-center mb-3 md:mb-4"
          style={{ color: '#D3A376' }}
        >
          ✦&nbsp; SEE THE DIFFERENCE &nbsp;✦
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, margin: '-60px' }}
          className="font-heading text-[clamp(28px,6vw,64px)] font-medium text-center mb-10 md:mb-16"
          style={{ color: '#FFF2DF' }}
        >
          Nakshi AI vs Everything Else
        </motion.h2>

        <MobileComparison />
        <DesktopComparison />

        {/* Winner callout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mt-8 md:mt-12"
        >
          <div
            className="text-center px-6 md:px-10 py-5 md:py-6 w-full md:w-auto"
            style={{
              background: 'rgba(184,134,11,0.08)',
              border: '1px solid rgba(184,134,11,0.25)',
              borderRadius: 4,
            }}
          >
            <p className="font-body text-[13px] md:text-[14px] line-through mb-1" style={{ color: '#A78D78' }}>
              Studio shoots cost ₹15,000 and take 5 days.
            </p>
            <p className="font-body text-[14px] md:text-[16px] font-medium mb-2" style={{ color: '#D3A376' }}>
              Nakshi AI costs ₹699 and takes 60 seconds.
            </p>
            <a
              href="#waitlist"
              className="font-body text-[13px] md:text-[14px] hover:underline transition-colors"
              style={{ color: '#B8860B' }}
            >
              Try it free — 20 images, no card required →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;
