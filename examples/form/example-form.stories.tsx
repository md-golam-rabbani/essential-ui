import type { Meta, StoryObj } from '@storybook/react';
import { ExampleForm } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ExampleForm> = {
  title: 'Examples/Form',
  component: ExampleForm,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="section-padding-primary container">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ExampleForm>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};
