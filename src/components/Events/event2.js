import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const cardData = [
  {
    title: "Ancient Dragon's Lair",
    description:
      "Deep within the Forgotten Realms lies a legendary dragon's lair, rumored to hold treasures beyond mortal imagination...",
    challengeRating: 24,
    environment: "Volcanic",
    fullDescription:
      "Deep within the Forgotten Realms lies a legendary dragon's lair, rumored to hold treasures beyond mortal imagination. The ancient red dragon Infernothrax has made this volcanic cavern its home for millennia, amassing a hoard that would make kings weep with envy.",
    image: '/dragon.png',
  },
  {
    title: "Wizard's Tower",
    description: "A crystalline spire pierces the clouds, home to an eccentric archmage and their collection of forbidden spells...",
    challengeRating: 18,
    environment: "Arcane",
    fullDescription:
      "A crystalline spire pierces the clouds, home to an eccentric archmage and their collection of forbidden spells. The tower shifts and changes, its rooms rearranging themselves according to their master's whims.",
    image: null,
  },
  {
    title: "Goblin Caves",
    description: "Dark and damp, these caves are filled with scheming goblins ready to ambush unwary adventurers...",
    challengeRating: 5,
    environment: "Underground",
    fullDescription:
      "Dark and damp, these caves are filled with scheming goblins ready to ambush unwary adventurers. Hidden traps and secret passages await those who dare enter.",
    image: null,
  },
];

const DnDCard = ({ card }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);

  return (
    <>
      {/* Card with bg.png base */}
      <div
        className="relative w-full h-96 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-red-900/30"
        onMouseEnter={() => setShowReadMore(true)}
        onMouseLeave={() => setShowReadMore(false)}
        style={{
          backgroundImage: "url('/back.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Overlay for hover effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/20 hover:from-black/10 hover:to-black/30 transition-all duration-300">
          {/* Content Container */}
          <div className="relative h-full flex flex-col">
            {/* Card Image */}
            <div className="flex-grow overflow-hidden">
              <img
                src={card.image || `https://via.placeholder.com/600x400?text=${encodeURIComponent(card.title)}`}
                alt={card.title}
                className="w-full h-full object-cover opacity-90"
              />
            </div>

            {/* Title and Description */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-2xl font-medieval text-amber-400 mb-2">{card.title}</h3>
              <p className="text-amber-200/90 text-sm">{card.description}</p>
            </div>

            {/* Read More Button */}
            <div
              className={`absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-300 ${
                showReadMore ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
            >
              <button
                onClick={() => setIsOpen(true)}
                className="w-full py-2 px-4 bg-amber-900/80 hover:bg-amber-800 text-amber-200 rounded-md border border-amber-600/50 flex items-center justify-center gap-2 transition-colors duration-300 backdrop-blur-sm"
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal (kept the same as before) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-8"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-4xl bg-[#2a1810] rounded-lg p-8 mx-4 overflow-auto flex flex-row gap-8 relative"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url('/back.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: `
                0 0 0 2px #8b4513,
                0 0 0 4px #654321,
                0 0 25px rgba(139, 69, 19, 0.6),
                inset 0 0 100px rgba(0, 0, 0, 0.8)
              `
            }}
          >
            {/* Modal content remains the same */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            
            <div className="relative z-10 flex flex-row gap-8 w-full">
              {/* Left Side: Image */}
              <div className="w-1/3">
                <img
                  src={card.image || `https://via.placeholder.com/600x300?text=${encodeURIComponent(card.title)}`}
                  alt={`${card.title} Expanded`}
                  className="rounded-lg w-full object-cover border-4 border-amber-900/80 shadow-lg shadow-amber-900/40"
                />
              </div>

              {/* Right Side: Content */}
              <div className="w-2/3 flex flex-col">
                <h2 className="text-4xl font-medieval text-amber-400 mb-6">
                  {card.title}
                </h2>
                
                <p className="text-lg leading-relaxed text-amber-200/90 mb-6">
                  {card.fullDescription}
                </p>

                <div className="mt-6 p-6 bg-black/40 rounded-lg border-2 border-amber-900/50">
                  <h4 className="text-2xl text-amber-400 mb-4">
                    Dungeon Master's Notes
                  </h4>
                  <div className="space-y-2 text-amber-200/90">
                    <p className="flex items-center gap-2">
                      <span className="text-amber-400">Challenge Rating:</span> {card.challengeRating}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-amber-400">Environment:</span> {card.environment}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-amber-400">Treasure Hoard:</span> Legendary
                    </p>
                  </div>
                </div>
              </div>


            </div>

            
          </div>

          
            
        </div>
      )}
    </>
  );
};

const DnDCardGrid = () => {
  return (
    <div className="p-8 bg-stone-950 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card) => (
          <DnDCard key={card.title} card={card} />
        ))}
      </div>
    </div>
  );
};

export default DnDCardGrid;