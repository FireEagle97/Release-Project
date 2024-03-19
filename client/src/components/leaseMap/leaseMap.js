import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "./leaseMap.css";
import L from "leaflet";

const aptIcon = new L.Icon({
  iconUrl: require("../../assets/marker-icon.png"),
  iconSize: [32, 32],
});
function CenterMap({ coordinates }) {
  const map = useMap();
  map.setView(coordinates, map.getZoom());
  const currentCenter = map.getCenter();
  console.log("coordinates", currentCenter);

  return null;
}

const LeaseMap = ({ address }) => {

 
  let defaultcoord = [45.5019, -73.5674];
  const [leaseCoordinates, setLeaseCoordinates] = useState(defaultcoord);
  useEffect(() => {
    async function fetchCoordinate() {
      try {
        let response = await fetch(`/coordinate/${address}`);
        if (!response.ok) {
          throw new Error("Failed to fetch leases");
        }else{
          const data = await response.json();
          setLeaseCoordinates(data.coordinates);
        }
  
      } catch (error) {
        console.error("Error fetching leases:", error);
      }
    }
    if (address !== null ) {
      fetchCoordinate();
    }
  }, [address]);
  // useEffect(() => {
  //   console.log("Coordinates updated:", leaseCoordinate); // Log when leaseCoordinate changes
  // }, [leaseCoordinate]);
  return (
    <div id="map-container">
      <>
        <div>apt:{leaseCoordinates[0]} </div>
        <MapContainer
          // key={leaseCoordinate.toString()}
          center={leaseCoordinates}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "300px", width: "400px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {leaseCoordinates.length === 2 && (
            <Marker position={leaseCoordinates} icon={aptIcon}>
              <Popup>
                A pretty CSS3 popup {leaseCoordinates[0]}. <br /> Easily
                customizable.
              </Popup>
            </Marker>
          )}
          {/* <CenterMap coordinates={leaseCoordinates} /> */}
        </MapContainer>
      </>
    </div>
  );
};
export default LeaseMap;
