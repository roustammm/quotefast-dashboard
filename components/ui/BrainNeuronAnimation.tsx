'use client'
import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Neuron {
  id: number
  x: number
  y: number
  connections: number[]
  pulsePhase: number
  pulseSpeed: number
}

interface BrainNeuronAnimationProps {
  className?: string
}

export default function BrainNeuronAnimation({ className = '' }: BrainNeuronAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const neuronsRef = useRef<Neuron[]>([])
  const timeRef = useRef(0)

  // Initialize neurons in realistic brain-like pattern
  const initializeNeurons = (width: number, height: number): Neuron[] => {
    const neurons: Neuron[] = []
    const centerX = width / 2
    const centerY = height / 2
    
    // Create realistic brain hemispheres
    const hemispheres = [
      { offsetX: -25, offsetY: 0, name: 'left' },
      { offsetX: 25, offsetY: 0, name: 'right' }
    ]

    hemispheres.forEach((hemisphere, hIndex) => {
      // Brain layers for each hemisphere
      const layers = [
        { radius: 70, count: 10, name: 'cortex' },
        { radius: 50, count: 8, name: 'subcortex' },
        { radius: 30, count: 6, name: 'deep' },
        { radius: 15, count: 3, name: 'core' }
      ]

      layers.forEach((layer, layerIndex) => {
        for (let i = 0; i < layer.count; i++) {
          const angle = (i / layer.count) * Math.PI * 2 + (hIndex * Math.PI)
          const x = centerX + hemisphere.offsetX + Math.cos(angle) * layer.radius
          const y = centerY + hemisphere.offsetY + Math.sin(angle) * layer.radius * 0.7
          
          neurons.push({
            id: neurons.length,
            x,
            y,
            connections: [],
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.015 + Math.random() * 0.008
          })
        }
      })
    })

    // Add corpus callosum (connection between hemispheres)
    for (let i = 0; i < 8; i++) {
      const x = centerX + (Math.random() - 0.5) * 20
      const y = centerY + (Math.random() - 0.5) * 15
      
      neurons.push({
        id: neurons.length,
        x,
        y,
        connections: [],
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.01
      })
    }

    // Add some random neurons for organic feel
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 20 + Math.random() * 80
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius * 0.7
      
      neurons.push({
        id: neurons.length,
        x,
        y,
        connections: [],
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.01
      })
    }

    // Create intelligent connections
    neurons.forEach((neuron, i) => {
      neurons.forEach((otherNeuron, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(neuron.x - otherNeuron.x, 2) + 
            Math.pow(neuron.y - otherNeuron.y, 2)
          )
          
          // Connect neurons based on distance and probability
          let connectionProbability = 0
          if (distance < 40) connectionProbability = 0.4
          else if (distance < 60) connectionProbability = 0.2
          else if (distance < 80) connectionProbability = 0.1
          
          if (Math.random() < connectionProbability) {
            neuron.connections.push(j)
          }
        }
      })
    })

    return neurons
  }

  const drawNeuron = (ctx: CanvasRenderingContext2D, neuron: Neuron, time: number) => {
    const pulse = Math.sin(time * neuron.pulseSpeed + neuron.pulsePhase)
    const size = 3 + pulse * 2
    const opacity = 0.6 + pulse * 0.4

    // Determine neuron type based on position (AI vs Human)
    const centerX = ctx.canvas.width / 2
    const isAINeuron = neuron.x > centerX
    const isHumanNeuron = neuron.x < centerX
    const isBridgeNeuron = Math.abs(neuron.x - centerX) < 15

    // Choose colors based on neuron type
    let neuronColor = 'rgba(59, 130, 246, ' // Default blue
    let glowColor = 'rgba(59, 130, 246, '
    
    if (isAINeuron) {
      // AI neurons - electric blue/purple
      neuronColor = 'rgba(147, 51, 234, ' // Purple
      glowColor = 'rgba(147, 51, 234, '
    } else if (isHumanNeuron) {
      // Human neurons - warm blue/cyan
      neuronColor = 'rgba(34, 197, 94, ' // Green
      glowColor = 'rgba(34, 197, 94, '
    } else if (isBridgeNeuron) {
      // Bridge neurons - golden/yellow
      neuronColor = 'rgba(251, 191, 36, ' // Amber
      glowColor = 'rgba(251, 191, 36, '
    }

    // Draw neuron body
    ctx.beginPath()
    ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2)
    ctx.fillStyle = neuronColor + opacity + ')'
    ctx.fill()
    
    // Draw neuron glow
    ctx.beginPath()
    ctx.arc(neuron.x, neuron.y, size + 3, 0, Math.PI * 2)
    ctx.fillStyle = glowColor + (opacity * 0.3) + ')'
    ctx.fill()

    // Draw connections with different colors
    neuron.connections.forEach(connectionIndex => {
      const connectedNeuron = neuronsRef.current[connectionIndex]
      if (connectedNeuron) {
        const connectionPulse = Math.sin(time * 0.05 + neuron.pulsePhase)
        const connectionOpacity = 0.2 + connectionPulse * 0.3
        
        // Determine connection color
        let connectionColor = 'rgba(147, 197, 253, ' // Default light blue
        
        if (isAINeuron && connectedNeuron.x < centerX) {
          // AI to Human connection - purple to green gradient
          connectionColor = 'rgba(168, 85, 247, '
        } else if (isHumanNeuron && connectedNeuron.x > centerX) {
          // Human to AI connection - green to purple gradient
          connectionColor = 'rgba(34, 197, 94, '
        } else if (isBridgeNeuron) {
          // Bridge connections - golden
          connectionColor = 'rgba(251, 191, 36, '
        }
        
        ctx.beginPath()
        ctx.moveTo(neuron.x, neuron.y)
        ctx.lineTo(connectedNeuron.x, connectedNeuron.y)
        ctx.strokeStyle = connectionColor + connectionOpacity + ')'
        ctx.lineWidth = 1
        ctx.stroke()
      }
    })
  }

  // Animation function
  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width, height } = canvas

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    timeRef.current += 0.016 // ~60fps

    // Draw all neurons
    neuronsRef.current.forEach(neuron => {
      drawNeuron(ctx, neuron, timeRef.current)
    })

    // Add some floating particles for extra atmosphere
    for (let i = 0; i < 12; i++) {
      const angle = timeRef.current * 0.008 + i * Math.PI / 6
      const radius = 120 + Math.sin(timeRef.current * 0.015 + i) * 30
      const x = width / 2 + Math.cos(angle) * radius
      const y = height / 2 + Math.sin(angle) * radius * 0.7

      // Different particle colors based on position
      const centerX = width / 2
      let particleColor = 'rgba(147, 197, 253, '

      if (x > centerX + 20) {
        particleColor = 'rgba(168, 85, 247, ' // AI side - purple
      } else if (x < centerX - 20) {
        particleColor = 'rgba(34, 197, 94, ' // Human side - green
      } else {
        particleColor = 'rgba(251, 191, 36, ' // Bridge - amber
      }

      ctx.beginPath()
      ctx.arc(x, y, 1.5, 0, Math.PI * 2)
      ctx.fillStyle = particleColor + (0.4 + Math.sin(timeRef.current * 0.03 + i) * 0.3) + ')'
      ctx.fill()
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      }

      // Reinitialize neurons for new size
      neuronsRef.current = initializeNeurons(rect.width, rect.height)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Start animation
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full bg-transparent opacity-60"
      />
      
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-900/10 to-transparent" />
      
      {/* Rotating brain container */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        {/* Subtle brain outline */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 3 }}
        >
        <div className="w-96 h-80 relative">
          {/* Realistic brain silhouette */}
          <svg
            viewBox="0 0 300 240"
            className="w-full h-full"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          >
            {/* Left hemisphere */}
            <path 
              d="M 80 60 
                 C 50 60, 30 80, 30 120 
                 C 30 140, 40 160, 60 170 
                 C 80 180, 100 185, 120 180 
                 C 140 170, 150 150, 150 130 
                 C 150 110, 130 90, 100 80 
                 C 90 70, 80 60 Z" 
              className="text-purple-400/20"
            />
            
            {/* Right hemisphere */}
            <path 
              d="M 220 60 
                 C 250 60, 270 80, 270 120 
                 C 270 140, 260 160, 240 170 
                 C 220 180, 200 185, 180 180 
                 C 160 170, 150 150, 150 130 
                 C 150 110, 170 90, 200 80 
                 C 210 70, 220 60 Z" 
              className="text-green-400/20"
            />
            
            {/* Corpus callosum */}
            <path 
              d="M 140 100 
                 C 150 95, 160 95, 160 100 
                 C 160 105, 150 105, 140 100 Z" 
              className="text-amber-400/30"
            />
            
            {/* Brain stem */}
            <path 
              d="M 145 180 
                 C 150 190, 150 200, 145 210 
                 C 150 200, 155 190, 155 180 Z" 
              className="text-blue-400/20"
            />
          </svg>
          
          {/* Labels */}
          <div className="absolute top-8 left-8 text-xs text-purple-400/40 font-medium">
            AI
          </div>
          <div className="absolute top-8 right-8 text-xs text-green-400/40 font-medium">
            Human
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-amber-400/40 font-medium">
            Bridge
          </div>
        </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
