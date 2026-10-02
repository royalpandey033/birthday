import React from 'react';
import { Calendar, Heart, Quote } from 'lucide-react';
import { PERSONAL_DATA, type Milestone } from '../data/content';

interface TimelineProps {
  onPhotoClick?: (image: string, caption: string) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ onPhotoClick }) => {
  return (
    <section id="journey" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-wine-900/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-crimsonGlow/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-wine-900/80 border border-champagne-500/20 text-xs text-champagne-300 mb-4">
            <Heart className="w-3 h-3 text-crimsonGlow fill-crimsonGlow" />
            <span className="font-serif tracking-widest uppercase text-[11px]">
              17 Nov 2022 — 2026
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight mb-4">
            Our Journey Through The Years
          </h2>
          <p className="text-sm sm:text-base text-champagne-200/70 font-light leading-relaxed">
            Every year had its own season, its own lessons, and its own reasons why loving you was the easiest choice.
          </p>
        </div>

        {/* Timeline Track */}
        <div className="relative">
          {/* Vertical Center Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-12 w-[1.5px] -translate-x-1/2 bg-gradient-to-b from-champagne-400/40 via-crimsonGlow/40 to-transparent" />
          
          {/* Vertical Line for Mobile */}
          <div className="block md:hidden absolute left-5 top-4 bottom-12 w-[1.5px] bg-gradient-to-b from-champagne-400/40 via-crimsonGlow/40 to-transparent" />

          {/* Milestone Items */}
          <div className="space-y-16 sm:space-y-24">
            {PERSONAL_DATA.milestones.map((item: Milestone, index: number) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Central Dot */}
                  <div className="absolute left-5 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-noir border-2 border-champagne-400 flex items-center justify-center z-20 shadow-glow-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-crimsonGlow animate-ping" />
                    <span className="absolute w-2 h-2 rounded-full bg-champagne-300" />
                  </div>

                  {/* Content Card Side */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-10">
                    <div className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 relative overflow-hidden group">
                      {/* Top Year & Date Header */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span className="text-2xl sm:text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-champagne-200 to-champagne-400 font-bold">
                          {item.year}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-champagne-300/80 bg-noir/50 px-3 py-1 rounded-full border border-champagne-500/15">
                          <Calendar className="w-3 h-3 text-champagne-400" />
                          <span>{item.date}</span>
                        </div>
                      </div>

                      {/* Milestone Title */}
                      <h3 className="text-xl sm:text-2xl font-serif text-white mb-3">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-champagne-100/80 leading-relaxed font-light mb-6">
                        {item.description}
                      </p>

                      {/* Quote pill */}
                      {item.quote && (
                        <div className="flex items-center gap-2 p-3 rounded-2xl bg-wine-950/60 border border-champagne-500/10 text-xs italic font-serif text-champagne-300">
                          <Quote className="w-3.5 h-3.5 text-crimsonGlow shrink-0" />
                          <span>"{item.quote}"</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Image Card Side */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-10 mt-6 md:mt-0">
                    <div
                      className="relative rounded-3xl overflow-hidden border border-champagne-500/25 group cursor-pointer shadow-glass bg-noir/90 flex items-center justify-center min-h-[320px] sm:min-h-[400px] max-h-[540px]"
                      onClick={() => onPhotoClick?.(item.image, `${item.year} — ${item.title}`)}
                    >
                      {/* Blurred ambient background so the container is filled with warm colors */}
                      <img
                        src={item.image}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none"
                      />

                      {/* Full foreground uncropped photo */}
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="relative z-10 max-h-[500px] w-auto max-w-full object-contain p-2 sm:p-3 transform transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-noir/85 via-transparent to-transparent pointer-events-none z-10" />

                      {/* Tag Badge */}
                      <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-noir/80 backdrop-blur-md border border-champagne-500/30 text-[11px] font-sans tracking-wider uppercase text-champagne-200">
                        {item.tag}
                      </div>

                      {/* Bottom Caption Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs text-champagne-300">
                        <span className="font-serif italic truncate max-w-[80%] text-champagne-200">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-champagne-400 border-b border-champagne-400/60 font-medium">
                          Full View
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
