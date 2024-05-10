import { ICarousel } from '../../interface';

export interface ICarouselProgressBar
  extends Pick<
    ICarousel,
    'progressWrapperClassName' | 'progressCompleteBarClassName'
  > {
  progress: number;
}
