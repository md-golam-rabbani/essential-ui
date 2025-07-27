import { Meta, StoryObj } from '@storybook/nextjs';
import { TextField } from './TextField';
import { FormProvider, useForm } from 'react-hook-form';
import { X } from 'lucide-react';

type FormValues = {
  name: string;
  email: string;
};

const meta: Meta<typeof TextField<FormValues>> = {
  title: 'Components/Form/Fields/TextField',
  component: TextField,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const methods = useForm<FormValues>({
        defaultValues: {
          name: '',
          email: ''
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

type Story = StoryObj<typeof TextField<FormValues>>;

export const Default: Story = {
  args: {
    name: 'name',
    label: 'Name',
    placeholder: 'Enter your name'
  }
};

export const Required: Story = {
  args: {
    name: 'name',
    label: 'Name',
    required: true
  }
};

export const WithIcon: Story = {
  args: {
    name: 'email',
    label: 'Email',
    type: 'email',
    icon: <X />
  }
};

export const WithAction: Story = {
  args: {
    name: 'email',
    label: 'Clearable Email',
    icon: <X />,
    action: () => alert('Cleared')
  }
};

export const LoadingState: Story = {
  args: {
    name: 'name',
    label: 'Loading Field',
    loading: true
  }
};

export const Disabled: Story = {
  args: {
    name: 'name',
    label: 'Disabled Field',
    disabled: true
  }
};
