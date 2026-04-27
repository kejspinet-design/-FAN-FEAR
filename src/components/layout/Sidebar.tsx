'use client';

import React from 'react';
import Image from 'next/image';
import NavigationItem from '../navigation/NavigationItem';
import { InfoIcon, NewsIcon, UsersIcon, ShareIcon, BarsIcon, TimesIcon } from '../common/Icon';
import { ActiveSection } from './DashboardLayout';

interface SidebarProps {
  activeSection: ActiveSection;
  onNavigate: (section: ActiveSection) => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

const navigationSections = [
  { id: 'about' as const, label: 'О проекте', icon: <InfoIcon /> },
  { id: 'news' as const, label: 'Новости', icon: <NewsIcon /> },
  { id: 'staff' as const, label: 'Стафф', icon: <UsersIcon /> },
  { id: 'social' as const, label: 'Соц сети', icon: <ShareIcon /> },
];

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onNavigate,
  isMobileMenuOpen,
  onToggleMobileMenu,
}) => {
  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={onToggleMobileMenu}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg glassmorphism text-white hover:text-neon-purple transition-colors duration-300 md:hidden"
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <TimesIcon size={24} /> : <BarsIcon size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-screen w-[280px] z-50
          glassmorphism border-r border-white/10
          transform transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          flex flex-col shadow-glass
        `}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-white/10 bg-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden ring-2 ring-neon-purple/30 shadow-glow-purple">
              <Image
                src="/zaidnii-fon-sdelai-eshche-chut-chut-fiol_xEi7AC6fTwynA3Z6uURDrA_4_XI4zezTdmLCqEfIgBtOA_cover_sd.jpeg"
                alt="Fan-Fear Logo"
                width={48}
                height={48}
                className="object-cover rounded-lg"
                sizes="48px"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Fan-Fear</h1>
              <p className="text-sm text-neon-purple/80">Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationSections.map((section) => (
              <li key={section.id}>
                <NavigationItem
                  icon={section.icon}
                  label={section.label}
                  section={section.id}
                  isActive={activeSection === section.id}
                  onClick={() => onNavigate(section.id)}
                />
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-white/5">
          <p className="text-sm text-gray-400 text-center font-medium">
            Developed by <span className="text-neon-purple">Santa</span>
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;