import type { Meta, StoryObj } from '@storybook/react';
import { KeenCarousel } from '.';
import { KeenCarouselItem } from './sub-components/item';
import { keenCarouselOptions } from './story-props';
import { cn } from '@/lib/shadcn/utils';
import { useCustomKeenSlider } from './custom-keen-slider-hook';
import { keenCarouselAutoPlayPlugin } from './utils';
import { Breakpoints } from '@/lib/types';

const meta: Meta<typeof KeenCarousel> = {
  title: 'Components/Carousel/Keen Caraousel',
  component: KeenCarousel,
  tags: ['autodocs'],
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  args: keenCarouselOptions,
  parameters: {
    layout: true,
  },
};

export default meta;

interface ICard {
  title: string;
  className?: string;
}

function Card({ title, className }: ICard) {
  return (
    <div
      className={cn(
        'grid min-h-48 w-full place-items-center border-2 border-solid border-black bg-white shadow-lg',
        className
      )}
    >
      <h3 className="text-[1.25rem] font-bold">{title}</h3>
    </div>
  );
}

type Story = StoryObj<typeof KeenCarousel>;

export const Default: Story = {
  render: (args) => {
    const { currentSlide, sliderReady, sliderRef, instanceRef } =
      useCustomKeenSlider({});

    return (
      <div className="overflow-hidden py-20">
        <div className="container">
          <KeenCarousel
            {...args}
            currentSlide={currentSlide}
            sliderReady={sliderReady}
            sliderRef={sliderRef}
            instanceRef={instanceRef}
          >
            {Array.from({ length: 6 }, (_, i) => i + 1).map((_, index) => (
              <KeenCarouselItem key={index}>
                <Card title={`Slide ${index + 1}`} />
              </KeenCarouselItem>
            ))}
          </KeenCarousel>
        </div>
      </div>
    );
  },
};

const itemsPerSlideConfig1: Breakpoints = {
  initial: 1.2,
  sm: 1.2,
  md: 2,
  lg: 2,
  xl: 2,
  '2xl': 5,
};

const itemGapConfig1: Breakpoints = {
  initial: 80,
  sm: 80,
  md: 58,
  lg: 80,
  xl: 80,
  '2xl': 80,
};

export const AutoplayExample: Story = {
  render: (args) => {
    /**
     * @Note Need to pass the same values of itemsPerSlide & itemsGap
     * as props for KeenCarousel component.
     *
     * We are passing this to avoid the flickering issue during initial stage
     */

    const { currentSlide, sliderReady, sliderRef, instanceRef } =
      useCustomKeenSlider({
        transitionSpeed: 2000,
        itemsPerSlide: itemsPerSlideConfig1,
        itemGap: itemGapConfig1,
        plugins: [keenCarouselAutoPlayPlugin(1500, false)],
      });

    return (
      <div className="overflow-hidden bg-gray-100 py-20">
        <div className="container">
          <KeenCarousel
            {...args}
            currentSlide={currentSlide}
            sliderReady={sliderReady}
            sliderRef={sliderRef}
            instanceRef={instanceRef}
            // Navigation
            haveOffset={true}
            hasNavigation={true}
            // Progress
            hasProgress
            progressWrapperClassName={cn('mt-7 md:mt-10')}
            itemsPerSlide={itemsPerSlideConfig1}
            itemGap={itemGapConfig1}
          >
            {Array.from({ length: 100 }, (_, i) => i + 1).map((_, index) => (
              <KeenCarouselItem key={index}>
                <Card
                  title={`Slide ${index + 1}`}
                  className="min-h-80 border-none shadow-none"
                />
              </KeenCarouselItem>
            ))}
          </KeenCarousel>
        </div>
      </div>
    );
  },
};

const itemsPerSlideConfig2: Breakpoints = {
  initial: 1,
  sm: 3,
  md: 2,
  lg: 2,
  xl: 2,
  '2xl': 1,
};

const itemGapConfig2: Breakpoints = {
  initial: 0,
  sm: 0,
  md: 0,
  lg: 0,
  xl: 0,
  '2xl': 0,
};

export const DifferentConfigExample: Story = {
  render: (args) => {
    /**
     * @Note Need to pass the same values of itemsPerSlide & itemsGap
     * as props for KeenCarousel component.
     *
     * We are passing this to avoid the flickering issue during initial stage
     */
    const { currentSlide, sliderReady, sliderRef, instanceRef } =
      useCustomKeenSlider({
        itemsPerSlide: itemsPerSlideConfig2,
        itemGap: itemGapConfig2,
      });

    return (
      <div className="overflow-hidden bg-gray-100 py-20">
        <div className="container">
          <div className="mx-auto max-w-[320px]">
            <KeenCarousel
              {...args}
              currentSlide={currentSlide}
              sliderReady={sliderReady}
              sliderRef={sliderRef}
              instanceRef={instanceRef}
              haveOffset={false}
              hasPagination
              paginationWrapperClassName="absolute bottom-2 right-0 left-0 !m-0 gap-1"
              itemsPerSlide={itemsPerSlideConfig2}
              itemGap={itemGapConfig2}
            >
              {Array.from({ length: 6 }, (_, i) => i + 1).map((_, index) => (
                <KeenCarouselItem key={index}>
                  <Card
                    title={`Slide ${index + 1}`}
                    className="min-h-80 border-none shadow-none"
                  />
                </KeenCarouselItem>
              ))}
            </KeenCarousel>
          </div>
        </div>
      </div>
    );
  },
};
