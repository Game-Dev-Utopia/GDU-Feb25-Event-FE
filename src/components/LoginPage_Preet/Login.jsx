import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postRequestJson } from "../../api/api";

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
      toast.error(
        "An error occurred while logging in. Please try again later.",
        { position: "top-right" }
      );
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen "
      style={{
        backgroundImage: `url('/images/bg8.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-black bg-opacity-60 px-10 py-10 rounded-3xl border-2 border-yellow-500 shadow-lg  max-w-4xl w[90%] lg:w-[30%] mx-5 mt-20 font-playfair">
        <h1 className="text-4xl sm:text-4xl lg:text-6xl mx-auto font-semibold text-center text-yellow-400 mb-6">
          GLITCHED
        </h1>

        <div className="mt-8">
          <div className="mb-6">
            <label className="text-2xl font-medium text-yellow-400">
              Email
            </label>
            <input
              className="w-full border-2 border-goldenrod rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:border-burntOrange text-goldenrod"
              type="text"
              minLength="0" maxLength="100"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-2xl font-medium text-yellow-400">
              Password
            </label>
            <input
              className="w-full border-2 border-goldenrod rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:border-burntOrange text-goldenrod autofill:bg-transparent"
              type="password"
              minLength="8" maxLength="20"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-8 flex flex-col gap-y-4">
            <button
              className={`active:scale-[.98] active:duration-75 hover:scale-[1.1] transition-all py-3 rounded-xl bg-deepCrimson text-goldenrod text-2xl font-bold ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? "Logging In..." : "LOGIN"}
            </button>
          </div>

          <div className="text-goldenrod mt-2">
            Don't Have an Account?{" "}
            <span className="text-iceBlue font-bold cursor-pointer">
              <Link to="/signup">Sign Up</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;