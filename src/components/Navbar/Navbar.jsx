import { Link, useNavigate } from "react-router-dom";
import MobileSidebar from "./MobileSidebar";
import { IoMdNotifications } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import NotificationContainer from "./NotificationContainer";
import { postRequestJson } from "../../api/api";
import { sidebarLinks } from "./links";

const Navbar = () => {
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("username")
  );
  const notificationRef = useRef(null);
  const notificationButtonRef = useRef(null); // Ref for the button

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem("username"));
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        notificationButtonRef.current &&
        !notificationButtonRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    if (isNotificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationOpen]);

  const handleLogout = async () => {
    localStorage.removeItem("username");
    const response = await postRequestJson(`/api/v1/users/logout`);

    console.log(response);
    const authEvent = new Event("authChange");
    window.dispatchEvent(authEvent);

    navigate("/");
  };

  const handleNotificationClick = (event) => {
    event.stopPropagation(); // Prevents click from triggering document event
    setIsNotificationOpen((prev) => !prev);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-black fixed top-0 left-0 right-0 z-50 shadow-md border-b border-white/10 font-cinzel font-semibold">
      {/* Logo */}
      <Link to={"/"} className="text-3xl font-extrabold text-burntOrange">
        GDU
      </Link>

      {/* Navigation Links */}
      <ul className="md:flex hidden items-center space-x-6 text-burntOrange">
        {sidebarLinks.map((item, index) => (
          <li key={index} className="relative group">
            <a
              href={item.url}
              className="relative z-10 text-burntOrange hover:deepCrimson transition text-xl font-bold"
            >
              {item.name}
            </a>
            <span className="absolute inset-0 bg-burntOrange opacity-0 blur-lg rounded-lg group-hover:opacity-50 transition duration-300"></span>
          </li>
        ))}
        {isLoggedIn && (
          <li className="relative group">
            <Link
              to="/profile"
              className="relative z-10 text-burntOrange hover:deepCrimson transition text-xl"
            >
              Profile
            </Link>
            <span className="absolute inset-0 bg-burntOrange opacity-0 blur-lg rounded-lg group-hover:opacity-50 transition duration-300"></span>
          </li>
        )}
      </ul>

      {/* Call-to-Action Button */}
      <div className="md:flex hidden">
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <button
              ref={notificationButtonRef}
              className="bg-black p-2 border border-3 border-burntOrange text-white font-bold rounded-full 
             transition text-xl shadow-lg shadow-burntOrange/50 hover:shadow-xl hover:shadow-burntOrange 
             hover:bg-burntOrange hover:text-black"
              onClick={handleNotificationClick}
            >
              <IoMdNotifications className="size-6" />
            </button>
            <div ref={notificationRef}>
              <NotificationContainer
                isOpen={isNotificationOpen}
                setIsOpen={setIsNotificationOpen}
              />
            </div>
            <button
              className="px-4 py-2 bg-black border border-3 border-burntOrange text-white font-bold rounded-full transition text-xl"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/signin">
            <button
              className="px-4 py-2 bg-black border border-3 border-burntOrange text-white font-bold rounded-full 
             transition text-xl shadow-lg shadow-burntOrange/50 hover:shadow-xl hover:shadow-burntOrange 
             hover:bg-burntOrange hover:text-black"
            >
              Login
            </button>
          </Link>
        )}
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex items-center gap-10">
        {isLoggedIn && (
          <button
            ref={notificationButtonRef}
            className="bg-black p-2 border border-3 border-burntOrange text-white font-bold rounded-full 
             transition text-xl shadow-lg shadow-burntOrange/50 hover:shadow-xl hover:shadow-burntOrange 
             hover:bg-burntOrange hover:text-black"
            onClick={handleNotificationClick}
          >
            <IoMdNotifications className="size-6" />
          </button>
        )}
        <MobileSidebar />
      </div>
    </nav>
  );
};

export default Navbar;
