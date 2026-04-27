import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContentArea from './ContentArea';
import { ActiveSection } from './DashboardLayout';

// Mock the section components
jest.mock('../sections/AboutSection', () => {
  return function AboutSection() {
    return <div data-testid="about-section">About Section</div>;
  };
});

jest.mock('../sections/NewsSection', () => {
  return function NewsSection() {
    return <div data-testid="news-section">News Section</div>;
  };
});

jest.mock('../sections/StaffSection', () => {
  return function StaffSection() {
    return <div data-testid="staff-section">Staff Section</div>;
  };
});

jest.mock('../sections/SocialSection', () => {
  return function SocialSection() {
    return <div data-testid="social-section">Social Section</div>;
  };
});

describe('ContentArea', () => {
  it('renders about section by default', async () => {
    render(<ContentArea activeSection="about" />);
    
    await waitFor(() => {
      expect(screen.getByTestId('about-section')).toBeInTheDocument();
    });
  });

  it('renders news section when activeSection is news', async () => {
    render(<ContentArea activeSection="news" />);
    
    await waitFor(() => {
      expect(screen.getByTestId('news-section')).toBeInTheDocument();
    });
  });

  it('renders staff section when activeSection is staff', async () => {
    render(<ContentArea activeSection="staff" />);
    
    await waitFor(() => {
      expect(screen.getByTestId('staff-section')).toBeInTheDocument();
    });
  });

  it('renders social section when activeSection is social', async () => {
    render(<ContentArea activeSection="social" />);
    
    await waitFor(() => {
      expect(screen.getByTestId('social-section')).toBeInTheDocument();
    });
  });

  it('has proper main element with accessibility attributes', () => {
    render(<ContentArea activeSection="about" />);
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveAttribute('aria-label', 'about section content');
  });

  it('applies responsive padding classes', () => {
    render(<ContentArea activeSection="about" />);
    
    const main = screen.getByRole('main');
    const paddingContainer = main.firstChild as HTMLElement;
    
    expect(paddingContainer).toHaveClass(
      'px-4', 'py-6', 
      'sm:px-6', 'sm:py-8', 
      'md:px-8', 'md:py-10', 
      'lg:px-12', 'lg:py-12',
      'xl:px-16', 'xl:py-16'
    );
  });

  it('applies transition classes for animations', () => {
    render(<ContentArea activeSection="about" />);
    
    const main = screen.getByRole('main');
    const contentContainer = main.querySelector('[class*="transition-all"]');
    
    expect(contentContainer).toHaveClass('transition-all', 'duration-300', 'ease-out', 'transform');
  });

  it('changes section when activeSection prop changes', async () => {
    const { rerender } = render(<ContentArea activeSection="about" />);
    
    await waitFor(() => {
      expect(screen.getByTestId('about-section')).toBeInTheDocument();
    });

    rerender(<ContentArea activeSection="news" />);
    
    await waitFor(() => {
      expect(screen.getByTestId('news-section')).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('has proper layout classes', () => {
    render(<ContentArea activeSection="about" />);
    
    const main = screen.getByRole('main');
    expect(main).toHaveClass('flex-1', 'min-h-screen', 'md:ml-0', 'relative', 'overflow-hidden');
  });
});