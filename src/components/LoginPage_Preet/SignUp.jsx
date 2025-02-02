import React, { useState } from "react";
import { postRequestJson } from "../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact: "",
    fullname: "",
    password: "",
    collegeName: "",
    year: "",
    dept: "",
    rollNo: "",
  });

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const isValidContact = (contact) => {
    const contactRegex = /^\d{10}$/;
    return contactRegex.test(contact);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      toast.error("Please enter your email first.", { position: "top-right" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await postRequestJson("/api/v1/users/send-otp", {
        email: formData.email,
      });
      console.log(response)
      if (response) {
        toast.success("Verification mail sent!", { position: "top-right" });
        setIsOtpSent(true);
      } else {
        throw new Error(response.message || "Failed to send verification mail");
      }
    } catch (error) {
      toast.error("Error sending verification mail. Please try again.", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP.", { position: "top-right" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await postRequestJson("/api/v1/users/verify-otp", {
        email: formData.email,
        otp,
      });

      console.log(response)

      if (response) {
        toast.success("OTP verified successfully!", { position: "top-right" });
        handleSubmit()
      } else {
        throw new Error(response.message || "OTP verification failed");
      }
    } catch (error) {
      toast.error("Invalid OTP. Please try again.", { position: "top-right" });
    } finally {
      setIsLoading(false);
    }
  };


  const handleSubmit = async () => {
    // Validations
    if (
      !formData.username ||
      formData.username.length < 3 ||
      formData.username.length > 15
    ) {
      toast.error("Username must be between 3 and 15 characters.", {
        position: "top-right",
      });
      return;
    }
    if (
      !formData.fullname ||
      formData.fullname.length < 3 ||
      formData.fullname.length > 30
    ) {
      toast.error("Full name must be between 3 and 30 characters.", {
        position: "top-right",
      });
      return;
    }
    if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-right",
      });
      return;
    }
    if (!isValidContact(formData.contact)) {
      toast.error("Contact number must be 10 digits.", {
        position: "top-right",
      });
      return;
    }
    if (!isValidPassword(formData.password)) {
      toast.error(
        "Password must be at least 6 characters long, contain one number, and one special character.",
        { position: "top-right" }
      );
      return;
    }
    if (
      !formData.rollNo ||
      formData.rollNo.length < 2 ||
      formData.rollNo.length > 10
    ) {
      toast.error("Roll number must be between 2 and 10 characters.", {
        position: "top-right",
      });
      return;
    }

    // If all validations pass
    setIsLoading(true); // Start loading
    try {
      const response = await postRequestJson(`/api/v1/users/register`, formData);
     
    
      // Check if the response contains the expected fields
      if (response && response.message) {
        toast.success("Registration successful!", { position: "top-right" });
    
        setTimeout(() => {
          navigate("/signin"); // Navigate to /signin after success
        }, 3000);
      } else {
        // If response does not contain expected data, handle as an error
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    
      // Handle specific error cases
      if (error.response) {
        const statusCode = error.response.status;
        const errorMessage = error.response.data?.message || "An unknown error occurred.";
    
        switch (statusCode) {
          case 400:
            toast.error(`Bad Request: ${errorMessage}`, { position: "top-right" });
            break;
          case 409:
            toast.error(`Conflict: ${errorMessage}`, { position: "top-right" });
            break;
          case 500:
            toast.error(`Server Error: ${errorMessage}`, { position: "top-right" });
            break;
          default:
            toast.error(`Error ${statusCode}: ${errorMessage}`, { position: "top-right" });
        }
      } else if (error.request) {
        // Request was made but no response was received
        toast.error("No response from server. Please check your connection.", {
          position: "top-right",
        });
      } else {
        // Something happened in setting up the request
        toast.error("An unexpected error occurred. Please try again later.", {
          position: "top-right",
        });
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  }  

  return (
    <div className="flex justify-center items-center min-h-screen font-playfair" style={{ backgroundImage: "url('/images/bg8.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
      <div className="bg-black bg-opacity-60 px-10 py-10 rounded-3xl border-2 border-yellow-500 shadow-lg max-w-4xl w-[90%] mx-5 mt-20">
        <h1 className="text-4xl md:text-6xl font-semibold text-center text-yellow-400">GLITCHED</h1>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {[
            { label: "Username", name: "username", type: "text" },
            { label: "Full Name", name: "fullname", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Contact", name: "contact", type: "text" },
            { label: "Password", name: "password", type: "password" },
            { label: "College Name", name: "collegeName", type: "text" },
            { label: "Year", name: "year", type: "number" },
            { label: "Department", name: "dept", type: "text" },
            { label: "Roll Number", name: "rollNo", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="text-xl md:text-2xl font-medium text-yellow-400">{label}</label>
              <input className="w-full border-2 border-gray-300 rounded-xl p-4 bg-transparent focus:outline-none focus:border-blue-500 text-yellow-200 text-xl" type={type} name={name} value={formData[name]} onChange={handleInputChange} placeholder={`Enter your ${label.toLowerCase()}`} />
            </div>
          ))}
        </div>

        <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-xl" onClick={handleSendOtp} disabled={isLoading}>{isLoading ? "Sending..." : "Send Verification Mail"}</button>
        
        {isOtpSent && (
          <div className="mt-4">
            <label className="text-xl font-medium text-yellow-400">Enter OTP:</label>
            <input type="text" value={otp} onChange={handleOtpChange} className="w-full border-2 border-gray-300 rounded-xl p-4 bg-transparent focus:outline-none focus:border-blue-500 text-yellow-200 text-xl" placeholder="Enter OTP" />
            <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded-xl" onClick={handleVerifyOtp} disabled={isLoading}>{isLoading ? "Verifying..." : "Confirm Mail"}</button>
          </div>
        )}
        
        <div className="text-goldenrod mt-2">Already Have an Account? <span className="text-iceBlue font-bold"><Link to="/signin">Sign In</Link></span></div>
      </div>
    </div>
  );
};

export default SignUp;