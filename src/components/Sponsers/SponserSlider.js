import React from "react";

const SponserSlider = () => {
  return (
    <section className="p-8 md:p-16">
      <h1 className="font-cinzel text-center text-4xl md:text-5xl lg:text-6xl mb-12 font-bold text-burntOrange">
        Sponsors
      </h1>

      <div className="flex flex-wrap justify-center gap-12 items-center">
        {/* Sponsor 1 */}
        <div className="w-48 md:w-64 flex flex-col items-center text-center">
          <img
            src="/campus_times.png"
            alt="campus times"
            className="w-20 h-20 md:w-28 md:h-28 object-contain"
          />
          <h2 className="mt-2 text-xl md:text-2xl font-semibold text-goldenrod font-cinzel">
            Campus Times
          </h2>

        </div>

        {/* Sponsor 2 */}
        <div className="w-48 md:w-64 flex flex-col items-center text-center">
          <img
            src="/GduLogo.png"
            alt="GDU Umbrella"
            className="w-20 h-20 md:w-28 md:h-28 object-contain"
          />
          <h2 className="mt-2 text-xl md:text-2xl font-semibold text-goldenrod font-cinzel">
           GDU Umbrella
          </h2>
         
        </div>
      </div>
    </section>
  );
};

export default SponserSlider;
