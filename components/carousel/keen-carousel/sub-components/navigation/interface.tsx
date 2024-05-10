import { IconName } from '@/components/icon-store/interface';
import { MouseEventHandler } from 'react';

export interface ICarouselNavigationButton {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  iconName: Extract<IconName, 'chevron-left' | 'chevron-right'>;
  className?: string;
}
