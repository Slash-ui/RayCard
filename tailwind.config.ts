import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        foreground: 'var(--foreground)',
        background: 'var(--background)',
        primary: {
          DEFAULT: '#667eea',
          foreground: '#ffffff',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
