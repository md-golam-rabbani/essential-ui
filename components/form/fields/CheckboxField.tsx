'use client';

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

type Props<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  labelClassName?: string;
  required?: boolean;
  disabled?: boolean;
  column?: boolean;
  longGap?: boolean;
  reverse?: boolean;
  wrapperClassName?: string;
  className?: string;
};

/**
 * CheckboxField. A checkbox field component.
 *
 * @param name - The name of the field.
 * @param label - The label of the field.
 * @param required - The required flag of the field.
 * @param disabled - The disabled flag of the field.
 * @param column - The column flag of the field.
 * @param longGap - The long gap flag of the field.
 * @param reverse - The reverse flag of the field.
 * @param gap - The gap of the field.
 * @param className - The class name of the field.
 * @returns A checkbox field component.
 *
 * @example
 * ```tsx
 * <CheckboxField name="isActive" label="Is Active" />
 * ```
 */

export const CheckboxField = <T extends FieldValues>({
  name,
  label,
  labelClassName,
  disabled = false,
  required = false,
  column = false,
  longGap = false,
  reverse = false,
  wrapperClassName,
  className,
}: Props<T>) => {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormControl>
            <div
              className={cn(
                'relative flex items-center',
                'gap-2',
                column ? 'flex-col items-start' : '',
                longGap ? 'justify-between' : '',
                wrapperClassName
              )}
            >
              <Checkbox
                className={cn(reverse ? 'order-1' : 'order-0')}
                onCheckedChange={field.onChange}
                id={name}
                checked={field.value}
                disabled={disabled}
              />

              {label && (
                <FormLabel
                  htmlFor={name}
                  className={cn(
                    reverse ? 'order-0' : 'order-1',
                    labelClassName
                  )}
                >
                  <span>{label}</span>
                  {required && <RequiredSign />}
                </FormLabel>
              )}
            </div>
          </FormControl>

          <FormMessage className="mt-1 ml-6 text-xs" />
        </FormItem>
      )}
    />
  );
};

CheckboxField.displayName = 'CheckboxField';
