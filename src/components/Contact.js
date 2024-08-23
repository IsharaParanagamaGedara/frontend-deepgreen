import React from 'react';
import '../assets/styles/LandingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <h2>Contact Us</h2>
      <div className="contact-container">
        <div className="contact-info">
          <p>Contact us for questions, technical assistance, or collaboration opportunities via the contact information provided.</p>
          <div className="info-item">
            <FontAwesomeIcon icon={faPhone} className="info-icon" />
            <p>(031) 222-8888</p>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faEnvelope} className="info-icon" />
            <p>info@deepgreen.com</p>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="info-icon" />
            <p>153 Minuwangoda Rd., Negombo, 11500</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
