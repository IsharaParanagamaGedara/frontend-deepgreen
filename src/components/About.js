import React from 'react';
import '../assets/styles/LandingPage.css';

const AboutUs = () => {
  return (
    <section className="about-us" id="about">
      <h2>About Us</h2>
      <div className="about-us-content">
        <div className="company-story">
          <h3>Our Story</h3>
          <p>
            DeepGreen started as a small initiative aimed at helping farmers identify plant diseases quickly and efficiently. Over the years, we have evolved into a comprehensive platform providing advanced AI-driven plant disease diagnostics and personalized cure suggestions. Our journey has been driven by a passion for sustainable agriculture and innovative technology.
          </p>
        </div>
        <div className="whom-we-serve">
          <h3>Whom We Serve</h3>
          <p>
            We serve farmers, gardeners, and agricultural enthusiasts who are looking for accurate and timely plant disease diagnostics. Our platform is designed to assist anyone who is passionate about maintaining healthy crops and gardens.
          </p>
        </div>
        <div className="mission-vision">
          <div className="card mission">
            <h3>Mission Statement</h3>
            <p>
              Our mission is to empower individuals and communities to achieve sustainable agriculture through cutting-edge technology and accessible solutions.
            </p>
          </div>
          <div className="card vision">
            <h3>Vision Statement</h3>
            <p>
              Our vision is to be the leading provider of innovative agricultural solutions, contributing to a world where food security and sustainable farming practices are the norms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;