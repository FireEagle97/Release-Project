import ApartmentImages from './Images.js';
import ContactSection from './ContactSection.js';
import { useLocation } from 'react-router-dom';
import './Apartment.css';

/**
 * ApartmentPage component for displaying information on a single apartment.
 *
 * @component
 * @returns {JSX.Element} Rendered ApartmentPage component.
 */
export default function ApartmentPage() {
    const location = useLocation();
    const apartment = location.state?.apartment;
    return (
        <div>
            {/* <ApartmentImages imagesLinks={apartment.images}/> */}
            <div id="apartment-information">
                <h1>infomationnnnn</h1>
                <ApartmentImages imagesLinks={apartment.images}/>
                <h3>
                    {apartment.furnishing} apartment located in {apartment.areaLocality}, {apartment.city}
                </h3>
                <h4>
                    Rent price: {apartment.rentPrice}
                    Floor: {apartment.floor}
                    Size: {apartment.size}
                    Bedrooms: {apartment.bhk}
                    Bathrooms: {apartment.bathroom}
                    Furnishing: {apartment.furnishing}
                    Listing post date: {apartment.postedDate}
                </h4>
                <h3>
                    For more information, contact the lister.
                </h3>
                <button>Interested</button>
                <ContactSection/>
            </div>
        </div>
    )
}