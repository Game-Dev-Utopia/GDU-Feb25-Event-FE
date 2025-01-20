import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import { getRequest } from "../../api/api";

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
  if (loading) return <div className="text-center text-xl">Loading event details...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (cards.length === 0) return <div className="text-center text-xl">No events found.</div>;

  return (
    <div className="container mx-auto p-16">
      <div className="text-center mb-16 text-6xl font-bold font-cinzel text-goldenrod">
        Events
      </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <ImageCard
              key={index}
              eventId = {card._id}
              title={card.name || "Untitled Event"}
              description={card.description || "No description available."}
              registrationFee={card.registrationFee || "Free"}
              typeOfevent = {card.typeOfevent}
              teamSize = {card.teamSize}
              date = {card.date}
              venue = {card.venue}
              rules= {card.rules}
              bgUrl={ "/scroll1.jpg"} 
              modalImageUrl={card.modalImageUrl || "dragon.png"}
              imageUrl={card.imageUrl || "dragon.png"}
            />
          ))}
        </div>

      </div>
    
  );
};

export default ImageCardGrid;
