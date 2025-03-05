import { useEffect, useState } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "./history.css";

const History = () => {
  const date = new Date();

  const [leaveHistory, setLeaveHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [error, setError] = useState(null);
  const [year, setYear] = useState(date.getFullYear());

  useEffect(() => {
    const fetchLeaveTransaction = async () => {
      const id = localStorage.getItem("empcode");
      if (!id) {
        setError("Employee ID is missing.");
        return;
      }
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/leave_management/employee/getleave",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ employee_id: id }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        console.log(result);
        setLeaveHistory(result);
        filterByYear(result, year);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchLeaveTransaction();
  }, []);

  const filterByYear = (data, selectedYear) => {
    const filtered = data.filter((leave) =>
      leave.from_date && leave.from_date.includes(selectedYear)
    );
    setFilteredHistory(filtered);
  };

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
    filterByYear(leaveHistory, selectedYear);
  };

  return (
    <div className="history-container">
      {error && <p className="error-message">Error: {error}</p>}

      <div className="year-selector-container">
        <label htmlFor="year-selector" className="year-label">
          Select Year:
        </label>
        <input
          type="number"
          min="1900"
          max="2100"
          step="1"
          placeholder="YYYY"
          value={year}
          onChange={handleYearChange}
          className="year-input"
        />
      </div>

      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 650 }} aria-label="leave history table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Leave ID</TableCell>
              <TableCell align="center">Leave Type</TableCell>
              <TableCell align="center">Applied From</TableCell>
              <TableCell align="center">Applied To</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHistory.length > 0
              ? filteredHistory.map((leave) => (
                  <TableRow
                    key={leave.request_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" align="center" scope="row">
                      {leave.request_id}
                    </TableCell>
                    <TableCell align="center">
                      {leave.leave_type || "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      {leave.from_date ? leave.from_date.split("T")[0] : "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      {leave.to_date ? leave.to_date.split("T")[0] : "N/A"}
                    </TableCell>
                    <TableCell align="center">{leave.status}</TableCell>
                  </TableRow>
                ))
              : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No leaves found for {year}
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default History;
