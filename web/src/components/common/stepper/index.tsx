import React from 'react';

interface StepProps {
  children?: React.ReactNode;
}

export const Step: React.FC<StepProps> = ({ children }) => (
  <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-white">
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {children}
    </div>
  </div>
);

interface StepperProps {
  children?: React.ReactNode;
}

export const Stepper: React.FC<StepperProps> = ({ children }) => {
  const steps = React.Children.toArray(children);

  return (
    <div className="flex w-full items-center">
      {steps.map((s, index) => (
        <div
          className="flex items-center border-2 border-green-500"
          key={index}
        >
          {s}
          {index < steps.length - 1 && (
            <div className="h-[1px] w-full bg-zinc-500" />
          )}
        </div>
      ))}
    </div>
  );
};
