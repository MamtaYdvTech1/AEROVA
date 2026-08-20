import React from 'react';
import { Volume2, VolumeX, Radio } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

export const GravityStatusHUD: React.FC = () => {
  const { isMuted, toggleMute } = useSound();

  return (
    <aside aria-label="Zero Gravity Telemetry" className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-3 select-none">
      {/* Sound Experience Toggle Button */}
      <button
        onClick={toggleMute}
        className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-panel glass-panel-hover text-xs font-mono transition-all ${
          !isMuted ? 'text-[#CCFF00] border-[#CCFF00]/40 shadow-lg shadow-[#CCFF00]/10' : 'text-white/60 hover:text-white'
        }`}
        title={isMuted ? 'Enable Zero-G Ambient Sound' : 'Mute Zero-G Sound'}
        data-cursor="AUDIO"
      >
        {!isMuted ? (
          <>
            <Volume2 className="w-4 h-4 text-[#CCFF00]" />
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-2 bg-[#CCFF00] animate-pulse" />
              <span className="w-0.5 h-3 bg-[#CCFF00] animate-pulse" style={{ animationDelay: '0.2s' }} />
              <span className="w-0.5 h-1.5 bg-[#CCFF00] animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="text-[11px] font-bold">AUDIO ON</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-white/50" />
            <span className="text-[11px]">AUDIO OFF</span>
          </>
        )}
      </button>

      {/* Live Zero-G Telemetry Badge */}
      <div className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel text-[11px] font-mono text-white/70">
        <Radio className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
        <span className="text-white/40">G-FORCE:</span>
        <span className="text-[#FAF5FF] font-bold tracking-wider">0.00 m/s²</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
      </div>
    </aside>
  );
};
