import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { PERSONAL_DATA } from '../data/content';

export const FinalSection: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-champagne-500/15">
      {/* Background Radiance */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-t from-wine-900/40 via-crimsonGlow/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center">
        {/* Subtle Tagline */}
        <span className="text-xs uppercase tracking-[0.25em] text-champagne-400/80 font-sans mb-4 block">
          {PERSONAL_DATA.finalSection.tagline}
        </span>

        {/* Emotional Message */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight mb-4">
          {PERSONAL_DATA.finalSection.message1}
        </h2>

        <p className="text-xl sm:text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-champagne-200 via-roseGold to-crimsonGlow mb-6">
          {PERSONAL_DATA.finalSection.birthdayWish}
        </p>

        {/* Date Timeline */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-wine-900/60 border border-champagne-500/20 text-xs sm:text-sm text-champagne-300 font-serif mb-12 shadow-glow-sm">
          <Heart className="w-3.5 h-3.5 text-crimsonGlow fill-crimsonGlow" />
          <span>{PERSONAL_DATA.finalSection.journeyTimeline}</span>
        </div>

        {/* Final Cherished Photograph Frame */}
        <div className="relative max-w-md w-full rounded-3xl overflow-hidden glass-panel border border-champagne-500/30 p-3 sm:p-4 mb-12 shadow-2xl group">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-noir/80 flex items-center justify-center">
            <img
              src={PERSONAL_DATA.finalSection.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none"
            />
            <img
              src={PERSONAL_DATA.finalSection.image}
              alt="Ayushi"
              loading="lazy"
              className="relative z-10 max-h-full max-w-full object-contain transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent z-10" />
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="text-xs font-serif italic text-champagne-200">
                "Our story has only just begun."
              </span>
            </div>
          </div>
        </div>

        {/* Monogram Seal */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-full bg-wine-900 border border-champagne-400/40 flex items-center justify-center text-roseGold font-serif text-lg shadow-glow-sm">
            ♡
          </div>
          <span className="text-xs uppercase tracking-widest text-champagne-400/80 font-sans">
            {PERSONAL_DATA.names.combined}
          </span>
          <p className="text-xs text-champagne-400/50 font-serif italic">
            {PERSONAL_DATA.finalSection.footerQuote}
          </p>
        </div>

        {/* Scroll To Top Button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-noir/60 border border-champagne-500/15 text-xs text-champagne-400 hover:text-white hover:border-champagne-400/40 transition-colors"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Return To Top</span>
        </button>
      </div>
    </footer>
  );
};
