const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 5000;
app.use(express.json());
const pool = new Pool({
  user: "csce331_902_gabrielmarshall327",
  host: "csce-315-db.engr.tamu.edu",
  database: "csce315331_02m_db",
  password: "password123",
  port: 5432,
});

app.use(cors());

app.get("/products", async (req, res) => {
  try {
    // Updated to fetch all columns for each product
    const result = await pool.query("SELECT * FROM product");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/employees", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM employees");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching employees", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/employees", async (req, res) => {
  try {
    const { name, hours_worked, salary, position, manager, gitid } = req.body;
    const newEmployeeQuery = `
      INSERT INTO employees (name, hours_worked, salary, position, manager, gitid)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;`;

    const result = await pool.query(newEmployeeQuery, [name, hours_worked, salary, position, manager, gitid]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding new employee", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.get("/inventory", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM inventory");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching inventory", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteQuery = 'DELETE FROM employees WHERE employee_id = $1 RETURNING *;';

    const result = await pool.query(deleteQuery, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully", employee: result.rows[0] });
  } catch (error) {
    console.error("Error deleting employee", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/inventory", async (req, res) => {
  try {
    const { name, price_per_unit, quantity, last_bought_date, minimum } = req.body;
    const newInventoryQuery = `
      INSERT INTO inventory (name, price_per_unit, quantity, last_bought_date, minimum)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;`;

    const result = await pool.query(newInventoryQuery, [name, price_per_unit, quantity, last_bought_date, minimum]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding new inventory item", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteQuery = "DELETE FROM inventory WHERE id = $1 RETURNING *";

    const result = await pool.query(deleteQuery, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully", deletedItem: result.rows[0] });
  } catch (error) {
    console.error("Error deleting item", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.post("/products", async (req, res) => {
  try {
    // Destructure the product information from the request body
    const { name, price, ingredients, image_url } = req.body;

    // Construct the insert query
    const newProductQuery = `
      INSERT INTO product (name, price, ingredients, image_url)
      VALUES ($1, $2, $3, $4)
      RETURNING *;`;

    
    // Execute the query with the product information
    const result = await pool.query(newProductQuery, [name, price, ingredients, image_url]);

    // Respond with the newly inserted product row
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding new product", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteQuery = "DELETE FROM product WHERE id = $1 RETURNING *";

    const result = await pool.query(deleteQuery, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Product deleted successfully", deletedItem: result.rows[0] });
  } catch (error) {
    console.error("Error deleting product", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.get("/sales-data", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT date_trunc('day', order_date) AS day, SUM(price + tip) AS total_sales
      FROM orders
      GROUP BY day
      ORDER BY day;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching sales data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/product-sales-data", async (req, res) => {
  const productName = req.query.productName;
  try {
    const result = await pool.query(`
      SELECT date_trunc('day', order_date) AS day, COUNT(*) AS number_of_sales
      FROM orders
      WHERE items @> $1::text[] -- Assuming items is a text array and contains the product names
      GROUP BY day
      ORDER BY day;
    `, [`{"${productName}"}`]); // This binds the productName as an array element for the query
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching sales data for product", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});