import type { Meta, StoryObj } from "@storybook/react";
import { RayCard } from "./ray-card";

const meta: Meta<typeof RayCard> = {
  title: "Components/RayCard",
  component: RayCard,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "gradient",
      values: [
        {
          name: "gradient",
          value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
        { name: "dark", value: "#1a1a2e" },
        { name: "light", value: "#f0f0f0" },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Content to render inside the card",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
    glowColor: {
      control: "color",
      description: "Custom glow color",
      table: {
        defaultValue: { summary: "rgba(255, 255, 255, 0.15)" },
      },
    },
    glowIntensity: {
      control: { type: "range", min: 0, max: 1, step: 0.05 },
      description: "Glow intensity/opacity (0-1)",
      table: {
        defaultValue: { summary: "1" },
      },
    },
    glowSpread: {
      control: { type: "range", min: 50, max: 600, step: 25 },
      description: "Size of the light spread in pixels",
      table: {
        defaultValue: { summary: "300" },
      },
    },
    borderRadius: {
      control: "text",
      description: "Border radius of the card",
      table: {
        defaultValue: { summary: "16px" },
      },
    },
    proximity: {
      control: { type: "range", min: 0, max: 100, step: 5 },
      description: "Mouse proximity detection distance in pixels",
      table: {
        defaultValue: { summary: "32" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disable the lighting effect entirely",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    glowMode: {
      control: { type: "radio" },
      options: ["both", "card", "border"],
      description:
        "Controls which parts glow (both, card content, or just border)",
      table: {
        defaultValue: { summary: "both" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RayCard>;

export const Default: Story = {
  args: {
    children: (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">RayCard</h2>
        <p className="text-white/80">
          Move your cursor around to see the lighting effect
        </p>
      </div>
    ),

    glowIntensity: 0.3,
    glowSpread: 550,
    proximity: 15,
    glowMode: "both"
  },
};

export const CustomGlowColor: Story = {
  args: {
    glowColor: "rgba(255, 100, 100, 0.3)",
    children: (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Red Glow</h2>
        <p className="text-white/80">Custom red glow color</p>
      </div>
    ),
  },
};

export const CyanGlow: Story = {
  args: {
    glowColor: "rgba(0, 255, 255, 0.25)",
    children: (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Cyan Glow</h2>
        <p className="text-white/80">Cyberpunk-style cyan effect</p>
      </div>
    ),
  },
};

export const HighIntensity: Story = {
  args: {
    glowIntensity: 1,
    glowColor: "rgba(255, 255, 255, 0.4)",
    children: (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">High Intensity</h2>
        <p className="text-white/80">Brighter and more visible glow</p>
      </div>
    ),
  },
};

export const SubtleGlow: Story = {
  args: {
    glowIntensity: 0.3,
    children: (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Subtle Glow</h2>
        <p className="text-white/80">Low intensity for a subtle effect</p>
      </div>
    ),
  },
};

export const SmallSpread: Story = {
  args: {
    glowSpread: 150,
    children: (
      <div style={{ textAlign: "center" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          Small Spread
        </h2>
        <p>Tight 150px light spread</p>
      </div>
    ),
  },
};

export const BorderOnly: Story = {
  args: {
    glowMode: "border",
    children: (
      <div style={{ textAlign: "center" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          Border Only
        </h2>
        <p>Glow applied only to the border</p>
      </div>
    ),
  },
};

export const LargeSpread: Story = {
  args: {
    glowSpread: 500,
    children: (
      <div style={{ textAlign: "center" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          Large Spread
        </h2>
        <p>Wide 500px light spread</p>
      </div>
    ),
  },
};

export const LargeProximity: Story = {
  args: {
    proximity: 80,
    children: (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Large Proximity</h2>
        <p className="text-white/80">Effect triggers from 80px away</p>
      </div>
    ),
  },
};

export const RoundedCorners: Story = {
  args: {
    borderRadius: "32px",
    children: (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Extra Rounded</h2>
        <p className="text-white/80">32px border radius</p>
      </div>
    ),
  },
};

export const SharpCorners: Story = {
  args: {
    borderRadius: "4px",
    children: (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Sharp Corners</h2>
        <p className="text-white/80">Minimal 4px border radius</p>
      </div>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Disabled</h2>
        <p className="text-white/80">No lighting effect - static card</p>
      </div>
    ),
  },
};

export const FullyCustomized: Story = {
  args: {
    glowColor: "rgba(255, 200, 50, 0.3)",
    glowIntensity: 0.8,
    borderRadius: "24px",
    proximity: 60,
    children: (
      <div className="text-center max-w-sm">
        <h2 className="text-2xl font-bold text-white mb-2">Fully Customized</h2>
        <p className="text-white/80">
          Golden glow, 80% intensity, 24px radius, 60px proximity
        </p>
      </div>
    ),
  },
};

export const WithContent: Story = {
  args: {
    children: (
      <div className="max-w-sm">
        <h3 className="text-xl font-semibold text-white mb-3">
          Interactive Card
        </h3>
        <p className="text-white/80 text-sm leading-relaxed">
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
    glowColor: "rgba(100, 200, 255, 0.2)",
    children: (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Ready to get started?</h2>
        <p className="text-white/80 max-w-md">
          Join thousands of developers building beautiful interfaces with
          RayCard.
        </p>
        <button className="px-6 py-2 bg-white text-gray-900 rounded-lg font-medium hover:opacity-90 transition-opacity">
          Get Started
        </button>
      </div>
    ),
  },
};
