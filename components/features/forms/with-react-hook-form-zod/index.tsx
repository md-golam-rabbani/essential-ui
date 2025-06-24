'use client';

import { Typography } from '@/components/typography';
import { CustomButton } from '@/components/custom-button';
import { formSchema, IFormFields, initialValues } from './interface';
import { toast } from 'sonner';
import * as z from 'zod';
import { TextField } from '@/components/form/fields/TextField';
import { sleep } from '@/lib/utils/sleep';
import { GenericForm, GenericFormRef } from '@/components/form/GenericForm';
import { useRef } from 'react';

/**
 * TODO:
 * 1. Missing helper text
 * 2. Expose the isSubmitting state
 */

/**
 * `Form` is a React functional component that renders a form with various input fields and controls.
 * It utilizes the `useForm` hook from `react-hook-form` for form state management,
 * including handling form submission and displaying form validation errors.
 *
 * @remarks
 * This component integrates with Zod schema validation for form validation.
 *
 * @see {@link IFormFields} - The interface defining the structure of form fields.
 */
export default function FormExample() {
  const formRef = useRef<GenericFormRef<IFormFields>>(null);

  const isSubmitting = formRef.current?.formState.isSubmitting;

  return (
    <div className="bg-yellow-100 py-7 lg:py-10">
      <div className="container">
        <div className="mx-auto max-w-[450px] rounded-lg bg-white p-6 shadow-lg lg:p-10">
          <Typography
            size="h3"
            tagName="h2"
            className="mb-3 text-center font-bold"
          >
            Form submission with generic form
          </Typography>

          <GenericForm
            schema={formSchema}
            initialValues={initialValues}
            onSubmit={async (data) => {
              try {
                // Validate form data using Zod schema
                const result = formSchema.safeParse(data);

                // If validation succeeds, proceed with form submission
                if (result.success) {
                  await sleep({ ms: 4000 }); // Simulate a network request delay
                  console.log(result.data);
                }
              } catch (error) {
                // If validation fails, handle Zod validation error
                if (error instanceof z.ZodError) {
                  // Extract error messages from Zod error
                  const validationErrors = error.errors.map(
                    (err) => err.message
                  );
                  // Display the first validation error to the user
                  toast.error(validationErrors[0]);
                } else {
                  // Handle non-validation errors
                  console.error(error);
                  toast.error('An error occurred. Please try again.');
                }
              }
            }}
            ref={formRef}
          >
            <div className="space-y-4">
              {/* First name */}
              <TextField<IFormFields>
                name="fname"
                label="First Name"
                type="text"
                placeholder="Enter your first name"
                required
              />

              {/* Last name  */}
              <TextField<IFormFields>
                name="lname"
                label="Last Name"
                type="text"
                placeholder="Enter your last name"
              />

              {/* Email  */}
              <TextField<IFormFields>
                name="email"
                label="Email"
                type="text"
                placeholder="Enter your email"
                required
              />

              {/* Buttons  */}
              <div className="flex flex-wrap items-center gap-2">
                <CustomButton
                  colorScheme="primary"
                  variant="fill"
                  loading={isSubmitting}
                  disabled={!!isSubmitting}
                  type="submit"
                >
                  Submit
                </CustomButton>

                <CustomButton
                  loading={isSubmitting}
                  disabled={!!isSubmitting}
                  colorScheme="primary"
                  variant="fill"
                  className="!bg-red-500"
                  type="reset"
                  onButtonClick={() => {
                    formRef.current?.reset();
                  }}
                >
                  Reset
                </CustomButton>
              </div>
            </div>
          </GenericForm>
        </div>
      </div>
    </div>
  );
}
