import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Employees.css'; // Assuming you have a CSS file for styling

export const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employees") // Update this URL to where your API is hosted
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees", error));
  }, []);

  return (
    <div className="centered-container-employees">
      <h1>Employee List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Hours Worked</th>
            <th>Salary</th>
            <th>Position</th>
            <th>Manager</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.hours_worked}</td>
              <td>${employee.salary}</td>
              <td>{employee.position}</td>
              <td>{employee.is_manager == true ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
