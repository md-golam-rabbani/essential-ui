'use client';

import { Typography } from '@/components/typography';
import * as z from 'zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomButton } from '@/components/button';
import { InputControl } from '@/components/inputs/input-control';
import { SelectControl } from '@/components/inputs/select-control';
import { InputHeading } from '@/components/inputs/common/input-heading';
import { RadioControl } from '@/components/inputs/radio-control';
import { ConditionalTextDisplay } from '@/components/inputs/common/conditional-text-display';
import { CheckboxControl } from '@/components/inputs/checkbox-control';
import { SwitchControl } from '@/components/inputs/switch-control';
import { cn } from '@/lib/shadcn/utils';
import { TextareaControl } from '@/components/inputs/textarea-control';

// Styles
const inlineWrapperClasses = cn('flex flex-wrap gap-x-4 gap-y-2');
const inputItemParentClasses = cn('flex flex-row items-center gap-2 text-base');
const inputGroupParentClasses = cn('grid gap-1');

export const formSchema = z.object({
  fname: z
    .string({
      required_error: 'First name is required',
    })
    .min(3, { message: 'First name must be at least 3 characters long' }),
  lname: z.string().optional(),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Please enter a valid gmail address' }),
  phone: z
    .string({ required_error: 'Phone is required' })
    .regex(/^\+?[0-9]\d{1,11}$/, {
      message: 'Please enter a valid phone number',
    }),
  password: z
    .string({ required_error: 'Password is required' })
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
      message:
        'Password must be at least 8 characters long, contain at least one digit, one lowercase letter, and one uppercase letter',
    }),
  confirmPassword: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message:
      'Password must be at least 8 characters long, contain at least one digit, one lowercase letter, and one uppercase letter',
  }),
  jobLocation: z.enum(['remote', 'in-office'], {
    required_error: 'Please select your preferred job location',
  }),
  jobRole: z.string({
    required_error: 'Job role is required',
    invalid_type_error: 'Please select your job role',
  }),
  languages: z
    .array(z.string())
    .min(1, { message: 'Please select at least one language' }),
  interest: z.boolean().refine((value) => value === true, {
    message: 'Please enable your interest',
  }),
  terms: z.boolean().refine((value) => value === true, {
    message: 'You must agree the terms and condition',
  }),
});

type IFormFields = z.infer<typeof formSchema>;

/**
 * TODO:
 * 1. Form field validation with errors message showcase properly with testing.
 * 2. Form field onBlur prop
 * 3. Form submission
 * 4. Toast message
 */

/**
 * `Form` is a React functional component that renders a form with an email input field and a submit button.
 * It leverages the `useFormState` and `useFormStatus` hooks from `react-dom`
 * for form state management, including handling form submission and displaying
 * form status messages.
 *
 * @ResourceLink https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#pending-states
 * This component is designed to work with Next.js server actions and
 * mutations, handling pending states effectively.
 *
 * @see {@link handleSubmit} - The function used to handle form submission.
 * @see {@link IInitialFormStatusState} - The interface defining the initial
 * form status state.
 */
