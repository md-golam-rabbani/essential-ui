'use client';

import { Typography } from '@/components/typography';
import * as z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputControl } from '@/components/inputs/input-control';
import { CustomButton } from '@/components/button';
import { SelectControl } from '@/components/inputs/select-control';
import { cn } from '@/lib/shadcn/utils';
import { InputHeading } from '@/components/inputs/common/input-heading';
import { RadioControl } from '@/components/inputs/radio-control';
import { ConditionalTextDisplay } from '@/components/inputs/common/conditional-text-display';
import { CheckboxControl } from '@/components/inputs/checkbox-control';

// Styles
const inlineWrapperClasses = cn('flex flex-wrap gap-x-4 gap-y-2');
const inputItemParentClasses = cn('flex flex-row items-center gap-2 text-base');
const inputGroupParentClasses = cn('grid gap-1');

export const formSchema = z.object({
  fname: z
    .string()
    .min(3, { message: 'First name must be at least 3 characters long' }),
  lname: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid Gmail address' }),
  phone: z.string().regex(/^\+?[0-9]\d{1,11}$/, {
    message: 'Please enter a valid phone number',
  }),
  password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message:
      'Password must be at least 8 characters long, contain at least one digit, one lowercase letter, and one uppercase letter',
  }),
  jobLocation: z.enum(['remote', 'in-office']),
  jobRole: z.string({ message: 'Please select your job role' }),
  languages: z
    .string({ message: 'Please select at least one language' })
    .array(),
  interest: z.boolean(),
  terms: z.boolean(),
});

