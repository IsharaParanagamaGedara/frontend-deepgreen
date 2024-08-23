import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/LandingPage.css';

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <h1>Revolutionize Plant Care with Real-Time Disease Detection</h1>
        <p>DeepGreen helps you diagnose plant diseases instantly and provides effective cure suggestions.</p>
        <Link to="/register" className="cta-btn">
          Get Started
        </Link>
      </div>
      <div className="hero-images">
        <div className="image-card">
          <img src={require('../assets/images/hero1.jpg')} alt="Strawberry Plant" />
        </div>
        <div className="image-card">
          <img src={require('../assets/images/hero2.jpg')} alt="Potato Plant" />
        </div>
        <div className="image-card">
          <img src={require('../assets/images/hero3.jpg')} alt="Corn Plant" />
        </div>
      </div>
    </section>
  );
};

export default Hero;