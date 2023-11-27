const Pool = require('pg').Pool
const pool = new Pool({
  user: "csce331_902_gabrielmarshall327",
  host: "jdbc:postgresql://csce-315-db.engr.tamu.edu/csce315331_02m_db",
  database: 'orders',
  password: "password123",
  port: 5432,
});



const createEmployee = async (employeeData) => {
    const { name, position, salary, hours_worked, manager } = employeeData;
    const query = `
      INSERT INTO employees (name, position, salary, hours_worked, manager)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;`; // Adjust this query based on your table schema
  
    const values = [name, position, salary, hours_worked, manager];
  
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = {
    createEmployee,
  };