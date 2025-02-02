import { useNavigate } from "react-router";
import { CloseButton, toast } from "react-toastify";
import { useState } from "react";
import { postRequestJsonwithHeader, postRequestNoToken, postRequestJson } from "../../api/api";
import { FaCross } from "react-icons/fa6";
import { FaRegWindowClose } from "react-icons/fa";

const ImageCard = ({
  eventId,
  title = "Untitled Event",
  description = "No description available.",
  bgUrl,
  imageUrl,
  typeOfevent,
  date,
  time,
  registrationFee = "Free",
  teamSize = "N/A",
  rules,
  venue = "Unknown Venue",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await postRequestJson("/api/v1/registration/register", JSON.stringify({ "eventId": eventId }));

      if (response) {
        navigate(`/register/${eventId}`);
      } else {
        throw new Error("Unexpected empty response from server");
      }
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response) {
        const status = error.response.status;
        const errorMessage = error.response.data?.message || "Unknown error occurred.";

        if (status === 401) {
          toast.error("Login first to register!", { position: "top-right" });

          setTimeout(() => navigate("/signin"));
        } else {
          toast.error(`Error: ${errorMessage}`, { position: "top-right" });
        }
      } else {
        toast.error("Network error. Please try again later.", { position: "top-right" });
      }
    }
  };




  return (
    <>
      <div
        className="relative overflow-hidden rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl w-[305px] h-[400px] animate-float"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main background image */}
        <img
          src={bgUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />

        {/* Overlay smaller placeholder */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/3 overflow-hidden rounded-lg shadow-xl">
          <img
            src={imageUrl.replace('224/320', '112/160')}
            alt={`${title} Overlay`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title & Truncated Description (Positioned Higher) */}
        <div className="absolute top-[59.5%] left-1/4 w-1/2 text-center">
          <p
            className="text-2xl font-bold uppercase tracking-wide"
            style={{
              color: "#8B0000", // Deep brown for contrast on golden bg
              textShadow:
                "2px 2px 6px rgba(0, 0, 0, 0.6), 1px 1px 4px rgba(255, 223, 0, 0.5)",

            }}
          >
            {title}
          </p>
          {/* <p className="text-black text-xs font-medium line-clamp-2 overflow-hidden">
            {description}
          </p> */}
        </div>

        {/* Hover Content - Read More Button */}
        <div
          className={`absolute bottom-[60px] left-0 right-0 p-2 flex items-center justify-center transition-all duration-300 transform ${isHovered ? "opacity-100 translate-y-[-20px]" : "opacity-0 translate-y-4"
            }`}
        >
          <button
            onClick={() => setisModalOpen(true)}
            className="bg-goldenrod text-deepCrimson font-bold px-3 py-1 text-sm rounded-md w-fit transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Read More
          </button>
        </div>




      </div>




      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-start justify-center z-50 overflow-y-auto font-cinzel mt-16 md:mt-12 p-2"
          onClick={() => setisModalOpen(false)}
        >
          <div
            className="w-full max-w-3xl h-90vh bg-[#2a1810] rounded-lg p-6 sm:p-8 mx-4 flex flex-col gap-8 relative mt-10"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `
              linear-gradient(45deg, #2a1810 25%, transparent 25%),
              linear-gradient(-45deg, #2a1810 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #3a2218 75%),
              linear-gradient(-45deg, transparent 75%, #3a2218 75%),
              radial-gradient(circle at 50% 50%, #321c14 0%, #2a1810 100%)`,
              backgroundSize: '24px 24px, 24px 24px, 24px 24px, 24px 24px, 100% 100%',
              backgroundPosition: '0 0, 0 12px, 12px -12px, -12px 0px, 0 0',
              boxShadow: `
              0 0 0 2px #8b4513,
              0 0 0 4px #654321,
              0 0 25px rgba(139, 69, 19, 0.6),
              inset 0 0 100px rgba(0, 0, 0, 0.8)`,
            }}
          >

            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-goldenrod text-3xl font-bold bg-transparent hover:text-red-500 focus:outline-none z-50"
              onClick={() => setisModalOpen(false)}
            >
              <FaRegWindowClose />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col lg:flex-row gap-8 text-goldenrod">
              {/* Image */}
              <div className="w-full lg:w-1/3 relative">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-amber-600/20 rounded-lg pointer-events-none"></div>
                  <img
                    src={bgUrl || `https://via.placeholder.com/600x300?text=${encodeURIComponent(title)}`}
                    alt={`${title} Expanded`}
                    className="rounded-lg w-full h-full object-cover border-4 border-deepCrimson/80 shadow-lg shadow-amber-900/40"
                  />
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 overflow-hidden rounded-lg shadow-xl">
                    <img
                      src={imageUrl.replace('224/320', '112/160')}
                      alt={`${title} Overlay`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-2/3 flex flex-col gap-6">
                <h2
                  className="text-5xl font-bold text-center lg:text-left"
                  style={{
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5), 0 0 8px rgba(255, 191, 0, 0.3)',
                  }}
                >
                  {title}
                </h2>
                <div className="relative">
                  <div className="absolute inset-0 bg-black/20 rounded-lg filter blur-sm"></div>
                  <p
                    className="relative text-lg leading-relaxed mb-6 text-center lg:text-left"
                    style={{
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    {description}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-black/40 to-black/10 rounded-lg border-2 border-deepCrimson/50 backdrop-blur-sm relative overflow-hidden text-goldenrod">

              <h4
                className="text-2xl font-bold  mb-4 relative text-center lg:text-left"
                style={{
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                }}
              >
                {title} Notes
              </h4>
              <div className="space-y-2  relative text-lg">
                {typeOfevent && <p className=" gap-2">
                  <span className="font-bold text-burntOrange">Event Type : </span> {typeOfevent}
                </p>}
                {teamSize && <p className=" gap-2">
                  <span className="font-bold text-burntOrange">Team Size : </span>{teamSize}
                </p>}
                <p className=" gap-2">
                  <span className="font-bold text-burntOrange">Registration Fee :</span> {registrationFee || "Free"}
                </p>

                {(venue && date && time && date.length > 0 && time.length > 0) ? (
                  <div className="gap-2">
                    <p className="font-bold text-burntOrange">Time & Venue:</p>
                    {date.map((d, index) => (
                      <p key={index} className="ml-4">
                        {new Date(d).toLocaleDateString()} at {time[index] || "TBA"}
                      </p>
                    ))}
                    <p className="mt-1">Venue: {venue}</p>
                  </div>
                ) :
                  <p className="items-center gap-2">
                    <span className="font-bold text-burntOrange">Venue :</span> {venue}
                  </p>
                }

                {rules.length > 0 &&
                  <p className="items-center gap-2">
                    <span className="font-bold text-burntOrange">Rules & Regulations :</span> {rules}
                  </p>
                }
              </div>
            </div>

            {/* Register Button */}
            <div className="mt-8 flex justify-center">
              <button
                className="px-6 py-3 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCard;
