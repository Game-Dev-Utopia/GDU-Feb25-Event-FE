import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ParallaxComponent = () => {
  useEffect(() => {
    // Parallax Effect for Layers
    document.querySelectorAll("[data-parallax-layers]").forEach((triggerElement) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const layers = [
        { layer: "1", yPercent: 70 },
        { layer: "2", yPercent: 55 },
        { layer: "3", yPercent: 40 },
        { layer: "4", yPercent: 10 },
      ];

      layers.forEach((layerObj) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: "none",
          },
          0
        );
      });
    });
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Parallax Header */}
      <section className="relative flex items-center justify-center h-screen">
        <div className="absolute inset-0 w-full h-full">
          {/* Black Line Overflow */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black z-20"></div>

          {/* Parallax Layers */}
          <div data-parallax-layers className="relative w-full h-full">
            {/* Layer 1 */}
            <img
              src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795be09b462b2e8ebf71_osmo-parallax-layer-3.webp"
              loading="eager"
              alt="Layer 1"
              data-parallax-layer="1"
              className="absolute top-[-17.5%] left-0 object-cover w-full h-[117.5%] pointer-events-none"
            />
            {/* Layer 2 */}
            <img
              src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795b4d5ac529e7d3a562_osmo-parallax-layer-2.webp"
              loading="eager"
              alt="Layer 2"
              data-parallax-layer="2"
              className="absolute top-[-17.5%] left-0 object-cover w-full h-[117.5%] pointer-events-none"
            />
            {/* Layer 3 (Title) */}
            <div data-parallax-layer="3" className="absolute inset-0 flex items-center justify-center">
              <h2 className="font-extrabold text-white text-[11vw] leading-none text-center">
                Parallax
              </h2>
            </div>
            {/* Layer 4 */}
            <img
              src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795bb5aceca85011ad83_osmo-parallax-layer-1.webp"
              loading="eager"
              alt="Layer 4"
              data-parallax-layer="4"
              className="absolute top-[-17.5%] left-0 object-cover w-full h-[117.5%] pointer-events-none"
            />
          </div>
        </div>
      </section>

      {/* Parallax Content */}
      <section className="flex items-center justify-center h-screen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8em"
          viewBox="0 0 160 160"
          fill="none"
          className="relative"
        >
          <path
            d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z"
            fill="currentColor"
          />
        </svg>
      </section>
    </div>
  );
};

export default ParallaxComponent;
