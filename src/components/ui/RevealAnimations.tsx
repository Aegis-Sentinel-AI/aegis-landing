'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface RevealTextProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  once?: boolean
}

const directionVariants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  none: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
}

export function RevealText({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = '',
  once = true
}: RevealTextProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      variants={directionVariants[direction]}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Word-by-word reveal animation
interface RevealWordsProps {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
}

export function RevealWords({ text, className = '', wordClassName = '', delay = 0 }: RevealWordsProps) {
  const words = text.split(' ')
  
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ 
            duration: 0.4, 
            delay: delay + i * 0.05,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className={`inline-block mr-[0.25em] ${wordClassName}`}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Character-by-character reveal
interface RevealCharsProps {
  text: string
  className?: string
  delay?: number
}

export function RevealChars({ text, className = '', delay = 0 }: RevealCharsProps) {
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ 
            duration: 0.3, 
            delay: delay + i * 0.02,
          }}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Staggered children reveal
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  delay?: number
}

export function StaggerContainer({ 
  children, 
  className = '', 
  staggerDelay = 0.1,
  delay = 0 
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
