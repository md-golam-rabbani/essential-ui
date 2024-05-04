import { ChangeEvent, useEffect, useState } from 'react';
import { IFormState, IFormStatusState } from './interface';
import { useFormStatus } from 'react-dom';
import { InputControl } from '@/components/inputs/input-control';
import { SelectControl } from '@/components/inputs/select-control';
import { InputHeading } from '@/components/inputs/common/input-heading';
import { RadioControl } from '@/components/inputs/radio-control';
import { CheckboxControl } from '@/components/inputs/checkbox-control';
import { ConditionalTextDisplay } from '@/components/inputs/common/conditional-text-display';
import { SwitchControl } from '@/components/inputs/switch-control';
import { Typography } from '@/components/typography';
import { CustomButton } from '@/components/button';
import { cn } from '@/lib/shadcn/utils';
import { getCheckBoxValues } from './utils';

// Styles
const inlineWrapperClasses = cn('flex flex-wrap gap-x-4 gap-y-2');
const inputItemParentClasses = cn('flex flex-row items-center gap-2 text-base');
const inputGroupParentClasses = cn('grid gap-1');

const initialFormValue: IFormState = {
  fname: '',
  lname: '',
  email: '',
  phone: '',
  password: '',
  jobLocation: '',
  languages: [],
  interest: false,
  jobRole: '',
};

