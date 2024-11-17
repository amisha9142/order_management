import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-3xl font-bold text-start mb-8">Panel</h2>
      <nav>
        <ul>
          <li>
            <Link to="/admin" className="block py-2 px-4 hover:bg-gray-600 rounded">
              Admin
            </Link>
          </li>
          <li>
            <Link to="/seller" className="block py-2 px-4 hover:bg-gray-600 rounded">
              Seller
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
