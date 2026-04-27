# Деплой на Vercel

## Быстрый старт

1. Перейдите на [vercel.com](https://vercel.com)
2. Войдите через GitHub
3. Нажмите "Add New Project"
4. Выберите репозиторий `kejspinet-design/-FAN-FEAR`
5. Нажмите "Deploy"

Vercel автоматически определит что это Next.js проект и настроит всё сам!

## Настройки проекта

### Framework Preset
- **Framework**: Next.js
- **Build Command**: `npm run build` (автоматически)
- **Output Directory**: `.next` (автоматически)
- **Install Command**: `npm install` (автоматически)

### Root Directory
- Оставьте пустым или укажите `./` если Vercel попросит

### Environment Variables
Не требуются - все данные загружаются из публичной Google Sheets таблицы

## После деплоя

1. Vercel даст вам URL типа `https://fan-fear.vercel.app`
2. Сайт будет доступен сразу после деплоя
3. Каждый push в `main` ветку будет автоматически деплоиться

## Настройка домена (опционально)

1. В настройках проекта на Vercel перейдите в "Domains"
2. Добавьте свой домен
3. Следуйте инструкциям Vercel для настройки DNS

## Обновление сайта

### Автоматическое обновление контента
- Редактируйте Google Sheets таблицу
- Нажмите кнопку "Обновить" на сайте
- Данные обновятся без редеплоя

### Обновление кода
```bash
git add .
git commit -m "Описание изменений"
git push origin main
```

Vercel автоматически задеплоит новую версию!

## Полезные ссылки

- **GitHub репозиторий**: https://github.com/kejspinet-design/-FAN-FEAR
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Next.js документация**: https://nextjs.org/docs

## Проблемы и решения

### Сайт не деплоится
1. Проверьте что проект собирается локально: `npm run build`
2. Проверьте логи в Vercel Dashboard
3. Убедитесь что все зависимости установлены

### Изображения не загружаются
1. Убедитесь что изображения находятся в папке `public/`
2. Проверьте пути к изображениям (должны начинаться с `/`)

### Google Sheets не загружается
1. Убедитесь что таблица опубликована в интернете
2. Проверьте что URL заканчивается на `&output=csv`
3. Проверьте консоль браузера (F12) для ошибок

## Технические детали

- **Framework**: Next.js 16.2.4
- **React**: 19.2.4
- **Styling**: Tailwind CSS v4
- **Deployment**: Vercel (автоматический)
- **Build time**: ~30 секунд
- **Cold start**: <1 секунда
