import { ICarousel, ITEMS_PER_SLIDE, ITEM_GAP } from './interface';

export const carouselOptions: Omit<ICarousel, 'children'> = {
  haveOffset: true,
  transitionSpeed: 1000,
  itemsPerSlide: ITEMS_PER_SLIDE,
  itemGap: ITEM_GAP,
  loop: false,
  hasNavigation: false,
  hasPagination: false,
  hasProgress: false,
};
