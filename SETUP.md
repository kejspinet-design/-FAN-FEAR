# Инструкции по настройке проекта Fan-Fear Dashboard

## Установленные зависимости

### Основные зависимости
- `next` - Next.js framework
- `react` - React library
- `react-dom` - React DOM
- `xlsx` - Библиотека для парсинга Excel файлов
- `react-icons` - Библиотека иконок

### Dev зависимости
- `@types/node` - TypeScript типы для Node.js
- `@types/react` - TypeScript типы для React
- `@types/react-dom` - TypeScript типы для React DOM
- `typescript` - TypeScript compiler
- `tailwindcss` - Tailwind CSS framework
- `eslint` - ESLint linter
- `eslint-config-next` - ESLint конфигурация для Next.js

## Структура проекта

```
fan-fear-dashboard/
├── public/                                    # Статические файлы
│   ├── zaidnii-fon-sdelai-eshche-chut-chut-fiol_xEi7AC6fTwynA3Z6uURDrA_4_XI4zezTdmLCqEfIgBtOA_cover_sd.jpeg
│   └── вертикальное-изображение-симпатичная-смущенная-аниме-девушка-с-344137771.webp
├── src/
│   ├── app/                                   # Next.js App Router
│   │   ├── globals.css                        # Глобальные стили
│   │   ├── layout.tsx                         # Root layout
│   │   └── page.tsx                           # Главная страница
│   ├── components/                            # React компоненты
│   │   ├── layout/                           # Layout компоненты
│   │   ├── navigation/                       # Навигация
│   │   ├── sections/                         # Разделы контента
│   │   ├── news/                            # Компоненты новостей
│   │   ├── staff/                           # Компоненты команды
│   │   └── social/                          # Социальные сети
│   ├── types/                               # TypeScript типы
│   │   └── index.ts
│   └── constants/                           # Константы и данные
│       └── data.ts
├── tailwind.config.ts                       # Конфигурация Tailwind
├── tsconfig.json                           # Конфигурация TypeScript
├── package.json                            # Зависимости проекта
└── README.md                               # Документация проекта
```

## Кастомная Tailwind тема

Настроена кастомная тема с:
- Тёмными цветами фона
- Фиолетовыми и синими акцентами
- Glassmorphism эффектами
- Кастомными тенями и радиусами

## Следующие шаги

1. **Задача 2**: Создание основного layout и навигации
2. **Задача 4**: Реализация ContentArea и разделов
3. **Задача 5**: Система загрузки и отображения новостей
4. **Задача 7**: Раздел команды
5. **Задача 8**: Социальные сети
6. **Задача 9**: Адаптивный дизайн

## Команды для разработки

```bash
# Запуск в режиме разработки
npm run dev

# Сборка проекта
npm run build

# Запуск продакшен версии
npm start

# Проверка линтером
npm run lint
```