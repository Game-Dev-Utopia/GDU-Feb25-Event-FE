import { useNavigate } from "react-router-dom";

import Sponser from "../components/Sponsers/Sponser";
import "../index.css";
import Event from "../components/Events/Event";
import Faq from "../components/FAQ/Faq";
import Footer from "../components/Footer/FooterPart"
import SponserSlider from "../components/Sponsers/SponserSlider";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
    
      <div className="w-screen h-screen overflow-y-scroll bg-goldenrod">
        {/* Home Banner */}
        <div className="relative text-white font-sans">
          {/* Background section with button */}
        <div className="absolute inset-0 bg-black/45 rounded-lg z-1"></div>

          <div
            className="bg-cover bg-center bg-no-repeat h-screen w-auto flex items-end justify-center"
            style={{
              backgroundImage:
                "url(/images/a2.webp)",
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
        <SponserSlider />

        {/*Events */}
        <Event />

        <Faq />

        <Sponser />

        <Footer />
      </div>
    

    
    </>
  );
};

export default Home;
