import React from "react";



const SponsorCard = () => {
    return (
      <div className="relative max-w-sm  rounded-2xl shadow-lg justify-center items-center">
        <img src = "https://previews.123rf.com/images/jevee/jevee1606/jevee160600218/58017514-hand-drawn-textured-floral-background-vintage-beige-card-with-roses-and-leaves-template-for-letter.jpg" alt = "sponsor"/>
        <div className="absolute inset-0 flex-col justify-center items-center p-auto my-auto mt-5 mx-auto max-w-xs" >
        <img src = "/logo192.png" alt = "sponsor" className="m-auto h-32 w-32"/>
            <div className="text-center">
                <h1 className="text-3xl font-serif font-bold text-deepCrimson">Sponsor</h1>
                <p className="p-3 text-deepCrimson font-serif ">Info about sponsor Lorem ipsum dolor sit amet </p>
            </div>
        </div>
      </div>
    );
  };


export default SponsorCard;
