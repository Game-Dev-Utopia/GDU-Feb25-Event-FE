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

  const handleSubmit = async () => {
    // Basic validation (optional)
    if (Object.values(formData).some((value) => !value)) {
      alert("Please fill all fields");
      return;
    }
    setIsLoading(true); // Start loading
    try {
      const response = await postRequestJson(
        `/api/v1/users/register
`,
        formData
      );
      console.log(response);

      if (response) {
        toast.success("Registration successful!", { position: "top-right" });
        setTimeout(() => {
          navigate("/"); // Navigate to /home after success
        }, 3000);
      } else {
        toast.error("Registration failed. Try again!", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.", {
        position: "top-right",
      });
    }
    finally{
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
            },
            {
              label: "Full Name",
              name: "fullname",
              type: "text",
              placeholder: "Enter your full name",
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
            },
            {
              label: "Password",
              name: "password",
              type: "text",
              placeholder: "Enter your password",
            },
            {
              label: "College Name",
              name: "collegeName",
              type: "text",
              placeholder: "Enter your college name",
            },
            {
              label: "Year",
              name: "year",
              type: "text",
              placeholder: "Enter your year of study",
            },
            {
              label: "Department",
              name: "dept",
              type: "text",
              placeholder: "Enter your department",
            },
            {
              label: "Roll Number",
              name: "rollNo",
              type: "text",
              placeholder: "Enter your roll number",
            },
          ].map(({ label, name, type, placeholder }) => (
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
