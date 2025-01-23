import React, { useState, useEffect } from "react";
import { getRequest } from "../../api/api";

const Profile = () => {
  const username = localStorage.getItem("username");
  const [userdata, setUserdata] = useState([]); // List of registered event IDs
  const [events, setEvents] = useState([]); // Detailed event data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (username) {
      const fetchEventDetails = async () => {
        try {
          setLoading(true);

          // Fetch list of registered events
          const response = await getRequest(
            `/api/v1/users/eventsregistered?username=${username}`
          );
          console.log("Fetched registered events:", response.events);

          setUserdata(response.events); // Save registered event IDs

          // Fetch event details for each event ID
          const eventDetailsPromises = response.events.map((eventId) =>
            getRequest(`/api/v1/events/getevent?eventId=${eventId}`) // Fetch each event's details
          );

          const eventsData = await Promise.all(eventDetailsPromises);
          console.log("Fetched event details:", eventsData);

          setEvents(eventsData); // Save detailed event data
        } catch (err) {
          console.error("Error fetching event details:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchEventDetails();
    } else {
      setLoading(false); // Stop loading if not logged in
    }
  }, [username]); // Re-run if username changes

  if (!username) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(/images/background_img2.jpg)`,
        }}
      >
        <h1 className="text-3xl md:text-5xl font-bold text-goldenrod">
          Please log in to view your registered events.
        </h1>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat py-20 font-cinzel overlay-section"
      style={{
        backgroundImage: `url(/images/background_img2.jpg)`,
      }}
    >
      {loading && <div className="text-center text-white">Loading event details...</div>}
      {error && <div className="text-center text-red-500">Error: {error}</div>}

      {!loading && events.length > 0 ? (
        <>
          <h1 className="mt-28 text-5xl md:text-6xl font-bold mb-5 text-center text-goldenrod">
            Your Registered Events
          </h1>
          <div className="p-4 md:p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="relative bg-black bg-opacity-70 shadow-lg rounded-lg p-5 hover:shadow-xl transition transform hover:scale-105"
                style={{
                  backdropFilter: "blur(5px)", // Adds a blur effect
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)", // Adds depth
                }}
              >
                <h2 className="text-xl font-semibold mb-3 text-yellow-400">{event.name}</h2>
                <p className="text-gray-200 mb-3">{event.description}</p>
                <p className="text-gray-400 mb-3">
                  Date: {new Date(event.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h5 className="text-center text-2xl text-goldenrod">No Registered Events</h5>
      )}
    </div>
  );
};

export default Profile;
