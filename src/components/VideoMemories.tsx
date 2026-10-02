import React, { useState, useEffect } from 'react';
import { Film, Play, X, Calendar, Clock, Volume2, VolumeX } from 'lucide-react';
import { PERSONAL_DATA, type VideoMemory } from '../data/content';

export const VideoMemories: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoMemory | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedVideo(null);
      }
    };
    if (selectedVideo) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideo]);

  const handleOpenVideo = (video: VideoMemory) => {
    setSelectedVideo(video);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <section id="videos" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Radiance */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-wine-800/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-wine-900/80 border border-champagne-500/20 text-xs text-champagne-300 mb-4">
            <Film className="w-3.5 h-3.5 text-champagne-400" />
            <span className="font-serif tracking-widest uppercase text-[11px]">
              Moving Moments
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight mb-4">
            Our Little Movies 🎬
          </h2>
          <p className="text-sm sm:text-base text-champagne-200/70 font-light leading-relaxed">
            The small clips, the candid laughter, and the fleeting moments we frozen in motion.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PERSONAL_DATA.videos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => handleOpenVideo(vid)}
              className="glass-panel glass-panel-hover rounded-3xl overflow-hidden border border-champagne-500/20 cursor-pointer group shadow-glass"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden bg-noir/80 flex items-center justify-center">
                <img
                  src={vid.thumbnail}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-110 pointer-events-none"
                />
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  loading="lazy"
                  className="relative z-10 max-h-full max-w-full object-contain transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-noir/40 group-hover:bg-noir/20 transition-colors z-10" />

                {/* Big Center Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-wine-900/90 border border-champagne-400/40 text-champagne-100 flex items-center justify-center shadow-glow-md transform transition-all duration-300 group-hover:scale-110 group-hover:bg-crimsonGlow">
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-noir/80 backdrop-blur-md text-[11px] text-champagne-300 font-mono border border-champagne-500/20 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-champagne-400" />
                  <span>{vid.duration}</span>
                </div>

                {/* Slot Tag */}
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-noir/70 text-[10px] text-roseGold font-mono border border-champagne-500/20">
                  {vid.slot}
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-champagne-400/80 mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{vid.date}</span>
                </div>

                <h3 className="text-lg font-serif text-white mb-2 group-hover:text-champagne-300 transition-colors">
                  {vid.title}
                </h3>

                <p className="text-xs text-champagne-200/70 font-light leading-relaxed">
                  {vid.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player (Never autoplays with sound) */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-noir/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={handleCloseVideo}
        >
          {/* Close Modal Button */}
          <button
            onClick={handleCloseVideo}
            className="absolute top-6 right-6 p-3 rounded-full bg-wine-900/80 border border-champagne-500/30 text-champagne-200 hover:text-white hover:border-champagne-400 z-50 shadow-glow-sm"
            aria-label="Close video player"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div
            className="relative max-w-4xl w-full glass-panel rounded-3xl overflow-hidden border border-champagne-500/30 shadow-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black shadow-inner">
              <video
                src={selectedVideo.videoUrl}
                controls
                autoPlay
                muted={isMuted}
                playsInline
                className="w-full h-full object-contain"
              />
            </div>

            {/* Video Details & Mute Quick Toggle */}
            <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-champagne-400 mb-1">
                  <span>{selectedVideo.date}</span>
                  <span>•</span>
                  <span>Duration: {selectedVideo.duration}</span>
                  <span>•</span>
                  <span className="font-mono text-roseGold">{selectedVideo.slot}</span>
                </div>
                <h3 className="text-xl font-serif text-white">{selectedVideo.title}</h3>
                <p className="text-sm text-champagne-200/80 font-serif italic mt-1">
                  "{selectedVideo.caption}"
                </p>
              </div>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wine-900 border border-champagne-500/20 text-xs text-champagne-200 hover:text-white"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-crimsonGlow" />
                    <span>Unmute Video</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-champagne-400" />
                    <span>Mute Video</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
