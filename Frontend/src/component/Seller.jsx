import React, { useEffect, useState } from "react";
import axios from "axios";

const Seller = () => {
  const [orders, setOrders] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSellerId, setSelectedSellerId] = useState("");
  const [rejectionReason, setRejectionReason] = useState({});
  const [showReasonInput, setShowReasonInput] = useState({});

  // Fetch sellers and orders
  useEffect(() => {
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

    fetchSellers();
    if (selectedSellerId) {
      setLoading(true);
      fetchOrders();
    }
  }, [selectedSellerId]);

  // Update order status
  const updateOrderStatus = async (orderId, status) => {
    const reason = status === "Rejected" ? rejectionReason[orderId] : null;

    if (status === "Rejected" && !reason) {
      alert("Please provide a reason for rejection.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/seller/update-order",
        {
          orderId,
          status,
          rejectionReason: reason,
        }
      );

      alert("Order status updated successfully!");

      // Update the status of the order in the UI
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status, reasonForRejection: reason }
            : order
        )
      );
    } catch (err) {
      setError("Error updating order status");
    }
  };

  // Handle input for rejection reason
  const handleReasonChange = (orderId, value) => {
    setRejectionReason({ ...rejectionReason, [orderId]: value });
  };

  const toggleReasonInput = (orderId) => {
    setShowReasonInput((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  return (
    <div className="p-6 font-roboto bg-customWhite">
      <h2 className="text-3xl font-bold mb-4 text-customGreen">Seller Portal</h2>

      {/* Seller Selection */}
      <div className="mb-4 flex items-center">
        <h3 className="text-2xl mr-4 text-customBrown">Select Seller</h3>
        <select
          value={selectedSellerId}
          onChange={(e) => setSelectedSellerId(e.target.value)}
          className="py-2 px-4 border rounded w-1/2 border-customGreen"
        >
          <option value="">Select Seller</option>
          {sellers.map((seller) => (
            <option key={seller._id} value={seller._id}>
              {seller.name}
            </option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="justify-center text-center">Loading orders...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="mb-4">
          <h3 className="text-2xl mb-2 text-customBrown">Orders</h3>
          <table className="min-w-full table-auto mt-4 border-collapse">
            <thead className="bg-customGreen text-customWhite">
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
                  <td className="border px-4 py-2 text-center">
                    {order._id} &nbsp; ({order.item})
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {order.customerName}
                  </td>
                  <td className="border px-4 py-2 text-center">{order.status}</td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => updateOrderStatus(order._id, "Accepted")}
                      className="bg-customGreen text-white py-2 px-4 rounded mr-2"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => toggleReasonInput(order._id)}
                      className="bg-customBrown text-white py-2 px-4 rounded"
                    >
                      Reject
                    </button>
                    {showReasonInput[order._id] && (
                      <div className="mt-2">
                        <textarea
                          placeholder="Enter rejection reason"
                          value={rejectionReason[order._id] || ""}
                          onChange={(e) =>
                            handleReasonChange(order._id, e.target.value)
                          }
                          className="w-full border rounded p-2"
                        ></textarea>
                        <button
                          onClick={() => updateOrderStatus(order._id, "Rejected")}
                          className="bg-customBrown text-white py-2 px-4 rounded mt-2"
                        >
                          Confirm Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Seller;
