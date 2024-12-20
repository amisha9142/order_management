const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  pincode: { type: String, required: true },
});

module.exports = mongoose.model("Seller", sellerSchema);
