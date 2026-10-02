import React from 'react';
import { Heart, Feather } from 'lucide-react';
import { PERSONAL_DATA } from '../data/content';

export const PersonalIntro: React.FC = () => {
  return (
    <section id="story" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Soft Ambient Radiance */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-wine-700/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Subtle Section Tag */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="h-[1px] w-10 bg-gradient-to-r from-transparent to-champagne-400/40" />
          <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-champagne-400">
            {PERSONAL_DATA.personalIntro.tagline}
          </span>
          <span className="h-[1px] w-10 bg-gradient-to-l from-transparent to-champagne-400/40" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-serif text-white text-center mb-10 tracking-tight leading-tight">
          To My Favorite Person
        </h2>

        {/* Card with subtle paper border and quotes */}
        <div className="glass-panel rounded-3xl p-8 sm:p-14 border border-champagne-500/20 relative shadow-2xl">
          <div className="absolute -top-3 left-10 px-4 py-0.5 rounded-full bg-wine-900 border border-champagne-500/30 text-champagne-300 text-xs font-serif italic flex items-center gap-1.5">
            <Feather className="w-3 h-3 text-champagne-400" />
            <span>A personal note</span>
          </div>

          <div className="space-y-6 text-champagne-100/90 text-base sm:text-lg leading-relaxed font-light">
            {PERSONAL_DATA.personalIntro.paragraphs.map((p, idx) => (
              <p key={idx} className="first-letter:text-3xl first-letter:font-serif first-letter:text-champagne-300 first-letter:mr-1">
                {p}
              </p>
            ))}
          </div>

          {/* Signature & Monogram Footer */}
          <div className="mt-10 pt-8 border-t border-champagne-500/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-champagne-400/60 font-sans mb-1">
                {PERSONAL_DATA.personalIntro.signoff}
              </p>
              <p className="text-2xl font-serif text-white tracking-wide">
                {PERSONAL_DATA.personalIntro.author}
              </p>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center px-4 py-2 rounded-2xl bg-noir/50 border border-champagne-500/15">
              <Heart className="w-4 h-4 text-crimsonGlow fill-crimsonGlow" />
              <span className="font-serif tracking-widest text-xs text-champagne-300">
                {PERSONAL_DATA.names.monogram}
              </span>
              <span className="text-[11px] text-champagne-400/60">
                Since Nov 17, 2022
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
