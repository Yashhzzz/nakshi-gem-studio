import { useWaitlistCount } from '@/hooks/useWaitlistCount';

const cities = ['Jaipur', 'Surat', 'Mumbai', 'Delhi', 'Ahmedabad', 'Hyderabad', 'Kolkata', 'Pune', 'Chennai', 'Rajkot'];
const cityStr = cities.map((c) => `●  ${c}`).join('      ');

const SocialProofMarquee = () => {
  const { count } = useWaitlistCount();
  const displayCount = count > 0 ? count.toLocaleString() : '0';

  return (
    <div className="w-full h-14 flex items-center overflow-hidden" style={{ background: '#291C0E' }}>
      <div className="flex-shrink-0 pl-6 md:pl-10 pr-8 z-10" style={{ background: '#291C0E' }}>
        <span className="font-body text-[13px] whitespace-nowrap" style={{ color: 'rgba(255,242,223,0.7)' }}>
          {displayCount} jewelers on the waitlist
        </span>
      </div>
      <div className="marquee-track flex-1">
        <div className="marquee-content">
          <span className="font-body text-[13px]" style={{ color: '#D3A376' }}>
            {cityStr}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{cityStr}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialProofMarquee;
