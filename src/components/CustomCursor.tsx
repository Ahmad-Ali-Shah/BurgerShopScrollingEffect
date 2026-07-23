import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let rX = -100;
    let rY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setPos({ x: mouseX, y: mouseY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('cursor-pointer') ||
          window.getComputedStyle(target).cursor === 'pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const loop = () => {
      rX += (mouseX - rX) * 0.18;
      rY += (mouseY - rY) * 0.18;
      setRingPos({ x: rX, y: rY });
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Neon HUD Target Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border border-[#FF1A1A] transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${
          isHovered
            ? 'w-12 h-12 border-[#FFB000] bg-[#FF1A1A]/10 shadow-[0_0_20px_#FFB000]'
            : isClicked
            ? 'w-6 h-6 border-[#FF1A1A] bg-[#FF1A1A]/30 scale-90'
            : 'w-9 h-9 border-[#FF1A1A]/70 shadow-[0_0_12px_#FF1A1A]'
        }`}
        style={{
          transform: `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        {/* Crosshair Ticks */}
        <div className="absolute top-0 w-0.5 h-1.5 bg-[#FF1A1A]" />
        <div className="absolute bottom-0 w-0.5 h-1.5 bg-[#FF1A1A]" />
        <div className="absolute left-0 h-0.5 w-1.5 bg-[#FF1A1A]" />
        <div className="absolute right-0 h-0.5 w-1.5 bg-[#FF1A1A]" />
      </div>

      {/* Center Laser Precision Dot */}
      <div
        className={`fixed top-0 left-0 rounded-full bg-[#FF1A1A] shadow-[0_0_10px_#FF1A1A] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ${
          isHovered ? 'w-2.5 h-2.5 bg-[#FFB000] scale-125' : 'w-1.5 h-1.5'
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
      />
    </div>
  );
};
