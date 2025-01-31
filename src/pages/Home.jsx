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

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="w-screen h-screen overflow-y-scroll overflow-x-hidden bg-goldenrod"
        id="home"
      >
        {/* Home Banner */}
        <div className="relative text-white font-sans">
          {/* Background section with button */}
          <div
            className="relative bg-cover bg-center bg-no-repeat h-screen w-full flex items-end justify-center overlay-section"
            style={{
              backgroundImage: `url(/images/a2.webp)`,
            }}
          >
            <button
              onClick={() => navigate("/Intro")}
              className="bg-yellow-500 text-blue-900 px-7 py-3 rounded hover:bg-yellow-600 mb-10"
            >
              Join Us
            </button>
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
        <div
          className="relative bg-cover bg-center bg-no-repeat overlay-section"
          style={{
            backgroundImage: `url(/images/mysticalforest.webp)`,
          }}
        >
          <Contact />
        </div>

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
