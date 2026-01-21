import type { Meta, StoryObj } from "@storybook/react";
import FerdowsiPoetryPage from "./ferdowsi-page";

const meta: Meta<typeof FerdowsiPoetryPage> = {
  title: "Examples/Ferdowsi Poetry Page",
  component: FerdowsiPoetryPage,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof FerdowsiPoetryPage>;

export const Default: Story = {};
