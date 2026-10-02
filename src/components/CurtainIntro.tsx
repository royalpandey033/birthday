import React, { useState, useEffect } from 'react';

interface CurtainIntroProps {
  onComplete: () => void;
}

export const CurtainIntro: React.FC<CurtainIntroProps> = ({ onComplete }) => {
  // Simplified curtain intro: closed then open, then reveal homepage
  const [stage, setStage] = useState(0); // 0: closed, 1: opening, 2: done

  useEffect(() => {
    // Brief pause before opening
    const openTimer = setTimeout(() => setStage(1), 1200);
    // After opening animation (≈2.5s), complete and notify parent
    const finishTimer = setTimeout(() => {
      setStage(2);
      onComplete();
    }, 1200 + 2500);
    return () => {
      clearTimeout(openTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  if (stage === 2) return null;

  const isCurtainOpen = stage === 1;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden select-none"
      style={{ width: '100vw', height: '100vh' }}
    >
      {/* LEFT CURTAIN PANEL */}
      <div
        className="absolute top-0 bottom-0 left-0 w-1/2 z-30 transition-transform duration-[2400ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{
          transform: isCurtainOpen ? 'translateX(-100%)' : 'translateX(0%)',
          background: `
            linear-gradient(to right, rgba(0,0,0,0.65) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.9) 100%),
            repeating-linear-gradient(
              to right,
              #120106 0px,
              #28030e 20px,
              #4d0519 45px,
              #780927 65px,
              #4d0519 85px,
              #28030e 110px,
              #120106 130px
            )
          `,
          boxShadow: 'inset -25px 0 60px rgba(0,0,0,0.95), 15px 0 40px rgba(0,0,0,0.8)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/75 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-champagne-600/40 via-champagne-300/70 to-champagne-600/40 border-t border-champagne-400/50 shadow-lg" />
      </div>

      {/* RIGHT CURTAIN PANEL */}
      <div
        className="absolute top-0 bottom-0 right-0 w-1/2 z-30 transition-transform duration-[2400ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{
          transform: isCurtainOpen ? 'translateX(100%)' : 'translateX(0%)',
          background: `
            linear-gradient(to left, rgba(0,0,0,0.65) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.9) 100%),
            repeating-linear-gradient(
              to right,
              #120106 0px,
              #28030e 20px,
              #4d0519 45px,
              #780927 65px,
              #4d0519 85px,
              #28030e 110px,
              #120106 130px
            )
          `,
          boxShadow: 'inset 25px 0 60px rgba(0,0,0,0.95), -15px 0 40px rgba(0,0,0,0.8)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/75 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-champagne-600/40 via-champagne-300/70 to-champagne-600/40 border-t border-champagne-400/50 shadow-lg" />
      </div>
    </div>
  );
};

export default CurtainIntro;
