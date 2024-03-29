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
      <div class="banner">
        <picture><img src="/logo1.png" alt="Logo" class="background-image" /></picture>
        <div class="banner-content">
          <p>WELCOME TO</p>
        </div>
      </div>
      <div class="banner-mobile">
        {/* <div class="banner-content-mobile">
            <p>WELCOME TO</p>
        </div> */}
        <picture><img src="/logo1.png" alt="Logo" class="background-image-mobile" /></picture>
      </div>

      <button id='view-apartments-btn' type='button' onClick={navigateToApartments}>
        Start Searching
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
        {/* <div className="city-container-mobile">
          <div className='city-image-container'>
            <div className='white-overlay'>
              <img src={'/montreal.jpeg'} alt="Montreal" className="city-image" />
              <button className='city-image-button-mobile' onClick={() => navigateToApartmentsWithCity("Montreal")}>View Montreal Leases</button>
            </div>
          </div> 
          <p className="city-text" onClick={() => navigateToApartmentsWithCity("Montreal")}>
            View Montreal Leases</p>
        </div> */}
      </div>
      
    </>
  );
  
}