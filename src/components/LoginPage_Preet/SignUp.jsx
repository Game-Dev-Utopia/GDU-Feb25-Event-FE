import React, { useState, useEffect } from "react";
import { postRequestJson } from "../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SignUp = () => {
  const navigate = useNavigate();
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
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
  });

  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  // Validation Functions
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  const isValidContact = (contact) => /^\d{10}$/.test(contact);

  // Validate specific field when user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      Object.keys(touchedFields).forEach((field) => validateField(field));
    }, 500); // Debounce of 500ms after user stops typing

    return () => clearTimeout(timer);
  }, [formData]);

  const validateField = (name) => {
    let errorMsg = "";

    switch (name) {
      case "username":
        if (!formData.username.trim()) errorMsg = "Username is required";
        break;
      case "fullname":
        if (!formData.fullname.trim()) errorMsg = "Full Name is required";
        break;
      case "email":
        if (!isValidEmail(formData.email)) errorMsg = "Invalid email format";
        break;
      case "contact":
        if (!isValidContact(formData.contact))
          errorMsg = "Contact must be 10 digits";
        break;
      case "password":
        if (!isValidPassword(formData.password)) {
          errorMsg =
            "Password must be at least 6 characters, contain a number & special character";
        }
        break;
      case "collegeName":
        if (!formData.collegeName.trim()) errorMsg = "College Name is required";
        break;
      case "year":
        if (!formData.year.trim()) errorMsg = "Year is required";
        break;
    
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update field value
    setFormData({ ...formData, [name]: value });

    // Mark field as touched
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async () => {
    Object.keys(formData).forEach(validateField);

    if (Object.values(errors).some((error) => error !== "")) {
      toast.error("Please correct the errors before submitting.", {
        position: "top-right",
      });
      return;
    }

    if (!formData.email) {
      toast.error("Please enter your email first.", { position: "top-right" });
      return;
    }

    setIsSendingOtp(true);
    try {
      const response = await postRequestJson("/api/v1/users/send-otp", {
        email: formData.email,
        username: formData.username,
      });

      if (response) {
        toast.success("Verification mail sent!", { position: "top-right" });
        setIsOtpSent(true);
      } else {
        throw new Error(response.message || "Failed to send verification mail");
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const errorMessage =
          error.response.data?.message || "Unknown error occurred.";

        toast.error(`${errorMessage}`, {
          position: "top-right",
        });
      } else {
        toast.error("Network error. Please try again later.", {
          position: "top-right",
        });
      }
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP.", { position: "top-right" });
      return;
    }

    setIsVerifyingOtp(true);
    try {
      const response = await postRequestJson("/api/v1/users/verify-otp", {
        email: formData.email,
        otp,
      });

      if (response) {
        toast.success("OTP verified successfully!", { position: "top-right" });
        handleSubmit();
      } else {
        throw new Error(response.message || "OTP verification failed");
      }
    } catch (error) {
      toast.error("Invalid OTP. Please try again.", { position: "top-right" });
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await postRequestJson(
        `/api/v1/users/register`,
        formData
      );
      if (response?.message) {
        toast.success("Registration successful!", { position: "top-right" });
        setTimeout(() => navigate("/signin"), 3000);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const errorMessage =
          error.response.data?.message || "Unknown error occurred.";

        toast.error(`${errorMessage}`, {
          position: "top-right",
        });
      } else {
        toast.error("Network error. Please try again later.", {
          position: "top-right",
        });
      }
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen font-playfair"
      style={{
        backgroundImage: "url('/images/bg8.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        className="bg-black bg-opacity-60 px-10 py-10 rounded-3xl border-2 border-yellow-500 shadow-lg max-w-4xl w-[90%] mx-5 mt-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-semibold text-center text-yellow-400"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          GLITCHED
        </motion.h1>

        <motion.div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {[
            { label: "Username", name: "username", type: "text" },
            { label: "Full Name", name: "fullname", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Contact", name: "contact", type: "text" },
            { label: "Password", name: "password", type: "password" },
            { label: "College Name", name: "collegeName", type: "text" },
            { label: "Year", name: "year", type: "number" },
          ].map(({ label, name, type }) => (
            <motion.div key={name}>
              <label className="text-xl font-medium text-yellow-400">
                {label}
              </label>
              <input
                className={`w-full border-2 border-goldenrod rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:border-burntOrange text-goldenrod ${
                  touchedFields[name] && errors[name]
                    ? "border-red-500"
                    : "border-gray-300" 
                }`}
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                placeholder={`Enter your ${label.toLowerCase()}`}
              />
              {touchedFields[name] && errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          className="mt-4 bg-burntOrange text-white px-6 py-2 rounded-xl"
          onClick={handleSendOtp}
          disabled={isSendingOtp}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {isSendingOtp ? "Sending..." : "Send Verification Mail"}
        </motion.button>

        {isOtpSent && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="text-xl font-medium text-yellow-400">
              Enter OTP:
            </label>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              className="w-full border-2 border-gray-300 rounded-xl p-4 bg-transparent focus:outline-none focus:border-blue-500 text-yellow-200 text-xl"
              placeholder="Enter OTP"
            />
            <motion.button
              className="active:scale-[.98] active:duration-75 hover:scale-[1.1] transition-all py-3 rounded-xl bg-deepCrimson text-goldenrod text-2xl font-bold mt-4 w-full"
              onClick={handleVerifyOtp}
              disabled={isVerifyingOtp}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {isVerifyingOtp ? "Verifying..." : "Confirm Mail"}
            </motion.button>
          </motion.div>
        )}

        <motion.div
          className="text-goldenrod mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Already Have an Account?{" "}
          <span className="text-iceBlue font-bold">
            <Link to="/signin">Sign In</Link>
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;
