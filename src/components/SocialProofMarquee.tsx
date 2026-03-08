const cities = ['Jaipur', 'Surat', 'Mumbai', 'Delhi', 'Ahmedabad', 'Hyderabad', 'Kolkata', 'Pune', 'Chennai', 'Rajkot'];
const cityStr = cities.map((c) => `●  ${c}`).join('     ');

const SocialProofMarquee = () => {
  return (
    <div className="w-full h-14 flex items-center overflow-hidden" style={{ background: '#291C0E' }}>
      <div className="flex-shrink-0 pl-6 md:pl-10 pr-8">
        <span className="font-body text-[13px] whitespace-nowrap" style={{ color: 'rgba(255,242,223,0.7)' }}>
          847 jewelers on the waitlist
        </span>
      </div>
      <div className="flex-1 overflow-hidden relative group">
        <div
          className="flex whitespace-nowrap group-hover:[animation-play-state:paused]"
          style={{ animation: 'marquee 30s linear infinite' }}
        >
          <span className="font-body text-[13px] px-4" style={{ color: '#D3A376' }}>
            {cityStr}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{cityStr}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="font-body text-[13px] px-4" style={{ color: '#D3A376' }}>
            {cityStr}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{cityStr}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialProofMarquee;
