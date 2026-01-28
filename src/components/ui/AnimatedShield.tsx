'use client'

import { motion } from 'framer-motion'
import { Shield, Cpu, Lock, Zap, CheckCircle2 } from 'lucide-react'

export default function AnimatedShield() {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0066FF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ADFF2F" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0066FF" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="1"
            strokeDasharray="20 10"
            className="opacity-60"
          />
        </svg>
      </motion.div>

      {/* Middle pulsing ring */}
      <motion.div
        className="absolute inset-8"
        animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <circle
            cx="200"
            cy="200"
            r="160"
            fill="none"
            stroke="#0066FF"
            strokeWidth="2"
            className="opacity-30"
          />
        </svg>
      </motion.div>

      {/* Inner glowing circle */}
      <div className="absolute inset-16 rounded-full bg-gradient-to-br from-primary/20 to-lime/10 backdrop-blur-sm border border-white/10" />

      {/* Center shield */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="relative"
        >
          {/* Shield glow */}
          <div className="absolute inset-0 blur-2xl bg-primary/30 rounded-full scale-150" />
          
          {/* Shield icon */}
          <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 backdrop-blur-md border border-primary/30 flex items-center justify-center shadow-2xl shadow-primary/20">
            <Shield className="w-12 h-12 text-primary" />
            
            {/* Pulse effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-primary"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      {/* Orbiting nodes */}
      {[
        { icon: Cpu, label: 'AI Engine', angle: 0, delay: 0.5 },
        { icon: Lock, label: 'ZK Proof', angle: 120, delay: 0.7 },
        { icon: Zap, label: 'L2 Chain', angle: 240, delay: 0.9 },
      ].map((node, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: node.delay }}
          className="absolute"
          style={{
            top: `${50 + 38 * Math.sin((node.angle * Math.PI) / 180)}%`,
            left: `${50 + 38 * Math.cos((node.angle * Math.PI) / 180)}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            className="glass rounded-xl p-3 border border-white/10 shadow-lg"
          >
            <node.icon className="w-5 h-5 text-lime" />
          </motion.div>
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs text-zinc-400 whitespace-nowrap">
            {node.label}
          </span>
        </motion.div>
      ))}

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0066FF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ADFF2F" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {[0, 120, 240].map((angle, i) => (
          <motion.line
            key={i}
            x1="50%"
            y1="50%"
            x2={`${50 + 38 * Math.cos((angle * Math.PI) / 180)}%`}
            y2={`${50 + 38 * Math.sin((angle * Math.PI) / 180)}%`}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1 + i * 0.2, duration: 0.5 }}
          />
        ))}
      </svg>

      {/* Data flow particles */}
      {[0, 120, 240].map((angle, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full bg-lime shadow-lg shadow-lime/50"
          animate={{
            x: [
              0,
              38 * Math.cos((angle * Math.PI) / 180) * 4,
            ],
            y: [
              0,
              38 * Math.sin((angle * Math.PI) / 180) * 4,
            ],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.7,
            ease: 'easeInOut',
          }}
          style={{
            top: '50%',
            left: '50%',
            marginTop: -4,
            marginLeft: -4,
          }}
        />
      ))}

      {/* Status indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-2 flex items-center gap-2"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-lime"
        />
        <span className="text-xs text-zinc-400">Shield Active</span>
        <CheckCircle2 className="w-3 h-3 text-lime" />
      </motion.div>
    </div>
  )
}
