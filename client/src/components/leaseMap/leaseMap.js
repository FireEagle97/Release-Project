import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "./leaseMap.css";
import L from "leaflet";

function CenterMap({ coordinates }) {
  const map = useMap();
  map.setView(coordinates, map.getZoom());
  const currentCenter = map.getCenter();
  console.log("coordinates", currentCenter);

  return null;
}
const LeaseMap = ({ address }) => {

 
  let defaultcoord = [45.5019, -73.5674];
  const [leaseCoordinates, setLeaseCoordinates] = useState([]);
  function iniializeMap(){
    console.log("coordinates",leaseCoordinates)
    const map = L.map("map-container", {
      center: leaseCoordinates,
      zoom:13,
      layers: [
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });
    const aptIcon = new L.Icon({
      iconUrl: require("../../assets/marker-icon.png"),
      iconSize: [32, 32],
    });
    const marker = L.marker(leaseCoordinates, {icon: aptIcon});
    marker.bindPopup(`<b>Coordinates: ${leaseCoordinates[0]}</b>`).openPopup();
    marker.addTo(map);
  
  }
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
  }, []);
  useEffect(() => {
    if (leaseCoordinates.length > 0) {
      iniializeMap();
    }
  },[leaseCoordinates]);
  // useEffect(() => {
  //   console.log("Coordinates updated:", leaseCoordinate); // Log when leaseCoordinate changes
  // }, [leaseCoordinate]);
  return (
    <div id="map-container">
        {/* <div>apt:{leaseCoordinates[0]} leaseCoordinates: {leaseCoordinates.length} </div> */}
        {/* {leaseCoordinates.length === 2 && ( */}
        {/* <MapContainer
          // key={leaseCoordinate.toString()}
          center={leaseCoordinates}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
            <Marker position={leaseCoordinates} icon={aptIcon}>
              <Popup>
                A pretty CSS3 popup {leaseCoordinates[0]}. <br /> Easily
                customizable.
              </Popup>
            </Marker> */}
          {/* <CenterMap coordinates={leaseCoordinates} /> */}
        {/* </MapContainer> */}
        {/* )} */}
    </div>
  );
};
export default LeaseMap;
