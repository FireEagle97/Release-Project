import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./leaseMap.css";
import L from "leaflet";

const aptIcon = new L.Icon({
  iconUrl: require("../../assets/marker-icon.png"),
  iconSize: [32, 32],
});

const LeaseMap = () => {
  // const [aptPosition, setAptPosition] = useState([]);

  return (
    <div id="map-container">
      <MapContainer
        center={[45.5019, -73.5674]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "300px", width: "400px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[45.5019, -73.5674]} icon={aptIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
export default LeaseMap;
