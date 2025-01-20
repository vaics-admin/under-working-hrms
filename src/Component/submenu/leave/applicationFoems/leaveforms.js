import { color } from "@mui/system";
import "./leaveforms.css";
import { useState } from "react";


export const Leaveforms = () => {
  // State to store leave request details
  const [leaveDetails, setleaveDetails] = useState({
    fromDate: "",
    toDate: "",
    leaveType: "",
    reason: "",
    reasonText: "",
    // document: null,
    employee_id: localStorage.getItem("empcode"),
  });

  // State to store message
  const [msg, setMsg] = useState("");

  // Handler for input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update state for file input
    if (event.target.type === "file") {
      // setleaveDetails({
      //   ...leaveDetails,
      //   [name]: event.target.files[0], // store file object
      // });
    } else {
      // Update state for other inputs
      setleaveDetails({
        ...leaveDetails,
        [name]: value,
      });
    }
  };

  // Form submission handler
  const submitLeaveRequest = async (event) => {
    event.preventDefault();
    console.log(leaveDetails)

    
    // Perform actions like form submission or API calls here
    try {
      const response = await fetch("http://127.0.0.1:5000/leave_management/addleaverequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leaveDetails),
      });

      if (response.ok) {
        setleaveDetails({
          fromDate: "",
          toDate: "",
          leaveType: "",
          reason: "",
          reasonText: "",
          // document: null,
          //employee_id: localStorage.getItem("employee_id"),
        });
        setMsg("Applied Successfully!");
      } else {
        setMsg("Error submitting the leave request.");
      }
    } catch (error) {
      setMsg("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="leave-form-container">
      <form onSubmit={submitLeaveRequest} className="leave-form">
        {/* Row 1: From and To date inputs */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="from-date">From</label>
            <input
              type="date"
              id="from-date"
              name="fromDate"
              value={leaveDetails.fromDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="to-date">To</label>
            <input
              type="date"
              id="to-date"
              name="toDate"
              value={leaveDetails.toDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Row 2: Select Leave Type and Reason */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="leave-type">Select Leave Type</label>
            <select
              id="leave-type"
              name="leaveType"
              value={leaveDetails.leaveType}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="sick">Sick Leave</option>
              <option value="casual">Casual Leave</option>
              <option value="vacation">Vacation Leave</option>
              <option value="Earned Leave">Earned Leave</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="reason">Select Reason</label>
            <select
              id="reason"
              name="reason"
              value={leaveDetails.reason}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="medical">Medical</option>
              <option value="family">Family Emergency</option>
              <option value="personal">Personal</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Row 3: Reason for Leave (Text Area) */}
        <div className="form-row">
          <div className="form-group text-area-group">
            <label htmlFor="reason-text">Reason for Leave</label>
            <textarea
              id="reason-text"
              name="reasonText"
              rows="4"
              placeholder="Enter the reason for leave"
              value={leaveDetails.reasonText}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        {/* Row 4: Document Upload */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="document">Upload Supporting Document</label>
            <input
              type="file"
              id="document"
              name="document"
              onChange={handleChange}
            />
            <p style={{ color: msg === "Applied Successfully!" ? "green" : "red" }}>
              {msg}
            </p>
          </div>
        </div>

        {/* Row 5: Submit Button */}
        <div className="form-row">
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};



const restrictedHolidays = [
  { date: "2024-01-14", occasion: "Makar Sankranti" },
  { date: "2024-01-26", occasion: "Republic Day" },
  { date: "2024-03-08", occasion: "Holi" },
  { date: "2024-04-14", occasion: "Dr. Ambedkar Jayanti" },
  { date: "2024-04-21", occasion: "Ramadan Eid" },
  { date: "2024-05-01", occasion: "Labor Day" },
  { date: "2024-05-23", occasion: "Buddha Purnima" },
  { date: "2024-07-17", occasion: "Muharram" },
  { date: "2024-08-15", occasion: "Independence Day" },
  { date: "2024-10-02", occasion: "Gandhi Jayanti" },
  { date: "2024-10-31", occasion: "Halloween" },
  { date: "2024-11-01", occasion: "All Saints' Day" },
  { date: "2024-12-25", occasion: "Christmas" },
];

// Filter holidays to include only future dates
const getFutureHolidays = () => {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  return restrictedHolidays.filter((holiday) => holiday.date >= today);
};

export const Restrictedholidayform = () => {
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    leaveType: "Restricted Holiday",
    reason: "",
    reasonText: "",
    // document: null,
    //employee_id: localStorage.setItem("employee_id"),
    // Set employee_id in state
   emp_id: localStorage.getItem("emp_id"),

  });
  const [msg, setMsg] = useState(""); // This initializes the 'msg' state and defines 'setMsg'
  const futureHolidays = getFutureHolidays();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
      toDate : formData.fromDate
    });
  };

  

  const submitRestrictedHoliday = async (event) =>{
    event.preventDefault()
    // console.log(formData)
    let leaveDetails = {...formData}
        console.log( leaveDetails)
    
    try {
      const response = await fetch("http://127.0.0.1:5000/leave_management/applyLeave", {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(leaveDetails )
      });
      const data = await response.json();

      if (response.ok) {
        // If the request was successful
        setMsg("Restricted holiday leave applied successfully!");
        // Reset form data
        setFormData({
          fromDate: "",
          toDate: "",
          leaveType: "Restricted Holiday",
          reason: "",
          reasonText: "",
          emp_id: localStorage.getItem("emp_id"),
        });
      } else {
        // If there was an error with the backend
        setMsg(data.error || "An error occurred while applying for the leave.");
      }
    } catch (error) {
      setMsg("An error occurred. Please try again.");
      console.error(error);
    }
  };


  return (
    <div className="res-container">
      <form onSubmit = {submitRestrictedHoliday} className="leave-form" >
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="select-date">Select Date</label>
            <select
              id="select-date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
            >
              <option value="">Select Date</option>
              {futureHolidays.map((holiday) => (
                <option key={holiday.date} value={holiday.date}>
                  {holiday.date} - {holiday.occasion}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="select-reason">Select Reason</label>
            <select
              id="select-reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
            >
              <option value="">Select Reason</option>
              <option value="medical">Medical</option>
              <option value="family">Family Emergency</option>
              <option value="personal">Personal</option>
              <option value="Going Home">Going Home</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group text-area-group">
            <label htmlFor="reason-text">Reason for Leave</label>
            <textarea
              id="reason-text"
              name="reasonText"
              rows="4"
              placeholder="Enter the reason for leave"
              value={formData.reasonText}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <button type="submit" className="res-submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};



/////////////////////////////////////////////////////////////////////


// import "./leaveforms.css";
// import { useState } from "react";

// export const Leaveforms = () => {
//   // State to store leave request details - aligned with database schema
//   const [leaveDetails, setleaveDetails] = useState({
//     from_date: "",
//     to_date: "",
//     leave_type: "",
//     reason: "",
//     emp_id: localStorage.getItem("emp_id"),
//     no_of_day: 0
//   });

//   // State to store message
//   const [msg, setMsg] = useState("");

//   // Calculate number of days between dates
//   const calculateDays = (fromDate, toDate) => {
//     if (!fromDate || !toDate) return 0;
//     const start = new Date(fromDate);
//     const end = new Date(toDate);
//     const diffTime = Math.abs(end - start);
//     return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
//   };

//   // Handler for input changes
//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setleaveDetails(prev => {
//       const newDetails = {
//         ...prev,
//         [name]: value
//       };

//       // Update no_of_day when dates change
//       if (name === "from_date" || name === "to_date") {
//         newDetails.no_of_day = calculateDays(
//           name === "from_date" ? value : prev.from_date,
//           name === "to_date" ? value : prev.to_date
//         );
//       }

//       return newDetails;
//     });
//   };

//   // Form submission handler
//   const submitLeaveRequest = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await fetch("http://127.0.0.1:5000/addleaverequest", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...leaveDetails,
//           applied_on: new Date().toISOString().split('T')[0],
//           status: 'Pending'
//         }),
//       });

//       if (response.ok) {
//         setleaveDetails({
//           from_date: "",
//           to_date: "",
//           leave_type: "",
//           reason: "",
//           emp_id: localStorage.getItem("emp_id"),
//           no_of_day: 0
//         });
//         setMsg("Applied Successfully!");
//       } else {
//         const errorData = await response.json();
//         setMsg(errorData.message || "Error submitting the leave request.");
//       }
//     } catch (error) {
//       setMsg("An error occurred. Please try again.");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="leave-form-container">
//       <form onSubmit={submitLeaveRequest} className="leave-form">
//         {/* Row 1: From and To date inputs */}
//         <div className="form-row">
//           <div className="form-group">
//             <label htmlFor="from-date">From</label>
//             <input
//               type="date"
//               id="from-date"
//               name="from_date"
//               value={leaveDetails.from_date}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="to-date">To</label>
//             <input
//               type="date"
//               id="to-date"
//               name="to_date"
//               value={leaveDetails.to_date}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         {/* Row 2: Leave Type */}
//         <div className="form-row">
//           <div className="form-group">
//             <label htmlFor="leave-type">Select Leave Type</label>
//             <select
//               id="leave-type"
//               name="leave_type"
//               value={leaveDetails.leave_type}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select</option>
//               <option value="Earned Leave">Earned Leave</option>
//               <option value="Loss of Pay">Loss of Pay</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Number of Days</label>
//             <input
//               type="text"
//               value={leaveDetails.no_of_day}
//               readOnly
//               className="days-display"
//             />
//           </div>
//         </div>

//         {/* Row 3: Reason for Leave */}
//         <div className="form-row">
//           <div className="form-group text-area-group">
//             <label htmlFor="reason">Reason for Leave</label>
//             <textarea
//               id="reason"
//               name="reason"
//               rows="4"
//               placeholder="Enter the reason for leave"
//               value={leaveDetails.reason}
//               onChange={handleChange}
//               required
//             ></textarea>
//           </div>
//         </div>

//         {/* Message display */}
//         <div className="form-row">
//           <p style={{ color: msg === "Applied Successfully!" ? "green" : "red" }}>
//             {msg}
//           </p>
//         </div>

//         {/* Submit Button */}
//         <div className="form-row">
//           <button type="submit" className="submit-button">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Leaveforms;