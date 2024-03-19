import React, { useState, useEffect } from 'react';
import './nav.css';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';


/**
 * Navigation component for displaying a responsive navigation bar.
 *
 * @component
 * @returns {JSX.Element} Rendered Navigation component.
 */
export default function Navigation() {
  //state variable to track the click state for menu activation.
  const [click, setClick] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [username, setUsername] = useState('');
  // const [name, setName] = useState('');
  // const [otherField, setOtherField] = useState('');


  //function to handle menu click and toggle the click state.
  const handleClick = () => setClick(!click);


  // const handleLogin = async (response) => {
  //   try {
  //     const res = await fetch('/login', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         idToken: response.credential,
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (res.ok) {
  //       const data = await res.json();
        
  //       // Update state with the login status and username
  //       setIsLoggedIn(true);
  //       // console.log('useremail', data.data.email);
  //       setUsername(data.data.email);
  //       setName(data.data.name);

  //       // store user email in local storage
  //       localStorage.setItem('username', data.data.email);
  //       localStorage.setItem('name', data.data.name);


  //     } else {
  //       console.error('Login failed');
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error);
  //   }
  // };

  // const handleLogout = async () => {
  //   try {
  //     const response = await fetch('/logout', {
  //       method: 'DELETE',
  //     });

  //     if (response.ok) {

  //       //clear user email form local storage
  //       localStorage.removeItem('username');
  //       localStorage.removeItem('name');
  //       //updating state to indicate user is logged out
  //       setIsLoggedIn(false);
  //       setUsername('');
  //       setName('');
  //     } else {
  //       console.error('Logout failed');
  //     }
  //   } catch (error) {
  //     console.error('Error during logout:', error);
  //   }
  // };

  // useEffect(() => {
  //   let mounted = true;

  //   //fetch data from the restricted access API when component mounts
  //   fetch('/restrictedAccess')
  //     .then(response => {
  //       //check if the component is still mounted before updating state
  //       if (mounted) {
  //         //check if the response status is 200
  //         if (response.status === 200) {
  //           //if the response status is 200, extract data and set state
  //           return response.json().then(data => {
  //             setOtherField(data.userId);
  //           });
  //         } else {
  //           //if the response status is not 200, handle error
  //           throw new Error('Unauthorized');
  //         }
  //       }

  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //       setOtherField('');
  //     });

  //   //cleanup to set mounted to false when the component unmounts
  //   return () => {
  //     mounted = false;
  //   };
  // }, [username]);

  // useEffect(() => {
  //   //check if the user email & name exists in local storage
  //   const storedUsername = localStorage.getItem('username');
  //   const storedname = localStorage.getItem('name');
  //   if (storedUsername && storedname) {
  //     setUsername(storedUsername);
  //     setName(storedname);
  //     setIsLoggedIn(true);
  //   }
  // }, []);


  return (
    
    <>
    {/* <div>
      <p>Here is some other data: {otherField}</p>
    </div> */}

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
              <Link to="/" className="nav-link" onClick={handleClick}>
                Home
              </Link>
            </li>
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

            {/* {isLoggedIn && (
            <li className="nav-item">
              <Link to="/post-listing" className="nav-link" onClick={handleClick}>
                Post Listing
              </Link>
            </li>
            )} */}
            <li className="nav-item">
              <Link to="/profil" className="nav-link" onClick={handleClick}>
                Profil
              </Link>
            </li>

            {/* <li className="nav-item">
              <Link to="/" className="nav-link" onClick={handleClick}>
                Home
              </Link>
            </li> */}
            {/* {isLoggedIn && (
            <li className="nav-item">
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </li>
          )} */}
          </ul>

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
{/* 
      <div>
        {isLoggedIn ? (
          <div className="user-info">
              <p>Welcome, {name}!</p>
              {/* <button onClick={handleLogout}>Logout</button> */}
            {/* </div>
        ) : ( */}
          {/* // Display content for not logged-in user

          // <button>
          //   <GoogleLogin onSuccess={handleLogin} onError={() => console.log('Login failed')} />
          // </button>
          <div className="login-button">
            <GoogleLogin onSuccess={handleLogin} onError={() => console.log('Login failed')} />
          </div>

        )}
      </div> */}
       {/* */}
  </>
    
  );
}


