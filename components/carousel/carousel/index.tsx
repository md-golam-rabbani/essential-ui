'use client';

import 'keen-slider/keen-slider.min.css';
import { CSSProperties, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { ICarousel, ITEMS_PER_SLIDE, ITEM_GAP } from './interface';
import { CarouselAutoPlayPlugin, carouselConfig } from './utils';
import { CarouselPagination } from './sub-components/pagination';
import { CarouselProgressBar } from './sub-components/progress';
import { CarouselNavigationButton } from './sub-components/navigation';
import { cn } from '@/lib/shadcn/utils';
import { KeenSliderPlugin } from 'keen-slider';

/**
 * This is the base carousel component.
 */
export function Carousel({
  children,
  haveOffset = true,
  transitionSpeed = 1000,
  itemGap = ITEM_GAP,
  itemsPerSlide = ITEMS_PER_SLIDE,
  loop = false,
  hasNavigation = false,
  hasPagination = false,
  hasProgress = false,
  autoPlay,

  // Overwriting styling
  mainWrapperClassName,

  navigationWrapperClassName,
  navigationNextBtnClassName,
  navigationPrevBtnClassName,

  paginationWrapperClassName,
  paginationBulletClassName,
  paginationBulletActiveClassName,

  progressWrapperClassName,
  progressCompleteBarClassName,
}: ICarousel) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [sliderReady, setSliderReady] = useState<boolean>(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      ...carouselConfig({ transitionSpeed, itemsPerSlide, itemGap, loop }),
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setSliderReady(true);
      },
    },
    [
      CarouselAutoPlayPlugin(
        autoPlay?.interval,
        autoPlay?.pauseOnHover
      ) as KeenSliderPlugin,
    ]
  );

  // Pagination, Progress, SlidePerView
  let progress: number = 0;
  let paginationDots: number = 0;
  let slidePerView: number = 0;

  if (
    instanceRef.current &&
    instanceRef.current?.options.slides &&
    typeof instanceRef.current.options.slides === 'object' &&
    typeof instanceRef.current?.options.slides.perView === 'number'
  ) {
    slidePerView = Math.floor(instanceRef.current?.options.slides.perView);
    if (loop) {
      progress = (currentSlide + 1) / instanceRef.current?.slides.length;
      paginationDots = instanceRef.current?.slides.length;
    } else {
      progress =
        (currentSlide + instanceRef.current?.options.slides.perView) /
        instanceRef.current?.slides.length;
      paginationDots = Math.ceil(
        instanceRef.current?.slides.length -
          instanceRef.current?.options.slides.perView +
          1
      );
    }
  }

  // Slide per view
  const slidesPerView = {
    '--initial-view': itemsPerSlide?.initial,
    '--sm-view': itemsPerSlide.sm,
    '--md-view': itemsPerSlide?.md,
    '--lg-view': itemsPerSlide?.lg,
    '--xl-view': itemsPerSlide?.xl,
    '--2xl-view': itemsPerSlide?.['2xl'],
  } as CSSProperties;

  // Item gap
  const gapPerItem = {
    '--initial-gap': `${itemGap?.initial}px`,
    '--sm-gap': `${itemGap?.sm}px`,
    '--md-gap': `${itemGap?.md}px`,
    '--lg-gap': `${itemGap?.lg}px`,
    '--xl-gap': `${itemGap?.xl}px`,
    '--2xl-gap': `${itemGap?.['2xl']}px`,
  } as CSSProperties;

  return (
    <div className="relative">
      <div className="group relative flex flex-col">
        <div
          ref={sliderRef}
          style={{ ...slidesPerView, ...gapPerItem }}
          className={cn(
            'keen-slider carousel',
            haveOffset && '!overflow-visible',
            mainWrapperClassName
          )}
        >
          {children}
        </div>

        {/* Navigation  */}
        {hasNavigation && sliderReady && instanceRef.current && (
          <div className={cn(navigationWrapperClassName)}>
            <CarouselNavigationButton
              onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
                e.stopPropagation();
                instanceRef.current?.prev();
              }}
              disabled={!loop && currentSlide === 0}
              className={navigationPrevBtnClassName}
              iconName="chevron-left"
            />

            <CarouselNavigationButton
              onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
                e.stopPropagation();
                instanceRef.current?.next();
              }}
              disabled={
                !loop &&
                (currentSlide ===
                  instanceRef.current.track.details.slides.length -
                    slidePerView ||
                  instanceRef.current.track.details.slides.length <
                    slidePerView)
              }
              className={navigationNextBtnClassName}
              iconName="chevron-right"
            />
          </div>
        )}

        {/* Pagination */}
        {hasPagination && sliderReady && instanceRef.current && (
          <CarouselPagination
            totalCount={paginationDots}
            onClick={(newIndex: number) => {
              instanceRef.current?.moveToIdx(newIndex);
            }}
            currentSlide={currentSlide}
            paginationWrapperClassName={paginationWrapperClassName}
            paginationBulletClassName={paginationBulletClassName}
            paginationBulletActiveClassName={paginationBulletActiveClassName}
          />
        )}
      </div>

      {/* ProgressBar  */}
      {hasProgress && (
        <CarouselProgressBar
          progress={progress}
          progressWrapperClassName={progressWrapperClassName}
          progressCompleteBarClassName={progressCompleteBarClassName}
        />
      )}
    </div>
  );
}
