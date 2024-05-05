'use client';

import { useFormState } from 'react-dom';
import { handleSubmit } from './actions';
import { ExampleFormElements } from './element';
import { IExampleFormState } from './interface';

const initialExampleFormStateValue: IExampleFormState = {
  success: true,
  message: '',
};

/**
 * `ExampleForm` is a React functional component that renders a form with an email input field and a submit button.
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
export const ExampleForm = () => {
  const [formState, formAction] = useFormState(
    handleSubmit,
    initialExampleFormStateValue
  );

  return (
    <div className="bg-gray-300 py-10 lg:py-20">
      <div className="container">
        <div className="mx-auto max-w-[450px] rounded-lg bg-white p-6 shadow-lg lg:p-10">
          <form className="grid gap-4" action={formAction}>
            <ExampleFormElements formState={formState} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExampleForm;
