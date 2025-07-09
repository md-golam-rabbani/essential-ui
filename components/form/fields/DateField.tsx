'use client';

import { FieldValues, Path, useFormContext } from 'react-hook-form';

import { DateTimePicker } from '@/components/ui/date-time-picker';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RequiredSign } from './RequiredSign';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  labelClassName?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

/**
 * DateField component
 *
 * @param name - The name of the field.
 * @param label - The label for the field.
 * @param required - Whether the field is required.
 * @param disabled - Whether the field is disabled.
 * @param className - The class name for the field.
 * @returns The DateField component.
 */

export const DateField = <T extends FieldValues>({
  name,
  label,
  labelClassName,
  required = false,
  disabled = false,
  className,
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
            <DateTimePicker
              disabled={disabled}
              value={field.value}
              onChange={field.onChange}
              granularity="day"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

DateField.displayName = 'DateField';
