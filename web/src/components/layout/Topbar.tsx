import { cn } from '@/utils';

import ReactImage from '../../assets/react.svg';

interface TopbarProps {
  breadcrumb?: React.ReactNode;
}

export const Topbar: React.FC<TopbarProps> = ({ breadcrumb }) => (
  <header
    className={cn(
      'b fixed flex h-14 w-full items-center border-b bg-white px-4 md:w-[calc(100vw-3rem)] md:px-12',
      breadcrumb ? 'justify-between' : 'justify-end',
    )}
  >
    {breadcrumb}
    <img src={ReactImage} />
  </header>
);
