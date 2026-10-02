/**
 * Romantic Audio Engine:
 * Supports playing uploaded MP3 audio files with seeking and time-tracking,
 * or falls back seamlessly to an enchanting ambient piano/chords progression
 * using Web Audio API when audio files aren't uploaded yet.
 */

type TimeListener = (currentTime: number, duration: number) => void;
type ErrorListener = (message: string) => void;
type StateListener = (isPlaying: boolean) => void;

class RomanticAudioEngine {
  private audioCtx: AudioContext | null = null;
  private isSynthesizing = false;
  private intervalId: any = null;
  private synthProgressInterval: any = null;
  private audioElement: HTMLAudioElement | null = null;
  private currentVolume = 0.65;
  private synthCurrentTime = 0;
  private synthDuration = 225; // 3m 45s default virtual duration for synth

  private timeListeners: Set<TimeListener> = new Set();
  private errorListeners: Set<ErrorListener> = new Set();
  private stateListeners: Set<StateListener> = new Set();

  // Gentle romantic chord progression: Cmaj7, Am7, Fmaj7, Gsus4
  private chords = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [174.61, 261.63, 329.63, 349.23], // Fmaj7
    [196.00, 293.66, 392.00, 440.00], // Gsus4
  ];
  private chordIndex = 0;
  private noteStep = 0;

  public init() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
  }

  public subscribeTime(cb: TimeListener): () => void {
    this.timeListeners.add(cb);
    return () => this.timeListeners.delete(cb);
  }

  public subscribeError(cb: ErrorListener): () => void {
    this.errorListeners.add(cb);
    return () => this.errorListeners.delete(cb);
  }

  public subscribeState(cb: StateListener): () => void {
    this.stateListeners.add(cb);
    return () => this.stateListeners.delete(cb);
  }

  private notifyTime(current: number, total: number) {
    this.timeListeners.forEach(cb => cb(current, total));
  }

  private notifyError(msg: string) {
    this.errorListeners.forEach(cb => cb(msg));
  }

  private notifyState(playing: boolean) {
    this.stateListeners.forEach(cb => cb(playing));
  }

  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.audioElement) {
      this.audioElement.volume = this.currentVolume;
    }
  }

  public getVolume(): number {
    return this.currentVolume;
  }

  public playCustomAudio(url: string, durationEstimate: number = 225, onEnded?: () => void): boolean {
    try {
      this.stop();
      this.isSynthesizing = false;

      if (!url || url.trim() === '') {
        this.synthDuration = durationEstimate;
        this.startAmbientSynth();
        return true;
      }

      if (!this.audioElement) {
        this.audioElement = new Audio();
      }

      this.audioElement.src = url;
      this.audioElement.volume = this.currentVolume;
      this.audioElement.currentTime = 0;

      this.audioElement.ontimeupdate = () => {
        if (this.audioElement && !isNaN(this.audioElement.currentTime)) {
          const cur = this.audioElement.currentTime;
          const dur = isNaN(this.audioElement.duration) || this.audioElement.duration === 0
            ? durationEstimate
            : this.audioElement.duration;
          this.notifyTime(cur, dur);
        }
      };

      this.audioElement.onended = () => {
        if (onEnded) onEnded();
      };

      this.audioElement.onerror = () => {
        console.warn(`[AudioEngine] Audio file "${url}" couldn't be loaded.`);
        this.notifyError("Couldn't load this song.");
      };

      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.notifyState(true);
          })
          .catch((e) => {
            console.warn("[AudioEngine] Playback prevented or source failed:", e.message);
            this.notifyError("Couldn't load this song.");
          });
      }

      return true;
    } catch {
      this.notifyError("Couldn't load this song.");
      return false;
    }
  }

  public startAmbientSynth(initialTime: number = 0) {
    this.init();
    if (!this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    this.isSynthesizing = true;
    this.synthCurrentTime = initialTime;

    if (this.intervalId) clearInterval(this.intervalId);
    if (this.synthProgressInterval) clearInterval(this.synthProgressInterval);

    // Initial note
    this.playNextArpeggio();

    // Gentle 650ms tempo for romantic arpeggios
    this.intervalId = setInterval(() => {
      this.playNextArpeggio();
    }, 650);

    // Virtual progress ticker for ambient synth mode
    this.synthProgressInterval = setInterval(() => {
      if (!this.isSynthesizing) return;
      this.synthCurrentTime = (this.synthCurrentTime + 1) % this.synthDuration;
      this.notifyTime(this.synthCurrentTime, this.synthDuration);
    }, 1000);

    this.notifyState(true);
  }

  public seek(seconds: number) {
    const target = Math.max(0, seconds);
    if (this.audioElement && !this.audioElement.paused && !isNaN(this.audioElement.duration)) {
      this.audioElement.currentTime = Math.min(target, this.audioElement.duration);
    } else if (this.isSynthesizing) {
      this.synthCurrentTime = target % this.synthDuration;
      this.notifyTime(this.synthCurrentTime, this.synthDuration);
    }
  }

  private playNextArpeggio() {
    if (!this.audioCtx || !this.isSynthesizing) return;

    const currentChordNotes = this.chords[this.chordIndex];
    const freq = currentChordNotes[this.noteStep];

    this.playPluck(freq);

    this.noteStep++;
    if (this.noteStep >= currentChordNotes.length) {
      this.noteStep = 0;
      this.chordIndex = (this.chordIndex + 1) % this.chords.length;
    }
  }

  private playPluck(freq: number) {
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.audioCtx.currentTime);
      filter.Q.setValueAtTime(1.5, this.audioCtx.currentTime);

      const now = this.audioCtx.currentTime;
      const peakVol = 0.12 * this.currentVolume;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(peakVol, now + 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 2.3);
    } catch {
      // Ignore audio synthesis frame drops
    }
  }

  public stop() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.synthProgressInterval) {
      clearInterval(this.synthProgressInterval);
      this.synthProgressInterval = null;
    }
    this.isSynthesizing = false;
    this.notifyState(false);
  }

  public isPlaying(): boolean {
    const audioPlaying = this.audioElement ? !this.audioElement.paused : false;
    return audioPlaying || this.isSynthesizing;
  }
}

export const romanticAudio = new RomanticAudioEngine();
