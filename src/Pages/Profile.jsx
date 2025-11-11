import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";

const Profile = () => {
  const { login, signup, googleLogin, currentUser, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignup = async () => {
    try {
      setError("");
      await signup(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      setError("");
      await googleLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      setError(err.message);
    }
  };

  if (currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4 text-center">
        <h1 className="text-2xl font-bold">Welcome, {currentUser.email}</h1>
        <button
          className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4 font-poppins">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6 sm:p-8 flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-1">Hello!</h1>
        <p className="mb-4 text-gray-600 text-center">Sign up to get started</p>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter Email"
          className="p-2 w-full rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-gray-700"
          style={{ backgroundColor: "#e9ecef", color: "#333333" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Enter Password"
          className="p-2 w-full rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-gray-700"
          style={{ backgroundColor: "#e9ecef", color: "#333333" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          <button
            onClick={handleLogin}
            className="w-[120px] h-[40px] bg-[#212529] text-white rounded-md hover:bg-black transition"
          >
            Log in
          </button>
          <button
            onClick={handleSignup}
            className="w-[120px] h-[40px] border border-[#212529] rounded-md hover:bg-gray-100 transition"
          >
            Sign up
          </button>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogle}
          className="w-full h-[45px] border border-[#212529] rounded-md flex items-center justify-between px-4 cursor-pointer hover:bg-gray-100 transition"
        >
          <span>Continue with Google</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4
                C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20
                c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12
                c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238
                C29.211,35.091,26.715,36,24,36
                c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303
                c-0.792,2.237-2.231,4.166-4.087,5.571
                l6.19,5.238C36.971,39.205,44,34,44,24
                C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
        </button>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default Profile;
