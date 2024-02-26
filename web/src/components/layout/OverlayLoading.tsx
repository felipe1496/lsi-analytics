import React from 'react';

export const OverlayLoading: React.FC = () => (
  <div className="absolute z-50 flex h-screen w-screen items-center justify-center bg-white bg-opacity-50">
    <img src="/ellipsis.svg" alt="loading dots" className="w-20" />
  </div>
);
