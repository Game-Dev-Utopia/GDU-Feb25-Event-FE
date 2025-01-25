import { useEffect, useState, useRef } from "react";
import { getRequest } from "../../api/api";

const NotificationContainer = ({ isOpen, setIsNotificationOpen }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  const fetchNotifications = async () => {
    try {
      const response = await getRequest(
        `/api/v1/users/notification?username=${localStorage.getItem(
          "username"
        )}`
      );
      const eventidArr = response.eventdetail.map((event) => event.eventid);
      const eventDetails = await Promise.all(
        eventidArr.map(async (eventId) => {
          const event = await getRequest(
            `/api/v1/events/getevent?eventId=${eventId}`
          );
          return event;
        })
      );
      const processedData = eventDetails.map((event, index) => ({
        title: event.name,
        remainingTime: response.eventdetail[index].remainingTime,
        eventid: event.eventid,
        description: event.description,
      }));
      setNotifications(processedData);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
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
      <ul className="divide-y divide-white divide-opacity-20 flex flex-col gap-2 mt-2">
        {notifications.map((notification, index) => (
          <li key={index} className="py-2">
            <div className="flex items-center justify-between">
              <h5 className="text-md md:text-xl">{notification.title}</h5>
              <p className="text-sm">
                {notification.remainingTime ?? "Some"} days left
              </p>
            </div>
            <p className="text-[10px] text-gray-300 line-clamp-2">
              {notification.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationContainer;
