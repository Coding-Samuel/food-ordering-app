const db = require('../config/db');

const getFoods = (req, res) => {
  db.query('SELECT * FROM foods', (err, results) => {
    if (err) {
      console.error("Error fetching foods:", err);
      res.status(500).json({ error: 'Failed to fetch foods' });
    } else {
      res.json(results);
    }
  });
};

module.exports = { getFoods };
