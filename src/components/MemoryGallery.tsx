import React, { useState, useEffect, useRef, useId } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Sparkles, ArrowRight, ArrowDown } from 'lucide-react';
import { PERSONAL_DATA, type GalleryPhoto, type MemoryCategory } from '../data/content';

interface MemoryGalleryProps {
  isPlayingMusic?: boolean;
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({ isPlayingMusic = false }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | MemoryCategory>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isIntroInView, setIsIntroInView] = useState(false);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [lightboxAnimating, setLightboxAnimating] = useState(false);

  const introRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const componentInstanceId = useId();

  const filterOptions: Array<'All' | MemoryCategory> = [
    'All',
    'Us',
    'Trips',
    'Celebrations',
    'Random',
    'Favorites',
  ];

  const galleryPhotos = PERSONAL_DATA.gallery;
  const filteredPhotos = activeFilter === 'All'
    ? galleryPhotos
    : galleryPhotos.filter(photo => photo.category === activeFilter);

  // 1. Scroll-triggered observer for Intro & Section background change
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

  // 4. Staggered & scroll-triggered reveal observer for photo cards
  useEffect(() => {
    const cardElements = document.querySelectorAll('[data-memory-card-id]');
    if (cardElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute('data-memory-card-id');
            if (cardId) {
              setRevealedIds((prev) => {
                if (prev.has(cardId)) return prev;
                const next = new Set(prev);
                next.add(cardId);
                return next;
              });
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    cardElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredPhotos, activeFilter]);


  // Body scroll locking when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  // 6. Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        handleCloseLightbox();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    if (lightboxIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  const handleOpenLightbox = (photo: GalleryPhoto, index?: number) => {
    setSelectedPhoto(photo);
    setLightboxAnimating(true);
    if (index !== undefined) {
      setLightboxIndex(index);
    } else {
      const idx = filteredPhotos.findIndex(p => p.id === photo.id);
      setLightboxIndex(idx !== -1 ? idx : 0);
    }
    setTimeout(() => setLightboxAnimating(false), 200);
  };

  const handleCloseLightbox = () => {
    setSelectedPhoto(null);
    setLightboxIndex(null);
  };

  const handleNext = () => {
    if (lightboxIndex !== null && filteredPhotos.length > 0) {
      setLightboxAnimating(true);
      const nextIndex = (lightboxIndex + 1) % filteredPhotos.length;
      setLightboxIndex(nextIndex);
      setSelectedPhoto(filteredPhotos[nextIndex]);
      setTimeout(() => setLightboxAnimating(false), 200);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null && filteredPhotos.length > 0) {
      setLightboxAnimating(true);
      const prevIndex = (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
      setLightboxIndex(prevIndex);
      setSelectedPhoto(filteredPhotos[prevIndex]);
      setTimeout(() => setLightboxAnimating(false), 200);
    }
  };

  const scrollToVideos = () => {
    const el = document.getElementById('videos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featured = PERSONAL_DATA.gallerySection.featuredMemory;
  const editorial = PERSONAL_DATA.gallerySection.editorialQuote;

  // Helper to get reveal style class based on index
  const getRevealClasses = (cardId: string, idx: number) => {
    const isRevealed = revealedIds.has(cardId);
    const styleType = idx % 3;

    if (!isRevealed) {
      if (styleType === 0) {
        // Blur -> Sharp
        return 'opacity-0 filter blur-sm translate-y-6 scale-[0.98]';
      } else if (styleType === 1) {
        // Scale -> Normal
        return 'opacity-0 scale-95 translate-y-8';
      } else {
        // Vertical Lift & Fade
        return 'opacity-0 translate-y-10';
      }
    }

    // Revealed state
    return 'opacity-100 filter-none scale-100 translate-y-0';
  };

  return (
    <section
      id="gallery"
      data-section="memories"
      ref={sectionRef}
      className={`relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-1000 ${
        isIntroInView ? 'bg-wine-950/40' : 'bg-transparent'
      }`}
    >
      {/* Dynamic Background Radiance: changes slowly as user reaches section */}
      <div
        className={`absolute top-1/4 right-10 w-[600px] h-[600px] bg-wine-800/25 rounded-full blur-[160px] pointer-events-none transition-all duration-1000 ${
          isIntroInView ? 'opacity-100 scale-105' : 'opacity-40 scale-95'
        }`}
      />
      <div
        className={`absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-roseGold/15 rounded-full blur-[150px] pointer-events-none transition-all duration-1000 ${
          isIntroInView ? 'opacity-100 scale-105' : 'opacity-30 scale-95'
        }`}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 1. SECTION INTRO: "Little Moments, Big Memories" */}
        <div ref={introRef} className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-wine-950/80 border border-champagne-500/25 text-xs text-champagne-300 mb-6 shadow-glow-sm transition-all duration-700 ${
              isIntroInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-champagne-400" />
            <span className="font-serif tracking-widest uppercase text-[11px]">
              Visual Memory Album
            </span>
            <span className="text-champagne-500/30">•</span>
            {/* 9. DYNAMIC MEMORY COUNTER */}
            <span className="text-roseGold font-mono text-[11px] font-semibold">
              {galleryPhotos.length} memories
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight mb-4 text-glow-gold transition-all duration-700 delay-100 ${
              isIntroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {PERSONAL_DATA.gallerySection.heading}
          </h2>

          <p
            className={`text-base sm:text-lg text-champagne-200/85 font-light leading-relaxed max-w-xl mx-auto font-sans transition-all duration-700 delay-200 ${
              isIntroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            "{PERSONAL_DATA.gallerySection.subtitle}"
          </p>
        </div>        {/* 3. FEATURE MEMORY: Large photograph on one side, storytelling on the other */}
        <div
          data-memory-card-id="featured-memory-block"
          className={`mb-20 transition-all duration-800 ease-out ${
            revealedIds.has('featured-memory-block')
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-[0.99]'
          }`}
        >
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-champagne-500/25 shadow-glass overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Featured Photo Side */}
              <div
                className="lg:col-span-7 relative rounded-2xl overflow-hidden group cursor-pointer aspect-[16/10] bg-noir/80 shadow-2xl border border-champagne-500/20"
                onClick={() =>
                  handleOpenLightbox({
                    id: featured.id,
                    slot: featured.slot,
                    title: '',
                    category: 'Favorites',
                    caption: '',
                    date: '',
                    location: '',
                    image: featured.image,
                  })
                }
              >
                <img
                  src={featured.image}
                  alt="Featured Memory"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Tag pill */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-noir/70 backdrop-blur-md border border-champagne-500/30 text-[10px] font-mono text-champagne-300 uppercase tracking-widest">
                  {featured.tag}
                </div>

                {/* Hover Indicator */}
                <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-noir/80 backdrop-blur-md border border-champagne-400/30 text-xs text-champagne-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 shadow-glow-sm">
                  <Camera className="w-3.5 h-3.5 text-roseGold" />
                  <span>View Memory</span>
                  <ArrowRight className="w-3.5 h-3.5 text-champagne-400" />
                </div>
              </div>

              {/* Storytelling Content Side */}
              <div className="lg:col-span-5 flex flex-col justify-center text-left">
                <span className="text-xs uppercase tracking-[0.2em] text-roseGold font-sans mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
                  <span>Featured Snapshot</span>
                </span>

                <h3 className="text-2xl sm:text-3xl font-serif text-white mb-4 leading-snug">
                  Moments Built With Love
                </h3>

                <p className="text-sm sm:text-base text-champagne-100/90 font-light leading-relaxed mb-8 italic font-serif">
                  "Every photograph holds a quiet reminder of how far we've walked together, and every smile is a memory I'll always treasure."
                </p>

                <div>
                  <button
                    onClick={() =>
                      handleOpenLightbox({
                        id: featured.id,
                        slot: featured.slot,
                        title: '',
                        category: 'Favorites',
                        caption: '',
                        date: '',
                        location: '',
                        image: featured.image,
                      })
                    }
                    className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-wine-900/80 hover:bg-wine-800 border border-champagne-400/30 text-champagne-200 hover:text-white text-xs font-medium tracking-wider uppercase transition-all duration-300 shadow-glow-sm hover:scale-105 cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-roseGold" />
                    <span>View Memory</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 8. MEMORY CATEGORIES: Filter Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setActiveFilter(opt)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 backdrop-blur-md cursor-pointer ${
                activeFilter === opt
                  ? 'bg-gradient-to-r from-wine-700 via-crimsonGlow/80 to-champagne-600 text-white shadow-glow-sm scale-105'
                  : 'bg-wine-950/60 text-champagne-300/80 hover:text-white border border-champagne-500/15 hover:border-champagne-400/35'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* 2. CINEMATIC MASONRY-STYLE GALLERY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo, idx) => {
            // Apply varied editorial layout spans
            const isWide = photo.layoutSpan === 'wide';
            const isTall = photo.layoutSpan === 'vertical' || photo.layoutSpan === 'portrait';
            const cardId = `photo-${photo.id}-${componentInstanceId}`;
            const revealClasses = getRevealClasses(cardId, idx);
            const staggerDelay = `${(idx % 6) * 90}ms`;

            return (
              <React.Fragment key={photo.id}>
                {/* 11. SPECIAL MEMORY CARD (Inserted naturally at position 4) */}
                {idx === 3 && (
                  <div
                    data-memory-card-id={`editorial-quote-card-${componentInstanceId}`}
                    style={{ transitionDelay: '200ms' }}
                    className={`sm:col-span-2 lg:col-span-1 rounded-3xl p-8 glass-panel border border-champagne-500/25 flex flex-col justify-between shadow-glass relative overflow-hidden group transition-all duration-700 ${
                      revealedIds.has(`editorial-quote-card-${componentInstanceId}`)
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-28 h-28 bg-champagne-500/5 rounded-bl-full pointer-events-none group-hover:bg-crimsonGlow/10 transition-colors" />

                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-roseGold font-sans mb-4 block">
                        Editorial Thought
                      </span>
                      <p className="font-serif text-lg sm:text-xl text-champagne-100 font-normal leading-relaxed whitespace-pre-line italic">
                        "{editorial.quote}"
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-champagne-500/15 flex items-center justify-between text-xs text-champagne-400/70 font-serif">
                      <span>{editorial.author}</span>
                      <span className="text-crimsonGlow">♡</span>
                    </div>
                  </div>
                )}

                {/* Individual Photo Card with scroll reveal animations */}
                <div
                  data-memory-card-id={cardId}
                  style={{ transitionDelay: staggerDelay }}
                  onClick={() => handleOpenLightbox(photo, idx)}
                  className={`group relative rounded-3xl overflow-hidden glass-panel border border-champagne-500/20 cursor-pointer shadow-glass hover:shadow-glow-sm hover:border-champagne-400/40 transition-all duration-700 ease-out ${
                    revealClasses
                  } ${isWide ? 'sm:col-span-2 lg:col-span-2' : ''}`}
                >
                  {/* Photo Image with varied aspect ratio */}
                  <div
                    className={`overflow-hidden bg-noir/80 relative ${
                      isWide
                        ? 'aspect-[16/9]'
                        : isTall
                        ? 'aspect-[3/4]'
                        : 'aspect-square'
                    }`}
                  >
                    {/* Blurred background fill */}
                    <img
                      src={photo.image}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none"
                    />
                    <img
                      src={photo.image}
                      alt={`Memory photo ${idx + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="relative z-10 w-full h-full object-contain transform transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-105"
                    />
                  </div>

                  {/* Gradient Vignette Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5" />

                  {/* Slot Tag */}
                  <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-noir/70 backdrop-blur-md border border-champagne-500/25 text-[10px] font-mono text-champagne-300">
                    {photo.slot}
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-noir/70 backdrop-blur-md border border-champagne-500/25 text-[10px] font-sans text-roseGold uppercase tracking-wider">
                    {photo.category}
                  </div>

                  {/* Clean Hover Action Button */}
                  <div className="absolute bottom-4 left-4 transform opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-0 translate-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-wine-950/85 backdrop-blur-md border border-champagne-400/30 text-xs text-champagne-100 font-sans shadow-glow-sm">
                      <Camera className="w-3.5 h-3.5 text-roseGold" />
                      <span>View Memory</span>
                      <ArrowRight className="w-3 h-3 text-champagne-400" />
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>


        {/* 13. MEMORY ENDING: "More memories waiting to be made" */}
        <div className="mt-20 text-center flex flex-col items-center">
          <p className="text-sm sm:text-base font-serif italic text-champagne-200/90 mb-4">
            "{PERSONAL_DATA.gallerySection.ending.prompt}"
          </p>

          <button
            onClick={scrollToVideos}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-wine-950/60 hover:bg-wine-900 border border-champagne-500/25 text-xs font-sans uppercase tracking-[0.18em] text-champagne-300 hover:text-white transition-all duration-300 shadow-glow-sm cursor-pointer hover:scale-105"
          >
            <span>{PERSONAL_DATA.gallerySection.ending.cta}</span>
            <ArrowDown className="w-3.5 h-3.5 text-champagne-400 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* 6. FULLSCREEN LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-noir/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={handleCloseLightbox}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-wine-900/80 border border-champagne-500/30 text-champagne-200 hover:text-white hover:border-champagne-400 z-50 shadow-glow-sm transition-colors cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-wine-900/80 border border-champagne-500/30 text-champagne-200 hover:text-white z-50 shadow-glow-sm hover:scale-110 transition-all cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-wine-900/80 border border-champagne-500/30 text-champagne-200 hover:text-white z-50 shadow-glow-sm hover:scale-110 transition-all cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Dialog Container */}
          <div
            className={`relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center transition-all duration-300 ${
              lightboxAnimating ? 'opacity-70 scale-[0.98]' : 'opacity-100 scale-100'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden border border-champagne-500/30 shadow-2xl max-h-[75vh] bg-black">
              <img
                src={selectedPhoto.image}
                alt="Memory photo preview"
                className="max-h-[75vh] w-auto object-contain mx-auto transition-transform duration-300"
              />
            </div>

            {/* Lightbox Footer & Details */}
            <div className="mt-5 text-center max-w-2xl px-4">
              <div className="flex items-center justify-center gap-3 text-xs text-champagne-400 mb-1">
                <span className="font-mono text-roseGold uppercase tracking-wider">{selectedPhoto.category}</span>
                {lightboxIndex !== null && filteredPhotos.length > 0 && (
                  <>
                    <span>•</span>
                    <span className="text-champagne-300/80 font-mono">
                      Memory {lightboxIndex + 1} of {filteredPhotos.length}
                    </span>
                  </>
                )}
              </div>

              {isPlayingMusic && (
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-wine-950/60 border border-champagne-500/20 text-[11px] text-champagne-300 font-serif italic">
                  <span className="text-roseGold animate-pulse">♫</span>
                  <span>Soundtrack of this memory</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

