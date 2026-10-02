import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Tv,
  X,
  ChevronRight,
  ChevronLeft,
  Film,
  Sparkles,
} from 'lucide-react';
import { THEATRE_SCENES, type TheatreScene } from './CinematicTheatre';

interface DirectorModeProps {
  isTheatreActive: boolean;
  onEnterTheatre: () => void;
  onExitTheatre: () => void;
  currentScene: TheatreScene;
  onJumpToScene: (scene: TheatreScene) => void;
  onNextScene: () => void;
  onPrevScene: () => void;
  onReplayScene: () => void;
  onReplayMovie: () => void;
  isPaused: boolean;
  onTogglePause: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
}

export const DirectorMode: React.FC<DirectorModeProps> = ({
  isTheatreActive,
  onEnterTheatre,
  onExitTheatre,
  currentScene,
  onJumpToScene,
  onNextScene,
  onPrevScene,
  onReplayScene,
  onReplayMovie,
  isPaused,
  onTogglePause,
  isPlayingMusic,
  onToggleMusic,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle Director Panel with Shift+D or Ctrl+D
  // Strictly hidden from Ayushi during normal viewing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if ((e.shiftKey && e.key.toLowerCase() === 'd') || (e.ctrlKey && e.key.toLowerCase() === 'd')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) {
    return null; // Zero visible UI for Ayushi until Shift+D or Ctrl+D is triggered
  }

  const activeSceneMeta = THEATRE_SCENES.find((s) => s.id === currentScene) || THEATRE_SCENES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0c050a] border border-champagne-400/40 shadow-2xl p-6 sm:p-8 text-champagne-100 overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-roseGold/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-champagne-500/20 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-wine-900 border border-champagne-400/35 flex items-center justify-center text-roseGold shadow-glow-sm">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl text-white">Director Control Room</h3>
                <span className="px-2 py-0.5 rounded-full bg-crimsonGlow/20 border border-crimsonGlow/40 text-[10px] font-mono text-roseGold uppercase">
                  Private
                </span>
              </div>
              <p className="text-xs text-champagne-400/70 font-sans">
                Presentation State Machine • Press <kbd className="font-mono text-white">Shift+D</kbd> or <kbd className="font-mono text-white">Ctrl+D</kbd> to close
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-white/10 text-champagne-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Director Mode"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Presentation Status Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-noir/70 border border-champagne-500/20 mb-6 text-xs">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-champagne-400/60 block">Status</span>
            <span className="font-serif text-white font-medium">
              {isTheatreActive ? '🎬 Cinema Active' : '🌐 Website Mode'}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-champagne-400/60 block">Current Scene</span>
            <span className="font-serif text-roseGold font-medium">
              {activeSceneMeta.number}. {activeSceneMeta.title}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-champagne-400/60 block">Playback</span>
            <span className="font-serif text-champagne-200">
              {isPaused ? '⏸ Paused' : '▶ Playing'}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-champagne-400/60 block">Soundtrack</span>
            <span className="font-serif text-champagne-200">
              {isPlayingMusic ? '♫ Playing' : '✕ Muted'}
            </span>
          </div>
        </div>

        {/* Master Playback Controls */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-serif uppercase tracking-widest text-champagne-400/80">
              Master Controls
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Start / Resume / Pause */}
            {!isTheatreActive ? (
              <button
                onClick={() => {
                  onEnterTheatre();
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-wine-700 to-crimsonGlow text-white text-xs font-serif uppercase tracking-wider shadow-glow-sm hover:scale-105 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>START PRESENTATION</span>
              </button>
            ) : (
              <button
                onClick={onTogglePause}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-wine-900 border border-champagne-400/35 text-white text-xs font-serif uppercase tracking-wider hover:bg-wine-800 transition-all cursor-pointer"
              >
                {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
                <span>{isPaused ? 'RESUME' : 'PAUSE'}</span>
              </button>
            )}

            {/* Prev Scene */}
            <button
              onClick={onPrevScene}
              disabled={!isTheatreActive}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-wine-950 border border-champagne-500/20 text-champagne-200 hover:text-white disabled:opacity-40 text-xs font-serif cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>PREVIOUS SCENE</span>
            </button>

            {/* Next Scene */}
            <button
              onClick={onNextScene}
              disabled={!isTheatreActive}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-wine-950 border border-champagne-500/20 text-champagne-200 hover:text-white disabled:opacity-40 text-xs font-serif cursor-pointer"
            >
              <span>NEXT SCENE</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Replay Scene */}
            <button
              onClick={onReplayScene}
              disabled={!isTheatreActive}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-wine-950 border border-champagne-500/20 text-champagne-200 hover:text-white disabled:opacity-40 text-xs font-serif cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>REPLAY SCENE</span>
            </button>

            {/* Replay Movie */}
            <button
              onClick={onReplayMovie}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-wine-950 border border-champagne-500/20 text-champagne-200 hover:text-white text-xs font-serif cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
              <span>REPLAY MOVIE</span>
            </button>

            {/* Music Play/Pause */}
            <button
              onClick={onToggleMusic}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-wine-950 border border-champagne-500/20 text-champagne-200 hover:text-white text-xs font-serif cursor-pointer"
            >
              {isPlayingMusic ? <Volume2 className="w-3.5 h-3.5 text-roseGold" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{isPlayingMusic ? 'MUTE MUSIC' : 'PLAY MUSIC'}</span>
            </button>

            {/* Theatre Mode Toggle */}
            <button
              onClick={() => {
                if (isTheatreActive) {
                  onExitTheatre();
                } else {
                  onEnterTheatre();
                }
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-serif cursor-pointer transition-colors ${
                isTheatreActive
                  ? 'bg-roseGold/20 border-roseGold text-white shadow-glow-sm'
                  : 'bg-wine-950 border-champagne-500/20 text-champagne-200 hover:text-white'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>{isTheatreActive ? 'EXIT THEATRE MODE' : 'THEATRE MODE'}</span>
            </button>
          </div>
        </div>

        {/* 9 Scene Jumper List */}
        <div>
          <span className="text-xs font-serif uppercase tracking-widest text-champagne-400/80 block mb-3">
            Scene List (Direct Jump)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {THEATRE_SCENES.map((scene) => {
              const isCurrent = currentScene === scene.id;
              return (
                <button
                  key={scene.id}
                  onClick={() => {
                    if (!isTheatreActive) {
                      onEnterTheatre();
                    }
                    onJumpToScene(scene.id);
                  }}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-gradient-to-r from-wine-800 to-crimsonGlow border-champagne-300 text-white shadow-glow-sm'
                      : 'bg-noir/60 border-champagne-500/15 text-champagne-300 hover:border-champagne-400/40 hover:text-white hover:bg-wine-950/60'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono text-champagne-400/70 text-[11px]">
                      0{scene.number}
                    </span>
                    <span className="font-serif truncate">{scene.title}</span>
                  </div>
                  {isCurrent && <span className="w-2 h-2 rounded-full bg-roseGold animate-pulse shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
