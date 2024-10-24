'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// import { CustomImageUploader } from './sub-components/custom-image-uploader';

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

const isValidFileType = (
  fileName: string | undefined,
  fileType: string
): boolean => {
  return fileName ? fileName.endsWith(fileType) : false;
};

const schema = yup.object().shape({
  images: yup
    .array()
    .of(
      yup.object().shape({
        file: yup
          .mixed<File>()
          .required('Image required')
          .test(
            'is-valid-type',
            'Not a valid image type',
            (file) =>
              file instanceof File &&
              isValidFileType(file.name.toLowerCase(), 'image')
          )
          .test(
            'is-valid-size',
            `Max allowed size is ${MAX_IMAGE_SIZE / 1024 / 1024} MB`,
            (file) => file instanceof File && file.size <= MAX_IMAGE_SIZE
          ),
      })
    )
    .required('You must upload at least one file')
    .min(1, 'You must upload at least one file'),
});

export type FormValues = {
  images: { file: File }[];
};

const multiple = true; // Toggle for single or multiple uploads

export default function Page() {
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form Submitted:', data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <h1 className="mb-4 text-2xl font-semibold">
        {multiple ? 'Multiple' : 'Single'} File Upload
      </h1>

      {/* CustomImageUploader Component */}
      {/* <CustomImageUploader
        name="images" // Align with schema
        control={control}
        maxFiles={multiple ? 10 : 1}
        maxSizeInMb={2}
        multiple={multiple}
        className="rounded-md border border-gray-300 p-4"
      /> */}

      {errors.images && (
        <p className="mt-2 text-sm text-red-500">
          {Array.isArray(errors.images)
            ? errors.images.map((error, index) => (
                <span key={index}>{error.file?.message}</span>
              ))
            : errors.images.message}
        </p>
      )}

      <button
        type="submit"
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}
