import type { Meta, StoryObj } from "@storybook/react-vite";

import { List } from "./List";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/List",
  component: List,
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: (
      <>
        <List.Item
          header={{
            left: "headerLeft",
            right: "headerRight",
          }}
        >
          <List.Item.Left>left</List.Item.Left>
          <List.Item.Box
            title="title"
            content="content"
            description="description"
          />
          <List.Item.Right>right</List.Item.Right>
        </List.Item>
      </>
    ),
  },
};
