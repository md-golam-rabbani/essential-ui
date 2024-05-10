import { KeenSliderOptions, SliderInstance } from 'keen-slider';
import { IKeenCarousel } from './interface';
import { SCREENS } from '@/lib/types';

export function generateArrayFromNumber(num: number) {
  return Array(num)
    .fill(0)
    .map((_, i) => i + 1);
}

export function carouselConfig(
  args: Required<
    Pick<
      IKeenCarousel,
      'transitionSpeed' | 'itemsPerSlide' | 'itemGap' | 'loop'
    >
  >
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

interface Slider extends SliderInstance {
  next: () => void;
  container: HTMLElement;
}

export const CarouselAutoPlayPlugin =
  (interval?: number, pauseOnHover?: boolean) => (slider: Slider) => {
    let timeout: ReturnType<typeof setTimeout>;
    let mouseOver = false;
    const clearNextTimeout = () => {
      clearTimeout(timeout);
    };

    const nextTimeout = () => {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => {
        slider.next();
      }, interval);
    };

    const onMouseOver = () => {
      if (!pauseOnHover) {
        mouseOver = true;
      }
      clearNextTimeout();
    };

    const onMouseOut = () => {
      mouseOver = false;
      nextTimeout();
    };

    const onStart = () => {
      slider.container.addEventListener('mouseover', onMouseOver);
      slider.container.addEventListener('mouseout', onMouseOut);
      slider.on('animationEnded', nextTimeout);
      nextTimeout();
    };

    const onStop = () => {
      slider.container.removeEventListener('mouseover', onMouseOver);
      slider.container.removeEventListener('mouseout', onMouseOut);
      slider.on('animationEnded', nextTimeout, true);
      clearNextTimeout();
    };

    slider.on('created', interval ? onStart : onStop);
    slider.on('destroyed', onStop);
    slider.on('stopped', onStop);
    slider.on('resumed', interval ? onStart : onStop);
  };
