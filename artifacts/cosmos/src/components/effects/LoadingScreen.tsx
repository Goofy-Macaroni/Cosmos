import React, { useEffect, useState } from 'react';
import Starfield from './Starfield';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [factIndex, setFactIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const facts = [
    "Initializing deep space telemetry...",
    "Calibrating gravitational sensors...",
    "Aligning orbital trajectories...",
    "Synthesizing starlight data...",
    "Establishing connection with Voyager 1..."
  ];

  useEffect(() => {
    const factInterval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % facts.length);
    }, 800);

    const finishTimeout = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 1000); // Wait for fade out animation
    }, 3500);

    return () => {
      clearInterval(factInterval);
      clearTimeout(finishTimeout);
    };
  }, [facts.length, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a14] transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <Starfield />
      
      {/* Animated Saturn */}
      <div className="relative w-48 h-48 mb-12 flex items-center justify-center">
        {/* Planet body */}
        <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#ead6b8] to-[#967d58] shadow-[0_0_50px_rgba(234,214,184,0.3)] z-10" />
        
        {/* Rings container - needs perspective to look like rings */}
        <div className="absolute w-48 h-48 animate-[spin-slow_10s_linear_infinite]" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(75deg)' }}>
          {/* Ring 1 */}
          <div className="absolute inset-0 rounded-full border-[8px] border-[#d3bca1]/60" />
          {/* Ring 2 */}
          <div className="absolute inset-2 rounded-full border-[6px] border-[#b09b83]/40" />
          {/* Ring 3 */}
          <div className="absolute inset-5 rounded-full border-[4px] border-[#8a7a66]/30" />
        </div>
      </div>

      <h1 className="font-heading text-5xl font-bold tracking-[0.2em] text-white mb-4 text-glow animate-pulse">
        COSMOS
      </h1>
      
      <div className="h-6 flex items-center justify-center overflow-hidden">
        <p key={factIndex} className="font-mono text-sm text-primary/80 animate-in slide-in-from-bottom-4 fade-in duration-300">
          {facts[factIndex]}
        </p>
      </div>
      
      <div className="w-48 h-1 bg-white/10 rounded-full mt-8 overflow-hidden">
        <div className="h-full bg-primary animate-[pulse-glow_2s_ease-in-out_infinite] w-full origin-left animate-in zoom-in-0 duration-[3000ms] fill-mode-forwards" />
      </div>
    </div>
  );
}
