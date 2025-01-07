import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeSearch.css'; // Import styles

const Employee_Search = () => {
    const [name, setName] = useState('');
    const [employees, setEmployees] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        email: '',
        position: '',
        department: '',
        date_of_birth: '',
        salary: '',
        employment_date: '',
        phone: '',
        address: '',
        status: 'Active'
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const response = await axios.get('http://localhost:5000/employees');
        setEmployees(response.data.data);
    };

    const handleSearch = async () => {
        if (name.trim()) {
            const response = await axios.get(`http://localhost:5000/employees/search/${name}`);
            setSuggestions(response.data);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (employee) => {
        setSelectedEmployee(employee);
        setNewEmployee(employee); // Populate the form with selected employee data
        setSuggestions([]);
        setName('');
    };

    const handleUpdateEmployee = async () => {
        if (selectedEmployee) {
            await axios.put(`http://localhost:5000/employees/update/${selectedEmployee.id}`, newEmployee);
            fetchEmployees(); // Refresh the list after updating
            clearForm();
        }
    };

    const clearForm = () => {
        setSelectedEmployee(null);
        setNewEmployee({
            name: '',
            email: '',
            position: '',
            department: '',
            date_of_birth: '',
            salary: '',
            employment_date: '',
            phone: '',
            address: '',
            status: 'Active'
        });
    };

    return (
        <div className="container">
            <h1>Employee Management System</h1>
            <header>
                <h2>Employee Search</h2>
            </header>
            <input
                type="text"
                value={name}
                placeholder="Search Employee"
                onChange={(e) => {
                    setName(e.target.value);
                    handleSearch(); // Show suggestions on input change
                }}
            />
            <div className="suggestions">
                {suggestions.map((employee) => (
                    <div key={employee.id} onClick={() => handleSuggestionClick(employee)}>
                        {employee.name} - {employee.position}
                    </div>
                ))}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleUpdateEmployee(); }}>
                <h2>Update Employee Details</h2>
                <input
                    type="text"
                    required
                    placeholder="Name"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                />
                <input
                    type="email"
                    required
                    placeholder="Email"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                />
                <input
                    type="text"
                    required
                    placeholder="Position"
                    value={newEmployee.position}
                    onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                />
                <input
                    type="text"
                    required
                    placeholder="Department"
                    value={newEmployee.department}
                    onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                />
                <input
                    type="date"
                    required
                    value={newEmployee.date_of_birth}
                    onChange={(e) => setNewEmployee({ ...newEmployee, date_of_birth: e.target.value })}
                />
                <input
                    type="number"
                    required
                    placeholder="Salary"
                    value={newEmployee.salary}
                    onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
                />
                <input
                    type="date"
                    required
                    value={newEmployee.employment_date}
                    onChange={(e) => setNewEmployee({ ...newEmployee, employment_date: e.target.value })}
                />
                <input
                    type="text"
                    required
                    placeholder="Phone"
                    value={newEmployee.phone}
                    onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                />
                <textarea
                    required
                    placeholder="Address"
                    value={newEmployee.address}
                    onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })}
                />
                <select
                    value={newEmployee.status}
                    onChange={(e) => setNewEmployee({ ...newEmployee, status: e.target.value })}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On Leave">On Leave</option>
                </select>
                <button type="submit">Update Employee</button>
            </form>
        </div>
    );
};

export default Employee_Search;
