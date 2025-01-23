import { Link, useNavigate } from "react-router-dom";
import MobileSidebar from "./MobileSidebar";
import { IoMdNotifications } from "react-icons/io";
import { useState, useEffect } from "react";
import NotificationContainer from "./NotificationContainer";

const Navbar = () => {
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );

  useEffect(() => {
    // Function to listen for auth changes via a custom event
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    };

    // Listen for changes in auth status via a custom event
    window.addEventListener("authChange", handleAuthChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const triggerAuthChange = () => {
    const authEvent = new Event("authChange");
    window.dispatchEvent(authEvent);
  };

  const handleLogout = () => {
    // Remove tokens and user info from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");

    // Trigger the custom event for auth changes
    triggerAuthChange();

    // Redirect to the home page
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white/8 backdrop-blur-md fixed top-0 left-0 right-0 z-50 shadow-md border-b border-white/10 font-cinzel font-semibold">
      {/* Logo */}
      <Link to={"/"} className="text-3xl font-bold text-goldenrod">
        GDU
      </Link>

      {/* Navigation Links */}
      <ul className="md:flex hidden items-center space-x-6 text-goldenrod">
        {["Home", "Sponsors", "Events", "About Us", "FAQ's"].map(
          (item, index) => (
            <li key={index} className="relative group">
              <Link
                to={`#${item}`}
                className="relative z-10 text-goldenrod hover:deepCrimson transition text-xl"
              >
                {item}
              </Link>
              {/* Glow Effect */}
              <span className="absolute inset-0 bg-goldenrod opacity-0 blur-lg rounded-lg group-hover:opacity-50 transition duration-300"></span>
            </li>
          )
        )}
      </ul>

      {/* Call-to-Action Button */}
      <div className="md:flex hidden">
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <button
              className="p-2 bg-goldenrod text-deepCrimson rounded-full transition relative"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <IoMdNotifications className="size-6" />
              <NotificationContainer
                isOpen={isNotificationOpen}
                setIsOpen={setIsNotificationOpen}
              />
            </button>

            <button
              className="px-4 py-2 bg-goldenrod text-deepCrimson font-bold rounded-full transition text-xl"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/signin">
            <button className="px-4 py-2 bg-goldenrod text-deepCrimson font-bold rounded-full transition text-xl">
              Login
            </button>
          </Link>
        )}
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex items-center gap-10">
        {isLoggedIn && (
          <button
            className="p-2 bg-goldenrod text-deepCrimson rounded-full transition relative"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          >
            <IoMdNotifications className="size-6" />
            <NotificationContainer
              isOpen={isNotificationOpen}
              setIsOpen={setIsNotificationOpen}
            />
          </button>
        )}
        <MobileSidebar />
      </div>
    </nav>
  );
};

export default Navbar;
