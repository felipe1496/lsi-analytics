import { LoaderSize } from './types';

export const CLASS_NAME_MAPPER: Record<
  LoaderSize,
  { wrapper: string; content: string }
> = {
  small: {
    wrapper: 'loadingio-spinner-ellipsis-small',
    content: 'ldio-small',
  },
  medium: {
    wrapper: 'loadingio-spinner-ellipsis-medium',
    content: 'ldio-medium',
  },
  large: {
    wrapper: 'loadingio-spinner-ellipsis-large',
    content: 'ldio-large',
  },
};
