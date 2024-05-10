import { ICarousel } from '../../interface';

export interface ICarouselPagination
  extends Pick<
    ICarousel,
    | 'paginationWrapperClassName'
    | 'paginationBulletClassName'
    | 'paginationBulletActiveClassName'
  > {
  totalCount: number;
  onClick: (newIndex: number) => void;
  currentSlide: number;
}
