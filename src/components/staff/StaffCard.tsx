'use client';

import React from 'react';
import Image from 'next/image';
import { StaffMember } from '@/types';

interface StaffCardProps {
  member: StaffMember;
}

const StaffCard: React.FC<StaffCardProps> = ({ member }) => {
  const { nickname, role, avatar } = member;

  return (
    <article
      className="
        glassmorphism-card p-6
        transition-all duration-500 ease-out
        hover:scale-[1.05] hover:shadow-[0_20px_60px_rgba(168,85,247,0.4)]
        group cursor-pointer
        flex flex-col items-center text-center
        relative overflow-hidden
      "
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-transparent to-neon-blue/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent" />
      </div>

      {/* Avatar */}
      <div className="relative mb-4 z-10">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 scale-110" />
        
        {/* Avatar container */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-neon-purple/30 group-hover:ring-neon-purple group-hover:ring-6 transition-all duration-500 shadow-[0_0_30px_rgba(168,85,247,0.3)] group-hover:shadow-[0_0_50px_rgba(168,85,247,0.6)]">
          {avatar ? (
            <>
              <Image
                src={avatar}
                alt={`${nickname} avatar`}
                width={96}
                height={96}
                className="object-cover transition-transform duration-700 group-hover:scale-110 select-none pointer-events-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                unoptimized
              />
              {/* Прозрачный защитный слой поверх изображения */}
              <div 
                className="absolute inset-0 z-10 cursor-pointer"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-neon-purple/30 to-neon-blue/30 flex items-center justify-center group-hover:from-neon-purple/50 group-hover:to-neon-blue/50 transition-all duration-500">
              <span className="text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-500">
                {nickname.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Nickname */}
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-neon-purple group-hover:to-neon-blue group-hover:bg-clip-text transition-all duration-500 z-10">
        {nickname}
      </h3>

      {/* Role */}
      <p className="text-sm text-gray-300 mb-4 group-hover:text-neon-purple/80 transition-colors duration-300 z-10">
        {role}
      </p>

      {/* Decorative accent */}
      <div className="h-0.5 w-0 bg-gradient-to-r from-neon-purple to-neon-blue group-hover:w-full transition-all duration-700 shadow-[0_0_10px_rgba(168,85,247,0.5)] z-10" />
    </article>
  );
};

export default StaffCard;
