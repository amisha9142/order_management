import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Signup from "./component/Signup";
import Login from "./component/Login";
import Sidebar from "./component/Sidebar";
import Header from "./component/Header";
import Dashboard from "./component/Dashboard";
import Admin from "./component/Admin";
import Seller from "./component/Seller";

const App = () => {
  return (
    <Router>
      <Toaster />
      <Routes>
       
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <div className="flex h-screen bg-gray-100">
              <Sidebar />
              <div className="flex flex-col w-full">
                <Header />
                <Dashboard />
              </div>
            </div>
          }
        />
        <Route
          path="/admin"
          element={
            <div className="flex h-screen bg-gray-100">
              <Sidebar />
              <div className="flex flex-col w-full">
                <Header />
                <Admin />
              </div>
            </div>
          }
        />
        <Route
          path="/seller"
          element={
            <div className="flex h-screen bg-gray-100">
              <Sidebar />
              <div className="flex flex-col w-full">
                <Header />
                <Seller />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
