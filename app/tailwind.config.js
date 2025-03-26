module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#06B6D4',
          dark: '#0891b2',
          light: '#67e8f9',
        },
        secondary: {
          DEFAULT: '#8b5cf6',
          dark: '#7c3aed',
          light: '#a78bfa',
        },
        success: {
          DEFAULT: '#4CAF50',
          dark: '#3b8a3f',
          light: '#7bc67e',
        },
        danger: {
          DEFAULT: '#f44336',
          dark: '#d32f2f',
          light: '#e57373',
        },
        warning: {
          DEFAULT: '#ff9800',
          dark: '#f57c00',
          light: '#ffb74d',
        },
        info: {
          DEFAULT: '#2196F3',
          dark: '#1976d2',
          light: '#64b5f6',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}; 