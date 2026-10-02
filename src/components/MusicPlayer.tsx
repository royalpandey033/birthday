import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Volume1,
  ChevronUp,
  ChevronDown,
  X,
  Music,
  Heart,
  Sparkles,
  ListMusic,
  Disc3,
  AlertCircle,
} from 'lucide-react';
import { PERSONAL_DATA, type SongItem } from '../data/content';
import { romanticAudio } from '../utils/romanticAudio';

interface MusicPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onActivateCinematicMusic?: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  isPlaying,
  onTogglePlay,
  onActivateCinematicMusic,
}) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [volume, setVolume] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('ayushi_music_volume');
      return saved !== null ? parseFloat(saved) : 0.65;
    }
    return 0.65;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(225);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCinematicGlow, setIsCinematicGlow] = useState(false);

  const playlist = PERSONAL_DATA.playlist;
  const currentSong: SongItem = playlist[currentTrackIndex] || playlist[0];
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // Helper to parse duration string "MM:SS" into seconds
  const parseDurationStr = useCallback((durStr?: string) => {
    if (!durStr) return 225;
    const parts = durStr.split(':').map(Number);
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return parts[0] * 60 + parts[1];
    }
    return 225;
  }, []);

  // Format seconds into MM:SS
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Subscribe to audio engine events (time, error, state)
  useEffect(() => {
    const unsubTime = romanticAudio.subscribeTime((curr, dur) => {
      setCurrentTime(curr);
      if (dur > 0) setDuration(dur);
    });

    const unsubError = romanticAudio.subscribeError((msg) => {
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(null), 5000);
    });

    return () => {
      unsubTime();
      unsubError();
    };
  }, []);

  // Sync volume with audio engine and persist in session
  useEffect(() => {
    const targetVol = isMuted ? 0 : volume;
    romanticAudio.setVolume(targetVol);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ayushi_music_volume', targetVol.toString());
    }
  }, [volume, isMuted]);

  // Track switching handler
  const loadTrack = useCallback((index: number, autoPlay: boolean = true) => {
    const track = playlist[index];
    if (!track) return;

    setCurrentTrackIndex(index);
    setCurrentTime(0);
    const estimatedDuration = parseDurationStr(track.duration);
    setDuration(estimatedDuration);

    if (autoPlay) {
      if (track.audioUrl && track.audioUrl.trim() !== '') {
        romanticAudio.playCustomAudio(track.audioUrl, estimatedDuration, () => {
          // Auto advance to next song on ended
          const nextIdx = (index + 1) % playlist.length;
          loadTrack(nextIdx, true);
        });
      } else {
        romanticAudio.startAmbientSynth(0);
      }
    }
  }, [playlist, parseDurationStr]);

  const handleNext = () => {
    const nextIdx = (currentTrackIndex + 1) % playlist.length;
    loadTrack(nextIdx, isPlaying);
  };

  const handlePrev = () => {
    const prevIdx = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(prevIdx, isPlaying);
  };

  const handlePlaySong = (index: number) => {
    setHasInteracted(true);
    if (index === currentTrackIndex && isPlaying) {
      romanticAudio.stop();
    } else {
      loadTrack(index, true);
    }
  };

  const handleFirstTimePlay = () => {
    setHasInteracted(true);
    if (isPlaying) {
      romanticAudio.stop();
    } else {
      loadTrack(currentTrackIndex, true);
    }
  };

  // 10. "Play Our Story ♫" Cinematic Mode
  const handleCinematicMode = () => {
    setHasInteracted(true);
    setIsCinematicGlow(true);
    if (!isPlaying) {
      loadTrack(currentTrackIndex, true);
    }
    if (onActivateCinematicMusic) {
      onActivateCinematicMusic();
    }
    setTimeout(() => setIsCinematicGlow(false), 5000);
  };

  // 5. Seeking
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, clickX / rect.width));
    const targetSeconds = percent * duration;
    setCurrentTime(targetSeconds);
    romanticAudio.seek(targetSeconds);
  };

  // 15. Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not intercept if typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        setHasInteracted(true);
        onTogglePlay();
      } else if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      } else if (e.key === 'ArrowRight' && isExpanded && !e.metaKey && !e.ctrlKey) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && isExpanded && !e.metaKey && !e.ctrlKey) {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, onTogglePlay, currentTrackIndex]);

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <>
      {/* Cinematic Ambient Glow Overlay when "Play Our Story" is active */}
      <div
        className={`fixed inset-0 pointer-events-none z-30 transition-opacity duration-1000 ${
          isCinematicGlow ? 'opacity-100' : 'opacity-0'
        } bg-gradient-to-t from-crimsonGlow/15 via-transparent to-champagne-500/10`}
      />

      <aside
        aria-label="Music Player"
        className="fixed z-40 bottom-4 sm:bottom-6 right-4 sm:right-6 max-w-sm w-full select-none"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        {/* ========================================================================= */}
        {/* 2. FLOATING MINI PLAYER                                                   */}
        {/* ========================================================================= */}
        <div
          className={`glass-panel rounded-2xl border transition-all duration-300 shadow-2xl backdrop-blur-2xl p-3 sm:p-3.5 relative overflow-hidden ${
            isExpanded ? 'border-champagne-400/40 bg-wine-950/90' : 'border-champagne-500/25 bg-wine-950/80 hover:border-champagne-400/40'
          }`}
        >
          {/* Subtle Ambient Sheen */}
          <div className="absolute inset-0 bg-gradient-to-r from-wine-800/10 via-champagne-500/5 to-transparent pointer-events-none" />

          {/* 9. First-time prompt badge if not yet played */}
          {!hasInteracted && !isPlaying && (
            <div
              onClick={handleFirstTimePlay}
              className="mb-2.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-wine-900 to-crimsonGlow/80 border border-champagne-400/40 text-[11px] font-serif text-champagne-100 flex items-center justify-between cursor-pointer shadow-glow-sm hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-champagne-300 animate-pulse" />
                <span>Play our soundtrack ♫</span>
              </div>
              <span className="font-sans text-[10px] text-white/80">Tap to start →</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 relative z-10">
            {/* 4. Album Artwork with Gentle Rotation */}
            <div
              onClick={() => setIsExpanded(!isExpanded)}
              className="relative w-12 h-12 rounded-xl overflow-hidden cursor-pointer group shrink-0 border border-champagne-500/20 shadow-md"
              title="Click to expand player"
            >
              <img
                src={currentSong.albumArt}
                alt={currentSong.title}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '24s' }}
              />
              <div className="absolute inset-0 bg-noir/25 group-hover:bg-noir/10 flex items-center justify-center transition-colors">
                <Disc3 className={`w-5 h-5 text-champagne-200 transition-opacity ${isPlaying ? 'opacity-80' : 'opacity-50'}`} />
              </div>

              {/* Glowing Aura behind artwork when playing */}
              {isPlaying && (
                <div className="absolute -inset-1 rounded-xl bg-champagne-500/20 blur-xs pointer-events-none animate-pulse-glow" />
              )}
            </div>

            {/* Song Metadata */}
            <div
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex-1 min-w-0 cursor-pointer text-left pr-1"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-serif text-white truncate hover:text-champagne-200 transition-colors">
                  {currentSong.title}
                </span>
                {isPlaying && (
                  <span className="w-1.5 h-1.5 rounded-full bg-crimsonGlow animate-ping shrink-0" />
                )}
              </div>
              <span className="text-[10px] text-champagne-400/70 font-sans truncate block">
                {currentSong.artist}
              </span>
            </div>

            {/* Controls Cluster */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Play / Pause Button */}
              <button
                onClick={() => {
                  setHasInteracted(true);
                  if (isPlaying) {
                    romanticAudio.stop();
                  } else {
                    loadTrack(currentTrackIndex, true);
                  }
                }}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  isPlaying
                    ? 'bg-gradient-to-r from-crimsonGlow to-wine-600 text-white shadow-glow-sm scale-105'
                    : 'bg-wine-900/90 border border-champagne-400/40 text-champagne-200 hover:text-white hover:scale-105'
                }`}
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current translate-x-0.5" />
                )}
              </button>

              {/* Expand / Minimize Toggle */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg text-champagne-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                aria-label={isExpanded ? 'Collapse player' : 'Expand player'}
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronUp className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Mini progress indicator under pill */}
          <div
            ref={progressBarRef}
            onClick={handleSeek}
            className="w-full bg-noir/70 h-1.5 rounded-full mt-2.5 overflow-hidden cursor-pointer group"
            title="Click to seek"
          >
            <div
              className="h-full bg-gradient-to-r from-crimsonGlow via-roseGold to-champagne-400 rounded-full transition-all duration-150"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Error Message Notification */}
          {errorMessage && (
            <div className="mt-2 text-[10px] text-champagne-300 font-serif italic flex items-center gap-1.5 px-2 py-1 rounded bg-wine-950/80 border border-champagne-500/20">
              <AlertCircle className="w-3 h-3 text-roseGold shrink-0" />
              <span>{errorMessage} Playing ambient piano melody...</span>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 3. EXPANDED MUSIC PANEL                                                   */}
        {/* ========================================================================= */}
        {isExpanded && (
          <div
            className="mt-3 glass-panel rounded-3xl p-5 sm:p-6 border border-champagne-500/30 shadow-2xl backdrop-blur-2xl animate-fadeIn relative overflow-hidden"
            style={{ maxHeight: '80vh', overflowY: 'auto' }}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-champagne-500/15">
              <div className="flex items-center gap-2">
                <Music className="w-3.5 h-3.5 text-roseGold" />
                <span className="font-serif tracking-widest uppercase text-[10px] text-champagne-300">
                  The Soundtrack of Our Story
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer flex items-center gap-1 ${
                    showPlaylist ? 'bg-wine-800 text-champagne-200' : 'text-champagne-400 hover:text-white'
                  }`}
                  title="Toggle playlist"
                >
                  <ListMusic className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 text-champagne-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  aria-label="Close expanded player"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Content: Current Song or Playlist View */}
            {!showPlaylist ? (
              <div className="flex flex-col items-center text-center">
                {/* 4. Central Album Artwork */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden mb-4 border-2 border-champagne-500/30 shadow-2xl group">
                  <img
                    src={currentSong.albumArt}
                    alt={currentSong.title}
                    className={`w-full h-full object-cover transition-transform duration-1000 ${
                      isPlaying ? 'scale-105' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent" />

                  {/* Gentle Glow behind artwork */}
                  {isPlaying && (
                    <div className="absolute -inset-2 bg-gradient-to-r from-crimsonGlow/30 to-champagne-500/20 blur-md pointer-events-none -z-10 animate-pulse-glow" />
                  )}
                </div>

                {/* Song Title & Artist */}
                <h4 className="font-serif text-xl sm:text-2xl text-white font-normal mb-1 tracking-tight">
                  {currentSong.title}
                </h4>
                <p className="text-xs font-sans text-roseGold mb-1.5">
                  {currentSong.artist}
                </p>

                {/* External Link or Local Playable Badge */}
                {currentSong.externalUrl && (
                  <a
                    href={currentSong.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-wine-900/80 border border-champagne-500/25 text-[11px] font-sans text-champagne-200 hover:text-white hover:border-champagne-300 transition-colors mb-3 cursor-pointer shadow-glow-sm"
                  >
                    <span>Listen on Spotify</span>
                    <span className="text-roseGold font-mono">↗</span>
                  </a>
                )}

                {/* Memory Reference Quote */}
                {currentSong.memoryReference && (
                  <p className="text-[11px] font-serif italic text-champagne-200/80 mb-4 px-4 line-clamp-2">
                    "{currentSong.memoryReference}"
                  </p>
                )}

                {/* 13. Subtle Animated Audio Visualizer (16 bars) */}
                <div className="flex items-end justify-center gap-1 h-7 my-2 w-full px-8">
                  {Array.from({ length: 16 }).map((_, barIdx) => {
                    // Height variations based on sine wave when playing, idle 4px when paused
                    const dynamicHeight = isPlaying
                      ? `${Math.max(15, Math.sin(barIdx * 0.45 + (currentTime * 2.5)) * 80 + 20)}%`
                      : '15%';

                    return (
                      <div
                        key={barIdx}
                        className="w-1 rounded-full bg-gradient-to-t from-wine-700 via-roseGold to-champagne-400 transition-all duration-300"
                        style={{ height: dynamicHeight }}
                      />
                    );
                  })}
                </div>

                {/* 5. Progress Bar & Scrubbing */}
                <div className="w-full mt-3 mb-4">
                  <div
                    ref={progressBarRef}
                    onClick={handleSeek}
                    className="w-full bg-noir/80 h-2 rounded-full overflow-hidden cursor-pointer relative group border border-champagne-500/15"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-crimsonGlow via-roseGold to-champagne-400 rounded-full transition-all duration-100 relative"
                      style={{ width: `${progressPercent}%` }}
                    >
                      {/* Scrub handle */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md border border-champagne-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-champagne-400/80 mt-1.5 px-0.5">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Main Player Buttons (Previous, Play/Pause, Next) */}
                <div className="flex items-center justify-center gap-6 mb-4">
                  <button
                    onClick={handlePrev}
                    className="p-2.5 rounded-full text-champagne-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer hover:scale-110"
                    aria-label="Previous track"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => {
                      setHasInteracted(true);
                      if (isPlaying) {
                        romanticAudio.stop();
                      } else {
                        loadTrack(currentTrackIndex, true);
                      }
                    }}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-crimsonGlow via-wine-600 to-champagne-600 text-white flex items-center justify-center shadow-glow-sm hover:scale-105 transition-all cursor-pointer"
                    aria-label={isPlaying ? 'Pause music' : 'Play music'}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 fill-current" />
                    ) : (
                      <Play className="w-5 h-5 fill-current translate-x-0.5" />
                    )}
                  </button>

                  <button
                    onClick={handleNext}
                    className="p-2.5 rounded-full text-champagne-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer hover:scale-110"
                    aria-label="Next track"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>

                {/* 10. "Play Our Story ♫" Cinematic Mode Button */}
                <div className="mb-4 w-full">
                  <button
                    onClick={handleCinematicMode}
                    className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-wine-900/80 via-wine-800 to-crimsonGlow/40 hover:from-wine-800 hover:to-crimsonGlow/60 border border-champagne-400/30 text-xs font-serif text-champagne-100 flex items-center justify-center gap-2 transition-all shadow-glow-sm hover:scale-[1.01] cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-champagne-300 animate-pulse" />
                    <span>Play Our Story ♫</span>
                  </button>
                </div>

                {/* 16. Volume Control Slider */}
                <div className="flex items-center gap-2.5 w-full pt-2 border-t border-champagne-500/10">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-champagne-400 hover:text-white p-1 transition-colors cursor-pointer"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-crimsonGlow" />
                    ) : volume < 0.5 ? (
                      <Volume1 className="w-4 h-4 text-champagne-300" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-champagne-300" />
                    )}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      setVolume(v);
                      if (v > 0 && isMuted) setIsMuted(false);
                    }}
                    className="w-full h-1 bg-noir/90 accent-champagne-400 rounded-lg cursor-pointer"
                    aria-label="Volume slider"
                  />

                  <span className="text-[10px] font-mono text-champagne-400/70 w-8 text-right">
                    {Math.round((isMuted ? 0 : volume) * 100)}%
                  </span>
                </div>
              </div>
            ) : (
              /* 6. PLAYLIST DRAWER */
              <div>
                <div className="flex items-center justify-between mb-3 text-xs text-champagne-300 font-serif">
                  <span>Our Playlist ({playlist.length} songs)</span>
                  <button
                    onClick={() => setShowPlaylist(false)}
                    className="text-[10px] text-roseGold hover:underline cursor-pointer"
                  >
                    ← Back to player
                  </button>
                </div>

                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {playlist.map((track, tIdx) => {
                    const isSelected = tIdx === currentTrackIndex;

                    return (
                      <div
                        key={track.id}
                        onClick={() => handlePlaySong(tIdx)}
                        className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-wine-900/80 border-champagne-400/50 shadow-glow-sm'
                            : 'bg-noir/40 border-champagne-500/10 hover:border-champagne-400/30 hover:bg-wine-950/60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-champagne-500/20">
                            <img
                              src={track.albumArt}
                              alt={track.title}
                              className="w-full h-full object-cover"
                            />
                            {isSelected && isPlaying && (
                              <div className="absolute inset-0 bg-noir/50 flex items-center justify-center">
                                <Music className="w-3.5 h-3.5 text-champagne-200 animate-pulse" />
                              </div>
                            )}
                          </div>

                          <div className="text-left min-w-0">
                            <span className="text-xs font-serif text-white truncate block">
                              {track.title}
                            </span>
                            <span className="text-[10px] text-champagne-400/70 truncate block">
                              {track.artist}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {track.externalUrl && (
                            <a
                              href={track.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-[10px] text-roseGold hover:text-white px-2 py-0.5 rounded bg-wine-950/80 border border-champagne-500/20 transition-colors"
                              title="Listen on Spotify"
                            >
                              Spotify ↗
                            </a>
                          )}
                          {track.duration && (
                            <span className="text-[10px] font-mono text-champagne-400/60">
                              {track.duration}
                            </span>
                          )}
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              isSelected && isPlaying
                                ? 'bg-crimsonGlow text-white'
                                : 'bg-white/10 text-champagne-300'
                            }`}
                          >
                            {isSelected && isPlaying ? (
                              <Pause className="w-3 h-3 fill-current" />
                            ) : (
                              <Play className="w-3 h-3 fill-current translate-x-0.5" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 18. Soundscape & Upload Helper */}
                <div className="mt-4 pt-3 border-t border-champagne-500/10 text-center text-[10px] text-champagne-400/60 font-serif italic">
                  <span>Full tracks can be streamed via Spotify, or add MP3s into </span>
                  <code className="text-roseGold font-mono">/public/music/</code>
                </div>
              </div>
            )}

            {/* Dedication footer */}
            <div className="mt-4 pt-3 border-t border-champagne-500/10 text-center text-[10px] text-champagne-400/60 font-serif italic flex items-center justify-center gap-1.5">
              <Heart className="w-3 h-3 text-crimsonGlow fill-crimsonGlow" />
              <span>Dedicated with all my love to Ayushi</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
