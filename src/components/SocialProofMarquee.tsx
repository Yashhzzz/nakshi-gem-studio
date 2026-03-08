const cities = ['Jaipur', 'Surat', 'Mumbai', 'Delhi', 'Ahmedabad', 'Hyderabad', 'Kolkata', 'Pune', 'Chennai', 'Rajkot'];
const cityStr = cities.map((c) => `●  ${c}`).join('      ');
const doubled = `${cityStr}      ${cityStr}`;

const SocialProofMarquee = () => {
  return (
    <div className="w-full h-14 flex items-center overflow-hidden" style={{ background: '#291C0E' }}>
      <div className="flex-shrink-0 pl-6 md:pl-10 pr-8">
        <span className="font-body text-[13px] whitespace-nowrap" style={{ color: 'rgba(255,242,223,0.7)' }}>
          847 jewelers on the waitlist
        </span>
      </div>
      <div className="marquee-track flex-1">
        <div className="marquee-content" style={{ color: '#D3A376' }}>
          <span className="font-body text-[13px] whitespace-nowrap">{doubled}</span>
          <span className="font-body text-[13px] whitespace-nowrap ml-12">{doubled}</span>
        </div>
      </div>
    </div>
  );
};

export default SocialProofMarquee;
