const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));
var bodyParser = require('body-parser');

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
app.use(bodyParser.json());



//used as identification to connect to the login api
const CLIENT_ID = "c1e2a3c233d9b16112ee";
const CLIENT_SECRET = "a24ff8ff78fb3910d162c62667d21c0a336526f5";

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
    console.error("Error fetching products", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/placeorder/", async (req, res) => {
res.send("hello this is a test")
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//USED FOR LOGIN 
app.get('/getAccessToken', async function (req, res) {
  console.log(req.query.code);

  const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;
  
  await fetch("https://github.com/login/oauth/access_token" + params, {
      method: "POST",
      headers: {
          "Accept": "application/json"
      }
  }).then((response) => {
      return response.json();
  }).then((data) => {
      console.log("access token");
      console.log(data)
      res.json(data);
  })
});

//getUserData
app.get('/getUserData', async function (req, res) {
  req.get("Authorization"); //access token
  await fetch("https://api.github.com/user", {
      method: "GET",
      headers: {
          clientID: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          "Authorization" : req.get("Authorization")
      }
  }).then((response) => { 
      return response.json();
  }).then((data) => {
      console.log("user data: ");
      console.log(data);
      res.json(data);
  })
});


app.get('/employees', async function (req, res) {
  const gitidValue = req.query.gitid;
  const query = 'SELECT manager FROM employees WHERE gitid = $1';
  const result = await pool.query(query, [gitidValue]).then((response) => {
    return response.rows;
  }).then((data) => {
    console.log("employee verify: ");
    console.log(data[0]);
    res.json(data[0]);
  });

});
