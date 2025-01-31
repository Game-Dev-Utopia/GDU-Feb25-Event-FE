import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRequest, postRequestJsonwithHeader } from '../../api/api';
import { toast } from 'react-toastify';

const EventRegistrationForm = () => {
  const { eventID } = useParams(); // Correctly extract eventID
  const navigate = useNavigate();
  const [event, setEvent] = useState(null); // Fetched event details
  const [loading, setLoading] = useState(true); // Loading state
  const [registering, setRegistering] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const [formData, setFormData] = useState({
    teamName: "",
    teamemail: [],
    email: "",
  });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const response = await getRequest(`/api/v1/events/getevent?eventId=${eventID}`);
       
        setEvent(response); // Update state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (eventID) {
      fetchEventDetails();
    }
  }, [eventID]); // Only re-run when eventID changes

  // Add a second useEffect to debug state updates
  useEffect(() => {
    if (event) {
      
    }
  }, [event]);




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddTeamMember = () => {
    if (formData.email) {
      setFormData((prev) => ({
        ...prev,
        teamemail: [...prev.teamemail, formData.email],
        email: "",
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (event?.typeOfevent?.toLowerCase() === "solo") {
      formData.teamemail = [formData.email];
    
    } else if (event?.typeOfevent?.toLowerCase() === "team")      {
      if(formData.teamemail.length === 0){
        toast.error("Please add team members!", { position: "top-right" });
        return;
      }
    
    }
    setRegistering(true);
    try {

      const token = localStorage.getItem("accessToken");
      const response = await postRequestJsonwithHeader(`/api/v1/registration/eventregister?eventId=${eventID}`, formData);



      if (response) {
        toast.success("Registration successful!", { position: "top-right" });
        setFormData({
          teamName: "",
          teamemail: [],
          email: "",
        });
        setTimeout(() => navigate("/"), 2000); // Redirect to /home
      } else {
        const errorData = await response.json();
        toast.error(`Registration failed: ${errorData.message || "Unknown error"}`, {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error(
        "An error occurred while Registering. Please try again later.",
        { position: "top-right" }
      );
    }
    finally{
      setRegistering(false);
    }




  };

  if (loading) return <div>Loading event details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>No event found</div>;
  return (<div
    className="relative h-screen w-full flex flex-col items-center justify-center bg-cover bg-center pt-16 px-4 sm:px-8 md:px-16 font-playfair"
    style={{ backgroundImage: `url('/images/dragondungeon.webp')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
  >
    {/* Form Container */}
    <div className="relative z-20 bg-goldenrod/5 p-6 rounded-lg max-w-md w-full shadow-lg border-2 border-deepCrimson sm:p-8 md:max-w-lg lg:max-w-xl">
      {/* Dark Overlay for Form Background */}
      <div className="absolute inset-0 bg-black/60 rounded-lg z-0"></div>

      <div className="relative z-20">
        {/* Form Title */}
        <h1 className="text-center text-2xl font-bold text-goldenrod mb-6 md:text-3xl lg:text-4xl">🛡️ Registration For {event.name} 🛡️ </h1>

        {/* Form Elements */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {event.typeOfevent === "solo" || event.typeOfevent === "Solo" ? (
            <>
              {/* Solo Event */}
              <label htmlFor="email" className="block text-xl font-semibold text-goldenrod z-20">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 bg-deepCrimson text-lg text-goldenrod border border-deepCrimson rounded-md placeholder:text-goldenrod focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={formData.email}
                maxLength="50"
                onChange={handleChange}
                placeholder="example@realm.com"
                required
              />
            </>
          ) : (
            <>
            {/* Team Event */}
            <label htmlFor="teamName" className="block text-xl font-semibold text-goldenrod z-20">
              Team Name:
            </label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              maxLength="50"
              className="w-full px-4 py-2 bg-deepCrimson text-lg text-goldenrod border border-deepCrimson rounded-md placeholder:text-goldenrod focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.teamName}
              onChange={handleChange}
              placeholder="Enter your team name"
              required
            />
          
            <label htmlFor="email" className="block text-xl font-semibold text-goldenrod z-20">
              Team Member Email:
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="email"
                id="email"
                name="email"
                maxLength="50"
                className="flex-grow px-4 py-2 bg-deepCrimson text-lg text-goldenrod border border-deepCrimson rounded-md placeholder:text-goldenrod focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter team member email"
              />
              <button
                type="button"
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400 text-black text-xl font-bold rounded-md hover:bg-goldenrod focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onClick={handleAddTeamMember}
              >
                +
              </button>
            </div>
          
            {/* Display Added Team Members */}
            <ul className="mt-4 text-goldenrod">
              {formData.teamemail.map((email, index) => (
                <li key={index} className="text-goldenrod">
                  {index + 1}. {email}
                </li>
              ))}
            </ul>
          </>
          
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-goldenrod text-xl text-black font-bold rounded-md hover:bg-deepCrimson focus:outline-none focus:ring-2 focus:ring-goldenrod"
            disabled={registering}
          >
           {registering ? "Registering....": "Embark on Quest"}
          </button>
        </form>

      </div>

    </div>
  </div>

  );
};

export default EventRegistrationForm;