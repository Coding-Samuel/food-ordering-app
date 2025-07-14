const db = require('../config/db');

const placeOrder = (req, res) => {
  const { name, email, city, items } = req.body;

  if (!name || !email || !city || !items || !items.length) {
    return res.status(400).json({ error: 'Missing name, email, city, or items' });
  }

  const query = 'INSERT INTO orders (name, email, city, items) VALUES (?, ?, ?, ?)';
  const values = [name, email, city, JSON.stringify(items)];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error placing order:', err);
      return res.status(500).json({ error: 'Failed to place order' });
    }
    res.status(201).json({ message: 'Order placed!', orderId: result.insertId });
  });
};

const getOrders = (req, res) => {
   console.log('GET /api/orders hit');
  const query = 'SELECT * FROM orders';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).json({ error: 'Failed to fetch orders' });
    }

    // Parse the items string back to JSON before sending
    const orders = results.map(order => ({
      ...order,
      items: JSON.parse(order.items)
    }));

    res.json(orders);
  });
};

module.exports = { placeOrder, getOrders };
