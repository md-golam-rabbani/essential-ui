'use client';

import * as React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export function EmblaCarousel() {
  return (
    <div className="bg-gray-200 py-20">
      <div className="container">
        <Carousel>
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="flex min-h-40 items-center justify-center rounded-lg bg-white p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="max-lg:left-0" />
          <CarouselNext className="max-lg:right-0" />
        </Carousel>
      </div>
    </div>
  );
}
