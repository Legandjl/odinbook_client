import { useState } from "react";

const useImageLoader = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  // change to useeffect
  const loadImage = (url) => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      setImageLoaded(true);
    };
    image.onerror = () => {
      setImageLoaded(true);
      setImageError(true);
    };
  };

  return [imageLoaded, loadImage, imageError];
};

export default useImageLoader;
