import React, { useEffect, useRef } from "react";

const animals = [
  {
    id: 0,
    name: "Lion",
    latin: "Panthera leo",
    image: "https://images.unsplash.com/photo-1583499871880-de841d1ace2a?h=900",
    photographer: "Clément Roy",
    photographerLink:
      "https://unsplash.com/photos/lion-lying-on-brown-rock-MUeeyzsjiY8",
  },
  {
    id: 1,
    name: "Asiatic Elephant",
    latin: "Elephas maximus",
    image: "https://images.unsplash.com/photo-1571406761758-9a3eed5338ef?h=900",
    photographer: "Alex Azabache",
    photographerLink:
      "https://unsplash.com/photos/shallow-focus-photo-of-black-elephants-hZhhVLLKJQ4",
  },
  // Add more animals here...
];

const CircularHorizontalScroller = () => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const containerWidth = container.scrollWidth;
    const viewportWidth = container.offsetWidth;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;

      // Infinite scroll logic: reset scroll position when reaching the edges
      if (scrollLeft <= 0) {
        container.scrollLeft = containerWidth - viewportWidth - 1;
      } else if (scrollLeft + viewportWidth >= containerWidth) {
        container.scrollLeft = 1;
      }

      // Update the `--k` variable based on scroll position
      const k = scrollLeft / (containerWidth - viewportWidth);
      container.style.setProperty("--k", `${k}`);
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative text-gray-300">
      {/* Header */}
      <header className="grid place-content-center text-center p-4">
        <h1 className="text-2xl font-bold">Infinite Horizontal Circular Gallery</h1>
        <strong className="block">Scroll left & right / use arrow keys</strong>
        <em className="block max-w-md mx-auto mt-2">
          Mostly CSS scroll-driven animations for rotating gallery + tiny JS for infinite cycling
        </em>
      </header>

      {/* Horizontal Scrolling Gallery */}
      <div
        ref={scrollContainerRef}
        className="relative flex overflow-x-auto snap-x snap-mandatory scroll-smooth w-full h-[300px] space-x-4 px-4"
        style={{
          "--k": "0",
        } }
      >
        {animals.map((animal) => (
          <div
            key={animal.id}
            style={{ "--i": animal.id } }
            className="snap-center flex-shrink-0 w-[300px] h-full relative bg-black"
          >
            <header className="absolute inset-0 flex flex-col justify-center items-center backdrop-blur-sm text-center">
              <h2 className="text-xl">{animal.name}</h2>
              <em>{animal.latin}</em>
            </header>
            <figure className="relative">
              <img
                src={animal.image}
                alt={animal.name}
                className="w-full h-full object-cover"
              />
              <figcaption className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-sm p-2 text-right">
                by{" "}
                <a
                  href={animal.photographerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400"
                >
                  {animal.photographer}
                </a>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>

      {/* Scroll Info */}
      <aside className="fixed bottom-4 left-4">
        <p className="bg-red-600 text-white p-4 rounded-md shadow-md">
          Sorry, your browser does not appear to support scroll-driven animation. Ensure your browser is up to date!
        </p>
      </aside>
    </div>
  );
};

export default CircularHorizontalScroller;
