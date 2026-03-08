import { motion } from 'framer-motion';

const GoldCheck = ({ delay }: { delay: number }) => (
  <motion.span
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20, delay }}
    viewport={{ once: true }}
    className="inline-flex items-center justify-center w-7 h-7 font-bold text-[14px]"
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
  <span className="text-[20px]" style={{ color: '#4A3728' }}>—</span>
);

const ExtraCost = () => (
  <span className="font-body text-[13px] italic" style={{ color: '#6E473B' }}>Extra cost</span>
);

const rows = [
  {
    feature: 'Cost',
    studio: (
      <span className="flex flex-col items-center">
        <span className="font-body text-[14px]" style={{ color: '#A78D78' }}>₹15,000–50,000</span>
        <span className="font-body text-[11px]" style={{ color: '#6E473B' }}>/session</span>
      </span>
    ),
    freelancer: (
      <span className="flex flex-col items-center">
        <span className="font-body text-[14px]" style={{ color: '#A78D78' }}>₹30–80</span>
        <span className="font-body text-[11px]" style={{ color: '#6E473B' }}>/image</span>
      </span>
    ),
    nakshi: (i: number) => (
      <span className="flex flex-col items-center">
        <span className="font-heading text-[22px] font-semibold" style={{ color: '#B8860B' }}>₹699–3,999</span>
        <span className="font-body text-[11px]" style={{ color: '#D3A376' }}>/month</span>
      </span>
    ),
  },
  {
    feature: 'Turnaround',
    studio: <span className="font-body text-[14px]" style={{ color: '#A78D78' }}>2–5 days</span>,
    freelancer: <span className="font-body text-[14px]" style={{ color: '#A78D78' }}>1–3 days</span>,
    nakshi: (i: number) => (
      <span className="font-heading text-[26px] font-semibold" style={{ color: '#B8860B' }}>⚡ 60 seconds</span>
    ),
  },
  {
    feature: 'Works on WhatsApp',
    studio: <Dash />,
    freelancer: <Dash />,
    nakshi: (i: number) => <GoldCheck delay={i * 0.06 + 0.2} />,
  },
  {
    feature: 'Gemstone color swap',
    studio: <Dash />,
    freelancer: <ExtraCost />,
    nakshi: (i: number) => <GoldCheck delay={i * 0.06 + 0.2} />,
  },
  {
    feature: 'Batch 10 images',
    studio: <Dash />,
    freelancer: <ExtraCost />,
    nakshi: (i: number) => <GoldCheck delay={i * 0.06 + 0.2} />,
  },
  {
    feature: 'Available at midnight',
    studio: <Dash />,
    freelancer: <Dash />,
    nakshi: (i: number) => <GoldCheck delay={i * 0.06 + 0.2} />,
  },
  {
    feature: 'No coordination needed',
    studio: <Dash />,
    freelancer: <Dash />,
    nakshi: (i: number) => <GoldCheck delay={i * 0.06 + 0.2} />,
  },
];

const ComparisonTable = () => {
  return (
    <section className="py-[80px] md:py-[120px]" style={{ background: '#291C0E' }}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-10 lg:px-[60px]">
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: '-60px' }}
          className="font-body text-[12px] uppercase tracking-[0.2em] text-center mb-4"
          style={{ color: '#D3A376' }}
        >
          ✦&nbsp; SEE THE DIFFERENCE &nbsp;✦
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, margin: '-60px' }}
          className="font-heading text-[clamp(40px,5vw,64px)] font-medium text-center mb-16"
          style={{ color: '#FFF2DF' }}
        >
          Nakshi AI vs Everything Else
        </motion.h2>

        {/* Table wrapper */}
        <div className="relative">
          {/* Mobile scroll fade */}
          <div
            className="md:hidden absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #291C0E, transparent)' }}
          />

          <div className="overflow-x-auto">
            <table
              className="w-full"
              style={{
                minWidth: 600,
                border: '1px solid #3E2522',
                borderRadius: 8,
                borderCollapse: 'separate',
                borderSpacing: 0,
                overflow: 'hidden',
              }}
            >
              <thead>
                <tr style={{ background: '#3E2522', height: 56 }}>
                  <th
                    className="font-body text-[12px] uppercase tracking-[0.2em] text-left pl-8 sticky left-0 z-[2]"
                    style={{ color: '#A78D78', background: '#3E2522' }}
                  >
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
                {rows.map((row, i) => {
                  const isLast = i === rows.length - 1;
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
                      <td
                        className="font-body text-[15px] pl-8 pr-4 sticky left-0 z-[2]"
                        style={{ color: 'rgba(255,242,223,0.8)', background: '#291C0E' }}
                      >
                        {row.feature}
                      </td>
                      <td className="text-center px-4">{row.studio}</td>
                      <td className="text-center px-4">{row.freelancer}</td>
                      <td
                        className="text-center px-4"
                        style={{
                          background: 'rgba(184,134,11,0.10)',
                          borderLeft: '2px solid #B8860B',
                          borderRight: '2px solid #B8860B',
                          ...(isLast ? {
                            borderBottom: '2px solid #B8860B',
                            borderBottomRightRadius: 8,
                          } : {}),
                        }}
                      >
                        {row.nakshi(i)}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Winner callout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <div
            className="text-center px-10 py-6"
            style={{
              background: 'rgba(184,134,11,0.08)',
              border: '1px solid rgba(184,134,11,0.25)',
              borderRadius: 4,
            }}
          >
            <p className="font-body text-[14px] line-through mb-1" style={{ color: '#A78D78' }}>
              Studio shoots cost ₹15,000 and take 5 days.
            </p>
            <p className="font-body text-[16px] font-medium mb-2" style={{ color: '#D3A376' }}>
              Nakshi AI costs ₹699 and takes 60 seconds.
            </p>
            <a
              href="#waitlist"
              className="font-body text-[14px] hover:underline transition-colors"
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
