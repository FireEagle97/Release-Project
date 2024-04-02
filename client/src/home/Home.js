import { useEffect, useState } from 'react';
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
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  

  // Function to handle language change
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  }
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
    
    <div className="language-container">
  <div className="language-dropdown">
    <select
      className="m-4 p-2 bg-blue-600 rounded"
      value={selectedLanguage}
      onChange={(e) => handleLanguageChange(e.target.value)}
    >
      {lngs.map((lng) => (
        <option key={lng.code} value={lng.code}>
          {lng.nativeName}
        </option>
      ))}
    </select>
  </div>
</div>


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
      
    </>
  );
  
}