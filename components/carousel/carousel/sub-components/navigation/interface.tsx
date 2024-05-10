import { IconName } from '@/components/icon-store/interface';

export interface ICarouselNavigationButton {
  onClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
  disabled: boolean;
  iconName: Extract<IconName, 'chevron-left' | 'chevron-right'>;
  className?: string;
}
