import React from 'react';

import { cn } from '@/utils';

interface SimpleStepperProps {
  numberOfSteps: number;
  active: number;
  className?: string;
}

export const SimpleStep: React.FC = () => <></>;

export const SimpleStepper: React.FC<SimpleStepperProps> = ({
  numberOfSteps,
  active,
  className,
}) => {
  const stepsNumbers = Array.from(
    { length: numberOfSteps },
    (_, index) => index + 1,
  );

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {stepsNumbers.map((s, index) => (
        <button
          key={`${s}-${index}`}
          className={cn(
            'h-1 w-full rounded-full',
            active && s <= active ? 'bg-purple-500' : 'bg-zinc-200',
          )}
        />
      ))}
    </div>
  );
};
