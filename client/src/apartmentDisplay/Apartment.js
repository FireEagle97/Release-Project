import ApartmentImages from "./images.js";
import ContactSection from "./ContactSection.js";
import LeaseMap from "../components/leaseMap/leaseMap.js";
import { useLocation } from "react-router-dom";
import "./Apartment.css";
import { useState, useEffect } from "react";

/**
 * ApartmentPage component for displaying information on a single apartment.
 *
 * @component
 * @returns {JSX.Element} Rendered ApartmentPage component.
 */
export default function ApartmentPage() {
  const location = useLocation();
  const apartment = location.state?.apartment;
  let defaultcoord = [45.5019, -73.5674];
  const [leaseCoordinates, setLeaseCoordinates] = useState(defaultcoord);
  useEffect(() => {
    async function fetchCoordinate() {
      try {
        let response = await fetch(`/coordinate/${apartment.address}`);
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
    if (apartment.address !== null ) {
      fetchCoordinate();
    }
  }, [apartment.address]);
  return (
    <div>
      {/* <ApartmentImages imagesLinks={apartment.images}/> */}
      <div id="apartment-information">
        <ApartmentImages imagesLinks={apartment.images} />
        <div className="apt-info">
          <h3>
            {apartment.furnishing} apartment located in {apartment.address},{" "}
            {apartment.city}
          </h3>
          <h4>
            <br></br>
            <strong>Rent price:</strong> ${apartment.rentPrice}
            <br></br>
            <strong>Floor:</strong> {apartment.floor}
            <br></br>
            <strong>Size:</strong> {apartment.size} sq.ft.
            <br></br>
            <strong>Bedrooms:</strong> {apartment.bhk}
            <br></br>
            <strong>Bathrooms:</strong> {apartment.bathroom}
            <br></br>
            <strong>Furnishing:</strong> {apartment.furnishing}
            <br></br>
            <strong>Listing post date:</strong> {apartment.postedDate}
          </h4>
          <br></br>
          <h6>
            For more information, click the button below to contact the lister.
          </h6>
          <button>Interested</button>
          <h4>
            <strong>location: </strong>
          </h4>
          <LeaseMap leaseCoordinates={leaseCoordinates} />
        </div>
        <ContactSection />
      </div>
    </div>
  );
}
