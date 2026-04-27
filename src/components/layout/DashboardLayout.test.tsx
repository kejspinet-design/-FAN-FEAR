import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardLayout from './DashboardLayout';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock window.innerWidth for responsive tests
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
});

describe('DashboardLayout', () => {
  beforeEach(() => {
    // Reset window size to desktop
    window.innerWidth = 1024;
  });

  it('renders sidebar with navigation items', () => {
    render(<DashboardLayout />);
    
    expect(screen.getByText('Fan-Fear')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Navigate to О проекте/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Navigate to Новости/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Navigate to Стафф/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Navigate to Соц сети/ })).toBeInTheDocument();
    expect(screen.getByText('Developed by')).toBeInTheDocument();
    expect(screen.getByText('Santa')).toBeInTheDocument();
  });

  it('renders content area with default about section', () => {
    render(<DashboardLayout />);
    
    expect(screen.getByRole('heading', { name: /О проекте/ })).toBeInTheDocument();
    expect(screen.getByText(/Fan-сообщество Fear/)).toBeInTheDocument();
  });

  it('switches sections when navigation items are clicked', () => {
    render(<DashboardLayout />);
    
    // Click on News section
    fireEvent.click(screen.getByRole('button', { name: /Navigate to Новости/ }));
    expect(screen.getByText('Новости скоро появятся')).toBeInTheDocument();
    
    // Click on Staff section
    fireEvent.click(screen.getByRole('button', { name: /Navigate to Стафф/ }));
    expect(screen.getByText('Информация о команде скоро появится')).toBeInTheDocument();
    
    // Click on Social section
    fireEvent.click(screen.getByRole('button', { name: /Navigate to Соц сети/ }));
    expect(screen.getByText('Социальные сети скоро появятся')).toBeInTheDocument();
  });

  it('shows active state for current section', () => {
    render(<DashboardLayout />);
    
    // About section should be active by default
    const aboutButton = screen.getByRole('button', { name: /Navigate to О проекте/ });
    expect(aboutButton).toHaveAttribute('aria-current', 'page');
    
    // Click on News and check active state
    const newsButton = screen.getByRole('button', { name: /Navigate to Новости/ });
    fireEvent.click(newsButton);
    expect(newsButton).toHaveAttribute('aria-current', 'page');
    expect(aboutButton).not.toHaveAttribute('aria-current', 'page');
  });

  it('shows mobile menu button on small screens', () => {
    // Mock mobile screen size
    window.innerWidth = 600;
    
    render(<DashboardLayout />);
    
    const mobileMenuButton = screen.getByLabelText('Toggle mobile menu');
    expect(mobileMenuButton).toBeInTheDocument();
  });
});