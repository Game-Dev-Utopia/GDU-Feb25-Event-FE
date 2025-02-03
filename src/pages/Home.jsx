import { useNavigate } from "react-router-dom";

import Sponser from "../components/Sponsers/Sponser";
import "../index.css";
import Event from "../components/Events/Event";
import Faq from "../components/FAQ/Faq";
import Footer from "../components/Footer/FooterPart";
import SponserSlider from "../components/Sponsers/SponserSlider";
import Countdown from "../components/Countdown/Countdown";
import Prizepool from "../components/PrizePool/Prizepool";
import Contact from "../components/ContactUs/Contact";
import PrizePool from "../components/PrizePool/Prizepool";
import troch from "./torchorg.png";
import torchLeft from "./torch left.png";
import { GradualSpacing } from "../motion/gradual-spacing";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="w-screen h-screen overflow-y-scroll overflow-x-hidden bg-goldenrod"
        id="home"
      >
        {/* Home Banner */}
        <div className="relative text-white font-sans flex flex-col items-center justify-center h-screen">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: "url(/images/Dragonbg.webp)" }}
          ></div>

          {/* Container for Title and Button */}
          <div className="relative flex flex-col items-center justify-center px-4 sm:px-10 lg:px-20 z-10 text-center">
            {/* GameDevUtopia Text - Power of Dragon Font Applied */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-wide shadow-lg bg-black bg-opacity-60 px-6 sm:px-8 py-3 sm:py-5 rounded-lg relative font-[PowerOfDragon] animate-float">
              <GradualSpacing text = "GameDevUtopia Presents" color="white" />
              <GradualSpacing text = "GLITCHED" color="burntOrange" />
            </h1>


            {/* Left Torch Image - Smaller on mobile */} 
            <img
              src={torchLeft}
              alt="Torch Left"
              className="absolute left-[-30px] sm:left-[-80px] md:left-[-150px] bottom-0 w-[80px] sm:w-[130px] md:w-[200px] opacity-90 animate-float"
            />

            {/* Right Torch Image - Smaller on mobile */}
            <img
              src={troch}
              alt="Torch Right"
              className="absolute right-[-30px] sm:right-[-80px] md:right-[-150px] bottom-0 w-[80px] sm:w-[130px] md:w-[200px] opacity-90 animate-float"
            />
          </div>
        </div>

        {/* Sponser Slider */}
        <div
          className="relative bg-cover bg-center bg-no-repeat py-20 overlay-section"
          style={{
            backgroundImage: `url(/images/bg8.webp)`,
          }}
          id="sponsers"
        >
          <SponserSlider />
        </div>

        {/* Countdown */}
        <div
          className="relative bg-cover bg-center bg-no-repeat py-20 overlay-section"
          style={{
            backgroundImage: `url(/images/bg9.jpg)`,
          }}
        >
          <Countdown />
        </div>

        {/* Prize Pool */}
        <div
          className="relative bg-cover bg-center bg-no-repeat py-20 overlay-section"
          style={{
            backgroundImage: `url(https://imgur.com/XToGp7Q.jpg)`,
          }}
        >
          <PrizePool />
        </div>

        {/* Events */}
        <div
          className="relative bg-cover bg-center bg-no-repeat py-20 overlay-section"
          style={{
            backgroundImage: `url(/images/bg10.png)`,
          }}
          id="events"
        >
          <Event />
        </div>

        {/* FAQ */}
        <div
          className="relative bg-cover bg-center bg-no-repeat py-20 overlay-section"
          style={{
            backgroundImage: `url(/images/background_img2.jpg)`,
          }}
          id="FAQ's"
        >
          <Faq />
        </div>

        {/* Contact */}
        {/* <div
          className="relative bg-cover bg-center bg-no-repeat overlay-section"
          style={{
            backgroundImage: `url(/images/mysticalforest.webp)`,
          }}
        >
          <Contact />
        </div> */}

        {/* Footer */}
        <div
          className="relative bg-cover bg-center bg-no-repeat overlay-section"
          style={{
            backgroundImage: `url(/images/sky.jpg)`,
          }}
        >
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
