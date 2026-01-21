import '../src/globals.css';

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  backgrounds: {
    default: 'blueprint',
    values: [
      {
        name: 'blueprint',
        value: '#004a99', // Classic blueprint blue
      },
      {
        name: 'light-blueprint',
        value: '#337ab7', // Lighter blue
      },
    ],
    grid: {
      cellSize: 20,
      opacity: 0.5,
      color: '#ffffff', // White grid lines
    },
  },
};

export const initialGlobals = {
  backgrounds: {
    value: 'light'
  }
};