export default function Form() {
  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, errors },
  } = useForm<IFormFields>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    defaultValues: {
      languages: [],
      interest: false,
      terms: false,
    },
  });

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('data', data);

    reset();
  };

  console.log(errors, 'errors');

  return (
    <div className="bg-yellow-100 py-7 lg:py-10">
      <div className="container">
        <div className="mx-auto max-w-[450px] rounded-lg bg-white p-6 shadow-lg lg:p-10">
          <Typography
            size="h3"
            tagName="h2"
            className="mb-3 text-center font-bold"
          >
            Form submission with zod
          </Typography>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            {/* First name */}
            <Controller
              name="fname"
              control={control}
              render={({ field: { name, value, onChange, onBlur } }) => (
                <TextareaControl
                  name={name}
                  value={value || ''}
                  onTextareaChange={onChange}
                  onBlur={onBlur}
                  label="First Name"
                  // type="text"
                  placeholder="Enter your first name"
                  helperText="Min. 3 characters"
                  error={errors.fname?.message || undefined}
                  showErrorMsg={!!errors.fname?.message}
                  disabled={isSubmitting}
                  // autoComplete="on"
                />
              )}
            />

            {/* Last name  */}
            <Controller
              name="lname"
              control={control}
              render={({ field: { name, value, onChange, onBlur } }) => (
                <InputControl
                  name={name}
                  value={value || ''}
                  onInputChange={onChange}
                  onBlur={onBlur}
                  label="Last Name"
                  type="text"
                  placeholder="Enter your last name"
                  error={errors.lname?.message || undefined}
                  showErrorMsg={!!errors.lname?.message}
                  disabled={isSubmitting}
                  autoComplete="on"
                />
              )}
            />

            {/* Email  */}
            <Controller
              name="email"
              control={control}
              render={({ field: { name, value, onChange, onBlur } }) => (
                <InputControl
                  name={name}
                  value={value || ''}
                  onInputChange={onChange}
                  onBlur={onBlur}
                  label="Email"
                  type="text"
                  placeholder="Enter your email"
                  helperText="Please enter a valid email"
                  error={errors.email?.message || undefined}
                  showErrorMsg={!!errors.email?.message}
                  disabled={isSubmitting}
                  autoComplete="on"
                />
              )}
            />
            {/* TODO: Add confirm password field and need to add password match validation check  */}
            <Controller
              name="password"
              control={control}
              render={({ field: { name, value, onChange, onBlur } }) => (
                <InputControl
                  name={name}
                  value={value || ''}
                  onInputChange={onChange}
                  onBlur={onBlur}
                  label="Password"
                  type="password"
                  placeholder="Enter a Password"
                  helperText="Min. 8 characters, contain at least one digit, one lowercase letter, and one uppercase letter"
                  error={errors.password?.message || undefined}
                  showErrorMsg={!!errors.password?.message}
                  disabled={isSubmitting}
                  autoComplete="on"
                />
              )}
            />

            {/* Phone  */}
            <Controller
              name="phone"
              control={control}
              render={({ field: { name, value, onChange, onBlur } }) => (
                <InputControl
                  name={name}
                  value={value || ''}
                  onInputChange={onChange}
                  onBlur={onBlur}
                  label="Phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  helperText="Enter a valid phone number"
                  error={errors.phone?.message || undefined}
                  showErrorMsg={!!errors.phone?.message}
                  disabled={isSubmitting}
                  autoComplete="on"
                />
              )}
            />

            {/* TODO: Validation message doesn't show correctly.  */}
            {/* Job role  */}
            <Controller
              name="jobRole"
              control={control}
              render={({ field: { name, value, onChange, onBlur } }) => (
                <SelectControl
                  name={name}
                  value={value || ''}
                  onSelectChange={onChange}
                  onBlur={onBlur}
                  items={[
                    {
                      label: 'Select job Role',
                      value: '',
                    },
                    {
                      label: 'Frontend',
                      value: 'frontend',
                    },
                    {
                      label: 'Backend',
                      value: 'backend',
                    },
                    {
                      label: 'FullStack',
                      value: 'fullstack',
                    },
                  ]}
                  label="Job Role"
                  helperText="Please select a job role"
                  error={errors.jobRole?.message || undefined}
                  showErrorMsg={!!errors.jobRole?.message}
                  disabled={isSubmitting}
                />
              )}
            />

            {/* Job location  */}
            <Controller
              name="jobLocation"
              control={control}
              render={({ field: { name, value, onChange } }) => (
                <fieldset className={inputGroupParentClasses}>
                  <InputHeading
                    label={'Preferred Job Location'}
                    required={true}
                    disabled={isSubmitting}
                    tagName="legend"
                  />

                  <div className={inlineWrapperClasses}>
                    <label className={inputItemParentClasses}>
                      <RadioControl
                        name={name}
                        value="remote"
                        checked={value === 'remote'}
                        disabled={isSubmitting}
                        onRadioChange={onChange}
                      />
                      Remote
                    </label>
                    <label className={inputItemParentClasses}>
                      <RadioControl
                        name={name}
                        value="in-office"
                        checked={value === 'in-office'}
                        disabled={isSubmitting}
                        onRadioChange={onChange}
                      />
                      In-office
                    </label>
                  </div>

                  {errors.jobLocation?.message && (
                    <ConditionalTextDisplay
                      error={errors.jobLocation.message}
                      showErrorMsg
                    />
                  )}
                </fieldset>
              )}
            />

            {/* Languages  */}
            <Controller
              name="languages"
              control={control}
              render={({ field: { name, value, onChange } }) => (
                <fieldset className={inputGroupParentClasses}>
                  <InputHeading
                    label={'Languages'}
                    required={true}
                    disabled={isSubmitting}
                    tagName="legend"
                  />

                  <div className={inlineWrapperClasses}>
                    <label className={inputItemParentClasses}>
                      <CheckboxControl
                        name={name}
                        value="javascript"
                        checked={value.includes('javascript') ? true : false}
                        onCheckboxChange={(e) => {
                          const isChecked = e.target.checked;
                          let updatedLanguages;
                          if (isChecked) {
                            updatedLanguages = [...value, e.target.value]; // Add language if checked
                          } else {
                            updatedLanguages = value.filter(
                              (lang) => lang !== e.target.value
                            ); // Remove language if unchecked
                          }
                          onChange(updatedLanguages); // Update form value
                        }}
                        disabled={isSubmitting}
                        error={!!errors.languages?.message}
                      />
                      Javascript
                    </label>

                    <label className={inputItemParentClasses}>
                      <CheckboxControl
                        name={name}
                        value="python"
                        checked={value.includes('python') ? true : false}
                        onCheckboxChange={(e) => {
                          const isChecked = e.target.checked;
                          let updatedLanguages;
                          if (isChecked) {
                            updatedLanguages = [...value, e.target.value]; // Add language if checked
                          } else {
                            updatedLanguages = value.filter(
                              (lang) => lang !== e.target.value
                            ); // Remove language if unchecked
                          }
                          onChange(updatedLanguages); // Update form value
                        }}
                        disabled={isSubmitting}
                        error={!!errors?.languages?.message}
                      />
                      Python
                    </label>
                  </div>

                  {errors.languages?.message && (
                    <ConditionalTextDisplay
                      error={errors.languages.message}
                      showErrorMsg
                    />
                  )}
                </fieldset>
              )}
            />

            {/* Interest  */}
            <Controller
              name="interest"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <div className={inputGroupParentClasses}>
                  <label className={inputItemParentClasses}>
                    <SwitchControl
                      name={name}
                      checked={value}
                      onSwitchChange={onChange}
                      error={!!errors?.interest?.message}
                      disabled={isSubmitting}
                      required={false}
                    />
                    Are you interested?
                  </label>

                  {/* TODO: Need to fix error message showcase issue  */}
                  {errors.interest?.message && (
                    <ConditionalTextDisplay
                      error={errors.interest.message}
                      showErrorMsg={true}
                      disabled={isSubmitting}
                    />
                  )}
                </div>
              )}
            />

            {/* Terms  */}
            <Controller
              name="terms"
              control={control}
              render={({ field: { name, value, onChange } }) => (
                <fieldset className={inputGroupParentClasses}>
                  <div className={inlineWrapperClasses}>
                    <label className={inputItemParentClasses}>
                      <CheckboxControl
                        name={name}
                        value={value ? 'true' : 'false'}
                        onCheckboxChange={onChange}
                        disabled={isSubmitting}
                        error={!!errors?.terms?.message}
                        checked={value ? true : false}
                      />
                      <span>I agree to the terms & condition</span>
                    </label>
                  </div>

                  {errors?.terms?.message && (
                    <ConditionalTextDisplay
                      error={errors.terms.message}
                      showErrorMsg
                    />
                  )}
                </fieldset>
              )}
            />

            {/* Buttons  */}
            <div className="flex flex-wrap items-center gap-2">
              <CustomButton
                colorScheme="primary"
                loading={isSubmitting}
                disabled={false}
                type="submit"
              >
                Submit
              </CustomButton>
              <CustomButton
                loading={isSubmitting}
                disabled={false}
                colorScheme="primary"
                className="!bg-red-500"
                type="reset"
                onButtonClick={() => {
                  reset();
                }}
              >
                Reset
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
