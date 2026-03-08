import { motion } from 'framer-motion';

const rows = [
  { feature: 'Cost', studio: '₹15,000–50,000/session', freelancer: '₹30–80/image', nakshi: '₹699–3,999/month' },
  { feature: 'Turnaround', studio: '2–5 days', freelancer: '1–3 days', nakshi: '60 seconds' },
  { feature: 'Works on WhatsApp', studio: '✗', freelancer: '✗', nakshi: '✓' },
  { feature: 'Gemstone color swap', studio: '✗', freelancer: 'Extra cost', nakshi: '✓' },
  { feature: 'Batch 10 images', studio: '✗', freelancer: 'Extra cost', nakshi: '✓' },
  { feature: 'Available at midnight', studio: '✗', freelancer: '✗', nakshi: '✓' },
  { feature: 'No coordination required', studio: '✗', freelancer: '✗', nakshi: '✓' },
];

const ComparisonTable = () => {
  return (
    <section className="py-[80px] md:py-[120px]" style={{ background: '#291C0E' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-[60px]">
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
          className="font-heading text-[clamp(36px,5vw,52px)] font-medium text-center mb-16"
          style={{ color: '#FFF2DF' }}
        >
          Nakshi AI vs Everything Else
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-[900px] mx-auto relative"
        >
          {/* Scroll fade indicator on right — mobile */}
          <div
            className="md:hidden absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, transparent, #291C0E)' }}
          />

          <div className="overflow-x-auto">
            <table className="w-full" style={{ minWidth: 600 }}>
              <thead>
                <tr style={{ background: '#3E2522' }}>
                  <th className="font-body text-[12px] uppercase tracking-wide p-4 text-left sticky left-0 z-[2] min-w-[120px]" style={{ color: '#D3A376', background: '#3E2522' }}>
                    Feature
                  </th>
                  <th className="font-body text-[12px] uppercase tracking-wide p-4 text-left min-w-[120px]" style={{ color: '#D3A376' }}>
                    Studio Shoot
                  </th>
                  <th className="font-body text-[12px] uppercase tracking-wide p-4 text-left min-w-[120px]" style={{ color: '#D3A376' }}>
                    Freelancer
                  </th>
                  <th
                    className="font-body text-[12px] uppercase tracking-wide p-4 text-left font-semibold min-w-[120px]"
                    style={{ color: '#B8860B', background: 'rgba(184,134,11,0.12)', borderLeft: '2px solid #B8860B' }}
                  >
                    Nakshi AI
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#291C0E' : 'rgba(255,255,255,0.03)' }}>
                    <td className="font-body text-[14px] p-4 sticky left-0 z-[2]" style={{ color: 'rgba(255,242,223,0.8)', background: i % 2 === 0 ? '#291C0E' : '#2B1F12' }}>
                      {row.feature}
                    </td>
                    <td className="font-body text-[14px] p-4" style={{ color: row.studio === '✗' ? '#A78D78' : 'rgba(255,242,223,0.8)' }}>
                      {row.studio}
                    </td>
                    <td className="font-body text-[14px] p-4" style={{ color: row.freelancer === '✗' ? '#A78D78' : 'rgba(255,242,223,0.8)' }}>
                      {row.freelancer}
                    </td>
                    <td
                      className="font-body text-[14px] p-4 font-bold"
                      style={{
                        color: row.nakshi === '✓' ? '#B8860B' : 'rgba(255,242,223,0.8)',
                        background: 'rgba(184,134,11,0.12)',
                        borderLeft: '2px solid #B8860B',
                      }}
                    >
                      {row.nakshi}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;
