import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const LAUNCH_DATE = new Date('2026-04-01T00:00:00+05:30');

const AnnouncementBanner = () => {
  const [visible, setVisible] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    if (!sessionStorage.getItem('nakshi_banner_dismissed')) {
      setVisible(true);
    }
    const diff = LAUNCH_DATE.getTime() - Date.now();
    setDaysLeft(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))));
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('nakshi_banner_dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 44, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full flex items-center justify-center relative overflow-hidden"
          style={{ background: 'hsl(var(--nakshi-darkest))' }}
        >
          <p className="font-body text-[12px] md:text-[13px] text-nakshi-text-on-dark/90 text-center px-10 tracking-wide">
            <span className="text-nakshi-gold-light">✦</span>
            &nbsp; Launching in {daysLeft} days · 20 free images + early access&nbsp;
            <a href="#waitlist" className="text-nakshi-gold-light underline underline-offset-2 font-medium hover:text-primary transition-colors">Join Free →</a>
          </p>
          <button
            onClick={dismiss}
            className="absolute right-4 text-nakshi-text-on-dark/50 hover:text-nakshi-text-on-dark transition-colors"
            aria-label="Dismiss banner"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBanner;
