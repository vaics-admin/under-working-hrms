import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./adminTopnav.css";

const AdminTopnav = ({ activeButton, setactiveButton, setsubmensofActiveTabs }) => {
  const [subActiveButton, setSubactiveButton] = useState("");
  const [secondSubActive, setSecondSubActive] = useState("");
  const navigate = useNavigate();
  const { mainSection, subSection } = useParams(); // Extract parameters from URL

  const navItems = [
    {
      name: "Dashboard",
      subItems: [
        { name: "Admin Dashboard" },
        { name : "Employee Dashboard" }
      ],
    },
    {
      name: "Core HR",
      subItems: [
        {
          name: "Employee Data Bank",
          subItems: [
            { name: "Add" },
            { name: "Upload Employee Details" },
            { name: "Search" },
            { name: "Employee Other Details" },
            { name: "Organization Chart" },
          ],
        },
        {
          name: "Offers and Onboarding",
          subItems: [
            { name: "Make Offer" },
            { name: "Send Resignation Link" },
            { name: "Employee Code Generation" },
          ],
        },
        {
          name: "Confirmation Process",
          subItems: [{ name: "Final Confirmation Process" }],
        },
        {
          name: "Letter Management",
          subItems: [{ name: "Generate Letters" }],
        },
        {
          name: "Exit Management",
          subItems: [
            { name: "Approve Employee Resignation" },
            { name: "Relieve an Employee" },
            { name: "View Exit Interview Feedback" },
          ],
        },
        {
          name: "Others",
          subItems: [
            { name: "Change Password" },
            { name: "Generate Password" },
          ],
        },
      ],
    },
    {
      name: "Employee Services",
      subItems: [
        {
          name: "Manage Attendance",
          subItems: [
            { name: "Attendance Home" },
            { name: "Approve Requests" },
            { name: "Attendance Reprocess" },
            { name: "Change Week Off as Working Day" },
            { name: "Change Working Day as Week Off" },
            { name: "Attendance Lock" },
            { name: "Approve with Monthly" },
          ],
        },
        {
          name: "Manage Comp Off",
          
        },
        {
          name: "Manage Leave",
          subItems: [
            { name: "Upload Leave Balance" },
            { name: "Approve Leave Requests" },
            { name: "Leave Home" },
            { name: "Manage Leave Balance" },
          ],
        },
        {
          name: "Manage Tickets",
          subItems: [
            { name: "Create Ticket for Employee" },
            { name: "Support Desk" },
          ],
        },
        {
          name: "Project and Time Sheet",
          subItems: [
            { name: "Approve or View Employee Time Sheet" },
            { name: "Project Creation" },
            { name: "Win Project Mapping" },
          ],
        },
      ],
    },
  ];
  

  // Update states based on URL parameters
  useEffect(() => {
    if (mainSection) {
      const activeItem = navItems.find(
        (item) => item.name.replace(/ /g, "-").toLowerCase() === mainSection
      );

      if (activeItem) {
        setactiveButton(activeItem.name);
        setsubmensofActiveTabs(activeItem.subItems);

        if (subSection) {
          const activeSubItem = activeItem.subItems.find(
            (sub) => sub.name.replace(/ /g, "-").toLowerCase() === subSection
          );
          if (activeSubItem) {
            setSubactiveButton(activeSubItem.name);
          }
        }
      }
    }
  }, [mainSection, subSection, navItems, setactiveButton, setsubmensofActiveTabs]);



  return (
    <ul className="admin-top-nav-bar">
      {navItems.map((item) => (
        <li
          key={item.name}
          className={
            activeButton === item.name
              ? "admin-nav-bar-button-li nav-Active"
              : "admin-nav-bar-button-li"
          }
          onMouseEnter={() => setSubactiveButton(item.name)}
          onMouseLeave={() => setSubactiveButton(null)}
        >
          <li
            
            className={
              activeButton === item.name
                ? "admin-top-nav-button Active"
                : "admin-top-nav-button"
            }
          >
            {item.name}
          </li>

          {subActiveButton === item.name && item.subItems.length > 0 && (
            <ul className="sublist">
              {item.subItems.map((each, index) => (
                <li key={index}>
                  {
                    each.subItems ? <li
                    className="sublist-button"
                    onMouseEnter={() => {setSecondSubActive(each.name) ; }}
                    
                  >
                    {each.name}
                  </li> : <button
                    className="sublist-button"
                    onMouseEnter={() => setSecondSubActive(each.name)}
                    onClick={() => {
                      setactiveButton(item.name);
                      setsubmensofActiveTabs(item.subItems);
                      each.name === "Employee Dashboard" ? navigate (`/shome`) : navigate(`/admin/${item.name.replace(/ /g, "-").toLowerCase()}/${each.name.replace(/ /g, "-").toLowerCase()}`);
                    }}
                  >
                    {each.name}
                  </button>
                  }
                  {secondSubActive === each.name && each.subItems && (
                    <ul className="second-sub-list">
                      {each.subItems.map((submenu, subIndex) => (
                        <li key={subIndex}>
                          <button
                            onClick={() => {
                              setactiveButton(item.name);
                              setsubmensofActiveTabs(each.subItems);
                              navigate(`/admin/${item.name.replace(/ /g, "-").toLowerCase()}/${submenu.name.replace(/ /g, "-").toLowerCase()}`);
                              
                            }}
                            className="second-sub-list-button"
                          >
                            {submenu.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default AdminTopnav;
