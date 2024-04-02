import { useEffect } from 'react';
import { Suspense } from 'react';
import LeaseMap from '../components/leaseMap/leaseMap';
import './home.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from  'i18next';
import lngs from '../languages';

/**
 * Home component for displaying data related to a selected country.
 *
 * @component
 * @returns {JSX.Element} Rendered Home component.
 */
export default function Home({navigateToApartments}) {
  const { t } = useTranslation();
  
  const navigate = useNavigate();
  
  /**
   * useEffect hook to fetch data when there are changes in page or country.
   */
  useEffect(() => {
    async function fetchData() {
      
    }

    try {
      fetchData();
    } catch (e) {
    }
  }, []);
  
  const navigateToApartmentsWithCity = (city) => {
    navigate(`/apartments/${city}`, { state: { city } });
  };
  
  return (
    <>
    <Suspense fallback="...is loading">
      {/* <br></br> */}
      {/* <h2>Welcome to ReLease!</h2> */}
      {/* <p>Our platform serves as a bridge between tenants looking to vacate their current rental
        properties and people searching for the perfect place to call home. Whether you want to relocate
        for a job, upgrade to a larger space, or downsize to a cozier home, ReLease is here to make the
        transition smooth and hassle-free.
      </p>
      <br></br>
      <h3>Contact Information</h3>
      <p>You can reach out to us at the following email:</p>
      <p>release@info.com</p> */}
      {/* <picture><img src="/logo1.png" alt="Logo" className="logo-image" /></picture>
      <p>Looking for affordable rent?</p> */}
      {/* <select
          className="m-4 p-2 bg-blue-600 rounded"
          onChange={() => i18n.changeLanguage(lng.code)}
        >
          {lngs.map((lng) => (
            <option key={lng.code} value={lng.code}>
              {lng.nativeName}
            </option>
          ))}
        </select> */}
        {lngs.map((lng) => {
        return (
          <button
            className="m-4 p-2 bg-blue-600 rounded"
            key={lng.code}
            type="submit"
            onClick={() => i18n.changeLanguage(lng.code)}
          >
            {lng.nativeName}
          </button>
        );
      })}

      <div class="banner">
        <picture><img src="/logo1.png" alt="Logo" class="background-image" /></picture>
        <div class="banner-content">
          <p>WELCOME TO</p>
        </div>
      </div>

      <button id='view-apartments-btn' type='button' onClick={navigateToApartments}>
        {/* Start Searching */}
        {t('Home.searchbtn')}
      </button>

      <div className='cities-container'>
        <div className="city-container">
          <img src={'/montreal.jpeg'} alt="Montreal" className="city-image" />
          <p className="city-text" onClick={() => navigateToApartmentsWithCity("Montreal")}>
            View Montreal Leases</p>
        </div>

        <div className="city-container">
          <img src={'/toronto.webp'} alt="Toronto" className="city-image" />
          <p className="city-text" onClick={() => navigateToApartmentsWithCity("Toronto")}>
            View Toronto Leases</p>
        </div>

        <div className="city-container">
          <img src={'/vancouver.jpeg'} alt="Vancouver" className="city-image" />
          <p className="city-text" onClick={() => navigateToApartmentsWithCity("Vancouver")}>
            View Vancouver Leases</p>
        </div>
      </div>
      
      </Suspense>
    </>
  );
  
}