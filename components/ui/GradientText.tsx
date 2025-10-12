'use client'

import React from 'react'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  gradient?: string
}

export default function GradientText({ 
  children, 
  className = '',
  gradient = 'from-brand-primary via-brand-secondary to-brand-accent'
}: GradientTextProps) {
  return (
    <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  )
}
