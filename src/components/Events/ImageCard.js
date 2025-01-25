import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useState } from "react";
import { postRequestJsonwithHeader } from "../../api/api";

const ImageCard = ({
  eventId,
  title = "Untitled Event",
  description = "No description available.",
  bgUrl,
  imageUrl,
  typeOfevent,
  date,
  registrationFee = "Free",
  teamSize = "N/A",
  rules,
  venue = "Unknown Venue",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await postRequestJsonwithHeader('/api/v1/registration/register');
      if (response) navigate(`/register/${eventId}`);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Login first to register!", { position: "top-right" });
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        toast.error(
          `An error occurred: ${error.response?.data?.message || "Unknown error"}`,
          { position: "top-right" }
        );
      }
    }
  };

  return (
    <>
      <div
        className="relative overflow-hidden rounded-lg transition-all duration-300 h-[320px] shadow-lg hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main background image */}
        <img
          src={bgUrl}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Overlay smaller placeholder */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 overflow-hidden rounded-lg shadow-xl">
          <img
            src={imageUrl.replace('224/320', '112/160')}
            alt={`${title} Overlay`}
            className="w-full h-full object-cover"
          />
          {/* Removed the border div */}
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 h-1/2 bg-black bg-opacity-85 transition-opacity duration-300 ${isHovered ? 'opacity-75' : 'opacity-0'
            }`}
        />

        <div
          className={`absolute bottom-0 left-0 right-0 h-1/2 p-6 flex flex-col justify-end  transition-all duration-300 transform ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          <h3 className="text-2xl font-bold mb-1 text-burntOrange">{title}</h3>
          <p className="text-lg mb-2 line-clamp-3 text-silver">{description}</p>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-goldenrod text-deepCrimson px-4 py-2 rounded-md w-fit  transition-colors duration-200"
          >
            Read More
          </button>
        </div>
      </div>

      {/* Modal remains unchanged */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-start justify-center z-50 overflow-y-auto p-4  mt-10 font-cinzel"
          onClick={() => setIsOpen(false)}
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
              radial-gradient(circle at 50% 50%, #321c14 0%, #2a1810 100%)
            `,
              backgroundSize: '24px 24px, 24px 24px, 24px 24px, 24px 24px, 100% 100%',
              backgroundPosition: '0 0, 0 12px, 12px -12px, -12px 0px, 0 0',
              boxShadow: `
              0 0 0 2px #8b4513,
              0 0 0 4px #654321,
              0 0 25px rgba(139, 69, 19, 0.6),
              inset 0 0 100px rgba(0, 0, 0, 0.8)
            `,
            // backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfuk6TZuvwgjp1Oko5UkT6Y8mbPrUhDoroQQ&s')`,
            // backgroundSize: 'cover'
            }}
          >
            {/* Modal Content */}
            <div className="flex flex-col lg:flex-row gap-8 text-goldenrod">
              {/* Image */}
              <div className="w-full lg:w-1/3 relative">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-amber-600/20 rounded-lg pointer-events-none"></div>
                  <img
                    src={bgUrl || `https://via.placeholder.com/600x300?text=${encodeURIComponent(title)}`}
                    alt={`${title} Expanded`}
                    className="rounded-lg w-full object-cover border-4 border-deepCrimson/80 shadow-lg shadow-amber-900/40"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-2/3 flex flex-col gap-6">
                <h2
                  className="text-5xl font-bold text-center lg:text-left "
                  style={{
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5), 0 0 8px rgba(255, 191, 0, 0.3)',
                  }}
                >
                  {title}
                </h2>

                <div className="relative">
                  <div className="absolute inset-0 bg-black/20 rounded-lg filter blur-sm"></div>
                  <p
                    className="relative  text-lg leading-relaxed  mb-6 text-center lg:text-left"
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
                    <p className=" gap-2">
                      <span className="font-bold text-burntOrange">Event Type : </span> {typeOfevent}
                    </p>
                    <p className=" gap-2">
                      <span className="font-bold text-burntOrange">Team Size : </span>{teamSize}
                    </p>
                    <p className=" gap-2">
                      <span className="font-bold text-burntOrange">Registration Fee :</span> {registrationFee || "Free"}
                    </p>
                    {venue &&
                      <p className=" gap-2">
                        <span className="font-bold text-burntOrange">Time & Venue :</span> {venue}
                      </p>
                    }
                    {rules &&
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
