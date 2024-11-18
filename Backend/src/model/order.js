const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  item: { type: String, required: true },
  customerName: { type: String, required: true },
  pincode: { type: String, required: true },
  status: { type: String, default: "Pending" },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", default: null },
  reasonForRejection: { type: String, default: null },
});

module.exports = mongoose.model("Order", orderSchema);


