'use client';

import { useFormState } from 'react-dom';
import { handleSubmit } from './actions';
import { ExampleFormElements } from './element';
import { IFormStatusState } from './interface';

const initialFormStatusState: IFormStatusState = {
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
  const [state, formAction] = useFormState(
    handleSubmit,
    initialFormStatusState
  );

  return (
    <div className="section-padding-primary w-full bg-gray-light">
      <div className="container">
        <div className="shadow-light mx-auto max-w-[450px] rounded-lg bg-white p-6 lg:p-10">
          <form className="grid gap-4" action={formAction}>
            <ExampleFormElements state={state} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExampleForm;
