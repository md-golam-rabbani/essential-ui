'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/shadcn/utils';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { RequiredSign } from './RequiredSign';

type SwitchFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  labelClassName?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  column?: boolean;
  longGap?: boolean;
  reverse?: boolean;
  wrapperClassName?: string;
};

/**
 * SwitchField
 *
 * @param name - The name of the field.
 * @param label - The label of the field.
 * @param className - The class name of the field.
 * @param disabled - The disabled state of the field.
 * @param required - The required state of the field.
 * @param column - The column state of the field.
 * @param longGap - The long gap state of the field.
 * @param reverse - The reverse state of the field.
 * @param gap - The gap state of the field.
 *
 * @returns The SwitchField component.
 */

export const SwitchField = <T extends FieldValues>({
  name,
  label,
  labelClassName,
  className,
  required = false,
  disabled = false,
  column = false,
  longGap = false,
  reverse = false,
  wrapperClassName,
}: SwitchFieldProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <FormField
      name={name}
      control={control}
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
              <Switch
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

          <FormMessage className="line-clamp-1 text-xs" />
        </FormItem>
      )}
    />
  );
};

SwitchField.displayName = 'SwitchField';
