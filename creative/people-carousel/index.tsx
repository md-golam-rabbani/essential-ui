'use client';

import { CSSProperties, startTransition, useState } from 'react';
import Image from 'next/image';
import { IPeopleCarousel, PEOPLE_CAROUSEL_IMAGE_DIMENSIONS } from './interface';
import styles from './people-carousel.module.css';
import DEFAULT_PERSON_IMAGE from '@/public/assets/images/fallbacks/person/640x822.jpg';
import { IconStore } from '@/components/icon-store';
import { cn } from '@/lib/shadcn/utils';
import { TextComponent } from '@/components/text-component';
import { Typography } from '@/components/typography';
import Link from 'next/link';

const CarouselArrow = ({
  scrollLeft,
  scrollRight,
  peopleLength,
  activeItem
}: {
  scrollLeft: () => void;
  scrollRight: () => void;
  peopleLength: number;
  activeItem: number;
}) => {
  const arrowClasses = cn(
    'bg-blue-500 disabled:bg-gray-300 flex aspect-square items-center justify-center rounded-full p-1.5 text-lg text-white transition-all duration-300'
  );
  return (
    <>
      <button
        className={arrowClasses}
        disabled={activeItem == 0}
        onClick={scrollLeft}
      >
        <IconStore iconName="chevron-left" />
      </button>
      <button
        className={arrowClasses}
        disabled={activeItem == peopleLength - 1}
        onClick={scrollRight}
      >
        <IconStore iconName="chevron-right" />
      </button>
    </>
  );
};

export function PeopleCarousel({ textComponent, people }: IPeopleCarousel) {
  const [activeItem, setActiveItem] = useState(0);

  const scrollLeft = () => {
    startTransition(() => {
      setActiveItem((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        return prev;
      });
    });
  };

  const scrollRight = () => {
    startTransition(() => {
      setActiveItem((prev) => {
        if (prev < people.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    });
  };

  const carouselItemClasses = cn(
    // Initial width
    'w-[16rem] md:w-32 lg:w-40 xl:w-45',
    // Active item width
    'aria-current:w-[16rem] md:aria-current:w-[20rem] lg:aria-current:w-104 xl:aria-current:w-120',
    // Hover item width
    'md:&:not(:hover):group-hover:w-[9rem] lg:&:not(:hover):group-hover:w-[11rem] xl:&:not(:hover):group-hover:w-[13rem] md:hover:w-38 lg:hover:w-46 xl:hover:w-54',

    'relative shrink-0 cursor-pointer overflow-hidden',
    'md:[transition:width_var(--transition,200ms_ease-in)]'
  );

  return (
    <div className="section-padding-primary flex w-full flex-col gap-8 overflow-hidden md:gap-12">
      <div className="container">
        <div className="flex items-end justify-between">
          <div className="max-w-160">
            <TextComponent
              {...textComponent}
              titleSize="h1"
              alignment="start"
            />
          </div>
          <div className="hidden items-center justify-end gap-3 md:flex">
            <CarouselArrow
              scrollLeft={scrollLeft}
              scrollRight={scrollRight}
              activeItem={activeItem}
              peopleLength={people.length}
            />
          </div>
        </div>
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-full overflow-hidden">
          <div className="container">
            <div
              style={
                {
                  '--active-item': activeItem,
                  '--transition': '600ms cubic-bezier(0.22, 0.61, 0.36, 1)'
                } as CSSProperties
              }
              className={cn(
                'group flex h-82 w-full flex-row gap-3 transition-all duration-700 md:h-112 md:gap-6 lg:h-136 xl:h-150',
                styles['people-carousel']
              )}
            >
              {people.map((people, index) => (
                <div
                  onClick={() => {
                    startTransition(() => {
                      setActiveItem(index);
                    });
                  }}
                  aria-current={activeItem === index}
                  className={carouselItemClasses}
                  key={index}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#c9c6c7]">
                    <Image
                      className={cn(
                        'absolute top-1/2 right-0 h-auto w-full max-w-none -translate-y-1/2 object-cover transition-all duration-400 md:left-1/2 md:w-120 md:-translate-x-1/2',
                        activeItem === index ? 'md:grayscale-0' : 'md:grayscale'
                      )}
                      src={people.img?.src || DEFAULT_PERSON_IMAGE}
                      alt={people.img?.alt || people.title}
                      width={PEOPLE_CAROUSEL_IMAGE_DIMENSIONS.width}
                      height={PEOPLE_CAROUSEL_IMAGE_DIMENSIONS.height}
                      blurDataURL={
                        people.img?.lqip || DEFAULT_PERSON_IMAGE.blurDataURL
                      }
                    />
                    <div
                      className={cn(
                        'bg-primary absolute -bottom-8 -left-4 aspect-square w-40 origin-bottom-left scale-100 rounded-full opacity-70 blur-[50px] transition-all duration-400 md:-bottom-16 md:w-60 md:blur-[70px] lg:w-70 lg:blur-[80px] xl:w-78 xl:blur-[100px]',
                        activeItem === index
                          ? 'md:scale-100 md:opacity-70'
                          : 'md:scale-0 md:opacity-0'
                      )}
                    />
                    <div
                      className={cn(
                        'bg-gradient-2 absolute bottom-0 left-0 h-36 w-full origin-bottom from-black/0 to-black/[.71] transition-all duration-500',
                        activeItem === index ? 'md:opacity-70' : 'md:opacity-0'
                      )}
                    />
                    <div
                      className={cn(
                        'absolute bottom-0 left-0 flex w-full translate-x-0 flex-col gap-2 overflow-hidden p-4 opacity-100 transition-[transform,opacity] md:px-6 md:py-8',
                        activeItem === index
                          ? 'md:translate-x-0 md:opacity-100'
                          : 'transition-none md:-translate-x-full md:opacity-0'
                      )}
                    >
                      <Typography
                        size="h2"
                        tagName="h3"
                        className="flex w-fit flex-wrap items-center gap-x-2 text-white md:gap-x-4"
                      >
                        <Link href={people.link}>{people.title}</Link>
                      </Typography>
                      <Typography size="p2" className="text-white md:text-base">
                        {people.subTitle}
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        <div className="container">
          <div className="ml-auto flex items-center justify-end gap-3">
            <CarouselArrow
              scrollLeft={scrollLeft}
              scrollRight={scrollRight}
              activeItem={activeItem}
              peopleLength={people.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
