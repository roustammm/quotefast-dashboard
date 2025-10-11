"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { authService, authStateManager } from '../lib/auth-service-enhanced';

// Enhanced auth context with better UX and error handling
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  
  // Auth actions
  signUp: (email: string, password: string, userData?: any) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signInWithMagicLink: (email: string) => Promise<AuthResult>;
  signOut: () => Promise<AuthResult>;
  resetPassword: (email: string) => Promise<AuthResult>;
  updatePassword: (newPassword: string) => Promise<AuthResult>;
  updateProfile: (updates: any) => Promise<AuthResult>;
  changeEmail: (newEmail: string) => Promise<AuthResult>;
  deleteAccount: () => Promise<AuthResult>;
  verifyEmail: (token: string) => Promise<AuthResult>;
  resendConfirmation: (email: string) => Promise<AuthResult>;
  
  // Utility functions
  clearError: () => void;
  clearSuccess: () => void;
  refreshUser: () => Promise<void>;
}

interface AuthResult {
  success: boolean;
  error?: string;
  data?: any;
  message?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Clear error message
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Clear success message
  const clearSuccess = useCallback(() => {
    setSuccess(null);
  }, []);

  // Refresh user data
  const refreshUser = useCallback(async () => {
    try {
      const result = await authService.getCurrentUser();
      if (result.success) {
        setUser(result.data.user);
      }
    } catch (err) {
      console.error('Error refreshing user:', err);
    }
  }, []);

  // Auth action wrappers with loading states and error handling
  const signUp = useCallback(async (email: string, password: string, userData?: any): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const result = await authService.signUp(email, password, userData);
      
      if (result.success) {
        setSuccess(result.data.message);
        setUser(result.data.user);
        setSession(result.data.session);
      } else {
        setError(result.error);
      }
      
      return result;
    } catch (err) {
      const errorMessage = 'Er is een onbekende fout opgetreden';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const result = await authService.signIn(email, password);
      
      if (result.success) {
        setSuccess(result.data.message);
        setUser(result.data.user);
        setSession(result.data.session);
      } else {
        setError(result.error);
      }
      
      return result;
    } catch (err) {
      const errorMessage = 'Er is een onbekende fout opgetreden';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const signInWithMagicLink = useCallback(async (email: string): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const result = await authService.signInWithMagicLink(email);
      
      if (result.success) {
        setSuccess(result.data.message);
      } else {
        setError(result.error);
      }
      
      return result;
    } catch (err) {
      const errorMessage = 'Er is een onbekende fout opgetreden';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async (): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const result = await authService.signOut();
      
      if (result.success) {
        setSuccess(result.message);
        setUser(null);
        setSession(null);
      } else {
        setError(result.error);
      }
      
      return result;
    } catch (err) {
      const errorMessage = 'Er is een onbekende fout opgetreden';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (email: string): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const result = await authService.resetPassword(email);
      
      if (result.success) {
        setSuccess(result.data.message);
      } else {
        setError(result.error);
      }
      
      return result;
    } catch (err) {
      const errorMessage = 'Er is een onbekende fout opgetreden';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePassword = useCallback(async (newPassword: string): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const result = await authService.updatePassword(newPassword);
      
      if (result.success) {
        setSuccess(result.data.message);
        setUser(result.data.user);
      } else {
        setError(result.error);
      }
      
      return result;
    } catch (err) {
      const errorMessage = 'Er is een onbekende fout opgetreden';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (updates: any): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const result = await authService.updateProfile(updates);
      
      if (result.success) {
        setSuccess(result.data.message);
        setUser(result.data.user);
      } else {
        setError(result.error);
      }
      
      return result;
    } catch (err) {
      const errorMessage = 'Er is een onbekende fout opgetreden';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const changeEmail = useCallback(async (newEmail: string): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const result = await authService.changeEmail(newEmail);
      
      if (result.success) {
        setSuccess(result.data.message);
        setUser(result.data.user);
      } else {
        setError(result.error);
      }
      
      return result;
    } catch (err) {
      const errorMessage = 'Er is een onbekende fout opgetreden';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAccount = useCallback(async (): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const result = await authService.deleteAccount();
      
      if (result.success) {
        setSuccess(result.message);
        setUser(null);
        setSession(null);
      } else {
        setError(result.error);
      }
      
      return result;
    } catch (err) {
      const errorMessage = 'Er is een onbekende fout opgetreden';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyEmail = useCallback(async (token: string): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const result = await authService.verifyEmail(token);
      
      if (result.success) {
        setSuccess(result.data.message);
        setUser(result.data.user);
        setSession(result.data.session);
      } else {
        setError(result.error);
      }
      
      return result;
    } catch (err) {
      const errorMessage = 'Er is een onbekende fout opgetreden';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const resendConfirmation = useCallback(async (email: string): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const result = await authService.resendConfirmation(email);
      
      if (result.success) {
        setSuccess(result.data.message);
      } else {
        setError(result.error);
      }
      
      return result;
    } catch (err) {
      const errorMessage = 'Er is een onbekende fout opgetreden';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Get current session
        const sessionResult = await authService.getCurrentSession();
        if (sessionResult.success && sessionResult.data.session) {
          if (mounted) {
            setSession(sessionResult.data.session);
            setUser(sessionResult.data.session.user);
          }
        }

        // Subscribe to auth state changes
        const unsubscribe = authStateManager.subscribe((user) => {
          if (mounted) {
            setUser(user);
            if (user) {
              // Get fresh session when user changes
              authService.getCurrentSession().then((result) => {
                if (result.success && mounted) {
                  setSession(result.data.session);
                }
              });
            } else {
              setSession(null);
            }
          }
        });

        return unsubscribe;
      } catch (err) {
        console.error('Auth initialization error:', err);
        if (mounted) {
          setError('Fout bij het initialiseren van authenticatie');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    let unsubscribe: (() => void) | undefined;
    
    initializeAuth().then((unsub) => {
      unsubscribe = unsub;
    });

    return () => {
      mounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // Auto-clear messages after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const value: AuthContextType = {
    user,
    session,
    loading,
    error,
    success,
    signUp,
    signIn,
    signInWithMagicLink,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    changeEmail,
    deleteAccount,
    verifyEmail,
    resendConfirmation,
    clearError,
    clearSuccess,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Auth status hook for conditional rendering
export function useAuthStatus() {
  const { user, loading } = useAuth();
  
  return {
    isAuthenticated: !!user,
    isLoading: loading,
    user,
  };
}

// Auth actions hook for forms
export function useAuthActions() {
  const {
    signUp,
    signIn,
    signInWithMagicLink,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    changeEmail,
    deleteAccount,
    verifyEmail,
    resendConfirmation,
    loading,
    error,
    success,
    clearError,
    clearSuccess,
  } = useAuth();

  return {
    signUp,
    signIn,
    signInWithMagicLink,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    changeEmail,
    deleteAccount,
    verifyEmail,
    resendConfirmation,
    loading,
    error,
    success,
    clearError,
    clearSuccess,
  };
}

export default AuthContext;
