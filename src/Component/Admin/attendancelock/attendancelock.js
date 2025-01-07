import React, { useState } from "react";
import "./attendancelock.css";

const AttendanceLock = () => {
    const [employeeSelection, setEmployeeSelection] = useState("all_employees");
    const [searchQuery, setSearchQuery] = useState("");
    const [employees] = useState([
        "John Doe",
        "Jane Smith",
        "Alice Johnson",
        "Bob Brown",
        "Charlie White",
    ]); // Dummy data for employees
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    // Handle Search Input
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filtered = employees.filter((employee) =>
            employee.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredEmployees(filtered);
    };

    // Add Selected Employee
    const handleSelectEmployee = (employee) => {
        if (!selectedEmployees.includes(employee)) {
            setSelectedEmployees([...selectedEmployees, employee]);
        }
        setSearchQuery("");
        setFilteredEmployees([]);
    };

    // Remove Selected Employee
    const handleRemoveEmployee = (employee) => {
        setSelectedEmployees(selectedEmployees.filter((e) => e !== employee));
    };

    return (
        <div className="attendance-lock-container">
            {/* Radio Options */}
            <div className="radio-group">
                <label htmlFor="lock-all-employees">All Employees</label>
                <input
                    type="radio"
                    id="lock-all-employees"
                    name="employeeSelection"
                    value="all_employees"
                    checked={employeeSelection === "all_employees"}
                    onChange={(e) => setEmployeeSelection(e.target.value)}
                />
                
                <label htmlFor="lock-selected-employee">Selected Employee</label>
                <input
                    type="radio"
                    id="lock-selected-employee"
                    name="employeeSelection"
                    value="selected_employee"
                    checked={employeeSelection === "selected_employee"}
                    onChange={(e) => setEmployeeSelection(e.target.value)}
                />
            </div>

            {/* Search Input */}
            {employeeSelection === "selected_employee" && (
                <>
                    <input
                        type="search"
                        placeholder="Search Employee"
                        className="search-input"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <ul className="search-results">
                        {filteredEmployees.map((employee) => (
                            <li
                                key={employee}
                                onClick={() => handleSelectEmployee(employee)}
                                className="search-result-item"
                            >
                                {employee}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {/* Selected Employees */}
            <div className="selected-employees">
                {selectedEmployees.map((employee) => (
                    <span key={employee} className="selected-employee">
                        {employee}
                        <button
                            className="remove-button"
                            onClick={() => handleRemoveEmployee(employee)}
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>

            {/* Date Pickers */}
            <label htmlFor="from-date">From Date</label>
            <input type="date" id="from-date" name="from-date" />

            <label htmlFor="to-date">To Date</label>
            <input type="date" id="to-date" name="to-date" />

            {/* Lock/Unlock Buttons */}
            <div className="button-group">
                <button className="lock-button">Lock</button>
                <button className="unlock-button">Unlock</button>
            </div>
        </div>
    );
};

export default AttendanceLock;
