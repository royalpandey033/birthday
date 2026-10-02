import React, { useState, useEffect, useRef } from 'react';
import { Key, Sparkles, X, ChevronRight, ChevronLeft, RotateCcw, Music, Heart, Calendar } from 'lucide-react';
import { PERSONAL_DATA } from '../data/content';
import { romanticAudio } from '../utils/romanticAudio';

interface SecretSurpriseProps {
  isPlayingMusic: boolean;
  onEnsureMusicPlaying: () => void;
}

type SurpriseStage =
  | 'teaser'
  | 'discovering'
  | 'intro'
  | 'timeline'
  | 'birthday'
  | 'memory'
  | 'future'
  | 'ending';

export const SecretSurprise: React.FC<SecretSurpriseProps> = ({
  isPlayingMusic,
  onEnsureMusicPlaying,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<SurpriseStage>('teaser');
  const [isTeaserInView, setIsTeaserInView] = useState(false);
  const [savedVolume, setSavedVolume] = useState<number | null>(null);

  const teaserRef = useRef<HTMLDivElement | null>(null);
  const data = PERSONAL_DATA.secretSurprise;

  // Scroll observer for teaser
  useEffect(() => {
    const el = teaserRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTeaserInView(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while secret room is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Volume ducking during intimate reading stages
  useEffect(() => {
    if (isOpen && isPlayingMusic) {
      if (savedVolume === null) {
        const currentVol = romanticAudio.getVolume();
        setSavedVolume(currentVol);
      }
      if (stage === 'birthday' || stage === 'memory') {
        romanticAudio.setVolume(0.35);
      } else if (savedVolume !== null) {
        romanticAudio.setVolume(savedVolume);
      }
    }
  }, [stage, isOpen, isPlayingMusic, savedVolume]);

  // 13. Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight' && stage !== 'ending') {
        handleNext();
      } else if (e.key === 'ArrowLeft' && stage !== 'intro' && stage !== 'teaser') {
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, stage]);

  // 2. Discovery interaction
  const handleStartDiscovery = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsOpen(true);
      setStage('intro');
      return;
    }

    setStage('discovering');

    setTimeout(() => {
      setIsOpen(true);
      setStage('intro');
    }, 1300);
  };

  const handleNext = () => {
    if (stage === 'intro') setStage('timeline');
    else if (stage === 'timeline') setStage('birthday');
    else if (stage === 'birthday') setStage('memory');
    else if (stage === 'memory') setStage('future');
    else if (stage === 'future') setStage('ending');
  };

  const handleBack = () => {
    if (stage === 'timeline') setStage('intro');
    else if (stage === 'birthday') setStage('timeline');
    else if (stage === 'memory') setStage('birthday');
    else if (stage === 'future') setStage('memory');
    else if (stage === 'ending') setStage('future');
  };

  const handleReplay = () => {
    setStage('intro');
  };

  const handleClose = () => {
    if (savedVolume !== null) {
      romanticAudio.setVolume(savedVolume);
      setSavedVolume(null);
    }
    setIsOpen(false);
    setStage('teaser');
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. HIDDEN TEASER SECTION (Near the end of the page)                        */}
      {/* ========================================================================= */}
      <section
        id="secret-teaser"
        ref={teaserRef}
        className="relative py-32 sm:py-44 px-4 overflow-hidden text-center select-none"
      >
        {/* Soft Ambient Radiance */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-wine-900/15 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-xl mx-auto relative z-10">
          {/* Subtle Lead Lines with Generous Negative Space */}
          <p
            className={`text-xs uppercase tracking-[0.25em] text-champagne-400/60 font-sans mb-3 transition-all duration-1000 ${
              isTeaserInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {data.teaser.line1}
          </p>

          <h3
            className={`text-xl sm:text-2xl font-serif text-white/90 font-light mb-8 transition-all duration-1000 delay-200 ${
              isTeaserInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            "{data.teaser.line2}"
          </h3>

          {/* Mysterious Interactive Object: Minimal Champagne-Gold Key */}
          <div
            onClick={handleStartDiscovery}
            className={`group inline-flex flex-col items-center gap-3 cursor-pointer p-4 rounded-3xl transition-all duration-1000 delay-400 ${
              isTeaserInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            title="Discover"
          >
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-wine-950/90 via-noir to-wine-900/80 border border-champagne-500/30 flex items-center justify-center text-champagne-300 shadow-glass group-hover:border-champagne-400/60 group-hover:scale-110 group-hover:shadow-glow-sm transition-all duration-500">
              {/* Pulsing Aura */}
              <div className="absolute inset-0 rounded-full bg-champagne-500/10 blur-sm animate-pulse-glow" />
              <Key className="w-6 h-6 text-champagne-300 transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
            </div>

            <div className="flex items-center gap-1.5 text-xs font-serif text-champagne-300/80 group-hover:text-champagne-200 transition-colors">
              <span>{data.teaser.cta}</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. DISCOVERY TRANSITION OVERLAY                                           */}
      {/* ========================================================================= */}
      {stage === 'discovering' && (
        <div className="fixed inset-0 z-50 bg-noir/95 backdrop-blur-2xl flex flex-col items-center justify-center animate-fadeIn">
          <div className="relative w-24 h-24 rounded-full bg-wine-950 border border-champagne-400/40 flex items-center justify-center shadow-glow-md animate-pulse-glow">
            <Key className="w-9 h-9 text-champagne-300 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <span className="mt-6 text-xs uppercase tracking-[0.3em] text-champagne-300/70 font-sans">
            Unlocking Our Memory...
          </span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. FULL-SCREEN SECRET ROOM                                                */}
      {/* ========================================================================= */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#090307]/98 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-12 overflow-y-auto animate-fadeIn select-none"
          style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
        >
          {/* Ambient Lighting & Subtle Grain */}
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-wine-800/20 rounded-full blur-[170px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-roseGold/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="fixed inset-0 bg-grain opacity-35 pointer-events-none" />

          {/* Top Control Bar */}
          <div className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-between pb-4 border-b border-champagne-500/15">
            <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-champagne-400/80">
              <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
              <span>A Secret For Ayushi</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Optional Music Trigger if not playing */}
              {!isPlayingMusic && (
                <button
                  onClick={onEnsureMusicPlaying}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-wine-900/60 border border-champagne-500/30 text-[11px] font-serif text-champagne-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Music className="w-3 h-3 text-roseGold" />
                  <span>Play this moment ♫</span>
                </button>
              )}

              <button
                onClick={handleClose}
                className="p-2 rounded-full bg-wine-950/80 hover:bg-wine-900 border border-champagne-500/25 text-champagne-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close secret experience"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Stage Content Container */}
          <div className="relative z-10 max-w-2xl w-full mx-auto my-auto py-8 text-center flex flex-col items-center justify-center min-h-[50vh]">
            
            {/* STAGE 1: INTRO */}
            {stage === 'intro' && (
              <div className="space-y-6 animate-fadeIn">
                <span className="text-[11px] uppercase tracking-[0.3em] text-roseGold font-sans block">
                  Private Memory Room
                </span>

                <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight text-glow-gold leading-tight">
                  {data.intro.title}
                </h2>

                <p className="text-base sm:text-xl text-champagne-200/85 font-serif italic max-w-lg mx-auto leading-relaxed">
                  "{data.intro.subtitle}"
                </p>

                <div className="pt-8">
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-wine-700 via-crimsonGlow/80 to-champagne-500 text-white text-xs font-serif uppercase tracking-[0.2em] shadow-glow-sm hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>Step Inside</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 2: 4. THE FOUR-YEAR VISUAL */}
            {stage === 'timeline' && (
              <div className="w-full space-y-6 animate-fadeIn">
                <span className="text-[11px] uppercase tracking-[0.3em] text-roseGold font-sans block">
                  The Journey
                </span>

                <div className="my-8 flex flex-col items-center">
                  {/* Start Date */}
                  <div className="px-5 py-2 rounded-full bg-wine-900/80 border border-champagne-500/30 text-xs sm:text-sm font-mono text-champagne-200 shadow-glow-sm">
                    {data.timeline.startDate}
                  </div>

                  {/* Vertical Light Trail with Subtle Floating Memories */}
                  <div className="relative my-6 w-0.5 h-36 sm:h-44 bg-gradient-to-b from-champagne-400 via-crimsonGlow to-champagne-400 flex flex-col justify-between items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-champagne-300 shadow-glow-sm" />
                    <div className="w-2 h-2 rounded-full bg-roseGold animate-ping" />
                    <div className="w-2.5 h-2.5 rounded-full bg-champagne-300 shadow-glow-sm" />
                  </div>

                  {/* Memory Fragments Pill Cloud */}
                  <div className="flex flex-wrap items-center justify-center gap-2 max-w-md my-4">
                    {data.timeline.words.map((word, wIdx) => (
                      <span
                        key={wIdx}
                        className="px-3 py-1 rounded-full bg-noir/60 border border-champagne-500/15 text-[11px] font-serif text-champagne-200/80 italic shadow-xs"
                      >
                        {word}
                      </span>
                    ))}
                  </div>

                  {/* 4-Year Anniversary Milestone Date */}
                  <div className="px-5 py-2 rounded-full bg-gradient-to-r from-wine-900 via-crimsonGlow/40 to-champagne-600/30 border border-champagne-400/40 text-xs sm:text-sm font-mono text-champagne-100 shadow-glow-sm mt-3">
                    {data.timeline.endDate}
                  </div>
                </div>

                <p className="text-xs text-champagne-400/80 font-serif italic">
                  Four years of memories, one unforgettable story.
                </p>

                <div className="pt-4 flex items-center justify-center gap-4">
                  <button
                    onClick={handleBack}
                    className="p-2 text-champagne-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Previous step"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-wine-900/80 hover:bg-wine-800 border border-champagne-400/30 text-white text-xs font-serif uppercase tracking-widest shadow-glow-sm transition-all hover:scale-105 cursor-pointer"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 3: 5. MAIN BIRTHDAY REVEAL */}
            {stage === 'birthday' && (
              <div className="space-y-6 animate-fadeIn">
                <span className="text-[11px] uppercase tracking-[0.3em] text-roseGold font-sans block">
                  3 October 2026
                </span>

                <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight text-glow-gold leading-tight">
                  {data.birthdayReveal.heading}
                </h2>

                <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-champagne-500/25 max-w-xl mx-auto space-y-4 text-left shadow-glass">
                  {data.birthdayReveal.message.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-sm sm:text-base text-champagne-100/90 font-serif font-light leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-center gap-4">
                  <button
                    onClick={handleBack}
                    className="p-2 text-champagne-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Previous step"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-wine-700 to-crimsonGlow text-white text-xs font-serif uppercase tracking-widest shadow-glow-sm hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>One More Memory</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 4: 6. PERSONAL MEMORY REVEAL */}
            {stage === 'memory' && (
              <div className="space-y-6 animate-fadeIn w-full">
                <span className="text-[11px] uppercase tracking-[0.3em] text-roseGold font-sans block">
                  A Cherished Moment
                </span>

                {/* Large Cinematic Image Frame */}
                <div className="relative max-w-lg w-full mx-auto rounded-3xl overflow-hidden glass-panel border border-champagne-500/30 p-3 sm:p-4 shadow-2xl">
                  <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-noir/80 relative">
                    <img
                      src={data.memoryReveal.image}
                      alt="Special Memory"
                      className="w-full h-full object-cover transform scale-100 hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent" />
                  </div>
                  <p className="mt-4 text-sm font-serif italic text-champagne-200">
                    "{data.memoryReveal.caption}"
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-center gap-4">
                  <button
                    onClick={handleBack}
                    className="p-2 text-champagne-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Previous step"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-wine-900/80 hover:bg-wine-800 border border-champagne-400/30 text-white text-xs font-serif uppercase tracking-widest shadow-glow-sm hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>Our Future</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 5: 8. FINAL MESSAGE */}
            {stage === 'future' && (
              <div className="space-y-6 animate-fadeIn max-w-xl mx-auto">
                <span className="text-[11px] uppercase tracking-[0.3em] text-roseGold font-sans block">
                  Looking Forward
                </span>

                <h2 className="text-2xl sm:text-4xl font-serif text-white tracking-tight leading-snug">
                  {data.finalMessage.lead}
                </h2>

                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-wine-900/60 border border-champagne-500/20 text-xs font-mono text-champagne-300">
                  <Calendar className="w-3.5 h-3.5 text-champagne-400" />
                  <span>{data.finalMessage.span}</span>
                </div>

                <h3 className="text-3xl sm:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-champagne-200 via-roseGold to-crimsonGlow py-1">
                  {data.finalMessage.milestone}
                </h3>

                <p className="text-base sm:text-lg text-champagne-200/90 font-serif italic max-w-md mx-auto leading-relaxed">
                  "{data.finalMessage.closing}"
                </p>

                <div className="pt-6 flex items-center justify-center gap-4">
                  <button
                    onClick={handleBack}
                    className="p-2 text-champagne-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Previous step"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-wine-700 via-crimsonGlow to-champagne-500 text-white text-xs font-serif uppercase tracking-widest shadow-glow-sm hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>To Forever</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 6: 9. FINAL CINEMATIC ENDING */}
            {stage === 'ending' && (
              <div className="space-y-8 animate-fadeIn max-w-lg mx-auto">
                {/* Quiet, Peaceful Climax */}
                <div className="space-y-3">
                  <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight text-glow-gold">
                    {data.ending.title}
                  </h2>
                  <p className="text-2xl sm:text-3xl font-serif text-roseGold font-light">
                    {data.ending.signoff}
                  </p>
                  <span className="text-xs uppercase tracking-widest text-champagne-400/70 font-mono block">
                    {data.ending.date}
                  </span>
                </div>

                {/* Final Quote */}
                <div className="py-6 border-y border-champagne-500/15">
                  <p className="text-lg sm:text-xl font-serif italic text-champagne-200/90">
                    "{data.ending.finalQuote}"
                  </p>
                </div>

                {/* 10. REPLAY EXPERIENCE CONTROLS */}
                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={handleReplay}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-wine-900/60 hover:bg-wine-900 border border-champagne-500/25 text-xs font-serif text-champagne-200 hover:text-white transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-champagne-400" />
                    <span>Replay this moment ↻</span>
                  </button>

                  <button
                    onClick={handleClose}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-wine-700 to-crimsonGlow text-white text-xs font-serif uppercase tracking-wider shadow-glow-sm hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>Return to Our Story</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Bottom subtle indicator */}
          <div className="relative z-10 w-full text-center text-[10px] text-champagne-400/50 font-serif italic pt-4">
            <Heart className="w-3 h-3 text-crimsonGlow fill-crimsonGlow inline mr-1" />
            <span>Dedicated especially for Ayushi • 3 October 2026</span>
          </div>
        </div>
      )}
    </>
  );
};
