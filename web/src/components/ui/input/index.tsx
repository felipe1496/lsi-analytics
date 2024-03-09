import { ErrorMessage } from '@hookform/error-message';
import { Slot } from '@radix-ui/react-slot';
import React from 'react';

import { HTMLDivProps } from '@/types/html';
import { cn } from '@/utils';
import { number } from './masks';

export type ErrorMessageProps = Required<
  React.ComponentProps<typeof ErrorMessage>
>;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  rigthAdornment?: React.ReactNode | string | number | JSX.Element;
  mask?: 'number';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, error, rigthAdornment, mask, onKeyUp, ...props },
    ref,
  ) => {
    const Wrapper = rigthAdornment ? 'div' : React.Fragment;
    const wrapperProps: HTMLDivProps = {};

    if (rigthAdornment) {
      wrapperProps.className = 'relative';
    }

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
      switch (mask) {
        case 'number':
          number(event);
          break;
        default:
          break;
      }

      if (onKeyUp) {
        onKeyUp(event);
      }
    };

    return (
      <Wrapper {...wrapperProps}>
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-sm border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-red-500' : 'border-input',
            rigthAdornment && 'pr-8',
            className,
          )}
          ref={ref}
          onKeyUp={handleKeyUp}
          {...props}
        />
        {rigthAdornment && (
          <Slot className="absolute right-2 top-1/2 -translate-y-[50%]">
            {rigthAdornment}
          </Slot>
        )}
      </Wrapper>
    );
  },
);

Input.displayName = 'Input';

export { Input };
