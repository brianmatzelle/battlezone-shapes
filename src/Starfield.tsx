import React, { useEffect, useState, forwardRef } from 'react'
import Star from './shapes/Star'

const STAR_FALLING_SPEED = 0.1

interface StarfieldProps {
  className?: string;
}

const Starfield = forwardRef<HTMLDivElement, StarfieldProps>(({ className }, ref) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [starComponents, setStarComponents] = useState<{ x: number; y: number }[]>([])

  useEffect(() => {
    // Initialize dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const canvas = document.getElementById('starfield') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    let animationFrameId: number

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars: {
      x: number
      y: number
      radius: number
      speed: number
      opacity: number
      twinkleSpeed: number
    }[] = []

    function initializeStars() {
      // Reset canvas stars
      stars.length = 0
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.05,
          opacity: Math.random(),
          twinkleSpeed: Math.random() * 0.005,
        })
      }

      // Reset 3D stars
      const newStarComponents = Array.from({ length: 10 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
      }))
      setStarComponents(newStarComponents)
    }

    initializeStars()

    function animate() {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Animate canvas stars
        stars.forEach(star => {
          star.y += star.speed
          if (star.y > canvas.height) {
            star.y = 0
          }

          star.opacity += star.twinkleSpeed
          if (star.opacity > 1 || star.opacity < 0) {
            star.twinkleSpeed = -star.twinkleSpeed
          }

          // Draw star
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
          ctx.fill()
        })

        // Update 3D star positions (if needed)
        setStarComponents(prev =>
          prev.map(star => ({
            ...star,
            y: star.y + STAR_FALLING_SPEED > canvas.height ? 0 : star.y + STAR_FALLING_SPEED,
          }))
        )
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
      initializeStars()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div ref={ref} className={`fixed inset-0 w-full h-full -z-10 ${className || ''}`}>
      <canvas id="starfield" className="absolute inset-0 w-full h-full" />
      {dimensions.width > 0 && starComponents.map((star, index) => (
        <Star
          key={index}
          style={{
            position: 'absolute',
            left: star.x,
            top: star.y,
          }}
          size={60}
          lineWidth={0.5}
          rotationSpeedX={0.002 + index * 0.001}
          rotationSpeedY={0.002 + index * 0.001}
          twinkle={index % 2 === 0}
        />
      ))}
    </div>
  )
})

Starfield.displayName = 'Starfield'

export default Starfield