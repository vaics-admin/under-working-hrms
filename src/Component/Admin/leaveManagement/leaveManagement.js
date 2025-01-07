import "./leaveManagement.css";
import Dashboard from "../../NavBar/nav";
import { useEffect, useState } from "react";
import AppliedLeaveCounts from "./typesOfleaveCount/appliedLeaveCount";

const RequestManagement = () => {
  const [requestDetails, setRequestDetails] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const getDetails = async () => {
    try {
      const response = await fetch("http://192.168.20.6:5000/getleaverequests"); // Using GET request
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

  const approverequest = async (props) => {
    const details = props
    try {
      const response = await fetch("http://192.168.20.6:5000/admin/requestmanagement" , {
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
    
      <div className="request-details">
        <h2 className="admin-request-head">Leave Requests</h2>
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
                    {request.employee_id || "N/A"}
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
                          approved_by: localStorage.getItem("employee_id"),
                          applied_from : request.applied_from,
                          applied_to : request.applied_to,
                          leave_type : request.leave_type,
                          employee_id : request.employee_id
                        })
                      }
                    >
                      Approve
                    </button>
                    <button className="reject manage-button"  onClick={() =>
                        rejectrequest({
                          leave_id: request.leave_id,
                          is_approved: "rejected",
                          approved_by: localStorage.getItem("employee_id"),
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
