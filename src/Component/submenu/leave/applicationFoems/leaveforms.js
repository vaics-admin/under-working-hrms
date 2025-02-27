
// src/components/leaveManagement/applicationForms/leaveforms.js
import React, { useState, useEffect } from "react";
import "./leaveforms.css";
import { color } from "@mui/system";

export const Leaveforms = () => {
  // State to store leave request details
  const [leaveDetails, setLeaveDetails] = useState({
    fromDate: "",
    toDate: "",
    leaveType: "",
    reason: "",
    reasonText: "",
    employee_id: localStorage.getItem("empcode"),
    familyMember: ""
  });

  const [validationErrors, setValidationErrors] = useState([]);
  const [showLOPWarning, setShowLOPWarning] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isOtherReason, setIsOtherReason] = useState(false);

  const leaveTypes = [
    { value: "Earned Leave", label: "Earned Leave" },
    { value: "LOP", label: "Loss of Pay (LOP)" },
    { value: "Maternity Leave", label: "Maternity Leave" },
    { value: "Paternity Leave", label: "Paternity Leave" },
    { value: "Bereavement Leave", label: "Bereavement Leave" },
    { value: "Others", label: "Others" },
  ];

  const familyMembers = [
    { value: "parent", label: "Parent" },
    { value: "spouse", label: "Spouse" },
    { value: "child", label: "Child" },
    { value: "sibling", label: "Sibling" },
  ];

  // Handler for input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update state
    setLeaveDetails({
      ...leaveDetails,
      [name]: value,
    });

    // Reset warnings when leave type changes
    if (name === 'leaveType') {
      setShowLOPWarning(false);
      setValidationErrors([]);
      setIsOtherReason(value === "Others");
    }
  };

  // Clear success message after 5 seconds
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  const validateLeave = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/leave_management/validate-leave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...leaveDetails,
          reason: leaveDetails.reasonText || leaveDetails.reason
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setValidationErrors([]);
        return true;
      } else if (data.errors) {
        setValidationErrors(data.errors);
        if (leaveDetails.leaveType === "LOP" && data.errors.some(error => error.includes("Warning: You have leave balance available"))) {
          setShowLOPWarning(true);
        }
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error validating leave:", error);
      setValidationErrors(["Error connecting to server. Please try again."]);
      return false;
    }
  };

  const submitLeaveRequest = async (event) => {
    event.preventDefault();
    
    // Always validate first
    const isValid = await validateLeave();
    
    // If LOP warning is shown, we still allow submission
    // Otherwise, we check if there are validation errors
    if (!isValid && !showLOPWarning) {
      return;
    }

    try {
      const formData = {
        ...leaveDetails,
        reason: leaveDetails.reasonText || leaveDetails.reason
      };

      const response = await fetch("http://127.0.0.1:5000/leave_management/addleaverequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Reset form and show success message
        setLeaveDetails({
          fromDate: "",
          toDate: "",
          leaveType: "",
          reason: "",
          reasonText: "",
          employee_id: localStorage.getItem("empcode"),
          familyMember: ""
        });
        setValidationErrors([]);
        setShowLOPWarning(false);
        setSubmitSuccess(true);
        setIsOtherReason(false);
      } else {
        const data = await response.json();
        setValidationErrors([data.error || "Failed to submit leave request"]);
      }
    } catch (error) {
      console.error("Error submitting leave request:", error);
      setValidationErrors(["Error connecting to server. Please try again."]);
    }
  };

  return (
    <div className="leave-form-container w-full max-w-2xl mx-auto p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Apply for Leave</h2>
      
      {submitSuccess && (
        <div className="p-3 mb-4 border border-green-500 bg-green-100 text-green-700 rounded">
          Leave request submitted successfully!
        </div>
      )}
      
      <form onSubmit={submitLeaveRequest} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">From Date</label>
            <input
              type="date"
              name="fromDate"
              value={leaveDetails.fromDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">To Date</label>
            <input
              type="date"
              name="toDate"
              value={leaveDetails.toDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Leave Type</label>
          <select
            name="leaveType"
            value={leaveDetails.leaveType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Leave Type</option>
            {leaveTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        {leaveDetails.leaveType === "Bereavement Leave" && (
          <div>
            <label className="block text-sm font-medium mb-1">Family Member</label>
            <select
              name="familyMember"
              value={leaveDetails.familyMember}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Family Member</option>
              {familyMembers.map(member => (
                <option key={member.value} value={member.value}>{member.label}</option>
              ))}
            </select>
          </div>
        )}
        
        {isOtherReason && (
          <div>
            <label className="block text-sm font-medium mb-1">Please Specify Reason</label>
            <input
              type="text"
              name="reason"
              value={leaveDetails.reason}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              placeholder="Enter specific reason for leave"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">
            {isOtherReason ? "Additional Details" : "Reason for Leave"}
          </label>
          <textarea
            name="reasonText"
            value={leaveDetails.reasonText}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
            placeholder="Provide detailed explanation for your leave request"
          />
        </div>

        {validationErrors.length > 0 && (
          <div className="p-3 border border-red-500 bg-red-100 text-red-700 rounded">
            <ul className="list-disc pl-4">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {showLOPWarning && (
          <div className="p-3 border border-yellow-500 bg-yellow-100 text-yellow-700 rounded">
            You have leave balance available. Are you sure you want to proceed with LOP?
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded hover:bg-primary-dark"
        >
          Submit Leave Request
        </button>
      </form>
    </div>
  );
};

export default Leaveforms;

