import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MobileSidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");

    const authEvent = new Event("authChange");
    window.dispatchEvent(authEvent);

    navigate("/");
  };

  return (
    <div className="md:hidden block">
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-20 bg-goldenrod p-2 rounded-lg shadow-md transition duration-300"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/6015/6015685.png"
          alt="Menu"
          className="w-6 h-6"
        />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 max-w-[280px] w-full h-screen bg-gray-900/80 backdrop-blur-md shadow-lg transform transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-40`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 bg-deepCrimson py-2 px-3 rounded-full text-goldenrod transition"
        >
          ✕
        </button>

        {/* Navigation Links */}
        <ul className="flex flex-col items-center justify-center h-full space-y-6">
          {["Home", "Sponsers", "Events", "FAQ's", "Contact Us" ].map(
            (item, index) => (
              <li key={index} className="relative group w-full">
                <Link
                  to="/"
                  className="block z-20 text-2xl text-goldenrod py-2 px-6 rounded-md text-center hover:text-red-400 transition duration-300"
                  onClick={() => setIsOpen(false)} // Close sidebar when navigating
                >
                  {item}
                </Link>
                {/* Glow Effect */}
                {/* <span className="absolute z-[-1] inset-0 bg-red-500 opacity-0 blur-xl rounded-md group-hover:opacity-50 transition duration-300"></span> */}
              </li>
            )
          )}
          {isLoggedIn && (
            <>
              <li className="relative group w-full">
                <Link
                  to="/profile"
                  className="block z-20 text-2xl text-goldenrod py-2 px-6 rounded-md text-center hover:text-red-400 transition duration-300"
                  onClick={() => setIsOpen(false)} // Close sidebar when navigating
                >
                  Profile
                </Link>
               
                {/* <span className="absolute z-[-1] inset-0 bg-red-500 opacity-0 blur-xl rounded-md group-hover:opacity-50 transition duration-300"></span> */}
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block px-4 z-20 py-2 bg-goldenrod text-deepCrimson font-bold rounded-full transition text-2xl"
                >
                  Logout
                </button>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <li className="relative group w-full">
              <Link
                to="/signin"
                className="block  px-4 py-2 bg-goldenrod text-deepCrimson font-bold rounded-full transition text-2xl text-center"
                onClick={() => setIsOpen(false)} // Close sidebar when navigating
              >
                Login
              </Link>
              {/* Glow Effect */}
              {/* <span className="absolute z-[-1] inset-0 bg-red-500 opacity-0 blur-xl rounded-md group-hover:opacity-50 transition duration-300"></span> */}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MobileSidebar;
