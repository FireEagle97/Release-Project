import { useState } from 'react';
import ApartmentImages from './Images.js';
import ContactSection from './ContactSection.js';
import './Apartment.css';

/**
 * ApartmentPage component for displaying information on a single apartment.
 *
 * @component
 * @returns {JSX.Element} Rendered ApartmentPage component.
 */
export default function ApartmentPage(apartment) {

    return (
        <div>
            <ApartmentImages imagesLinks={apartment.images}/>
            <div id="apartment-information">
                <ContactSection/>
            </div>
        </div>
    )
}