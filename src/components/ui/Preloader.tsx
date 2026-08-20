import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsFading(true), 150);
          setTimeout(() => onComplete(), 700);
          return 100;
        }
        // Accelerating progress curve
        const increment = Math.max(2, Math.floor((100 - prev) * 0.18));
        return Math.min(100, prev + increment);
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#080414] transition-all duration-700 ease-in-out ${
        isFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Architectural & Glow Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[120px] animate-pulse-glow" />
        <div className="w-[300px] h-[300px] rounded-full border border-purple-500/20 animate-spin-slow" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Emblem */}
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-full border border-purple-400/40 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <span className="font-mono font-bold text-sm tracking-widest text-[#FAF5FF]">0G</span>
          </div>
          <div className="absolute -inset-1 rounded-full border border-[#CCFF00]/40 animate-ping" style={{ animationDuration: '3s' }} />
        </div>

        {/* Title */}
        <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-white mb-2">
          AEROVA
        </h1>

        <p className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-purple-300/80 mb-8">
          ENTERING ZERO GRAVITY
        </p>

        {/* Progress Bar */}
        <div className="w-56 sm:w-72 h-1 bg-white/10 rounded-full overflow-hidden mb-3 border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-[#CCFF00] transition-all duration-75 ease-out rounded-full shadow-sm shadow-purple-400"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Telemetry Counter */}
        <div className="flex items-center justify-between w-56 sm:w-72 text-[11px] font-mono text-white/50">
          <span>CALIBRATING SENSORS</span>
          <span className="text-[#FAF5FF] font-bold">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
