import React from 'react';
import './attendancetable.css';

const AttendanceSummary = () => {
  const data = [
    { label: "Present", value: "2.5" },
    { label: "Absent", value: "0.5" },
    { label: "OD", value: "0.0" },
    { label: "WFH or MW", value: "0" },
    { label: "WO", value: "2.0" },
    { label: "Holiday", value: "1.0" },
    { label: "Leave", value: "0.0" },
    { label: "Early/late hrs", value: "0:00" },
    { label: "Total worked hrs", value: "23:57" }
  ];

  return (
    <div className="attendance-container" style={{width:"450px",marginLeft:'70px'}}>
      <h3 className="attendance-title">
        <a href="#" className="attendance-link">Attendance Summary :</a>
      </h3>
      <table className="attendance-table">
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="attendance-row">
              <td className="attendance-label">{item.label}</td>
              <td className="attendance-value">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceSummary;
