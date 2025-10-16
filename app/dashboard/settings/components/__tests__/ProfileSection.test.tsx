/**
 * ProfileSection Component Tests
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import ProfileSection from '../ProfileSection';

// Mock the hooks
vi.mock('../../../../../app/providers', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../hooks/useToast', () => ({
  useToast: vi.fn(() => ({
    error: vi.fn(),
    success: vi.fn(),
    info: vi.fn(),
    loading: vi.fn(() => 'toast-id'),
    dismiss: vi.fn(),
    dismissAll: vi.fn(),
  })),
}));

import { useAuth } from '../../../../../app/providers';

// Mock user data
const mockUser = {
  id: '123',
  email: 'test@example.com',
  full_name: 'John Doe',
  avatar_url: null,
};

describe('ProfileSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as any).mockReturnValue({
      user: mockUser,
      loading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      updateProfile: vi.fn(),
    });
  });

  it('renders loading state when user is not available', () => {
    (useAuth as any).mockReturnValue({
      user: null,
      loading: true,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      updateProfile: vi.fn(),
    });

    render(<ProfileSection />);

    expect(screen.getByText('Profiel laden...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders user profile information correctly', () => {
    render(<ProfileSection />);

    expect(screen.getByText('Profiel Informatie')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText(/Lid sinds/)).toBeInTheDocument();
  });

  it('displays avatar letters correctly', () => {
    render(<ProfileSection />);

    const avatar = screen.getByLabelText('Avatar voor John Doe');
    expect(avatar).toHaveTextContent('JD');
  });

  it('shows form fields with correct initial values', () => {
    render(<ProfileSection />);

    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
  });

  it('has proper ARIA labels and roles', () => {
    render(<ProfileSection />);

    expect(screen.getByLabelText('Avatar voor John Doe')).toBeInTheDocument();
    expect(screen.getByLabelText('Bewerk profielfoto')).toBeInTheDocument();
    expect(screen.getByLabelText(/voornaam/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/achternaam/i)).toBeInTheDocument();
  });

  it('handles missing user data gracefully', () => {
    (useAuth as any).mockReturnValue({
      user: { ...mockUser, full_name: '', email: '' },
      loading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      updateProfile: vi.fn(),
    });

    render(<ProfileSection />);

    expect(screen.getByText('Geen naam ingesteld')).toBeInTheDocument();
    expect(screen.getByText('Geen email ingesteld')).toBeInTheDocument();
  });
});