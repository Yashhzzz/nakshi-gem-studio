import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const AnnouncementBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('nakshi_banner_dismissed')) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('nakshi_banner_dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 40, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full bg-primary flex items-center justify-center relative overflow-hidden"
        >
          <p className="font-body text-[13px] text-primary-foreground text-center px-10">
            🎉&nbsp; Nakshi AI is launching in 15 days · Join the waitlist for 20 free images + early access&nbsp;
            <a href="#waitlist" className="underline font-medium">Join Free →</a>
          </p>
          <button
            onClick={dismiss}
            className="absolute right-4 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            aria-label="Dismiss banner"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBanner;
