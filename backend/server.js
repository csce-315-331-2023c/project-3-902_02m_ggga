const express = require("express");
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

app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT name, price FROM product");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
