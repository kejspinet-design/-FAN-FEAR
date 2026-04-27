'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const visited = localStorage.getItem('fan-fear-visited');
    
    if (visited === 'true') {
      setHasVisited(true);
      setIsVisible(false);
      return;
    }

    // Animate progress bar
    const duration = 3000; // 3 seconds
    const steps = 100;
    const interval = duration / steps;

    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(timer);
        
        // Wait a bit then fade out
        setTimeout(() => {
          setIsVisible(false);
          localStorage.setItem('fan-fear-visited', 'true');
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  if (hasVisited || !isVisible) {
    return null;
  }

  return (
    <div
      className={`
        fixed inset-0 z-[9999] flex items-center justify-center
        bg-gradient-to-br from-[#0a0a1e] via-[#1a0a2e] to-[#0f0f1e]
        transition-opacity duration-1000
        ${progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center space-y-8 px-4">
        {/* Avatar with glow effect */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full blur-2xl opacity-50 animate-pulse" />
          <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-neon-purple/50 shadow-[0_0_60px_rgba(168,85,247,0.6)]">
            <Image
              src="/zaidnii-fon-sdelai-eshche-chut-chut-fiol_xEi7AC6fTwynA3Z6uURDrA_4_XI4zezTdmLCqEfIgBtOA_cover_sd.jpeg"
              alt="Fan-Fear"
              width={128}
              height={128}
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Welcome text */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-purple via-purple-400 to-neon-blue bg-clip-text text-transparent animate-pulse">
            Добро пожаловать!
          </h1>
          <p className="text-gray-400 text-lg">Fan-Fear Dashboard</p>
        </div>

        {/* Progress bar */}
        <div className="w-80 max-w-full space-y-3">
          {/* Progress bar container */}
          <div className="relative h-2 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            
            {/* Progress fill */}
            <div
              className="h-full bg-gradient-to-r from-neon-purple via-purple-500 to-neon-blue rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>

          {/* Progress percentage */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Загрузка...</span>
            <span className="text-neon-purple font-bold">{progress}%</span>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Preloader;
