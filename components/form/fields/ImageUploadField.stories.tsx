import { Meta, StoryObj } from '@storybook/nextjs';
import { ImageUploadField } from './ImageUploadField';
import { useForm, FormProvider } from 'react-hook-form';

type FormValues = {
  avatar: string | undefined;
};

// TODO: Need to check this component and storybook
const meta: Meta<typeof ImageUploadField<FormValues>> = {
  title: 'Components/Form/Fields/ImageUploadField',
  component: ImageUploadField,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const methods = useForm<FormValues>({
        defaultValues: {
          avatar: undefined,
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

type Story = StoryObj<typeof ImageUploadField<FormValues>>;

export const Default: Story = {
  args: {
    name: 'avatar',
    label: 'Upload Avatar',
  },
};

export const Required: Story = {
  args: {
    name: 'avatar',
    label: 'Upload Avatar',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    name: 'avatar',
    label: 'Upload Avatar',
    disabled: true,
  },
};

export const WithCustomUploadHandler: Story = {
  args: {
    name: 'avatar',
    label: 'Upload Avatar',
    onUpload: (file: File) => {
      // simulate returning a dummy URL
      return URL.createObjectURL(file);
    },
  },
};
