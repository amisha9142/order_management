const express = require("express");
const router = express.Router();
const { getOrders, forwardOrder, createOrder } = require("../controller/order");

router.get("/orders", getOrders);
router.post("/forward-order", forwardOrder);
router.post("/create-order", createOrder)

module.exports = router;
