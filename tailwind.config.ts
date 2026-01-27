import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
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
        sans: ['var(--font-inter)'],
        mono: ['var(--font-jetbrains)'],
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
        'grid': '50px 50px',
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
}

export default config
