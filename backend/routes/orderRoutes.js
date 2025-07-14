const express = require('express');
const router = express.Router();
const { placeOrder, getOrders } = require('../controllers/orderController');

router.post('/', placeOrder); // POST /api/orders
router.get('/', getOrders);   // GET /api/orders

module.exports = router;
