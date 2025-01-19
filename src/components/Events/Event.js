import React, { useState } from 'react';
import ImageCard from './ImageCard';


const ImageCardGrid = () => {
  const cards = [
    {
      title: "The Art of Photography",
      description: "Explore the fundamentals of composition, lighting, and perspective that make photographs truly memorable. Learn from master photographers and discover how they capture the perfect moment.",
      imageUrl: "/scroll1.jpg", // Dynamic image URL
      modalImageUrl: "dragon.png", // Dynamic image URL
      eveurl: "dragon.png", // Dynamic image URL
    },
    {
      title: "Modern Architecture",
      description: "Discover how contemporary architects are pushing the boundaries of design and sustainability. From soaring skyscrapers to innovative homes, explore the intersection of form and function.",
      imageUrl: "/scroll1.jpg", // Dynamic image URL
      modalImageUrl: "dragon.png", // Dynamic image URL
      eveurl: "dragon.png", // Dynamic image URL},
    },
    {
      title: "Urban Gardens",
      description: "Learn how city dwellers are transforming concrete jungles into green oases with innovative gardening solutions. Explore vertical gardens, rooftop farms, and community spaces.",
      imageUrl: "/scroll1.jpg", // Dynamic image URL
      modalImageUrl: "dragon.png", // Dynamic image URL
      eveurl: "dragon.png", // Dynamic image URL
 },
    {
      title: "Digital Innovation",
      description: "Stay ahead of the curve with insights into the latest technological breakthroughs and digital trends. Understand how emerging technologies are reshaping industries and creating new opportunities.",
      imageUrl: "/scroll1.jpg", // Dynamic image URL
      modalImageUrl: "dragon.png", // Dynamic image URL
      eveurl: "dragon.png", // Dynamic image URL
    }
  ];

  return (
    <div className="container mx-auto p-16" >
      <div className="text-center mb-16 text-6xl font-bold font-cinzel text-goldenrod">
       Events
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
        {cards.map((card, index) => (
          <ImageCard
            key={index}
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
            modalImageUrl={card.modalImageUrl}
            eveurl={card.eveurl}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCardGrid;