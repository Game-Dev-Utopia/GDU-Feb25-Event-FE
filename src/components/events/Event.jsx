import React, { useState } from 'react';

const ImageCard = ({ title, description, imageUrl, modalImageUrl, eveurl }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="relative overflow-hidden rounded-lg transition-all duration-300 h-[320px] shadow-lg hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main background image */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay smaller placeholder */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 overflow-hidden rounded-lg shadow-xl">
          <img
            src={eveurl.replace('224/320', '112/160')}
            alt={`${title} Overlay`}
            className="w-full h-full object-cover"
          />
          {/* Removed the border div */}
        </div>
        
        <div
          className={`absolute bottom-0 left-0 right-0 h-1/2 bg-black transition-opacity duration-300 ${
            isHovered ? 'opacity-75' : 'opacity-0'
          }`}
        />
        
        <div
          className={`absolute bottom-0 left-0 right-0 h-1/2 p-6 flex flex-col justify-end text-white transition-all duration-300 transform ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-sm mb-4 line-clamp-2">{description}</p>
          <button 
            onClick={() => setIsOpen(true)}
            className="bg-white text-black px-4 py-2 rounded-md w-fit hover:bg-gray-200 transition-colors duration-200"
          >
            Read More
          </button>
        </div>
      </div>

      {/* Modal remains unchanged */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-8"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-4xl bg-[#2a1810] rounded-lg p-8 mx-4 overflow-auto flex flex-row gap-8 relative"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `
                linear-gradient(45deg, #2a1810 25%, transparent 25%),
                linear-gradient(-45deg, #2a1810 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #3a2218 75%),
                linear-gradient(-45deg, transparent 75%, #3a2218 75%),
                radial-gradient(circle at 50% 50%, #321c14 0%, #2a1810 100%)
              `,
              backgroundSize: '24px 24px, 24px 24px, 24px 24px, 24px 24px, 100% 100%',
              backgroundPosition: '0 0, 0 12px, 12px -12px, -12px 0px, 0 0',
              boxShadow: `
                0 0 0 2px #8b4513,
                0 0 0 4px #654321,
                0 0 25px rgba(139, 69, 19, 0.6),
                inset 0 0 100px rgba(0, 0, 0, 0.8)
              `
            }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-amber-600/80 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-amber-600/80 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-amber-600/80 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-amber-600/80 rounded-br-lg"></div>
            </div>

            <div className="w-1/3 relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-amber-600/20 rounded-lg pointer-events-none"></div>
                <img
                  src={modalImageUrl}
                  alt={`${title} Expanded`}
                  className="rounded-lg w-full object-cover border-4 border-amber-900/80 shadow-lg shadow-amber-900/40"
                />
              </div>
            </div>

            <div className="w-2/3 flex flex-col">
              <h2 
                className="text-4xl font-bold text-amber-400 mb-6"
                style={{
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5), 0 0 8px rgba(255, 191, 0, 0.3)'
                }}
              >
                {title}
              </h2>
              
              <div className="relative">
                <div className="absolute inset-0 bg-black/20 rounded-lg filter blur-sm"></div>
                <p 
                  className="relative text-lg leading-relaxed text-amber-200/90 mb-6"
                  style={{
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {description}
                </p>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-br from-black/60 to-black/40 rounded-lg border-2 border-amber-900/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 to-transparent opacity-50"></div>
                <h4 
                  className="text-2xl text-amber-400 mb-4 relative"
                  style={{
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  Additional Details
                </h4>
                <div className="space-y-2 text-amber-200/90 relative">
                  <p className="flex items-center gap-2">
                    <span className="text-amber-400">Category:</span> Featured
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-amber-400">Type:</span> Article
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-amber-400">Reading Time:</span> 5 minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ImageCardGrid = () => {
  const cards = [
    {
      title: "The Art of Photography",
      description: "Explore the fundamentals of composition, lighting, and perspective that make photographs truly memorable. Learn from master photographers and discover how they capture the perfect moment.",
      imageUrl: "/scroll2.jpg", // Dynamic image URL
      modalImageUrl: "dragon.png", // Dynamic image URL
      eveurl: "dragon.png", // Dynamic image URL
    },
    {
      title: "Modern Architecture",
      description: "Discover how contemporary architects are pushing the boundaries of design and sustainability. From soaring skyscrapers to innovative homes, explore the intersection of form and function.",
      imageUrl: "https://source.unsplash.com/random/800x600?architecture", // Dynamic image URL
      modalImageUrl: "https://source.unsplash.com/random/800x600?architecture_modal", // Dynamic image URL
      eveurl: "https://source.unsplash.com/random/224x320?architecture", // Dynamic image URL
    },
    {
      title: "Urban Gardens",
      description: "Learn how city dwellers are transforming concrete jungles into green oases with innovative gardening solutions. Explore vertical gardens, rooftop farms, and community spaces.",
      imageUrl: "https://source.unsplash.com/random/800x600?gardens", // Dynamic image URL
      modalImageUrl: "https://source.unsplash.com/random/800x600?gardens_modal", // Dynamic image URL
      eveurl: "https://source.unsplash.com/random/224x320?gardens", // Dynamic image URL
    },
    {
      title: "Digital Innovation",
      description: "Stay ahead of the curve with insights into the latest technological breakthroughs and digital trends. Understand how emerging technologies are reshaping industries and creating new opportunities.",
      imageUrl: "https://source.unsplash.com/random/800x600?technology", // Dynamic image URL
      modalImageUrl: "https://source.unsplash.com/random/800x600?technology_modal", // Dynamic image URL
      eveurl: "https://source.unsplash.com/random/224x320?technology", // Dynamic image URL
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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