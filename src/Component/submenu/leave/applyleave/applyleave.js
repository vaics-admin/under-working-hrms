import Balancetable from "../leavebalance/balancetable";
import {Leaveforms , Restrictedholidayform} from "../applicationFoems/leaveforms";
import { useState , useEffect } from "react";
import "./applyleave.css"

const Applyleave = () => {

  const [leavetype , setLeaveType] = useState("earnedLeave");

  
    
    const setLeavetypeOnclick = (type) =>{
        setLeaveType(type)
    }

    
 
  return (<div className="main-leave-container" >
    <Balancetable onChangeLeavType = {setLeavetypeOnclick}/> 
    {leavetype !== "restrictedHoliday" ? <Leaveforms/> : <Restrictedholidayform/>}
  </div>
  )
};

export default Applyleave;


//////////////////////////////////////////////////////////////


// import Balancetable from "../leavebalance/balancetable";
// import { Leaveforms } from "../applicationFoems/leaveforms";
// import { useState } from "react";
// import "./applyleave.css";

// const Applyleave = () => {
//   // State to track selected leave type
//   const [leavetype, setLeaveType] = useState("earnedLeave");

//   // Handler for changing leave type
//   const setLeavetypeOnclick = (type) => {
//     setLeaveType(type);
//   };

//   return (
//     <div className="main-leave-container">
//       <Balancetable onChangeLeavType={setLeavetypeOnclick} />
//       <Leaveforms />
//     </div>
//   );
// };

// export default Applyleave;