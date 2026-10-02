import React, { useState, useEffect, useRef } from 'react';
import { Heart, X, Feather, ChevronLeft, ChevronRight, MapPin, Calendar, Sparkles, Music, Bookmark } from 'lucide-react';
import { PERSONAL_DATA, type LoveLetter } from '../data/content';

interface LoveLettersProps {
  isPlayingMusic?: boolean;
}

type OpeningStage = 'idle' | 'centering' | 'unsealing' | 'sliding' | 'unfolded' | 'closing';

export const LoveLetters: React.FC<LoveLettersProps> = ({ isPlayingMusic = false }) => {
  const [openedLetterIndex, setOpenedLetterIndex] = useState<number | null>(null);
  const [openingStage, setOpeningStage] = useState<OpeningStage>('idle');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isIntroInView, setIsIntroInView] = useState(false);
  const [revealedEnvelopes, setRevealedEnvelopes] = useState<Set<string>>(new Set());
  const [lightboxPhoto, setLightboxPhoto] = useState<{ src: string; caption?: string; title?: string } | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const letters = PERSONAL_DATA.letters;

  // 1. Scroll-triggered entrance for section intro & envelopes
  useEffect(() => {
    const introEl = introRef.current;
    if (!introEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntroInView(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(introEl);
    return () => observer.disconnect();
  }, []);

  // Stagger envelope entrance when section enters viewport
  useEffect(() => {
    if (!isIntroInView) return;

    letters.forEach((letter, index) => {
      const timer = setTimeout(() => {
        setRevealedEnvelopes((prev) => {
          const next = new Set(prev);
          next.add(letter.id);
          return next;
        });
      }, index * 120);

      return () => clearTimeout(timer);
    });
  }, [isIntroInView, letters]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (openingStage !== 'idle') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [openingStage]);

  // 19. Keyboard navigation & Accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxPhoto) {
        if (e.key === 'Escape') setLightboxPhoto(null);
        return;
      }

      if (openingStage === 'idle' || openedLetterIndex === null) return;

      if (e.key === 'Escape') {
        handleCloseLetter();
      } else if (e.key === 'ArrowRight') {
        handleNextLetter();
      } else if (e.key === 'ArrowLeft') {
        handlePrevLetter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openingStage, openedLetterIndex, lightboxPhoto]);

  // 4. Letter Opening Sequence
  const handleOpenEnvelope = (index: number) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setOpenedLetterIndex(index);
    setCurrentPage(0);

    if (prefersReducedMotion) {
      setOpeningStage('unfolded');
      return;
    }

    // Cinematic staged opening sequence (approx 1.4s total)
    setOpeningStage('centering');

    const unsealTimer = setTimeout(() => {
      setOpeningStage('unsealing');
    }, 400);

    const slideTimer = setTimeout(() => {
      setOpeningStage('sliding');
    }, 850);

    const unfoldTimer = setTimeout(() => {
      setOpeningStage('unfolded');
    }, 1350);

    return () => {
      clearTimeout(unsealTimer);
      clearTimeout(slideTimer);
      clearTimeout(unfoldTimer);
    };
  };

  // 13. Letter Closing & Return Animation
  const handleCloseLetter = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setOpeningStage('idle');
      setOpenedLetterIndex(null);
      setCurrentPage(0);
      return;
    }

    setOpeningStage('closing');
    setTimeout(() => {
      setOpeningStage('idle');
      setOpenedLetterIndex(null);
      setCurrentPage(0);
    }, 380);
  };

  // Skip animation directly to read
  const handleSkipAnimation = () => {
    setOpeningStage('unfolded');
  };

  // 11. Navigation between letters
  const handleNextLetter = () => {
    if (openedLetterIndex === null) return;
    setIsNavigating(true);
    setTimeout(() => {
      const nextIdx = (openedLetterIndex + 1) % letters.length;
      setOpenedLetterIndex(nextIdx);
      setCurrentPage(0);
      setIsNavigating(false);
    }, 180);
  };

  const handlePrevLetter = () => {
    if (openedLetterIndex === null) return;
    setIsNavigating(true);
    setTimeout(() => {
      const prevIdx = (openedLetterIndex - 1 + letters.length) % letters.length;
      setOpenedLetterIndex(prevIdx);
      setCurrentPage(0);
      setIsNavigating(false);
    }, 180);
  };

  const currentLetter: LoveLetter | null =
    openedLetterIndex !== null ? letters[openedLetterIndex] : null;

  // Determine current paragraphs (handling multi-page support)
  const currentParagraphs: string[] = currentLetter
    ? currentLetter.pages && currentLetter.pages.length > 0
      ? currentLetter.pages[currentPage] || currentLetter.content
      : currentLetter.content
    : [];

  const totalPages = currentLetter?.pages?.length || 1;

  return (
    <section
      id="letters"
      ref={sectionRef}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-transparent via-[#140810]/70 to-[#0e040b]/90 transition-colors duration-1000"
    >
      {/* 16. Warm intimate stationery atmosphere lighting */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-wine-800/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-roseGold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* 1. SECTION INTRO */}
        <div ref={introRef} className="text-center max-w-2xl mx-auto mb-20">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-wine-950/80 border border-champagne-500/25 text-xs text-champagne-300 mb-6 shadow-glow-sm transition-all duration-700 ${
              isIntroInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            <Feather className="w-3.5 h-3.5 text-champagne-400" />
            <span className="font-serif tracking-widest uppercase text-[11px]">
              Private Stationery Archive
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-5xl font-serif text-white tracking-tight mb-4 text-glow-gold transition-all duration-700 delay-100 ${
              isIntroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {PERSONAL_DATA.lettersSection.heading}
          </h2>

          <p
            className={`text-sm sm:text-base text-champagne-200/80 font-light leading-relaxed font-sans transition-all duration-700 delay-200 ${
              isIntroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            "{PERSONAL_DATA.lettersSection.subtitle}"
          </p>
        </div>

        {/* 2. ENVELOPE COLLECTION: 5 physical-looking editable envelopes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {letters.map((letter, idx) => {
            const isRevealed = revealedEnvelopes.has(letter.id);
            const rotationDeg = letter.rotation ?? (idx % 2 === 0 ? -1.2 : 1.2);
            const isSpecial = letter.isSpecialBirthday;
            const isAnniversary = letter.isAnniversary;

            return (
              <div
                key={letter.id}
                onClick={() => handleOpenEnvelope(idx)}
                style={{
                  transform: isRevealed
                    ? `rotate(${rotationDeg}deg)`
                    : 'translateY(30px) scale(0.95)',
                  transitionDelay: `${idx * 80}ms`,
                }}
                className={`group relative cursor-pointer rounded-2xl p-6 sm:p-7 border transition-all duration-500 shadow-xl select-none ${
                  isRevealed ? 'opacity-100' : 'opacity-0'
                } ${
                  isSpecial
                    ? 'border-champagne-400/40 bg-gradient-to-br from-[#240c1b] via-[#1b0813] to-[#12040d] shadow-glow-sm hover:border-champagne-300 hover:shadow-glow-md'
                    : 'border-champagne-500/20 bg-gradient-to-br from-[#1b0914] via-[#150710] to-[#0f040b] hover:border-champagne-400/40 hover:shadow-2xl'
                } hover:-translate-y-2 hover:scale-[1.02]`}
              >
                {/* Subtle paper stationery texture lines inside envelope pocket */}
                <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none rounded-2xl" />

                {/* Envelope Flap Detail */}
                <div className="relative mb-6 pb-4 border-b border-champagne-500/15 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-champagne-400/70 uppercase tracking-widest px-2 py-0.5 rounded bg-noir/40 border border-champagne-500/20">
                      Letter {letter.number}
                    </span>
                    {isSpecial && (
                      <span className="flex items-center gap-1 text-[10px] font-sans uppercase tracking-wider text-roseGold font-semibold">
                        <Sparkles className="w-3 h-3 text-champagne-400" />
                        Birthday
                      </span>
                    )}
                    {isAnniversary && (
                      <span className="flex items-center gap-1 text-[10px] font-sans uppercase tracking-wider text-champagne-300 font-semibold">
                        <Bookmark className="w-3 h-3 text-champagne-400" />
                        4-Year
                      </span>
                    )}
                  </div>

                  {/* 3. WAX SEAL STYLE DETAIL */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-champagne-100 shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 border border-champagne-300/30"
                    style={{
                      backgroundColor: letter.waxSealColor,
                      boxShadow: `0 0 16px ${letter.waxSealColor}60`,
                    }}
                    title="Wax Seal"
                  >
                    <Heart className="w-4 h-4 fill-white/90 text-white/90" />
                  </div>
                </div>

                {/* Letter Title */}
                <h3 className="text-xl sm:text-2xl font-serif text-white mb-2 leading-snug group-hover:text-champagne-200 transition-colors">
                  {letter.title}
                </h3>

                {/* Excerpt preview */}
                <p className="text-xs text-champagne-200/75 font-light leading-relaxed font-sans line-clamp-2 mb-6">
                  "{letter.preview}"
                </p>

                {/* Metadata & Open prompt */}
                <div className="flex items-center justify-between text-xs pt-4 border-t border-champagne-500/10">
                  <span className="font-serif italic text-champagne-400/80 text-[11px] truncate max-w-[140px]">
                    {letter.date}
                  </span>

                  {/* 3. "Open letter →" hover prompt */}
                  <div className="flex items-center gap-1 font-medium text-roseGold group-hover:text-champagne-300 transition-colors text-xs">
                    <span>Open letter</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. CINEMATIC LETTER OPENING & PHYSICAL PAPER MODAL */}
      {/* ========================================================================= */}
      {openingStage !== 'idle' && currentLetter && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-500 overflow-y-auto ${
            openingStage === 'closing'
              ? 'bg-noir/0 backdrop-blur-0 opacity-0'
              : 'bg-noir/90 backdrop-blur-xl opacity-100'
          }`}
          onClick={handleCloseLetter}
        >
          {/* Top Skip / Close Bar */}
          <div
            className="fixed top-6 right-6 z-50 flex items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {openingStage !== 'unfolded' && (
              <button
                onClick={handleSkipAnimation}
                className="px-3.5 py-1.5 rounded-full bg-wine-950/80 hover:bg-wine-900 border border-champagne-500/30 text-champagne-200 hover:text-white text-xs font-sans tracking-wide transition-all shadow-glow-sm cursor-pointer"
              >
                Skip animation →
              </button>
            )}

            <button
              onClick={handleCloseLetter}
              className="p-3 rounded-full bg-wine-950/80 hover:bg-wine-900 border border-champagne-500/30 text-champagne-200 hover:text-white hover:border-champagne-400 shadow-glow-sm transition-all cursor-pointer"
              aria-label="Close letter"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Envelope Centering & Opening Stage (Before Unfolding) */}
          {openingStage !== 'unfolded' && openingStage !== 'closing' && (
            <div
              className={`relative max-w-md w-full transition-all duration-700 ease-out select-none ${
                openingStage === 'centering'
                  ? 'scale-100 translate-y-0 opacity-100'
                  : openingStage === 'unsealing'
                  ? 'scale-105 translate-y-2 opacity-100'
                  : 'scale-110 -translate-y-4 opacity-100'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Outer Envelope Wrapper */}
              <div
                className="rounded-2xl p-8 border shadow-2xl relative overflow-hidden"
                style={{
                  backgroundColor: currentLetter.envelopeColor || '#1d0b16',
                  borderColor: currentLetter.isSpecialBirthday ? '#dfa45f' : '#8e1f2b',
                }}
              >
                {/* Triangular Flap Animation */}
                <div
                  className={`w-full h-24 mb-4 rounded-xl flex items-center justify-center transition-all duration-500 border border-champagne-500/20 bg-wine-950/60 relative ${
                    openingStage === 'unsealing' || openingStage === 'sliding'
                      ? 'rotate-x-180 -translate-y-2 opacity-80'
                      : ''
                  }`}
                >
                  {/* Wax Seal separating */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-500 border-2 border-champagne-300/40 ${
                      openingStage === 'unsealing' || openingStage === 'sliding'
                        ? 'scale-90 rotate-12 opacity-90'
                        : 'scale-100'
                    }`}
                    style={{ backgroundColor: currentLetter.waxSealColor }}
                  >
                    <Heart className="w-5 h-5 fill-white text-white" />
                  </div>
                </div>

                {/* Sliding Paper Excerpt */}
                <div
                  className={`w-full bg-[#fbf7ee] rounded-xl p-6 text-amber-950 transition-all duration-700 shadow-2xl border border-amber-900/20 ${
                    openingStage === 'sliding'
                      ? '-translate-y-16 scale-105 opacity-100'
                      : 'translate-y-0 opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-serif uppercase tracking-widest text-amber-900/70 mb-3 border-b border-amber-900/15 pb-2">
                    <span>Letter {currentLetter.number}</span>
                    <span>{currentLetter.date}</span>
                  </div>
                  <h4 className="font-serif text-lg font-normal mb-2 text-amber-950">
                    {currentLetter.title}
                  </h4>
                  <p className="font-handwriting text-xl text-amber-900 line-clamp-2">
                    {currentLetter.content[0]}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 5. PHYSICAL PAPER DESIGN & READING VIEW */}
          {/* ========================================================================= */}
          {openingStage === 'unfolded' && (
            <div
              className={`relative max-w-2xl w-full my-8 transition-all duration-500 ease-out ${
                isNavigating ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 14. Golden Aura for Special Birthday Letter */}
              {currentLetter.isSpecialBirthday && (
                <div className="absolute -inset-2 bg-gradient-to-r from-champagne-500/25 via-crimsonGlow/20 to-champagne-400/25 rounded-3xl blur-xl pointer-events-none animate-pulse-glow" />
              )}

              {/* Physical Paper Sheet */}
              <div
                className={`letter-parchment rounded-2xl p-6 sm:p-12 md:p-14 text-amber-950 relative shadow-2xl border ${
                  currentLetter.isSpecialBirthday
                    ? 'border-champagne-500/40'
                    : 'border-amber-900/20'
                }`}
              >
                {/* 17. MUSIC PLAYING INDICATOR */}
                {isPlayingMusic && (
                  <div className="absolute top-4 left-6 sm:left-12 flex items-center gap-1.5 text-[11px] font-serif italic text-amber-900/70">
                    <Music className="w-3 h-3 text-roseGold animate-pulse" />
                    <span>Playing our song ♫</span>
                  </div>
                )}

                {/* Top Stationery Header with Wax Seal Stamp */}
                <div className="flex items-center justify-between border-b border-amber-900/20 pb-4 mb-8 mt-2">
                  <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-amber-900/80">
                    <Feather className="w-4 h-4 text-amber-900" />
                    <span>Letter {currentLetter.number} • Personal & Private</span>
                  </div>

                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md border border-amber-800/20"
                    style={{ backgroundColor: currentLetter.waxSealColor }}
                  >
                    <Heart className="w-4 h-4 fill-white text-white" />
                  </div>
                </div>

                {/* 6. TYPOGRAPHY: Elegant Serif Letter Title */}
                <div className="mb-6">
                  <h3 className="text-2xl sm:text-4xl font-serif text-amber-950 font-normal mb-2 tracking-tight">
                    {currentLetter.title}
                  </h3>

                  {/* 9. PERSONAL LETTER DETAILS: Date & Location */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-amber-900/80 font-serif">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-800" />
                      <span>{currentLetter.date}</span>
                    </div>

                    {currentLetter.location && (
                      <>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-crimsonGlow" />
                          <span>{currentLetter.location}</span>
                        </div>
                      </>
                    )}

                    {currentLetter.memoryReference && (
                      <>
                        <span>•</span>
                        <span className="italic font-light">"{currentLetter.memoryReference}"</span>
                      </>
                    )}
                  </div>
                </div>

                {/* 8. HANDWRITTEN TEXT REVEAL: Paragraphs fade in gradually */}
                <div className="font-handwriting text-2xl sm:text-3xl leading-[1.75] text-amber-950 space-y-6">
                  {currentParagraphs.map((paragraph, pIdx) => (
                    <p
                      key={pIdx}
                      style={{
                        transitionDelay: `${pIdx * 180}ms`,
                      }}
                      className="transition-all duration-700 ease-out opacity-100 translate-y-0"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* 10. PHOTO INSIDE LETTER (Physical printed photograph look) */}
                {currentLetter.image && (
                  <div className="my-8 flex flex-col items-center">
                    <div
                      onClick={() =>
                        setLightboxPhoto({
                          src: currentLetter.image!,
                          caption: currentLetter.caption,
                          title: currentLetter.title,
                        })
                      }
                      className="bg-white p-3 sm:p-4 rounded-sm shadow-xl border border-amber-900/15 cursor-pointer transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300 max-w-xs group"
                      title="Click to view full photo"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-amber-100/50 rounded-xs mb-2 relative flex items-center justify-center">
                        <img
                          src={currentLetter.image}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover blur-md opacity-30 pointer-events-none"
                        />
                        <img
                          src={currentLetter.image}
                          alt={currentLetter.title}
                          className="relative z-10 max-h-full max-w-full object-contain"
                        />
                      </div>
                      {currentLetter.caption && (
                        <p className="font-handwriting text-lg text-amber-900/90 text-center leading-tight">
                          "{currentLetter.caption}"
                        </p>
                      )}
                    </div>
                    <span className="text-[10px] text-amber-900/60 font-serif italic mt-2">
                      (Tap photograph to expand)
                    </span>
                  </div>
                )}

                {/* 12. PAGE TURN EFFECT (Multi-page support) */}
                {totalPages > 1 && (
                  <div className="mt-8 pt-4 border-t border-amber-900/15 flex items-center justify-between text-xs text-amber-900 font-serif">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                      disabled={currentPage === 0}
                      className="px-3 py-1 rounded border border-amber-900/30 hover:bg-amber-900/10 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
                    >
                      ← Previous Page
                    </button>

                    <span className="font-mono text-amber-900/80">
                      Page {currentPage + 1} of {totalPages}
                    </span>

                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                      disabled={currentPage === totalPages - 1}
                      className="px-3 py-1 rounded border border-amber-900/30 hover:bg-amber-900/10 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
                    >
                      Next Page →
                    </button>
                  </div>
                )}

                {/* Letter Signoff */}
                <div className="mt-10 pt-6 border-t border-amber-900/20 flex flex-wrap items-end justify-between gap-4 text-amber-900">
                  <div className="font-handwriting text-3xl sm:text-4xl text-amber-950">
                    {currentLetter.signoff}
                  </div>

                  <div className="text-right">
                    <span className="font-serif text-xs uppercase tracking-wider block text-amber-900/70 font-medium">
                      {currentLetter.signatureDate}
                    </span>
                    <span className="font-serif text-sm tracking-widest font-semibold">
                      Forever Yours ♡
                    </span>
                  </div>
                </div>

                {/* 11. LETTER NAVIGATION BAR */}
                <div className="mt-10 pt-5 border-t border-amber-900/15 flex items-center justify-between">
                  <button
                    onClick={handlePrevLetter}
                    className="inline-flex items-center gap-1 text-xs font-serif text-amber-900 hover:text-amber-950 font-medium transition-colors cursor-pointer p-2"
                    aria-label="Previous letter"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Letter</span>
                  </button>

                  <button
                    onClick={handleCloseLetter}
                    className="px-4 py-1.5 rounded-full bg-amber-900/10 hover:bg-amber-900/20 text-xs font-serif text-amber-950 uppercase tracking-widest transition-colors cursor-pointer border border-amber-900/25"
                    aria-label="Close letter"
                  >
                    Close Letter
                  </button>

                  <button
                    onClick={handleNextLetter}
                    className="inline-flex items-center gap-1 text-xs font-serif text-amber-900 hover:text-amber-950 font-medium transition-colors cursor-pointer p-2"
                    aria-label="Next letter"
                  >
                    <span>Next Letter</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Lightbox for physical photograph inside letter */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-60 bg-noir/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxPhoto(null)}
        >
          <button
            onClick={() => setLightboxPhoto(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-wine-900 border border-champagne-500/30 text-white cursor-pointer"
            aria-label="Close photo"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="max-w-xl w-full bg-black p-4 rounded-2xl border border-champagne-500/30 shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxPhoto.src}
              alt={lightboxPhoto.title || "Memory Photo"}
              className="w-full h-auto max-h-[75vh] object-contain rounded-xl mx-auto"
            />
            {lightboxPhoto.caption && (
              <p className="mt-3 text-sm text-champagne-200 font-serif italic">
                "{lightboxPhoto.caption}"
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
