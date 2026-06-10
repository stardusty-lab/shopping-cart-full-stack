import type { Meta, StoryObj } from "@storybook/react-vite";

import { DataInfo } from "./DataInfo";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/DataInfo",
  component: DataInfo,
} satisfies Meta<typeof DataInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: (
      <>
        <DataInfo.Item title="title" content="content" />
      </>
    ),
  },
};
