import React, { useState } from "react";
import { postRequestJson } from "../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Loading state
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const isValidContact = (contact) => {
    const contactRegex = /^\d{10}$/;
    return contactRegex.test(contact);
  };

  const handleSubmit = async () => {
    // Validations
    if (!formData.username || formData.username.length < 3 || formData.username.length > 15) {
      toast.error("Username must be between 3 and 15 characters.", { position: "top-right" });
      return;
    }
    if (!formData.fullname || formData.fullname.length < 3 || formData.fullname.length > 30) {
      toast.error("Full name must be between 3 and 30 characters.", { position: "top-right" });
      return;
    }
    if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address.", { position: "top-right" });
      return;
    }
    if (!isValidContact(formData.contact)) {
      toast.error("Contact number must be 10 digits.", { position: "top-right" });
      return;
    }
    if (!isValidPassword(formData.password)) {
      toast.error(
        "Password must be at least 6 characters long, contain one number, and one special character.",
        { position: "top-right" }
      );
      return;
    }
    if (!formData.rollNo || formData.rollNo.length < 2 || formData.rollNo.length > 10) {
      toast.error("Roll number must be between 2 and 10 characters.", { position: "top-right" });
      return;
    }

    // If all validations pass
    setIsLoading(true); // Start loading
    try {
      const response = await postRequestJson(`/api/v1/users/register`, formData);
      console.log(response);
    
      if (response.ok) {
        // Successful registration
        const responseData = await response.json();
        toast.success("Registration successful!", { position: "top-right" });
    
        setTimeout(() => {
          navigate("/signin"); // Navigate to /signin after success
        }, 3000);
      } else {
        // Handle error based on status code
        const errorData = await response.json();
    
        switch (response.status) {
          case 400:
            toast.error("All fields are required.", { position: "top-right" });
            break;
          case 409:
            toast.error(
              "User with email or username already exists.",
              { position: "top-right" }
            );
            break;
          case 500:
            toast.error(
              "Something went wrong while registering. Please try again later.",
              { position: "top-right" }
            );
            break;
          default:
            toast.error(
              `Registration failed: ${errorData.message || "Unknown error"}`,
              { position: "top-right" }
            );
            break;
        }
      }
    } catch (error) {
      // Handle network or other unexpected errors
      toast.error("An error occurred. Please try again later.", {
        position: "top-right",
      });
    }    
     finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen font-playfair"
      style={{
        backgroundImage: `url('/images/bg8.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="bg-black bg-opacity-60 px-10 py-10 rounded-3xl border-2 border-yellow-500 shadow-lg max-w-4xl w-[90%] mx-5 mt-20"
      >
        <h1
          className="text-4xl md:text-6xl font-semibold text-center text-yellow-400"
        >
          GLITCHED
        </h1>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {[
            {
              label: "Username",
              name: "username",
              type: "text",
              placeholder: "Enter your username",
              maxLength: 15,
              minLength: 3,
            },
            {
              label: "Full Name",
              name: "fullname",
              type: "text",
              placeholder: "Enter your full name",
              maxLength: 30,
              minLength: 3,
            },
            {
              label: "Email",
              name: "email",
              type: "email",
              placeholder: "Enter your email",
            },
            {
              label: "Contact",
              name: "contact",
              type: "text",
              placeholder: "Enter your contact number",
              maxLength: 10,
              pattern: "\\d*",
            },
            {
              label: "Password",
              name: "password",
              type: "password",
              placeholder: "Enter your password",
              minLength: 6,
            },
            {
              label: "College Name",
              name: "collegeName",
              type: "text",
              placeholder: "Enter your college name",
              maxLength: 50,
            },
            {
              label: "Year",
              name: "year",
              type: "number",
              placeholder: "Enter your year of study",
              min: 1,
              max: 5,
            },
            {
              label: "Department",
              name: "dept",
              type: "text",
              placeholder: "Enter your department",
              maxLength: 20,
            },
            {
              label: "Roll Number",
              name: "rollNo",
              type: "text",
              placeholder: "Enter your roll number",
              maxLength: 10,
              minLength: 2,
            },
          ].map(({ label, name, type, placeholder, ...rest }) => (
            <div key={name}>
              <label className="text-xl md:text-2xl font-medium text-yellow-400">
                {label}
              </label>
              <input
                className="w-full border-2 border-gray-300 rounded-xl p-4 bg-transparent focus:outline-none focus:border-blue-500 text-yellow-200 text-xl"
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                placeholder={placeholder}
                {...rest}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-y-4">
          <button
            className="active:scale-[.98] active:duration-75 hover:scale-[1.1] transition-all py-3 rounded-xl bg-deepCrimson text-goldenrod text-2xl font-bold mx-5"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>

        <div className="text-goldenrod mt-2">
          Already Have an Account ?{" "}
          <span className="text-iceBlue font-bold cursor-pointer">
            <Link to="/signin">Sign In</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
