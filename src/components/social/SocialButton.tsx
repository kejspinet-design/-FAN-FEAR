'use client';

import React from 'react';
import { SocialLink } from '@/types';

interface SocialButtonProps {
  social: SocialLink;
  isLoading?: boolean;
}

const SocialButton: React.FC<SocialButtonProps> = ({ social, isLoading = false }) => {
  const { platform, icon, url, isComingSoon, subscribers = 0 } = social;

  const handleClick = () => {
    if (!isComingSoon && url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const platformColors: Record<string, string> = {
    discord: 'from-[#5865F2] to-[#4752C4]',
    telegram: 'from-[#0088cc] to-[#006699]',
    youtube: 'from-[#FF0000] to-[#CC0000]',
    twitch: 'from-[#9146FF] to-[#772CE8]',
  };

  const gradientClass = platformColors[platform] || 'from-neon-purple to-neon-blue';

  // Форматирование числа подписчиков
  const formatSubscribers = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Social Button */}
      <button
        onClick={handleClick}
        disabled={isComingSoon}
        className={`
          relative group p-6 rounded-card
          transition-all duration-300 ease-out
          ${
            isComingSoon
              ? 'glassmorphism-card cursor-not-allowed opacity-50'
              : 'glassmorphism-card hover:scale-105 hover:shadow-glow-purple cursor-pointer'
          }
        `}
        aria-label={`${platform} ${isComingSoon ? '(Coming Soon)' : ''}`}
      >
        {/* Background gradient on hover */}
        {!isComingSoon && (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-card`} />
        )}

        {/* Content */}
        <div className="relative flex flex-col items-center space-y-3">
          {/* Icon */}
          <div className={`text-4xl ${isComingSoon ? 'text-gray-500' : 'text-white group-hover:scale-110 transition-transform duration-300'}`}>
            {icon}
          </div>

          {/* Platform name */}
          <span className={`text-sm font-medium capitalize ${isComingSoon ? 'text-gray-500' : 'text-gray-300 group-hover:text-white'}`}>
            {platform}
          </span>

          {/* Coming Soon badge */}
          {isComingSoon && (
            <span className="text-xs px-3 py-1 rounded-full bg-gray-700 text-gray-400">
              Soon
            </span>
          )}

          {/* Glow effect */}
          {!isComingSoon && (
            <div className={`absolute inset-0 rounded-card opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-gradient-to-br ${gradientClass}`} style={{ zIndex: -1 }} />
          )}
        </div>
      </button>

      {/* Subscribers Card */}
      <div className="glassmorphism-card p-3 text-center">
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 border-2 border-neon-purple border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-gray-400">Загрузка...</span>
          </div>
        ) : (
          <div className="flex flex-col">
            <span className={`text-2xl font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
              {formatSubscribers(subscribers)}
            </span>
            <span className="text-xs text-gray-400 mt-1">подписчиков</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialButton;
