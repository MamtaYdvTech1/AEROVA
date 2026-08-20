import React, { useRef, useState } from 'react';
import { useSound } from '../../context/SoundContext';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'lime' | 'pink';
  className?: string;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  cursorLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  href,
  size = 'md',
  icon,
  cursorLabel = 'EXPLORE',
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { playHover, playClick } = useSound();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.28;
    const deltaY = (e.clientY - centerY) * 0.28;

    setOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    playHover();
  };

  const handleClick = (e: React.MouseEvent) => {
    playClick();
    if (onClick) {
      onClick();
    }
  };

  // Base variants
  const variantStyles = {
    primary:
      'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/30',
    secondary:
      'bg-white/10 text-white hover:bg-white/20 border border-white/15 backdrop-blur-md shadow-md',
    outline:
      'bg-transparent text-white border border-purple-500/40 hover:border-purple-400 hover:bg-purple-500/10',
    ghost:
      'bg-transparent text-white/80 hover:text-white hover:bg-white/5',
    lime:
      'bg-[#CCFF00] text-[#080414] font-bold shadow-lg shadow-[#CCFF00]/30 hover:bg-[#b8e600] border border-[#CCFF00]',
    pink:
      'bg-[#FF3366] text-white font-bold shadow-lg shadow-[#FF3366]/30 hover:bg-[#e61e53] border border-[#FF3366]',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-3.5 text-sm gap-2.5',
    lg: 'px-8 py-4 text-base font-semibold gap-3',
  };

  const baseClasses = `relative inline-flex items-center justify-center font-display uppercase tracking-wider rounded-full transition-transform duration-200 ease-out select-none cursor-pointer group active:scale-95 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>
      {/* Dynamic Inner Sheen */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/15 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </>
  );

  const style = {
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
  };

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={style}
        className={baseClasses}
        data-cursor={cursorLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={style}
      className={baseClasses}
      data-cursor={cursorLabel}
    >
      {content}
    </button>
  );
};
