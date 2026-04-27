import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from './Sidebar';
import { ActiveSection } from './DashboardLayout';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

describe('Sidebar', () => {
  const mockProps = {
    activeSection: 'about' as ActiveSection,
    onNavigate: jest.fn(),
    isMobileMenuOpen: false,
    onToggleMobileMenu: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders logo with correct styling', () => {
    render(<Sidebar {...mockProps} />);
    
    expect(screen.getByText('Fan-Fear')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByAltText('Fan-Fear Logo')).toBeInTheDocument();
  });

  it('renders all navigation items', () => {
    render(<Sidebar {...mockProps} />);
    
    expect(screen.getByRole('button', { name: /Navigate to О проекте/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Navigate to Новости/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Navigate to Стафф/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Navigate to Соц сети/ })).toBeInTheDocument();
  });

  it('renders footer with developer credit', () => {
    render(<Sidebar {...mockProps} />);
    
    expect(screen.getByText('Developed by')).toBeInTheDocument();
    expect(screen.getByText('Santa')).toBeInTheDocument();
  });

  it('calls onNavigate when navigation item is clicked', () => {
    render(<Sidebar {...mockProps} />);
    
    fireEvent.click(screen.getByRole('button', { name: /Navigate to Новости/ }));
    expect(mockProps.onNavigate).toHaveBeenCalledWith('news');
  });

  it('shows mobile menu button', () => {
    render(<Sidebar {...mockProps} />);
    
    expect(screen.getByLabelText('Toggle mobile menu')).toBeInTheDocument();
  });

  it('calls onToggleMobileMenu when mobile button is clicked', () => {
    render(<Sidebar {...mockProps} />);
    
    fireEvent.click(screen.getByLabelText('Toggle mobile menu'));
    expect(mockProps.onToggleMobileMenu).toHaveBeenCalled();
  });

  it('applies correct classes for mobile menu state', () => {
    const { rerender } = render(<Sidebar {...mockProps} />);
    
    // Closed state
    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toHaveClass('-translate-x-full');
    
    // Open state
    rerender(<Sidebar {...mockProps} isMobileMenuOpen={true} />);
    expect(sidebar).toHaveClass('translate-x-0');
  });

  it('shows active state for current section', () => {
    render(<Sidebar {...mockProps} activeSection="news" />);
    
    const newsButton = screen.getByRole('button', { name: /Navigate to Новости/ });
    expect(newsButton).toHaveAttribute('aria-current', 'page');
  });
});