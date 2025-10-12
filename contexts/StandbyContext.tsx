"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';

interface StandbyContextType {
  isLocked: boolean;
  lockApp: () => void;
  unlockApp: (pin: string) => boolean;
  resetTimer: () => void;
  isStandbyEnabled: boolean;
  setStandbyEnabled: (enabled: boolean) => void;
  currentPin: string;
  setCurrentPin: (pin: string) => void;
  inactivityTimeout: number;
  setInactivityTimeout: (timeout: number) => void;
}

const StandbyContext = createContext<StandbyContextType | undefined>(undefined);

const DEFAULT_PIN = '1234';
const DEFAULT_INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minuten

export const StandbyProvider = ({ children }: { children: ReactNode }) => {
  const [isLocked, setIsLocked] = useState(false);
  const [isStandbyEnabled, setIsStandbyEnabled] = useState(true);
  const [currentPin, setCurrentPin] = useState(DEFAULT_PIN);
  const [inactivityTimeout, setInactivityTimeout] = useState(DEFAULT_INACTIVITY_TIMEOUT);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isInitializedRef = useRef(false);

  const lockApp = useCallback(() => {
    setIsLocked(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isStandbyEnabled) {
      timerRef.current = setTimeout(lockApp, inactivityTimeout);
    }
  }, [lockApp, isStandbyEnabled, inactivityTimeout]);

  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    if (!isClient || isInitializedRef.current) return;

    isInitializedRef.current = true;

    resetTimer();

    const events: Array<keyof WindowEventMap> = ['mousemove', 'keydown', 'mousedown', 'touchstart'];
    const handleActivity = () => resetTimer();
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        lockApp();
      }
    };

    events.forEach(event => window.addEventListener(event, handleActivity));
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach(event => window.removeEventListener(event, handleActivity));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [resetTimer, lockApp]);

  // Reset timer when standby settings change
  useEffect(() => {
    if (isStandbyEnabled) {
      resetTimer();
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [isStandbyEnabled, inactivityTimeout, resetTimer]);

  const unlockApp = (pin: string) => {
    if (pin === currentPin) {
      setIsLocked(false);
      resetTimer();
      return true;
    }
    return false;
  };

  return (
    <StandbyContext.Provider value={{ 
      isLocked, 
      lockApp, 
      unlockApp, 
      resetTimer,
      isStandbyEnabled,
      setStandbyEnabled: setIsStandbyEnabled,
      currentPin,
      setCurrentPin,
      inactivityTimeout,
      setInactivityTimeout
    }}>
      {children}
    </StandbyContext.Provider>
  );
};

export const useStandby = () => {
  const context = useContext(StandbyContext);
  if (context === undefined) {
    throw new Error('useStandby must be used within a StandbyProvider');
  }
  return context;
};
