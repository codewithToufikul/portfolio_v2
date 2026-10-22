import React, { useEffect, useState, useRef } from 'react';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // Check if device has fine pointer (mouse/trackpad), not touch-only
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    setEnabled(true);

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering clickable/interactive element
      const target = e.target;
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('select') ||
          target.closest('summary') ||
          target.closest('[role="button"]') ||
          target.closest('.cursor-pointer'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth lerp loop for the trailing ring
    const render = () => {
      const lerp = 0.22;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!enabled) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-[3px] -mt-[3px] w-[6px] h-[6px] rounded-full will-change-transform"
        style={{
          backgroundColor: 'var(--accent)',
          boxShadow: '0 0 8px var(--accent)',
        }}
      />

      {/* Trailing Radar Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border transition-all duration-150 will-change-transform ${
          isHovered
            ? '-ml-4 -mt-4 w-8 h-8 bg-accent/15 border-accent scale-125'
            : isClicked
            ? '-ml-2.5 -mt-2.5 w-5 h-5 bg-accent/30 border-accent scale-90'
            : '-ml-3 -mt-3 w-6 h-6 bg-transparent border-accent/60'
        }`}
        style={{
          borderColor: 'var(--accent)',
          boxShadow: isHovered ? '0 0 14px var(--accent)' : 'none',
        }}
      >
        {/* Subtle crosshair tick marks when hovered */}
        {isHovered && (
          <>
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1 w-[1px] h-1 bg-accent" />
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 -mb-1 w-[1px] h-1 bg-accent" />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 -ml-1 h-[1px] w-1 bg-accent" />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 -mr-1 h-[1px] w-1 bg-accent" />
          </>
        )}
      </div>
    </div>
  );
}
