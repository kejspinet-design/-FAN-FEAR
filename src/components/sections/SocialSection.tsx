'use client';

import React, { useState, useEffect } from 'react';
import SocialButton from '../social/SocialButton';
import { SocialLink } from '@/types';
import { FaDiscord, FaTelegram, FaYoutube, FaTwitch } from 'react-icons/fa';

// URL Google Sheets таблицы для подписчиков (тот же лист что и новости - gid=0)
const SUBSCRIBERS_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS0xXqmrU4t8oDUET_LDmpzOnCqA4kROUbl69bMS3LHhGfI-tIdBaX3LKY3VZUgWx4c6-BP_MOgdz-3/pub?gid=0&single=true&output=csv';

const defaultSocialLinks: SocialLink[] = [
  { 
    platform: 'discord', 
    icon: <FaDiscord />, 
    url: 'https://discord.gg/kbMtQZduyz',
    isComingSoon: false,
    subscribers: 0
  },
  { 
    platform: 'telegram', 
    icon: <FaTelegram />, 
    url: 'https://t.me/FanFear',
    isComingSoon: false,
    subscribers: 0
  },
  { 
    platform: 'youtube', 
    icon: <FaYoutube />, 
    isComingSoon: true,
    subscribers: 0
  },
  { 
    platform: 'twitch', 
    icon: <FaTwitch />, 
    url: 'https://www.twitch.tv/tinycs2_ru',
    isComingSoon: false,
    subscribers: 0
  }
];

const SocialSection: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(defaultSocialLinks);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadSubscribersFromGoogleSheets();
  }, []);

  const loadSubscribersFromGoogleSheets = async () => {
    setIsLoading(true);
    setError('');

    try {
      console.log('🔄 Загрузка подписчиков из:', SUBSCRIBERS_SHEET_URL);
      const response = await fetch(SUBSCRIBERS_SHEET_URL);

      if (!response.ok) {
        // Если не удалось загрузить, используем значения по умолчанию без ошибки
        console.warn('⚠️ Не удалось загрузить подписчиков, используем значения по умолчанию');
        setSocialLinks(defaultSocialLinks);
        setIsLoading(false);
        return;
      }

      const csvText = await response.text();
      console.log('📄 CSV текст получен, длина:', csvText.length);
      
      const lines = csvText.split('\n');
      console.log('📊 Количество строк:', lines.length);
      
      if (lines.length < 2) {
        console.warn('⚠️ Таблица подписчиков пуста, используем значения по умолчанию');
        setSocialLinks(defaultSocialLinks);
        setIsLoading(false);
        return;
      }

      // Первая строка - заголовки
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, '').toLowerCase());
      console.log('📋 Заголовки:', headers);
      
      // Находим индексы колонок (более гибкий поиск)
      const platformIndex = headers.findIndex(h => {
        const header = h.toLowerCase();
        return header === 'platform' || 
               header === 'платформа' || 
               header === 'соцсеть' ||
               header === 'social' ||
               header.includes('platform') ||
               header.includes('платформ');
      });
      
      const subscribersIndex = headers.findIndex(h => {
        const header = h.toLowerCase();
        return header === 'subscribers' || 
               header === 'подписчики' || 
               header === 'количество' ||
               header === 'count' ||
               header.includes('subscrib') ||
               header.includes('подписч') ||
               header.includes('количеств');
      });

      console.log('🔍 Индекс platform:', platformIndex);
      console.log('🔍 Индекс subscribers:', subscribersIndex);

      if (platformIndex === -1 || subscribersIndex === -1) {
        console.warn('⚠️ Не найдены колонки platform/subscribers, используем значения по умолчанию');
        setSocialLinks(defaultSocialLinks);
        setIsLoading(false);
        return;
      }

      // Парсим данные с улучшенным CSV парсером
      const subscribersData: Record<string, number> = {};
      
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

        const platform = values[platformIndex]?.trim().toLowerCase();
        const subscribersStr = values[subscribersIndex]?.trim() || '0';
        const subscribers = parseInt(subscribersStr, 10);

        console.log(`📱 Строка ${i}: platform="${platform}", subscribers=${subscribers}, values=`, values);

        if (platform && platform !== '' && !isNaN(subscribers)) {
          subscribersData[platform] = subscribers;
        }
      }

      console.log('✅ Данные подписчиков:', subscribersData);

      // Обновляем socialLinks с данными из таблицы
      const updatedLinks = defaultSocialLinks.map(link => ({
        ...link,
        subscribers: subscribersData[link.platform] || 0
      }));

      console.log('🎯 Обновленные ссылки:', updatedLinks);

      setSocialLinks(updatedLinks);
      setIsLoading(false);
    } catch (err) {
      console.error('❌ Ошибка загрузки подписчиков:', err);
      // Не показываем ошибку пользователю, просто используем значения по умолчанию
      setSocialLinks(defaultSocialLinks);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Title */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
          Соц сети
        </h2>
        
        {/* Refresh button */}
        <button
          onClick={loadSubscribersFromGoogleSheets}
          disabled={isLoading}
          className="px-4 py-2 rounded-button bg-white/5 hover:bg-white/10 border border-white/10 hover:border-neon-purple/50 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 group"
          title="Обновить подписчиков"
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

      {/* Error message */}
      {error && (
        <div className="glassmorphism-card p-4 mb-6 border border-yellow-500/30">
          <p className="text-yellow-400 text-sm">⚠️ {error}</p>
        </div>
      )}

      {/* Social buttons grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {socialLinks.map((social, index) => (
          <SocialButton key={index} social={social} isLoading={isLoading} />
        ))}
      </div>
    </div>
  );
};

export default SocialSection;