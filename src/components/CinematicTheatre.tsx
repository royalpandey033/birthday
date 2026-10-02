import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  X,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Heart,
  Calendar,
  Disc3,
  Feather,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_DATA, type SongItem } from '../data/content';
import { romanticAudio } from '../utils/romanticAudio';

export type TheatreScene =
  | 'OPENING'
  | 'OUR_STORY'
  | 'FIRST_MEET'
  | 'MONTAGE'
  | 'SOUNDTRACK'
  | 'LETTER'
  | 'BIRTHDAY'
  | 'SURPRISE'
  | 'FINALE';

export interface SceneMeta {
  id: TheatreScene;
  number: number;
  title: string;
  shortLabel: string;
}

export const THEATRE_SCENES: SceneMeta[] = [
  { id: 'OPENING', number: 1, title: 'Cinematic Opening', shortLabel: 'Opening' },
  { id: 'OUR_STORY', number: 2, title: 'Our Story', shortLabel: 'Story' },
  { id: 'FIRST_MEET', number: 3, title: 'First Meeting', shortLabel: 'Meeting' },
  { id: 'MONTAGE', number: 4, title: 'Memory Montage', shortLabel: 'Montage' },
  { id: 'SOUNDTRACK', number: 5, title: 'Soundtrack', shortLabel: 'Music' },
  { id: 'LETTER', number: 6, title: 'Letter for Ayushi', shortLabel: 'Letter' },
  { id: 'BIRTHDAY', number: 7, title: 'Birthday Reveal', shortLabel: 'Birthday' },
  { id: 'SURPRISE', number: 8, title: 'Secret Surprise', shortLabel: 'Surprise' },
  { id: 'FINALE', number: 9, title: 'Final Ending', shortLabel: 'Ending' },
];

interface CinematicTheatreProps {
  isOpen: boolean;
  onClose: () => void;
  currentScene?: TheatreScene;
  initialScene?: TheatreScene;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onSceneChange?: (scene: TheatreScene) => void;
  isPausedExternal?: boolean;
  onTogglePause?: () => void;
}

