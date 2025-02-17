import React from "react";

const SponserSlider = () => {
  return (
    <section className="p-8 md:p-16">
      <h1 className="font-cinzel text-center text-4xl md:text-5xl lg:text-6xl mb-12 font-bold text-burntOrange">
        Sponsors
      </h1>

      {/* Grid Layout for Proper Alignment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-center justify-items-center p-14">
        {/* Sponsor 1 */}
        <div className="flex flex-col items-center text-center">
          <img
            src="/campus_times.png"
            alt="Campus Times"
            className="w-24 h-24 md:w-28 md:h-28 object-contain"
          />
          <h2 className="mt-2 text-xl md:text-2xl font-semibold text-goldenrod font-cinzel">
            Campus Times
          </h2>
        </div>

        {/* Sponsor 2 */}
        <div className="flex flex-col items-center text-center">
          <img
            src="/GduLogo.png"
            alt="GameDevUtopia DAO"
            className="w-24 h-24 md:w-28 md:h-28 object-contain"
          />
          <h2 className="mt-2 text-xl md:text-2xl font-semibold text-goldenrod font-cinzel">
            GameDevUtopia DAO
          </h2>
        </div>

        {/* Sponsor 3 */}
        <div className="flex flex-col items-center text-center">
          <img
            src="/spo2.jpg"
            alt="Dr. Akash Sondhi"
            className="w-24 h-24 md:w-28 md:h-28 object-contain"
          />
          <h2 className="mt-2 text-xl md:text-2xl font-semibold text-goldenrod font-cinzel">
            Dr. Akash Sondhi <br />
            Mentor, GameDevUtopia
          </h2>
        </div>
      </div>
    </section>
  );
};

export default SponserSlider;
