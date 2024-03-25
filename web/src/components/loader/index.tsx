import './small.css';
import './medium.css';
import './large.css';
import React from 'react';

import { HTMLImageProps } from '@/types/html';

import { CLASS_NAME_MAPPER } from './constants';
import { LoaderSize } from './types';

interface LoaderProps extends HTMLImageProps {
  size?: LoaderSize;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'small' }) => {
  const styles = CLASS_NAME_MAPPER[size];

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
