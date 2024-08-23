import React from 'react';
import '../assets/styles/LandingPage.css';

const steps = [
  {
    title: "Step 1",
    description: "Register or log in to your account.",
    image: require('../assets/images/step1.jpg')
  },
  {
    title: "Step 2",
    description: "Upload an image of the plant leaf.",
    image: require('../assets/images/step2.jpg')
  },
  {
    title: "Step 3",
    description: "Get a detailed prediction with confidence percentage.",
    image: require('../assets/images/step3.jpg')
  },
  {
    title: "Step 4",
    description: "View personalized cure suggestions.",
    image: require('../assets/images/step4.jpg')
  }
];

const HowItWorks = () => {
  return (
    <section className="how-it-works" id="how-it-works">
      <h2>How It Works</h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div className="step-item" key={index}>
            <img src={step.image} alt={step.title} />
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;