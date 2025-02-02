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
      className="relative w-full h-[50vh] bg-cover bg-center font-cinzel font-semibold"
      style={{
       
        height: "50vh",
      }}
    >
      {/* Avatar Image */}
      <div className="absolute inset-0 flex justify-center items-center">
        <img
          src="/images/beastmaster.png" // Replace with your avatar image path
          alt="Avatar"
          className="h-96 w-96 shadow-lg"
        />
      </div>

      {/* Content on Image */}
      {/* <div className="relative z-10 flex flex-col justify-center items-center h-full text-goldenrod px-4 md:px-20">
        <h2 className="text-2xl md:text-4xl font-cinzel text-center leading-snug">
          ENTER THE GAME, <br /> CONQUER THE WORLD!
        </h2>
        <button className="bg-yellow-600 text-black px-6 py-2 mt-5 rounded-md w-40 md:w-48 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 hover:opacity-80">
          KNOW MORE
        </button>
      </div> */}

      {/* Footer Line Over Image */}
      <div className="absolute bottom-0 w-full text-burntOrange bg-black bg-opacity-50 py-4 px-6 text-2xl">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm md:text-base">
          {/* Social Icons */}

          {/* Branding */}
          <div className="text-center md:text-right font-playfair">
            {/* <img src='/images/Gdulogo.png' className="h-5 w-5" /> */}
            <span>GameDevUtopia</span>
          </div>

          

          {/* Copyright */}
          <div className="flex items-center gap-1 mb-2 md:mb-0">
            <FaCopyright className="text-sm md:text-lg" />
            <span>Copyright 2025 | All rights reserved</span>
          </div>

          <div className="flex gap-4 mb-2 md:mb-0">
            <a href="" ><FaFacebookF className="text-lg hover:text-yellow-400 cursor-pointer" /></a>
           <a href=""> <FaTwitter className="text-lg hover:text-yellow-400 cursor-pointer" /></a>
           <a href=""> <FaInstagram className="text-lg hover:text-yellow-400 cursor-pointer" /></a>
            <a href=""><FaWhatsapp className="text-lg hover:text-yellow-400 cursor-pointer" /></a>
          </div>

          
        </div>
      </div>
    </div>
  </footer>
  );
}

export default FooterPart;
