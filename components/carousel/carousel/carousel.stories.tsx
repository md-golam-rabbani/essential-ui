import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from '.';
import { CarouselItem } from './sub-components/item';
import { carouselOptions } from './story-props';
import { cn } from '@/lib/shadcn/utils';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  args: carouselOptions,
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
        'grid h-48 w-full place-items-center border-2 border-solid border-black bg-white shadow-gray-light',
        className
      )}
    >
      <h3 className="text-[1.25rem] font-bold">{title}</h3>
    </div>
  );
}

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: (args) => (
    <div className="overflow-hidden py-20">
      <div className="container">
        <Carousel {...args}>
          {Array.from({ length: 6 }, (_, i) => i + 1).map((_, index) => (
            <CarouselItem key={index}>
              <Card title={`Slide ${index + 1}`} />
            </CarouselItem>
          ))}
        </Carousel>
      </div>
    </div>
  ),
};

export const ExampleOne: Story = {
  render: (args) => (
    <div className="overflow-hidden bg-gray-100 py-20">
      <div className="container">
        <Carousel
          {...args}
          itemsPerSlide={{
            initial: 1.2,
            sm: 1.2,
            md: 2.7,
            lg: 3.7,
            xl: 4.3,
            '2xl': 5,
          }}
          itemGap={{
            initial: 16,
            sm: 16,
            md: 18,
            lg: 20,
            xl: 20,
            '2xl': 24,
          }}
          // Navigation
          haveOffset={true}
          hasNavigation={true}
          // Progress
          hasProgress
          progressWrapperClassName={cn('mt-7 md:mt-10')}
        >
          {Array.from({ length: 6 }, (_, i) => i + 1).map((_, index) => (
            <CarouselItem key={index}>
              <Card
                title={`Slide ${index + 1}`}
                className="h-80 border-none shadow-none"
              />
            </CarouselItem>
          ))}
        </Carousel>
      </div>
    </div>
  ),
};

export const ExampleTwo: Story = {
  render: (args) => (
    <div className="overflow-hidden bg-gray-100 py-20">
      <div className="container">
        <div className="mx-auto max-w-[320px]">
          <Carousel
            {...args}
            haveOffset={false}
            hasPagination
            itemsPerSlide={{
              initial: 1,
              sm: 1,
              md: 1,
              lg: 1,
              xl: 1,
              '2xl': 1,
            }}
            itemGap={{
              initial: 0,
              sm: 0,
              md: 0,
              lg: 0,
              xl: 0,
              '2xl': 0,
            }}
            paginationWrapperClassName="absolute bottom-2 right-0 left-0 !m-0 gap-1"
          >
            {Array.from({ length: 6 }, (_, i) => i + 1).map((_, index) => (
              <CarouselItem key={index}>
                <Card
                  title={`Slide ${index + 1}`}
                  className="h-80 border-none shadow-none"
                />
              </CarouselItem>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  ),
};
