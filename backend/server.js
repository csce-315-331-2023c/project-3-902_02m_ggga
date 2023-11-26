const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 5000;

const pool = new Pool({
  user: "csce331_902_gabrielmarshall327",
  host: "csce-315-db.engr.tamu.edu",
  database: "csce315331_02m_db",
  password: "password123",
  port: 5432,
});

app.use(cors());

app.get("/products/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM product");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/pastorders/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM orders ORDER BY id DESC LIMIT 20;"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching past orders", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/inventory/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM inventory");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching inventory", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/neworder/", async (req, res) => {
  const cartData = req.body;
  try {
    await pool.query(
      "INSERT INTO orders (tip, price, order_date, order_time, items) VALUES ($1, $2, $3, $4, $5)",
      [
        cartData.id,
        cartData.tip,
        cartData.price,
        cartData.order_date,
        cartData.order_time,
        cartData.items,
      ]
    );

    res.json({ success: true, message: "Order added successfully" });
  } catch (error) {
    console.error("Error adding order", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
