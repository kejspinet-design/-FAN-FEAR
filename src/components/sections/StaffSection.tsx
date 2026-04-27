'use client';

import React, { useState, useEffect } from 'react';
import StaffCard from '../staff/StaffCard';
import { StaffMember } from '@/types';

// URL Google Sheets таблицы для стафа (тот же лист что и новости - gid=0)
const STAFF_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS0xXqmrU4t8oDUET_LDmpzOnCqA4kROUbl69bMS3LHhGfI-tIdBaX3LKY3VZUgWx4c6-BP_MOgdz-3/pub?gid=0&single=true&output=csv';

const defaultStaffMembers: StaffMember[] = [
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
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>(defaultStaffMembers);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadStaffFromGoogleSheets();
  }, []);

  const loadStaffFromGoogleSheets = async () => {
    setIsLoading(true);
    setError('');

    try {
      console.log('🔄 Загрузка стафа из:', STAFF_SHEET_URL);
      const response = await fetch(STAFF_SHEET_URL);

      if (!response.ok) {
        console.warn('⚠️ Не удалось загрузить стаф, используем значения по умолчанию');
        setStaffMembers(defaultStaffMembers);
        setIsLoading(false);
        return;
      }

      const csvText = await response.text();
      console.log('📄 CSV текст получен для стафа');
      
      const lines = csvText.split('\n');
      
      if (lines.length < 2) {
        console.warn('⚠️ Таблица стафа пуста, используем значения по умолчанию');
        setStaffMembers(defaultStaffMembers);
        setIsLoading(false);
        return;
      }

      // Первая строка - заголовки
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, '').toLowerCase());
      console.log('📋 Заголовки стафа:', headers);
      
      // Находим индексы колонок (более гибкий поиск)
      const nicknameIndex = headers.findIndex(h => {
        const header = h.toLowerCase();
        return header === 'nickname' || 
               header === 'ник' || 
               header === 'никнейм' ||
               header === 'name' ||
               header.includes('nick') ||
               header.includes('ник');
      });
      
      const roleIndex = headers.findIndex(h => {
        const header = h.toLowerCase();
        return header === 'role' || 
               header === 'роль' || 
               header === 'должность' ||
               header.includes('role') ||
               header.includes('роль');
      });

      const avatarIndex = headers.findIndex(h => {
        const header = h.toLowerCase();
        return header === 'avatar' || 
               header === 'аватар' || 
               header === 'photo' ||
               header === 'фото' ||
               header.includes('avatar') ||
               header.includes('аватар');
      });

      console.log('🔍 Индекс nickname:', nicknameIndex);
      console.log('🔍 Индекс role:', roleIndex);
      console.log('🔍 Индекс avatar:', avatarIndex);

      if (nicknameIndex === -1 || roleIndex === -1) {
        console.warn('⚠️ Не найдены колонки nickname/role, используем значения по умолчанию');
        setStaffMembers(defaultStaffMembers);
        setIsLoading(false);
        return;
      }

      // Парсим данные с улучшенным CSV парсером
      const staffData: StaffMember[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Улучшенный парсинг CSV с учетом кавычек
        const values: string[] = [];
        let currentValue = '';
        let insideQuotes = false;
        
        for (let j = 0; j < line.length; j++) {
          const char = line[j];
          
          if (char === '"') {
            insideQuotes = !insideQuotes;
          } else if (char === ',' && !insideQuotes) {
            values.push(currentValue.trim());
            currentValue = '';
          } else {
            currentValue += char;
          }
        }
        values.push(currentValue.trim()); // Добавляем последнее значение

        const nickname = values[nicknameIndex]?.trim();
        const role = values[roleIndex]?.trim();
        const avatar = avatarIndex !== -1 ? values[avatarIndex]?.trim() : undefined;

        console.log(`👤 Строка ${i}: nickname="${nickname}", role="${role}", avatar="${avatar}"`);

        if (nickname && nickname !== '' && role && role !== '') {
          staffData.push({
            nickname,
            role,
            avatar: avatar && avatar !== '' ? avatar : undefined
          });
        }
      }

      console.log('✅ Данные стафа:', staffData);

      if (staffData.length === 0) {
        console.warn('⚠️ Не найдено валидных записей стафа, используем значения по умолчанию');
        setStaffMembers(defaultStaffMembers);
      } else {
        setStaffMembers(staffData);
      }
      
      setIsLoading(false);
    } catch (err) {
      console.warn('❌ Ошибка загрузки стафа:', err);
      setStaffMembers(defaultStaffMembers);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Title */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
          Стафф
        </h2>
        
        {/* Refresh button */}
        <button
          onClick={loadStaffFromGoogleSheets}
          disabled={isLoading}
          className="px-4 py-2 rounded-button bg-white/5 hover:bg-white/10 border border-white/10 hover:border-neon-purple/50 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 group"
          title="Обновить стафф"
        >
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span className="hidden sm:inline text-sm">{isLoading ? 'Загрузка...' : 'Обновить'}</span>
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="glassmorphism-card p-4 mb-6 border border-yellow-500/30">
          <p className="text-yellow-400 text-sm">⚠️ {error}</p>
        </div>
      )}

      {/* Loading state */}
      {isLoading && staffMembers.length === 0 && (
        <div className="glassmorphism-card p-12 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-neon-purple border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-300">Загрузка стафа из Google Sheets...</p>
          </div>
        </div>
      )}

      {/* Staff grid */}
      {!isLoading && staffMembers.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffMembers.map((member, index) => (
            <StaffCard key={index} member={member} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && staffMembers.length === 0 && (
        <div className="glassmorphism-card p-12 text-center">
          <p className="text-xl text-gray-300 font-medium mb-2">
            Стафф скоро появится
          </p>
          <p className="text-sm text-gray-400">
            Добавьте данные в Google Sheets таблицу с колонками:<br />
            <code className="text-neon-purple">nickname</code>, <code className="text-neon-purple">role</code>, <code className="text-neon-purple">avatar</code> (опционально)
          </p>
        </div>
      )}
    </div>
  );
};

export default StaffSection;