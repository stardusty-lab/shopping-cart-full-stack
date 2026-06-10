import type { Meta, StoryObj } from "@storybook/react-vite";

import { ImgBox } from "./ImgBox";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/ImgBox",
  component: ImgBox,
} satisfies Meta<typeof ImgBox>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    img: "",
  },
};
