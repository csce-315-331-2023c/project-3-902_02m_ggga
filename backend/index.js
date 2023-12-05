const port = 5000;
const express = require('express')
const app = express()
const {Translate} = require('@google-cloud/translate').v2;
const order_model = require('./model')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  model.getOrders()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
app.get("/employees", (req, res) => {
  employee_model
    .getEmployees()
    .then((response) => {
    })
    .catch((error) => {
      res.status(200).send(response);
      res.status(500).send(error);
    });
});
app.post("/api/employees", async (req, res) => {
  try {
    const newEmployee = await employee_model.createEmployee(req.body);
  } catch (error) {
    console.error("Error adding new employee", error);
  }
});
    res.status(500).json({ error: "Internal Server Error" });
    res.status(201).json(newEmployee);