import type { Meta, StoryObj } from "@storybook/react-vite";

import { NumberStepper } from "./NumberStepper";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/NumberStepper",
  component: NumberStepper,
} satisfies Meta<typeof NumberStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    value: 2,
    onIncrement: () => {},
    onDecrement: () => {},
  },
};
