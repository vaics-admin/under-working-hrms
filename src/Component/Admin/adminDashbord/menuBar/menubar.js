import "./menubar.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const AdminMenu = ({ submensofActiveTabs }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  // Parse existing query parameters
  const queryParams = new URLSearchParams(location.search);

  console.log("Params:", params);
  console.log("Query Params:", queryParams.toString());

  return (
    <div className="admin-menu-container">
      <div className="admin-logo-container">
        <img className="admin-log" src="./VAICSLogo.png" alt="Vaics-Logo" />
      </div>
      <div className="admin-menu-icons-container">
        {submensofActiveTabs &&
          submensofActiveTabs.map((item, index) => (
            <button
              key={index}
              className="admin-menu-button"
              onClick={() =>
                navigate(
                  `/admin/${queryParams.get("activeButton")}/${item.name
                    .replace(/ /g, "-")
                    .toLowerCase()}?${queryParams.toString()}`
                )
              }
            >
              {item.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default AdminMenu;
