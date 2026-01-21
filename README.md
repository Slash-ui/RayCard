# RayCard

Interactive glassmorphism card component with cursor-tracking lighting effects.

![RayCard Demo](https://raw.githubusercontent.com/yourusername/ray-card/main/demo.gif)

## Features

- **Glassmorphism design** - Beautiful frosted glass effect
- **Cursor tracking** - Dynamic lighting that follows your mouse
- **Dark/Light mode** - Works on any background
- **Responsive** - Looks great on all screen sizes
- **Zero dependencies** - Pure React with no external runtime deps

## Installation

```bash
# npm
npm install ray-card

# yarn
yarn add ray-card

# pnpm
pnpm add ray-card
```

## Usage

```tsx
import { RayCard } from "ray-card";
import "ray-card/dist/styles.css";

function App() {
  return (
    <RayCard>
      <h2>Hello World</h2>
      <p>Move your cursor to see the lighting effect!</p>
    </RayCard>
  );
}
```

## Props

| Prop        | Type        | Default | Description             |
| ----------- | ----------- | ------- | ----------------------- |
| `children`  | `ReactNode` | -       | Content inside the card |
| `className` | `string`    | `''`    | Additional CSS classes  |

## Development

### Prerequisites

- Node.js 18+
- Yarn or npm

### Running Storybook

Storybook is the primary way to develop and preview the component:

```bash
# Install dependencies
yarn install

# Start Storybook (opens at http://localhost:6006)
yarn storybook
```

### Available Scripts

| Script                 | Description                  |
| ---------------------- | ---------------------------- |
| `yarn storybook`       | Start Storybook dev server   |
| `yarn build-storybook` | Build static Storybook       |
| `yarn typecheck`       | Run TypeScript type checking |
| `yarn lint`            | Run ESLint                   |

### Project Structure

```
ray-card/
├── src/
│   ├── components/
│   │   ├── ray-card.tsx          # Main component
│   │   ├── ray-card.stories.tsx  # Storybook stories
│   │   └── luminous-box.tsx      # Related component
│   ├── lib/
│   │   └── utils.ts              # Utility functions
│   └── globals.css               # Global styles
├── .storybook/                   # Storybook configuration
└── package.json
```

## Customization

### Custom Styling

Pass a `className` prop to customize the appearance:

```tsx
<RayCard className="min-w-[400px] p-8">
  <p>Custom sized card</p>
</RayCard>
```

### CSS Variables

Override these CSS variables to customize the component:

```css
.ray-card {
  --mouse-x: 50%;
  --mouse-y: 50%;
  --light-opacity: 0;
  --shadow-x: 0px;
  --shadow-y: 0px;
  --shadow-blur: 20px;
  --shadow-spread: 0px;
  --shadow-opacity: 0;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT © [Your Name]

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) first.