export const ExampleFormElements = ({ state }: { state: IFormStatusState }) => {
  const [formState, setFormState] = useState<IFormState>(initialFormValue);

  const [formSubmitState, setFormSubmitState] =
    useState<IFormStatusState | null>(state);
  /**
   * This useEffect hook is used to synchronize the formSubmitState with the
   * provided state prop. It ensures that the formSubmitState is always
   * up-to-date with the latest state changes. This is particularly important
   * for resetting the form state, as the useFormState hook from react-dom does
   * not provide an option to reset the state directly. When a user clicks the
   * reset button, this hook ensures that all state values, including form
   * success or error states, are cleared.
   */
  useEffect(() => {
    setFormSubmitState(state);
  }, [state]);

  const { pending } = useFormStatus();

  const handleFormElementChange = (event: ChangeEvent<HTMLInputElement>) => {
    const element = event.target;

    setFormState((prevValue) => {
      let newStateValue: IFormState = { ...prevValue };

      /**
       * Updates the form state based on the element's type and value.
       * If the element is not a checkbox, it directly assigns the
       * element's value to the new state. If the element is a checkbox,
       * it calls `getCheckBoxValues` to update the state with the
       * checkbox's value.
       */
      if (element.type !== 'checkbox') {
        newStateValue = { ...newStateValue, [element.name]: element.value };
      } else {
        newStateValue = {
          ...newStateValue,
          [element.name]: getCheckBoxValues(
            prevValue[element.name as keyof IFormState] as string[],
            element.value,
            element.checked
          ),
        };
      }

      return newStateValue;
    });
  };

  return (
    <>
      {/* Default variant  */}
      {/* First Name  */}
      <InputControl
        label="First Name"
        name="fname"
        type="text"
        placeholder="Enter your first name"
        helperText="Min. 3 characters"
        required={true}
        value={formState.fname}
        error={formSubmitState?.error?.fname}
        showErrorMsg={!!formSubmitState?.error?.fname}
        disabled={pending}
        autoComplete="on"
        onInputChange={handleFormElementChange}
      />

      {/* Last Name  */}
      <InputControl
        label="Last Name"
        name="lname"
        type="text"
        placeholder="Enter your last name"
        value={formState.lname}
        error={formSubmitState?.error?.lname}
        showErrorMsg={!!formSubmitState?.error?.lname}
        disabled={pending}
        autoComplete="on"
        onInputChange={handleFormElementChange}
      />

      {/* Email  */}
      <InputControl
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        helperText="Please enter a valid email"
        required={true}
        value={formState.email}
        error={formSubmitState?.error?.email}
        showErrorMsg={!!formSubmitState?.error?.email}
        disabled={pending}
        autoComplete="on"
        onInputChange={handleFormElementChange}
      />

      {/* Password  */}
      <InputControl
        label="Password"
        name="password"
        type="password"
        placeholder="Enter a Password"
        helperText="Min. 8 characters, contain at least one digit, one lowercase letter, and one uppercase letter"
        required={true}
        value={formState.password}
        error={formSubmitState?.error?.password}
        showErrorMsg={!!formSubmitState?.error?.password}
        disabled={pending}
        autoComplete="on"
        onInputChange={handleFormElementChange}
      />

      {/* Phone number  */}
      <InputControl
        label="Phone"
        name="phone"
        type="tel"
        placeholder="Enter your phone number"
        helperText="Enter a valid phone number"
        required={true}
        value={formState.phone}
        error={formSubmitState?.error?.phone}
        showErrorMsg={!!formSubmitState?.error?.phone}
        disabled={pending}
        autoComplete="on"
        onInputChange={handleFormElementChange}
      />

      {/* Job role  */}
      <SelectControl
        label="Job Role"
        name="jobRole"
        required={true}
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
        onSelectChange={(value) => {
          setFormState((prevValue) => ({ ...prevValue, jobRole: value }));
        }}
        value={formState.jobRole}
        error={formSubmitState?.error?.jobRole}
        showErrorMsg={!!formSubmitState?.error?.jobRole}
        disabled={pending}
        helperText="Please select a job role"
      />

      {/* Gender  */}
      <fieldset className={inputGroupParentClasses}>
        <InputHeading
          label={'Preferred Job Location'}
          required={true}
          disabled={pending}
          tagName="legend"
        />

        <div className={inlineWrapperClasses}>
          <label className={inputItemParentClasses}>
            <RadioControl
              name="jobLocation"
              value="remote"
              checked={formState.jobLocation === 'remote'}
              error={!!formSubmitState?.error?.jobLocation}
              disabled={pending}
              onRadioChange={handleFormElementChange}
            />
            Remote
          </label>
          <label className={inputItemParentClasses}>
            <RadioControl
              name="jobLocation"
              value="in-office"
              checked={formState.jobLocation === 'in-office'}
              error={!!formSubmitState?.error?.jobLocation}
              disabled={pending}
              onRadioChange={handleFormElementChange}
            />
            In-office
          </label>
        </div>

        {formSubmitState?.error?.jobLocation && (
          <ConditionalTextDisplay
            error={formSubmitState?.error?.jobLocation}
            showErrorMsg
          />
        )}
      </fieldset>

      {/* Languages  */}
      <fieldset className={inputGroupParentClasses}>
        <InputHeading
          label={'Languages'}
          required={true}
          disabled={pending}
          tagName="legend"
        />

        <div className={inlineWrapperClasses}>
          <label className={inputItemParentClasses}>
            <CheckboxControl
              name="languages"
              value="javascript"
              disabled={pending}
              onCheckboxChange={handleFormElementChange}
              error={!!formSubmitState?.error?.languages}
              checked={formState.languages.includes('javascript')}
            />
            Javascript
          </label>

          <label className={inputItemParentClasses}>
            <CheckboxControl
              name="languages"
              value="python"
              disabled={pending}
              onCheckboxChange={handleFormElementChange}
              error={!!formSubmitState?.error?.languages}
              checked={formState.languages.includes('python')}
            />
            Python
          </label>
        </div>

        {formSubmitState?.error?.languages && (
          <ConditionalTextDisplay
            error={formSubmitState?.error?.languages}
            showErrorMsg
          />
        )}
      </fieldset>

      <div className={inputGroupParentClasses}>
        <label className={inputItemParentClasses}>
          <SwitchControl
            name="interested"
            onSwitchChange={(value) => {
              setFormState((prevValue) => ({ ...prevValue, interest: value }));
            }}
            checked={formState.interest}
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
      </div>
      {/* Buttons  */}
      <div className="flex flex-wrap items-center gap-2">
        <CustomButton
          colorScheme="primary"
          loading={false}
          disabled={false}
          type="submit"
        >
          Submit
        </CustomButton>
        <CustomButton
          disabled={false}
          colorScheme="primary"
          className="!bg-danger"
          type="action"
          onButtonClick={() => {
            setFormState(initialFormValue);
            setFormSubmitState(null);
          }}
        >
          Reset
        </CustomButton>
      </div>

      {/* Render the form submit success and error message */}
      {!pending &&
        // Form submit success
        (formSubmitState?.success ||
          // Form submit failed due to internal server error
          (!formSubmitState?.success && !formSubmitState?.error)) && (
          <Typography
            size="c1"
            className={cn(
              formSubmitState?.success ? 'text-success' : 'text-danger'
            )}
          >
            {formSubmitState?.message}
          </Typography>
        )}
    </>
  );
};
