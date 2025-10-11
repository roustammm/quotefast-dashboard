"use client";

import React from 'react';
import { ThemeProvider } from "../../contexts/ThemeContext";
import { AuthProvider } from "../../contexts/AuthContext";
import { AIPersonalizationProvider } from "../../contexts/AIPersonalizationContext";
import { StandbyProvider, useStandby } from "../../contexts/StandbyContext";
import LockScreen from './LockScreen';

function AppContent({ children }: { children: React.ReactNode }) {
  const { isLocked } = useStandby();
  
  return (
    <>
      {isLocked && <LockScreen />}
      <div className={isLocked ? 'pointer-events-none blur-sm' : ''}>
        {children}
      </div>
    </>
  );
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AIPersonalizationProvider>
          <StandbyProvider>
            <AppContent>
              {children}
            </AppContent>
          </StandbyProvider>
        </AIPersonalizationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
