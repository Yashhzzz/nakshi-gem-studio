import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Refer & Earn', href: '/#referral' },
  { label: 'FAQ', href: '/faq' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const hash = href.substring(1); // e.g. #how-it-works
      if (location.pathname === '/') {
        // Already on home page, just scroll
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Navigate to home, then scroll
        navigate('/' + hash);
      }
    }
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-[100] h-[56px] md:h-[68px] flex items-center justify-between px-5 md:px-10 lg:px-16 transition-all duration-300 ${
          scrolled ? 'border-b border-border/50 shadow-sm' : ''
        }`}
        style={{
          background: scrolled ? 'hsla(40,20%,96%,0.92)' : 'hsla(40,20%,96%,0.98)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <a href="/" className="flex flex-col leading-tight group">
          <span className="font-heading font-semibold text-[20px] md:text-[22px] tracking-[0.12em] text-foreground group-hover:text-primary transition-colors duration-300">
            NAKSHI AI
          </span>
          <span className="font-hindi text-[10px] md:text-[11px] text-primary/70">नक्शी</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-body text-[13px] tracking-wide text-muted-foreground hover:text-foreground relative group transition-colors duration-300"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-400 ease-out" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#waitlist"
            className="hidden sm:inline-flex font-body text-[12px] md:text-[13px] font-semibold tracking-wider uppercase bg-foreground text-background px-5 md:px-6 py-2.5 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            style={{ borderRadius: 1 }}
          >
            Join Waitlist
          </a>
          <button
            className="md:hidden text-foreground p-1"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8"
            style={{ background: 'hsl(var(--nakshi-darkest))' }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-5 p-1 text-nakshi-gold-light/70 hover:text-nakshi-gold-light transition-colors"
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            {/* Decorative top line */}
            <div className="w-12 h-[1px] bg-nakshi-gold-light/30 mb-4" />

            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="font-heading text-[32px] font-light italic text-nakshi-text-on-dark/90 hover:text-primary transition-colors"
              >
                {link.label}
              </motion.a>
            ))}

            <div className="w-12 h-[1px] bg-nakshi-gold-light/30 mt-2" />

            <motion.a
              href="#waitlist"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="font-body text-[13px] font-semibold tracking-wider uppercase bg-primary text-primary-foreground px-8 py-3.5 mt-2 active:scale-[0.98] transition-transform"
              style={{ borderRadius: 1 }}
            >
              Join Waitlist →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
