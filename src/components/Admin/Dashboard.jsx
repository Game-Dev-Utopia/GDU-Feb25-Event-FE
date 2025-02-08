import React, { useState, useEffect } from "react";
import { getRequest } from "../../api/api";
import { IoMdMenu, IoMdClose } from "react-icons/io"; // Sidebar toggle icons
import jsPDF from "jspdf";
import "jspdf-autotable";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [uniqueEvents, setUniqueEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getRequest(`/api/v1/admin`);
        setEvents(response || []);

        // Extract unique event names
        const uniqueEventNames = [...new Set(response.map((event) => event.eventname))];
        setUniqueEvents(uniqueEventNames);

        // Set first event as default selection
        if (uniqueEventNames.length > 0) {
          setSelectedEvent(uniqueEventNames[0]);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to fetch event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, []);

  // 📌 Function to Download Table as PDF
  const downloadPDF = () => {
    if (!selectedEvent) return;
    console.log("called")

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Event: ${selectedEvent} - Registered Users`, 14, 15);

    const tableData = events
      .filter((event) => event.eventname === selectedEvent)
      .flatMap((event) =>
        event.user
          ? [
              [
                event.user.fullname,
                event.user.email,
                event.user.contact,
                event.user.collegeName,
                event.user.year,
              ],
            ]
          : []
      );

    doc.autoTable({
      startY: 25,
      head: [["Name", "Email", "Contact", "College", "Year"]],
      body: tableData,
    });

    doc.save(`${selectedEvent}_RegisteredUsers.pdf`);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="md:hidden p-4 text-gray-800 bg-white shadow-lg flex items-center justify-between"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <IoMdClose size={28} /> : <IoMdMenu size={28} />}
        <span className="font-semibold text-lg">Events</span>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white p-5 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Events</h2>
        <ul className="space-y-2">
          {uniqueEvents.map((eventname) => (
            <li
              key={eventname}
              className={`p-3 rounded-lg cursor-pointer transition ${
                selectedEvent === eventname ? "bg-yellow-500 text-black" : "hover:bg-gray-700"
              }`}
              onClick={() => {
                setSelectedEvent(eventname);
                setSidebarOpen(false);
              }}
            >
              {eventname}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Event Dashboard</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading event details...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : selectedEvent ? (
          <div className="bg-white shadow-lg rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-gray-700">
                {selectedEvent} - Registered Users
              </h2>
              <button
                onClick={downloadPDF}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                Download PDF
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Contact</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">College</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
                  </tr>
                </thead>
                <tbody>
                  {events
                    .filter((event) => event.eventname === selectedEvent)
                    .flatMap((event) =>
                      event.user
                        ? [
                            <tr key={event.user.email} className="border-b border-gray-200">
                              <td className="border border-gray-300 px-4 py-2">{event.user.fullname}</td>
                              <td className="border border-gray-300 px-4 py-2">{event.user.email}</td>
                              <td className="border border-gray-300 px-4 py-2">{event.user.contact}</td>
                              <td className="border border-gray-300 px-4 py-2">{event.user.collegeName}</td>
                              <td className="border border-gray-300 px-4 py-2">{event.user.year}</td>
                            </tr>,
                          ]
                        : [
                            <tr key="no-users">
                              <td colSpan={5} className="text-center text-gray-500 p-2">
                                No users registered
                              </td>
                            </tr>,
                          ]
                    )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Select an event from the left sidebar.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
