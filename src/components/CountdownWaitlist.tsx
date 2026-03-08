import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useWaitlistSubmit } from '@/hooks/useWaitlistSubmit';
import { useWaitlistCount } from '@/hooks/useWaitlistCount';
import { useReferralCode } from '@/hooks/useReferralCode';
import { trackEvent } from '@/hooks/useTrackEvent';
import { Loader2 } from 'lucide-react';

const getLaunchDate = (): Date => {
  const stored = localStorage.getItem('nakshi_launch_date');
  if (stored) return new Date(stored);
  const d = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
  localStorage.setItem('nakshi_launch_date', d.toISOString());
  return d;
};

const jewelryTypes = ['Gold 💛', 'Diamond 💎', 'Silver ⚪', 'Imitation 💍', 'All of the above'];
const hearOptions = ['WhatsApp group', 'Instagram', 'Friend referred me', 'Google', 'Other'];

const inputCls =
  "w-full h-[52px] bg-background border border-border font-body text-[15px] text-foreground px-4 placeholder:text-nakshi-placeholder focus:border-primary focus:outline-none focus:shadow-[0_0_0_3px_rgba(184,134,11,0.12)] transition-all";
const inputFocus = { borderRadius: 2 };

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

  return (
    <>
      {/* Countdown */}
      <section className="py-[60px]" style={{ background: '#3E2522' }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-[60px] text-center">
          {isLive ? (
            <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="font-heading text-[48px] text-primary">
              We're Live! 🎉
            </motion.p>
          ) : (
            <>
              <p className="font-body text-[12px] uppercase tracking-[0.2em] mb-8" style={{ color: '#D3A376' }}>Launching In</p>
              <div className="flex items-start justify-center gap-2 md:gap-4 flex-wrap">
                {[
                  { val: timeLeft.days, label: 'Days' },
                  { val: timeLeft.hrs, label: 'Hrs' },
                  { val: timeLeft.mins, label: 'Mins' },
                  { val: timeLeft.secs, label: 'Secs' },
                ].map((block, i, arr) => (
                  <div key={block.label} className="flex items-start gap-2 md:gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center border w-[72px] h-[72px] md:w-[100px] md:h-[100px]" style={{ background: '#291C0E', borderColor: '#6E473B', borderRadius: 4 }}>
                        <span className="font-heading text-[40px] md:text-[64px] font-light leading-none" style={{ color: '#FFF2DF' }}>
                          {String(block.val).padStart(2, '0')}
                        </span>
                      </div>
                      <span className="font-body text-[11px] uppercase text-muted-foreground mt-2">{block.label}</span>
                    </div>
                    {i < arr.length - 1 && <span className="font-heading text-[32px] md:text-[48px] text-primary mt-3 md:mt-4">:</span>}
                  </div>
                ))}
              </div>
              <p className="font-body text-[14px] mt-6" style={{ color: '#D3A376' }}>
                {displayCount > 0 ? `${displayCount.toLocaleString()} jewelers already registered` : 'Join the waitlist today'}
              </p>
            </>
          )}
        </div>
      </section>

      {/* Waitlist Form */}
      <section className="bg-secondary py-[80px]" id="waitlist">
        <div className="max-w-[560px] mx-auto px-6">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center relative">
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
              <h3 className="font-heading text-[40px] text-foreground mt-8 mb-8">You're on the list! 🎉</h3>
              <div className="bg-background border border-border p-6 mb-4" style={{ borderRadius: 4 }}>
                <p className="font-body text-[13px] text-muted-foreground uppercase mb-2">Your referral code:</p>
                <p className="font-heading text-[36px] font-semibold text-primary tracking-widest">{refCode}</p>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <input readOnly value={refLink.replace(/^https?:\/\//, '')} className="flex-1 bg-background border border-border font-body text-[13px] text-foreground px-4 py-3" style={{ borderRadius: 2 }} />
                <button onClick={copyLink} className="font-body text-[13px] font-semibold bg-primary text-primary-foreground px-5 py-3 whitespace-nowrap hover:bg-foreground transition-colors duration-200" style={{ borderRadius: 2 }}>
                  {copiedLink ? 'Copied! ✓' : 'Copy Link'}
                </button>
              </div>
              <div className="space-y-3">
                <button onClick={whatsappShare} className="w-full font-body text-[14px] font-semibold py-3" style={{ background: '#25D366', color: '#FFF2DF', borderRadius: 2 }}>Share on WhatsApp →</button>
                <button onClick={copyMessage} className="w-full font-body text-[14px] font-semibold py-3 bg-secondary text-foreground hover:bg-accent transition-colors duration-200" style={{ borderRadius: 2 }}>
                  {copiedMsg ? 'Copied! ✓' : 'Copy Message'}
                </button>
                <div className="relative">
                  <button onClick={shareInstagram} className="w-full font-body text-[14px] font-semibold py-3" style={{ background: '#E1306C', color: '#FFF2DF', borderRadius: 2 }}>Share on Instagram</button>
                  {copiedInsta && <p className="font-body text-[12px] text-primary mt-2">Link copied! Paste in your Instagram bio or stories.</p>}
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.h3 initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true, margin: '-60px' }} className="font-heading text-[40px] font-semibold text-foreground text-center mb-6">
                Reserve Your Spot — Free
              </motion.h3>

              {/* Referral banner */}
              {referrer?.valid && (
                <div className="mb-8 p-4 font-body text-[13px] text-nakshi-text-body text-center" style={{ background: '#FFF9F0', border: '1px solid #B8860B', borderRadius: 4 }}>
                  Referred by <strong>{referrer.shopName || 'a Nakshi AI member'}</strong>{referrer.city ? ` from ${referrer.city}` : ''} 🎉<br />
                  You'll get ₹250 off your first month.
                </div>
              )}
              {referrer && !referrer.valid && (
                <div className="mb-8 p-4 font-body text-[13px] text-muted-foreground text-center" style={{ background: '#FAF9F6', border: '1px solid #D7C9B8', borderRadius: 4 }}>
                  This referral code isn't valid. You can still join the waitlist!
                </div>
              )}

              {/* Duplicate celebration */}
              {isDuplicate && (
                <div className="mb-6 p-4 font-body text-[14px] text-center" style={{ color: '#4A7C59', background: '#F0F7F2', border: '1px solid #4A7C59', borderRadius: 4 }}>
                  {submitError}
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-body text-[13px] font-medium text-nakshi-text-body mb-2 block">WhatsApp Number *</label>
                  <input name="phone" type="tel" placeholder="+91 98765 43210" className={inputCls} style={inputFocus} disabled={loading} />
                  {errors.phone && <p className="font-body text-[12px] mt-1" style={{ color: '#8B1A1A' }}>{errors.phone}</p>}
                </div>
                <div>
                  <label className="font-body text-[13px] font-medium text-nakshi-text-body mb-2 block">Your Name *</label>
                  <input name="name" placeholder="Yash" className={inputCls} style={inputFocus} disabled={loading} />
                  {errors.name && <p className="font-body text-[12px] mt-1" style={{ color: '#8B1A1A' }}>{errors.name}</p>}
                </div>
                <div>
                  <label className="font-body text-[13px] font-medium text-nakshi-text-body mb-2 block">Shop / Business Name *</label>
                  <input name="shop" placeholder="Mamta Jewellers" className={inputCls} style={inputFocus} disabled={loading} />
                  {errors.shop && <p className="font-body text-[12px] mt-1" style={{ color: '#8B1A1A' }}>{errors.shop}</p>}
                </div>
                <div>
                  <label className="font-body text-[13px] font-medium text-nakshi-text-body mb-2 block">City *</label>
                  <input name="city" placeholder="Chennai" className={inputCls} style={inputFocus} disabled={loading} />
                  {errors.city && <p className="font-body text-[12px] mt-1" style={{ color: '#8B1A1A' }}>{errors.city}</p>}
                </div>
                <div>
                  <label className="font-body text-[13px] font-medium text-nakshi-text-body mb-3 block">Jewelry Type *</label>
                  <div className="flex flex-wrap gap-3">
                    {jewelryTypes.map((type) => {
                      const checked = selectedJewelry.includes(type);
                      return (
                        <button key={type} type="button" onClick={() => toggleJewelry(type)} className="flex items-center gap-2 font-body text-[14px] text-nakshi-text-body" disabled={loading}>
                          <span className="w-[18px] h-[18px] flex items-center justify-center border-2 flex-shrink-0" style={{ borderRadius: 2, borderColor: checked ? '#B8860B' : '#D7C9B8', background: checked ? '#B8860B' : 'transparent' }}>
                            {checked && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="#FFF2DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                          </span>
                          {type}
                        </button>
                      );
                    })}
                  </div>
                  {errors.jewelry && <p className="font-body text-[12px] mt-1" style={{ color: '#8B1A1A' }}>{errors.jewelry}</p>}
                </div>
                <div>
                  <label className="font-body text-[13px] font-medium text-nakshi-text-body mb-2 block">How did you hear about Nakshi AI?</label>
                  <select name="hearAbout" className={inputCls + ' appearance-none cursor-pointer'} style={inputFocus} defaultValue="" disabled={loading}>
                    <option value="" disabled>Select an option</option>
                    {hearOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-body text-[13px] font-medium text-nakshi-text-body mb-2 block">Referral Code (optional)</label>
                  <input name="referral" placeholder="NAK-XXXXXX" className={inputCls} style={inputFocus} defaultValue={referrer?.code || ''} disabled={loading} />
                </div>
                <button type="submit" disabled={loading} className="w-full h-[56px] font-body text-[16px] font-semibold bg-primary text-primary-foreground hover:bg-foreground transition-colors duration-200 disabled:opacity-60 flex items-center justify-center gap-2" style={{ borderRadius: 2 }}>
                  {loading ? <><Loader2 className="animate-spin" size={18} /> Submitting...</> : 'Join the Waitlist →'}
                </button>
                {submitError && !isDuplicate && <p className="font-body text-[13px] text-center" style={{ color: '#8B1A1A' }}>{submitError}</p>}
                <p className="font-body text-[12px] text-muted-foreground text-center">🔒 We only use your number to send your bot access link on launch day.</p>
              </form>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default CountdownWaitlist;
