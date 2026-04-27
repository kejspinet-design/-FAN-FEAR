'use client';

import React, { useState, useEffect } from 'react';
import { ActiveSection } from './DashboardLayout';
import AboutSection from '../sections/AboutSection';
import NewsSection from '../sections/NewsSection';
import StaffSection from '../sections/StaffSection';
import SocialSection from '../sections/SocialSection';

interface ContentAreaProps {
  activeSection: ActiveSection;
}

const ContentArea: React.FC<ContentAreaProps> = ({ activeSection }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentSection, setCurrentSection] = useState<ActiveSection>(activeSection);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Handle section transitions with smooth fade effect
  useEffect(() => {
    if (activeSection !== currentSection) {
      setIsTransitioning(true);
      
      const timer = setTimeout(() => {
        setCurrentSection(activeSection);
        setIsTransitioning(false);
      }, 150); // Half of transition duration for smooth crossfade

      return () => clearTimeout(timer);
    }
  }, [activeSection, currentSection]);

  // Initial load animation with staggered effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const renderSection = () => {
    switch (currentSection) {
      case 'about':
        return <AboutSection />;
      case 'news':
        return <NewsSection />;
      case 'staff':
        return <StaffSection />;
      case 'social':
        return <SocialSection />;
      default:
        return <AboutSection />;
    }
  };

  return (
    <main 
      className="flex-1 min-h-screen md:ml-0 relative overflow-hidden"
      role="main"
      aria-label={`${currentSection} section content`}
    >
      {/* Responsive padding and spacing - mobile first approach */}
      <div className="px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12 lg:py-12 xl:px-16 xl:py-16">
        {/* Content container with enhanced fade-in animation */}
        <div
          className={`
            transition-all duration-300 ease-out transform
            ${isTransitioning || isInitialLoad
              ? 'opacity-0 translate-y-6 scale-[0.98] blur-sm' 
              : 'opacity-100 translate-y-0 scale-100 blur-none'
            }
          `}
          style={{
            transitionProperty: 'opacity, transform, filter',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Content wrapper with staggered animation */}
          <div 
            className={`
              ${!isTransitioning && !isInitialLoad ? 'animate-stagger-fade-in' : ''}
            `}
          >
            {renderSection()}
          </div>
        </div>
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes staggerFadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-stagger-fade-in > * {
          animation: staggerFadeIn 400ms ease-out forwards;
        }

        .animate-stagger-fade-in > *:nth-child(1) {
          animation-delay: 0ms;
        }

        .animate-stagger-fade-in > *:nth-child(2) {
          animation-delay: 100ms;
        }

        .animate-stagger-fade-in > *:nth-child(3) {
          animation-delay: 200ms;
        }

        .animate-stagger-fade-in > *:nth-child(4) {
          animation-delay: 300ms;
        }

        .animate-stagger-fade-in > *:nth-child(n+5) {
          animation-delay: 400ms;
        }
      `}</style>
    </main>
  );
};

export default ContentArea;