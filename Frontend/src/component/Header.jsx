import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem("userId");
    toast.success("logout successfully!!")
   
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-2xl">Dashboard</h1>
      <button
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
