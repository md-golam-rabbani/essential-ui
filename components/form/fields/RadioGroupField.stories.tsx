import { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { RadioGroupField } from './RadioGroupField';

type FormValues = {
  questionType: string;
};

const meta: Meta<typeof RadioGroupField<FormValues>> = {
  title: 'Components/Form/Fields/RadioGroupField',
  component: RadioGroupField,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const methods = useForm<FormValues>({
        defaultValues: {
          questionType: '',
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

type Story = StoryObj<typeof RadioGroupField<FormValues>>;

const baseOptions = [
  { value: 'mcq', text: 'Multiple Choice' },
  { value: 'written', text: 'Written' },
  { value: 'boolean', text: 'True/False' },
];

export const Default: Story = {
  args: {
    name: 'questionType',
    label: 'Question Type',
    options: baseOptions,
  },
};

export const ColumnGroup: Story = {
  args: {
    name: 'questionType',
    label: 'Choose Question Type',
    options: baseOptions,
    columnGroup: true,
  },
};

export const RowGroup: Story = {
  args: {
    name: 'questionType',
    label: 'Question Format',
    options: baseOptions,
    rowGroup: true,
  },
};

export const ReverseLayout: Story = {
  args: {
    name: 'questionType',
    label: 'Question Style',
    options: baseOptions,
    reverse: true,
  },
};

export const Required: Story = {
  args: {
    name: 'questionType',
    label: 'Required Type',
    options: baseOptions,
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    name: 'questionType',
    label: 'Question Type',
    options: baseOptions,
    disabled: true,
  },
};
