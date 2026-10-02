import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Volume2, Sparkles } from 'lucide-react';
import { PERSONAL_DATA } from '../data/content';

interface HeroProps {
  onEnterStory: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onEnterStory,
  isPlayingMusic,
  onToggleMusic,
}) => {
  // Staged cinematic reveal stages (0 to 7) matching exact prompt requirements:
  // 0.0s: Dark screen with subtle ambient glow
  // 0.5s: Tiny particles begin appearing
  // 1.0s: Background lighting slowly becomes visible
  // 1.2s: Hero photograph begins revealing
  // 1.5s: "Happy Birthday, Ayushi ❤️" fades in
  // 1.8s: Date appears
  // 2.0s: Supporting text appears
  // 2.3s: "Enter Our Story →" appears
  const [stage, setStage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Multi-layer mouse parallax coordinates (normalized -1 to 1)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, sheenX: 50, sheenY: 50 });
  const photoCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia('(max-width: 768px)').matches ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Timed cinematic entrance sequence
    const timers = [
      setTimeout(() => setStage(1), 500),  // 0.5s: particles active
      setTimeout(() => setStage(2), 1000), // 1.0s: background lighting visible
      setTimeout(() => setStage(3), 1200), // 1.2s: photograph begins revealing
      setTimeout(() => setStage(4), 1500), // 1.5s: main heading fades in
      setTimeout(() => setStage(5), 1800), // 1.8s: date badge appears
      setTimeout(() => setStage(6), 2000), // 2.0s: supporting text appears
      setTimeout(() => setStage(7), 2300), // 2.3s: CTA button & scroll indicator appear
    ];

    return () => {
      window.removeEventListener('resize', checkMobile);
      timers.forEach(clearTimeout);
    };
  }, []);

  // Mouse Parallax for hero layers
  const handleContainerMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) return;
    const { innerWidth, innerHeight } = window;
    const normX = (e.clientX / innerWidth) * 2 - 1; // -1 to 1
    const normY = (e.clientY / innerHeight) * 2 - 1; // -1 to 1
    setMousePos({ x: normX, y: normY });

    // Photo card 3D tilt calculation
    if (photoCardRef.current) {
      const rect = photoCardRef.current.getBoundingClientRect();
      const cardX = e.clientX - rect.left;
      const cardY = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle tilt: max 5.5 degrees
      const rotX = ((cardY - centerY) / centerY) * -5.5;
      const rotY = ((cardX - centerX) / centerX) * 5.5;
      const sheenX = (cardX / rect.width) * 100;
      const sheenY = (cardY / rect.height) * 100;

      setTilt({ rotateX: rotX, rotateY: rotY, sheenX, sheenY });
    }
  };

  const handleContainerMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setTilt({ rotateX: 0, rotateY: 0, sheenX: 50, sheenY: 50 });
  };

  // Cinematic section transition when clicking CTA
  const handleEnterClick = () => {
    setIsTransitioning(true);
    // Smooth cinematic transition sweep before scrolling
    setTimeout(() => {
      onEnterStory();
      setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
    }, 450);
  };

  // Multi-layer parallax offsets
  const bgOffsetX = isMobile ? 0 : mousePos.x * 8;
  const bgOffsetY = isMobile ? 0 : mousePos.y * 8;
  const textOffsetX = isMobile ? 0 : mousePos.x * 6;
  const textOffsetY = isMobile ? 0 : mousePos.y * 6;
  const photoOffsetX = isMobile ? 0 : mousePos.x * 14;
  const photoOffsetY = isMobile ? 0 : mousePos.y * 14;

  return (
    <section
      onMouseMove={handleContainerMouseMove}
      onMouseLeave={handleContainerMouseLeave}
      className="relative min-h-screen flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-8 sm:pt-12 pb-8 sm:pb-10 select-none"
    >
      {/* 1. LAYERED CINEMATIC LIGHTING: Deep black, dark wine, burgundy, soft pink glow */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-out ${
          stage >= 2 ? 'opacity-100' : 'opacity-20'
        }`}
      >
        {/* Central warm blurred light source */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[950px] h-[600px] bg-gradient-to-tr from-wine-900/50 via-crimsonGlow/25 to-champagne-400/15 rounded-full blur-[150px] transition-transform duration-700 ease-out"
          style={{
            transform: `translate(calc(-50% + ${bgOffsetX}px), calc(-50% + ${bgOffsetY}px))`,
            animation: 'pulseGlow 10s ease-in-out infinite',
          }}
        />

        {/* Deep wine secondary ambient orb */}
        <div
          className="absolute top-1/4 left-10 w-[380px] h-[380px] bg-wine-950/70 rounded-full blur-[120px] transition-transform duration-700 ease-out"
          style={{
            transform: `translate(${-bgOffsetX * 0.7}px, ${-bgOffsetY * 0.7}px)`,
            animation: 'floatSlow 14s ease-in-out infinite',
          }}
        />

        {/* Soft rose-gold highlight orb */}
        <div
          className="absolute bottom-1/4 right-10 w-[420px] h-[420px] bg-roseGold/10 rounded-full blur-[140px] transition-transform duration-700 ease-out"
          style={{
            transform: `translate(${bgOffsetX * 0.6}px, ${bgOffsetY * 0.6}px)`,
            animation: 'floatGentle 11s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* Cinematic Transition Sweep Overlay (Triggered on CTA click) */}
      <div
        className={`fixed inset-0 z-50 pointer-events-none bg-gradient-to-b from-champagne-300/15 via-wine-950/95 to-noir backdrop-blur-md transition-all duration-700 ease-out ${
          isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      />

      {/* Main Center Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center text-center my-auto">

        {/* 1.8s Milestone: Date Badge */}
        <div
          className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-wine-950/80 border border-champagne-500/20 backdrop-blur-md mb-6 shadow-glow-sm transition-all duration-700 ease-out ${
            stage >= 5
              ? 'opacity-100 translate-y-0 filter-none'
              : 'opacity-0 -translate-y-3 blur-xs'
          }`}
          style={{
            transform: stage >= 5 ? `translate3d(${textOffsetX * 0.4}px, ${textOffsetY * 0.4}px, 0)` : undefined,
          }}
        >
          <Sparkles className="w-3.5 h-3.5 text-champagne-300 animate-pulse" />
          <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-champagne-200">
            For Ayushi
          </span>
          <span className="text-champagne-500/40 text-xs">•</span>
          <span className="text-[11px] font-sans text-roseGold tracking-wider font-medium">
            {PERSONAL_DATA.hero.dateBadge}
          </span>
        </div>

        {/* 1.5s Milestone: Main Heading with Sophisticated Serif */}
        <div
          className={`transition-all duration-1000 ease-out ${
            stage >= 4
              ? 'opacity-100 translate-y-0 filter-none'
              : 'opacity-0 translate-y-5 blur-sm'
          }`}
          style={{
            transform: stage >= 4 ? `translate3d(${textOffsetX}px, ${textOffsetY}px, 0)` : undefined,
          }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-white tracking-tight leading-[1.08] mb-4 text-glow-gold">
            Happy Birthday,{' '}
            <span className="relative inline-block font-normal text-transparent bg-clip-text bg-gradient-to-r from-champagne-100 via-roseGold to-champagne-300">
              Ayushi ❤️
            </span>
          </h1>
        </div>

        {/* 2.0s Milestone: Supporting Text */}
        <div
          className={`transition-all duration-1000 ease-out max-w-xl mx-auto mb-6 sm:mb-8 ${
            stage >= 6
              ? 'opacity-100 translate-y-0 filter-none'
              : 'opacity-0 translate-y-4 blur-xs'
          }`}
          style={{
            transform: stage >= 6 ? `translate3d(${textOffsetX * 0.7}px, ${textOffsetY * 0.7}px, 0)` : undefined,
          }}
        >
          <p className="text-sm sm:text-base md:text-lg text-champagne-200/90 font-light leading-relaxed font-sans tracking-wide">
            "{PERSONAL_DATA.hero.subtleLine}"
          </p>
        </div>

        {/* 1.2s Milestone: Hero Photograph with Cinematic Reveal & Parallax */}
        <div
          className={`relative my-2 sm:my-3 transition-all duration-1000 ease-out ${
            stage >= 3
              ? 'opacity-100 scale-100 filter-none'
              : 'opacity-20 scale-95 blur-md'
          }`}
          style={{
            perspective: '1000px',
            transform: stage >= 3 ? `translate3d(${photoOffsetX}px, ${photoOffsetY}px, 0)` : undefined,
          }}
        >
          <div
            ref={photoCardRef}
            className={`photo-card relative rounded-3xl overflow-hidden glass-panel border border-champagne-400/25 transition-all duration-300 cursor-pointer shadow-glass ${
              stage >= 3 ? 'hover:shadow-glow-gold hover:border-champagne-300/45' : ''
            } ${isMobile ? 'animate-float-gentle' : ''}`}
            style={{
              transform: !isMobile
                ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.015, 1.015, 1.015)`
                : undefined,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Photo Container */}
            <div className="relative w-[280px] sm:w-[380px] md:w-[440px] aspect-[4/3] overflow-hidden bg-noir/90 flex items-center justify-center">
              {/* Ambient blurred background */}
              <img
                src={PERSONAL_DATA.hero.heroImage}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none"
              />
              {/* Uncropped foreground photo */}
              <img
                src={PERSONAL_DATA.hero.heroImage}
                alt="Ayushi"
                className={`relative z-10 max-h-full max-w-full object-contain transition-all duration-1000 ease-out ${
                  stage >= 3
                    ? 'blur-0 opacity-100 scale-100'
                    : 'blur-md opacity-25 scale-105'
                }`}
              />

              {/* Gentle Cinematic Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent pointer-events-none" />

              {/* Subtle Specular Light Sheen across glass surface */}
              {!isMobile && (
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-35 mix-blend-overlay"
                  style={{
                    background: `radial-gradient(circle at ${tilt.sheenX}% ${tilt.sheenY}%, rgba(255,255,255,0.65) 0%, rgba(223,164,95,0.2) 30%, transparent 65%)`,
                  }}
                />
              )}

              {/* Bottom Minimal Ribbon */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-champagne-200/90 font-serif">
                <span className="italic tracking-wide">For Ayushi</span>
                <span className="font-mono text-champagne-400/80 text-[10px] tracking-wider uppercase">
                  3 Oct 2026
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2.3s Milestone: CTA Button (Upgraded Glassmorphism) */}
        <div
          className={`mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-4 transition-all duration-700 ease-out ${
            stage >= 7
              ? 'opacity-100 translate-y-0 filter-none'
              : 'opacity-0 translate-y-4 blur-xs'
          }`}
          style={{
            transform: stage >= 7 ? `translate3d(${textOffsetX * 0.5}px, ${textOffsetY * 0.5}px, 0)` : undefined,
          }}
        >
          {/* Main Glass Button */}
          <button
            onClick={handleEnterClick}
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-wine-950/40 hover:bg-wine-900/60 border border-champagne-400/30 hover:border-champagne-300 text-white font-medium text-sm tracking-widest uppercase shadow-glow-sm hover:shadow-glow-gold hover:scale-105 transition-all duration-300 backdrop-blur-xl overflow-hidden cursor-pointer"
          >
            {/* Subtle Light Sweep Sheen on Hover */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

            <span className="text-champagne-100 font-sans tracking-[0.2em] relative z-10">
              {PERSONAL_DATA.hero.cta}
            </span>
            <span className="text-champagne-400 group-hover:translate-x-1.5 transition-transform duration-300 relative z-10">
              →
            </span>
          </button>

          {/* Soundtrack Ambient Button */}
          <button
            onClick={onToggleMusic}
            className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-xs font-medium border transition-all duration-300 backdrop-blur-md cursor-pointer ${
              isPlayingMusic
                ? 'bg-crimsonGlow/15 border-crimsonGlow/40 text-roseGold shadow-glow-sm'
                : 'bg-wine-950/70 border-champagne-500/20 text-champagne-300 hover:border-champagne-400/40'
            }`}
            title="Toggle romantic ambient music"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isPlayingMusic ? 'text-crimsonGlow animate-pulse' : ''}`} />
            <span>{isPlayingMusic ? 'Soundtrack Playing' : 'Play Our Song ♫'}</span>
          </button>
        </div>
      </div>

      {/* 2.3s Milestone: Scroll Indicator */}
      <div
        onClick={handleEnterClick}
        className={`relative z-10 mt-6 flex flex-col items-center gap-1.5 text-champagne-400/60 hover:text-champagne-200 transition-all duration-700 cursor-pointer ${
          stage >= 7 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        <span className="text-[11px] font-sans uppercase tracking-[0.24em]">
          {PERSONAL_DATA.hero.scrollText}
        </span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-champagne-400/70" />
      </div>
    </section>
  );
};
