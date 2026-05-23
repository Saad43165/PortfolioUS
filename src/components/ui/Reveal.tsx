'use client'

import { useEffect, useRef, useState, CSSProperties } from 'react'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  style?: CSSProperties
  direction?: 'up' | 'left' | 'right' | 'none'
}

export default function Reveal({ children, delay = 0, className = '', style, direction = 'up' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const from = {
    up:    'translateY(44px)',
    left:  'translateX(-44px)',
    right: 'translateX(44px)',
    none:  'none',
  }[direction]

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(0,0)' : from,
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
