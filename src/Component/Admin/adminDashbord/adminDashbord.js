import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminContent from "./Admin-Content/admincontent";
import AdminTopnav from "./admin-top-navbar/adminTopNav";
import AdminMenu from "./menuBar/menubar";
import "./adminDashbord.css";

const AdminDashbord = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Parse query params for initial state
  const queryParams = new URLSearchParams(location.search);
  const initialActiveButton = queryParams.get("activeButton") || "Dashboard";
  const initialSubmenus = queryParams.get("submensofActiveTabs")
    ? JSON.parse(queryParams.get("submensofActiveTabs"))
    : [];

  const [activeButton, setActiveButton] = useState(initialActiveButton);
  const [submensofActiveTabs, setsubmensofActiveTabs] = useState(initialSubmenus);

  // Update URL whenever state changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("activeButton", activeButton);
    params.set("submensofActiveTabs", JSON.stringify(submensofActiveTabs));
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [activeButton, submensofActiveTabs, navigate, location.pathname]);

  const handleOnClick = (props) => {
    setActiveButton(props);
  };

  return (
    // Admin dashboard container
    <div className="admin-dashboard-container">
      <AdminMenu submensofActiveTabs={submensofActiveTabs} />
      <div className="admin-content-contsiner">
        <AdminTopnav
          activeButton={activeButton}
          setsubmensofActiveTabs={setsubmensofActiveTabs}
          setactiveButton={handleOnClick}
        />
        <AdminContent />
      </div>
    </div>
    
  );
};

export default AdminDashbord;
