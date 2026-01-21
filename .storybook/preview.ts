import '../src/globals.css';

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  backgrounds: {
    options: {
      dark: { name: 'dark', value: '#0a0a0a' },
      light: { name: 'light', value: '#ffffff' }
    }
  },
};

export const initialGlobals = {
  backgrounds: {
    value: 'dark'
  }
};
