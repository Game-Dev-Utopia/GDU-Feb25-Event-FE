import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postRequestJson } from "../../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      toast.error("Please fill in both email and password.", {
        position: "top-right",
      });
      return;
    }

    try {
      const response = await postRequestJson(`/api/v1/users/login`, JSON.stringify({ email, password }));

      console.log(response);

      if (response) {
        toast.success("Login successful!", { position: "top-right" });
        // Save token or user data if provided by API
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        
        setTimeout(() => navigate("/"), 2000); // Redirect to /home
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
        className="bg-black bg-opacity-90 px-10 py-10 rounded-3xl border-2 border-yellow-500 shadow-lg max-w-md w-full md:w-1/2 mx-5 font-cinzel"
        
      >
        <h1
          className="text-6xl md:text-6xl font-semibold text-center text-yellow-400 mb-6"
          
        >
          GLITCHED
        </h1>

        <div className="mt-8">
          <div className="mb-6">
            <label className="text-2xl font-medium text-yellow-400">
              Email
            </label>
            <input
              className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:border-blue-500 text-yellow-200"
              type="text"
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
              className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:border-blue-500 text-yellow-200"
              type="text"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-8 flex flex-col gap-y-4">
            <button
              className="active:scale-[.98] active:duration-75 hover:scale-[1.1] transition-all py-3 rounded-xl bg-deepCrimson text-goldenrod text-2xl font-bold "
              onClick={handleLogin}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
