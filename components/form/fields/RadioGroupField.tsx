'use client';

import { cn } from '@/lib/shadcn/utils';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { RequiredSign } from './RequiredSign';

type OptionType = {
  value: string;
  text: string;
};

type QuestionTypeRadioGroupProps<T extends FieldValues> = {
  name: Path<T>;
  options: OptionType[];
  label?: string;
  labelClassName?: string;
  required?: boolean;
  className?: string;
  column?: boolean;
  longGap?: boolean;
  reverse?: boolean;
  columnGroup?: boolean;
  rowGroup?: boolean;
  groupWrapperClassName?: string;
  disabled?: boolean;
};

/**
 * RadioGroupField component is responsible for rendering the radio group field in the form.
 *
 * @param name - The name of the field.
 * @param options - The options for the radio group.
 * @param label - The label for the radio group.
 * @param required - The required flag for the radio group.
 * @param className - The class name for the radio group.
 * @param column - The column flag for the radio group.
 * @param longGap - The long gap flag for the radio group.
 * @param reverse - The reverse flag for the radio group.
 * @param gap - The gap for the radio group.
 * @param columnGroup - The column group flag for the radio group.
 * @param rowGroup - The row group flag for the radio group.
 * @returns The RadioGroupField component.
 */

export const RadioGroupField = <T extends FieldValues>({
  name,
  options,
  label = 'Question Type',
  labelClassName,
  required = false,
  className = '',
  column = false,
  longGap = false,
  reverse = false,
  columnGroup = true,
  rowGroup = false,
  groupWrapperClassName,
  disabled
}: QuestionTypeRadioGroupProps<T>) => {
  const { control } = useFormContext<T>();

  if (options.length < 2) {
    return (
      <div className="text-red-500">
        Please provide at least two options for the radio group.
      </div>
    );
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className={labelClassName}>
              <span>{label}</span>
              {required && <RequiredSign />}
            </FormLabel>
          )}

          <FormControl>
            <RadioGroup
              disabled={disabled}
              onValueChange={field.onChange}
              value={field.value}
              className={cn(
                columnGroup ? 'flex-col' : '',
                rowGroup ? 'flex-row' : '',
                'flex gap-2',
                className
              )}
            >
              {options.map((option) => (
                <FormItem key={option.value}>
                  <FormControl>
                    <div
                      className={cn(
                        'relative flex items-center gap-2',
                        column ? 'flex-col items-start' : '',
                        longGap ? 'justify-between' : '',
                        groupWrapperClassName
                      )}
                    >
                      <RadioGroupItem
                        id={option.value}
                        className={cn(reverse ? 'order-1' : 'order-0')}
                        value={option.value}
                      />

                      <FormLabel
                        htmlFor={option.value}
                        className={cn(reverse ? 'order-0' : 'order-1')}
                      >
                        {option.text}
                      </FormLabel>
                    </div>
                  </FormControl>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

RadioGroupField.displayName = 'RadioGroupField';
