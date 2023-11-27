import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Employees.css'; // Assuming you have a CSS file for styling
import Popup from './popup';
import { toUnitless } from '@mui/material/styles/cssUtils';
import { Checkbox } from '@mui/material';
export const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    hours_worked: '',
    salary: '',
    position: '',
    manager: false,
  });
  const [buttonPopup2, setButtonPopup2] = useState(false);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employees") // Update this URL to where your API is hosted
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = () => {
    axios.post('http://localhost:5000/api/employees', newEmployee)
      .then((response) => {
        setEmployees([...employees, response.data]);
        setButtonPopup(false);
        
        setNewEmployee({
          name: '',
          hours_worked: '',
          salary: '',
          position: '',
          manager: false,
        });
      })
      .catch((error) => console.error("Error adding employee", error));
  };

  const handleDeleteInputChange = (e) => {
    setDeleteEmployeeId(e.target.value);
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/employees/${deleteEmployeeId}`)
      .then(() => {
        setEmployees(employees.filter(employee => employee.employee_id !== parseInt(deleteEmployeeId)));
        setButtonPopup2(false);
        setDeleteEmployeeId(''); // Clear input field after deletion
      })
      .catch((error) => console.error("Error deleting employee", error));
  };
  
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
          {employees.map((employee) => {
            console.log(employee); // Logging each employee, if needed
            return (
              <tr key={employee.employee_id}>
                <td>{employee.employee_id}</td>
                <td>{employee.name}</td>
                <td>{employee.hours_worked}</td>
                <td>${employee.salary}</td>
                <td>{employee.position}</td>
                <td>{employee.manager ? 'Yes' : 'No'}</td>
              </tr>
            );
          })}
        </tbody>
      </table> 
      <br/>
      <br/>
      <br/>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h3>Add a New Employee</h3>
        
          Name <input name="name" value={newEmployee.name} onChange={handleInputChange} />
        
     
          Hours Worked Per Week <input name="hours_worked" value={newEmployee.hours_worked} onChange={handleInputChange} />
          Salary <input name="salary" value={newEmployee.salary} onChange={handleInputChange} />
 
          Position <input name="position" value={newEmployee.position} onChange={handleInputChange} />
        <div>
          Manager? <input name="manager" type='checkbox' checked={newEmployee.manager} onChange={handleInputChange} />
        </div>
        <button onClick={handleSubmit}>Enter</button>
      </Popup>

      <Popup trigger={buttonPopup2} setTrigger={setButtonPopup2}>
        <h3>Delete Employee</h3>
        Enter Employee ID <input value={deleteEmployeeId} onChange={handleDeleteInputChange}></input>
        <br/>
        <button onClick={handleDelete}>Enter</button>
      </Popup>
      <button onClick={() => setButtonPopup2(true)}>Delete Employee</button>
      <button onClick={() => setButtonPopup(true)}>Add New Employee</button>
    </div>
   
  );
}