export const CinematicTheatre: React.FC<CinematicTheatreProps> = ({
  isOpen,
  onClose,
  currentScene: externalScene,
  initialScene = 'OPENING',
  isPlayingMusic,
  onToggleMusic,
  onSceneChange,
  isPausedExternal,
  onTogglePause,
}) => {
  const [internalScene, setInternalScene] = useState<TheatreScene>(initialScene);
  const currentScene = externalScene || internalScene;
  const [internalPaused, setInternalPaused] = useState(false);
  const isPaused = isPausedExternal !== undefined ? isPausedExternal : internalPaused;
  const togglePause = onTogglePause || (() => setInternalPaused((p) => !p));
  const [openingStage, setOpeningStage] = useState(0);

  // Timeline sub-step (0: Online Beginning, 1: First Video Call, 2: First Meet In Person)
  const [timelineStep, setTimelineStep] = useState(0);

  // Montage state
  const [montageIndex, setMontageIndex] = useState(0);

  // Soundtrack state
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(225);

  // Letter state
  const [letterIndex, setLetterIndex] = useState(4); // Default to Letter 5 (Birthday) or 0
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  // Birthday Climax stage
  const [birthdayStage, setBirthdayStage] = useState(0);

  // Cinema UI Auto-Hide
  const [showControls, setShowControls] = useState(true);
  const mouseTimerRef = useRef<any>(null);

  // Real Personal Memories Photos for Montage
  const montagePhotos = [
    '/images/img.jpeg',
    '/images/memories/IMG_20260425_100705.jpg',
    '/images/memories/IMG_20260219_001259.jpg',
    '/images/memories/IMG-20250824-WA0044.jpg',
    '/images/memories/IMG-20260205-WA0053.jpg',
    '/images/memories/IMG-20260207-WA0220.jpg',
    '/images/memories/IMG-20260429-WA0009(1).jpg',
    '/images/memories/IMG-20260701-WA0037.jpg',
    '/images/memories/IMG_20260525_184623.jpg',
    '/images/memories/Snapchat-1216840361.jpg',
    '/images/memories/Snapchat-553332513.jpg',
    '/images/memories/Snapchat-915044461.jpg',
    '/images/memories/WhatsApp Image 2023-10-03 at 00.49.49_b521b0f5.jpg',
    '/images/memories/WhatsApp Image 2023-12-31 at 12.37.39 PM.jpeg',
    '/images/memories/WhatsApp Image 2026-09-30 at 2.52.25 PM.jpeg',
    '/images/memories/WhatsApp Image 2026-09-30 at 2.52.26 PM.jpeg',
    '/images/ayushi-balcony-portrait.jpg',
    '/images/4yeartogether.jpeg',
    '/images/our-hands-holding.jpg',
  ];

  const playlist: SongItem[] = PERSONAL_DATA.playlist;
  const currentSong = playlist[trackIndex] || playlist[0];
  const letters = PERSONAL_DATA.letters;
  const currentLetter = letters[letterIndex] || letters[0];

  // Update initial scene if prop changes
  useEffect(() => {
    if (initialScene) {
      setInternalScene(initialScene);
    }
  }, [initialScene]);

  // Notify parent of scene change
  useEffect(() => {
    if (onSceneChange) {
      onSceneChange(currentScene);
    }
  }, [currentScene, onSceneChange]);

  // Lock body scroll in theatre mode
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

  // Auto-hide controls when mouse is inactive for 3.5s
  const handleMouseMove = () => {
    setShowControls(true);
    if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current);
    mouseTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3500);
  };

  // Subscribe to audio engine for progress
  useEffect(() => {
    const unsub = romanticAudio.subscribeTime((curr, dur) => {
      setCurrentTime(curr);
      if (dur > 0) setDuration(dur);
    });
    return () => unsub();
  }, []);

  // SCENE 1: Cinematic Opening Sequence
  useEffect(() => {
    if (currentScene !== 'OPENING') {
      setOpeningStage(0);
      return;
    }

    const t1 = setTimeout(() => setOpeningStage(1), 800);  // "A Little Story About Us"
    const t2 = setTimeout(() => setOpeningStage(2), 2600); // "For Ayushi"
    const t3 = setTimeout(() => setOpeningStage(3), 4400); // "Since 17 November 2022"
    const t4 = setTimeout(() => setOpeningStage(4), 6200); // Begin CTA

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [currentScene]);

  // SCENE 3: Montage Auto-Advance
  useEffect(() => {
    if (currentScene !== 'MONTAGE' || isPaused) return;

    const timer = setInterval(() => {
      setMontageIndex((prev) => (prev + 1) % montagePhotos.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [currentScene, isPaused, montagePhotos.length]);

  // SCENE 6: Birthday Climax Sequence
  useEffect(() => {
    if (currentScene !== 'BIRTHDAY') {
      setBirthdayStage(0);
      return;
    }

    // Step 1: Dark screen pause
    setBirthdayStage(1);

    // Step 2: Soft glow & stars
    const t1 = setTimeout(() => setBirthdayStage(2), 1200);

    // Step 3: Happy Birthday, Ayushi reveal
    const t2 = setTimeout(() => {
      setBirthdayStage(3);
      // Delicate gold & rose stardust burst
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#dfa45f', '#e9a89b', '#d83a56', '#ffffff'],
        ticks: 240,
        gravity: 0.75,
        scalar: 0.85,
      });
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [currentScene]);

  // Keyboard Shortcuts (Space: Pause/Play, ArrowRight: Next, ArrowLeft: Prev, Esc: Exit)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.code === 'Space') {
        e.preventDefault();
        togglePause();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextScene();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevScene();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentScene, timelineStep, togglePause]);

  // Navigation state machine with all 9 scenes
  const scenesList: TheatreScene[] = [
    'OPENING',
    'OUR_STORY',
    'FIRST_MEET',
    'MONTAGE',
    'SOUNDTRACK',
    'LETTER',
    'BIRTHDAY',
    'SURPRISE',
    'FINALE',
  ];

  const jumpToScene = (scene: TheatreScene) => {
    if (onSceneChange) {
      onSceneChange(scene);
    }
    setInternalScene(scene);
    setEnvelopeOpened(false);
  };

  const handleNextScene = () => {
    // If in OUR_STORY and on step 0, go to step 1 (First Video Call)
    if (currentScene === 'OUR_STORY' && timelineStep === 0) {
      setTimelineStep(1);
      return;
    }
    const currentIdx = scenesList.indexOf(currentScene);
    if (currentIdx < scenesList.length - 1) {
      jumpToScene(scenesList[currentIdx + 1]);
    }
  };

  const handlePrevScene = () => {
    if (currentScene === 'OUR_STORY' && timelineStep === 1) {
      setTimelineStep(0);
      return;
    }
    const currentIdx = scenesList.indexOf(currentScene);
    if (currentIdx > 0) {
      jumpToScene(scenesList[currentIdx - 1]);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 bg-[#060205] text-champagne-100 flex flex-col justify-between overflow-hidden select-none animate-fadeIn"
      style={{
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {/* Background Soft Breathing Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-wine-900/25 via-crimsonGlow/15 to-champagne-400/10 rounded-full blur-[180px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-wine-950/60 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed inset-0 bg-grain opacity-25 pointer-events-none" />

      {/* ========================================================================= */}
      {/* TOP THEATRE BAR (Auto-hiding during movie viewing)                        */}
      {/* ========================================================================= */}
      <header
        className={`relative z-50 w-full px-6 sm:px-12 py-5 flex items-center justify-between transition-opacity duration-500 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Film Title Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-wine-900/80 border border-champagne-400/30 flex items-center justify-center text-xs font-serif text-roseGold shadow-glow-sm">
            ♡
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-widest text-sm text-champagne-100">
              For Ayushi
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-champagne-400/60">
              Private Cinema Edition • 16:9
            </span>
          </div>
        </div>

        {/* Scene Navigation Pills */}
        <nav className="hidden xl:flex items-center gap-1 p-1 rounded-full bg-wine-950/80 border border-champagne-500/20 backdrop-blur-xl">
          {THEATRE_SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => jumpToScene(scene.id)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-serif uppercase tracking-wider transition-all cursor-pointer ${
                currentScene === scene.id
                  ? 'bg-gradient-to-r from-wine-700 to-crimsonGlow text-white shadow-glow-sm'
                  : 'text-champagne-400/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {scene.number}. {scene.shortLabel}
            </button>
          ))}
        </nav>

        {/* Top Right: Music Toggle & Exit Theatre Mode */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMusic}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
              isPlayingMusic
                ? 'bg-crimsonGlow/20 border-crimsonGlow/40 text-roseGold shadow-glow-sm'
                : 'bg-wine-950/80 border-champagne-500/20 text-champagne-300 hover:border-champagne-400/40'
            }`}
            title="Toggle Soundtrack"
          >
            {isPlayingMusic ? <Volume2 className="w-3.5 h-3.5 animate-pulse text-crimsonGlow" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isPlayingMusic ? 'Soundtrack Playing' : 'Muted'}</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-wine-900/80 hover:bg-wine-800 border border-champagne-400/40 text-champagne-100 hover:text-white text-xs font-serif tracking-wider shadow-glow-sm transition-all cursor-pointer"
            aria-label="Exit Theatre Mode"
          >
            <span>Exit Theatre</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN CINEMATIC PRESENTATION STAGE                                         */}
      {/* ========================================================================= */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center p-4 sm:p-8 max-w-7xl mx-auto w-full">
        
        {/* ----------------------------------------------------------------------- */}
        {/* SCENE 01: CINEMATIC OPENING                                             */}
        {/* ----------------------------------------------------------------------- */}
        {currentScene === 'OPENING' && (
          <div className="text-center space-y-8 max-w-4xl mx-auto animate-fadeIn select-none">
            <div
              className={`transition-all duration-1000 ease-out ${
                openingStage >= 1
                  ? 'opacity-100 translate-y-0 filter-none'
                  : 'opacity-0 translate-y-8 blur-sm'
              }`}
            >
              <span className="text-xs sm:text-sm uppercase tracking-[0.4em] text-champagne-400/70 font-sans block mb-3">
                A Personal Film For You
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-tight">
                A Little Story About Us
              </h1>
            </div>

            <div
              className={`transition-all duration-1000 ease-out ${
                openingStage >= 2
                  ? 'opacity-100 translate-y-0 filter-none'
                  : 'opacity-0 translate-y-8 blur-sm'
              }`}
            >
              <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-wine-900/80 border border-champagne-400/35 text-roseGold text-xl sm:text-3xl font-serif shadow-glow-md">
                <Sparkles className="w-5 h-5 text-champagne-300 animate-pulse" />
                <span>For Ayushi ❤️</span>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 ease-out ${
                openingStage >= 3
                  ? 'opacity-100 translate-y-0 filter-none'
                  : 'opacity-0 translate-y-8 blur-sm'
              }`}
            >
              <p className="text-base sm:text-2xl text-champagne-200/90 font-serif italic max-w-2xl mx-auto leading-relaxed">
                "Since 17 November 2022 — Four years of quiet laughter, late conversations, and moments that became home."
              </p>
            </div>

            <div
              className={`pt-6 transition-all duration-1000 ease-out flex items-center justify-center gap-4 ${
                openingStage >= 4
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
            >
              <button
                onClick={() => jumpToScene('OUR_STORY')}
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-wine-700 via-crimsonGlow to-champagne-500 text-white text-xs sm:text-sm font-serif uppercase tracking-[0.2em] shadow-glow-md hover:scale-105 transition-all cursor-pointer"
              >
                <span>Begin The Story</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SCENE 02: OUR STORY (Online Beginning & First Video Call)               */}
        {/* ----------------------------------------------------------------------- */}
        {currentScene === 'OUR_STORY' && (
          <div className="w-full max-w-5xl mx-auto animate-fadeIn">
            {/* Step 0: ONLINE BEGINNING */}
            {timelineStep === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden glass-panel border border-champagne-500/30 shadow-2xl p-2 bg-black/60">
                  <img
                    src="/images/img.jpeg"
                    alt="The Online Beginning"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent pointer-events-none rounded-2xl" />
                </div>

                <div className="lg:col-span-6 text-left space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wine-900/80 border border-champagne-500/20 text-xs font-mono text-champagne-300 uppercase tracking-widest">
                    <Calendar className="w-3.5 h-3.5 text-champagne-400" />
                    <span>17 November 2022</span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-tight">
                    The Online Beginning
                  </h2>

                  <p className="text-base sm:text-xl text-champagne-200/90 font-serif italic leading-relaxed">
                    "Our relationship began online. What started as simple messages quickly became late-night conversations and the quiet realization that neither of us wanted the night to end."
                  </p>

                  <div className="pt-4 flex items-center gap-3">
                    <button
                      onClick={() => setTimelineStep(1)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-wine-900/90 hover:bg-wine-800 border border-champagne-400/35 text-white text-xs font-serif uppercase tracking-widest shadow-glow-sm hover:scale-105 transition-all cursor-pointer"
                    >
                      <span>Next: First Video Call</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: FIRST VIDEO CALL */}
            {timelineStep === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden glass-panel border border-champagne-500/30 shadow-2xl p-2 bg-black/60">
                  <img
                    src="/images/firstvideocall.jpg"
                    alt="First Video Call"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent pointer-events-none rounded-2xl" />
                </div>

                <div className="lg:col-span-6 text-left space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wine-900/80 border border-champagne-500/20 text-xs font-mono text-champagne-300 uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
                    <span>Milestone Milestone</span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-tight">
                    The First Video Call
                  </h2>

                  <p className="text-base sm:text-xl text-champagne-200/90 font-serif italic leading-relaxed">
                    "The very first time we saw each other face-to-face was through a video call. The screen felt small, but the laughter and your smile filled the entire room."
                  </p>

                  <p className="text-xs text-champagne-400/60 font-serif italic">
                    The exact date is held in our memories, but that smile made everything real.
                  </p>

                  <div className="pt-4 flex items-center gap-3">
                    <button
                      onClick={() => setTimelineStep(0)}
                      className="p-3 rounded-full bg-wine-950 border border-champagne-500/20 text-champagne-300 hover:text-white"
                      title="Previous"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => jumpToScene('FIRST_MEET')}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-wine-900/90 hover:bg-wine-800 border border-champagne-400/35 text-white text-xs font-serif uppercase tracking-widest shadow-glow-sm hover:scale-105 transition-all cursor-pointer"
                    >
                      <span>Scene 3: First Meeting</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SCENE 03: FIRST MEETING IN PERSON (28 January 2024)                     */}
        {/* ----------------------------------------------------------------------- */}
        {currentScene === 'FIRST_MEET' && (
          <div className="w-full max-w-5xl mx-auto animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden glass-panel border border-champagne-500/30 shadow-2xl p-2 bg-black/60">
                <img
                  src="/images/firstmeet.jpg"
                  alt="First Time We Met"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent pointer-events-none rounded-2xl" />
              </div>

              <div className="lg:col-span-6 text-left space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wine-900/80 border border-champagne-500/20 text-xs font-mono text-roseGold uppercase tracking-widest">
                  <Calendar className="w-3.5 h-3.5 text-champagne-400" />
                  <span>28 January 2024</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-tight">
                  The First Time We Met
                </h2>

                <p className="text-base sm:text-xl text-champagne-200/90 font-serif italic leading-relaxed">
                  "After all the screens, phone calls, and waiting, seeing you standing right in front of me in real life on 28 January 2024 was the moment the entire world stood completely still."
                </p>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={() => {
                      setTimelineStep(1);
                      jumpToScene('OUR_STORY');
                    }}
                    className="p-3 rounded-full bg-wine-950 border border-champagne-500/20 text-champagne-300 hover:text-white"
                    title="Previous Scene"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => jumpToScene('MONTAGE')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-wine-700 to-crimsonGlow border border-champagne-400/40 text-white text-xs font-serif uppercase tracking-widest shadow-glow-sm hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>Scene 4: Memory Montage</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SCENE 03: FULL-SCREEN MEMORY MONTAGE                                    */}
        {/* ----------------------------------------------------------------------- */}
        {currentScene === 'MONTAGE' && (
          <div className="w-full flex flex-col items-center justify-center animate-fadeIn relative">
            {/* Background Soft Atmosphere Blur */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-30 blur-3xl scale-110">
              <img
                key={`bg-${montageIndex}`}
                src={montagePhotos[montageIndex]}
                alt=""
                className="w-full h-full object-cover transition-all duration-1000"
              />
            </div>

            {/* Central Pure Photo Frame (Zero text overlays, preserves natural proportions) */}
            <div className="relative max-w-4xl w-full flex items-center justify-center max-h-[68vh] rounded-3xl overflow-hidden glass-panel border border-champagne-500/30 shadow-2xl p-3 sm:p-4 bg-black/75">
              <img
                key={`photo-${montageIndex}`}
                src={montagePhotos[montageIndex]}
                alt="Personal Memory"
                className="max-h-[62vh] w-auto object-contain rounded-2xl transition-all duration-1000 transform hover:scale-[1.01]"
              />
            </div>

            {/* Montage Subtle Controls & Counter */}
            <div className="mt-6 flex items-center gap-6 text-xs text-champagne-300 font-serif">
              <button
                onClick={() => setMontageIndex((prev) => (prev - 1 + montagePhotos.length) % montagePhotos.length)}
                className="p-2 rounded-full bg-wine-950/80 border border-champagne-500/20 hover:text-white"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="font-mono text-champagne-400 tracking-wider">
                Memory {montageIndex + 1} of {montagePhotos.length}
              </span>

              <button
                onClick={togglePause}
                className="px-3 py-1 rounded-full bg-wine-950/80 border border-champagne-500/20 hover:text-white"
              >
                {isPaused ? 'Resume Film' : 'Pause'}
              </button>

              <button
                onClick={() => setMontageIndex((prev) => (prev + 1) % montagePhotos.length)}
                className="p-2 rounded-full bg-wine-950/80 border border-champagne-500/20 hover:text-white"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => jumpToScene('SOUNDTRACK')}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-wine-900 border border-champagne-400/30 text-white text-xs tracking-wider"
              >
                <span>Soundtrack →</span>
              </button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SCENE 04: OUR SOUNDTRACK                                                */}
        {/* ----------------------------------------------------------------------- */}
        {currentScene === 'SOUNDTRACK' && (
          <div className="w-full max-w-2xl mx-auto text-center space-y-6 animate-fadeIn">
            <span className="text-xs uppercase tracking-[0.3em] text-roseGold font-sans block">
              The Music of Our Story
            </span>

            {/* Vinyl Record Display */}
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 mx-auto rounded-full overflow-hidden border-4 border-champagne-500/30 shadow-2xl group flex items-center justify-center bg-black">
              <img
                src={currentSong.albumArt}
                alt={currentSong.title}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isPlayingMusic ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '24s' }}
              />
              <div className="absolute w-12 h-12 rounded-full bg-noir border-2 border-champagne-400/40 flex items-center justify-center">
                <Disc3 className="w-6 h-6 text-champagne-300" />
              </div>
            </div>

            {/* Song Meta */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif text-white mb-1">
                {currentSong.title}
              </h2>
              <p className="text-sm font-sans text-roseGold mb-3">
                {currentSong.artist}
              </p>

              {currentSong.externalUrl && (
                <a
                  href={currentSong.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-wine-900/80 border border-champagne-500/25 text-xs text-champagne-200 hover:text-white transition-colors"
                >
                  <span>Listen on Spotify</span>
                  <span className="text-roseGold">↗</span>
                </a>
              )}
            </div>

            {/* Progress bar */}
            <div className="max-w-md mx-auto w-full">
              <div className="w-full bg-noir/80 h-1.5 rounded-full overflow-hidden border border-champagne-500/15">
                <div
                  className="h-full bg-gradient-to-r from-crimsonGlow via-roseGold to-champagne-400 rounded-full transition-all duration-150"
                  style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-6 pt-2">
              <button
                onClick={() => setTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length)}
                className="p-3 rounded-full text-champagne-300 hover:text-white transition-transform hover:scale-110"
                aria-label="Previous Track"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={onToggleMusic}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-crimsonGlow to-wine-700 text-white flex items-center justify-center shadow-glow-md hover:scale-105 transition-all"
                aria-label={isPlayingMusic ? 'Pause' : 'Play'}
              >
                {isPlayingMusic ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current translate-x-0.5" />}
              </button>

              <button
                onClick={() => setTrackIndex((prev) => (prev + 1) % playlist.length)}
                className="p-3 rounded-full text-champagne-300 hover:text-white transition-transform hover:scale-110"
                aria-label="Next Track"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="pt-4">
              <button
                onClick={() => jumpToScene('LETTER')}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-wine-900 border border-champagne-400/35 text-white text-xs font-serif uppercase tracking-widest shadow-glow-sm hover:scale-105 transition-all"
              >
                <span>Read Letter For Ayushi →</span>
              </button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SCENE 05: LETTER FOR AYUSHI                                             */}
        {/* ----------------------------------------------------------------------- */}
        {currentScene === 'LETTER' && (
          <div className="w-full max-w-3xl mx-auto text-center space-y-6 animate-fadeIn">
            {!envelopeOpened ? (
              /* Envelope Closed Stage */
              <div
                onClick={() => setEnvelopeOpened(true)}
                className="group max-w-md mx-auto p-8 rounded-3xl glass-panel border border-champagne-400/40 shadow-2xl cursor-pointer hover:scale-105 transition-all duration-500"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-wine-900 flex items-center justify-center text-white border border-champagne-300/40 shadow-glow-sm group-hover:scale-110 transition-transform">
                  <Heart className="w-7 h-7 fill-white/90" />
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">
                  {currentLetter.title}
                </h3>
                <p className="text-xs text-champagne-300/70 font-serif italic mb-4">
                  "{currentLetter.preview}"
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs text-roseGold font-medium">
                  <span>Tap to open wax seal</span>
                  <span>→</span>
                </div>
              </div>
            ) : (
              /* Unfolded Full-Screen Stationery Paper */
              <div className="letter-parchment rounded-3xl p-6 sm:p-12 text-amber-950 relative shadow-2xl border border-amber-900/20 text-left max-h-[75vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-amber-900/20 pb-3 mb-6">
                  <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-amber-900/70">
                    <Feather className="w-4 h-4 text-amber-800" />
                    <span>For Ayushi • Private Letter</span>
                  </div>
                  <button
                    onClick={() => setEnvelopeOpened(false)}
                    className="text-xs text-amber-900/70 hover:text-amber-950 underline"
                  >
                    Fold Envelope
                  </button>
                </div>

                <h3 className="text-2xl sm:text-4xl font-serif text-amber-950 mb-2">
                  {currentLetter.title}
                </h3>
                <span className="text-xs font-serif italic text-amber-900/80 block mb-6">
                  {currentLetter.date}
                </span>

                <div className="font-handwriting text-2xl sm:text-3xl leading-[1.8] text-amber-950 space-y-5">
                  {currentLetter.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-amber-900/20 flex flex-wrap items-center justify-between gap-4 text-amber-900">
                  <div className="font-handwriting text-3xl sm:text-4xl">
                    {currentLetter.signoff}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setLetterIndex((prev) => (prev - 1 + letters.length) % letters.length)}
                      className="px-3 py-1.5 rounded-full border border-amber-900/30 text-xs font-serif hover:bg-amber-900/10 cursor-pointer"
                      title="Previous Letter"
                    >
                      ← Previous Letter
                    </button>

                    <button
                      onClick={() => setLetterIndex((prev) => (prev + 1) % letters.length)}
                      className="px-3 py-1.5 rounded-full border border-amber-900/30 text-xs font-serif hover:bg-amber-900/10 cursor-pointer"
                      title="Next Letter"
                    >
                      Next Letter →
                    </button>

                    <button
                      onClick={() => setEnvelopeOpened(false)}
                      className="px-3 py-1.5 rounded-full border border-amber-900/30 text-xs font-serif hover:bg-amber-900/10 cursor-pointer"
                      title="Fold / Replay Wax Seal"
                    >
                      Replay Envelope ↻
                    </button>

                    <button
                      onClick={() => jumpToScene('BIRTHDAY')}
                      className="px-6 py-2 rounded-full bg-amber-900 text-amber-50 text-xs font-serif uppercase tracking-widest hover:bg-amber-950 transition-colors shadow-md cursor-pointer"
                    >
                      Birthday Finale →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SCENE 06: BIRTHDAY REVEAL (CLIMAX)                                      */}
        {/* ----------------------------------------------------------------------- */}
        {currentScene === 'BIRTHDAY' && (
          <div className="text-center space-y-8 max-w-4xl mx-auto animate-fadeIn select-none">
            {birthdayStage >= 2 && (
              <div className="space-y-6">
                <span className="text-xs sm:text-sm uppercase tracking-[0.4em] text-champagne-400 font-sans block animate-pulse">
                  3 October 2026
                </span>

                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-tight text-glow-gold">
                  Happy Birthday,{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-champagne-200 via-roseGold to-crimsonGlow">
                    Ayushi ❤️
                  </span>
                </h1>

                <p className="text-base sm:text-2xl text-champagne-200/90 font-serif italic max-w-2xl mx-auto leading-relaxed">
                  "May your birthday be as gentle, bright, and deeply loved as you make my life feel every single day."
                </p>

                <div className="pt-8 flex items-center justify-center gap-4">
                  <button
                    onClick={() => jumpToScene('SURPRISE')}
                    className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-wine-700 via-crimsonGlow to-champagne-500 text-white text-xs font-serif uppercase tracking-[0.2em] shadow-glow-md hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>Scene 8: Secret Surprise</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SCENE 08: SECRET SURPRISE                                               */}
        {/* ----------------------------------------------------------------------- */}
        {currentScene === 'SURPRISE' && (
          <div className="text-center space-y-6 max-w-3xl mx-auto animate-fadeIn select-none">
            <span className="text-xs uppercase tracking-[0.3em] text-roseGold font-sans block animate-pulse">
              A Special Milestone For You
            </span>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight text-glow-gold">
              For You, Ayushi.
            </h2>

            <p className="text-base sm:text-xl text-champagne-200/90 font-serif italic max-w-xl mx-auto leading-relaxed">
              "Because four years deserve more than just a birthday wish. Every single moment with you has been a gift."
            </p>

            {/* Memory Fragments Pill Cloud */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-lg mx-auto py-2">
              {[
                'First hello',
                'Endless laughter',
                'Late night calls',
                'First smile on video',
                '28 Jan 2024',
                'Quiet comfort',
                'Growing together',
                'Us',
              ].map((word, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-wine-950/80 border border-champagne-500/20 text-xs font-serif text-champagne-200 shadow-sm"
                >
                  {word}
                </span>
              ))}
            </div>

            <div className="py-4 border-y border-champagne-500/20 max-w-md mx-auto">
              <span className="font-mono text-xs uppercase tracking-widest text-champagne-400 block mb-1">
                17 November 2022 → 17 November 2026
              </span>
              <p className="text-lg font-serif italic text-white">
                Four Years of Memories, One Unforgettable Story.
              </p>
            </div>

            <div className="pt-4 flex items-center justify-center gap-4">
              <button
                onClick={() => jumpToScene('BIRTHDAY')}
                className="p-3 rounded-full bg-wine-950 border border-champagne-500/20 text-champagne-300 hover:text-white"
                title="Previous Scene"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => jumpToScene('FINALE')}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-wine-700 via-crimsonGlow to-champagne-500 text-white text-xs font-serif uppercase tracking-[0.2em] shadow-glow-md hover:scale-105 transition-all cursor-pointer"
              >
                <span>Scene 9: Final Ending</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SCENE 09: FINAL ENDING & CREDITS                                        */}
        {/* ----------------------------------------------------------------------- */}
        {currentScene === 'FINALE' && (
          <div className="text-center space-y-8 max-w-3xl mx-auto animate-fadeIn select-none">
            <span className="text-xs uppercase tracking-[0.3em] text-roseGold font-sans block">
              17 November 2022 → Forever
            </span>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight text-glow-gold">
              Four Years of Us
            </h2>

            <p className="text-base sm:text-xl text-champagne-200/90 font-serif italic max-w-xl mx-auto leading-relaxed">
              "And so many more memories still waiting to be made. Happy Birthday, my love ❤️"
            </p>

            <div className="py-6 border-y border-champagne-500/20 max-w-md mx-auto">
              <p className="text-lg font-serif italic text-champagne-300">
                "Forever starts with another memory."
              </p>
              <span className="text-xs font-serif text-roseGold mt-1 block">
                With all my love, always.
              </span>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => jumpToScene('OPENING')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-wine-950/80 hover:bg-wine-900 border border-champagne-500/30 text-xs font-serif text-champagne-200 hover:text-white transition-all cursor-pointer shadow-glow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5 text-champagne-400" />
                <span>Replay Movie ↻</span>
              </button>

              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-wine-700 to-crimsonGlow text-white text-xs font-serif uppercase tracking-widest shadow-glow-sm hover:scale-105 transition-all cursor-pointer"
              >
                <span>Return to Normal Website</span>
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* BOTTOM THEATRE CONTROLS BAR (Auto-hiding)                                 */}
      {/* ========================================================================= */}
      <footer
        className={`relative z-50 w-full px-6 sm:px-12 py-5 flex items-center justify-between transition-opacity duration-500 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2 text-xs font-serif text-champagne-400/70">
          <span>Scene: {currentScene}</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevScene}
            disabled={currentScene === 'OPENING'}
            className="p-2.5 rounded-full bg-wine-950/80 border border-champagne-500/20 text-champagne-200 hover:text-white disabled:opacity-30 cursor-pointer"
            aria-label="Previous Scene"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={togglePause}
            className="px-4 py-2 rounded-full bg-wine-900/80 border border-champagne-400/30 text-xs font-serif text-white flex items-center gap-1.5 cursor-pointer"
          >
            {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          <button
            onClick={handleNextScene}
            disabled={currentScene === 'FINALE'}
            className="p-2.5 rounded-full bg-wine-950/80 border border-champagne-500/20 text-champagne-200 hover:text-white disabled:opacity-30 cursor-pointer"
            aria-label="Next Scene"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="text-right text-[11px] font-serif text-champagne-400/60 hidden sm:block">
          Press <kbd className="px-1.5 py-0.5 rounded bg-noir border border-champagne-500/20 font-mono text-champagne-300">Space</kbd> to Pause • <kbd className="px-1.5 py-0.5 rounded bg-noir border border-champagne-500/20 font-mono text-champagne-300">Esc</kbd> to Exit
        </div>
      </footer>
    </div>
  );
};
