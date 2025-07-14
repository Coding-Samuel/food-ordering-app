const express = require('express');
const cors = require('cors');
const app = express();
const foodRoutes = require('./routes/foodRoutes');
const orderRoutes = require("./routes/orderRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
