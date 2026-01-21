# Release Notes

## v1.0.0 (January 2026)

First stable release of RayCard - an interactive glassmorphism card component with cursor-tracking lighting effects.

### Features

**Core Component**
- `RayCard` component with TypeScript support
- Cursor-tracking border glow effect
- Dynamic inner luminosity
- Responsive shadow system that reacts to light position
- 32px activation distance for smooth engagement
- Dampened effects when cursor is inside the card

**Visual Effects**
- Glassmorphism styling with `backdrop-filter: blur(15px)`
- Warm golden-to-primary gradient border glow
- Soft white inner light with `mix-blend-mode: soft-light`
- Smooth 0.3s ease-out transitions on all effects
- Dynamic shadow blur (10-40px) and spread (1-16px)

**Developer Experience**
- Simple API - just wrap your content
- `className` prop for custom styling
- Full TypeScript types exported
- CSS custom properties for easy theming
- Works with Tailwind CSS out of the box

**Tooling**
- Storybook integration with multiple story variants
- Next.js 15 setup with Turbopack
- Dark mode support

### Usage

```tsx
import { RayCard } from '@/components/ray-card';

<RayCard>
  <h1>Your content here</h1>
</RayCard>
```

### CSS Custom Properties

The component exposes these CSS variables for advanced customization:

| Variable | Description |
|----------|-------------|
| `--mouse-x` | Cursor X position relative to card |
| `--mouse-y` | Cursor Y position relative to card |
| `--shadow-x` | Horizontal shadow offset |
| `--shadow-y` | Vertical shadow offset |
| `--shadow-blur` | Shadow blur radius |
| `--shadow-spread` | Shadow spread radius |
| `--light-opacity` | Controls glow visibility (0 or 1) |

### Browser Support

- Chrome 76+
- Firefox 103+
- Safari 15.4+
- Edge 79+

Requires support for `backdrop-filter` and `mask-composite`.

### Known Limitations

- Effects are mouse-only (no touch support yet)
- No throttling on mousemove events (may impact performance on slower devices)
- Requires the accompanying CSS in `globals.css`

### What's Next

Ideas for future releases:
- Touch/mobile support
- Configurable activation distance
- Color customization via props
- Standalone CSS file option
- Performance optimizations

---

Questions? Issues? [Open a GitHub issue](https://github.com/Slash-ui/RayCard/issues)
