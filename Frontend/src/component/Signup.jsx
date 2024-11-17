import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import toast from "react-hot-toast";

const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/signup', formData);
      setMessage(response.data.message);
      toast.success("Signup successful!");
      setFormData({ name: '', email: '', password: '' });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max')",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md opacity-90">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Sign Up</h1>
        {message && <p className="text-green-600 text-center mb-4">{message}</p>}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
       
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter a secure password"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-sm text-center">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
