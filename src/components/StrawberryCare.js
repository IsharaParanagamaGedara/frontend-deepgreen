import React from 'react';
import '../assets/styles/StrawberryCare.css';
import { useNavigate } from 'react-router-dom';
import deepgreenLogo from '../assets/images/deepgreen-icon.jpg'; // Import the logo image
import strawberryImage from '../assets/images/plant care/Strawberry/strawberry.jpg';
import leafScorchImage from '../assets/images/plant care/Strawberry/StrawberryLeafscorch.jpg';

const StrawberryCare = () => {
  const navigate = useNavigate();

  const toggleSection = (event) => {
    const target = event.currentTarget.nextElementSibling;
    const icon = event.currentTarget.querySelector('i');

    if (target.style.display === "none" || !target.style.display) {
      target.style.display = "block";
      icon.classList.remove('fa-angle-down');
      icon.classList.add('fa-angle-up');
    } else {
      target.style.display = "none";
      icon.classList.remove('fa-angle-up');
      icon.classList.add('fa-angle-down');
    }
  };

  return (
    <div className="dashboard">
      <nav className="main-menu">
        <div className="logo-container">
          <img src={deepgreenLogo} alt="Logo" className="logo-icon" />
          <h1>DeepGreen</h1>
        </div>
        <ul>
          <li className="nav-item"><a href="#" onClick={() => navigate('/dashboard')}><i className="fas fa-tachometer-alt nav-icon"></i><span className="nav-text">Dashboard</span></a></li>
          <li className="nav-item"><a href="#" onClick={() => navigate('/ai-detector')}><i className="fas fa-leaf nav-icon"></i><span className="nav-text">AI Detector</span></a></li>
          <li className="nav-item active"><a href="#"><i className="fas fa-seedling nav-icon"></i><span className="nav-text">Plant Care</span></a></li>
          <li className="nav-item"><a href="#" onClick={() => navigate('/history')}><i className="fas fa-history nav-icon"></i><span className="nav-text">History</span></a></li>
          <li className="nav-item"><a href="#" onClick={() => navigate('/profile')}><i className="fas fa-user nav-icon"></i><span className="nav-text">Profile</span></a></li>
          <li className="nav-item"><a href="#" onClick={() => navigate('/stat')}><i className="fas fa-poll nav-icon"></i><span className="nav-text">Statistics</span></a></li>
          <li className="nav-item"><a href="#" onClick={() => navigate('/help')}><i className="fas fa-exclamation-circle nav-icon"></i><span className="nav-text">Help</span></a></li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main>
        {/* Header */}
        <header>
          <a href="#" onClick={() => navigate('/plant-care')} className="back-link"><i className="fas fa-arrow-left"></i> Back to Plant Care</a>
          <h1>Strawberry Plant Information</h1>
        </header>

        {/* Content Section */}
        <section className="content">
          {/* Strawberry Plant Information */}
          <div className="info-section">
            <img src={strawberryImage} alt="Strawberry Plant" className="plant-image" />
            <div className="plant-details">
              <p><strong>Species Name:</strong> Fragaria × ananassa</p>
              <p><strong>Family Name:</strong> Rosaceae</p>
              <p><strong>Description:</strong> Strawberries are a widely grown hybrid species of the genus Fragaria, collectively known as the strawberries. They are highly valued for their juicy, sweet fruit and are cultivated worldwide for consumption both fresh and in processed forms like jam, juice, and desserts.</p>
              <p>Strawberries prefer a temperate climate but can be grown in various conditions with proper care. They are herbaceous perennials, meaning they die back in winter but regrow each spring from their rootstock.</p>
            </div>
          </div>
          
          

          {/* Strawberry Plant Diseases */}
          <div className="disease-section">
            <h2 onClick={toggleSection}>Strawberry Plant Diseases <i className="fas fa-angle-down"></i></h2>
            <div className="disease-details">
              <h3 onClick={toggleSection}>Leaf Scorch <i className="fas fa-angle-down"></i></h3>
              <div className="disease-info">
                <img src={leafScorchImage} alt="Leaf Scorch" className="disease-image" />
                <p><strong>Description:</strong> Leaf scorch is a fungal disease caused by the pathogen Diplocarpon earliana. It primarily affects strawberry plants but can also affect other members of the Rosaceae family.</p>
                <p><strong>Symptoms:</strong> The disease manifests as small, dark purple spots on the leaves. These spots gradually enlarge, and as they merge, they cause the leaf tissue to dry out and die, leading to a scorched appearance. Severe infections can defoliate plants, reducing yield and vigor.</p>
                <p><strong>Causes:</strong> Leaf scorch is favored by wet, humid conditions, especially during spring and early summer. The fungus spreads via spores that are carried by wind, water, or contaminated tools and equipment. Dense planting and poor air circulation exacerbate the disease's spread.</p>
              </div>
            </div>
          </div>
          
          

          {/* Cure Suggestion */}
          <div className="cure-section">
            <h2 onClick={toggleSection}>Cure Suggestion <i className="fas fa-angle-down"></i></h2>
            <div className="cure-details">
              <h3 onClick={toggleSection}>Leaf Scorch <i className="fas fa-angle-down"></i></h3>
              <div className="cure-info">
                <p><strong>Treating Methods:</strong></p>
                <ul>
                  <li><strong>Use Disease-Free Planting Material:</strong> Start with healthy, certified disease-free plants to prevent the introduction of the fungus into your garden.</li>
                  <li><strong>Practice Crop Rotation:</strong> Avoid planting strawberries in the same location year after year. Rotate crops to prevent the buildup of fungal spores in the soil.</li>
                  <li><strong>Ensure Good Air Circulation:</strong> Space plants adequately and prune regularly to improve air movement, which helps to reduce humidity levels around the foliage.</li>
                  <li><strong>Water Carefully:</strong> Use drip irrigation or water at the base of the plants to keep foliage dry. Avoid overhead watering, especially late in the day.</li>
                  <li><strong>Apply Fungicides:</strong> Use fungicides as a preventative measure or at the first sign of disease. Follow label instructions carefully for safe and effective use.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StrawberryCare;
