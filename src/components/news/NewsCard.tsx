'use client';

import React from 'react';
import Image from 'next/image';
import { NewsData } from '@/types';

interface NewsCardProps {
  news: NewsData;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const { photoUrl, title, description } = news;

  return (
    <article
      className="
        glassmorphism-card overflow-hidden
        transition-all duration-500 ease-out
        hover:scale-[1.03] hover:shadow-[0_20px_60px_rgba(168,85,247,0.4)]
        group cursor-pointer relative
      "
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-transparent to-neon-blue/10" />
      </div>

      {/* Image container */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-900/50">
        <Image
          src={photoUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 text-ellipsis-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-neon-purple group-hover:to-neon-blue group-hover:bg-clip-text transition-all duration-500">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed text-ellipsis-3 group-hover:text-gray-200 transition-colors duration-300">
          {description}
        </p>

        {/* Decorative accent */}
        <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-neon-purple to-neon-blue group-hover:w-full transition-all duration-700 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
      </div>
    </article>
  );
};

export default NewsCard;
