'use client';

import React from 'react';
import { ActiveSection } from '../layout/DashboardLayout';

interface NavigationItemProps {
  icon: React.ReactNode;
  label: string;
  section: ActiveSection;
  isActive: boolean;
  onClick: () => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  icon,
  label,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        group w-full flex items-center space-x-3 px-4 py-3 rounded-button
        transition-all duration-300 ease-in-out transform
        hover:scale-105 hover:brightness-110 
        ${
          isActive
            ? 'bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 text-neon-purple shadow-glow-purple border border-neon-purple/30 shadow-lg'
            : 'text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-glow-purple/30 hover:border-neon-purple/20 border border-transparent'
        }
        focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:ring-offset-2 focus:ring-offset-transparent
        active:scale-[0.98] active:transition-transform active:duration-100
      `}
      aria-label={`Navigate to ${label}`}
      aria-current={isActive ? 'page' : undefined}
    >
      <span 
        className={`
          text-lg transition-all duration-300 ease-in-out
          ${isActive 
            ? 'text-neon-purple drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]' 
            : 'group-hover:text-neon-purple group-hover:drop-shadow-[0_0_6px_rgba(168,85,247,0.4)]'
          }
        `}
      >
        {icon}
      </span>
      <span 
        className={`
          font-medium transition-all duration-300 ease-in-out
          ${isActive 
            ? 'text-neon-purple font-semibold' 
            : 'group-hover:text-white'
          }
        `}
      >
        {label}
      </span>
    </button>
  );
};

export default NavigationItem;