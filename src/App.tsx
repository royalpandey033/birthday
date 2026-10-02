import { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { ThreeDBackground } from './components/ThreeDBackground';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Hero } from './components/Hero';
import { PersonalIntro } from './components/PersonalIntro';
import { Timeline } from './components/Timeline';
import { AnniversaryCounter } from './components/AnniversaryCounter';
import { MemoryGallery } from './components/MemoryGallery';
import { LoveLetters } from './components/LoveLetters';
import { Surprise } from './components/Surprise';
import { MusicPlayer } from './components/MusicPlayer';
import { FinalSection } from './components/FinalSection';
import { SecretSurprise } from './components/SecretSurprise';
import { romanticAudio } from './utils/romanticAudio';
import { PERSONAL_DATA } from './data/content';

export function App() {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Sync isPlayingMusic state with romanticAudio engine automatically
  useEffect(() => {
    const unsub = romanticAudio.subscribeState((playing) => {
      setIsPlayingMusic(playing);
    });
    return () => unsub();
  }, []);

  const toggleMusic = () => {
    if (isPlayingMusic) {
      romanticAudio.stop();
    } else {
      const firstSong = PERSONAL_DATA.playlist[0];
      if (firstSong?.audioUrl) {
        romanticAudio.playCustomAudio(firstSong.audioUrl);
      } else {
        romanticAudio.startAmbientSynth();
      }
    }
  };

  const ensureMusicPlaying = () => {
    if (!isPlayingMusic) {
      const firstSong = PERSONAL_DATA.playlist[0];
      if (firstSong?.audioUrl) {
        romanticAudio.playCustomAudio(firstSong.audioUrl);
      } else {
        romanticAudio.startAmbientSynth();
      }
    }
  };

  const handleEnterStory = () => {
    const target = document.getElementById('personal-intro') || document.getElementById('journey');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-noir text-champagne-100 overflow-x-hidden selection:bg-crimsonGlow/30 selection:text-white">
      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Subtle 3D Interactive Background with Floating Stardust, Hearts, and Mouse Parallax */}
      <ThreeDBackground />

      {/* Floating 2D Glowing Embers Canvas */}
      <ParticleCanvas />

      {/* Subtle Film Grain Overlay */}
      <div className="fixed inset-0 bg-grain pointer-events-none z-0 opacity-40" />

      {/* Main Story Flow - Normal Website Experience */}
      <main className="relative z-10">
        {/* 1. Hero Opening Screen */}
        <Hero
          onEnterStory={handleEnterStory}
          isPlayingMusic={isPlayingMusic}
          onToggleMusic={toggleMusic}
        />

        {/* 2. Personal Introduction: To My Favorite Person */}
        <PersonalIntro />

        {/* 3. Our Journey Timeline: 17 Nov 2022 to 2026 */}
        <Timeline />

        {/* 4. Our 4 Years Anniversary Spotlight */}
        <AnniversaryCounter />

        {/* 5. Visual Memory Gallery & Lightbox */}
        <MemoryGallery isPlayingMusic={isPlayingMusic} />

        {/* 6. Love Letters with Interactive Wax Envelopes */}
        <LoveLetters isPlayingMusic={isPlayingMusic} />

        {/* 7. Special Surprise Section */}
        <Surprise />
      </main>

      {/* 11. Final Section ("Before You Go...") */}
      <FinalSection />

      {/* 12. Secret Surprise Discovery ("There's One More Thing…") */}
      <SecretSurprise
        isPlayingMusic={isPlayingMusic}
        onEnsureMusicPlaying={ensureMusicPlaying}
      />

      {/* 13. Floating Persistent Music Player */}
      <MusicPlayer
        isPlaying={isPlayingMusic}
        onTogglePlay={toggleMusic}
        onActivateCinematicMusic={ensureMusicPlaying}
      />
    </div>
  );
}

export default App;
