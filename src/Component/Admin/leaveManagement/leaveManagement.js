import "./leaveManagement.css";
import Dashboard from "../../NavBar/nav";
import { useEffect, useState } from "react";
import AppliedLeaveCounts from "./typesOfleaveCount/appliedLeaveCount";

const RequestManagement = () => {
  const [requestDetails, setRequestDetails] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const getDetails = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/leave_management/getleaverequests"); // Using GET request
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setRequestDetails(result); // Update state with the fetched data
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  // Filter requests based on filterValue
  const filteredRequests = filterValue
    ? requestDetails.filter((request) => request.leave_type === filterValue)
    : requestDetails;

  console.log(requestDetails)

  const approverequest = async (props) => {
    const details = props
    try {
      const response = await fetch("http://127.0.0.1:5000/leave_management/admin/requestmanagement" , {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(details)
      })

      if (response.ok){
        console.log("updated")
        getDetails()
      }
      else{
        console.log("error")
      }
    } catch (error) {
      console.error(error)
    }
  };

  const rejectrequest = (props) => {
    console.log(props)
  }

  return (
    <div className="admin-request-management-main-container">
      <Dashboard />
      <div className="request-details">
        <h2>Leave Requests</h2>
        <div className="leave-management-content">
          {/* Pass setFilterValue to AppliedLeaveCounts for filtering */}
          <AppliedLeaveCounts
            leaveDetails={requestDetails}
            setFilterValue={setFilterValue}
          />

          {filteredRequests.length > 0 ? (
            <ul className="list-of-requests">
              {filteredRequests.map((request, index) => (
                <li key={index} className="details-container">
                  <p className="para leave-info">
                    Applied on: <strong>{request.applied_on || "N/A"}</strong>
                  </p>
                  <p className="para leave-info">
                    <strong className="leave-subhead">Employee ID:</strong>{" "}
                    {request.emp_id || "N/A"}
                  </p>
                  <p className="para leave-info">
                    <strong className="leave-subhead">Leave Type:</strong>{" "}
                    {request.leave_type || "N/A"}
                  </p>
                  <p className="para leave-info">
                    <strong className="leave-subhead">Applied From:</strong>{" "}
                    {request.applied_from || "N/A"}
                  </p>
                  <p className="para leave-info">
                    <strong className="leave-subhead">Applied To:</strong>{" "}
                    {request.applied_to || "N/A"}
                  </p>
                  <p className="para leave-info">
                    <strong className="leave-subhead">Is Approved:</strong>{" "}
                    {request.is_approved !== null ? request.is_approved : "N/A"}
                  </p>
                  <p className="para leave-info">
                    <strong className="leave-subhead">Reason:</strong>{" "}
                    {request.reason || "N/A"}
                  </p>
                  <div className="button-section">
                    <button
                      className="approve manage-button"
                      onClick={() =>
                        approverequest({
                          leave_id: request.leave_id,
                          is_approved: "Approved",
                          approved_by: localStorage.getItem("emp_id"),
                          applied_from : request.applied_from,
                          applied_to : request.applied_to,
                          leave_type : request.leave_type,
                          emp_id : request.emp_id
                        })
                      }
                    >
                      Approve
                    </button>
                    <button className="reject manage-button"  onClick={() =>
                        rejectrequest({
                          leave_id: request.leave_id,
                          is_approved: "rejected",
                          approved_by: localStorage.getItem("emp_id"),
                        })
                      }>Reject</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No leave requests found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestManagement;



/////////////////////////////////////////////////////////////////////////////////////////////////


// import "./leaveManagement.css";
// import Dashboard from "../../NavBar/nav";
// import { useEffect, useState } from "react";
// import AppliedLeaveCounts from "./typesOfleaveCount/appliedLeaveCount";

// const RequestManagement = () => {
//   const [requestDetails, setRequestDetails] = useState([]);
//   const [filterValue, setFilterValue] = useState("");

//   // Fetch leave requests
//   const getDetails = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/getleaverequests");
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const result = await response.json();
//       setRequestDetails(result);
//     } catch (error) {
//       console.error("Error fetching leave requests:", error);
//     }
//   };

//   // Initial data fetch
//   useEffect(() => {
//     getDetails();
//   }, []);

//   // Filter requests based on filterValue
//   const filteredRequests = filterValue
//     ? requestDetails.filter((request) => request.leave_type === filterValue)
//     : requestDetails;

//   // Handle approve request
//   const approverequest = async (props) => {
//     const details = {
//       ...props,
//       status: 'Approved',
//       approved_on: new Date().toISOString().split('T')[0]
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/admin/requestmanagement", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(details)
//       });

//       if (response.ok) {
//         await getDetails(); // Refresh the list after approval
//       } else {
//         console.error("Failed to approve request");
//       }
//     } catch (error) {
//       console.error("Error approving request:", error);
//     }
//   };

//   // Handle reject request
//   const rejectrequest = async (props) => {
//     const details = {
//       ...props,
//       status: 'Rejected',
//       approved_on: new Date().toISOString().split('T')[0]
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/admin/requestmanagement", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(details)
//       });

//       if (response.ok) {
//         await getDetails(); // Refresh the list after rejection
//       } else {
//         console.error("Failed to reject request");
//       }
//     } catch (error) {
//       console.error("Error rejecting request:", error);
//     }
//   };

//   return (
//     <div className="admin-request-management-main-container">
//       <Dashboard />
//       <div className="request-details">
//         <h2>Leave Requests</h2>
//         <div className="leave-management-content">
//           <AppliedLeaveCounts
//             leaveDetails={requestDetails}
//             setFilterValue={setFilterValue}
//           />

//           {filteredRequests.length > 0 ? (
//             <ul className="list-of-requests">
//               {filteredRequests.map((request) => (
//                 <li key={request.request_id} className="details-container">
//                   <p className="para leave-info">
//                     Applied on: <strong>{request.applied_on}</strong>
//                   </p>
//                   <p className="para leave-info">
//                     <strong className="leave-subhead">Employee ID:</strong>{" "}
//                     {request.emp_id}
//                   </p>
//                   <p className="para leave-info">
//                     <strong className="leave-subhead">Leave Type:</strong>{" "}
//                     {request.leave_type}
//                   </p>
//                   <p className="para leave-info">
//                     <strong className="leave-subhead">From Date:</strong>{" "}
//                     {request.from_date}
//                   </p>
//                   <p className="para leave-info">
//                     <strong className="leave-subhead">To Date:</strong>{" "}
//                     {request.to_date}
//                   </p>
//                   <p className="para leave-info">
//                     <strong className="leave-subhead">Number of Days:</strong>{" "}
//                     {request.no_of_day}
//                   </p>
//                   <p className="para leave-info">
//                     <strong className="leave-subhead">Status:</strong>{" "}
//                     {request.status}
//                   </p>
//                   <p className="para leave-info">
//                     <strong className="leave-subhead">Reason:</strong>{" "}
//                     {request.reason}
//                   </p>
//                   {request.status === 'Pending' && (
//                     <div className="button-section">
//                       <button
//                         className="approve manage-button"
//                         onClick={() =>
//                           approverequest({
//                             request_id: request.request_id,
//                             emp_id: request.emp_id,
//                             from_date: request.from_date,
//                             to_date: request.to_date,
//                             leave_type: request.leave_type,
//                             approved_by: localStorage.getItem("emp_id"),
//                             no_of_day: request.no_of_day
//                           })
//                         }
//                       >
//                         Approve
//                       </button>
//                       <button
//                         className="reject manage-button"
//                         onClick={() =>
//                           rejectrequest({
//                             request_id: request.request_id,
//                             emp_id: request.emp_id,
//                             approved_by: localStorage.getItem("emp_id")
//                           })
//                         }
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No leave requests found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RequestManagement;