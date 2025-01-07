import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./uploadEmployee.css";

const EmployeeUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState([]);

  const handleDownloadTemplate = () => {
    const templatePath = "/Book1.xlsx";
    const link = document.createElement("a");
    link.href = templatePath;
    link.download = "EmployeeDetailsTemplate.xlsx";
    link.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0]; // First sheet
      const sheet = workbook.Sheets[sheetName];

      // Convert to JSON format with blank cells preserved
      const jsonData = XLSX.utils.sheet_to_json(sheet, {
        header: 1, // Return array of arrays (row by row)
        blankrows: true, // Preserve empty rows
      });

      // Calculate maximum number of columns
      const maxColumns = Math.max(...jsonData.map((row) => row.length));

      // Pad each row to have the same number of columns
      const paddedData = jsonData.map((row) =>
        Array.from({ length: maxColumns }, (_, i) => row[i] || "") // Replace missing cells with empty strings
      );

      setFilePreview(paddedData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      fetch("http://example.com/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            alert("File uploaded successfully!");
          } else {
            alert("Failed to upload the file.");
          }
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          alert("An error occurred during file upload.");
        });
    } else {
      alert("Please select a file before uploading.");
    }
  };

  return (
    <div>
      <h2>Upload Employee Details</h2>
      <button onClick={handleDownloadTemplate} className="download-button">
        Download Excel Template
      </button>

      <div style={{ marginTop: "20px" }}>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="upload-input"
        />
        <button onClick={handleUpload} className="upload-button">
          Upload File
        </button>
      </div>

      {filePreview.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>File Preview:</h3>
          <table className="file-preview-table">
            <thead>
              <tr>
                {filePreview[0]?.map((header, index) => (
                  <th key={index}>{header || " "}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filePreview.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell || " "}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeUpload;
