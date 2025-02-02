import React, { useEffect } from 'react';

const Loader = ({ onPreloadComplete }) => {
  useEffect(() => {
    // Preload images
    const images = [
      '/images/bg8.webp',
      '/images/bg9.jpg',
      '/images/bg10.png',
      '/images/mysticalforest.webp',
      '/images/a2.webp',
      '/images/background_img2.jpg',
      '/images/sky.jpg',
      'images/dragondungeon.webp',
      '/scroll1.jpg',
      'dragon.png',
      'images/Dragonbg.webp'
    ];

    const preloadImages = () => {
      let loadedCount = 0;

      images.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === images.length) {
            onPreloadComplete(); // Notify when all images are loaded
          }
        };
      });
    };

    preloadImages();
  }, [onPreloadComplete]);

  return (
    <div className="loader flex items-center justify-center h-screen bg-black text-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500"></div>
    </div>
  );
};

export default Loader;
