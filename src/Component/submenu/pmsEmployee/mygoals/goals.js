// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
// import * as XLSX from 'xlsx'; // Import XLSX library for Excel export
// import './Mygoals.css';

// const Mygoals = () => {
//     const [rows, setRows] = useState([
//         { slNo: 1, kraName: '', kpiName: '', weightage: '', measurementMetrics: '' },
//         { slNo: 2, kraName: '', kpiName: '', weightage: '', measurementMetrics: '' },
//         { slNo: 3, kraName: '', kpiName: '', weightage: '', measurementMetrics: '' },
//     ]);

//     const navigate = useNavigate(); // Use the navigate function from React Router

//     const addRow = () => {
//         setRows([...rows, { slNo: rows.length + 1, kraName: '', kpiName: '', weightage: '', measurementMetrics: '' }]);
//     };

//     const removeRow = (index) => {
//         const newRows = [...rows];
//         newRows.splice(index, 1);
//         setRows(newRows.map((row, i) => ({ ...row, slNo: i + 1 })));
//     };

//     const handleInputChange = (index, field, value) => {
//         const newRows = [...rows];
//         newRows[index][field] = value;
//         setRows(newRows);
//     };

//     // Function to handle navigation to the Home page
//     const goHome = () => {
//         navigate('/shome'); // Navigates to /shome
//     };

//     // Function to handle the Save button, to export data as Excel
//     const handleSave = () => {
//         // Format the data into an array of objects for Excel
//         const formattedData = rows.map(row => ({
//             'SL. NO': row.slNo,
//             'KRA NAME': row.kraName,
//             'KPI NAME': row.kpiName,
//             'WEIGHTAGE %': row.weightage,
//             'MEASUREMENT METRICS': row.measurementMetrics,
//         }));

//         // Create a worksheet from the formatted data
//         const ws = XLSX.utils.json_to_sheet(formattedData);

//         // Create a workbook with the worksheet
//         const wb = XLSX.utils.book_new();

//         // Replace invalid characters in sheet name
//         const sheetName = 'KRA/KPI Data'.replace(/[\/:*?[\]]/g, '-'); // Replace invalid characters

//         // Append the sheet with sanitized name
//         XLSX.utils.book_append_sheet(wb, ws, sheetName);

//         // Generate the Excel file and trigger a download
//         XLSX.writeFile(wb, 'KRA_KPI_Data.xlsx');
//     };

//     return (
//         <div>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <h2>KRA/KPI Details</h2>
//                 <div>
//                     <a href="https://example.com/guidelines" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'blue', display: 'flex', alignItems: 'center' }}>
//                         <i className="fas fa-info-circle" style={{ marginRight: '4px' }}></i>
//                         <h3>General Guidelines For Goal Setting</h3>
//                     </a>
//                 </div>
//             </div>

