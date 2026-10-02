import React from 'react';
import { Sparkles, Heart, Gift } from 'lucide-react';
import { PERSONAL_DATA } from '../data/content';

export const BirthdayCountdown: React.FC = () => {
  return (
    <section id="birthday-countdown" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Soft Ambient Breathing Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-wine-800/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        <div className="glass-panel rounded-3xl p-8 sm:p-14 border border-champagne-500/20 text-center relative overflow-hidden shadow-2xl">
          {/* Subtle Top Accent Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne-400 to-transparent opacity-60" />

          {/* Date Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wine-900/80 border border-champagne-500/20 text-xs text-champagne-300 mb-6 shadow-glow-sm">
            <Sparkles className="w-3.5 h-3.5 text-champagne-400 animate-pulse" />
            <span className="font-serif tracking-widest uppercase text-[11px]">
              {PERSONAL_DATA.dates.formattedBirthday}
            </span>
          </div>

          {/* Heart Emblem */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-crimsonGlow/15 border border-crimsonGlow/35 flex items-center justify-center text-roseGold shadow-glow-md">
            <Heart className="w-8 h-8 fill-roseGold/30 text-roseGold" />
          </div>

          {/* Primary Permanent Birthday-Day Heading */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white mb-4 tracking-tight leading-tight">
            It's Your Day,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-champagne-200 via-roseGold to-crimsonGlow">
              Ayushi ❤️
            </span>
          </h2>

          <p className="text-base sm:text-xl text-champagne-200/90 max-w-xl mx-auto leading-relaxed mb-6 font-serif italic">
            "May your birthday be as gentle, bright, and deeply loved as you make my life feel every single day."
          </p>

          {/* Celebration Tag */}
          <div className="inline-flex items-center gap-2 text-xs text-roseGold font-sans tracking-widest uppercase py-2 px-6 rounded-full bg-wine-900/80 border border-crimsonGlow/30 shadow-glow-sm">
            <Gift className="w-3.5 h-3.5 text-champagne-300" />
            <span>Celebrating The Most Special Person</span>
          </div>
        </div>
      </div>
    </section>
  );
};
