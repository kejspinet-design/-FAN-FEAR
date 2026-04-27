'use client';

import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Main card with glassmorphism and decorative background */}
      <div className="relative overflow-hidden rounded-card">
        {/* Decorative gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-neon-blue/10 to-transparent opacity-50" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-blue/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        {/* Content with glassmorphism */}
        <div className="relative glassmorphism-card p-8 md:p-10 lg:p-12">
          {/* Title with gradient text */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
            О проекте
          </h2>
          
          {/* Description */}
          <div className="space-y-4">
            <p className="text-gray-200 text-lg md:text-xl leading-relaxed">
              Fan-сообщество Fear - проект по серверу cs2 Fear, который рассказывает все события на нем и делает разные активности связанные с ним
            </p>
          </div>

          {/* Decorative accent line */}
          <div className="mt-8 h-1 w-24 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;