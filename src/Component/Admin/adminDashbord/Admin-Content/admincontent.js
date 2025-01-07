import './admincontent.css'
import EmployeeUpload from '../../uploadEmployee/uploademployee'
import GeoTracking from '../../geo_tracking/geotracking'
import { useParams } from 'react-router-dom'
import AttReprocess from '../../attandenecReprocess/att_reprocess'
import RequestManagement from '../../leaveManagement/leaveManagement'
import AddUser from '../../addemployee'
import ChangeWeekoff from '../../change_weekoff_as_working_day/changeweekoff'
import WorkingDayAsWeekOff from '../../changWorkingdayasweekoff/workingdayasweekoff'
import AttendanceLock from '../../attendancelock/attendancelock'
import Makeoffer from '../../makeOffer/makeoffer'
import Sendregestration from '../../sendregestrationlink/sendRegestration'
import EmployeeCodeGeneration from '../../employeCodeGenaration/employcodgeneration'
import UploadeLeave from '../../uploadeleave/uploadeleave'
import CreateTicket from '../../createTicket/createticket'
import SupportDesk from '../../suppoer Desk/supportdest'
import OrgChart from '../../orgtree/orgtree'
import Employee_Search from '../searchemployee/Employee-Search'


const AdminContent = () =>{
    const parameters = useParams()
    const {button , name} = parameters

    return (
        <div className = "admin-content">
            {name === "upload-employee-details" && <EmployeeUpload/>}
            {name === "attendance-reprocess" && <AttReprocess/> }
            {name === "approve-requests" && <RequestManagement/>}
            {name === "add" && <AddUser/>} 
            {name === "change-week-off-as-working-day" && <ChangeWeekoff/>}
            {name === "change-working-day-as-week-off" && <WorkingDayAsWeekOff/>}
            {name === "attendance-lock" && <AttendanceLock/>}
            {name === "make-offer" && <Makeoffer/>}
            {name === "send-resignation-link" && <Sendregestration/>}
            {name === "employee-code-generation" && <EmployeeCodeGeneration/>}
            {name === "upload-leave-balance" && <UploadeLeave/>}
            {name === "create-ticket-for-employee" && <CreateTicket/>}
            {name === "support-desk" && <SupportDesk/>}
            {name === "organization-chart" && <OrgChart/>}
            {name === "search" && <Employee_Search/>}
        </div>
    )
}

export default AdminContent
