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
  console.log("apartment address", apartment.address);
 
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
          <LeaseMap address={apartment.address} />
        </div>
        <ContactSection />
      </div>
    </div>
  );
}
