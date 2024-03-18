import React, { useState } from 'react';
import './nav.css';
import { Link } from 'react-router-dom';
import {GoogleLogin, GoogleLogout} from '@react-oauth/google';



/**
 * Navigation component for displaying a responsive navigation bar.
 *
 * @component
 * @returns {JSX.Element} Rendered Navigation component.
 */
export default function Navigation() {
  // State variable to track the click state for menu activation.
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  // Function to handle menu click and toggle the click state.
  const handleClick = () => setClick(!click);


  const handleLogin = async (response) => {
    try {
      const res = await fetch('http://localhost:3002/login', {
        method: 'POST',
        body: JSON.stringify({
          idToken: response.credential,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        
        // Update state with the login status and username
        setIsLoggedIn(true);
        // console.log('useremail', data.data.email);
        setUsername(data.data.email);
        setName(data.data.name);


      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'DELETE',
      });

      if (response.ok) {
        //updating state to indicate user is logged out
        setIsLoggedIn(false);
        setUsername('');
        setName('');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };



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

            {isLoggedIn && (
            <li className="nav-item">
              <Link to="/post-listing" className="nav-link" onClick={handleClick}>
                Post Listing
              </Link>
            </li>
            )}

            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={handleClick}>
                Home
              </Link>
            </li>



          </ul>
          
          {/* <div>
            {isLoggedIn ? (
              // Display content for logged-in user
              <div>
                <p>Welcome, {name}!</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              // Display content for not logged-in user
              <ul>
                <li>
                  <button>
                    <GoogleLogin onSuccess={handleLogin} onError={() => console.log('Login failed')} />
                  </button>
                </li>
              </ul>
            )}
          </div> */}

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

      <div>
        {isLoggedIn ? (
          // Display content for logged-in user
          <div>
            <p>Welcome, {name}!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          // Display content for not logged-in user

          <button>
            <GoogleLogin onSuccess={handleLogin} onError={() => console.log('Login failed')} />
          </button>

        )}
      </div>
  </>
    
  );
}


