import { Meta, StoryObj } from '@storybook/nextjs';
import { useForm, FormProvider } from 'react-hook-form';
import { SelectField } from './SelectField';

type FormValues = {
  publishedStatus: string;
};

const meta: Meta<typeof SelectField<FormValues>> = {
  title: 'Components/Form/Fields/SelectField',
  component: SelectField,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const methods = useForm<FormValues>({
        defaultValues: {
          publishedStatus: '',
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

type Story = StoryObj<typeof SelectField<FormValues>>;

const options = [
  { value: 'draft', text: 'Draft' },
  { value: 'published', text: 'Published' },
  { value: 'archived', text: 'Archived' },
];

export const Default: Story = {
  args: {
    name: 'publishedStatus',
    label: 'Published Status',
    placeholder: 'Select status',
    options,
  },
};

export const Required: Story = {
  args: {
    name: 'publishedStatus',
    label: 'Published Status',
    placeholder: 'Select status',
    options,
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    name: 'publishedStatus',
    label: 'Published Status',
    placeholder: 'Select status',
    options,
    disabled: true,
  },
};

export const WithCustomClasses: Story = {
  args: {
    name: 'publishedStatus',
    label: 'Status (Styled)',
    options,
    inputClassName: 'border-red-500 text-red-700',
    className: 'bg-yellow-50 p-4 rounded-lg',
  },
};
