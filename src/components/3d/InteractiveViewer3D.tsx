import React, { useState } from 'react';
import { Product } from '../../types/product';
import { CanCanvas } from './CanCanvas';
import { RotateCw, Eye, ZoomIn, ZoomOut, RefreshCcw, Sparkles } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

interface InteractiveViewer3DProps {
  product: Product;
  className?: string;
}

export const InteractiveViewer3D: React.FC<InteractiveViewer3DProps> = ({
  product,
  className = '',
}) => {
  const { playClick } = useSound();
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1.05);
  const [resetKey, setResetKey] = useState<number>(0);

  const handleToggleAutoRotate = () => {
    playClick();
    setAutoRotate((prev) => !prev);
  };

  const handleToggleWireframe = () => {
    playClick();
    setWireframe((prev) => !prev);
  };

  const handleZoomIn = () => {
    playClick();
    setScale((prev) => Math.min(1.4, prev + 0.1));
  };

  const handleZoomOut = () => {
    playClick();
    setScale((prev) => Math.max(0.7, prev - 0.1));
  };

  const handleReset = () => {
    playClick();
    setScale(1.05);
    setAutoRotate(true);
    setWireframe(false);
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className={`relative flex flex-col items-center justify-center overflow-hidden rounded-3xl glass-panel border border-white/10 ${className}`}>
      {/* 3D Canvas Scene */}
      <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[540px]">
        <CanCanvas
          key={`${product.id}-${resetKey}-${wireframe}`}
          product={product}
          interactiveDrag={true}
          autoRotate={autoRotate}
          wireframe={wireframe}
          scale={scale}
          showParticles={true}
          className="w-full h-full"
        />

        {/* Floating Zero-G Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill text-xs font-mono tracking-wider text-white/80 select-none">
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: product.accentColor }} />
          <span>3D ZERO-G LAB</span>
          <span className="text-white/40">|</span>
          <span className="text-white/60">355ML ANODIZED</span>
        </div>

        {/* Drag Gesture Hint */}
        <div className="absolute bottom-4 left-4 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-[11px] text-white/60 select-none">
          <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
          <span>Drag 360° to rotate • Zoom with controls</span>
        </div>
      </div>

      {/* Floating HUD Controls */}
      <div className="w-full px-4 py-3 bg-black/30 backdrop-blur-md border-t border-white/5 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleToggleAutoRotate}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              autoRotate ? 'bg-white/15 text-white shadow-sm' : 'bg-white/5 text-white/50 hover:text-white'
            }`}
            title="Toggle Auto Rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span>{autoRotate ? 'Rotating' : 'Paused'}</span>
          </button>

          <button
            onClick={handleToggleWireframe}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              wireframe ? 'bg-purple-500/30 text-purple-200 border border-purple-500/50' : 'bg-white/5 text-white/50 hover:text-white'
            }`}
            title="Inspect Wireframe Topology"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>X-Ray</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-lg bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all text-xs"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <span className="text-[11px] font-mono text-white/50 w-10 text-center">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-lg bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all text-xs"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <div className="h-4 w-[1px] bg-white/10 mx-1" />

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all text-xs"
            title="Reset View"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
