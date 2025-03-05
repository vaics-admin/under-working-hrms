import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Applyswipe from '../applyswip/swipe';
import Onduty from '../applyOnDuty/onduty';
import Mobilework from '../mobileWork/mobile';
import Regulariseattendance from '../regulariseAttendance/regatt';
import AttendanceCalendar from '../../../calander/calander';
import AttendanceSummary from '../../../attendancetable/attendancetable';
import TableComponent from '../../../fulldetailsofatt/tablecomponent';
import './atthome.css';

const Attendancehome = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [activeButton, setActiveButton] = useState('Attandance-Home');

  const buttons = [
    { name: 'Attandance-Home', label: 'Home', route: '/Attendance/Attandance-Home' },
    { name: 'Apply-Swip', label: 'Swipe', route: '/Attendance/Apply-Swip' },
    { name: 'Apply-On-Duty', label: 'OnDuty', route: '/Attendance/Apply-On-Duty' },
    { name: 'Apply-Mobile-Work', label: 'Mobile Work', route: '/Attendance/Apply-Mobile-Work' },
    { name: 'Regularise-Attendance', label: 'Regularise \n On Dates', route: '/Attendance/Regularise-Attendance' },
  ];

  useEffect(() => {
    if (name) {
      setActiveButton(name);
    }
  }, [name]);

  const handleButtonClick = (buttonName, route) => {
    setActiveButton(buttonName);
    navigate(route);
  };

  return (
    <div className="att-Home-container">
      <div className="tab">
        <div className="comp-logo-at-home-cont">
          <img src="\VAICSLogo.png" className="comp-logo-image" alt="Vaics" />
        </div>

        <div className="menu-head" style={{marginTop:'-50px'}}>
          <p className="head-m">Menu</p>
          <p className="head-m">Attendance</p>
        </div>

        <div className="tab-buttons">
          {buttons.map((button) => (
            <button
              key={button.name}
              onClick={() => handleButtonClick(button.name, button.route)}
              className={activeButton === button.name ? 'menu-button active' : 'menu-button'}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Section */}
      <div className="content-container">
        {activeButton === 'Attandance-Home' && (
          <div className="leave-summary">
            {/* Leave Boxes */}
            <div className="leave-box-container">
              <div className="leave-box">
                <h1 className="leave-card-head">Earned Leaves</h1>
                <p className="value-para">15/24</p>
                <p className="available">Available</p>
              </div>
              <div className="leave-box b-leave">
                <h1 className="leave-card-head">Bereavment Leaves</h1>
                <p className="value-para">2/4</p>
                <p className="available">Available</p>
              </div>
              <div className="leave-box r-holiday">
                <h1 className="leave-card-head">Maternity Leaves</h1>
                <p className="value-para">2/2</p>
                <p className="available">Available</p>
              </div>
              <div className="leave-box c-leave">
                <h1 className="leave-card-head">Paternity Leaves</h1>
                <p className="value-para">2/4</p>
                <p className="available">Available</p>
              </div>
             
            </div>

            {/* Horizontal Layout for Calendar and Attendance Summary */}
            <div className="att-cal-and-sum">
              <div className="att-cal">
                <AttendanceCalendar />
              </div>
              <div className="att-sum" style={{marginRight:"650px"}}>
                <AttendanceSummary />
              </div>
            </div>

            <div className="table-component">
              <TableComponent />
            </div>
          </div>
        )}

        {activeButton === 'Apply-Swip' && <Applyswipe />}
        {activeButton === 'Apply-On-Duty' && <Onduty />}
        {activeButton === 'Apply-Mobile-Work' && <Mobilework />}
        {activeButton === 'Regularise-Attendance' && <Regulariseattendance />}
      </div>
    </div>
  );
};

export default Attendancehome;
