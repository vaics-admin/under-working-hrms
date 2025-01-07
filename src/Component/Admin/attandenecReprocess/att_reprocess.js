import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./att_reprocess.css";

const dummyEmployeeList = [
  "John Doe",
  "Jane Smith",
  "Alice Johnson",
  "Bob Brown",
  "Charlie Davis",
  "Emily Clark",
];

const AttReprocess = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
    setSelectedEmployees([]);
    setSearchTerm("");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectEmployee = (employee) => {
    if (!selectedEmployees.includes(employee)) {
      setSelectedEmployees([...selectedEmployees, employee]);
    }
    setSearchTerm("");
  };

  const handleRemoveEmployee = (employee) => {
    setSelectedEmployees(selectedEmployees.filter((e) => e !== employee));
  };

  const filteredSuggestions = dummyEmployeeList.filter((employee) =>
    employee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="att-reprocess">
      <h2>Attendance Reprocess</h2>
      <div className="radio-buttons-container">
        <div className="radio">
          <input
            type="radio"
            id="all"
            name="employees"
            value="all_employees"
            onChange={handleRadioChange}
          />
          <label htmlFor="all">All Employees</label>
        </div>
        <div className="radio">
          <input
            type="radio"
            id="single"
            name="employees"
            value="single_employee"
            onChange={handleRadioChange}
          />
          <label htmlFor="single">Single Employee</label>
        </div>
        <div className="radio">
          <input
            type="radio"
            id="multy"
            name="employees"
            value="multy_employees"
            onChange={handleRadioChange}
          />
          <label htmlFor="multy">Multiple Employees</label>
        </div>
      </div>

      {selectedOption !== "all_employees" && selectedOption && (
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search employee..."
            className="search-input"
          />
          {searchTerm && filteredSuggestions.length > 0 && (
            <div className="suggestions">
              {filteredSuggestions.map((employee, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSelectEmployee(employee)}
                >
                  {employee}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedOption !== "all_employees" && (
        <div className="selected-employees-container">
          {selectedEmployees.map((employee, index) => (
            <span key={index} className="selected-employee">
              {employee}
              <button
                className="remove-button"
                onClick={() => handleRemoveEmployee(employee)}
              >
                ✖
              </button>
            </span>
          ))}
        </div>
      )}

      <Button color="primary" onClick={toggleModal} className="process-button">
        Reprocess Attendance
      </Button>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Confirm Reprocess</ModalHeader>
        <ModalBody>
          {selectedOption === "all_employees" && "Reprocess for all employees."}
          {selectedOption === "single_employee" &&
            (selectedEmployees.length === 1
              ? `Reprocess for ${selectedEmployees[0]}.`
              : "No employee selected.")}
          {selectedOption === "multy_employees" &&
            (selectedEmployees.length > 0
              ? `Reprocess for: ${selectedEmployees.join(", ")}.`
              : "No employees selected.")}
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => {
              alert("Reprocess started!");
              toggleModal();
            }}
            disabled={
              (selectedOption === "single_employee" &&
                selectedEmployees.length !== 1) ||
              (selectedOption === "multy_employees" &&
                selectedEmployees.length === 0)
            }
          >
            Confirm
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AttReprocess;
