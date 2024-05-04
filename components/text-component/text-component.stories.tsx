import type { Meta, StoryObj } from '@storybook/react';
import { TextComponent } from '.';
import { textComponentProps } from './story-props';

const meta: Meta<typeof TextComponent> = {
  title: 'Components/Text Component',
  component: TextComponent,
  tags: ['autodocs'],
  args: textComponentProps,
  argTypes: {
    buttons: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="section-padding-primary container">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TextComponent>;

export const Primary: Story = {};
