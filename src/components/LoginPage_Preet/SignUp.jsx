import React, { useState } from "react";
import { postRequestJson } from "../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    contact: "",
    password: "",
    collegeName: "",
    year: "",
    department: "",
    rollNumber: "",
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

    try {
      const response = await postRequestJson(`/api/v1/users/register`, formData);
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
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url('/images/background_img2.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="bg-black bg-opacity-90 px-10 py-10 rounded-3xl border-2 border-yellow-500 shadow-lg max-w-4xl w-full mx-5 mt-20"
        style={{ fontFamily: "HarryP" }}
      >
        <h1
          className="text-5xl md:text-5xl font-semibold text-center text-yellow-400"
          style={{ fontFamily: "HarryP" }}
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
              name: "fullName",
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
              type: "password",
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
              name: "department",
              type: "text",
              placeholder: "Enter your department",
            },
            {
              label: "Roll Number",
              name: "rollNumber",
              type: "text",
              placeholder: "Enter your roll number",
            },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="text-3xl font-medium text-yellow-400">
                {label}
              </label>
              <input
                className="w-full border-2 border-gray-300 rounded-2xl p-4 bg-transparent focus:outline-none focus:border-blue-500 text-yellow-200 text-xl"
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
            className="active:scale-[.98] active:duration-75 hover:scale-[1.05] transition-all py-3 rounded-xl bg-blue-500 text-white text-2xl font-bold hover:bg-green-600 transition-colors"
            onClick={handleSubmit}
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
