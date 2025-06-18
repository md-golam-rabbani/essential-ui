import { cn } from '@/lib/shadcn/utils';
import { ICheckboxControl } from './interface';

/**
 * The `CheckboxControl` component is a customizable checkbox component for rendering
 * the design of a checkbox button. It can be used with a `fieldset` and `legend` element,
 * or as a standalone component. To make it functional and clickable, wrap it with a
 * label element or use the id and htmlFor attributes to associate it with a clickable title.
 *
 * @example
 * <CheckboxControl error={true} />
 */
export const CheckboxControl = ({
  name,
  value,
  checked,
  id,
  disabled,
  error,
  className,
  required,
  onCheckboxChange,
  ariaLabel,
}: ICheckboxControl) => {
  const checkboxClasses = cn(
    /** Default style */
    'border border-solid size-4.5 rounded-sm appearance-none border-gray-600 bg-transparent relative flex items-center justify-center after:absolute after:border-0 after:border-b after:border-r after:border-white after:w-1 after:h-2 after:top-[20%] after:rotate-45 after:bg-transparent after:scale-0 after:origin-center after:transition-all after:duration-300 transition-all duration-300',
    /** Hover style*/
    'hover:border-black',
    /** Active style*/
    'checked:border-primary checked:hover:border-primary checked:after:scale-100 checked:bg-blue-500',
    /** Disabled style*/
    'disabled:border-gray-300! disabled:bg-gray-300',
    /**Error style */
    error && '!border-danger',
    className
  );

  return (
    <input
      type="checkbox"
      role="checkbox"
      name={name}
      value={value}
      checked={checked}
      id={id}
      disabled={disabled}
      className={checkboxClasses}
      required={required}
      onChange={onCheckboxChange}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      aria-invalid={error}
    />
  );
};
