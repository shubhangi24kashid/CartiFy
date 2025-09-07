const express = require('express');
require('dotenv').config(); // loads .env variables

const router = express.Router();

const mysql = require('mysql2'); // instead of 'mysql'

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  multipleStatements: true
});

// ✅ Test database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.sqlMessage || err);
  } else {
    console.log('Connected to MySQL database!');
    connection.release();
  }
});

// ✅ Categories route
router.get('/categories', (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    if (err) {
      console.error("Error fetching categories:", err.sqlMessage || err);
      return res.status(500).json({ error: "Error fetching categories" });
    }
    res.status(200).json(result);
  });
});

// ✅ Products route
router.get('/products', (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.error("Error fetching products:", err.sqlMessage || err);
      return res.status(500).json({ error: "Error fetching products" });
    }
    res.status(200).json(result);
  });
});

module.exports = router;
