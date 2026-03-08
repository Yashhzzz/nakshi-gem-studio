import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { trackEvent } from '@/hooks/useTrackEvent';

const WhatsAppFloat = () => {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    trackEvent('whatsapp_float_click');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex items-center gap-3">
      {hovered && (
        <div className="font-body text-[13px] px-3 py-2 whitespace-nowrap" style={{ background: '#291C0E', color: '#FFF2DF', borderRadius: 4, animation: 'fade-in-left 0.2s ease-out' }}>
          Chat on WhatsApp
        </div>
      )}
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
        className="w-14 h-14 flex items-center justify-center rounded-full hover:scale-110 transition-transform"
        style={{ background: '#25D366', boxShadow: '0 8px 24px rgba(41,28,14,0.15)' }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} color="#FFF2DF" />
      </a>
    </div>
  );
};

export default WhatsAppFloat;
