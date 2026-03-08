import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion } from 'framer-motion';

const getLaunchDate = (): Date => {
  const stored = localStorage.getItem('nakshi_launch_date');
  if (stored) return new Date(stored);
  const d = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
  localStorage.setItem('nakshi_launch_date', d.toISOString());
  return d;
};

const generateRefCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'NAK-';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
};

const jewelryTypes = ['Gold 💛', 'Diamond 💎', 'Silver ⚪', 'Imitation 💍', 'All of the above'];
const hearOptions = ['WhatsApp group', 'Instagram', 'Friend referred me', 'Google', 'Other'];

const inputCls =
  "w-full h-[52px] bg-background border border-border font-body text-[15px] text-foreground px-4 placeholder:text-nakshi-placeholder focus:border-primary focus:outline-none transition-all";
const inputFocus = { borderRadius: 2 };

const CountdownWaitlist = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hrs: 0, mins: 0, secs: 0 });
  const [isLive, setIsLive] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedJewelry, setSelectedJewelry] = useState<string[]>([]);
  const launchDate = useRef(getLaunchDate()).current;
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const tick = () => {
      const diff = launchDate.getTime() - Date.now();
      if (diff <= 0) {
        setIsLive(true);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hrs: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [launchDate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = formRef.current!;
    const data = new FormData(form);
    const errs: Record<string, string> = {};
    if (!data.get('phone')) errs.phone = 'WhatsApp number is required';
    if (!data.get('name')) errs.name = 'Name is required';
    if (!data.get('shop')) errs.shop = 'Shop name is required';
    if (!data.get('city')) errs.city = 'City is required';
    if (selectedJewelry.length === 0) errs.jewelry = 'Select at least one jewelry type';
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    const code = generateRefCode();
    setRefCode(code);
    localStorage.setItem('nakshi_user_refcode', code);
    setSubmitted(true);
  };

  const toggleJewelry = (type: string) => {
    setSelectedJewelry((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const whatsappShare = () => {
    const text = encodeURIComponent(
      `I'm getting early access to Nakshi AI — India's first AI jewelry photography bot. Join with my code ${refCode}: nakshiai.com/?ref=${refCode}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const confettiColors = ['#B8860B', '#D3A376', '#4A7C59', '#E6DAC8', '#6E473B'];

  return (
    <>
      {/* Countdown */}
      <section className="py-[60px]" style={{ background: '#3E2522' }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-[60px] text-center">
          {isLive ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-heading text-[48px] text-primary"
            >
              We're Live! 🎉
            </motion.p>
          ) : (
            <>
              <p className="font-body text-[12px] uppercase tracking-[0.2em] mb-8" style={{ color: '#D3A376' }}>
                Launching In
              </p>
              <div className="flex items-start justify-center gap-2 md:gap-4 flex-wrap">
                {[
                  { val: timeLeft.days, label: 'Days' },
                  { val: timeLeft.hrs, label: 'Hrs' },
                  { val: timeLeft.mins, label: 'Mins' },
                  { val: timeLeft.secs, label: 'Secs' },
                ].map((block, i, arr) => (
                  <div key={block.label} className="flex items-start gap-2 md:gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="flex items-center justify-center border w-[72px] h-[72px] md:w-[100px] md:h-[100px]"
                        style={{ background: '#291C0E', borderColor: '#6E473B', borderRadius: 4 }}
                      >
                        <span
                          className="font-heading text-[40px] md:text-[64px] font-light leading-none"
                          style={{ color: '#FFF2DF' }}
                        >
                          {String(block.val).padStart(2, '0')}
                        </span>
                      </div>
                      <span className="font-body text-[11px] uppercase text-muted-foreground mt-2">
                        {block.label}
                      </span>
                    </div>
                    {i < arr.length - 1 && (
                      <span className="font-heading text-[32px] md:text-[48px] text-primary mt-3 md:mt-4">
                        :
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <p className="font-body text-[14px] mt-6" style={{ color: '#D3A376' }}>
                847 jewelers already registered
              </p>
            </>
          )}
        </div>
      </section>

      {/* Waitlist Form */}
      <section className="bg-secondary py-[80px]" id="waitlist">
        <div className="max-w-[560px] mx-auto px-6">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center relative"
            >
              {/* Confetti */}
              <div className="absolute inset-x-0 top-0 h-0 overflow-visible pointer-events-none">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2"
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      top: -10,
                      background: confettiColors[i % confettiColors.length],
                      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                      animation: `confetti ${1.2 + Math.random() * 1.5}s ease-out forwards`,
                      animationDelay: `${Math.random() * 0.4}s`,
                    }}
                  />
                ))}
              </div>

              <h3 className="font-heading text-[40px] text-foreground mt-8 mb-8">You're on the list! 🎉</h3>
              <div className="bg-background border border-border p-6 mb-6" style={{ borderRadius: 4 }}>
                <p className="font-body text-[13px] text-muted-foreground mb-2">Your referral code:</p>
                <p className="font-heading text-[32px] font-semibold text-primary tracking-widest">{refCode}</p>
              </div>
              <button
                onClick={whatsappShare}
                className="w-full font-body text-[14px] font-semibold py-3"
                style={{ background: '#25D366', color: '#FFF2DF', borderRadius: 2 }}
              >
                Copy & Share on WhatsApp →
              </button>
            </motion.div>
          ) : (
            <>
              <motion.h3
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: '-60px' }}
                className="font-heading text-[40px] font-semibold text-foreground text-center mb-10"
              >
                Reserve Your Spot — Free
              </motion.h3>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                {/* WhatsApp Number */}
                <div>
                  <label className="font-body text-[13px] font-medium text-nakshi-text-body mb-2 block">
                    WhatsApp Number *
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className={inputCls}
                    style={{ ...inputFocus, boxShadow: errors.phone ? undefined : undefined }}
                  />
                  {errors.phone && (
                    <p className="font-body text-[12px] mt-1" style={{ color: '#8B1A1A' }}>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Name */}
                <div>
                  <label className="font-body text-[13px] font-medium text-nakshi-text-body mb-2 block">
                    Your Name *
                  </label>
                  <input name="name" placeholder="Priya Sharma" className={inputCls} style={inputFocus} />
                  {errors.name && (
                    <p className="font-body text-[12px] mt-1" style={{ color: '#8B1A1A' }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Shop */}
                <div>
                  <label className="font-body text-[13px] font-medium text-nakshi-text-body mb-2 block">
                    Shop / Business Name *
                  </label>
                  <input name="shop" placeholder="Sharma Jewellers" className={inputCls} style={inputFocus} />
                  {errors.shop && (
                    <p className="font-body text-[12px] mt-1" style={{ color: '#8B1A1A' }}>
                      {errors.shop}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="font-body text-[13px] font-medium text-nakshi-text-body mb-2 block">City *</label>
                  <input name="city" placeholder="Jaipur" className={inputCls} style={inputFocus} />
                  {errors.city && (
                    <p className="font-body text-[12px] mt-1" style={{ color: '#8B1A1A' }}>
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* Jewelry Type */}
                <div>
                  <label className="font-body text-[13px] font-medium text-nakshi-text-body mb-3 block">
                    Jewelry Type *
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {jewelryTypes.map((type) => {
                      const checked = selectedJewelry.includes(type);
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => toggleJewelry(type)}
                          className="flex items-center gap-2 font-body text-[14px] text-nakshi-text-body"
                        >
                          <span
                            className="w-[18px] h-[18px] flex items-center justify-center border-2 flex-shrink-0"
                            style={{
                              borderRadius: 2,
                              borderColor: checked ? '#B8860B' : '#D7C9B8',
                              background: checked ? '#B8860B' : 'transparent',
                            }}
                          >
                            {checked && (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path
                                  d="M2 6L5 9L10 3"
                                  stroke="#FFF2DF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                          {type}
                        </button>
                      );
                    })}
                  </div>
                  {errors.jewelry && (
                    <p className="font-body text-[12px] mt-1" style={{ color: '#8B1A1A' }}>
                      {errors.jewelry}
                    </p>
                  )}
                </div>

                {/* How did you hear */}
                <div>
                  <label className="font-body text-[13px] font-medium text-nakshi-text-body mb-2 block">
                    How did you hear about Nakshi AI?
                  </label>
                  <select
                    name="hearAbout"
                    className={inputCls + ' appearance-none cursor-pointer'}
                    style={inputFocus}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {hearOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Referral Code */}
                <div>
                  <label className="font-body text-[13px] font-medium text-nakshi-text-body mb-2 block">
                    Referral Code (optional)
                  </label>
                  <input name="referral" placeholder="NAK-XXXXXX" className={inputCls} style={inputFocus} />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full h-[56px] font-body text-[16px] font-semibold bg-primary text-primary-foreground hover:bg-foreground transition-colors duration-200"
                  style={{ borderRadius: 2 }}
                >
                  Join the Waitlist →
                </button>
                <p className="font-body text-[12px] text-muted-foreground text-center">
                  🔒 We only use your number to send your bot access link on launch day.
                </p>
              </form>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default CountdownWaitlist;
