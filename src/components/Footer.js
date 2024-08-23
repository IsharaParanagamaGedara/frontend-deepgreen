import React from 'react';
import '../assets/styles/LandingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
        <a href="#faq">FAQs</a>
      </div>
      
      <div className="go-to-top" onClick={scrollToTop}>
        <FontAwesomeIcon icon={faArrowUp} />
      </div>
      
      <div className="copyright">
        <p>&copy; 2024 DeepGreen. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;