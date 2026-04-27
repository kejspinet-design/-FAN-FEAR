# Fan-Fear Dashboard Website

Современное одностраничное веб-приложение (SPA) в стиле dashboard для fan-сообщества CS2 сервера Fear.

## Технологический стек

- **Framework:** Next.js 14+ с App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS с кастомной темой
- **Icons:** React Icons
- **Excel Parsing:** xlsx library (SheetJS)
- **Fonts:** Inter, Montserrat

## Структура проекта

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Глобальные стили и Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Главная страница
├── components/            # React компоненты
│   ├── layout/           # Layout компоненты
│   │   ├── DashboardLayout.tsx
│   │   ├── Sidebar.tsx
│   │   └── ContentArea.tsx
│   ├── navigation/       # Навигация
│   │   └── NavigationItem.tsx
│   ├── sections/         # Разделы контента
│   │   ├── AboutSection.tsx
│   │   ├── NewsSection.tsx
│   │   ├── StaffSection.tsx
│   │   └── SocialSection.tsx
│   ├── news/            # Компоненты новостей
│   │   ├── ExcelLoader.tsx
│   │   └── NewsCard.tsx
│   ├── staff/           # Компоненты команды
│   │   └── StaffCard.tsx
│   └── social/          # Социальные сети
│       └── SocialButton.tsx
├── types/               # TypeScript типы
│   └── index.ts
└── constants/           # Константы и данные
    └── data.ts
```

## Дизайн

- **Тема:** Тёмная с фиолетовыми и синими акцентами
- **Стиль:** Glassmorphism с полупрозрачными элементами
- **Анимации:** Плавные переходы и hover эффекты
- **Адаптивность:** Mobile-first подход

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшен версии
npm start
```

## Особенности

### Glassmorphism эффекты
Используется кастомный CSS класс `.glassmorphism` для создания полупрозрачных элементов с размытием.

### Кастомная Tailwind тема
- `neon-purple`: #a855f7
- `neon-blue`: #3b82f6
- `dark-bg`: #0f0f1e
- `glass-bg`: rgba(255, 255, 255, 0.05)

### Адаптивные сетки
- Mobile: 1 колонка
- Tablet: 2 колонки
- Desktop: 3 колонки

## Статус разработки

✅ **Задача 1: Настройка проекта и базовой структуры**
- Создан Next.js проект с TypeScript
- Настроен Tailwind CSS с кастомной темой
- Установлены зависимости (xlsx, react-icons)
- Создана базовая структура папок и файлов
- Добавлены изображения в public папку

🔄 **Следующие задачи:**
- Реализация DashboardLayout и навигации
- Создание разделов контента
- Система загрузки новостей из Excel
- Адаптивный дизайн и мобильная версия

## Изображения

- **Логотип:** `zaidnii-fon-sdelai-eshche-chut-chut-fiol_xEi7AC6fTwynA3Z6uURDrA_4_XI4zezTdmLCqEfIgBtOA_cover_sd.jpeg`
- **Аватар Santa2555555:** `вертикальное-изображение-симпатичная-смущенная-аниме-девушка-с-344137771.webp`