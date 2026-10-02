import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'button' | 'photo'>('default');

  const mousePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const circlePos = useRef({ x: -100, y: -100 });

  const dotRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('img') ||
        target.closest('.photo-card') ||
        target.closest('[data-cursor="photo"]')
      ) {
        setCursorType('photo');
      } else if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('input')
      ) {
        setCursorType('button');
      } else {
        setCursorType('default');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth animation loop using linear interpolation (lerp)
    let animationFrameId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const render = () => {
      // Dot follows closely
      dotPos.current.x = lerp(dotPos.current.x, mousePos.current.x, 0.45);
      dotPos.current.y = lerp(dotPos.current.y, mousePos.current.y, 0.45);

      // Outer circle trails smoothly
      circlePos.current.x = lerp(circlePos.current.x, mousePos.current.x, 0.16);
      circlePos.current.y = lerp(circlePos.current.y, mousePos.current.y, 0.16);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (circleRef.current) {
        circleRef.current.style.transform = `translate3d(${circlePos.current.x}px, ${circlePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  const isButton = cursorType === 'button';
  const isPhoto = cursorType === 'photo';

  return (
    <>
      {/* Center glowing dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full transition-[width,height,background-color] duration-200"
        style={{
          width: isPhoto ? '4px' : isButton ? '6px' : '5px',
          height: isPhoto ? '4px' : isButton ? '6px' : '5px',
          backgroundColor: isPhoto ? '#dfa45f' : '#e9a89b',
          boxShadow: '0 0 8px rgba(223, 164, 95, 0.8)',
        }}
      />

      {/* Larger transparent outer circle */}
      <div
        ref={circleRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full transition-[width,height,border-color,background-color] duration-300 ease-out"
        style={{
          width: isPhoto ? '56px' : isButton ? '44px' : '26px',
          height: isPhoto ? '56px' : isButton ? '44px' : '26px',
          border: isPhoto
            ? '1.5px solid rgba(223, 164, 95, 0.6)'
            : isButton
            ? '1.5px solid rgba(233, 168, 155, 0.65)'
            : '1px solid rgba(223, 164, 95, 0.35)',
          backgroundColor: isPhoto
            ? 'rgba(223, 164, 95, 0.08)'
            : isButton
            ? 'rgba(216, 58, 86, 0.12)'
            : 'rgba(223, 164, 95, 0.02)',
          backdropFilter: isPhoto || isButton ? 'blur(1px)' : 'none',
        }}
      />
    </>
  );
};
