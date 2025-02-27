import { useNavigate } from 'react-router-dom';
import { BsCalendar3 } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FcLeave } from "react-icons/fc";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoIosLink } from "react-icons/io";
import { FaShieldAlt } from 'react-icons/fa';
import { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttendanceCalendar from "../calander/calander";
import Onduty from '../submenu/attendance/applyOnDuty/onduty';
import { Provider } from 'react-redux';
import Cookies from 'js-cookie';


import "./shome.css"
import store from '../../redux/store';

const tabDetails = [
    {tabName : "Employee Dashbord",
        key :   1,
        isActive : true,
        subMenu : [],
        tabIcon : <BsCalendar3/>,
        droupDown : false,
    },
    {tabName : 'Attendance',
        key : 2,
        isActive : false,
        subMenu : ["Attandance-Home" , "Apply-Swip" , "Apply-On-Duty" , "Apply-Mobile-Work" , "Regularise-Attendance"],
        tabIcon : <FaRegCalendarAlt/>,
        droupDown : true,
    },
    {tabName : 'Leave',
        key : 3,
        isActive : false,
        subMenu : ["Apply-Leave" , "View-Leave" , "History"],
        tabIcon : <FcLeave/>,
        droupDown : true,
    },
    {tabName : 'Payroll',
        key : 4,
        isActive : false,
        subMenu : ["View-Payslip" , "IT-Declaration"],
        tabIcon : <FaMoneyCheckDollar/>,
        droupDown : true,
    },
    {tabName : 'PMS-Employee',
        key : 5,
        isActive : false,
        subMenu : ["My-Goals" , "My-Appraisal"],
        tabIcon : <FaRegCalendarAlt/>,
        droupDown : true,
    },
    {tabName : 'Quick-Links',
        key : 6,
        isActive : false,
        subMenu : ["Raise-Ticket","Resignation","Employee-Profile","Change-Password","Profile-Picture-Upload"],
        tabIcon : <IoIosLink/>,
        droupDown : true,
    },
    {tabName : 'Privacy Policies',
        key : 7,
        isActive : false,
        subMenu : [""],
        tabIcon : <FaShieldAlt/>,
        droupDown : false,
    }
]


const Shome = () =>{

    const [activeTab , setActiveTab] = useState(tabDetails)
    const [isActive , setIsactive] = useState(false)
    const [activeSubmenu , setActivesubmenu] = useState("")
    const [user , switchUser] = useState(false)
    console.log(user)
    const navigate = useNavigate()
    const moveTopage = (button , name) =>{
        console.log(button, name)
        const navtex = `/${button}/${name}`
        navigate(navtex)
        
    }
    console.log(sessionStorage.getItem("employee_id"))

    const employeeId = localStorage.getItem("employee_id")
console.log('Employee ID:', employeeId);

    return (
      <div className="main-home">
        {console.log(activeSubmenu)}
        <div className="home-tabs-container">
          <div className="logo">
            <img className="vaics-logo" src=".\VAICSLogo.png" alt="comp-logo" />
          </div>
          <div className="hrms-head">
            <div className="hr"></div>
            <h1 className="hrms">HRMS</h1>
          </div>

          <h2 className="menu-head">Main menu</h2>

          <div className="tabs-container">
            {tabDetails.map((eachItem) => (
              <>
                <button
                  onClick={() => {
                    setActiveTab(eachItem.tabName);
                    setIsactive(!isActive);
                  }}
                  key={eachItem.key}
                  className="tab-button"
                >
                  <div className="icon"> {eachItem.tabIcon} </div>
                  <div className="tab-name">
                    {" "}
                    <p>{eachItem.tabName}</p>{" "}
                  </div>
                  {eachItem.isActive === false &&
                  eachItem.droupDown === true ? (
                    <div className="d-icon">
                      <FaCaretDown />
                    </div>
                  ) : (
                    <div className="d-icon"></div>
                  )}
                </button>

                {activeTab === eachItem.tabName &&
                isActive === true &&
                eachItem.droupDown === true ? (
                  <ul>
                    {eachItem.subMenu.map((eachsubmenu) => (
                      <button
                        onClick={(event) =>
                          moveTopage(eachItem.tabName, eachsubmenu)
                        }
                        className="submenu"
                      >
                        {eachsubmenu}
                      </button>
                    ))}
                  </ul>
                ) : (
                  ""
                )}
              </>
            ))}
          </div>
        </div>

        <div className="headerAndContent-container">
         
            <AccountCircleIcon className="account-icon"  onClick = {() => {switchUser(!user)}}/>

              {
                user && <ul className="user-list">
                  <button className='switch-button' onClick={ () => navigate(`/admin/dashboard/admin-dashboard?activeButton=Dashboard&submensofActiveTabs=%5B%7B"name"%3A"Admin+Dashboard"%7D%2C%7B"name"%3A"Employee+Dashboard"%7D%5D`)}>Switch to Admin</button>
                </ul>
              }
  

          <div className="content">
            <div className="first-half">
              <div className="calander ">
                <AttendanceCalendar />
              </div>
              <div className="request-container ">Requests</div>
            </div>

            <div className="second-half">
              <div className="notifications card">notifications</div>
              <div className="wishes card">Wishes</div>
              <div className="leave-balance card">Leaves Table</div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Shome

