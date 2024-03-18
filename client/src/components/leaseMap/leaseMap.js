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
  console.log("coordinates",coordinates);
  map.setView(coordinates, map.getZoom());
  return null;
}

const LeaseMap = ({address}) => {

  let defaultcoord = [45.5019, -73.5674];
  const [leaseCoordinate, setLeaseCoordinate] = useState(defaultcoord);
  useEffect(() => {
    async function fetchCoordinate() {
      try {
        let response = await fetch(`/coordinate/${address}`);
        if (!response.ok) {
          throw new Error("Failed to fetch leases");
        }
        const data = await response.json();
        setLeaseCoordinate(data.coordinates);
      } catch (error) {
        console.error("Error fetching leases:", error);
      }
    }
    fetchCoordinate();
  }, [address]);
  return (
    <div id="map-container">
      {leaseCoordinate.length === 2  && (
      <>
      <div>apt:{leaseCoordinate[0]} </div>
      <MapContainer
          center={leaseCoordinate}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "300px", width: "400px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={leaseCoordinate} icon={aptIcon}>
            <Popup>
              A pretty CSS3 popup {leaseCoordinate[0]}. <br /> Easily customizable.
            </Popup>
          </Marker>
          {/* <CenterMap coordinates={leaseCoordinate} /> */}
        </MapContainer>
        </>
       )}
    </div>
  );
};
export default LeaseMap;
