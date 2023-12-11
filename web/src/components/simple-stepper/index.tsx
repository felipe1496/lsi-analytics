import React from 'react';

import { cn } from '@/utils';

interface SimpleStepperProps {
  numberOfSteps: number;
  active: number;
  className?: string;
  incorrectSteps?: number[];
  onClick?: (() => void)[];
}

export const SimpleStep: React.FC = () => <></>;

export const SimpleStepper: React.FC<SimpleStepperProps> = ({
  numberOfSteps,
  active,
  className,
  incorrectSteps,
  onClick,
}) => {
  const stepsNumbers = Array.from(
    { length: numberOfSteps },
    (_, index) => index + 1,
  );

  const getColor = (step: number) => {
    if (incorrectSteps?.includes(step)) {
      return 'bg-red-500';
    }

    if (step <= active) {
      return 'bg-purple-500';
    }

    return 'bg-zinc-200';
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {stepsNumbers.map((s, index) => (
        <button
          onClick={onClick && onClick[index]}
          key={`${s}-${index}`}
          className={cn('h-1 w-full rounded-full', getColor(s))}
        />
      ))}
    </div>
  );
};
