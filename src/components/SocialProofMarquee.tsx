import { useWaitlistCount } from '@/hooks/useWaitlistCount';

const cities = ['Jaipur', 'Surat', 'Mumbai', 'Delhi', 'Ahmedabad', 'Hyderabad', 'Kolkata', 'Pune', 'Chennai', 'Rajkot'];
const cityStr = cities.map((c) => `✦  ${c}`).join('      ');

const SocialProofMarquee = () => {
  const { count } = useWaitlistCount();
  const displayCount = count > 0 ? count.toLocaleString() : '0';

  return (
    <div
      className="w-full h-12 md:h-14 flex items-center overflow-hidden"
      style={{ background: 'hsl(var(--nakshi-darkest))' }}
    >
      <div className="flex-shrink-0 pl-5 md:pl-10 pr-6 md:pr-8 z-10" style={{ background: 'hsl(var(--nakshi-darkest))' }}>
        <span className="font-body text-[11px] md:text-[12px] tracking-wider uppercase whitespace-nowrap" style={{ color: 'hsl(var(--nakshi-text-on-dark) / 0.6)' }}>
          {displayCount} jewelers waiting
        </span>
      </div>
      <div className="marquee-track flex-1">
        <div className="marquee-content">
          <span className="font-body text-[11px] md:text-[12px] tracking-wider" style={{ color: 'hsl(var(--nakshi-gold-light) / 0.7)' }}>
            {cityStr}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{cityStr}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialProofMarquee;
