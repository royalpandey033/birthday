import React, { useState, useEffect } from 'react';
import { Heart, Infinity, Clock } from 'lucide-react';
import { PERSONAL_DATA } from '../data/content';

export const AnniversaryCounter: React.FC = () => {
  const [elapsed, setElapsed] = useState({
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
  });

  useEffect(() => {
    const calculateElapsed = () => {
      const start = new Date(PERSONAL_DATA.dates.anniversaryStart).getTime();
      const now = new Date().getTime();
      const diffMs = Math.max(0, now - start);

      const totalSeconds = Math.floor(diffMs / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);
      const totalWeeks = Math.floor(totalDays / 7);
      const totalMonths = Math.floor(totalDays / 30.4375);
      const totalYears = (totalDays / 365.25).toFixed(1);

      const hours = totalHours % 24;
      const minutes = totalMinutes % 60;
      const seconds = totalSeconds % 60;

      setElapsed({
        years: parseFloat(totalYears),
        months: totalMonths,
        weeks: totalWeeks,
        days: totalDays,
        hours,
        minutes,
        seconds,
        totalDays,
      });
    };

    calculateElapsed();
    const interval = setInterval(calculateElapsed, 1000);
    return () => clearInterval(interval);
  }, []);

  const milestoneStats = [
    { label: 'Years of Loving You', value: '4', sub: 'Target 17 Nov 2026' },
    { label: 'Months Together', value: '48', sub: 'Shared journeys' },
    { label: 'Weeks of Laughter', value: `~${Math.round(1461 / 7)}`, sub: 'Unfiltered joy' },
    { label: 'Days By Your Side', value: `~${elapsed.totalDays.toLocaleString()}`, sub: 'And counting' },
  ];

  return (
    <section id="four-years" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-wine-800/30 via-crimsonGlow/20 to-champagne-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Monogram / Anniversary Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-wine-900/80 border border-champagne-500/25 text-xs text-champagne-200 mb-6 shadow-glow-sm">
          <Heart className="w-3.5 h-3.5 text-crimsonGlow fill-crimsonGlow animate-pulse" />
          <span className="font-serif tracking-widest uppercase">
            {PERSONAL_DATA.dates.formattedStart} → {PERSONAL_DATA.dates.formattedAnniversary}
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight mb-4">
          Almost Four Years of Us{' '}
          <span className="text-crimsonGlow inline-block">❤️</span>
        </h2>

        {/* Emotional Highlight Statement */}
        <p className="text-base sm:text-xl text-champagne-200/90 font-serif italic max-w-2xl mx-auto mb-14 leading-relaxed">
          "Four years, countless memories, and still more stories to write."
        </p>

        {/* Four Big Milestones Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {milestoneStats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-champagne-500/5 rounded-bl-full pointer-events-none group-hover:bg-crimsonGlow/10 transition-colors" />

              <span className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-transparent bg-clip-text bg-gradient-to-b from-champagne-100 via-champagne-300 to-roseGold mb-2">
                {stat.value}
              </span>

              <span className="text-xs sm:text-sm font-serif text-white tracking-wide mb-1">
                {stat.label}
              </span>

              <span className="text-[10px] sm:text-xs text-champagne-400/60 font-sans uppercase tracking-wider">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Live Real-Time Ticking Counter Ribbon */}
        <div className="glass-panel rounded-2xl p-6 max-w-2xl mx-auto border border-champagne-500/20 shadow-glass">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-champagne-400 mb-4 font-sans">
            <Clock className="w-3.5 h-3.5 text-champagne-400" />
            <span>Precise Time Spent In Love</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-center">
            <div>
              <span className="block text-xl sm:text-2xl font-serif text-white">
                {elapsed.days}
              </span>
              <span className="text-[10px] uppercase text-champagne-400/70 tracking-widest">
                Days
              </span>
            </div>

            <span className="text-champagne-500/30 text-lg">:</span>

            <div>
              <span className="block text-xl sm:text-2xl font-serif text-white">
                {String(elapsed.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase text-champagne-400/70 tracking-widest">
                Hours
              </span>
            </div>

            <span className="text-champagne-500/30 text-lg">:</span>

            <div>
              <span className="block text-xl sm:text-2xl font-serif text-white">
                {String(elapsed.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase text-champagne-400/70 tracking-widest">
                Minutes
              </span>
            </div>

            <span className="text-champagne-500/30 text-lg">:</span>

            <div>
              <span className="block text-xl sm:text-2xl font-serif text-crimsonGlow animate-pulse">
                {String(elapsed.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase text-champagne-400/70 tracking-widest">
                Seconds
              </span>
            </div>
          </div>
        </div>

        {/* Monogram Bottom Touch */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-champagne-400/60 font-serif italic">
          <Infinity className="w-3.5 h-3.5 text-crimsonGlow" />
          <span>Every tick marks a memory cherished with Ayushi</span>
        </div>
      </div>
    </section>
  );
};
