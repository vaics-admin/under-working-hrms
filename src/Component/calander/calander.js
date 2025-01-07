import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calander.css";

const EmployeeAttendanceCalendar = () => {
  const [calendarData, setCalendarData] = useState({});
  const [hoveredDateDetails, setHoveredDateDetails] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const generateCalendarData = () => {
    const calendarData = {};
    const startDate = new Date("2024-01-01");
    const endDate = new Date("2024-12-31");

    const getRandomStatus = () => {
      const statuses = ["A", "P"];
      return statuses[Math.floor(Math.random() * statuses.length)];
    };

    const getRandomShift = () => {
      const shifts = [
        "FX - Flexi Shift",
        "GS - General Shift",
        "NS - Night Shift",
      ];
      return shifts[Math.floor(Math.random() * shifts.length)];
    };

    const getRandomTime = () => {
      const hours = Math.floor(Math.random() * 12) + 1;
      const minutes = Math.floor(Math.random() * 60);
      const amPm = Math.random() < 0.5 ? "AM" : "PM";
      return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${amPm}`;
    };

    const getDateString = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    let currentDate = startDate;
    while (currentDate <= endDate) {
      const dateString = getDateString(currentDate);
      const dayOfWeek = currentDate.getDay();

      if (dayOfWeek === 5 || dayOfWeek === 6) {
        calendarData[dateString] = {
          status: "WO",
          inTime: "",
          outTime: "",
          shift: "",
        };
      } else {
        const status = getRandomStatus();
        calendarData[dateString] = {
          status,
          inTime: status === "P" ? getRandomTime() : "",
          outTime: status === "P" ? getRandomTime() : "",
          shift: status === "P" ? getRandomShift() : "",
        };
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return calendarData;
  };

  const calendarDataSample = generateCalendarData();

  useEffect(() => {
    setCalendarData(calendarDataSample);
  }, []);

  const handleMouseEnter = (event, date) => {
    const dateString = date.toISOString().split("T")[0];
    const details = calendarData[dateString];
    if (details) {
      setHoveredDateDetails(details);
      setTooltipPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseLeave = () => {
    setHoveredDateDetails(null);
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0];
      switch (calendarData[dateString]?.status) {
        case "P":
          return "tile-present";
        case "A":
          return "tile-absent";
        case "WO":
          return "tile-weekend";
        default:
          return null;
      }
    }
    return null;
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0];
      const details = calendarData[dateString];
      if (details) {
        return (
          <div
            className="tile-content"
            onMouseEnter={(e) => handleMouseEnter(e, date)}
            onMouseLeave={handleMouseLeave}
          >
            <span>{details.status}</span>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <Calendar
        tileClassName={tileClassName}
        tileContent={(tileProps) => (
          <div
            className="tile-wrapper"
            onMouseEnter={(e) => handleMouseEnter(e, tileProps.date)}
            onMouseLeave={handleMouseLeave}
          >
            {tileContent(tileProps)}
          </div>
        )}
      />
      {hoveredDateDetails && (
        <div
          className="tooltip"
          style={{
            top: `${tooltipPosition.y + 10}px`,
            left: `${tooltipPosition.x + 10}px`,
          }}
        >
          {hoveredDateDetails.inTime && <p>In: {hoveredDateDetails.inTime}</p>}
          {hoveredDateDetails.outTime && (
            <p>Out: {hoveredDateDetails.outTime}</p>
          )}
          {hoveredDateDetails.shift && <p>Shift: {hoveredDateDetails.shift}</p>}
          <p>Status: {hoveredDateDetails.status}</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeAttendanceCalendar;
