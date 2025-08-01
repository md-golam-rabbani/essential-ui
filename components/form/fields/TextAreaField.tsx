/*
 * File: TextAreaField.tsx
 * Responsibility: Component for rendering a textarea input field.
 */

'use client';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/shadcn/utils';
import { X } from 'lucide-react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { RequiredSign } from './RequiredSign';

interface Props<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  labelClassName?: string;
  required?: boolean;
  placeholder?: string;
  resizable?: boolean;
  autoResize?: boolean;
  action?: () => void;
  Icon?: React.ReactNode;
  loading?: boolean;
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
  disabled?: boolean;
}
/**
 * TextareaField component
 *
 * @param {Path<T>} name - The name of the field
 * @param {string} label - The label of the field
 * @param {boolean} required - Whether the field is required
 * @param {string} placeholder - The placeholder of the field
 * @param {boolean} resizable - Whether the field is resizable
 * @param {boolean} autoResize - Whether the field should auto-grow based on content
 * @param {Function} action - The action to be performed on the field
 * @param {ReactNode} In - The In to be displayed
 * @param {boolean} loading - Whether the field is loading
 * @param {string} className - The class name of the field
 * @param {string} inputClassName - The class name of the input
 * @param {string} iconClassName - The class name of the In
 *
 * @returns {ReactElement} - The textarea field component
 *
 * @example
 * ```tsx
 * <TextareaField control={control} name="summary" label="Summary" autoGrow />
 * ```
 */
export const TextAreaField = <T extends FieldValues>({
  name,
  label,
  labelClassName,
  placeholder,
  required = false,
  resizable = false,
  // autoResize = false,
  action,
  Icon,
  loading,
  className,
  inputClassName,
  iconClassName,
  disabled
}: Props<T>) => {
  const { control } = useFormContext<T>();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && (
            <FormLabel className={labelClassName}>
              <span>{label}</span>
              {required && <RequiredSign />}
            </FormLabel>
          )}

          <FormControl>
            <div className="relative flex items-center gap-2">
              <Textarea
                {...field}
                placeholder={placeholder ?? 'Enter a value'}
                className={cn(
                  'w-full',
                  action && 'pr-12',
                  resizable === false && 'resize-none',
                  inputClassName
                )}
                disabled={disabled}
                // autoResize={autoResize}
              />
              {loading && <LoadingSpinner className="absolute right-4" />}

              {!loading && !disabled && action && (
                <Button
                  variant={'ghost'}
                  size={'sm'}
                  onClick={action}
                  type="button"
                  className={cn(
                    'absolute top-1/2 right-0.5 -translate-y-1/2 text-red-500',
                    iconClassName
                  )}
                >
                  {Icon ? Icon : <X />}
                </Button>
              )}

              {!loading && !action && Icon && (
                <div
                  className={cn(
                    'absolute top-1/2 right-2 flex -translate-y-1/2 text-base',
                    iconClassName
                  )}
                >
                  {Icon}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

TextAreaField.displayName = 'TextAreaField';
