import { Meta, StoryObj } from '@storybook/nextjs';
import { DateTimeField } from './DateTimeField';
import { useForm, FormProvider } from 'react-hook-form';

type FormValues = {
  appointment: Date;
};

const meta: Meta<typeof DateTimeField<FormValues>> = {
  title: 'Components/Form/Fields/DateTimeField',
  component: DateTimeField,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const methods = useForm<FormValues>({
        defaultValues: {
          appointment: new Date(),
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

type Story = StoryObj<typeof DateTimeField<FormValues>>;

export const Default: Story = {
  args: {
    name: 'appointment',
    label: 'Appointment Date & Time',
  },
};

export const Required: Story = {
  args: {
    name: 'appointment',
    label: 'Appointment Date & Time',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    name: 'appointment',
    label: 'Disabled Appointment',
    disabled: true,
  },
};
