import React from "react";

const BackgroundImages = () => {
  const images = [
    "images/a1.webp",
    "images/a2.webp",
    "images/bg3.jpg",
    "images/bg4.jpg",
    "images/bg5.jpg",
  ];

  return (
    <div className="flex flex-col">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative w-full overflow-hidden"
          style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center", height: "100vh" }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Gradient overlays */}
          <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-b from-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-black to-transparent"></div>

          {/* Content (optional) */}
          <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
            Image {index + 1}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BackgroundImages;
