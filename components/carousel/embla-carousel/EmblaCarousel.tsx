'use client';

import { EmblaOptionsType } from 'embla-carousel';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/shadcn/utils';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    WheelGesturesPlugin(),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <>
      <div ref={emblaRef}>
        <div className="-mx-3 flex">
          {slides.map((index) => (
            <div className="min-w-0 flex-[0_0_33.3333%] px-3" key={index}>
              <div
                className={cn(
                  'grid min-h-60 place-items-center rounded bg-red-200 text-[1.5rem] font-bold text-black shadow transition-all duration-300 hover:shadow-lg',
                  index === selectedIndex && 'bg-red-400'
                )}
              >
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-10">
        <div className="flex items-center gap-6">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        {!!scrollSnaps.length && (
          <div className="flex items-center gap-6">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={cn(
                  'size-2 rounded-full bg-gray-500',
                  index === selectedIndex && 'bg-blue-500'
                )}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default EmblaCarousel;
