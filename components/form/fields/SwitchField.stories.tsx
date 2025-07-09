import { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { SwitchField } from './SwitchField';

type FormValues = {
  isEnabled: boolean;
};

const meta: Meta<typeof SwitchField<FormValues>> = {
  title: 'Components/Form/Fields/SwitchField',
  component: SwitchField,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const methods = useForm<FormValues>({
        defaultValues: {
          isEnabled: false,
        },
      });

      return (
        <div className="section-padding-primary">
          <div className="container">
            <div className="mx-auto max-w-xs">
              <FormProvider {...methods}>
                <form>{Story()}</form>
              </FormProvider>
            </div>
          </div>
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof SwitchField<FormValues>>;

export const Default: Story = {
  args: {
    name: 'isEnabled',
    label: 'Enable Feature',
  },
};

export const Required: Story = {
  args: {
    name: 'isEnabled',
    label: 'Accept Terms',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    name: 'isEnabled',
    label: 'Disabled Switch',
    disabled: true,
  },
};

export const ReversedLayout: Story = {
  args: {
    name: 'isEnabled',
    label: 'Reversed Label',
    reverse: true,
  },
};

export const ColumnLayout: Story = {
  args: {
    name: 'isEnabled',
    label: 'Column Layout',
    column: true,
  },
};

export const LongGapLayout: Story = {
  args: {
    name: 'isEnabled',
    label: 'Long Gap',
    longGap: true,
  },
};
