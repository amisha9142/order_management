const Order = require("../model/order");
const Seller = require("../model/seller");

// Create a new order
exports.createOrder = async (req, res) => {
  const { item, customerName, pincode } = req.body;

  if (!item || !customerName || !pincode) {
    return res.status(400).json({ message: "All fields are required (item, customerName, pincode)." });
  }

  try {
   
    const newOrder = new Order({
      item,
      customerName,
      pincode,
      status: "Pending", 
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Order created successfully!",
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};


// Fetch all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("seller");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};


// Forward an order to a seller
exports.forwardOrder = async (req, res) => {
  const { orderId, sellerId } = req.body;

  try {
    const seller = await Seller.findById(sellerId);
    if (!seller) return res.status(404).json({ message: "Seller not found" });

    const order = await Order.findByIdAndUpdate(
      orderId,
      { seller: sellerId, status: "Forwarded" },
      { new: true }
    );
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error forwarding order", error });
  }
};


