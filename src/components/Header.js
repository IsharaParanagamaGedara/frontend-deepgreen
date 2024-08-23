import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import deepgreenLogo from '../assets/images/deepgreen-icon.jpg'; // Import the logo image
import '../assets/styles/LandingPage.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleNavigation = (e, target) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <img src={deepgreenLogo} alt="DeepGreen Logo" className="header__logo-img" />
          DeepGreen
        </div>
        <nav className={`header__nav-menu ${menuOpen ? 'header__nav-menu--open' : ''}`}>
          <a href="/#hero" className="header__nav-link" onClick={(e) => handleNavigation(e, '#hero')}>Home</a>
          <a href="/#about" className="header__nav-link" onClick={(e) => handleNavigation(e, '#about')}>About Us</a>
          <a href="/#features" className="header__nav-link" onClick={(e) => handleNavigation(e, '#features')}>Features</a>
          <a href="/#how-it-works" className="header__nav-link" onClick={(e) => handleNavigation(e, '#how-it-works')}>How It Works</a>
          <a href="/#contact" className="header__nav-link" onClick={(e) => handleNavigation(e, '#contact')}>Contact</a>
          <Link to="/login" className="header__nav-link header__login-btn">Login</Link>
        </nav>
        <button className="header__menu-toggle" onClick={toggleMenu}>
          <span className="header__menu-icon">&#9776;</span>
        </button>
      </div>
    </header>
  );
};

export default Header;