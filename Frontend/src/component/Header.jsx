import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    toast.success("Logged out successfully!!");

    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-customGreen text-white">
      <h1 className="text-2xl text-customWhite">Dashboard</h1>
      <button
        className="bg-customBrown text-white py-2 px-4 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
