import { cn } from '@/lib/shadcn/utils';
import { ICarouselProgressBar } from './interface';

export function CarouselProgressBar({
  progress,
  progressWrapperClassName,
  progressCompleteBarClassName,
}: ICarouselProgressBar) {
  return (
    <div
      className={cn(
        'relative mt-7 h-1 overflow-hidden rounded-full bg-gray-light lg:mt-10',
        progressWrapperClassName
      )}
    >
      <span
        className={cn(
          'absolute inset-0 z-[1] origin-left rounded-[inherit] bg-primary-light transition-[width] duration-500',
          progressCompleteBarClassName
        )}
        style={{
          width: `${progress * 100}%`,
        }}
      ></span>
    </div>
  );
}
