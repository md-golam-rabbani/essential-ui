import { Meta, StoryObj } from '@storybook/nextjs';
import { CheckboxGroupField } from './CheckboxGroupField';
import { FormProvider, useForm } from 'react-hook-form';

type FormValues = {
  skills: string[];
};

const meta: Meta<typeof CheckboxGroupField<FormValues>> = {
  title: 'Components/Form/Fields/CheckboxGroupField',
  component: CheckboxGroupField,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const methods = useForm<FormValues>({
        defaultValues: {
          skills: ['react'],
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

type Story = StoryObj<typeof CheckboxGroupField<FormValues>>;

const baseOptions = [
  { text: 'React', value: 'react' },
  { text: 'Vue', value: 'vue' },
  { text: 'Angular', value: 'angular' },
];

export const Default: Story = {
  args: {
    name: 'skills',
    label: 'Select Skills',
    options: baseOptions,
  },
};

export const Required: Story = {
  args: {
    name: 'skills',
    label: 'Required Skills',
    options: baseOptions,
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    name: 'skills',
    label: 'Disabled Group',
    options: baseOptions,
    disabled: true,
  },
};

export const RowLayout: Story = {
  args: {
    name: 'skills',
    label: 'Skills in Row Layout',
    options: baseOptions,
    column: false,
  },
};
