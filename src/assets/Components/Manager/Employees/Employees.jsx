import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Employees.css'; // Assuming you have a CSS file for styling
import Popup from './../Popup/Popup';
import { toUnitless } from '@mui/material/styles/cssUtils';
import { Checkbox } from '@mui/material';

/**
 * used by the manager to manage, promote, fire, and create new employees for the store
 * @returns the html and javascript for the employee tab of the site
 */
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

  const [editEmployeeId, setEditEmployeeId] = useState('');
  const [editEmployeeDetails, setEditEmployeeDetails] = useState({
    name: '',
    salary: '',
    position: '',
    manager: false,
    gitid: '', // if you want to edit this as well
  });
  const [buttonPopup2, setButtonPopup2] = useState(false);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState('');
  const [buttonPopup3, setButtonPopup3] = useState(false);
  useEffect(() => {
    axios
      .get("https://mocktea.onrender.com/employees") // Update this URL to where your API is hosted
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees", error));
  }, []);

  /**
   * creates an employee to then be submitted used the back end code
   * @param {*} e used for to create a new employee using the employee format
   */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  /**
  * handles the creation of new employees through the pop up menu
  */
  const handleSubmit = () => {
    axios.post('https://mocktea.onrender.com/employees', newEmployee)
      .then((response) => {
        setEmployees([...employees, response.data]);
        setButtonPopup(false);
        
        setNewEmployee({
          name: '',
          hours_worked: '',
          salary: '',
          position: '',
          manager: false,
          gitid: '',
        });
      })
      .catch((error) => console.error("Error adding employee", error));
  };
  /**
   * handles the input box preseving employee id to be used for handle delete
   * @param {*} e the information, specifically id, of an employee
   */
  const handleDeleteInputChange = (e) => {
    setDeleteEmployeeId(e.target.value);
  };
  /**
   * used to delete employees from the database. 
   */
  const handleDelete = () => {
    axios.delete(`https://mocktea.onrender.com/employees/${deleteEmployeeId}`)
      .then(() => {
        setEmployees(employees.filter(employee => employee.employee_id !== parseInt(deleteEmployeeId)));
        setButtonPopup2(false);
        setDeleteEmployeeId(''); // Clear input field after deletion
      })
      .catch((error) => console.error("Error deleting employee", error));
  };





  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditEmployeeDetails({
      ...editEmployeeDetails,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const fetchEmployeeToEdit = (id) => {
    const employeeToEdit = employees.find((employee) => employee.employee_id === Number(id));
    if (employeeToEdit) {
      setEditEmployeeDetails(employeeToEdit);
    }
  };


  const updateEmployee = () => {
    axios.put(`https://mocktea.onrender.com/employees/${editEmployeeId}`, editEmployeeDetails)
      .then((response) => {
        setEmployees(employees.map((employee) => 
          employee.employee_id === Number(editEmployeeId) ? response.data : employee
        ));
        setButtonPopup3(false);
      })
      .catch((error) => console.error("Error updating employee", error));
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
            <th>GitID</th>
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
      <br/>
        <h3>Add a New Employee</h3>
        
          Name <input name="name" value={newEmployee.name} onChange={handleInputChange} />
        
     
          Hours Worked Per Week <input name="hours_worked" value={newEmployee.hours_worked} onChange={handleInputChange} />
          Salary <input name="salary" value={newEmployee.salary} onChange={handleInputChange} />
 
          Position <input name="position" value={newEmployee.position} onChange={handleInputChange} />
        <div>
          Manager? <input name="manager" type='checkbox' checked={newEmployee.manager} onChange={handleInputChange} />
        </div>

          GitID: GitID: <input name="gitid" value={newEmployee.gitid} onChange={handleInputChange} />
        <button onClick={handleSubmit}>Enter</button>
      </Popup>

      <Popup trigger={buttonPopup2} setTrigger={setButtonPopup2}>
      <br/>
        <h3>Delete Employee</h3>
        Enter Employee ID <input value={deleteEmployeeId} onChange={handleDeleteInputChange}></input>
        <br/>
        <button onClick={handleDelete}>Enter</button>
      </Popup>
      
      <Popup trigger={buttonPopup3} setTrigger={setButtonPopup3}>
        <br/>
        <h3>Edit Employee Information</h3>
        Enter ID of Employee you wish to edit <input value={editEmployeeId} onChange={(e) => setEditEmployeeId(e.target.value)} onBlur={() => fetchEmployeeToEdit(editEmployeeId)}></input>
        Fill in the Fields below you wish to change
        <br/>
        Name <input name="name" value={editEmployeeDetails.name} onChange={handleEditInputChange}></input>
        Salary <input name="salary" value={editEmployeeDetails.salary} onChange={handleEditInputChange}></input>
        Position <input name="position" value={editEmployeeDetails.position} onChange={handleEditInputChange}></input>
        Manager <input name="manager" type="checkbox" checked={editEmployeeDetails.manager} onChange={handleEditInputChange}></input>
        GitID <input name="gitid" value={editEmployeeDetails.gitid} onChange={handleEditInputChange}></input>
        <br />
        <button onClick={updateEmployee}>Submit</button>
      </Popup>



      <br />
      <button className='pop' onClick={() => setButtonPopup2(true)}>Delete Employee</button>
      <br />
      <button className='pop' onClick={() => setButtonPopup(true)}>Add New Employee</button>
      <br />
      <button className='pop' onClick={() => setButtonPopup3(true)}>Edit Employee Details</button>
    </div>
   
  );
}