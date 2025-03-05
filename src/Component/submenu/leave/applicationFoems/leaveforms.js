import React, { useState, useEffect } from "react";
import "./leaveforms.css";

export const Leaveforms = () => {
  const [leaveDetails, setLeaveDetails] = useState({
    fromDate: "",
    toDate: "",
    leaveType: "",
    reason: "",
    reasonText: "",
    employee_id: localStorage.getItem("empcode"),
    familyMember: "",
    isHalfDay: false, // Track if half-day is selected
    halfDayType: "", // Track whether it's first or second half
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

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setLeaveDetails((prevState) => {
      let updatedLeaveDetails = {
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      };

      // When leave type changes, reset any previous conditions that don't apply anymore
      if (name === "leaveType") {
        updatedLeaveDetails.isHalfDay = false; // Reset half-day options when leave type changes
        updatedLeaveDetails.halfDayType = ""; // Reset half-day type

        setShowLOPWarning(false); // Reset LOP warning
        setValidationErrors([]); // Clear any existing validation errors

        // If "Others" is selected, we need to allow custom reason input
        if (value === "Others") {
          setIsOtherReason(true); // Show the "Please Specify Reason" input
        } else {
          setIsOtherReason(false); // Hide the "Please Specify Reason" input
        }

        // If leave type is not "Half Day", clear the related options
        if (value !== "Half Day") {
          updatedLeaveDetails.isHalfDay = false;
          updatedLeaveDetails.halfDayType = "";
        }
      }

      return updatedLeaveDetails;
    });
  };

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
      const response = await fetch(
        "http://127.0.0.1:5000/leave_management/validate-leave",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...leaveDetails,
            reason: leaveDetails.reasonText || leaveDetails.reason,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setValidationErrors([]);
        return true;
      } else if (data.errors) {
        setValidationErrors(data.errors);
        if (
          leaveDetails.leaveType === "LOP" &&
          data.errors.some((error) =>
            error.includes("Warning: You have leave balance available")
          )
        ) {
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

    const isValid = await validateLeave();

    if (!isValid && !showLOPWarning) {
      return;
    }

    try {
      const formData = {
        ...leaveDetails,
        reason: leaveDetails.reasonText || leaveDetails.reason,
      };

      const response = await fetch(
        "http://127.0.0.1:5000/leave_management/addleaverequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setLeaveDetails({
          fromDate: "",
          toDate: "",
          leaveType: "",
          reason: "",
          reasonText: "",
          employee_id: localStorage.getItem("empcode"),
          familyMember: "",
          isHalfDay: false,
          halfDayType: "",
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
    <div className="leave-form-container">
      <h2 className="text-xl font-semibold mb-4">Apply for Leave</h2>

      {submitSuccess && (
        <div className="success-message">
          Leave request submitted successfully!
        </div>
      )}

      <form onSubmit={submitLeaveRequest} className="leave-form space-y-4">
        <div className="grid">
          <div>
            <label>From Date</label>
            <input
              type="date"
              name="fromDate"
              value={leaveDetails.fromDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>To Date</label>
            <input
              type="date"
              name="toDate"
              value={leaveDetails.toDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Half Day leave option */}
        <div className="half-day-container">
          <label className="half-day-checkbox">
            <input
              type="checkbox"
              name="isHalfDay"
              checked={leaveDetails.isHalfDay}
              onChange={handleChange}
              style={{ width: "40px" }}
            />
            Half Day Leave
          </label>

          {leaveDetails.isHalfDay && (
            <div className="half-day-options">
              <label>
                <input
                  type="radio"
                  name="halfDayType"
                  value="firstHalf"
                  checked={leaveDetails.halfDayType === "firstHalf"}
                  onChange={handleChange}
                  style={{ fontWeight: "bold", color: "black" }}
                />
                First Half
              </label>

              <label>
                <input
                  type="radio"
                  name="halfDayType"
                  value="secondHalf"
                  checked={leaveDetails.halfDayType === "secondHalf"}
                  onChange={handleChange}
                />
                Second Half
              </label>
            </div>
          )}
        </div>

        <div>
          <label>Leave Type</label>
          <select
            name="leaveType"
            value={leaveDetails.leaveType}
            onChange={handleChange}
            required
          >
            <option value="">Select Leave Type</option>
            {leaveTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {leaveDetails.leaveType === "Bereavement Leave" && (
          <div>
            <label>Family Member</label>
            <select
              name="familyMember"
              value={leaveDetails.familyMember}
              onChange={handleChange}
              required
            >
              <option value="">Select Family Member</option>
              {familyMembers.map((member) => (
                <option key={member.value} value={member.value}>
                  {member.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {isOtherReason && (
          <div>
            <label>Please Specify Reason</label>
            <input
              type="text"
              name="reason"
              value={leaveDetails.reason}
              onChange={handleChange}
              placeholder="Enter specific reason for leave"
              required
            />
          </div>
        )}

        <div>
          <label>{isOtherReason ? "Additional Details" : "Reason for Leave"}</label>
          <textarea
            name="reasonText"
            value={leaveDetails.reasonText}
            onChange={handleChange}
            rows="4"
            required
            placeholder="Provide detailed explanation for your leave request"
          />
        </div>

        {validationErrors.length > 0 && (
          <div className="error-message">
            <ul>
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {showLOPWarning && (
          <div className="warning-message">
            You have leave balance available. Are you sure you want to proceed with LOP?
          </div>
        )}

        <button type="submit" className="submit-button">
          Submit Leave Request
        </button>
      </form>
    </div>
  );
};

export default Leaveforms;
