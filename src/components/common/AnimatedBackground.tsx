'use client';

import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPercent = (clientX / innerWidth - 0.5) * 30;
      const yPercent = (clientY / innerHeight - 0.5) * 30;

      containerRef.current.style.transform = `translate(${xPercent}px, ${yPercent}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient background with animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1e] via-[#1a0a2e] to-[#0f0f1e]" />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-80">
        <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/20 via-transparent to-neon-blue/20 animate-gradient-shift" />
        <div className="absolute inset-0 bg-gradient-to-bl from-violet-600/10 via-transparent to-indigo-600/10 animate-gradient-shift-reverse" />
      </div>

      {/* Parallax container */}
      <div
        ref={containerRef}
        className="absolute inset-0 transition-transform duration-500 ease-out"
      >
        {/* Large primary glow orbs */}
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-neon-purple/30 rounded-full blur-[150px] animate-float-large" />
        <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-neon-blue/30 rounded-full blur-[150px] animate-float-large-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/25 rounded-full blur-[140px] animate-pulse-glow" />

        {/* Medium moving lights */}
        <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-violet-500/25 rounded-full blur-[120px] animate-float-medium" />
        <div className="absolute bottom-1/3 left-1/3 w-[450px] h-[450px] bg-indigo-500/25 rounded-full blur-[120px] animate-float-medium-delayed" />
        <div className="absolute top-2/3 right-1/4 w-[350px] h-[350px] bg-fuchsia-500/20 rounded-full blur-[100px] animate-float-slow" />

        {/* Small accent lights */}
        <div className="absolute top-1/3 left-1/4 w-[250px] h-[250px] bg-purple-400/20 rounded-full blur-[90px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-cyan-400/20 rounded-full blur-[90px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-[200px] h-[200px] bg-blue-400/15 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

        {/* Moving light streaks */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[2px] bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent blur-sm animate-streak-horizontal" />
        <div className="absolute bottom-1/3 right-0 w-[500px] h-[2px] bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent blur-sm animate-streak-horizontal-reverse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Subtle grid overlay for depth */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `
          linear-gradient(rgba(168, 85, 247, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(168, 85, 247, 0.15) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }} />

      {/* Radial vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />

      {/* Top glow accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/30 to-transparent" />

      <style jsx>{`
        @keyframes float-large {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(40px, -40px) scale(1.15);
          }
          66% {
            transform: translate(-30px, 30px) scale(0.95);
          }
        }

        @keyframes float-large-delayed {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-40px, 40px) scale(1.15);
          }
          66% {
            transform: translate(30px, -30px) scale(0.95);
          }
        }

        @keyframes float-medium {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -30px) scale(1.1);
          }
        }

        @keyframes float-medium-delayed {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-30px, 30px) scale(1.1);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(25px, -25px) rotate(180deg);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2);
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            transform: translate(20px, 20px) rotate(5deg);
            opacity: 0.8;
          }
        }

        @keyframes gradient-shift-reverse {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.5;
          }
          50% {
            transform: translate(-20px, -20px) rotate(-5deg);
            opacity: 0.7;
          }
        }

        @keyframes streak-horizontal {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(200%);
            opacity: 0;
          }
        }

        @keyframes streak-horizontal-reverse {
          0% {
            transform: translateX(200%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(-100%);
            opacity: 0;
          }
        }

        .animate-float-large {
          animation: float-large 25s ease-in-out infinite;
        }

        .animate-float-large-delayed {
          animation: float-large-delayed 30s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 20s ease-in-out infinite;
        }

        .animate-float-medium-delayed {
          animation: float-medium-delayed 22s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 35s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 10s ease-in-out infinite;
        }

        .animate-gradient-shift {
          animation: gradient-shift 15s ease-in-out infinite;
        }

        .animate-gradient-shift-reverse {
          animation: gradient-shift-reverse 18s ease-in-out infinite;
        }

        .animate-streak-horizontal {
          animation: streak-horizontal 8s ease-in-out infinite;
        }

        .animate-streak-horizontal-reverse {
          animation: streak-horizontal-reverse 10s ease-in-out infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
