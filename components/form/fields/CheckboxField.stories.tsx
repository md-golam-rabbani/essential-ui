import { Meta, StoryObj } from '@storybook/nextjs';
import { CheckboxField } from './CheckboxField';
import { FormProvider, useForm } from 'react-hook-form';

type FormValues = {
  isActive: boolean;
  isSubscribed: boolean;
};

const meta: Meta<typeof CheckboxField<FormValues>> = {
  title: 'Components/Form/Fields/CheckboxField',
  component: CheckboxField,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const methods = useForm<FormValues>({
        defaultValues: {
          isActive: false,
          isSubscribed: true
        }
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
    }
  ]
};

export default meta;

type Story = StoryObj<typeof CheckboxField<FormValues>>;

export const Default: Story = {
  args: {
    name: 'isActive',
    label: 'Is Active'
  }
};

export const Required: Story = {
  args: {
    name: 'isActive',
    label: 'Required Field',
    required: true
  }
};

export const Disabled: Story = {
  args: {
    name: 'isActive',
    label: 'Disabled Field',
    disabled: true
  }
};

export const ColumnLayout: Story = {
  args: {
    name: 'isSubscribed',
    label: 'Subscribe to Newsletter',
    column: true
  }
};

export const ReverseOrder: Story = {
  args: {
    name: 'isSubscribed',
    label: 'Reverse Label Position',
    reverse: true
  }
};

export const LongGap: Story = {
  args: {
    name: 'isSubscribed',
    label: 'Long Gap Layout',
    longGap: true
  }
};
