import { ICarouselItem } from './interface';

export function CarouselItem({ children }: ICarouselItem) {
  return (
    <div className="keen-slider__slide carousel-slide !overflow-visible">
      {children}
    </div>
  );
}