type IFormSchema = z.infer<typeof formSchema>;

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
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<IFormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'all',
  });

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
          <form
            className="grid gap-4"
            onSubmit={handleSubmit((d) => console.log(d))}
          >
            {/* First name  */}
            <Controller
              name="fname"
              control={control}
              render={({ field, fieldState: { isTouched, error } }) => (
                <InputControl
                  name={field.name}
                  value={field.value || ''}
                  onInputChange={field.onChange}
                  onBlur={field.onBlur}
                  label="First Name"
                  type="text"
                  placeholder="Enter your first name"
                  helperText="Min. 3 characters"
                  error={isTouched ? error?.message : undefined}
                  showErrorMsg={!!error?.message}
                  disabled={isSubmitting}
                  autoComplete="on"
                />
              )}
            />

            {/* Last name  */}
            <Controller
              name="lname"
              control={control}
              render={({ field, fieldState: { isTouched, error } }) => (
                <InputControl
                  name={field.name}
                  value={field.value || ''}
                  onInputChange={field.onChange}
                  onBlur={field.onBlur}
                  label="Last Name"
                  type="text"
                  placeholder="Enter your last name"
                  error={isTouched ? error?.message : undefined}
                  showErrorMsg={!!error?.message}
                  disabled={isSubmitting}
                  autoComplete="on"
                />
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { isTouched, error } }) => (
                <InputControl
                  name={field.name}
                  value={field.value || ''}
                  onInputChange={field.onChange}
                  onBlur={field.onBlur}
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  helperText="Please enter a valid email"
                  error={isTouched ? error?.message : undefined}
                  showErrorMsg={!!error?.message}
                  disabled={isSubmitting}
                  autoComplete="on"
                />
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { isTouched, error } }) => (
                <InputControl
                  name={field.name}
                  value={field.value || ''}
                  onInputChange={field.onChange}
                  onBlur={field.onBlur}
                  label="Password"
                  type="password"
                  placeholder="Enter a Password"
                  helperText="Min. 8 characters, contain at least one digit, one lowercase letter, and one uppercase letter"
                  error={isTouched ? error?.message : undefined}
                  showErrorMsg={!!error?.message}
                  disabled={isSubmitting}
                  autoComplete="on"
                />
              )}
            />

            {/* Password */}
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState: { isTouched, error } }) => (
                <InputControl
                  name={field.name}
                  value={field.value || ''}
                  onInputChange={field.onChange}
                  onBlur={field.onBlur}
                  label="Phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  helperText="Enter a valid phone number"
                  error={isTouched ? error?.message : undefined}
                  showErrorMsg={!!error?.message}
                  disabled={isSubmitting}
                  autoComplete="on"
                />
              )}
            />

            {/* Job role */}
            <Controller
              name="jobRole"
              control={control}
              render={({ field, fieldState: { isTouched, error } }) => (
                <SelectControl
                  name={field.name}
                  value={field.value || ''}
                  onSelectChange={field.onChange}
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
                  onBlur={field.onBlur}
                  label="Job Role"
                  helperText="Please select a job role"
                  error={isTouched ? error?.message : undefined}
                  showErrorMsg={!!error?.message}
                  disabled={isSubmitting}
                />
              )}
            />

            {/* Job location */}
            <Controller
              name="jobLocation"
              control={control}
              render={({ field, fieldState: { isTouched, error } }) => (
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
                        name={field.name}
                        value="remote"
                        checked={field.value === 'remote'}
                        disabled={isSubmitting}
                        onRadioChange={field.onChange}
                      />
                      Remote
                    </label>
                    <label className={inputItemParentClasses}>
                      <RadioControl
                        name={field.name}
                        value="in-office"
                        checked={field.value === 'in-office'}
                        disabled={isSubmitting}
                        onRadioChange={field.onChange}
                      />
                      In-office
                    </label>
                  </div>

                  {(isTouched || error?.message) && (
                    <ConditionalTextDisplay
                      error={error?.message}
                      showErrorMsg
                    />
                  )}
                </fieldset>
              )}
            />

            {/* Languages */}
            <Controller
              name="languages"
              control={control}
              render={({ field, fieldState: { isTouched, error } }) => (
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
                        name={field.name}
                        value="javascript"
                        disabled={isSubmitting}
                        onCheckboxChange={field.onChange}
                        error={!!error?.message}
                        checked={
                          field &&
                          field.value &&
                          field.value.length > 0 &&
                          field.value.includes('javascript')
                            ? true
                            : false
                        }
                      />
                      Javascript
                    </label>

                    <label className={inputItemParentClasses}>
                      <CheckboxControl
                        name={field.name}
                        value="python"
                        disabled={isSubmitting}
                        onCheckboxChange={field.onChange}
                        error={!!error?.message}
                        checked={
                          field &&
                          field.value &&
                          field.value.length > 0 &&
                          field.value.includes('python')
                            ? true
                            : false
                        }
                      />
                      Python
                    </label>
                  </div>

                  {(isTouched || error?.message) && (
                    <ConditionalTextDisplay
                      error={error?.message}
                      showErrorMsg
                    />
                  )}
                </fieldset>
              )}
            />

            {/* Interested  */}
            {/* <div className={inputGroupParentClasses}>
              <label className={inputItemParentClasses}>
                <SwitchControl
                  name="interested"
                  onSwitchChange={(value) => {
                    setFormFields((prevValue) => ({
                      ...prevValue,
                      interest: value,
                    }));
                  }}
                  checked={formFields.interest}
                  error={!!formSubmitState?.error?.interest}
                  disabled={pending}
                  required={false}
                />
                Are you interested?
              </label>
              {formSubmitState?.error?.interest && (
                <ConditionalTextDisplay
                  error={formSubmitState?.error?.interest}
                  showErrorMsg={true}
                  disabled={pending}
                />
              )}
            </div> */}

            {/* Terms   */}
            {/* <fieldset className={inputGroupParentClasses}>
              <div className={inlineWrapperClasses}>
                <label className={inputItemParentClasses}>
                  <CheckboxControl
                    name="terms"
                    value={formFields.terms ? 'true' : 'false'}
                    onCheckboxChange={handleFormElementChange}
                    disabled={pending}
                    error={!!formSubmitState?.error?.terms}
                    checked={formFields.terms ? true : false}
                  />
                  <span>I agree to the terms & condition</span>
                </label>
              </div>

              {formSubmitState?.error?.terms && (
                <ConditionalTextDisplay
                  error={formSubmitState?.error?.terms}
                  showErrorMsg
                />
              )}
            </fieldset> */}

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
                type="action"
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
