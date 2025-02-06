import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postRequestJson } from "../../api/api";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    // Validations
    if (!email || !password) {
      toast.error("Please fill in both email and password.", {
        position: "top-right",
      });
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-right",
      });
      return;
    }

    // if (password.length < 6) {
    //   toast.error("Password must be at least 6 characters long.", {
    //     position: "top-right",
    //   });
    //   return;
    // }

    setIsLoading(true); // Start loading

    try {
      const response = await postRequestJson(
        `/api/v1/users/login`,
        JSON.stringify({ email, password })
      );

      if (response) {
        toast.success("Login successful!", { position: "top-right" });
        // Save token or user data if provided by API
        // localStorage.setItem("accessToken", response.accessToken);
        // localStorage.setItem("refreshToken", response.refreshToken);

        localStorage.setItem("username", response.user.username);
        localStorage.setItem("email", response.user.email);
        setEmail("");
        setPassword("");
        // Dispatch the custom authChange event
        const authEvent = new Event("authChange");
        window.dispatchEvent(authEvent);
        console.log("Event dispatched!"); // Debugging log

        setTimeout(() => navigate("/"), 2000); // Redirect to /
      } else {
        const errorData = await response.json();
        toast.error(`Login failed: ${errorData.message || "Unknown error"}`, {
          position: "top-right",
        });
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
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url('/images/bg8.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="bg-black bg-opacity-60 px-10 py-10 rounded-3xl border-2 border-yellow-500 shadow-lg max-w-4xl w-[90%] lg:w-[30%] mx-5 mt-20 font-playfair"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl sm:text-4xl lg:text-6xl mx-auto font-semibold text-center text-yellow-400 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          GLITCHED
        </motion.h1>

        <motion.div
          className="mt-8"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <label className="text-2xl font-medium text-yellow-400">
              Email
            </label>
            <input
              className="w-full border-2 border-goldenrod rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:border-burntOrange text-goldenrod"
              type="text"
              placeholder="Enter your email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <label className="text-2xl font-medium text-yellow-400">
              Password
            </label>
            <input
              className="w-full border-2 border-goldenrod rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:border-burntOrange text-goldenrod"
              type="password"
              placeholder="Enter your password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </motion.div>

          <motion.div
            className="mt-8 flex flex-col gap-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className={`py-3 rounded-xl bg-deepCrimson text-goldenrod text-2xl font-bold ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              onClick={handleLogin}
              disabled={isLoading}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {isLoading ? "Logging In..." : "LOGIN"}
            </motion.button>
          </motion.div>

          <motion.div
            className="text-goldenrod mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Don't Have an Account?{" "}
            <span className="text-iceBlue font-bold cursor-pointer">
              <Link to="/signup">Sign Up</Link>
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
