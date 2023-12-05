import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Employees.css'; // Assuming you have a CSS file for styling
import Popup from './../Popup/Popup';
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
    gitid: '', // Add the gitid field
  });
  
  const [buttonPopup3, setButtonPopup3] = useState(false);

  const [editEmployee, setEditEmployee] = useState({ // Add state for editing employee
    id: '',
    name: '',
    hours_worked: '',
    salary: '',
    position: '',
    manager: false,
    gitid: '',
  });

  const [buttonPopup2, setButtonPopup2] = useState(false);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:5000/employees") // Update this URL to where your API is hosted
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
    console.log("Submitting new employee:", newEmployee); // Debugging
  
    axios.post('http://localhost:5000/employees', newEmployee)
      .then((response) => {
        console.log("Response from server:", response.data); // Debugging
  
        setEmployees([...employees, response.data]);
        setButtonPopup(false);
  
        setNewEmployee({
          name: '',
          hours_worked: '',
          salary: '',
          position: '',
          manager: false,
          gitid: '', // Reset gitid to an empty string
        });
      })
      .catch((error) => console.error("Error adding employee", error));
  };
  
  

  const handleDeleteInputChange = (e) => {
    setDeleteEmployeeId(e.target.value);
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/${deleteEmployeeId}`)
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
            <th>gitid</th>
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
                <td>{employee.gitid}</td>
              
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
        Name: <input name="name" value={newEmployee.name} onChange={handleInputChange} />
        Hours Worked Per Week: <input name="hours_worked" value={newEmployee.hours_worked} onChange={handleInputChange} />
        Salary: <input name="salary" value={newEmployee.salary} onChange={handleInputChange} />
        Position: <input name="position" value={newEmployee.position} onChange={handleInputChange} />
        GitID: <input name="gitid" value={newEmployee.gitid} onChange={handleInputChange} /> 
        Manager? <input name="manager" type="checkbox" checked={newEmployee.manager} onChange={handleInputChange} />
          <br />
        <button onClick={handleSubmit}>Enter</button>
    </Popup>

      <Popup trigger={buttonPopup2} setTrigger={setButtonPopup2}>
        <h3>Delete Employee</h3>
        Enter Employee ID <input value={deleteEmployeeId} onChange={handleDeleteInputChange}></input>
        <br/>
        <button onClick={handleDelete}>Enter</button>
      </Popup>


        
      <Popup trigger={buttonPopup3} setTrigger={setButtonPopup3}>
        <h3>Edit Employee Info</h3>
        Input ID of employee you wish to edit: <input></input>
        
        <h3>Provide Info for any of the fields you wish to change</h3>

        New Name: <input></input>

        New Hours: <input></input>

        New Salary: <input></input>

        New Position: <input></input>

        New Manager: <input></input>

        New GitID: <input></input>
          <br></br>
        <button>Sumbit</button>

      </Popup>


      
      <button className="popup-button" onClick={() => setButtonPopup2(true)}>Delete Employee</button>
      <br></br>
      <button className="popup-button" onClick={() => setButtonPopup(true)}>Add New Employee</button>
      <br></br>
      <button className="popup-button"  onClick={() => setButtonPopup3(true)}>Edit Employee Info</button>
    </div>
   
  );
}