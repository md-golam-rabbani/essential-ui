import { ReactNode } from 'react';

export interface ICustomSheet {
  // TODO: Need to reduce duplication
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Controls the open state of the sheet. */
  sheetOpen: boolean;
  /** Callback function to handle the open state change. */
  onCustomSheetChange: (open: boolean) => void;
  /** The React node that triggers the sheet to open. */
  trigger: ReactNode;
  /** The content displayed inside the sheet. */
  content: ReactNode;
  /** Custom CSS class name for the sheet content main wrapper. */
  className?: string;
  /** Custom CSS class name for the content wrapper. */
  contentWrapperClassName?: string;
  /** Custom CSS class name for the scrollbar. */
  scrollBarClassName?: string;
  /** Custom CSS class name for the scroll area viewport. */
  scrollAreaViewportClassName?: string;
}
