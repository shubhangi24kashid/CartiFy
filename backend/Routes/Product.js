const express = require('express');
const mySql = require('mysql');

const router = express.Router();

const db = mySql.createPool({
  host: "localhost",
  user: "root",
  password: "Shubhangi@24",
  database: "cartify",
  port: 3306,
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
