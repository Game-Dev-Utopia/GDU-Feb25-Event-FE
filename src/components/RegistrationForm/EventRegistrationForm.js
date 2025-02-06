import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRequest, postRequestJsonwithHeader } from "../../api/api";
import { toast } from "react-toastify";

const EventRegistrationForm = () => {
  const { eventID } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  const [formData, setFormData] = useState({
    teamName: "",
    teamemail: [],
    email: "",
  });

  useEffect(() => {
    // Get user email from local storage
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setUserEmail(storedEmail);
      setFormData({
        email: "", // Reset input field
        teamemail: [storedEmail], // Auto-add first member
        teamName: "",
      });
    } else {
      toast.error("User email not found. Please log in.", {
        position: "top-right",
      });
    }
  }, []);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const response = await getRequest(
          `/api/v1/events/getevent?eventId=${eventID}`
        );
        setEvent(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (eventID) {
      fetchEventDetails();
    }
  }, [eventID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTeamMember = () => {
    if (
      formData.email.trim() !== "" &&
      formData.email !== userEmail &&
      !formData.teamemail.includes(formData.email)
    ) {
      setFormData((prev) => ({
        ...prev,
        teamemail: [...prev.teamemail, formData.email],
        email: "", // Clear input after adding
      }));
    } else {
      toast.error("Invalid or duplicate email.", {
        position: "top-right",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (event?.typeOfevent?.toLowerCase() === "solo") {
      formData.teamemail = [userEmail]; // Ensure solo user is correctly set
    } else if (event?.typeOfevent?.toLowerCase() === "team") {
      if (formData.teamemail.length === 0) {
        toast.error("Please add team members!", { position: "top-right" });
        return;
      }
      if (formData.teamemail[0] !== userEmail) {
        toast.error("First team member must be your registered email.", {
          position: "top-right",
        });
        return;
      }
    }

    setRegistering(true);

    try {
      const response = await postRequestJsonwithHeader(
        `/api/v1/registration/eventregister?eventId=${eventID}`,
        formData
      );

      toast.success("Registration successful!", { position: "top-right" });
      setFormData({
        teamName: "",
        teamemail: [userEmail],
        email: "",
      });

      setTimeout(() => navigate("/"), 1000);
    } catch (error) {

      if (error.response) {
        const status = error.response.status;
        const errorMessage = error.response.data?.message || "Unknown error occurred.";
        toast.error(`${errorMessage}`, {
          position: "top-right",
        });
      } else {
        toast.error("Network error. Please try again later.", { position: "top-right" });
      }
    } finally {
      setRegistering(false);
    }
  };

  if (loading) return <div>Loading event details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>No event found</div>;

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center bg-cover bg-center pt-16 px-4 sm:px-8 md:px-16 font-playfair"
      style={{
        backgroundImage: `url('/images/dragondungeon.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-20 bg-goldenrod/5 p-6 rounded-lg max-w-md w-full shadow-lg border-2 border-deepCrimson sm:p-8 md:max-w-lg lg:max-w-xl">
        <div className="absolute inset-0 bg-black/60 rounded-lg z-0"></div>

        <div className="relative z-20">
          <h1 className="text-center text-2xl font-bold text-goldenrod mb-6 md:text-3xl lg:text-4xl">
            🛡️ Registration For {event.name} 🛡️
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {event?.typeOfevent?.toLowerCase() === "solo" ? (
              <>
                <label className="block text-xl font-semibold text-goldenrod">
                  Email:
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-deepCrimson text-lg text-white border border-deepCrimson rounded-md cursor-not-allowed"
                  value={userEmail}
                  readOnly
                />
              </>
            ) : (
              <>
                <label className="block text-xl font-semibold text-goldenrod">
                  Team Name:
                </label>
                <input
                  type="text"
                  name="teamName"
                  className="w-full px-4 py-2 bg-deepCrimson text-lg text-goldenrod border border-deepCrimson rounded-md placeholder:text-goldenrod focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={formData.teamName}
                  onChange={handleChange}
                  placeholder="Enter your team name"
                  required
                />

                <label className="block text-xl font-semibold text-goldenrod">
                  Team Members:
                </label>
                <ul className="mt-2 text-goldenrod">
                  <li className="text-goldenrod font-bold">1. {userEmail} (You)</li>
                  {formData.teamemail.slice(1).map((email, index) => (
                    <li key={index + 2} className="text-goldenrod">
                      {index + 2}. {email}
                    </li>
                  ))}
                </ul>

                {formData.teamemail.length < 5 && ( // Hide input if 5 members already added
                  <>
                    <label className="block text-xl font-semibold text-goldenrod">
                      Add Team Member Email:
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-2 bg-deepCrimson text-lg text-goldenrod border border-deepCrimson rounded-md placeholder:text-goldenrod focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        value={formData.email} // This will now always be empty
                        onChange={handleChange}
                        placeholder="Enter team member email"
                      />
                      <button
                        type="button"
                        className="px-4 py-2 bg-yellow-400 text-black font-bold rounded-md"
                        onClick={handleAddTeamMember}
                      >
                        +
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
            <button type="submit" className="w-full px-4 py-2 bg-goldenrod text-black font-bold rounded-md">
              {registering ? "Registering..." : "Embark on Quest"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventRegistrationForm;
