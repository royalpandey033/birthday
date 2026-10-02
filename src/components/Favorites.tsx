import React from 'react';
import {
  Heart,
  Music,
  MapPin,
  Sparkles,
  Smile,
  UtensilsCrossed,
  PhoneCall,
  Camera,
  Bookmark,
} from 'lucide-react';
import { PERSONAL_DATA, type FavoriteItem } from '../data/content';

export const Favorites: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Music':
        return <Music className="w-5 h-5 text-champagne-400" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5 text-roseGold" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-champagne-300" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-champagne-400" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5 text-roseGold" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-crimsonGlow fill-crimsonGlow" />;
      case 'PhoneCall':
        return <PhoneCall className="w-5 h-5 text-champagne-400" />;
      case 'Camera':
        return <Camera className="w-5 h-5 text-champagne-300" />;
      default:
        return <Bookmark className="w-5 h-5 text-champagne-400" />;
    }
  };

  return (
    <section id="favorites" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Radiance */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-wine-800/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-wine-900/80 border border-champagne-500/20 text-xs text-champagne-300 mb-4">
            <Heart className="w-3.5 h-3.5 text-crimsonGlow fill-crimsonGlow" />
            <span className="font-serif tracking-widest uppercase text-[11px]">
              The Little Things
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight mb-4">
            Our Favorite Things
          </h2>
          <p className="text-sm sm:text-base text-champagne-200/70 font-light leading-relaxed">
            The small rituals, quirks, and places that make our story special.
          </p>
        </div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PERSONAL_DATA.favorites.map((item: FavoriteItem) => (
            <div
              key={item.id}
              className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-7 relative overflow-hidden group border border-champagne-500/15 shadow-glass flex flex-col justify-between"
            >
              <div>
                {/* Category Pill and Icon */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] uppercase tracking-widest text-champagne-400/80 font-sans font-medium">
                    {item.category}
                  </span>
                  <div className="w-9 h-9 rounded-2xl bg-noir/70 border border-champagne-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(item.iconName)}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg text-white mb-2 group-hover:text-champagne-300 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-champagne-200/70 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Note pill if present */}
              {item.note && (
                <div className="mt-5 pt-3 border-t border-champagne-500/10 flex items-center justify-between text-[11px] text-champagne-400/70 font-serif italic">
                  <span>{item.note}</span>
                  <span className="text-crimsonGlow">♡</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
