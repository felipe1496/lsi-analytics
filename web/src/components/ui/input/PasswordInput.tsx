import { Eye, EyeOff } from 'lucide-react';
import React from 'react';

import { Input, InputProps } from '.';

interface PasswordInputProps extends InputProps {
  visible: boolean;
  onVisibilityChange?: (visible: boolean) => void;
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ visible, onVisibilityChange, placeholder, ...props }, ref) => (
  <div className="relative">
    <Input
      placeholder={placeholder ?? 'Digite sua senha'}
      type={visible ? 'text' : 'password'}
      ref={ref}
      {...props}
      rigthAdornment={
        visible ? (
          <button
            onClick={() => {
              if (onVisibilityChange) {
                onVisibilityChange(false);
              }
            }}
          >
            <EyeOff />
          </button>
        ) : (
          <button
            onClick={() => {
              if (onVisibilityChange) {
                onVisibilityChange(true);
              }
            }}
          >
            <Eye />
          </button>
        )
      }
    />
  </div>
));

PasswordInput.displayName = 'PasswordInput';
