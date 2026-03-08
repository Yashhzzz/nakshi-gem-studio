import { motion } from 'framer-motion';

const competitors = [
  {
    label: 'Studio Shoot',
    cost: '₹15,000–50,000',
    costSub: 'per session',
    time: '2–5 days',
    features: [false, false, false, false, false],
  },
  {
    label: 'Freelancer',
    cost: '₹30–80',
    costSub: 'per image',
    time: '1–3 days',
    features: [false, 'extra', 'extra', false, false],
  },
];

const nakshi = {
  cost: '₹699',
  costSub: '/month',
  time: '60s',
  features: [true, true, true, true, true],
};

const featureLabels = [
  'Works on WhatsApp',
  'Gemstone color swap',
  'Batch 10 images',
  'Available at midnight',
  'No coordination needed',
];

const GoldBadge = ({ delay }: { delay: number }) => (
  <motion.span
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20, delay }}
    viewport={{ once: true }}
    className="inline-flex items-center justify-center w-6 h-6 text-[12px] font-bold"
    style={{
      background: '#B8860B',
      borderRadius: '50%',
      color: '#FFF2DF',
      boxShadow: '0 0 16px rgba(184,134,11,0.35)',
    }}
  >
    ✓
  </motion.span>
);

const ComparisonTable = () => {
  return (
    <section className="py-[80px] md:py-[120px] relative overflow-hidden" style={{ background: '#291C0E' }}>
      {/* Subtle radial glow behind Nakshi card */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(184,134,11,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-[1100px] mx-auto px-6 md:px-10 lg:px-[60px] relative z-[1]">
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
          className="font-heading text-[clamp(36px,5vw,56px)] font-medium text-center mb-20"
          style={{ color: '#FFF2DF' }}
        >
          Nakshi AI vs Everything Else
        </motion.h2>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {/* Competitor cards */}
          {competitors.map((comp, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
              viewport={{ once: true, margin: '-60px' }}
              className="p-8"
              style={{
                background: '#1E1410',
                border: '1px solid #3E2522',
                borderRadius: 8,
              }}
            >
              <p
                className="font-body text-[11px] uppercase tracking-[0.2em] mb-8"
                style={{ color: '#6E473B' }}
              >
                {comp.label}
              </p>

              {/* Cost */}
              <div className="mb-6">
                <span className="font-heading text-[36px] font-light" style={{ color: '#A78D78' }}>
                  {comp.cost}
                </span>
                <span className="font-body text-[12px] ml-1" style={{ color: '#6E473B' }}>
                  {comp.costSub}
                </span>
              </div>

              {/* Time */}
              <div className="mb-8 pb-8" style={{ borderBottom: '1px solid #3E2522' }}>
                <p className="font-body text-[11px] uppercase tracking-wider mb-1" style={{ color: '#6E473B' }}>
                  Turnaround
                </p>
                <span className="font-heading text-[22px] font-light" style={{ color: '#A78D78' }}>
                  {comp.time}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-4">
                {featureLabels.map((label, fi) => {
                  const val = comp.features[fi];
                  return (
                    <li key={fi} className="flex items-center gap-3">
                      {val === 'extra' ? (
                        <span className="font-body text-[11px] italic px-2 py-0.5" style={{ color: '#6E473B', background: '#291C0E', borderRadius: 2 }}>
                          Extra $
                        </span>
                      ) : (
                        <span className="text-[16px]" style={{ color: '#3E2522' }}>—</span>
                      )}
                      <span className="font-body text-[13px]" style={{ color: val ? '#A78D78' : '#4A3728' }}>
                        {label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}

          {/* Nakshi AI Card — the hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: '-60px' }}
            className="relative p-8 md:-mt-4 md:mb-[-16px]"
            style={{
              background: 'linear-gradient(180deg, #2A1E0E 0%, #1C1408 100%)',
              border: '2px solid #B8860B',
              borderRadius: 8,
              boxShadow: '0 0 40px rgba(184,134,11,0.12), 0 24px 48px rgba(0,0,0,0.3)',
            }}
          >
            {/* Winner badge */}
            <span
              className="absolute -top-3 left-1/2 -translate-x-1/2 font-body text-[10px] font-bold uppercase tracking-wider px-4 py-1"
              style={{ background: '#B8860B', color: '#291C0E', borderRadius: 100 }}
            >
              ★ Clear Winner
            </span>

            <p
              className="font-body text-[11px] uppercase tracking-[0.2em] mb-8 mt-2"
              style={{ color: '#B8860B' }}
            >
              Nakshi AI
            </p>

            {/* Cost */}
            <div className="mb-6">
              <span className="font-heading text-[44px] font-semibold" style={{ color: '#B8860B' }}>
                {nakshi.cost}
              </span>
              <span className="font-body text-[13px] ml-1" style={{ color: '#D3A376' }}>
                {nakshi.costSub}
              </span>
            </div>

            {/* Time */}
            <div className="mb-8 pb-8" style={{ borderBottom: '1px solid rgba(184,134,11,0.25)' }}>
              <p className="font-body text-[11px] uppercase tracking-wider mb-1" style={{ color: '#D3A376' }}>
                Turnaround
              </p>
              <span className="font-heading text-[28px] font-semibold" style={{ color: '#D3A376' }}>
                ⚡ {nakshi.time}
              </span>
            </div>

            {/* Features */}
            <ul className="space-y-4">
              {featureLabels.map((label, fi) => (
                <li key={fi} className="flex items-center gap-3">
                  <GoldBadge delay={fi * 0.06 + 0.4} />
                  <span className="font-body text-[13px]" style={{ color: '#FFF2DF' }}>
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="#waitlist"
              className="block w-full text-center font-body text-[14px] font-semibold mt-8 py-3 hover:opacity-90 transition-opacity"
              style={{ background: '#B8860B', color: '#291C0E', borderRadius: 2 }}
            >
              Join Waitlist →
            </a>
          </motion.div>
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="font-body text-[14px] line-through mb-1" style={{ color: '#6E473B' }}>
            Studio shoots cost ₹15,000 and take 5 days.
          </p>
          <p className="font-body text-[17px] font-medium" style={{ color: '#D3A376' }}>
            Nakshi AI costs ₹699 and takes 60 seconds.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;
