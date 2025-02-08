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
        // console.log("Fetched response:", response); // Log the response for debugging
        if (Array.isArray(response)) {
          setCards(response); // Update cards if response is an array
        } else {
          setError("Unexpected response format."); // Handle unexpected response
        }
      } catch (err) {
        // console.error("Error fetching events:", err); // Log error
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
      <div className="flex flex-col items-center w-full space-y-6 md:space-y-0 mx-auto font-cinzel">
        {/* First Row (3 Cards in One Line) */}
        <div className="flex flex-col md:flex-row justify-between w-full md:w-[90%]">
          {cards.slice(0, 3).map((card, index) => (
            <motion.div
              key={index}
              className="w-full md:w-[30%] px-2 flex justify-center" // Centered on mobile
              initial={{ opacity: 0, x: -50, y: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut", repeatType: "reverse" }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <ImageCard
                eventId={card._id}
                title={card.name || "Untitled Event"}
                tag={card.tag || ""}
                description={card.description || "No description available."}
                registrationFee={card.registrationFee || "Free"}
                typeOfevent={card.typeOfevent}
                teamSize={card.teamSize}
                date={card.date}
                venue={card.venue}
                time={card.time}
                rules={card.rules}
                bgUrl={"/images/events/gold.jpg"}
                modalImageUrl={card.imageUrl || "/images/events/dungeon_devs_logo.png"}
                imageUrl={card.imageUrl || "/images/events/dungeon_devs_logo.png"}
                placeholderText={card.placeholderText || "Dynamic Text Here"}
                speaker={card.speaker}
              />
            </motion.div>
          ))}
        </div>

        {/* Second Row (2 Cards Staggered Between First Row) */}
        <div className="flex flex-col md:flex-row justify-between w-full md:w-[70%] mt-4">
          {cards.slice(3, 5).map((card, index) => (
            <motion.div
              key={index}
              className="w-full md:w-[45%] px-2 flex justify-center" // Centered on mobile
              initial={{ opacity: 0, x: -50, y: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: (index + 3) * 0.1, ease: "easeOut", repeatType: "reverse" }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <ImageCard
                eventId={card._id}
                title={card.name || "Untitled Event"}
                tag={card.tag || ""}
                description={card.description || "No description available."}
                registrationFee={card.registrationFee || "Free"}
                typeOfevent={card.typeOfevent}
                teamSize={card.teamSize}
                date={card.date}
                venue={card.venue}
                time={card.time}
                rules={card.rules}
                bgUrl={"/images/events/gold.jpg"}
                modalImageUrl={card.imageUrl || "/images/events/dungeon_devs_logo.png"}
                imageUrl={card.imageUrl || "/images/events/dungeon_devs_logo.png"}
                placeholderText={card.placeholderText || "Dynamic Text Here"}
                speaker={card.speaker}
              />
            </motion.div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default ImageCardGrid;
