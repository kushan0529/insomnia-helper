import React from 'react';

const FightClubBanner = ({ imageUrl, title, subtitle, quote }) => (
  <div className="relative w-full h-64 md:h-[450px] overflow-hidden scanlines">
    <img 
      src={imageUrl} 
      alt={title}
      className="fc-image w-full h-full object-cover"
    />
    <div className="absolute inset-0" style={{
      background: 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.8) 100%)'
    }} />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
      {quote && (
        <p className="font-body text-fc-gold text-sm md:text-base mb-4 italic opacity-80 uppercase tracking-widest">
           " {quote} "
        </p>
      )}
      <h1 className="font-heading distressed-text text-fc-white text-5xl md:text-8xl uppercase tracking-tighter leading-none">
        {title}
      </h1>
      {subtitle && (
        <p className="font-body text-fc-white text-sm md:text-lg mt-6 max-w-3xl opacity-90 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
    {/* Additional Scanline Overlay */}
    <div className="absolute inset-0 pointer-events-none" style={{
      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)'
    }} />
  </div>
);

export default FightClubBanner;
