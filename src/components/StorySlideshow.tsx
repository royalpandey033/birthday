import React, { useState, useEffect } from 'react';
import { X, Play, Pause, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { PERSONAL_DATA } from '../data/content';

interface StorySlideshowProps {
  isOpen: boolean;
  onClose: () => void;
  onEnsureMusicPlaying: () => void;
}

export const StorySlideshow: React.FC<StorySlideshowProps> = ({
  isOpen,
  onClose,
  onEnsureMusicPlaying,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Combine milestone photos and gallery photos for the complete love story movie!
  const storySlides = [
    {
      title: "The First Spark",
      subtitle: "17 November 2022",
      caption: "The day two separate paths converged into our favorite story.",
      image: PERSONAL_DATA.milestones[0].image,
    },
    {
      title: "Finding My Peace In You",
      subtitle: "Late Nights & Quiet Talks",
      caption: "You showed me that love isn't just excitement — it's the safest silence.",
      image: PERSONAL_DATA.gallery[0].image,
    },
    {
      title: "Learning To Walk Together",
      subtitle: "Growing Together",
      caption: "Every hurdle brought us closer; every day gave me another reason to admire you.",
      image: PERSONAL_DATA.milestones[1].image,
    },
    {
      title: "Adventures & Roadtrips",
      subtitle: "Golden Moments",
      caption: "Getting lost on unfamiliar roads, with your hand in mine and music on repeat.",
      image: PERSONAL_DATA.gallery[1].image,
    },
    {
      title: "Your Unmatched Laughter",
      subtitle: "Pure Happiness",
      caption: "The world gets completely quiet whenever you start laughing from your heart.",
      image: PERSONAL_DATA.gallery[3].image,
    },
    {
      title: "Four Years of Us",
      subtitle: "17 November 2022 → 17 November 2026",
      caption: "Four years of memories, and this is still just the opening chapter.",
      image: PERSONAL_DATA.milestones[4].image,
    },
    {
      title: "Happy Birthday, Ayushi ❤️",
      subtitle: "3 October 2026",
      caption: "To my favorite person, today and for all the tomorrows to come.",
      image: PERSONAL_DATA.finalSection.image,
    },
  ];

  useEffect(() => {
    if (isOpen) {
      onEnsureMusicPlaying();
      setCurrentIndex(0);
      setIsPlaying(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % storySlides.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, storySlides.length]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % storySlides.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + storySlides.length) % storySlides.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, storySlides.length, onClose]);

  if (!isOpen) return null;

  const currentSlide = storySlides[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % storySlides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + storySlides.length) % storySlides.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070205] flex flex-col justify-between p-6 sm:p-12 overflow-hidden animate-fadeIn select-none">
      {/* Background Soft Atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          key={`bg-${currentIndex}`}
          src={currentSlide.image}
          alt=""
          className="w-full h-full object-cover opacity-20 blur-2xl scale-110 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070205] via-[#070205]/60 to-[#070205]/80" />
      </div>

      {/* Main Centered Image Frame (Preserves Original Aspect Ratio) */}
      <div className="relative z-10 max-w-4xl w-full mx-auto my-auto flex items-center justify-center max-h-[62vh] rounded-2xl overflow-hidden glass-panel border border-champagne-500/30 shadow-2xl p-2 sm:p-4 bg-black/60">
        <img
          key={`img-${currentIndex}`}
          src={currentSlide.image}
          alt={currentSlide.title}
          className="max-h-[58vh] w-auto object-contain rounded-xl transition-all duration-1000 transform hover:scale-[1.02]"
        />
      </div>

      {/* Top Header / Exit */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-noir/70 backdrop-blur-md border border-champagne-500/20 text-xs text-champagne-200">
          <Sparkles className="w-4 h-4 text-champagne-400 animate-spin" />
          <span className="font-serif tracking-widest uppercase">
            Play Our Story • {currentIndex + 1} / {storySlides.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-3 rounded-full bg-noir/70 backdrop-blur-md border border-champagne-500/30 text-champagne-200 hover:text-white hover:border-champagne-400 transition-colors shadow-glow-sm"
          aria-label="Exit Story Movie"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Center Nav Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-noir/60 backdrop-blur-md border border-champagne-500/20 text-champagne-200 hover:text-white hover:scale-110 transition-all z-20"
        aria-label="Previous story slide"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-noir/60 backdrop-blur-md border border-champagne-500/20 text-champagne-200 hover:text-white hover:scale-110 transition-all z-20"
        aria-label="Next story slide"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Bottom Cinematic Captions */}
      <div className="absolute bottom-12 left-6 right-6 max-w-3xl mx-auto text-center z-20">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-champagne-500/25 shadow-2xl backdrop-blur-xl">
          <span className="text-xs uppercase tracking-widest text-roseGold font-sans mb-2 block">
            {currentSlide.subtitle}
          </span>

          <h2 className="text-2xl sm:text-4xl font-serif text-white mb-3">
            {currentSlide.title}
          </h2>

          <p className="text-sm sm:text-lg text-champagne-100 font-serif italic max-w-xl mx-auto leading-relaxed mb-6">
            "{currentSlide.caption}"
          </p>

          {/* Controls Bar */}
          <div className="flex items-center justify-center gap-6 pt-4 border-t border-champagne-500/15">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wine-900 border border-champagne-500/30 text-xs text-champagne-200 hover:text-white"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Movie</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Resume Movie</span>
                </>
              )}
            </button>

            {/* Slides Progress Dots */}
            <div className="flex items-center gap-2">
              {storySlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-6 bg-crimsonGlow'
                      : 'w-1.5 bg-champagne-500/30 hover:bg-champagne-400'
                  }`}
                  aria-label={`Jump to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
