import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Refer & Earn', href: '#referral' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-[100] h-[60px] md:h-[72px] flex items-center justify-between px-6 md:px-10 lg:px-[60px] transition-all duration-200 ${
          scrolled ? 'border-b border-border' : ''
        }`}
        style={{ background: 'hsla(40,25%,97%,0.95)', backdropFilter: 'blur(12px)' }}
      >
        <a href="#" className="flex flex-col leading-tight">
          <span className="font-heading font-semibold text-[22px] tracking-[0.1em] text-foreground">
            NAKSHI AI
          </span>
          <span className="font-hindi text-[12px] text-primary">नक्शी</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-[15px] text-nakshi-text-body hover:text-foreground relative group transition-colors duration-200"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-foreground group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#waitlist"
            className="hidden sm:inline-flex font-body text-[14px] font-medium bg-primary text-primary-foreground px-[22px] py-[10px] hover:bg-foreground transition-colors duration-200"
            style={{ borderRadius: 2 }}
          >
            Join Waitlist →
          </a>
          <button
            className="md:hidden text-foreground"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8"
            style={{ background: '#291C0E' }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-5"
              style={{ color: '#D3A376' }}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-heading text-[36px] text-nakshi-text-on-dark hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#waitlist"
              onClick={() => setMenuOpen(false)}
              className="font-body text-[16px] font-semibold bg-primary text-primary-foreground px-8 py-4 mt-4"
              style={{ borderRadius: 2 }}
            >
              Join Waitlist →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
