// Data models for the Fan-Fear Dashboard

export interface NewsData {
  photoUrl: string;      // URL изображения новости
  title: string;         // Заголовок новости (max 100 chars)
  description: string;   // Описание новости (max 300 chars)
}

export interface StaffMember {
  nickname: string;      // Никнейм участника
  role: string;          // Роль в команде
  avatar?: string;       // Опциональный путь к аватару
}

export interface SocialLink {
  platform: 'discord' | 'telegram' | 'youtube' | 'twitch';
  icon: React.ReactNode;
  url?: string;
  isComingSoon: boolean;
  subscribers?: number;  // Количество подписчиков
}

export interface NavigationSection {
  id: 'about' | 'news' | 'staff' | 'social';
  label: string;
  icon: React.ReactNode;
}

export type ActiveSection = 'about' | 'news' | 'staff' | 'social';