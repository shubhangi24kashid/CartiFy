const express = require('express');
const mySql = require('mysql');

const router = express.Router();

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',        // fallback for local dev
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Shubhangi@24',
  database: process.env.DB_NAME || 'cartify',
  port: process.env.DB_PORT || 3306,
  multipleStatements: true
});

// ✅ Categories route
router.get('/categories', (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    if (err) {
      console.error("Error in fetching categories:", err.sqlMessage || err);
      return res.status(500).send("Error in fetching categories");
    }
    res.status(200).json(result);
  });
});


// ✅ Products route
router.get('/products', (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.error("Error in fetching products:", err.sqlMessage || err);
      return res.status(500).send("Error in fetching products");
    }
    res.status(200).json(result);
  });
});

module.exports = router;
