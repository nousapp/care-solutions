import React from 'react';

import logo from '../pics/CrownTransparent.png';
/**
 * Global navigation header
 * @param {Object} props Passed props
 * @param {string} props.auraLogo Logo URL
 * @param {boolean} props.isAuthenticated Authenticated flag
 */
const Header = () => (
  <header className="appHeader">
    <img src={logo} className="appLogo" alt="logo" />
    <p className="subHeader">Royal Bellingham's</p>
    <p className="headerTitle">Care Solutions</p>
  </header>
);


export default Header;
