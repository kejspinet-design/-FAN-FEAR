'use client';

import React from 'react';
import StaffCard from '../staff/StaffCard';
import { StaffMember } from '@/types';

const staffMembers: StaffMember[] = [
  { 
    nickname: 'Tiny', 
    role: 'Основатель' 
  },
  { 
    nickname: 'Alt_Goty', 
    role: 'Зам' 
  },
  { 
    nickname: 'Santa2555555', 
    role: 'Руководство',
    avatar: '/вертикальное-изображение-симпатичная-смущенная-аниме-девушка-с-344137771.webp'
  }
];

const StaffSection: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
        Стафф
      </h2>

      {/* Staff grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffMembers.map((member, index) => (
          <StaffCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
};

export default StaffSection;