import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-ink">
      {/* Star field with twinkle */}
      <div className="absolute inset-0 bg-stars animate-star-twinkle opacity-60" 
        style={{
          backgroundImage: `
            radial-gradient(1.2px 1.2px at 7% 11%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 18% 36%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 33% 6%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 52% 20%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 82% 30%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 91% 57%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 13% 67%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 47% 77%, rgba(255,255,255,0.4) 0%, transparent 100%)
          `
        }}
      />

      {/* Main Moon Glow */}
      <div className="bg-moon-glow" />
      
      {/* Moon Rim */}
      <div className="absolute -top-[230px] -right-[210px] w-[960px] h-[960px] rounded-full border border-g/10 animate-moon-breath" />

      {/* Aurora Effects */}
      <div className="absolute -top-[5%] -left-[20%] w-[700px] h-[700px] rounded-full opacity-30 blur-[40px]"
        style={{ background: 'radial-gradient(circle, rgba(60,70,200,0.1) 0%, transparent 65%)' }} />
      
      <div className="absolute bottom-[-15%] right-[10%] w-[600px] h-[600px] rounded-full opacity-30 blur-[30px]"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 65%)' }} />

      {/* Perspective Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.2) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)'
        }}
      />

      {/* Horizon Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[280px] bg-gradient-to-t from-g/5 to-transparent" />

      {/* Film Grain */}
      <div className="film-grain" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_40%,rgba(4,6,15,0.7)_100%)]" />
    </div>
  );
};

export default AnimatedBackground;
