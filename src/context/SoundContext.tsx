import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playHover: () => void;
  playClick: () => void;
  playAddToCart: () => void;
  playWhoosh: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState<boolean>(true); // default muted for respectful UX
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientOscRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);

  const getAudioContext = () => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Start / Stop ambient zero-g drone when unmuted
  useEffect(() => {
    if (isMuted) {
      if (ambientGainRef.current && audioCtxRef.current) {
        ambientGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
      }
    } else {
      const ctx = getAudioContext();
      if (!ctx) return;

      try {
        if (!ambientOscRef.current) {
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 note deep warm hum

          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(110.5, ctx.currentTime); // Subtle binaural beat

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(220, ctx.currentTime);

          gain.gain.setValueAtTime(0.015, ctx.currentTime);

          osc1.connect(filter);
          osc2.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc1.start();
          osc2.start();

          ambientOscRef.current = osc1;
          ambientGainRef.current = gain;
        } else if (ambientGainRef.current) {
          ambientGainRef.current.gain.setTargetAtTime(0.02, ctx.currentTime, 0.5);
        }
      } catch (err) {
        console.warn('Audio initialization deferred:', err);
      }
    }
  }, [isMuted]);

  const toggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    if (!nextState) {
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume();
      }
    }
  };

  const playHover = () => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.012, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // ignore
    }
  };

  const playClick = () => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // ignore
    }
  };

  const playAddToCart = () => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
        gain.gain.setValueAtTime(0.03, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.06 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.3);
      });
    } catch {
      // ignore
    }
  };

  const playWhoosh = () => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(360, ctx.currentTime + 0.15);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch {
      // ignore
    }
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playHover, playClick, playAddToCart, playWhoosh }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
