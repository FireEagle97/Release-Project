import { useEffect } from 'react';
import './home.css';

/**
 * Home component for displaying data related to a selected country.
 *
 * @component
 * @returns {JSX.Element} Rendered Home component.
 */
export default function Home() {
  
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

  
  return (
    <>
      <h2>Welcome to ReLease!</h2>
      <p>Our platform serves as a bridge between tenants looking to vacate their current rental
        properties and people searching for the perfect place to call home. Whether you want to relocate
        for a job, upgrade to a larger space, or downsize to a cozier home, ReLease is here to make the
        transition smooth and hassle-free.
      </p>
      <br></br>
      <h3>Contact Information</h3>
      <p>You can reach out to us at the following email:</p>
      <p>release@info.com</p>
    </>
  );
  
}