import React, { useState, useEffect } from "react";
import { Icon  } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "./leaseMap.css";
import L from "leaflet";
import markerImage from '../../assets/marker-icon.png';
// const aptIcon = new L.Icon({
//   iconUrl: require("/marker-icon.png"),
//   iconSize: [32, 32],
// });
const customIcon = new Icon({
  iconUrl: markerImage,
  iconSize: [38, 38]
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
        console.log('responseeee', response);
        if (!response.ok) {
          throw new Error("Failed to fetch leases");
        }
        const data = await response.json();
        //log
        console.log('data coordinates', data.coordinates);

        setLeaseCoordinate(data.coordinates);
        
      } catch (error) {
        console.error("Error fetching leases:", error);
      }
    }

    fetchCoordinate();

  }, [address]);

  console.log(leaseCoordinate[0], leaseCoordinate[1]);

  return (
    <div id="map-container">
      {/* {leaseCoordinate.length === 2  && ( */}
      <>
      <MapContainer
          center={leaseCoordinate}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "300px", width: "400px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' 
            />
          <Marker position={[leaseCoordinate[1], leaseCoordinate[0]]} icon={customIcon}>
            <Popup>
            <p>It's here!</p>
            </Popup>
          </Marker>
        </MapContainer>
        </>
       {/* )} */}
    </div>
  );
};
export default LeaseMap;
