import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { RayCard } from './ray-card';

const meta: Meta<typeof RayCard> = {
  title: 'Components/RayCard',
  component: RayCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'gradient',
      values: [
        { name: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
        { name: 'dark', value: '#1a1a2e' },
        { name: 'light', value: '#f0f0f0' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
    },
    children: {
      control: 'text',
      description: 'Content to render inside the card',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RayCard>;

export const Default: Story = {
  args: {
    children: (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">RayCard</h2>
        <p className="text-foreground/80">
          Move your cursor around to see the lighting effect
        </p>
      </div>
    ),
  },
};

export const WithContent: Story = {
  args: {
    children: (
      <div className="max-w-sm">
        <h3 className="text-xl font-semibold text-foreground mb-3">
          Interactive Card
        </h3>
        <p className="text-foreground/80 text-sm leading-relaxed">
          RayCard creates a beautiful glassmorphism container with dynamic
          mouse-tracking lighting effects. The glow follows your cursor and
          creates realistic shadows based on the light source position.
        </p>
      </div>
    ),
  },
};

export const CallToAction: Story = {
  args: {
    children: (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-foreground">
          Ready to get started?
        </h2>
        <p className="text-foreground/80 max-w-md">
          Join thousands of developers building beautiful interfaces with RayCard.
        </p>
        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
          Get Started
        </button>
      </div>
    ),
  },
};

export const CustomStyling: Story = {
  args: {
    className: 'min-w-[300px] min-h-[200px]',
    children: (
      <div className="flex flex-col items-center justify-center h-full">
        <span className="text-4xl mb-2">✨</span>
        <p className="text-foreground font-medium">Custom dimensions</p>
      </div>
    ),
  },
};

export const DarkContent: Story = {
  args: {
    children: (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Dark Mode Ready</h2>
        <p className="text-white/80">
          Works beautifully on dark backgrounds
        </p>
      </div>
    ),
  },
  globals: {
    backgrounds: {
      value: "dark"
    }
  },
};
