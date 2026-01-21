import '../src/css/globals.css';
import '../src/css/neomorphism.css';
import neomorphismTheme from './neomorphism-theme';

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  docs: {
    theme: neomorphismTheme,
  },
  backgrounds: {
    default: 'neomorphism',
    values: [
      {
        name: 'neomorphism',
        value: '#e8ecef',
      },
      {
        name: 'neomorphism-dark',
        value: '#2d3748',
      },
      {
        name: 'neomorphism-warm',
        value: '#f5f0e8',
      },
    ],
  },
};

export const initialGlobals = {
  backgrounds: {
    value: 'neomorphism',
  },
};
