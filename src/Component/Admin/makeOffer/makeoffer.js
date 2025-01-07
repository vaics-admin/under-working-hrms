import "./makeOffer.css";
import React, { useState } from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

const MakeOffer = () => {
  const [inputs, setInputs] = useState({
    companyName: "",
    offerDetails: "",
    validUntil: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [emailDetails, setEmailDetails] = useState({
    to: "",
    cc: "",
    subject: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailDetails((prev) => ({ ...prev, [name]: value }));
  };

  const generateWordDocument = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: `Offer for ${inputs.companyName}`, bold: true }),
              ],
            }),
            new Paragraph({
              children: [new TextRun({ text: inputs.offerDetails })],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `Valid Until: ${inputs.validUntil}`, italics: true }),
              ],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "Offer.docx");
    });
  };

  const sendEmail = async () => {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: emailDetails.to,
        cc: emailDetails.cc,
        subject: emailDetails.subject,
        body: ` 
          <h1>Offer for ${inputs.companyName}</h1>
          <p>${inputs.offerDetails}</p>
          <p><strong>Valid Until:</strong> ${inputs.validUntil}</p>
        `,
      }),
    });

    if (response.ok) alert("Email sent successfully!");
    else alert("Failed to send email.");
  };

  return (
    <div className="makeoffer-container">
      <h2 className="makeoffer-header">Make an Offer</h2>
      <div className="makeoffer-form-container">
        <label htmlFor="companyName">Company Name</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={inputs.companyName}
          onChange={handleInputChange}
          className="makeoffer-input-field"
        />

        <label htmlFor="offerDetails">Offer Details</label>
        <textarea
          id="offerDetails"
          name="offerDetails"
          value={inputs.offerDetails}
          onChange={handleInputChange}
          className="makeoffer-textarea-field"
          rows="4"
        />

        <label htmlFor="validUntil">Valid Until</label>
        <input
          type="date"
          id="validUntil"
          name="validUntil"
          value={inputs.validUntil}
          onChange={handleInputChange}
          className="makeoffer-input-field"
        />
      </div>

      <h3 className="makeoffer-preview-title">Preview:</h3>
      <div className="makeoffer-preview-container">
        <h2>Offer for {inputs.companyName}</h2>
        <p>{inputs.offerDetails}</p>
        <p>
          <strong>Valid Until:</strong> {inputs.validUntil}
        </p>
      </div>

      <div className="makeoffer-action-buttons">
        <button onClick={generateWordDocument} className="makeoffer-btn makeoffer-primary-btn">
          Download as Word
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="makeoffer-btn makeoffer-secondary-btn"
        >
          Send Email
        </button>
      </div>

      {showModal && (
        <div className="makeoffer-modal-overlay">
          <div className="makeoffer-modal-content">
            <h3>Send Email</h3>
            <label htmlFor="to">To</label>
            <input
              type="email"
              id="to"
              name="to"
              value={emailDetails.to}
              onChange={handleEmailChange}
              className="makeoffer-input-field"
            />

            <label htmlFor="cc">CC</label>
            <input
              type="email"
              id="cc"
              name="cc"
              value={emailDetails.cc}
              onChange={handleEmailChange}
              className="makeoffer-input-field"
            />

            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={emailDetails.subject}
              onChange={handleEmailChange}
              className="makeoffer-input-field"
            />

            <button onClick={sendEmail} className="makeoffer-btn makeoffer-primary-btn">
              Send
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="makeoffer-btn makeoffer-secondary-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MakeOffer;