//             <table style={{ borderCollapse: 'collapse', width: '100%' }}>
//                 <thead>
//                     <tr style={{ borderBottom: '1px solid #ddd' }}>
//                         <th style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#ffece0' }}>SL. NO</th>
//                         <th style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#ffece0' }}>KRA NAME</th>
//                         <th style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#ffece0' }}>KPI NAME</th>
//                         <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', backgroundColor: '#ffece0' }}>WEIGHTAGE %</th>
//                         <th style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#ffece0' }}>MEASUREMENT METRICS</th>
//                         <th style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#ffece0' }}>DELETE</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {rows.map((row, index) => (
//                         <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
//                             <td style={{ padding: '8px', border: '1px solid #ddd' }}>{row.slNo}</td>
//                             <td style={{ padding: '8px', border: '1px solid #ddd' }}>
//                                 <textarea
//                                     value={row.kraName}
//                                     onChange={(e) => handleInputChange(index, 'kraName', e.target.value)}
//                                     rows={3}
//                                     style={{ width: '100%', border: 'none' }}
//                                 />
//                             </td>
//                             <td style={{ padding: '8px', border: '1px solid #ddd' }}>
//                                 <textarea
//                                     value={row.kpiName}
//                                     onChange={(e) => handleInputChange(index, 'kpiName', e.target.value)}
//                                     rows={3}
//                                     style={{ width: '100%', border: 'none' }}
//                                 />
//                             </td>
//                             <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
//                                 <textarea
//                                     value={row.weightage}
//                                     onChange={(e) => handleInputChange(index, 'weightage', e.target.value)}
//                                     rows={1}
//                                     style={{ width: '20%', border: 'none' }}
//                                 />
//                             </td>
//                             <td style={{ padding: '8px', border: '1px solid #ddd' }}>
//                                 <textarea
//                                     value={row.measurementMetrics}
//                                     onChange={(e) => handleInputChange(index, 'measurementMetrics', e.target.value)}
//                                     rows={3}
//                                     style={{ width: '100%', border: 'none' }}
//                                 />
//                             </td>
//                             <td style={{ padding: '8px', border: '1px solid #ddd' }}>
//                                 <button onClick={() => removeRow(index)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
//                                     <i className="fas fa-trash" style={{ color: 'red' }}></i>
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '16px' }}>
//                 <button
//                     onClick={addRow}
//                     style={{ backgroundColor: 'blue', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', display: 'flex', alignItems: 'center' }}
//                 >
//                     <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
//                     Add Row
//                 </button>
//             </div>

//             <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
//                 <button className="previous-button" style={{ backgroundColor: '#f44336', color: 'white', marginRight: '8px', padding: '8px 16px', border: 'none', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
//                     <i className="fas fa-arrow-left" style={{ marginRight: '4px' }}></i>
//                     Previous
//                 </button>
//                 <button
//                     className="home-button"
//                     onClick={goHome}  // Added onClick to navigate
//                     style={{ backgroundColor: '#4CAF50', color: 'white', marginRight: '8px', padding: '8px 16px', border: 'none', borderRadius: '4px', display: 'flex', alignItems: 'center' }}
//                 >
//                     <i className="fas fa-home" style={{ marginRight: '4px' }}></i>
//                     Home
//                 </button>
//                 <button className="save-button" onClick={handleSave} style={{ backgroundColor: '#2196F3', color: 'white', marginRight: '8px', padding: '8px 16px', border: 'none', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
//                     <i className="fas fa-save" style={{ marginRight: '4px' }}></i>
//                     Save
//                 </button>
//                 <button className="next-button" style={{ backgroundColor: '#FFC107', color: 'black', padding: '8px 16px', border: 'none', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
//                     <i className="fas fa-arrow-right" style={{ marginRight: '4px' }}></i>
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Mygoals;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import * as XLSX from 'xlsx'; // Import XLSX library for Excel export
import './Mygoals.css';
import axios from 'axios'; // Import axios for API requests

