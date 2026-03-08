import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { trackEvent } from '@/hooks/useTrackEvent';

const WhatsAppFloat = () => {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    trackEvent('whatsapp_float_click');
  };

  return (
    <div className="fixed bottom-5 right-5 z-[200] flex items-center gap-3">
      {hovered && (
        <div
          className="font-body text-[12px] px-3 py-2 whitespace-nowrap tracking-wide"
          style={{
            background: 'hsl(var(--nakshi-darkest))',
            color: 'hsl(var(--nakshi-text-on-dark))',
            borderRadius: 4,
            animation: 'fade-in-left 0.2s ease-out',
          }}
        >
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
        className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full hover:scale-110 active:scale-95 transition-transform"
        style={{
          background: '#25D366',
          boxShadow: '0 6px 24px rgba(37,211,102,0.3)',
        }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={22} color="#FFF" />
      </a>
    </div>
  );
};

export default WhatsAppFloat;
