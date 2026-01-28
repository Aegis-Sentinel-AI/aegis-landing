import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Swiss Design 8px Grid System
    spacing: {
      '0': '0',
      'px': '1px',
      '0.5': '4px',    // 0.5 × 8
      '1': '8px',      // 1 × 8
      '1.5': '12px',   // 1.5 × 8
      '2': '16px',     // 2 × 8
      '2.5': '20px',   // 2.5 × 8
      '3': '24px',     // 3 × 8
      '3.5': '28px',   // 3.5 × 8
      '4': '32px',     // 4 × 8
      '5': '40px',     // 5 × 8
      '6': '48px',     // 6 × 8
      '7': '56px',     // 7 × 8
      '8': '64px',     // 8 × 8
      '9': '72px',     // 9 × 8
      '10': '80px',    // 10 × 8
      '11': '88px',    // 11 × 8
      '12': '96px',    // 12 × 8
      '14': '112px',   // 14 × 8
      '16': '128px',   // 16 × 8
      '20': '160px',   // 20 × 8
      '24': '192px',   // 24 × 8
      '28': '224px',   // 28 × 8
      '32': '256px',   // 32 × 8
      '36': '288px',   // 36 × 8
      '40': '320px',   // 40 × 8
      '44': '352px',   // 44 × 8
      '48': '384px',   // 48 × 8
      '52': '416px',   // 52 × 8
      '56': '448px',   // 56 × 8
      '60': '480px',   // 60 × 8
      '64': '512px',   // 64 × 8
      '72': '576px',   // 72 × 8
      '80': '640px',   // 80 × 8
      '96': '768px',   // 96 × 8
    },
    extend: {
      colors: {
        // Dark Mode Enterprise Palette
        background: '#121212',
        'background-elevated': '#1a1a1a',
        'background-card': '#1e1e1e',
        border: '#2a2a2a',
        'border-light': '#3a3a3a',
        // Electric Cobalt Blue - Primary accent
        primary: {
          DEFAULT: '#0066FF',
          hover: '#3385FF',
          dark: '#0052CC',
          light: '#4D9FFF',
        },
        // Cyber-Lime - Success states
        success: {
          DEFAULT: '#ADFF2F',
          dark: '#8FCC26',
          light: '#C4FF66',
        },
        accent: '#0066FF',
        lime: '#ADFF2F',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'Consolas', 'Monaco', 'monospace'],
      },
      fontSize: {
        // Swiss typography scale (1.25 ratio)
        'xs': ['12px', { lineHeight: '16px', letterSpacing: '0.02em' }],
        'sm': ['14px', { lineHeight: '20px', letterSpacing: '0.01em' }],
        'base': ['16px', { lineHeight: '24px', letterSpacing: '0' }],
        'lg': ['18px', { lineHeight: '28px', letterSpacing: '-0.01em' }],
        'xl': ['20px', { lineHeight: '28px', letterSpacing: '-0.01em' }],
        '2xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.02em' }],
        '3xl': ['30px', { lineHeight: '40px', letterSpacing: '-0.02em' }],
        '4xl': ['36px', { lineHeight: '44px', letterSpacing: '-0.02em' }],
        '5xl': ['48px', { lineHeight: '56px', letterSpacing: '-0.03em' }],
        '6xl': ['60px', { lineHeight: '68px', letterSpacing: '-0.03em' }],
        '7xl': ['72px', { lineHeight: '80px', letterSpacing: '-0.04em' }],
        '8xl': ['96px', { lineHeight: '104px', letterSpacing: '-0.04em' }],
        // Technical monospace sizes
        'mono-xs': ['11px', { lineHeight: '16px', letterSpacing: '0.05em' }],
        'mono-sm': ['13px', { lineHeight: '20px', letterSpacing: '0.03em' }],
        'mono-base': ['14px', { lineHeight: '24px', letterSpacing: '0.02em' }],
        'mono-lg': ['16px', { lineHeight: '28px', letterSpacing: '0.01em' }],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 102, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 102, 255, 0.6)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #0066FF 0%, #0052CC 50%, #003D99 100%)',
        'gradient-lime': 'linear-gradient(135deg, #ADFF2F 0%, #8FCC26 100%)',
        'gradient-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 102, 255, 0.25), transparent)',
        'grid-pattern': 'linear-gradient(rgba(0, 102, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 102, 255, 0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '48px 48px', // 6 × 8 grid alignment
      },
      backdropBlur: {
        'glass': '20px',
      },
      borderRadius: {
        'sm': '4px',    // 0.5 × 8
        'DEFAULT': '8px', // 1 × 8
        'md': '8px',    // 1 × 8
        'lg': '12px',   // 1.5 × 8
        'xl': '16px',   // 2 × 8
        '2xl': '24px',  // 3 × 8
        '3xl': '32px',  // 4 × 8
      },
    },
  },
  plugins: [],
}

export default config
