import { useEffect } from 'react';
import LeaseMap from '../components/leaseMap/leaseMap';
import './home.css';
import { useNavigate } from 'react-router-dom';

/**
 * Home component for displaying data related to a selected country.
 *
 * @component
 * @returns {JSX.Element} Rendered Home component.
 */
export default function Home({navigateToApartments}) {
  const navigate = useNavigate();
  
  const navigateToApartmentsWithCity = (city) => {
    navigate(`/apartments/${city}`, { state: { city } });
  };
  
  return (
    <>
      <div class="banner">
        <picture><img src="/logo1.png" alt="Logo" class="background-image" /></picture>
        <div class="banner-content">
          <p>WELCOME TO</p>
        </div>
      </div>

      <button id='view-apartments-btn' type='button' onClick={navigateToApartments}>
        Start Searching
      </button>

      <div className='cities-container'>
        <div className="city-container">
          <img src={'/montreal.jpeg'} loading="lazy" alt="Montreal" className="city-image" />
          <p className="city-text" onClick={() => navigateToApartmentsWithCity("Montreal")}>
            View Montreal Leases</p>
        </div>

        <div className="city-container">
          <img src={'/toronto.webp'} loading="lazy"  alt="Toronto" className="city-image" />
          <p className="city-text" onClick={() => navigateToApartmentsWithCity("Toronto")}>
            View Toronto Leases</p>
        </div>

        <div className="city-container">
          <img src={'/vancouver.jpeg'} loading="lazy"  alt="Vancouver" className="city-image" />
          <p className="city-text" onClick={() => navigateToApartmentsWithCity("Vancouver")}>
            View Vancouver Leases</p>
        </div>
      </div>
      
    </>
  );
  
}