import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders for the Admin portal
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/orders"
        );
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching orders");
        setLoading(false);
      }
    };

    // Fetch sellers for the dropdown
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

    fetchOrders();
    fetchSellers();
  }, []);

  // Forward order to a seller
  const forwardOrder = async (orderId, sellerId) => {
    if (!sellerId) {
      alert("Please select a seller");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/forward-order",
        {
          orderId,
          sellerId,
        }
      );
      alert("Order forwarded successfully!");

      setOrders(
        orders.map((order) =>
          order._id === orderId
            ? { ...order, forwardedToSeller: sellerId }
            : order
        )
      );
    } catch (err) {
      setError("Error forwarding order");
    }
  };

  // Handle seller change for each order
  const handleSellerChange = (orderId, sellerId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, selectedSellerId: sellerId } : order
      )
    );
  };

  return (
    <div className="p-6 font-roboto bg-customWhite">
      <h2 className="text-3xl font-bold mb-4 text-customGreen">Admin Portal</h2>

      {loading ? (
        <div>Loading orders...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <div className="mb-4">
            <h3 className="text-2xl text-customBrown">Orders</h3>
            <table className="min-w-full table-auto mt-4 border-collapse">
              <thead className="bg-customGreen text-customWhite">
                <tr>
                  <th className="border px-4 py-2">Order ID</th>
                  <th className="border px-4 py-2">Customer</th>
                  <th className="border px-4 py-2">Reason <br/> for Rejection</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  
                  const filteredSellers = sellers.filter(
                    (seller) => seller.pincode === order.pincode
                  );

                  return (
                    <tr key={order._id}>
                      <td className="border px-4 py-2 text-center">
                        {order._id} &nbsp; ({order.item}) <br />
                        <span className="font-semibold">Pincode :</span>{" "}
                        {order.pincode}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {order.customerName}
                      </td>
                      <td className="border px-4 py-2 text-center">
                         {order.reasonForRejection}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {order.forwardedToSeller ? (
                          <span>
                            Forwarded to{" "}
                            {sellers.find(
                              (seller) =>
                                seller._id === order.forwardedToSeller
                            )?.name || "Unknown Seller"}
                          </span>
                        ) : (
                          order.status
                        )}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <select
                          value={order.selectedSellerId || ""}
                          onChange={(e) =>
                            handleSellerChange(order._id, e.target.value)
                          }
                          className="py-2 px-4 border rounded"
                        >
                          <option value="">Select Seller</option>
                          {filteredSellers.length > 0 ? (
                            filteredSellers.map((seller) => (
                              <option key={seller._id} value={seller._id}>
                                {seller.name} ({seller.pincode})
                              </option>
                            ))
                          ) : (
                            <option disabled>No matching sellers</option>
                          )}
                        </select>
                        &nbsp; &nbsp;
                        <button
                          onClick={() =>
                            forwardOrder(order._id, order.selectedSellerId)
                          }
                          className="bg-customGreen text-white py-2 px-4 rounded mt-2"
                          disabled={!order.selectedSellerId}
                        >
                          Forward to Seller
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;
