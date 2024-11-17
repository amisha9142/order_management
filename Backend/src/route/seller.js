const express = require("express");
const router = express.Router();
const { getSellerOrders, updateOrderStatus, createSeller, getAllSellers, getSellerById } = require("../controller/seller");

router.get("/orders/:sellerId", getSellerOrders);
router.post("/update-order", updateOrderStatus);

router.post("/create-seller", createSeller);

router.get("/getAll", getAllSellers);


module.exports = router;
