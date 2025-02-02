import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import { getRequest } from "../../api/api";
import { motion } from "framer-motion"

const ImageCardGrid = () => {
  const [cards, setCards] = useState([]); // Cards data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state
        const response = await getRequest(`/api/v1/events/getallevents`);
        console.log("Fetched response:", response); // Log the response for debugging
        if (Array.isArray(response)) {
          setCards(response); // Update cards if response is an array
        } else {
          setError("Unexpected response format."); // Handle unexpected response
        }
      } catch (err) {
        console.error("Error fetching events:", err); // Log error
        setError("Failed to fetch event details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, []); // Empty dependency array to fetch data only once

  // Conditional rendering
  if (loading)
    return <div className="text-center text-xl">Loading event details...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (cards.length === 0)
    return <div className="text-center text-xl">No events found.</div>;

  return (
    <div className="container mx-auto p-4 sm:p-8 " id="events">
      <div className="text-center mb-16 text-6xl font-bold font-cinzel text-burntOrange">
        Events
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center justify-center mx-auto place-items-center font-cinzel">

        {cards.map((card, index) => (
         <motion.div
         key={index}
         className="relative overflow-hidden"
         initial={{ opacity: 0, x: -50, y: 50 }} // Starts hidden from left & below
         whileInView={{ opacity: 1, x: 0, y: 0 }} // Moves to normal position
         exit={{ opacity: 0, x: -50, y: 0 }} // Moves left when disappearing
         animate={{ y: [0, -10, 0] }} // Floating animation effect
         transition={{
           duration: 0.6,
           delay: index * 0.1,
           ease: "easeOut",
          //  repeat: Infinity, // Infinite floating animation
           repeatType: "reverse", // Moves up and down smoothly
         }}
         viewport={{ once: false, amount: 0.2 }} // Allows animation on both scroll down & up
       >
            <ImageCard
              eventId={card._id}
              title={card.name || "Untitled Event"}
              description={card.description || "No description available."}
              registrationFee={card.registrationFee || "Free"}
              typeOfevent={card.typeOfevent}
              teamSize={card.teamSize}
              date={card.date}
              venue={card.venue}
              time={card.time}
              rules={card.rules}
              bgUrl={"/images/events/gold.jpg"}
              modalImageUrl={
                card.imageUrl || "/images/events/dungeon_devs_logo.png"
              }
              imageUrl={card.imageUrl || "/images/events/dungeon_devs_logo.png"}
              placeholderText={card.placeholderText || "Dynamic Text Here"}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImageCardGrid;
