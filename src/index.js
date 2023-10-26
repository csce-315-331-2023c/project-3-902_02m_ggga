const express = require('express');
const app = express();
const { Pool } = require('pg');

// Set up PostgreSQL connection pool
const pool = new Pool({
  user: "csce331_902_gabrielmarshall327",
  host: 'your_host',
  database: "jdbc:postgresql://csce-315-db.engr.tamu.edu/csce315331_02m_db",
  password: "password123",
  port: 5432,
});

app.get('/api/orders', async (req, res) => {
  try {
    const query = " SELECT * FROM orders ORDER BY id DESC LIMIT 20;";
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});