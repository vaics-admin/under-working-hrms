import React, { useState, useEffect } from "react";
import "./resignation.css";

const ResignationForm = () => {
  const today = new Date().toISOString().split("T")[0];
  const [resignationDate, setResignationDate] = useState(today);
  const [relievingDate, setRelievingDate] = useState("");
  const [personalContact, setPersonalContact] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [remarks, setRemarks] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [resignationType, setResignationType] = useState("voluntary");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [allCommunicationAddress, setAllCommunicationAddress] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [proposedWorkingDay, setProposedWorkingDay] = useState("");
  const [reasonForLeaving, setReasonForLeaving] = useState(""); // New state for reason

  useEffect(() => {
    const date = new Date(resignationDate);
    date.setDate(date.getDate() + 90);
    setRelievingDate(date.toISOString().split("T")[0]);
  }, [resignationDate]);

  const handleFileChange = (event) => {
    setAttachment(event.target.files[0]);
  };

  const handleApply = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!personalEmail || !personalContact || !reasonForLeaving) {
      alert("Please fill in all required fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(personalEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    const resignationData = {
      resignationDate,
      relievingDate,
      resignationType,
      permanentAddress,
      allCommunicationAddress,
      personalEmail,
      personalContact,
      remarks,
      attachment: attachment ? attachment.name : null,
      bankAccountNumber,
      bankName,
      ifscCode,
      proposedWorkingDay,
      reasonForLeaving, // Include reason for leaving in the data
    };

    try {
      const response = await fetch("http://localhost:5000/api/resignation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resignationData),
      });

      if (response.ok) {
        alert("Application submitted successfully!");
      } else {
        alert("Failed to submit application.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting application. Please try again later.");
    }
  };

  return (
    <div className="resignation-form-main-container">
      <div className="form-container">
        <h1 className="form-title">Resignation Form</h1>
        <form onSubmit={handleApply} className="resignation-form">
          {/* Personal Information Section */}
          <section className="form-section">
            <h2>Personal Information</h2>
            <div className="form-group">
              <label htmlFor="resignation-date">Resignation Date:</label>
              <input
                type="date"
                id="resignation-date"
                value={resignationDate}
                min={today}
                onChange={(e) => setResignationDate(e.target.value)}
                className="resignation-date-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="relieving-date">
                Relieving Date (As Per Policy):
              </label>
              <input
                type="text"
                id="relieving-date"
                value={relievingDate}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="personal-contact">Personal Contact:</label>
              <input
                type="tel"
                id="personal-contact"
                value={personalContact}
                onChange={(e) => setPersonalContact(e.target.value)}
                placeholder="Enter your contact number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="personal-email">Personal Email:</label>
              <input
                type="email"
                id="personal-email"
                value={personalEmail}
                onChange={(e) => setPersonalEmail(e.target.value)}
                placeholder="Enter your email address"
              />
            </div>
          </section>

          {/* Reason for Leaving Section */}
          <section className="form-section">
            <h2>Reason for Leaving</h2>
            <div className="form-group">
              <label htmlFor="reason-for-leaving">
                Select Reason for Leaving:
              </label>
              <select
                id="reason-for-leaving"
                value={reasonForLeaving}
                onChange={(e) => setReasonForLeaving(e.target.value)}
                className="reason-select"
              >
                <option value="">Select a reason</option>
                <option value="Career Growth">Career Growth</option>
                <option value="Higher Studies">Higher Studies</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
          </section>

          {/* Address Details Section */}
          <section className="form-section">
            <h2>Address Details</h2>
            <div className="form-group">
              <label htmlFor="permanent-address">Permanent Address:</label>
              <input
                type="text"
                id="permanent-address"
                value={permanentAddress}
                onChange={(e) => setPermanentAddress(e.target.value)}
                placeholder="Enter your permanent address"
              />
            </div>
            <div className="form-group">
              <label htmlFor="all-communication-address">
                All Communication Address:
              </label>
              <input
                type="text"
                id="all-communication-address"
                value={allCommunicationAddress}
                onChange={(e) => setAllCommunicationAddress(e.target.value)}
                placeholder="Enter your communication address"
              />
            </div>
          </section>

          {/* Bank Details Section */}
          <section className="form-section">
            <h2>Bank Details</h2>
            <div className="form-group">
              <label htmlFor="bank-account-number">Bank Account Number:</label>
              <input
                type="text"
                id="bank-account-number"
                value={bankAccountNumber}
                onChange={(e) => setBankAccountNumber(e.target.value)}
                placeholder="Enter your bank account number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="bank-name">Bank Name:</label>
              <input
                type="text"
                id="bank-name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="Enter your bank's name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="ifsc-code">IFSC Code:</label>
              <input
                type="text"
                id="ifsc-code"
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value)}
                placeholder="Enter your bank's IFSC code"
              />
            </div>
          </section>

          {/* Additional Details Section */}
          <section className="form-section">
            <h2>Additional Details</h2>
            <div className="form-group">
              <label htmlFor="remarks">Remarks:</label>
              <textarea
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Any additional remarks"
                className="textarea-remarks"
              />
            </div>
            <div className="form-group">
              <label htmlFor="attachment">Attach File:</label>
              <input type="file" id="attachment" onChange={handleFileChange} />
            </div>
            <div className="form-group">
              <label htmlFor="proposed-working-day">
                Proposed Last Working Day:
              </label>
              <input
                type="date"
                id="proposed-working-day"
                value={proposedWorkingDay}
                onChange={(e) => setProposedWorkingDay(e.target.value)}
              />
            </div>
          </section>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResignationForm;
