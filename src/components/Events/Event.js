import React, { useState } from 'react';

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
      {/* Card */}
      <div
        className="relative w-full h-96 overflow-hidden transition-all duration-500 bg-gradient-to-br from-[#368BC1] to-[#142] hover:from-[#383838] hover:to-stone-800 border-2 border-amber-900 hover:border-amber-600 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-red-900/30 rounded-lg"
        onMouseEnter={() => setShowReadMore(true)}
        onMouseLeave={() => setShowReadMore(false)}
      >
        <div className="p-0 h-full relative">
          <img
            src={card.image || `https://via.placeholder.com/600x400?text=${encodeURIComponent(card.title)}`}
            alt={card.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4 text-white">
            <h3 className="text-2xl font-medieval text-[#6C3B90]">{card.title}</h3>
            <p className="text-amber-200/80">{card.description}</p>
          </div>

          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-900 to-transparent p-6 transform transition-all duration-300 ${
              showReadMore ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
          >
            <button
              onClick={() => setIsOpen(true)}
              className="w-full py-2 px-4 bg-red-900 hover:bg-red-800 text-amber-400 rounded-md border border-amber-600 flex items-center justify-center gap-2 transition-colors duration-300"
            >
              Read More
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Vintage Modal */}
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
            {/* Decorative Borders */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-amber-600/80 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-amber-600/80 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-amber-600/80 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-amber-600/80 rounded-br-lg"></div>
            </div>

            {/* Left Side: Image with enhanced frame */}
            <div className="w-1/3 relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-amber-600/20 rounded-lg pointer-events-none"></div>
                <img
                  src={card.image || `https://via.placeholder.com/600x300?text=${encodeURIComponent(card.title)}`}
                  alt={`${card.title} Expanded`}
                  className="rounded-lg w-full object-cover border-4 border-amber-900/80 shadow-lg shadow-amber-900/40"
                />
              </div>
            </div>

            {/* Right Side: Enhanced Content */}
            <div className="w-2/3 flex flex-col">
              <h2 className="text-4xl font-medieval text-amber-400 mb-6"
                  style={{
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5), 0 0 8px rgba(255, 191, 0, 0.3)'
                  }}>
                {card.title}
              </h2>
              
              <div className="relative">
                <div className="absolute inset-0 bg-black/20 rounded-lg filter blur-sm"></div>
                <p className="relative text-lg leading-relaxed text-amber-200/90 mb-6"
                   style={{
                     textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                   }}>
                  {card.fullDescription}
                </p>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-br from-black/60 to-black/40 rounded-lg border-2 border-amber-900/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 to-transparent opacity-50"></div>
                <h4 className="text-2xl text-amber-400 mb-4 relative"
                    style={{
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
                    }}>
                  Dungeon Master's Notes
                </h4>
                <div className="space-y-2 text-amber-200/90 relative">
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
      )}
    </>
  );
};

const Event = () => {
  return (
    <div className="p-8 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card) => (
          <DnDCard key={card.title} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Event;