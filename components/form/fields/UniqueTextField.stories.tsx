import { Meta, StoryObj } from '@storybook/nextjs';
import { useForm, FormProvider } from 'react-hook-form';
import { UniqueTextField } from './UniqueTextField';

type FormValues = {
  username: string;
};

const meta: Meta<typeof UniqueTextField<FormValues>> = {
  title: 'Components/Form/Fields/UniqueTextField',
  component: UniqueTextField,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const methods = useForm<FormValues>({
        defaultValues: {
          username: ''
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

type Story = StoryObj<typeof UniqueTextField<FormValues>>;

// Simulated check function
const fakeCheckUsername = async (value: string) => {
  await new Promise((resolve) => setTimeout(resolve, 700)); // simulate API delay
  return value !== 'takenuser'; // return false for 'takenuser', true otherwise
};

export const Default: Story = {
  args: {
    name: 'username',
    label: 'Username',
    placeholder: 'Enter your username',
    checkFunction: fakeCheckUsername
  }
};

export const Required: Story = {
  args: {
    name: 'username',
    label: 'Username',
    placeholder: 'Required username',
    required: true,
    checkFunction: fakeCheckUsername
  }
};

export const EmailType: Story = {
  args: {
    name: 'username',
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    checkFunction: fakeCheckUsername
  }
};

export const CustomDebounce: Story = {
  args: {
    name: 'username',
    label: 'Slow Debounce (1500ms)',
    placeholder: 'Wait a bit...',
    checkFunction: fakeCheckUsername,
    debounceMs: 1500
  }
};
