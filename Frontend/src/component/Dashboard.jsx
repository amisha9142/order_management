import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const goAdmin = () => {
    navigate("/admin");
  };

  const goSeller = () => {
    navigate("/seller");
  };

  return (
    <div className="flex-1 p-6 bg-customWhite font-roboto">
      <h2 className="text-3xl font-bold mb-4 text-customGreen">Welcome to the Dashboard</h2>
      <div className="grid grid-cols-2 gap-6">
        {/* Admin Dashboard Section */}
        <div className="bg-white p-6 shadow-md rounded-lg border border-customGreen">
          <h3 className="text-xl font-semibold mb-2 text-customBrown">Admin Dashboard</h3>
          <p className="mt-2 text-gray-600">
            Manage all the administrative settings and configurations from this section.
          </p>
          <ul className="mt-4 list-disc list-inside text-gray-700">
            <li>Order Management</li>
            <li>Customer</li>
            <li>System Logs</li>
            <li>Settings and Permissions</li>
          </ul>
          <button
            className="mt-4 px-4 py-2 bg-customGreen text-white rounded hover:bg-customBrown"
            onClick={goAdmin}
          >
            Go to Admin Panel
          </button>
        </div>

        {/* Seller Dashboard Section */}
        <div className="bg-white p-6 shadow-md rounded-lg border border-customGreen">
          <h3 className="text-xl font-semibold mb-2 text-customBrown">Seller Dashboard</h3>
          <p className="mt-2 text-gray-600">
            Access tools and insights to manage your sales and product listings effectively.
          </p>
          <ul className="mt-4 list-disc list-inside text-gray-700">
            <li>Product Listings</li>
            <li>Order Management</li>
            <li>Sales</li>
            <li>Promotions and Discounts</li>
          </ul>
          <button
            className="mt-4 px-4 py-2 bg-customGreen text-white rounded hover:bg-customBrown"
            onClick={goSeller}
          >
            Go to Seller Panel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
