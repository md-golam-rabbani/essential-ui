import { Meta, StoryObj } from '@storybook/react';
import { DateField } from './DateField';
import { useForm, FormProvider } from 'react-hook-form';

type FormValues = {
  birthDate: Date;
};

const meta: Meta<typeof DateField<FormValues>> = {
  title: 'Components/Form/Fields/DateField',
  component: DateField,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const methods = useForm<FormValues>({
        defaultValues: {
          birthDate: new Date(),
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

type Story = StoryObj<typeof DateField<FormValues>>;

export const Default: Story = {
  args: {
    name: 'birthDate',
    label: 'Birth Date',
  },
};

export const Required: Story = {
  args: {
    name: 'birthDate',
    label: 'Birth Date',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    name: 'birthDate',
    label: 'Disabled Date Field',
    disabled: true,
  },
};
