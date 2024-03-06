import React, { useState } from 'react';
import './nav.css';
import { Link } from 'react-router-dom';
import {GoogleLogin} from '@react-oauth/google';






/**
 * Navigation component for displaying a responsive navigation bar.
 *
 * @component
 * @returns {JSX.Element} Rendered Navigation component.
 */
export default function Navigation() {
  // State variable to track the click state for menu activation.
  const [click, setClick] = useState(false);

  // Function to handle menu click and toggle the click state.
  const handleClick = () => setClick(!click);

  const handleLogin = response => {
    fetch('http://localhost:3002/login', {
      method: 'POST',
      body: JSON.stringify({
        "idToken": response.credential
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }



  return (
    
    <>
      <nav className="navbar">
        <div className="nav-container">
          {/* Navigation header with a link to the home page. */}
          <a href="/" className="nav-header">
            {/* <span>Re-lease</span> */}
            <picture><img src="/logo1.png" alt="Logo" className="logo-image" /></picture>
            <p>RE-LEASE</p>
          </a>


          {/* List of navigation items with links to different sections. */}
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">

              <Link to="/about" className="nav-link" onClick={handleClick}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={handleClick}>
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/post-listing" className="nav-link" onClick={handleClick}>
                Post Listing
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={handleClick}>
                Home
              </Link>
            </li>



          </ul>
          <li className="nav-item">
            <GoogleLogin onSuccess={handleLogin}
              onError={() => console.log('Login failed')} />
            
          </li>

          {/* Button to activate/deactivate the menu on smaller screens. */}
          <div className="nav-activate" onClick={handleClick}>
            {click ? 
              <span className="activate">
                Close
              </span>
              : 
              <span className="activate">
                Menu
              </span>
            }
          </div>
        </div>
      </nav>
  </>
    
  );
}
