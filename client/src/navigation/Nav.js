import React, { useState } from 'react';
import './nav.css';

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

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          {/* Navigation header with a link to the home page. */}
          <a href="/" className="nav-header">
            {/* <span>Re-lease</span> */}
            <span><img src="/logo1.png" alt="Logo" className="logo-image" /></span>
          </a>

          {/* List of navigation items with links to different sections. */}
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={handleClick}>
                Home
              </a>
            </li>
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
    </>
  );
}
