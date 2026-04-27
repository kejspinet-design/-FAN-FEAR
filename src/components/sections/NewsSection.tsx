'use client';

import React, { useState, useEffect } from 'react';
import NewsCard from '../news/NewsCard';
import { NewsData } from '@/types';

// Полная ссылка на опубликованную Google Sheets таблицу
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS0xXqmrU4t8oDUET_LDmpzOnCqA4kROUbl69bMS3LHhGfI-tIdBaX3LKY3VZUgWx4c6-BP_MOgdz-3/pub?gid=0&single=true&output=csv';

const NewsSection: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNewsFromGoogleSheets();
  }, []);

  const loadNewsFromGoogleSheets = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Используем CSV формат - он работает без CORS проблем
      const response = await fetch(SHEET_URL);

      if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
      }

      const csvText = await response.text();
      
      // Парсим CSV
      const lines = csvText.split('\n');
      if (lines.length < 2) {
        throw new Error('Таблица пуста');
      }

      // Первая строка - заголовки
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      
      // Находим индексы нужных колонок
      const photoUrlIndex = headers.findIndex(h => 
        h.toLowerCase().includes('photo') || h.toLowerCase().includes('фото')
      );
      const titleIndex = headers.findIndex(h => 
        h.toLowerCase().includes('title') || h.toLowerCase().includes('название') || h.toLowerCase().includes('заголовок')
      );
      const descriptionIndex = headers.findIndex(h => 
        h.toLowerCase().includes('description') || h.toLowerCase().includes('описание')
      );

      if (photoUrlIndex === -1 || titleIndex === -1 || descriptionIndex === -1) {
        throw new Error('Не найдены необходимые колонки (photoUrl, title, description)');
      }

      // Парсим данные с улучшенным CSV парсером
      const validatedData: NewsData[] = [];
      
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

        const photoUrl = values[photoUrlIndex]?.trim();
        const title = values[titleIndex]?.trim();
        const description = values[descriptionIndex]?.trim();

        console.log(`📰 Строка ${i}: photoUrl="${photoUrl}", title="${title}", description="${description}"`);

        // СТРОГАЯ ПРОВЕРКА: все три поля должны быть заполнены и photoUrl должен быть ссылкой
        if (photoUrl && 
            title && 
            description && 
            photoUrl !== '' && 
            title !== '' && 
            description !== '' &&
            (photoUrl.startsWith('http://') || photoUrl.startsWith('https://') || photoUrl.startsWith('data:image/'))) {
          
          validatedData.push({
            photoUrl,
            title,
            description,
          });
          
          console.log(`✅ Добавлена новость: "${title}"`);
        } else {
          console.log(`❌ Пропущена строка ${i}: не все поля заполнены или photoUrl не является ссылкой`);
        }
      }

      if (validatedData.length === 0) {
        throw new Error('Не найдено валидных записей в таблице');
      }

      setNewsData(validatedData);
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading news:', err);
      setError(err instanceof Error ? err.message : 'Ошибка загрузки новостей');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
          Новости
        </h2>
        
        {/* Refresh button */}
        <button
          onClick={loadNewsFromGoogleSheets}
          disabled={isLoading}
          className="px-4 py-2 rounded-button bg-white/5 hover:bg-white/10 border border-white/10 hover:border-neon-purple/50 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 group"
          title="Обновить новости"
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
          <span className="hidden sm:inline">{isLoading ? 'Загрузка...' : 'Обновить'}</span>
        </button>
      </div>

      {/* Loading state */}
      {isLoading && newsData.length === 0 && (
        <div className="glassmorphism-card p-12 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-neon-purple border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-300">Загрузка новостей из Google Sheets...</p>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && !isLoading && (
        <div className="glassmorphism-card p-6 mb-8 border-2 border-red-500/50">
          <div className="flex items-start space-x-3">
            <svg
              className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1">
              <h4 className="text-red-500 font-semibold mb-1">Ошибка загрузки</h4>
              <p className="text-gray-300 text-sm whitespace-pre-line mb-3">{error}</p>
              <button
                onClick={loadNewsFromGoogleSheets}
                className="text-sm px-4 py-2 rounded-button bg-neon-purple/20 hover:bg-neon-purple/30 text-neon-purple border border-neon-purple/30 transition-all duration-300"
              >
                Попробовать снова
              </button>
            </div>
          </div>
        </div>
      )}

      {/* News grid */}
      {newsData.length > 0 && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.map((news, index) => (
            <NewsCard key={index} news={news} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && newsData.length === 0 && (
        <div className="glassmorphism-card p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto mb-4 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <p className="text-xl text-gray-300 font-medium mb-2">
            Новости скоро появятся
          </p>
          <p className="text-sm text-gray-400">
            Добавьте данные в Google Sheets таблицу с колонками:<br />
            <code className="text-neon-purple">photoUrl</code>, <code className="text-neon-purple">title</code>, <code className="text-neon-purple">description</code>
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsSection;