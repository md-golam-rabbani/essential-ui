import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/shadcn/utils';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { RequiredSign } from './RequiredSign';

type Option = {
  text: string;
  value: string;
};

type Props<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  labelClassName?: string;
  options: Option[];
  className?: string;
  disabled?: boolean;
  column?: boolean;
  groupWrapperClassName?: string;
  required?: boolean;
};

/**
 * CheckboxGroupField. A checkbox group field component.
 *
 * @param name - The name of the field.
 * @param label - The label of the field.
 * @param options - The options of the field.
 * @param className - The class name of the field.
 * @param disabled - The disabled flag of the field.
 * @param column - The column flag of the field.
 * @param required - The required flag of the field.
 * @returns A checkbox group field component.
 *
 * @example
 * ```tsx
 * <CheckboxGroupField
 *   name="skills"
 *   label="Skills"
 *   options={[
 *     { text: 'React', value: 'react' },
 *     { text: 'Vue', value: 'vue' },
 *     { text: 'Angular', value: 'angular' },
 *   ]}
 * />
 * ```
 */

export const CheckboxGroupField = <T extends FieldValues>({
  name,
  label,
  labelClassName,
  options,
  className,
  disabled,
  column = true,
  groupWrapperClassName,
  required,
}: Props<T>) => {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel htmlFor={name} className={labelClassName}>
              <span>{label}</span>
              {required && <RequiredSign />}
            </FormLabel>
          )}

          <FormControl>
            <fieldset
              className={cn(
                'flex gap-4',
                column ? 'flex-col' : 'flex-row flex-wrap',
                groupWrapperClassName
              )}
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    checked={(field.value as string[])?.includes(option.value)}
                    onCheckedChange={(checked) => {
                      const value = (field.value as string[]) || [];
                      if (checked) {
                        field.onChange([...value, option.value]);
                      } else {
                        field.onChange(
                          value.filter((val) => val !== option.value)
                        );
                      }
                    }}
                    disabled={disabled}
                    id={option.value}
                  />
                  <label
                    htmlFor={option.value}
                    className="text-sm leading-none font-medium"
                  >
                    {option.text}
                  </label>
                </div>
              ))}
            </fieldset>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

CheckboxGroupField.displayName = 'CheckboxGroupField';
