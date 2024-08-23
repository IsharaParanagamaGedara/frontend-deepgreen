import React from 'react';
import '../assets/styles/LandingPage.css';

const features = [
  {
    title: "Real-time Disease Detection",
    description: "Instantly identify plant diseases using advanced AI technology.",
    image: require('../assets/images/feature1.jpg')
  },
  {
    title: "Accurate Predictions",
    description: "Receive precise predictions to help you take timely action.",
    image: require('../assets/images/feature2.jpg')
  },
  {
    title: "User-friendly Interface",
    description: "Easily upload images and receive detailed reports.",
    image: require('../assets/images/feature3.jpg')
  }
];

const Features = () => {
  return (
    <section className="features" id="features">
      <h2>Features</h2>
      <div className="features-container">
        {features.map((feature, index) => (
          <div className="feature-item" key={index}>
            <img src={feature.image} alt={feature.title} />
            <div className="feature-content">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;