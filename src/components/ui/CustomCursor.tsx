import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouch, setIsTouch] = useState<boolean>(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setPos({ x: e.clientX, y: e.clientY });

      // Check cursor data attribute on hovered element
      const target = e.target as HTMLElement | null;
      const cursorElem = target?.closest('[data-cursor]') as HTMLElement | null;
      const isClickable = target?.closest('button, a, input, [role="button"]');

      if (cursorElem) {
        setCursorText(cursorElem.getAttribute('data-cursor') || '');
        setIsHovered(true);
      } else if (isClickable) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Smooth lerp trailing circle
  useEffect(() => {
    if (isTouch) return;
    let animId: number;
    const updateTrail = () => {
      setTrailPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }));
      animId = requestAnimationFrame(updateTrail);
    };
    animId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animId);
  }, [pos, isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Spring Follower Ring / Pill */}
      <div
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center transition-all duration-150 ease-out border ${
          cursorText
            ? 'w-16 h-16 bg-purple-600/30 border-purple-400/80 backdrop-blur-sm -translate-x-8 -translate-y-8'
            : isHovered
            ? 'w-12 h-12 bg-white/10 border-purple-400/60 -translate-x-6 -translate-y-6 scale-110'
            : 'w-8 h-8 border-purple-400/30 -translate-x-4 -translate-y-4'
        }`}
        style={{
          transform: `translate3d(${trailPos.x}px, ${trailPos.y}px, 0)`,
          transformOrigin: 'top left',
        }}
      >
        {cursorText && (
          <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase animate-pulse">
            {cursorText}
          </span>
        )}
      </div>

      {/* Center Precise Dot */}
      <div
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-white transition-transform duration-75 ${
          cursorText ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0)`,
        }}
      />
    </div>
  );
};
