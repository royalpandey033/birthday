import React, { useState, useEffect } from 'react';
import { Menu, X, Play, Heart, Volume2, Sparkles, Tv } from 'lucide-react';
import { PERSONAL_DATA } from '../data/content';

interface NavbarProps {
  onOpenStorySlideshow: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  isTheatreMode?: boolean;
  onToggleTheatreMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenStorySlideshow,
  isPlayingMusic,
  onToggleMusic,
  isTheatreMode = false,
  onToggleTheatreMode,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Story', href: '#story' },
    { label: 'Journey', href: '#journey' },
    { label: '4 Years', href: '#four-years' },
    { label: 'Memories', href: '#memories' },
    { label: 'Little Movies', href: '#videos' },
    { label: 'Letters', href: '#letters' },
    { label: 'Favorites', href: '#favorites' },
    { label: 'Surprise', href: '#surprise' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-noir/80 backdrop-blur-md border-b border-champagne-500/15 shadow-glass'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Monogram Brand */}
          <a
            href="#"
            className="group flex items-center gap-2.5 text-champagne-200 hover:text-white transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-wine-900/80 border border-champagne-400/30 flex items-center justify-center text-xs tracking-wider font-serif text-roseGold group-hover:border-champagne-400/60 shadow-glow-sm">
              ♡
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-widest text-sm text-champagne-100 group-hover:text-champagne-300 transition-colors">
                {PERSONAL_DATA.names.combined}
              </span>
              <span className="text-[10px] tracking-widest text-champagne-400/60 uppercase">
                Oct 3, 2026
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-xs uppercase tracking-widest text-champagne-200/70 hover:text-champagne-300 transition-colors duration-200 relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-champagne-400 to-crimsonGlow transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Actions: Theatre Mode, Music toggle & Play Our Story */}
          <div className="hidden sm:flex items-center gap-3">
            {onToggleTheatreMode && (
              <button
                onClick={onToggleTheatreMode}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 cursor-pointer ${
                  isTheatreMode
                    ? 'bg-roseGold/20 border-roseGold/60 text-white shadow-glow-md'
                    : 'bg-wine-950/80 border-champagne-500/25 text-champagne-200 hover:border-champagne-400/50 hover:text-white'
                }`}
                title="Toggle Private Theatre Presentation Mode"
              >
                <Tv className={`w-3.5 h-3.5 ${isTheatreMode ? 'text-roseGold animate-pulse' : 'text-champagne-300'}`} />
                <span>{isTheatreMode ? 'Exit Theatre' : 'Theatre Mode 🎬'}</span>
              </button>
            )}

            <button
              onClick={onToggleMusic}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 cursor-pointer ${
                isPlayingMusic
                  ? 'bg-crimsonGlow/15 border-crimsonGlow/40 text-roseGold shadow-glow-sm'
                  : 'bg-wine-900/60 border-champagne-500/20 text-champagne-300 hover:border-champagne-400/40'
              }`}
              title="Toggle romantic ambient music"
            >
              <Volume2 className={`w-3.5 h-3.5 ${isPlayingMusic ? 'animate-pulse text-crimsonGlow' : ''}`} />
              <span>{isPlayingMusic ? 'Music Playing' : 'Play Song ♫'}</span>
            </button>

            <button
              onClick={onOpenStorySlideshow}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-wine-700 via-crimsonGlow/70 to-champagne-500/80 text-white shadow-glow-sm hover:shadow-glow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-champagne-200 animate-pulse" />
              <span>Play Our Story</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onToggleMusic}
              className="p-2 rounded-full text-champagne-300 hover:text-white"
              aria-label="Toggle music"
            >
              <Volume2 className={`w-4 h-4 ${isPlayingMusic ? 'text-crimsonGlow animate-pulse' : ''}`} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-champagne-200 hover:text-white hover:bg-wine-900/50"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-noir/95 backdrop-blur-xl flex flex-col justify-between p-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-6 border-b border-champagne-500/15">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-crimsonGlow fill-crimsonGlow" />
              <span className="font-serif text-lg text-champagne-100">{PERSONAL_DATA.names.combined}</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-champagne-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-4 py-8 overflow-y-auto">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-lg font-serif tracking-wide text-champagne-200 hover:text-champagne-400 py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-champagne-500/15 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStorySlideshow();
              }}
              className="w-full py-3 rounded-full flex items-center justify-center gap-2 bg-gradient-to-r from-wine-700 to-crimsonGlow text-white text-sm font-medium shadow-glow-sm"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Experience "Play Our Story"</span>
            </button>
            <div className="text-center text-xs text-champagne-400/50 font-serif">
              For Ayushi • 17 November 2022 → Forever
            </div>
          </div>
        </div>
      )}
    </>
  );
};
