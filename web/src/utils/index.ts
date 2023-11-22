import { AxiosError } from 'axios';
import clsx, { ClassValue } from 'clsx';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const handleErrorNotify = (error: AxiosError | Error) => {
  if (error instanceof AxiosError) {
    const message = error.response?.data.message;

    if (Array.isArray(message)) {
      message.forEach((m) => {
        toast(m, { type: 'error' });
      });
    } else if (typeof message === 'string') {
      toast(message, { type: 'error' });
    }
  } else {
    const { message } = error;
    if (message) {
      toast(error.message, { type: 'error' });
    }
  }
};
