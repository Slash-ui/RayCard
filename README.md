# RayCard

A React component that creates glassmorphism cards with interactive, cursor-tracking lighting effects. The glow follows your mouse and casts dynamic shadows - like having a tiny flashlight in your browser.

![RayCard Demo](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18+-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6.svg)

## What it does

RayCard wraps your content in a frosted-glass container that responds to cursor movement:

- **Border glow** - A warm golden light traces the edges where your cursor hovers
- **Inner luminosity** - Soft white light fills the card interior
- **Dynamic shadows** - Shadows shift based on the "light source" position
- **Smooth transitions** - Everything animates with 0.3s ease-out

## Quick Start

```tsx
import { RayCard } from '@/components/ray-card';

function App() {
  return (
    <RayCard>
      <h1>Hello World</h1>
      <p>Move your cursor around!</p>
    </RayCard>
  );
}
```

That's it. No props required.

## Installation

This is a Next.js project. Clone it and install dependencies:

```bash
git clone git@github.com:Slash-ui/RayCard.git
cd RayCard
npm install
npm run dev
```

The dev server runs on `http://localhost:9002`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Content inside the card |
| `className` | `string` | `undefined` | Additional Tailwind classes |

### Adding custom styles

```tsx
<RayCard className="min-w-[400px] p-12">
  {/* your content */}
</RayCard>
```

The `className` prop merges with the base styles, so you can override padding, dimensions, or add your own utilities.

## How the lighting works

The component tracks mouse position and updates CSS custom properties in real-time:

```
--mouse-x, --mouse-y    → cursor position relative to card
--shadow-x, --shadow-y  → shadow offset (opposite to light)
--shadow-blur           → 10-40px based on distance from center
--shadow-spread         → 1-16px based on distance from center
--light-opacity         → 0 or 1 (activates within 32px of card)
```

The effect activates when your cursor is within 32px of the card edges. Inside the card, shadow movement is dampened by 50% for a subtler effect.

## Styling

RayCard uses these CSS classes (defined in `globals.css`):

- `.ray-card` - Base container with glassmorphism
- `.ray-card::before` - Border glow effect
- `.ray-card::after` - Background layer
- `.ray-card-glow` - Inner light effect

### Customizing the glow color

Edit the gradient in `globals.css`:

```css
.ray-card::before {
  background: radial-gradient(
    400px circle at var(--mouse-x) var(--mouse-y),
    hsl(45 100% 70% / 0.9),    /* change this for different glow color */
    hsl(var(--primary)),
    transparent 20%
  );
}
```

### Dark mode

RayCard works in dark mode out of the box. The component respects your Tailwind dark mode setup.

## Project Structure

```
src/
├── components/
│   └── ray-card.tsx       # The main component
├── app/
│   ├── globals.css        # Component styles + Tailwind config
│   └── page.tsx           # Demo page
```

## Scripts

```bash
npm run dev          # Start dev server (port 9002)
npm run build        # Production build
npm run storybook    # Component playground (port 6006)
```

## Storybook

We have Storybook set up for playing with the component:

```bash
npm run storybook
```

Check out different variants: Default, WithContent, CallToAction, CustomStyling, and DarkContent.

## Browser Support

Works in all modern browsers that support:
- `backdrop-filter`
- CSS custom properties
- `mask-composite`

Basically, anything released after 2020.

## Tech Stack

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Storybook 8

## Contributing

Found a bug? Want to add a feature? PRs welcome.

1. Fork the repo
2. Create a branch (`git checkout -b cool-feature`)
3. Make your changes
4. Push and open a PR

## License

MIT - do whatever you want with it.

---

Built by [@shariati](https://github.com/shariati)
