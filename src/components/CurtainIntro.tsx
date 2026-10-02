import React, { useState, useEffect } from 'react';

interface CurtainIntroProps {
  onComplete: () => void;
}

export const CurtainIntro: React.FC<CurtainIntroProps> = ({ onComplete }) => {
  // Simplified curtain intro: closed then open, then reveal homepage
  const [stage, setStage] = useState(0); // 0: closed, 1: opening, 2: done

  useEffect(() => {
    // Brief pause before opening
    const openTimer = setTimeout(() => setStage(1), 1200);
    // After opening animation (≈2.5s), complete and notify parent
    const finishTimer = setTimeout(() => {
      setStage(2);
      onComplete();
    }, 1200 + 2500);
    return () => {
      clearTimeout(openTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  if (stage === 2) return null;

  const isCurtainOpen = stage === 1;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-1000 select-none ${
        stage === 5 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#070205' }}
    >
      {/* ===================================================================== */}
      {/* BEHIND CURTAIN: THEATRE STAGE BACKGROUND & TITLES                     */}
      {/* ===================================================================== */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-8 z-10 text-center">
        {/* Soft Ambient Stage Spotlight Glow */}
        <div className="absolute w-[600px] sm:w-[900px] lg:w-[1200px] h-[400px] sm:h-[600px] bg-gradient-to-tr from-wine-900/35 via-crimsonGlow/25 to-champagne-400/20 rounded-full blur-[160px] pointer-events-none" />

        {/* ================================================================= */}
        {/* TITLE 1: OUR 4 YEAR JOURNEY                                       */}
        {/* ================================================================= */}
        <div
          className={`transition-all duration-1000 ease-out max-w-4xl mx-auto px-4 ${
            stage === 2
              ? 'opacity-100 scale-100 translate-y-0 filter-none'
              : 'opacity-0 scale-95 translate-y-4 blur-xs pointer-events-none absolute'
          }`}
        >
          <span className="text-xs sm:text-sm lg:text-base uppercase tracking-[0.45em] text-champagne-400/90 font-sans block mb-4">
            A Story of Four Beautiful Years
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-normal text-white tracking-tight leading-[1.08] mb-5 text-glow-gold">
            Our 4 Year Journey
          </h1>
          <p className="text-base sm:text-2xl lg:text-3xl text-roseGold font-mono tracking-widest uppercase">
            17 November 2022 → 17 November 2026
          </p>
        </div>

        {/* ================================================================= */}
        {/* TITLE 2: HAPPY BIRTHDAY, AYUSHI ❤️                                */}
        {/* ================================================================= */}
        <div
          className={`transition-all duration-1000 ease-out max-w-4xl mx-auto px-4 ${
            stage === 3
              ? 'opacity-100 scale-100 translate-y-0 filter-none'
              : 'opacity-0 scale-95 translate-y-4 blur-xs pointer-events-none absolute'
          }`}
        >
          <span className="text-xs sm:text-sm lg:text-base uppercase tracking-[0.45em] text-champagne-400/90 font-sans block mb-4">
            3 October 2026
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-normal text-white tracking-tight leading-[1.08] mb-5 text-glow-gold">
            Happy Birthday,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-champagne-100 via-roseGold to-crimsonGlow">
              Ayushi ❤️
            </span>
          </h1>
          <p className="text-base sm:text-2xl lg:text-3xl text-champagne-200/90 font-serif italic max-w-2xl mx-auto leading-relaxed">
            "To the girl who made ordinary moments feel extraordinary."
          </p>
        </div>

        {/* ================================================================= */}
        {/* TITLE 3: IT'S YOUR DAY, AYUSHI ❤️                                 */}
        {/* ================================================================= */}
        <div
          className={`transition-all duration-1000 ease-out max-w-4xl mx-auto px-4 ${
            stage === 4
              ? 'opacity-100 scale-100 translate-y-0 filter-none'
              : 'opacity-0 scale-95 translate-y-4 blur-xs pointer-events-none absolute'
          }`}
        >
          <span className="text-xs sm:text-sm lg:text-base uppercase tracking-[0.45em] text-champagne-400/90 font-sans block mb-4">
            The Celebration Begins
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-normal text-white tracking-tight leading-[1.08] mb-5 text-glow-gold">
            It's Your Day,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-champagne-100 via-roseGold to-crimsonGlow">
              Ayushi ❤️
            </span>
          </h1>
          <p className="text-base sm:text-2xl lg:text-3xl text-champagne-200/90 font-serif italic max-w-2xl mx-auto leading-relaxed">
            "Every second today and always belongs to celebrating you."
          </p>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* THEATRE CURTAIN PANELS (Opens smoothly from the center)               */}
      {/* ===================================================================== */}

      {/* LEFT CURTAIN PANEL */}
      <div
        className="absolute top-0 bottom-0 left-0 w-1/2 z-30 transition-transform duration-[2400ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{
          transform: isCurtainOpen ? 'translateX(-100%)' : 'translateX(0%)',
          background: `
            linear-gradient(to right, rgba(0,0,0,0.65) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.9) 100%),
            repeating-linear-gradient(
              to right,
              #120106 0px,
              #28030e 20px,
              #4d0519 45px,
              #780927 65px,
              #4d0519 85px,
              #28030e 110px,
              #120106 130px
            )
          `,
          boxShadow: 'inset -25px 0 60px rgba(0,0,0,0.95), 15px 0 40px rgba(0,0,0,0.8)',
        }}
      >
        {/* Soft fabric velvet sheen & vertical drapery lighting */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/75 pointer-events-none" />
        {/* Bottom Gold Fringe Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-champagne-600/40 via-champagne-300/70 to-champagne-600/40 border-t border-champagne-400/50 shadow-lg" />
      </div>

      {/* RIGHT CURTAIN PANEL */}
      <div
        className="absolute top-0 bottom-0 right-0 w-1/2 z-30 transition-transform duration-[2400ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{
          transform: isCurtainOpen ? 'translateX(100%)' : 'translateX(0%)',
          background: `
            linear-gradient(to left, rgba(0,0,0,0.65) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.9) 100%),
            repeating-linear-gradient(
              to right,
              #120106 0px,
              #28030e 20px,
              #4d0519 45px,
              #780927 65px,
              #4d0519 85px,
              #28030e 110px,
              #120106 130px
            )
          `,
          boxShadow: 'inset 25px 0 60px rgba(0,0,0,0.95), -15px 0 40px rgba(0,0,0,0.8)',
        }}
      >
        {/* Soft fabric velvet sheen & vertical drapery lighting */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/75 pointer-events-none" />
        {/* Bottom Gold Fringe Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-champagne-600/40 via-champagne-300/70 to-champagne-600/40 border-t border-champagne-400/50 shadow-lg" />
      </div>

      {/* TOP DECORATIVE THEATRE VALANCE (Gentle drapery frame) */}
      <div
        className={`absolute top-0 left-0 right-0 h-12 sm:h-16 z-40 bg-gradient-to-b from-[#140106] to-transparent border-b border-champagne-500/20 transition-opacity duration-1000 pointer-events-none ${
          stage >= 5 ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Subtle Skip CTA for flexibility */}
      <button
        onClick={handleSkip}
        className="absolute bottom-6 right-6 z-40 px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-champagne-500/25 text-[11px] font-serif text-champagne-400 hover:text-champagne-200 transition-colors backdrop-blur-sm cursor-pointer"
        title="Press Esc, Space, or Enter to skip"
      >
        Skip Intro →
      </button>
    </div>
  );
};

export default CurtainIntro;
