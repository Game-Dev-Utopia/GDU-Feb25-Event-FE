import React from "react";
import {
  FaCopyright,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

function FooterPart() {
  return (
    <footer>
      {/* Footer Background with Dark Overlay */}
      <div
        className="relative w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/footerBg.jpg')", // Replace with your image path
          height: "70vh",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content on Image */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white px-4 md:px-20">
          <h2 className="text-2xl md:text-4xl font-cinzel text-center leading-snug">
            ENTER THE GAME, <br /> CONQUER THE WORLD!
          </h2>
          <button className="bg-yellow-600 text-black px-6 py-2 mt-5 rounded-md w-40 md:w-48 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 hover:opacity-80">
            KNOW MORE
          </button>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="w-full bg-black text-white py-4 px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm md:text-base">
          {/* Branding */}
          <div className="mb-2 md:mb-0">
            <span>Game Development Utopia</span>
          </div>

          {/* Copyright */}
          <div className="flex gap-1 items-center mb-2 md:mb-0">
            <FaCopyright className="text-sm md:text-lg" />
            <span>2025 Copyright reserved.</span>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <FaFacebookF className="text-lg hover:text-yellow-400 cursor-pointer" />
            <FaTwitter className="text-lg hover:text-yellow-400 cursor-pointer" />
            <FaInstagram className="text-lg hover:text-yellow-400 cursor-pointer" />
            <FaWhatsapp className="text-lg hover:text-yellow-400 cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterPart;
