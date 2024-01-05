import React from 'react';

interface UseOutsideClickProps {
  ref: React.RefObject<HTMLElement | null>;
  outsideFn: () => void;
}

export const useOutsideClick = ({ ref, outsideFn }: UseOutsideClickProps) => {
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        outsideFn();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, outsideFn]);
};
