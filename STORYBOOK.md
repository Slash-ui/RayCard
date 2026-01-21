# LumenPaper Storybook

This project now includes Storybook for component development and documentation. The `LuminousBox` component has been renamed to `LumenPaper` and is available as a Storybook component.

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Storybook
```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006`

### Build Storybook
```bash
npm run build-storybook
```

## Component Overview

### LumenPaper
A luminous paper component with interactive mouse effects and glassmorphism styling.

**Features:**
- Interactive mouse tracking with glow effects
- Glassmorphism design with backdrop blur
- Responsive shadow effects
- Dark mode support
- Customizable content and styling

**Props:**
- `children`: React.ReactNode - Content to display inside the paper component
- `className?`: string - Additional CSS classes to apply

## Available Stories

1. **Default** - Basic usage with simple text
2. **WithText** - Example with formatted text content
3. **WithForm** - Example with form elements
4. **WithCard** - Example with product card layout
5. **WithList** - Example with todo list
6. **CustomStyling** - Example with custom dimensions
7. **DarkMode** - Example showing dark mode adaptation

## Usage in Your App

```tsx
import { LumenPaper } from '@/components/lumen-paper';

function MyComponent() {
  return (
    <LumenPaper>
      <h1>Your content here</h1>
      <p>Any React content can go inside</p>
    </LumenPaper>
  );
}
```

## Development

The component uses:
- React hooks for mouse tracking
- CSS custom properties for dynamic styling
- Tailwind CSS for base styling
- Glassmorphism effects with backdrop-filter

## File Structure

```
src/
├── components/
│   ├── lumen-paper.tsx          # Main component
│   └── lumen-paper.stories.tsx  # Storybook stories
└── app/
    ├── globals.css              # Component styles
    └── page.tsx                 # Example usage
```

## Styling

The component uses CSS custom properties for dynamic effects:
- `--mouse-x` and `--mouse-y`: Mouse position
- `--light-opacity`: Glow effect opacity
- `--shadow-*`: Dynamic shadow properties

All styles are defined in `src/app/globals.css` under the `.lumen-paper` class.
