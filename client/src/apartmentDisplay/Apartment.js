import ApartmentImages from './images.js';
import { useLocation } from 'react-router-dom';
import './Apartment.css';
import React, { useState } from 'react';

/**
 * ApartmentPage component for displaying information on a single apartment.
 *
 * @component
 * @returns {JSX.Element} Rendered ApartmentPage component.
 */
export default function ApartmentPage() {
    const location = useLocation();
    const apartment = location.state?.apartment;
    const [isReported, setIsReported] = useState(false);

    const handleReport = async() => {
        setIsReported(true);
        if(apartment.reports > 3){
            await removeRelease(apartment._id);
        }else{
            await reportRelease(apartment._id);
        }
    };
    
    return (
        <div>
            <div id="apartment-information">
                <ApartmentImages imagesLinks={apartment.images}/>
                <div className='apt-info'>
                    <h3>
                        {apartment.furnishing} apartment located in {apartment.address}, {apartment.city}
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
                    <br/>
                    <br/>
                    {!isReported ? (
                        <div id="report-space">
                            <p>Any problems in this posting?</p>
                            <button id="report-btn" onClick={handleReport}>Report</button>
                        </div>
                    ) : (
                        <p id="report-message">Thank you! You've submitted your report.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

async function removeRelease(id){
    try {
        await fetch('/leaseDelete/' + id, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ id: id }) 
        });

    } catch (error) {
        console.error('Error:', error);
    }

}

async function reportRelease(id){
    try {
        await fetch('/leaseReport/' + id, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ id: id }) 
        });

    } catch (error) {
        console.error('Error:', error);
    }
}