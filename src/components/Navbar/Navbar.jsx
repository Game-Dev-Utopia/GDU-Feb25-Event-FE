import { Link } from "react-router-dom";
import MobileSidebar from "./MobileSidebar";
import { IoMdNotifications } from "react-icons/io";
import { useState } from "react";
import NotificationContainer from "./NotificationContainer";
const Navbar = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white/8 backdrop-blur-md fixed top-0 left-0 right-0 z-50 shadow-md border-b border-white/10 font-cinzel font-semibold">
      {/* Logo */}
      <Link to={"/"} className="text-3xl font-bold text-goldenrod">
        GDU
      </Link>

      {/* Navigation Links */}
      <ul className="md:flex hidden  items-center space-x-6 text-goldenrod">
        {["Home", "Sponsers", "Events", "About Us", "FAQ's"].map(
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
        {/* {console.log(localStorage.getItem("accessToken"))} */}
        {localStorage.getItem("accessToken") ? (
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
            <Link to="/logout">
              <button className="px-4 py-2 bg-goldenrod text-deepCrimson font-bold rounded-full transition text-xl">
                Logout
              </button>
            </Link>
          </div>
        ) : (
          <Link to="/signin">
            <button className="px-4 py-2 bg-goldenrod text-deepCrimson font-bold rounded-full transition text-xl">
              Login
            </button>
          </Link>
        )}
      </div>
      <div className="md:hidden flex items-center gap-10">
        {localStorage.getItem("accessToken") && (
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
