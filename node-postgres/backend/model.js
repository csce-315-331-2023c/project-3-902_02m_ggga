const Pool = require('pg').Pool
const pool = new Pool({
  user: "csce331_902_gabrielmarshall327",
  host: "jdbc:postgresql://csce-315-db.engr.tamu.edu/csce315331_02m_db",
  database: 'csce315331_02m_db',
  password: "password123",
  port: 5432,
});

const getOrders = async () => {
    try {
      return await new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM orders ORDER BY id DESC LIMIT 20;", (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        });
      });
    } catch (error_1) {
      console.error(error_1);
      throw new Error("Internal server error");
    }
  };

  module.exports = {
    getOrders
  };