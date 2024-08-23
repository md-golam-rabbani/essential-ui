import {
  KeenSliderHooks,
  KeenSliderInstance,
  KeenSliderOptions,
  SliderInstance,
} from 'keen-slider';
import { IKeenCarouselCustomHook } from './interface';
import { SCREENS } from '@/lib/types';

export function generateArrayFromNumber(num: number) {
  return Array(num)
    .fill(0)
    .map((_, i) => i + 1);
}

export function keenCarouselConfig(
  args: Required<IKeenCarouselCustomHook>
): KeenSliderOptions {
  return {
    loop: args.loop,
    defaultAnimation: {
      duration: args.transitionSpeed,
    },
    slides: {
      perView: args.itemsPerSlide.initial || 1.2,
      spacing: args.itemGap.initial ?? 10,
    },
    breakpoints: {
      [`(min-width: ${SCREENS.sm})`]: {
        slides: {
          perView: args.itemsPerSlide.sm || 1.5,
          spacing: args.itemGap.sm ?? 16,
        },
      },
      [`(min-width: ${SCREENS.md})`]: {
        slides: {
          perView: args.itemsPerSlide.md || 1.5,
          spacing: args.itemGap.md ?? 16,
        },
      },
      [`(min-width: ${SCREENS.lg})`]: {
        slides: {
          perView: args.itemsPerSlide.lg || 3,
          spacing: args.itemGap.lg ?? 20,
        },
      },
      [`(min-width: ${SCREENS.xl})`]: {
        slides: {
          perView: args.itemsPerSlide.xl || 4,
          spacing: args.itemGap.xl ?? 24,
        },
      },
      [`(min-width: ${SCREENS['2xl']})`]: {
        slides: {
          perView: args.itemsPerSlide['2xl'] || 5,
          spacing: args.itemGap['2xl'] ?? 24,
        },
      },
    },
  };
}

type Slider = SliderInstance<
  KeenSliderOptions<object, object, KeenSliderHooks>,
  KeenSliderInstance<object, object, KeenSliderHooks>,
  KeenSliderHooks
>;

/**
 * AutoPlay Plugin for Keen Carousel
 * @param interval (milliseconds)
 * @param pauseOnHover (boolean)
 * @returns
 */
export const keenCarouselAutoPlayPlugin =
  (interval?: number, pauseOnHover?: boolean) => (slider: Slider) => {
    let timeout: ReturnType<typeof setTimeout>;
    let mouseOver = false;

    function clearNextTimeout() {
      clearTimeout(timeout);
    }

    function nextTimeout() {
      clearTimeout(timeout);

      if (!mouseOver) {
        timeout = setTimeout(() => {
          slider.next();
        }, interval);
      }
    }

    function onMouseOver() {
      if (pauseOnHover) {
        mouseOver = true;
        clearNextTimeout();
      }
    }

    function onMouseOut() {
      if (pauseOnHover) {
        mouseOver = false;
        nextTimeout();
      }
    }

    function onStart() {
      slider.container.addEventListener('mouseover', onMouseOver);
      slider.container.addEventListener('mouseout', onMouseOut);
      slider.on('animationEnded', nextTimeout);
      nextTimeout();
    }

    function onStop() {
      slider.container.removeEventListener('mouseover', onMouseOver);
      slider.container.removeEventListener('mouseout', onMouseOut);
      slider.on('animationEnded', nextTimeout, true);
      clearNextTimeout();
    }

    slider.on('created', interval ? onStart : onStop);
    slider.on('destroyed', onStop);
    slider.on('animationStopped', onStop);
    slider.on('animationStarted', interval ? onStart : onStop);
  };