const Mygoals = () => {
    const [rows, setRows] = useState([
        { slNo: 1, kraName: '', kpiName: '', weightage: '', measurementMetrics: '' },
        // { slNo: 2, kraName: '', kpiName: '', weightage: '', measurementMetrics: '' },
        // { slNo: 3, kraName: '', kpiName: '', weightage: '', measurementMetrics: '' },
    ]);

    const navigate = useNavigate(); // Use the navigate function from React Router

    const addRow = () => {
        setRows([...rows, { slNo: rows.length + 1, kraName: '', kpiName: '', weightage: '', measurementMetrics: '' }]);
    };

    const removeRow = (index) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows.map((row, i) => ({ ...row, slNo: i + 1 })));
    };

    const handleInputChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index][field] = value;
        setRows(newRows);
    };

    // Function to handle navigation to the Home page
    const goHome = () => {
        navigate('/shome'); // Navigates to /shome
    };

    // Function to handle the Save button, to export data as Excel
    const handleSave = async () => {
        try {
            const formattedData = rows.map(row => ({
                'SL. NO': row.slNo,
                'KRA NAME': row.kraName,
                'KPI NAME': row.kpiName,
                'WEIGHTAGE %': row.weightage,
                'EMPLOYEE ID': localStorage.getItem('empcode'),
                'MEASUREMENT METRICS': row.measurementMetrics,
            }));
            const response = await axios.post('http://127.0.0.1:5000/pms_employee/api/goals', formattedData);
            alert(response.data.message);
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to save goals.");
        }
    };
    

        // // Create a worksheet from the formatted data
        // const ws = XLSX.utils.json_to_sheet(formattedData);

        // // Create a workbook with the worksheet
        // const wb = XLSX.utils.book_new();

        // // Replace invalid characters in sheet name
        // const sheetName = 'KRA/KPI Data'.replace(/[\/:*?[\]]/g, '-'); // Replace invalid characters

        // // Append the sheet with sanitized name
        // XLSX.utils.book_append_sheet(wb, ws, sheetName);

        // // Generate the Excel file and trigger a download
        // XLSX.writeFile(wb, 'KRA_KPI_Data.xlsx');

        


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>KRA/KPI Details</h2>
                <div>
                    <a href="https://example.com/guidelines" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'blue', display: 'flex', alignItems: 'center' }}>
                        <i className="fas fa-info-circle" style={{ marginRight: '4px' }}></i>
                        <h3>General Guidelines For Goal Setting</h3>
                    </a>
                </div>
            </div>

            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #ddd' }}>
                        <th style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#ffece0' }}>SL. NO</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#ffece0' }}>KRA NAME</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#ffece0' }}>KPI NAME</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', backgroundColor: '#ffece0',width:"5%" }}>WEIGHTAGE %</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#ffece0' }}>MEASUREMENT METRICS</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#ffece0' }}>DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{row.slNo}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                <textarea
                                    value={row.kraName}
                                    onChange={(e) => handleInputChange(index, 'kraName', e.target.value)}
                                    rows={3}
                                    style={{ width: '100%', border: 'none' }}
                                />
                            </td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                <textarea
                                    value={row.kpiName}
                                    onChange={(e) => handleInputChange(index, 'kpiName', e.target.value)}
                                    rows={3}
                                    style={{ width: '100%', border: 'none' }}
                                />
                            </td>
                            <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                                <textarea
                                    value={row.weightage}
                                    onChange={(e) => handleInputChange(index, 'weightage', e.target.value)}
                                    rows={1}
                                    style={{ width: '90%', border: 'none' }}
                                />
                            </td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                <textarea
                                    value={row.measurementMetrics}
                                    onChange={(e) => handleInputChange(index, 'measurementMetrics', e.target.value)}
                                    rows={3}
                                    style={{ width: '100%', border: 'none' }}
                                />
                            </td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                <button onClick={() => removeRow(index)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                    <i className="fas fa-trash" style={{ color: 'red' }}></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '16px' }}>
                <button
                    onClick={addRow}
                    style={{ backgroundColor: 'blue', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', display: 'flex', alignItems: 'center' }}
                >
                    <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
                    Add Row
                </button>
            </div>

            <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <button className="previous-button" style={{ backgroundColor: '#f44336', color: 'white', marginRight: '8px', padding: '8px 16px', border: 'none', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                    <i className="fas fa-arrow-left" style={{ marginRight: '4px' }}></i>
                    Previous
                </button>
                <button
                    className="home-button"
                    onClick={goHome}  // Added onClick to navigate
                    style={{ backgroundColor: '#4CAF50', color: 'white', marginRight: '8px', padding: '8px 16px', border: 'none', borderRadius: '4px', display: 'flex', alignItems: 'center' }}
                >
                    <i className="fas fa-home" style={{ marginRight: '4px' }}></i>
                    Home
                </button>
                <button className="save-button" onClick={handleSave} style={{ backgroundColor: '#2196F3', color: 'white', marginRight: '8px', padding: '8px 16px', border: 'none', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                    <i className="fas fa-save" style={{ marginRight: '4px' }}></i>
                    Save
                </button>
                <button className="next-button" style={{ backgroundColor: '#FFC107', color: 'black', padding: '8px 16px', border: 'none', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                    <i className="fas fa-arrow-right" style={{ marginRight: '4px' }}></i>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Mygoals;
