import { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { PasswordField } from './PasswordField';

type FormValues = {
  password: string;
};

const meta: Meta<typeof PasswordField<FormValues>> = {
  title: 'Components/Form/Fields/PasswordField',
  component: PasswordField,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const methods = useForm<FormValues>({
        defaultValues: {
          password: '',
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

type Story = StoryObj<typeof PasswordField<FormValues>>;

export const Default: Story = {
  args: {
    name: 'password',
    label: 'Password',
  },
};

export const WithStrength: Story = {
  args: {
    name: 'password',
    label: 'Password',
    showStrength: true,
  },
};

export const WithMessage: Story = {
  args: {
    name: 'password',
    label: 'Password',
    showMessage: true,
  },
};

export const FullFeatures: Story = {
  args: {
    name: 'password',
    label: 'Password',
    required: true,
    showStrength: true,
    showMessage: true,
  },
};

export const Loading: Story = {
  args: {
    name: 'password',
    label: 'Password',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    name: 'password',
    label: 'Password',
    disabled: true,
  },
};
