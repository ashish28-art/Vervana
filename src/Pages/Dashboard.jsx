import React from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/profile");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Welcome, {currentUser?.email}</h1>
      <button className="bg-red-500 text-white p-2 rounded" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
