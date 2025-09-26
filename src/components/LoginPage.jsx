import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/login",
        { email, password }
      );
      if (response?.data) {
        console.log(response.data);
        sessionStorage.setItem("user", JSON.stringify(response.data));
        navigate("/dashboard"); // success -> go to dashboard
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Email or Password incorrect !");
      navigate("/"); // error -> back to home
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center bg-amber-50 min-h-screen">
      <div className="flex justify-evenly w-full max-w-7xl mx-auto px-4">
        {/* Left Side - Blue MIS Illustration */}
        <div className="flex justify-center items-center w-1/2 pr-8">
          <img
            src="https://img.freepik.com/free-vector/data-analytics-concept-illustration_114360-913.jpg"
            alt="MIS Blue Illustration"
            className="w-full max-w-lg rounded-2xl shadow-md"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 border-2 border-gray-200 p-10 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-md"
          >
            {/* Form Title */}
            <div className="text-center">
              <h2 className="font-bold text-3xl text-blue-400 mb-2">
                Login Page
              </h2>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <label htmlFor="email" className="font-bold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email address"
                required
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="font-bold text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <a
                href="#"
                className="text-blue-400 hover:text-blue-600 text-sm font-medium transition-colors duration-200"
              >
                Forgot Password?
              </a>
            </div>

            {/* Error Message */}
            {loginError && (
              <p className="text-red-500 text-center">{loginError}</p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="bg-blue-400 hover:bg-blue-500 disabled:bg-blue-300 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-blue-400 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
