import '../src/globals.css';

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  backgrounds: {
    default: 'dark',
    values: [
      { name: 'dark', value: '#0a0a0a' },
      { name: 'light', value: '#ffffff' },
    ],
  },
};
