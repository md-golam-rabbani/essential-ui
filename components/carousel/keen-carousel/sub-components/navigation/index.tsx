import { cn } from '@/lib/shadcn/utils';
import { ICarouselNavigationButton } from './interface';
import { IconStore } from '@/components/icon-store';

export function CarouselNavigationButton({
  onClick,
  disabled,
  iconName,
  className,
}: ICarouselNavigationButton) {
  const wrapperClasses = cn(
    'absolute top-1/2 inline-flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-[1.25rem] text-black transition-opacity duration-300 opacity-100 aria-disabled:!opacity-0 border border-solid border-gray-300',
    iconName === 'chevron-left' && 'left-4',
    iconName === 'chevron-right' && 'right-4',
    disabled && 'cursor-auto',
    className
  );

  return (
    <button
      className={wrapperClasses}
      aria-disabled={disabled}
      aria-label={iconName === 'chevron-left' ? 'Previous slide' : 'Next slide'}
      onClick={onClick}
    >
      <IconStore iconName={iconName} />
    </button>
  );
}
