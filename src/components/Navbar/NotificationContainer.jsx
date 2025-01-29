import { useEffect, useState, useRef } from "react";
import { getRequest } from "../../api/api";

const NotificationContainer = ({ isOpen, setIsNotificationOpen }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("username"));
  const containerRef = useRef(null);
  const hasFetched = useRef(false); // ✅ Ensures notifications are fetched only once

  const fetchNotifications = async () => {
    if (!isLoggedIn || hasFetched.current) return; // ✅ Prevents multiple requests

    hasFetched.current = true; // ✅ Ensures it runs only once

    try {
      const response = await getRequest(
        `/api/v1/users/notification?username=${localStorage.getItem("username")}`
      );
      console.log(response)

      if (response.message === "No events registered for the user.") {
        setNotifications([]);
        return;
      }

      // const eventidArr = response.eventdetail.map((event) => event.eventid);

      // const eventDetails = await Promise.all(
      //   eventidArr.map(async (eventId) => {
      //     const event = await getRequest(`/api/v1/events/getevent?eventId=${eventId}`);
      //     return event;
      //   })
      // );

      // console.log(eventDetails);

      // const processedData = eventDetails.map((event, index) => {
      //   console.log(event.date)
      //   const firstDate = event.date?.[0]; // ✅ Extract first date correctly
      //   let remainingTime = "Date not available";

      //   if (firstDate) {
      //     const eventDate = new Date(firstDate);
      //     const now = new Date();
      //     const diffMs = eventDate - now;

      //     if (diffMs > 0) {
      //       const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      //       const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      //       const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      //       remainingTime = `${days}d ${hours}h ${minutes}m remaining`;
      //     } else {
      //       remainingTime = "Event has started or passed";
      //     }
      //   }

      //   return {
      //     title: event.name,
      //     remainingTime,
      //     eventid: event.eventid,
      //     description: event.description,
      //   };
      // });
      const processedData = response.eventdetail;
      setNotifications(processedData);
      // setNotifications([]);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications(); // ✅ Runs only once due to `hasFetched` ref
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute w-[250px] md:w-[300px] text-left right-2 top-12 max-h-60 overflow-y-scroll bg-deepCrimson text-white p-4 rounded-lg shadow-lg transition-transform duration-300 ${
        isOpen
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-[-20px] scale-95"
      }`}
    >
      <h4 className="text-lg font-semibold">Notifications</h4>
      {loading ? (
        <p className="text-center mt-4">Loading...</p>
      ) : notifications.length === 0 ? (
        <p className="text-center mt-4 text-sm text-gray-300">No notifications</p>
      ) : (
        <ul className="divide-y divide-white divide-opacity-20 flex flex-col gap-2 mt-2">
          {notifications.map((notification, index) => (
            <li key={index} className="py-2">
              <div className="flex items-center justify-between">
                <h5 className="text-md md:text-xl">{notification.eventname}</h5>
                <p className="text-sm">
                  {notification.remainingTime ?? "Some"} 
                </p>
              </div>
              <p className="text-[10px] text-gray-300 line-clamp-2">
                {notification.eventdesc}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationContainer;
