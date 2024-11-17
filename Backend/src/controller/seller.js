const Order = require("../model/order");
const Seller = require("../model/seller")

// Create a new seller
exports.createSeller = async (req, res) => {
  const { name, email, pincode } = req.body;

  if (!name || !email || !pincode) {
    return res.status(400).json({ message: "All fields are required: name, email, and pincode." });
  }

  try {
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: "Seller with this email already exists." });
    }

    const newSeller = new Seller({ name, email, pincode });
    const savedSeller = await newSeller.save();

    res.status(201).json({
      message: "Seller created successfully!",
      seller: savedSeller,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create seller",
      error: error.message,
    });
  }
};



// Get all sellers
exports.getAllSellers = async (req, res) => {
    try {
      const sellers = await Seller.find();
      res.status(200).json({
        message: "Sellers fetched successfully!",
        sellers,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch sellers",
        error: error.message,
      });
    }
  };

  
 
  

// Fetch orders assigned to the seller
exports.getSellerOrders = async (req, res) => {
  const { sellerId } = req.params;

  try {
    const orders = await Order.find({ seller: sellerId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching seller orders", error });
  }
};



// Update order status (accept/reject)
exports.updateOrderStatus = async (req, res) => {
  const { orderId, status, reasonForRejection } = req.body;

  try {
    const update = { status };
    if (status === "Rejected") update.reasonForRejection = reasonForRejection;

    const order = await Order.findByIdAndUpdate(orderId, update, { new: true });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
};
