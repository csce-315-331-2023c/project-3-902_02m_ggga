const express = require("express");
const app = express();
const port = 5000;

const order_model = require("./model"); // Assuming this is correctly pointing to your model file
const employee_model = require("./employee_model");
// import inventory_model if you're using it

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.get("/", (req, res) => {
  order_model
    .getOrders()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/employees", (req, res) => {
  employee_model
    .getEmployees()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Include other routes here, if any

app.post("/api/employees", async (req, res) => {
  try {
    const newEmployee = await employee_model.createEmployee(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error adding new employee", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
