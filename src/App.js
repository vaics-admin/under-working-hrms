import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



import './App.css';
import RequestManagement from './Component/Admin/leaveManagement/leaveManagement';
import PasswordChange from './Component/Admin/adminDashbord/Password/App';

import PdfTextExtractor from './Component/experiment/pdfextraction/pdf';
import PDFParserReact from './Component/experiment/pdfextraction/pdf';
import EditEmployee from './Component/Admin/editEmployee/editemployee';
import FileUpload from './Component/experiment/insret_using_excel';
import DownloadLeaveHistory from './Component/experiment/download/download';
import AdminDashbord from './Component/Admin/adminDashbord/adminDashbord';
import MLdrop from './Component/experiment/dropDown/mldrop';
import MyNavbar from './Component/experiment/dropDown/mldrop';
import EmployeeSearch from './Component/experiment/search suggestions/searchSuggestions';
import Calendar from './Component/experiment/gitCalander/gitcalander';



import Employee_Search from './Component/Admin/adminDashbord/searchemployee/Employee-Search';



import Loginpage from './Component/loginpage';
import Adminlogin from './Component/Admin';
import Home from './Component/home';
import Userprofile from './Component/myprofile';
import Adduser from './Component/Admin/addemployee';
import Shome from './Component/samphome/shome';

//Attendance component imports 
import Attendancehome from './Component/submenu/attendance/attendancehome/atthome';
import Onduty from './Component/submenu/attendance/applyOnDuty/onduty';
import Applyswipe from './Component/submenu/attendance/applyswip/swipe';
import Regulariseattendance from './Component/submenu/attendance/regulariseAttendance/regatt';
import Mobilework from './Component/submenu/attendance/mobileWork/mobile';

// leave Components Import 
import Leavehome from './Component/submenu/leave/leavehome/leavehome';
import Applyleave from './Component/submenu/leave/applyleave/applyleave';
import Viewleave from './Component/submenu/leave/viewleave/viewleaves';
import Unplanedleave from './Component/submenu/leave/unplannedleave/unpleave';
import Encashment from './Component/submenu/leave/leavehistory/history';

// Payroll Component Import 
import Payslip from './Component/submenu/payroll/viewpayslip/viewpayslip';
import ITdeclaration from './Component/submenu/payroll/itdeclaration/itdeclaration';

// PMS Employee Component Import
import Mygoals from './Component/submenu/pmsEmployee/mygoals/goals';
import Appraisal from './Component/submenu/pmsEmployee/myappraisal/appraisal';

// Exit system Component Import
import ResignationIndex from './Component/submenu/quicklinks/Resignation/index';

// Quicklinks imports
import TicketForm from './Component/submenu/quicklinks/Raise Ticket/TicketForm';
import EmployeeDetails from './Component/submenu/quicklinks/Employee profile/EmployeeDetails';
import PasswordChangeForm from './Component/submenu/quicklinks/Password/Password';
import ProfilePicture from './Component/submenu/quicklinks/Profilepicture/upload';





function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' Component={Loginpage}/>
          <Route path='/admin' Component={Adminlogin}/>
          <Route path='/home' Component={Shome}/>
          <Route path='/profile' Component={Userprofile}/>
          <Route path='/adduser' Component={Adduser}/>
          <Route path='/shome' Component={Shome}/>

          {/* Attendance route */}
          <Route path='/Attendance/:name' Component={Attendancehome}/>
          

          {/*Leave Route*/}
          <Route path='/Leave/:name' Component={Leavehome}/>
          

          {/* Payroll Route */}
          <Route path='/Payroll/View-Payslip' Component={Payslip}/>
          <Route path='/IT-Declaration' Component={ITdeclaration}/>

          {/* PMS Employee Routes*/}
          <Route path='/My-Goals' Component={Mygoals}/>
          <Route path='/My-Appraisal' Component={Appraisal}/>

          <Route path='/admin/get-requests' Component={RequestManagement}/>

          <Route path='/experiment/pdf' Component={ PDFParserReact}/>

          <Route path='/admin/editEmployee' Component={EditEmployee}/>

          <Route path='/experiment/uplodeExcel' Component={FileUpload}/>

          <Route path='/experiment/down' Component={DownloadLeaveHistory}/>

          

          <Route path='/experiment/mynavbar' Component={MyNavbar}/>

          <Route path='/experiment/search' Component={EmployeeSearch}/>
 
          <Route path='/experiment/calander' Component={Calendar}/>



          <Route path='/admin/password' Component={PasswordChange}/>


  {/* PMS Employee routes */}
         <Route path="/PMS-Employee/Mygoals" element={<Mygoals />} />

          {/* Exit system routes */}
          <Route path="Quick-Links/Raise-Ticket" element={<TicketForm />} />
          <Route path="/Quick-Links/Resignation" element={<ResignationIndex />} />
          <Route path="/Quick-Links/Employee-Profile" element={<EmployeeDetails />} />
          <Route path="/Quick-Links/Change-Password" element={<PasswordChangeForm />} />
          <Route path="/Quick-Links/Profile-Picture-Upload" element={<ProfilePicture />} />


          {/* Admin dashbord */}
          <Route path='/admin/:button/:name' Component={AdminDashbord}/>

        </Routes>
      </Router>

    
    </div>
    
   

  );
}

export default App;

