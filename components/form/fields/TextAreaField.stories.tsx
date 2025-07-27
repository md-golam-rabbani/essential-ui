import { Meta, StoryObj } from '@storybook/nextjs';
import { useForm, FormProvider } from 'react-hook-form';
import { TextAreaField } from './TextAreaField';
import { X } from 'lucide-react';

type FormValues = {
  summary: string;
};

const meta: Meta<typeof TextAreaField<FormValues>> = {
  title: 'Components/Form/Fields/TextAreaField',
  component: TextAreaField,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const methods = useForm<FormValues>({
        defaultValues: {
          summary: ''
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

type Story = StoryObj<typeof TextAreaField<FormValues>>;

export const Default: Story = {
  args: {
    name: 'summary',
    label: 'Summary',
    placeholder: 'Write your summary here...'
  }
};

export const Required: Story = {
  args: {
    name: 'summary',
    label: 'Summary',
    placeholder: 'This field is required',
    required: true
  }
};

export const WithIcon: Story = {
  args: {
    name: 'summary',
    label: 'Summary',
    Icon: <X />
  }
};

export const WithAction: Story = {
  args: {
    name: 'summary',
    label: 'Summary',
    action: () => alert('Clear or reset action')
  }
};

export const Disabled: Story = {
  args: {
    name: 'summary',
    label: 'Disabled Field',
    disabled: true
  }
};

export const Resizable: Story = {
  args: {
    name: 'summary',
    label: 'Resizable Textarea',
    resizable: true
  }
};

export const Loading: Story = {
  args: {
    name: 'summary',
    label: 'Loading...',
    loading: true
  }
};
