import { StaffMember, SocialLink, NavigationSection } from '@/types';
import React from 'react';
import { InfoIcon, NewsIcon, UsersIcon, ShareIcon, DiscordIcon, TelegramIcon, YoutubeIcon, TwitchIcon } from '@/components/common/Icon';

export const staffMembers: StaffMember[] = [
  { nickname: 'Tiny', role: 'Основатель' },
  { nickname: 'Alt_Goty', role: 'Зам' },
  { 
    nickname: 'Santa2555555', 
    role: 'Руководство',
    avatar: '/вертикальное-изображение-симпатичная-смущенная-аниме-девушка-с-344137771.webp'
  }
];

export const socialLinks: SocialLink[] = [
  { 
    platform: 'discord', 
    icon: React.createElement(DiscordIcon), 
    url: 'https://discord.gg/kbMtQZduyz',
    isComingSoon: false 
  },
  { 
    platform: 'telegram', 
    icon: React.createElement(TelegramIcon), 
    url: 'https://t.me/FanFear',
    isComingSoon: false 
  },
  { 
    platform: 'youtube', 
    icon: React.createElement(YoutubeIcon), 
    isComingSoon: true 
  },
  { 
    platform: 'twitch', 
    icon: React.createElement(TwitchIcon), 
    url: 'https://www.twitch.tv/tinycs2_ru',
    isComingSoon: false 
  }
];

export const navigationSections: NavigationSection[] = [
  { id: 'about', label: 'О проекте', icon: React.createElement(InfoIcon) },
  { id: 'news', label: 'Новости', icon: React.createElement(NewsIcon) },
  { id: 'staff', label: 'Стафф', icon: React.createElement(UsersIcon) },
  { id: 'social', label: 'Соц сети', icon: React.createElement(ShareIcon) }
];