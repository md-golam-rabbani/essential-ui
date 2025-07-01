/*
 * File: LoadingSpinner.tsx
 * Responsibility: LoadingSpinner component for displaying a loading spinner.
 */

import { cn } from '@/lib/shadcn/utils';
import { Loader2 } from 'lucide-react';

/**
 * LoadingSpinner component
 *
 * @param {string} className - The class name for the component.
 *
 * @returns {JSX.Element} - The LoadingSpinner component.
 *
 * @example
 * <LoadingSpinner />
 */

export const LoadingSpinner = ({ className = '' }: { className?: string }) => {
  return <Loader2 className={cn('h-5 w-5 animate-spin', className)} />;
};

LoadingSpinner.displayName = 'LoadingSpinner';
