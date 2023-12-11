import React from 'react';

type UseStepperProps = {
  index: number;
  count: number;
};

export const useStepper = ({ index, count }: UseStepperProps) => {
  const [activeStep, setActiveStep] = React.useState(index);

  const next = () => {
    setActiveStep((prevState) => {
      if (activeStep < count + index) {
        return prevState + 1;
      }

      return prevState;
    });
  };

  const back = () => {
    setActiveStep((prevState) => {
      if (prevState > index) {
        return prevState - 1;
      }

      return prevState;
    });
  };

  const canActivate = (value: number) => {
    if (value <= activeStep) {
      return true;
    }

    return false;
  };

  const jump = (value: number) => {
    if (value >= index && value <= count) {
      setActiveStep(value);
    }
  };

  return {
    activeStep,
    unsafeSetActiveStep: setActiveStep,
    next,
    back,
    canActivate,
    index,
    count,
    jump,
  };
};
