import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-5"
      style={{ background: 'hsl(var(--nakshi-darkest))' }}
    >
      <p className="font-heading text-[20px] font-semibold tracking-[0.12em] text-nakshi-text-on-dark mb-8">
        NAKSHI AI
      </p>
      <h1 className="font-heading text-[80px] md:text-[120px] font-light leading-none text-gold-shine mb-4">
        404
      </h1>
      <p className="font-body text-[15px] text-nakshi-text-on-dark/60 mb-8 text-center max-w-[360px]">
        This page doesn't exist. Let's get you back to discovering AI-powered jewelry photography.
      </p>
      <a
        href="/"
        className="inline-block font-body text-[13px] font-semibold tracking-wider uppercase bg-primary text-primary-foreground px-8 py-3.5 hover:brightness-110 active:scale-[0.98] transition-all"
        style={{ borderRadius: 2 }}
      >
        Back to Home
      </a>
    </div>
  );
};

export default NotFound;