'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, MotionProps } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        glass: 'modern-glass-button',
        premium: 'glass-card-premium',
        underline: 'modern-glass-button relative group !p-0 !bg-transparent !border-none !shadow-none hover:text-white transition-all text-sm',
      },
      size: {
        default: 'px-6 py-3 text-base',
        sm: 'px-4 py-2 text-sm',
        lg: 'px-8 py-4 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, ...props }, ref) => {
    const isLink = !!href
    const MotionComponent = isLink ? motion(Link) : motion.button

    const motionProps: MotionProps & { href?: string } = {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
      ...(isLink ? { href } : {}),
    }

    return (
      <MotionComponent className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...motionProps} {...props}>
        {props.children}
        {variant === 'underline' && <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-green-600 transition-all group-hover:w-full"></span>}
      </MotionComponent>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }