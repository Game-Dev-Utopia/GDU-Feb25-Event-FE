import React, { useState, useEffect } from "react";
import { getRequest } from "../../api/api";

const Profile = () => {
    const username = localStorage.getItem("username");
    const [userdata, setUserdata] = useState([]); // List of registered event IDs
    const [events, setEvents] = useState([]); // Detailed event data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
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
    }, [username]); // Re-run if username changes



    return (
        <div className="relative w-screen h-screen  bg-cover bg-center bg-no-repeat py-20 overlay-section font-cinzel " style={{
            backgroundImage: `url(/images/background_img2.jpg)`,
        }}>
            {loading && <div>Loading event details...</div>}
            {error && < div > Error: {error}</div>}

            <h1 className="mt-28 text-5xl md:tetx-6xl font-bold mb-5 text-center text-goldenrod">Your Registered Events</h1>
            <div className="p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div
                    key={event.id}
                    className="relative bg-black bg-opacity-70 shadow-lg rounded-lg p-5 hover:shadow-xl transition backdrop-blur-lg hover:scale-105"
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
                    {/* <button className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                      View Details
                    </button> */}
                  </div>
                  
                ))}
            </div>
        </div >
    );
};

export default Profile;
