import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavigationItem from './NavigationItem';
import { InfoIcon } from '../common/Icon';

describe('NavigationItem', () => {
  const mockOnClick = jest.fn();
  const defaultProps = {
    icon: <InfoIcon />,
    label: 'Test Item',
    section: 'about' as const,
    isActive: false,
    onClick: mockOnClick,
  };

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders with icon and label', () => {
    render(<NavigationItem {...defaultProps} />);
    
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Navigate to Test Item' })).toBeInTheDocument();
  });

  it('applies active state styling when isActive is true', () => {
    render(<NavigationItem {...defaultProps} isActive={true} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gradient-to-r', 'from-neon-purple/20', 'to-neon-blue/20');
    expect(button).toHaveClass('text-neon-purple', 'shadow-glow-purple');
  });

  it('applies hover state styling when isActive is false', () => {
    render(<NavigationItem {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-gray-300', 'hover:text-white', 'hover:bg-white/10');
    expect(button).toHaveClass('hover:shadow-glow-purple/30', 'hover:border-neon-purple/20');
  });

  it('calls onClick when clicked', () => {
    render(<NavigationItem {...defaultProps} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes', () => {
    render(<NavigationItem {...defaultProps} isActive={true} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Navigate to Test Item');
    expect(button).toHaveAttribute('aria-current', 'page');
  });

  it('has proper accessibility attributes when not active', () => {
    render(<NavigationItem {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Navigate to Test Item');
    expect(button).not.toHaveAttribute('aria-current');
  });

  it('has proper animation classes', () => {
    render(<NavigationItem {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('transition-all', 'duration-300', 'ease-in-out', 'transform');
    expect(button).toHaveClass('hover:scale-105', 'hover:brightness-110');
    expect(button).toHaveClass('active:scale-[0.98]', 'active:transition-transform', 'active:duration-100');
  });

  it('has group class for hover effects', () => {
    render(<NavigationItem {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('group');
  });

  it('applies focus styles', () => {
    render(<NavigationItem {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-neon-purple/50');
    expect(button).toHaveClass('focus:ring-offset-2', 'focus:ring-offset-transparent');
  });
});