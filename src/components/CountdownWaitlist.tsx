import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useWaitlistSubmit } from '@/hooks/useWaitlistSubmit';
import { useWaitlistCount } from '@/hooks/useWaitlistCount';
import { useReferralCode } from '@/hooks/useReferralCode';
import { trackEvent } from '@/hooks/useTrackEvent';
import { Loader2, Clock, Shield, ArrowRight, Copy, Check } from 'lucide-react';

const getLaunchDate = (): Date => {
  // Fixed launch date: March 1, 2026 at midnight IST (UTC+5:30)
  return new Date('2026-03-01T00:00:00+05:30');
};

const jewelryTypes = ['Gold 💛', 'Diamond 💎', 'Silver ⚪', 'Imitation 💍', 'All of the above'];
const hearOptions = ['WhatsApp group', 'Instagram', 'Friend referred me', 'Google', 'Other'];

const inputCls =
  "w-full h-[50px] md:h-[54px] bg-transparent border font-body text-[14px] md:text-[15px] text-foreground px-4 placeholder:text-muted-foreground/60 focus:outline-none transition-all duration-300";

const CountdownWaitlist = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hrs: 0, mins: 0, secs: 0 });
  const [isLive, setIsLive] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');
  const [refLink, setRefLink] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedJewelry, setSelectedJewelry] = useState<string[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [copiedInsta, setCopiedInsta] = useState(false);
  const launchDate = useRef(getLaunchDate()).current;
  const formRef = useRef<HTMLFormElement>(null);

  const { submit, loading, error: submitError, isDuplicate } = useWaitlistSubmit();
  const { count } = useWaitlistCount();
  const { referrer } = useReferralCode();

  useEffect(() => {
    const tick = () => {
      const diff = launchDate.getTime() - Date.now();
      if (diff <= 0) { setIsLive(true); return; }
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = formRef.current!;
    const data = new FormData(form);
    const errs: Record<string, string> = {};
    if (!data.get('phone')) errs.phone = 'WhatsApp number is required';
    if (!data.get('name')) errs.name = 'Name is required';
    if (!data.get('shop')) errs.shop = 'Shop name is required';
    if (!data.get('city')) errs.city = 'City is required';
    if (selectedJewelry.length === 0) errs.jewelry = 'Select at least one jewelry type';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});

    const result = await submit({
      whatsapp_number: data.get('phone') as string,
      name: data.get('name') as string,
      shop_name: data.get('shop') as string,
      city: data.get('city') as string,
      jewelry_types: selectedJewelry,
      how_did_you_hear: (data.get('hearAbout') as string) || undefined,
      referral_code_used: (data.get('referral') as string) || undefined,
    });

    if (result) {
      setRefCode(result.referralCode);
      setRefLink(result.referralLink);
      setSubmitted(true);
    }
  };

  const toggleJewelry = (type: string) => {
    setSelectedJewelry((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const shareMessage = `Bhai, have you seen this? There's a new AI bot that puts your jewelry on a model photo in 60 seconds — right inside WhatsApp. No studio, no photographer. Starts at ₹699/month.\n\nI'm already on the waitlist. Join with my link and get ₹250 off your first month:\n${refLink}`;

  const whatsappShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`, '_blank');
  };
  const copyLink = async () => { await navigator.clipboard.writeText(refLink); setCopiedLink(true); setTimeout(() => setCopiedLink(false), 2000); };
  const copyMessage = async () => { await navigator.clipboard.writeText(shareMessage); setCopiedMsg(true); setTimeout(() => setCopiedMsg(false), 2000); };
  const shareInstagram = async () => { await navigator.clipboard.writeText(refLink); setCopiedInsta(true); setTimeout(() => setCopiedInsta(false), 3000); };

  const confettiColors = ['#B8860B', '#D3A376', '#4A7C59', '#E6DAC8', '#6E473B'];
  const displayCount = count || 0;

  const timeBlocks = [
    { val: timeLeft.days, label: 'Days' },
    { val: timeLeft.hrs, label: 'Hours' },
    { val: timeLeft.mins, label: 'Mins' },
    { val: timeLeft.secs, label: 'Secs' },
  ];

  return (
    <>
      {/* Countdown */}
      <section className="relative section-editorial py-[56px] md:py-[80px] overflow-hidden" style={{ background: 'var(--gradient-editorial)' }}>
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(184, 134, 11, 0.06), transparent)' }} />

        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-[60px] text-center relative z-10">
          {isLive ? (
            <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="font-heading text-[36px] md:text-[48px] text-gold-shine">
              We're Live! 🎉
            </motion.p>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 md:mb-10" style={{ background: 'rgba(184, 134, 11, 0.08)', border: '1px solid rgba(184, 134, 11, 0.12)', borderRadius: 100 }}>
                <Clock size={12} className="text-primary" />
                <span className="font-body text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-primary font-medium">Launching In</span>
              </div>

              <div className="flex items-start justify-center gap-2 md:gap-5">
                {timeBlocks.map((block, i, arr) => (
                  <div key={block.label} className="flex items-start gap-2 md:gap-5">
                    <div className="flex flex-col items-center">
                      <div
                        className="flex items-center justify-center w-[68px] h-[76px] md:w-[120px] md:h-[130px] relative"
                        style={{
                          background: 'linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                          borderRadius: 8,
                          border: '1px solid rgba(184, 134, 11, 0.1)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
                        }}
                      >
                        <span className="font-heading text-[32px] md:text-[72px] font-light leading-none text-gold-shine">
                          {String(block.val).padStart(2, '0')}
                        </span>
                      </div>
                      <span className="font-body text-[9px] md:text-[11px] uppercase tracking-[0.15em] text-nakshi-text-on-dark/35 mt-2 md:mt-3">{block.label}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="flex flex-col items-center gap-1.5 mt-5 md:mt-10">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <p className="font-body text-[12px] md:text-[14px] mt-6 md:mt-10 text-nakshi-text-on-dark/50">
                {displayCount > 0 ? (
                  <>
                    <span className="text-primary font-medium">{displayCount.toLocaleString()}</span> jewelers already on the waitlist
                  </>
                ) : (
                  'Join the waitlist today'
                )}
              </p>
            </>
          )}
        </div>
      </section>

      {/* Waitlist Form */}
      <section className="bg-secondary py-[60px] md:py-[100px]" id="waitlist">
        <div className="max-w-[540px] mx-auto px-5 md:px-6">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center relative">
              <div className="absolute inset-x-0 top-0 h-0 overflow-visible pointer-events-none">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="absolute w-2 h-2" style={{
                    left: `${10 + Math.random() * 80}%`, top: -10,
                    background: confettiColors[i % confettiColors.length],
                    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                    animation: `confetti ${1.2 + Math.random() * 1.5}s ease-out forwards`,
                    animationDelay: `${Math.random() * 0.4}s`,
                  }} />
                ))}
              </div>

              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(184, 134, 11, 0.1)', border: '1px solid rgba(184, 134, 11, 0.2)' }}>
                <Check size={28} className="text-primary" />
              </div>

              <h3 className="font-heading text-[28px] md:text-[40px] font-light text-foreground mb-2">You're on the list!</h3>
              <p className="font-body text-[13px] text-muted-foreground mb-8">Share your link and earn ₹250 for every signup</p>

              <div className="p-6 md:p-8 mb-5" style={{ background: 'var(--gradient-editorial)', borderRadius: 8 }}>
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-nakshi-text-on-dark/40 mb-3">Your referral code</p>
                <p className="font-heading text-[32px] md:text-[40px] font-semibold text-gold-shine tracking-[0.08em] mb-5">{refCode}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 min-w-0 px-4 py-3" style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 4, border: '1px solid rgba(255,255,255,0.08)' }}>
                    <p className="font-mono text-[12px] md:text-[13px] text-nakshi-text-on-dark/70 truncate">{refLink.replace(/^https?:\/\//, '')}</p>
                  </div>
                  <button onClick={copyLink} className="flex items-center gap-1.5 px-4 py-3 font-body text-[12px] font-semibold bg-primary text-primary-foreground whitespace-nowrap hover:brightness-110 active:scale-[0.98] transition-all" style={{ borderRadius: 4 }}>
                    {copiedLink ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                  </button>
                </div>
              </div>

              <div className="space-y-2.5">
                <button onClick={whatsappShare} className="w-full flex items-center justify-center gap-2 font-body text-[13px] md:text-[14px] font-semibold py-3.5 active:scale-[0.98] transition-all" style={{ background: '#25D366', color: '#fff', borderRadius: 6 }}>
                  Share on WhatsApp <ArrowRight size={14} />
                </button>
                <button onClick={copyMessage} className="w-full font-body text-[13px] md:text-[14px] font-medium py-3.5 border border-border text-foreground hover:bg-accent active:scale-[0.98] transition-all" style={{ borderRadius: 6 }}>
                  {copiedMsg ? '✓ Message Copied' : 'Copy Share Message'}
                </button>
                <div className="relative">
                  <button onClick={shareInstagram} className="w-full font-body text-[13px] md:text-[14px] font-semibold py-3.5 active:scale-[0.98] transition-all" style={{ background: 'linear-gradient(135deg, #833AB4, #E1306C, #F77737)', color: '#fff', borderRadius: 6 }}>
                    Share on Instagram
                  </button>
                  {copiedInsta && <p className="font-body text-[11px] text-primary mt-2 text-center">Link copied! Paste in your Instagram bio or stories.</p>}
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: '-60px' }}
                className="text-center mb-8 md:mb-10"
              >
                <h3 className="font-heading text-[clamp(28px,5vw,44px)] text-foreground mb-3">
                  <span className="font-light italic">Reserve Your Spot</span> <span className="font-semibold">— Free</span>
                </h3>
                <p className="font-body text-[13px] text-muted-foreground">Join 200+ jewelers already on the waitlist</p>
              </motion.div>

              {referrer?.valid && (
                <div className="mb-6 md:mb-8 flex items-start gap-3 p-4" style={{ background: 'rgba(184, 134, 11, 0.06)', border: '1px solid rgba(184, 134, 11, 0.15)', borderRadius: 6 }}>
                  <span className="text-[18px] mt-0.5">🎉</span>
                  <div>
                    <p className="font-body text-[13px] text-foreground font-medium">
                      Referred by {referrer.shopName || 'a Nakshi AI member'}{referrer.city ? ` from ${referrer.city}` : ''}
                    </p>
                    <p className="font-body text-[12px] text-muted-foreground mt-0.5">You'll get ₹250 off your first month</p>
                  </div>
                </div>
              )}
              {referrer && !referrer.valid && (
                <div className="mb-6 md:mb-8 p-4 font-body text-[13px] text-muted-foreground text-center" style={{ background: 'hsl(var(--accent))', borderRadius: 6 }}>
                  This referral code isn't valid. You can still join the waitlist!
                </div>
              )}

              {isDuplicate && (
                <div className="mb-5 md:mb-6 flex items-center gap-2.5 p-4 font-body text-[13px]" style={{ color: 'hsl(var(--nakshi-success))', background: 'rgba(74, 124, 89, 0.06)', border: '1px solid rgba(74, 124, 89, 0.2)', borderRadius: 6 }}>
                  <Check size={16} />
                  {submitError}
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                {/* Phone & Name row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-[12px] font-medium text-foreground/70 mb-2 block tracking-wide">WhatsApp Number *</label>
                    <input
                      name="phone" type="tel" placeholder="+91 98765 43210"
                      className={inputCls}
                      style={{ borderColor: errors.phone ? 'hsl(var(--destructive))' : 'hsl(var(--border))', borderRadius: 6, background: 'hsl(var(--background))' }}
                      disabled={loading}
                    />
                    {errors.phone && <p className="font-body text-[11px] mt-1.5 text-destructive">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="font-body text-[12px] font-medium text-foreground/70 mb-2 block tracking-wide">Your Name *</label>
                    <input
                      name="name" placeholder="Yash"
                      className={inputCls}
                      style={{ borderColor: errors.name ? 'hsl(var(--destructive))' : 'hsl(var(--border))', borderRadius: 6, background: 'hsl(var(--background))' }}
                      disabled={loading}
                    />
                    {errors.name && <p className="font-body text-[11px] mt-1.5 text-destructive">{errors.name}</p>}
                  </div>
                </div>

                {/* Shop & City row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-[12px] font-medium text-foreground/70 mb-2 block tracking-wide">Shop / Business Name *</label>
                    <input
                      name="shop" placeholder="Mamta Jewellers"
                      className={inputCls}
                      style={{ borderColor: errors.shop ? 'hsl(var(--destructive))' : 'hsl(var(--border))', borderRadius: 6, background: 'hsl(var(--background))' }}
                      disabled={loading}
                    />
                    {errors.shop && <p className="font-body text-[11px] mt-1.5 text-destructive">{errors.shop}</p>}
                  </div>
                  <div>
                    <label className="font-body text-[12px] font-medium text-foreground/70 mb-2 block tracking-wide">City *</label>
                    <input
                      name="city" placeholder="Chennai"
                      className={inputCls}
                      style={{ borderColor: errors.city ? 'hsl(var(--destructive))' : 'hsl(var(--border))', borderRadius: 6, background: 'hsl(var(--background))' }}
                      disabled={loading}
                    />
                    {errors.city && <p className="font-body text-[11px] mt-1.5 text-destructive">{errors.city}</p>}
                  </div>
                </div>

                {/* Jewelry Type */}
                <div>
                  <label className="font-body text-[12px] font-medium text-foreground/70 mb-3 block tracking-wide">Jewelry Type *</label>
                  <div className="flex flex-wrap gap-2">
                    {jewelryTypes.map((type) => {
                      const checked = selectedJewelry.includes(type);
                      return (
                        <button
                          key={type} type="button" onClick={() => toggleJewelry(type)}
                          className="flex items-center gap-2 font-body text-[13px] px-4 py-2.5 transition-all duration-200 active:scale-[0.97]"
                          style={{
                            borderRadius: 6,
                            background: checked ? 'hsl(var(--primary))' : 'hsl(var(--background))',
                            color: checked ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
                            border: `1px solid ${checked ? 'hsl(var(--primary))' : 'hsl(var(--border))'}`,
                            fontWeight: checked ? 600 : 400,
                          }}
                          disabled={loading}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                  {errors.jewelry && <p className="font-body text-[11px] mt-1.5 text-destructive">{errors.jewelry}</p>}
                </div>

                {/* How did you hear */}
                <div>
                  <label className="font-body text-[12px] font-medium text-foreground/70 mb-2 block tracking-wide">How did you hear about Nakshi AI?</label>
                  <select
                    name="hearAbout"
                    className={inputCls + ' appearance-none cursor-pointer'}
                    style={{ borderColor: 'hsl(var(--border))', borderRadius: 6, background: 'hsl(var(--background))' }}
                    defaultValue="" disabled={loading}
                  >
                    <option value="" disabled>Select an option</option>
                    {hearOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                {/* Referral Code */}
                <div>
                  <label className="font-body text-[12px] font-medium text-foreground/70 mb-2 block tracking-wide">Referral Code (optional)</label>
                  <input
                    name="referral" placeholder="NAK-XXXXXX"
                    className={inputCls}
                    style={{ borderColor: 'hsl(var(--border))', borderRadius: 6, background: 'hsl(var(--background))' }}
                    defaultValue={referrer?.code || ''} disabled={loading}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit" disabled={loading}
                  className="w-full h-[54px] md:h-[58px] font-body text-[15px] md:text-[16px] font-semibold bg-primary text-primary-foreground hover:brightness-110 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2.5 relative overflow-hidden group"
                  style={{ borderRadius: 6, boxShadow: 'var(--shadow-gold-glow)' }}
                >
                  {loading ? (
                    <><Loader2 className="animate-spin" size={18} /> Submitting...</>
                  ) : (
                    <>Join the Waitlist <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>

                {submitError && !isDuplicate && <p className="font-body text-[12px] text-center text-destructive">{submitError}</p>}

                <div className="flex items-center justify-center gap-2 pt-1">
                  <Shield size={13} className="text-muted-foreground/60" />
                  <p className="font-body text-[11px] text-muted-foreground/60">We only use your number to send your bot access link on launch day.</p>
                </div>
              </form>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default CountdownWaitlist;
