import React, { useState, useEffect } from 'react';
import { Gift, Heart, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_DATA } from '../data/content';

export const Surprise: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsRevealed(false);
      }
    };
    if (isRevealed) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRevealed]);

  const handleOpenSurprise = () => {
    setIsRevealed(true);
    // Soft elegant stardust burst
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#dfa45f', '#e9a89b', '#d83a56', '#ffffff'],
      ticks: 240,
      gravity: 0.7,
      scalar: 0.9,
    });
  };

  const handleClose = () => {
    setIsRevealed(false);
  };

  return (
    <section id="surprise" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-wine-700/30 via-crimsonGlow/25 to-champagne-500/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Surprise Teaser Box */}
        <div className="glass-panel rounded-3xl p-10 sm:p-16 border border-champagne-500/25 relative overflow-hidden shadow-glass">
          {/* Subtle Ribbon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-wine-900/80 border border-champagne-400/40 flex items-center justify-center text-champagne-300 shadow-glow-sm">
            <Gift className="w-8 h-8 text-roseGold animate-pulse" />
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight mb-4">
            {PERSONAL_DATA.surprise.teaserHeading}
          </h2>

          <p className="text-sm sm:text-base text-champagne-200/70 font-light max-w-md mx-auto mb-10 leading-relaxed font-serif italic">
            "{PERSONAL_DATA.surprise.teaserSub}"
          </p>

          <button
            onClick={handleOpenSurprise}
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-wine-700 via-crimsonGlow to-champagne-500 text-white font-medium text-sm tracking-wide shadow-glow-md hover:shadow-glow-lg hover:scale-105 transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-champagne-200" />
            <span>{PERSONAL_DATA.surprise.openButtonText}</span>
            <Heart className="w-4 h-4 fill-white text-white group-hover:scale-125 transition-transform" />
          </button>
        </div>
      </div>

      {/* Fullscreen Cinematic Surprise Reveal Modal */}
      {isRevealed && (
        <div
          className="fixed inset-0 z-50 bg-noir/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={handleClose}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 p-3 rounded-full bg-wine-900/80 border border-champagne-500/30 text-champagne-200 hover:text-white hover:border-champagne-400 z-50 shadow-glow-sm"
            aria-label="Close surprise"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Message Card */}
          <div
            className="glass-panel rounded-3xl max-w-2xl w-full p-8 sm:p-14 border border-champagne-500/30 text-center relative shadow-2xl animate-float-gentle"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-crimsonGlow/20 border border-crimsonGlow/40 flex items-center justify-center text-crimsonGlow shadow-glow-sm">
              <Heart className="w-6 h-6 fill-current" />
            </div>

            <h3 className="text-3xl sm:text-4xl font-serif text-white mb-6">
              {PERSONAL_DATA.surprise.revealTitle}
            </h3>

            <div className="space-y-5 text-base sm:text-lg text-champagne-100 font-light leading-relaxed font-serif">
              {PERSONAL_DATA.surprise.revealText.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-champagne-500/15 flex flex-col items-center gap-1">
              <span className="text-xs uppercase tracking-widest text-champagne-400 font-sans">
                {PERSONAL_DATA.surprise.closing}
              </span>
              <span className="text-2xl font-serif text-white tracking-wide">
                {PERSONAL_DATA.surprise.signature}
              </span>
              <span className="text-xs text-champagne-400/60 font-serif italic mt-1">
                3 October 2026 • Your Special Day
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
