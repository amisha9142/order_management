import React, { useEffect, useState } from "react";
import axios from "axios";

const Seller = () => {
  const [orders, setOrders] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSellerId, setSelectedSellerId] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/seller/orders/${selectedSellerId}`
        );
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching orders");
        setLoading(false);
      }
    };

    const fetchSellers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/seller/getAll"
        );
        setSellers(response.data.sellers);
      } catch (err) {
        console.error("Error fetching sellers", err);
      }
    };

    if (selectedSellerId) {
      fetchOrders();
    }
    fetchSellers();
  }, [selectedSellerId]);

  // Update order status (Accepted or Rejected)
  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/seller/update-order",
        {
          orderId,
          status,
          rejectionReason: "", 
        }
      );
      alert("Order status updated successfully!");

      // Update the status of the order 
      setOrders(orders.map((order) =>
        order._id === orderId ? { ...order, status } : order
      ));
    } catch (err) {
      setError("Error updating order status");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Seller Portal</h2>

      <div className="mb-4 flex items-center">
        <h3 className="text-2xl mr-4">Select Seller</h3>
        <select
          value={selectedSellerId}
          onChange={(e) => setSelectedSellerId(e.target.value)}
          className="py-2 px-4 border rounded w-1/2"
        >
          <option value="">Select Seller</option>
          {sellers.map((seller) => (
            <option key={seller._id} value={seller._id}>
              {seller.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="justify-center text-center">Loading orders...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <div className="mb-4">
            <h3 className="text-2xl">Orders</h3>
            <table className="min-w-full table-auto mt-4 border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Order ID</th>
                  <th className="border px-4 py-2">Customer</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="border px-4 text-center">
                      {order._id} &nbsp; ({order.item})
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {order.customerName}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {order.status}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => updateOrderStatus(order._id, "Accepted")}
                        className="bg-green-500 text-white py-2 px-4 rounded mr-2"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order._id, "Rejected")}
                        className="bg-red-500 text-white py-2 px-4 rounded"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Seller;
