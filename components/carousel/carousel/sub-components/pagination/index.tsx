import { cn } from '@/lib/shadcn/utils';
import { generateArrayFromNumber } from '../../utils';
import { ICarouselPagination } from './interface';

export function CarouselPagination({
  totalCount,
  onClick,
  currentSlide,
  paginationWrapperClassName,
  paginationBulletClassName,
  paginationBulletActiveClassName,
}: ICarouselPagination) {
  return (
    <div
      className={cn(
        'mt-7 flex flex-wrap items-center justify-center gap-2 lg:mt-10',
        paginationWrapperClassName
      )}
    >
      {generateArrayFromNumber(totalCount).map((_, index) => {
        const isActive = currentSlide === index;
        return (
          <span
            key={index}
            onClick={() => {
              onClick(index);
            }}
            className={cn(
              'inline-flex h-2.5 w-2.5 cursor-pointer items-center justify-center rounded-full border-[0.5px] border-solid border-gray-light bg-gray-light transition-all',
              paginationBulletClassName,
              isActive && [
                'cursor-default bg-primary-light text-white',
                paginationBulletActiveClassName,
              ]
            )}
          ></span>
        );
      })}
    </div>
  );
}
