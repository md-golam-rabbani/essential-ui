import { cn } from '@/lib/shadcn/utils';
import { IKeenCarouselItem } from './interface';

export function KeenCarouselItem({ children, className }: IKeenCarouselItem) {
  return (
    <div
      className={cn(
        'keen-slider__slide keen-carousel-slide !overflow-visible',
        className
      )}
      aria-label="Keen slider slide"
    >
      {children}
    </div>
  );
}
