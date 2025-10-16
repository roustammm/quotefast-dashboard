import React from 'react'
import { render, screen } from '@testing-library/react'

// Simple ErrorMessage component for testing
const ErrorMessage = ({ message, className = '' }: { message: string | null; className?: string }) => {
  if (!message) return null
  
  return (
    <div className={`text-red-600 ${className}`}>
      {message}
    </div>
  )
}

describe('ErrorMessage - Simple Tests', () => {
  it('should render error message', () => {
    render(<ErrorMessage message="Test error message" />)
    
    expect(screen.getByText('Test error message')).toBeInTheDocument()
  })

  it('should render with custom className', () => {
    render(<ErrorMessage message="Test error" className="custom-class" />)
    
    const errorElement = screen.getByText('Test error')
    expect(errorElement).toHaveClass('custom-class')
  })

  it('should render with default styling', () => {
    render(<ErrorMessage message="Test error" />)
    
    const errorElement = screen.getByText('Test error')
    expect(errorElement).toHaveClass('text-red-600')
  })

  it('should not render when message is empty', () => {
    const { container } = render(<ErrorMessage message="" />)
    
    expect(container.firstChild).toBeNull()
  })

  it('should not render when message is null', () => {
    render(<ErrorMessage message={null} />)
    
    expect(screen.queryByText('null')).not.toBeInTheDocument()
  })
})
