import React, { useState, useEffect } from 'react';
import { Sparkles, SkipForward, RotateCcw, X, Film } from 'lucide-react';

interface CinematicOpeningProps {
  isOpen: boolean;
  onClose: () => void;
  onEnterHero: () => void;
}

export const CinematicOpening: React.FC<CinematicOpeningProps> = ({
  isOpen,
  onClose,
  onEnterHero,
}) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setStage(0);
      return;
    }

    const timers = [
      setTimeout(() => setStage(1), 600),   // Stage 1: "A Little Story About Us"
      setTimeout(() => setStage(2), 2200),  // Stage 2: "For Ayushi"
      setTimeout(() => setStage(3), 4000),  // Stage 3: "3 October 2026 • A Four-Year Journey"
      setTimeout(() => setStage(4), 5800),  // Stage 4: Enter CTA
    ];

    return () => timers.forEach(clearTimeout);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'Space') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSkip = () => {
    onClose();
    onEnterHero();
  };

  const handleReplay = () => {
    setStage(0);
    setTimeout(() => setStage(1), 400);
    setTimeout(() => setStage(2), 2000);
    setTimeout(() => setStage(3), 3800);
    setTimeout(() => setStage(4), 5500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070205] flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none animate-fadeIn">
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-wine-900/20 rounded-full blur-[170px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-roseGold/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Bar Controls */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-serif text-champagne-400/80 uppercase tracking-widest">
          <Film className="w-3.5 h-3.5 text-roseGold" />
          <span>Cinematic Opening Scene</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSkip}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-wine-950/80 hover:bg-wine-900 border border-champagne-500/25 text-xs text-champagne-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>Skip Intro</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-wine-950/80 hover:bg-wine-900 border border-champagne-500/25 text-champagne-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close opening"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Center Main Stage Content */}
      <div className="relative z-10 max-w-3xl mx-auto my-auto text-center flex flex-col items-center justify-center space-y-8">
        
        {/* Stage 1: "A Little Story About Us" */}
        <div
          className={`transition-all duration-1000 ease-out ${
            stage >= 1
              ? 'opacity-100 translate-y-0 filter-none'
              : 'opacity-0 translate-y-6 blur-sm'
          }`}
        >
          <span className="text-xs sm:text-sm uppercase tracking-[0.35em] text-champagne-400/70 font-sans block mb-2">
            Presents
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight leading-tight">
            A Little Story About Us
          </h2>
        </div>

        {/* Stage 2: "For Ayushi" */}
        <div
          className={`transition-all duration-1000 ease-out ${
            stage >= 2
              ? 'opacity-100 translate-y-0 filter-none'
              : 'opacity-0 translate-y-6 blur-sm'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-wine-900/80 border border-champagne-400/30 text-roseGold text-lg sm:text-2xl font-serif shadow-glow-sm">
            <Sparkles className="w-4 h-4 text-champagne-300 animate-pulse" />
            <span>For Ayushi ❤️</span>
          </div>
        </div>

        {/* Stage 3: "3 October 2026 • A Four-Year Journey" */}
        <div
          className={`transition-all duration-1000 ease-out ${
            stage >= 3
              ? 'opacity-100 translate-y-0 filter-none'
              : 'opacity-0 translate-y-6 blur-sm'
          }`}
        >
          <p className="text-sm sm:text-lg text-champagne-200/85 font-serif italic max-w-xl mx-auto leading-relaxed">
            "Four years of memories, countess little moments, and a story that's still being written."
          </p>
        </div>

        {/* Stage 4: Enter Story CTA */}
        <div
          className={`pt-6 transition-all duration-1000 ease-out flex items-center justify-center gap-4 ${
            stage >= 4
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-6 scale-95'
          }`}
        >
          <button
            onClick={handleSkip}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-wine-700 via-crimsonGlow to-champagne-500 text-white text-xs font-serif uppercase tracking-[0.2em] shadow-glow-md hover:scale-105 transition-all cursor-pointer"
          >
            <span>Begin Our Story →</span>
          </button>

          <button
            onClick={handleReplay}
            className="p-3 rounded-full bg-wine-950/80 hover:bg-wine-900 border border-champagne-500/25 text-champagne-300 hover:text-white transition-colors cursor-pointer"
            title="Replay Opening"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Bottom Footer Note */}
      <div className="relative z-10 w-full text-center text-[11px] text-champagne-400/50 font-serif italic">
        <span>3 October 2026 • Private Theatre Edition</span>
      </div>
    </div>
  );
};
