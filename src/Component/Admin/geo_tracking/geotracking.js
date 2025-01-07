import React, { useState, useEffect } from "react";

const GeoTracking = () => {
  const [location, setLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [locationName, setLocationName] = useState("");

  const fetchLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: new Date().toISOString(),
          };

          // Update location state
          setLocation(newLocation);

          // Reverse Geocode to fetch location name
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=106dde618d2f4abfbe56ebe35a3549fa`
          );
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const name = data.results[0].formatted;
            setLocationName(name);
            newLocation.name = name;
          }

          // Update locations history
          const updatedLocations = [...locations, newLocation];
          setLocations(updatedLocations);

          // Store updated locations in localStorage
          localStorage.setItem("locations", JSON.stringify(updatedLocations));
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to fetch location. Please check your permissions.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    // Load stored locations from localStorage on component mount
    const storedLocations = JSON.parse(localStorage.getItem("locations")) || [];
    setLocations(storedLocations);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Geo-Tracking</h2>
      <button onClick={fetchLocation} style={{ padding: "10px", margin: "10px 0" }}>
        Fetch Location
      </button>
      {location && (
        <div style={{ marginBottom: "20px" }}>
          <h4>Current Location:</h4>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>Timestamp: {location.timestamp}</p>
          <p>Location Name: {locationName || "Fetching..."}</p>
        </div>
      )}
      <div>
        <h4>Location History:</h4>
        <ul>
          {locations.map((loc, index) => (
            <li key={index}>
              {`Lat: ${loc.latitude}, Long: ${loc.longitude}, Name: ${
                loc.name || "Unknown"
              }, Time: ${loc.timestamp}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GeoTracking;
