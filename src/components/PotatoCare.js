import React from 'react';
import '../assets/styles/PotatoCare.css';
import { useNavigate } from 'react-router-dom';
import deepgreenLogo from '../assets/images/deepgreen-icon.jpg'; // Import the logo image
import potatoImage from '../assets/images/plant care/Potato/potato.jpg';
import lateBlightImage from '../assets/images/plant care/Potato/PotatoLateblight.jpg';
import earlyBlightImage from '../assets/images/plant care/Potato/PotatoEarlyblight.jpg';

const PotatoCare = () => {
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
          <h1>Potato Plant Information</h1>
        </header>

        {/* Content Section */}
        <section className="content">
          {/* Potato Plant Information */}
          <div className="info-section">
            <img src={potatoImage} alt="Potato Plant" className="plant-image" />
            <div className="plant-details">
              <p><strong>Species Name:</strong> Solanum tuberosum</p>
              <p><strong>Family Name:</strong> Solanaceae</p>
              <p><strong>Description:</strong> The potato is a starchy tuber of the plant Solanum tuberosum. It is a staple food crop in many parts of the world and is known for its versatility in cooking. Potatoes are herbaceous perennials that produce edible tubers.</p>
              <p>Potatoes thrive in well-drained, fertile soils and are typically grown from seed potatoes or tuber pieces. They require full sun and consistent moisture for optimal growth.</p>
            </div>
          </div>
          
          

          {/* Potato Plant Diseases */}
          <div className="disease-section">
            <h2 onClick={toggleSection}>Potato Plant Diseases <i className="fas fa-angle-down"></i></h2>
            <div className="disease-details">
              <h3 onClick={toggleSection}>Early Blight <i className="fas fa-angle-down"></i></h3>
              <div className="disease-info">
                <img src={earlyBlightImage} alt="Early Blight" className="disease-image" />
                <p><strong>Description:</strong> Early blight is a common fungal disease caused by Alternaria solani. It affects potatoes and other members of the Solanaceae family.</p>
                <p><strong>Symptoms:</strong> Dark, concentric spots on older leaves, which eventually turn yellow and die. Severe infections can cause defoliation and reduce tuber quality and yield.</p>
                <p><strong>Causes:</strong> Early blight is favored by warm, wet conditions and is spread by spores through rain splash, wind, or contaminated equipment.</p>
              </div>

              <h3 onClick={toggleSection}>Late Blight <i className="fas fa-angle-down"></i></h3>
              <div className="disease-info">
                <img src={lateBlightImage} alt="Late Blight" className="disease-image" />
                <p><strong>Description:</strong> Late blight is a devastating fungal disease caused by Phytophthora infestans. It affects potatoes and other Solanaceae crops, famously causing the Irish potato famine.</p>
                <p><strong>Symptoms:</strong> Water-soaked lesions on leaves and stems, which rapidly expand into large, dark, necrotic areas. Tuber infections cause brown, rotting patches.</p>
                <p><strong>Causes:</strong> Late blight thrives in cool, moist conditions and spreads quickly through spores carried by wind, water, or infected plant material.</p>
              </div>
            </div>
          </div>
          
          

          {/* Cure Suggestion */}
          <div className="cure-section">
            <h2 onClick={toggleSection}>Cure Suggestion <i className="fas fa-angle-down"></i></h2>
            <div className="cure-details">
              <h3 onClick={toggleSection}>Early Blight <i className="fas fa-angle-down"></i></h3>
              <div className="cure-info">
                <p><strong>Treating Methods:</strong></p>
                <ul>
                  <li><strong>Rotate Crops:</strong> Avoid planting potatoes in the same soil for consecutive years. Rotate with non-host crops.</li>
                  <li><strong>Use Resistant Varieties:</strong> Plant potato varieties that are resistant to early blight.</li>
                  <li><strong>Remove Infected Plant Debris:</strong> Clean up and destroy infected plant material to reduce spore sources.</li>
                  <li><strong>Apply Fungicides:</strong> Use fungicides as a preventative measure, especially during warm, wet weather. Follow label instructions.</li>
                </ul>
              </div>

              <h3 onClick={toggleSection}>Late Blight <i className="fas fa-angle-down"></i></h3>
              <div className="cure-info">
                <p><strong>Treating Methods:</strong></p>
                <ul>
                  <li><strong>Plant Healthy Seed Tubers:</strong> Use certified disease-free seed potatoes.</li>
                  <li><strong>Ensure Good Air Circulation:</strong> Space plants properly and avoid dense planting to reduce humidity around plants.</li>
                  <li><strong>Water Carefully:</strong> Water plants at the base, avoiding overhead irrigation that can spread spores.</li>
                  <li><strong>Monitor and Remove Infected Plants:</strong> Regularly inspect plants and remove any that show symptoms of late blight.</li>
                  <li><strong>Apply Fungicides:</strong> Use fungicides specifically effective against late blight. Apply at the first sign of disease and repeat as necessary.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PotatoCare;
