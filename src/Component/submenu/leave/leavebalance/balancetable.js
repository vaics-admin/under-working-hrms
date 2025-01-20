/*import './balancetable.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Balancetable = ({ onChangeLeavType }) => {
  const { name } = useParams();

  // State for leave data
  const [leaveData, setLeaveData] = useState([
    {
      leaveType: "Earned Leave",
      credited: 0,
      availed: 0,
      carried: 0,
      balance: 0,
      approvalpending: 0,
      button: {
        text: "Earned Leave",
        value: "earnedLeave",
      },
    },
    {
      leaveType: "Restricted Holiday",
      credited: 0,
      availed: 0,
      balance: 0,
      approvalpending: 0,
      button: {
        text: "Restricted Holiday",
        value: "restrictedHoliday",
      },
    },
    {
      leaveType: "Loss of Pay",
      credited: 0,
      availed: 0,
      balance: 0,
      approvalpending: 0,
      button: {
        text: "Loss of Pay",
        value: "lossOfPay",
      },
    },
  ]);

  useEffect(() => {
    const fetchLeaveBalance = async () => {
      const id = localStorage.getItem("employee_id")
      console.log(id)
      try {
        const response = await fetch("http://127.0.0.1:5000/get-leave-balance", {
          method : 'POST',
          headers : {
            'Content-Type' : "application/json"
          },
          
          body : JSON.stringify({employee_id : id })
        });
      
        const result = await response.json();
        console.log(result);

        // Map API data to leaveData
        const updatedLeaveData = leaveData.map((leave) => {
          if (leave.leaveType === "Earned Leave") {
            return {
              ...leave,
              credited: parseInt(result[0]?.el_credited || leave.credited, 10),
              availed: parseInt(result[0]?.el_used || leave.availed, 10),
              carried: parseInt(result[0]?.el_carried || leave.carried, 10),
              balance: parseInt(result[0]?.el_balance || leave.balance, 10),
            };
          } else if (leave.leaveType === "Restricted Holiday") {
            return {
              ...leave,
              credited: parseInt(result[0]?.rh_credited || leave.credited, 10),
              availed: parseInt(result[0]?.rh_used || leave.availed, 10),
              balance: parseInt(result[0]?.rh_balance || leave.balance, 10),
            };
          } else if (leave.leaveType === "Loss of Pay") {
            return {
              ...leave,
              availed: parseInt(result[0]?.loss_of_pay_used || leave.availed, 10),
            };
          }
          return leave;
        });

        setLeaveData(updatedLeaveData);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    fetchLeaveBalance();
  }, []);

  return (
    <div className="leave-content-container">
      <div className="leave-balance-table-container">
        <table className="leave-balance-table">
          <thead>
            <tr>
              <th>LEAVE TYPE</th>
              <th>CREDITED</th>
              <th>AVAILED</th>
              <th>CARRIED</th>
              <th>BALANCE</th>
              <th>APPROVAL PENDING</th>
              {name !== "View-Leave" && <th>APPLY</th>}
            </tr>
          </thead>
          <tbody>
            {leaveData.map((row, index) => (
              <tr key={index}>
                <td>{row.leaveType}</td>
                <td>{row.credited}</td>
                <td>{row.availed}</td>
                <td>{row.carried}</td>
                <td>{row.balance}</td>
                <td>{row.approvalpending}</td>
                {name !== "View-Leave" && (
                  <td>
                    <button
                      onClick={() => onChangeLeavType(row.button.value)}
                      className="leave-button"
                    >
                      {row.button.text}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Balancetable;

*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import './balancetable.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Balancetable = ({ onChangeLeavType }) => {
  const { name } = useParams();

  // State for leave data
  const [leaveData, setLeaveData] = useState([
    {
      leaveType: "Earned Leave",
      credited: 0,
      availed: 0,
      carried: 0,
      balance: 0,
      approvalpending: 0,
      button: {
        text: "Earned Leave",
        value: "earnedLeave",
      },
    },
    {
      leaveType: "Restricted Holiday",
      credited: 0,
      availed: 0,
      balance: 0,
      approvalpending: 0,
      button: {
        text: "Restricted Holiday",
        value: "restrictedHoliday",
      },
    },
    {
      leaveType: "Loss of Pay",
      credited: 0,
      availed: 0,
      balance: 0,
      approvalpending: 0,
      button: {
        text: "Loss of Pay",
        value: "lossOfPay",
      },
    },
  ]);

  useEffect(() => {
    const fetchLeaveBalance = async () => {
      const id = localStorage.getItem("empcode");
      console.log(id);
      try {
        const response = await fetch("http://127.0.0.1:5000/leave_management/get-leave-balance", {
          method: 'POST',
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify({ employee_id: id }),
        });

        const result = await response.json();
        console.log(result);

        // Map API data to leaveData
        const updatedLeaveData = leaveData.map((leave) => {
          const leaveTypeKey = leave.leaveType.replace(" ", "_").toLowerCase(); // Format key to match API

          if (result[leaveTypeKey]) {
            return {
              ...leave,
              credited: result[leaveTypeKey].credited || leave.credited,
              availed: result[leaveTypeKey].availed || leave.availed,
              carried: result[leaveTypeKey].carried_over || leave.carried_over,
              balance: result[leaveTypeKey].balance || leave.balance,
              approvalpending: result[leaveTypeKey].approval_pending || leave.approvalpending,
            };
          }
          return leave;
        });

        setLeaveData(updatedLeaveData);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    fetchLeaveBalance();
  }, []);

  return (
    <div className="leave-content-container">
      <div className="leave-balance-table-container">
        <table className="leave-balance-table">
          <thead>
            <tr>
              <th>LEAVE TYPE</th>
              <th>CREDITED</th>
              <th>AVAILED</th>
              <th>CARRIED</th>
              <th>BALANCE</th>
              <th>APPROVAL PENDING</th>
              {name !== "View-Leave" && <th>APPLY</th>}
            </tr>
          </thead>
          <tbody>
            {leaveData.map((row, index) => (
              <tr key={index}>
                <td>{row.leaveType}</td>
                <td>{row.credited}</td>
                <td>{row.availed}</td>
                <td>{row.carried}</td>
                <td>{row.balance}</td>
                <td>{row.approvalpending}</td>
                {name !== "View-Leave" && (
                  <td>
                    <button
                      onClick={() => onChangeLeavType(row.button.value)}
                      className="leave-button"
                    >
                      {row.button.text}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Balancetable;

//////////////////////////////////////////////////////


// import './balancetable.css';
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';

// const Balancetable = ({ onChangeLeavType }) => {
//   const { name } = useParams();

//   // State for leave data - removed restricted holiday and updated to match database schema
//   const [leaveData, setLeaveData] = useState([
//     {
//       leaveType: "Earned Leave",
//       credited: 0,
//       availed: 0,
//       carried: 0,
//       balance: 0,
//       approvalpending: 0,
//       button: {
//         text: "Earned Leave",
//         value: "earnedLeave",
//       },
//     },
//     {
//       leaveType: "Loss of Pay",
//       credited: 0,
//       availed: 0,
//       balance: 0,
//       approvalpending: 0,
//       button: {
//         text: "Loss of Pay",
//         value: "lossOfPay",
//       },
//     },
//   ]);

//   useEffect(() => {
//     const fetchLeaveBalance = async () => {
//       const emp_id = localStorage.getItem("emp_id");
//       try {
//         const response = await fetch("http://127.0.0.1:5000/get-leave-balance", {
//           method: 'POST',
//           headers: {
//             'Content-Type': "application/json",
//           },
//           body: JSON.stringify({ emp_id }),
//         });

//         const result = await response.json();

//         // Map API data to leaveData - updated to match database schema
//         const updatedLeaveData = leaveData.map((leave) => {
//           if (leave.leaveType === "Earned Leave") {
//             return {
//               ...leave,
//               credited: result.el_credited || 0,
//               availed: result.el_availed || 0,
//               carried: result.el_carried || 0,
//               balance: result.el_balance || 0,
//               approvalpending: 0, // Calculate from leave_request table if needed
//             };
//           } else if (leave.leaveType === "Loss of Pay") {
//             return {
//               ...leave,
//               credited: 0, // LOP doesn't have credits
//               availed: result.lop_used || 0,
//               carried: 0, // LOP doesn't carry forward
//               balance: 0, // LOP doesn't have balance
//               approvalpending: 0, // Calculate from leave_request table if needed
//             };
//           }
//           return leave;
//         });

//         setLeaveData(updatedLeaveData);
//       } catch (error) {
//         console.error("Error fetching leave data:", error);
//       }
//     };

//     fetchLeaveBalance();
//   }, []);

//   return (
//     <div className="leave-content-container">
//       <div className="leave-balance-table-container">
//         <table className="leave-balance-table">
//           <thead>
//             <tr>
//               <th>LEAVE TYPE</th>
//               <th>CREDITED</th>
//               <th>AVAILED</th>
//               <th>CARRIED</th>
//               <th>BALANCE</th>
//               <th>APPROVAL PENDING</th>
//               {name !== "View-Leave" && <th>APPLY</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {leaveData.map((row, index) => (
//               <tr key={index}>
//                 <td>{row.leaveType}</td>
//                 <td>{row.credited}</td>
//                 <td>{row.availed}</td>
//                 <td>{row.carried}</td>
//                 <td>{row.balance}</td>
//                 <td>{row.approvalpending}</td>
//                 {name !== "View-Leave" && (
//                   <td>
//                     <button
//                       onClick={() => onChangeLeavType(row.button.value)}
//                       className="leave-button"
//                     >
//                       {row.button.text}
//                     </button>
//                   </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Balancetable;