import html2canvas from 'html2canvas';
import React from 'react';

interface UseScreenshotProps {
  elementId: string;
  fileType: string;
}

export const useScreenshot = ({ elementId, fileType }: UseScreenshotProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const shot = async () => {
    const element = document.getElementById(elementId);

    if (!element) {
      throw new Error('Não foi possível encontrar o elemento da screenshot');
    }

    try {
      setIsLoading(true);
      const canvas = await html2canvas(element);
      const dataURL = canvas.toDataURL(fileType);
      const _blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, fileType);
      });
      return { dataURL, blob: _blob as Blob };
    } catch (error) {
      throw new Error('Não foi possível criar a imagem');
    } finally {
      setIsLoading(false);
    }
  };

  return { shot, isLoading };
};
