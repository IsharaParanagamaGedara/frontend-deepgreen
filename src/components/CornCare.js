import React from 'react';
import '../assets/styles/CornCare.css';
import { useNavigate } from 'react-router-dom';
import deepgreenLogo from '../assets/images/deepgreen-icon.jpg'; // Import the logo image
import cornImage from '../assets/images/plant care/Corn/corn.jpg'; // Import corn image
import commonRustImage from '../assets/images/plant care/Corn/CornCommonrust.jpg'; // Import common rust image
import grayLeafSpotImage from '../assets/images/plant care/Corn/CornGrayleafspot.jpg'; // Import gray leaf spot image
import northernLeafBlightImage from '../assets/images/plant care/Corn/CornNorthernLeafblight.jpg'; // Import northern leaf blight image

const CornCare = () => {
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
          <h1>Corn Plant Information</h1>
        </header>

        {/* Content Section */}
        <section className="content">
          {/* Corn Plant Information */}
          <div className="info-section">
            <img src={cornImage} alt="Corn Plant" className="plant-image" />
            <div className="plant-details">
              <p><strong>Species Name:</strong> Zea mays</p>
              <p><strong>Family Name:</strong> Poaceae</p>
              <p><strong>Description:</strong> Corn, also known as maize, is a large grain plant first domesticated by indigenous peoples in southern Mexico about 10,000 years ago. The leafy stalk of the plant produces pollen inflorescences (or "tassels") and separate ovuliferous inflorescences called ears that yield kernels or seeds, which are fruits. Corn is a staple food crop, and it is used in various forms such as cornmeal, corn syrup, and as livestock feed.</p>
              <p>Corn is a warm-season annual that grows best in temperatures between 60°F and 95°F. It requires full sun and well-drained soil, and it benefits from the addition of organic matter to the soil. Regular watering is essential, especially during the flowering and ear development stages.</p>
            </div>
          </div>
          
          

          {/* Corn Plant Diseases */}
          <div className="disease-section">
            <h2 onClick={toggleSection}>Corn Plant Diseases <i className="fas fa-angle-down"></i></h2>
            <div className="disease-details">
              <h3 onClick={toggleSection}>Common Rust <i className="fas fa-angle-down"></i></h3>
              <div className="disease-info">
                <img src={commonRustImage} alt="Common Rust" className="disease-image" />
                <p><strong>Description:</strong> Common rust is a fungal disease caused by Puccinia sorghi. It is prevalent in temperate regions and can cause significant yield losses in corn.</p>
                <p><strong>Symptoms:</strong> The disease is characterized by reddish-brown pustules on both leaf surfaces. These pustules contain spores that can spread the infection. As the disease progresses, the pustules turn black, and severe infections can lead to extensive leaf blight and reduced photosynthetic area.</p>
                <p><strong>Causes:</strong> Common rust thrives in cool, wet weather. The spores are wind-borne and can infect plants over long distances. High humidity and prolonged leaf wetness favor the development and spread of the disease.</p>
              </div>

              <h3 onClick={toggleSection}>Gray Leaf Spot <i className="fas fa-angle-down"></i></h3>
              <div className="disease-info">
                <img src={grayLeafSpotImage} alt="Gray Leaf Spot" className="disease-image" />
                <p><strong>Description:</strong> Gray leaf spot is caused by the fungus Cercospora zeae-maydis. It is a major disease of corn, particularly in regions with warm, humid climates.</p>
                <p><strong>Symptoms:</strong> Lesions start as small, necrotic spots that expand into rectangular, grayish lesions confined by the leaf veins. Severe infections can cause premature leaf senescence, reducing the plant's photosynthetic capacity and grain fill.</p>
                <p><strong>Causes:</strong> The disease develops rapidly under conditions of high humidity and leaf wetness. The fungus overwinters in crop residue and produces spores that are spread by wind and rain-splash.</p>
              </div>

              <h3 onClick={toggleSection}>Northern Leaf Blight <i className="fas fa-angle-down"></i></h3>
              <div className="disease-info">
                <img src={northernLeafBlightImage} alt="Northern Leaf Blight" className="disease-image" />
                <p><strong>Description:</strong> Northern leaf blight is caused by the fungus Exserohilum turcicum. It is common in corn-growing regions with moderate to high rainfall.</p>
                <p><strong>Symptoms:</strong> The disease appears as long, elliptical, grayish-green lesions on the leaves. These lesions can coalesce, leading to large areas of dead tissue. Severe infections can significantly reduce yield by limiting the plant's photosynthetic area and reducing grain fill.</p>
                <p><strong>Causes:</strong> The fungus survives on infected crop residues and is spread by wind and rain-splash. It thrives in moderate temperatures (65-80°F) and high humidity. Dense planting and poor air circulation can exacerbate the disease.</p>
              </div>
            </div>
          </div>
          
          

          {/* Cure Suggestion */}
          <div className="cure-section">
            <h2 onClick={toggleSection}>Cure Suggestion <i className="fas fa-angle-down"></i></h2>
            <div className="cure-details">
              <h3 onClick={toggleSection}>Common Rust <i className="fas fa-angle-down"></i></h3>
              <div className="cure-info">
                <p><strong>Treating Methods:</strong></p>
                <ul>
                  <li><strong>Plant Resistant Varieties:</strong> Use corn hybrids that are resistant to common rust. These varieties are less likely to develop severe infections.</li>
                  <li><strong>Monitor Fields:</strong> Regularly inspect crops for early signs of rust. If rust is detected, apply fungicides according to local recommendations to prevent further spread.</li>
                  <li><strong>Optimize Plant Spacing:</strong> Ensure adequate spacing between plants to improve air circulation and reduce humidity levels, which can help prevent the spread of the disease.</li>
                  <li><strong>Crop Rotation:</strong> Rotate corn with non-host crops to reduce the buildup of rust spores in the soil.</li>
                </ul>
              </div>

              <h3 onClick={toggleSection}>Gray Leaf Spot <i className="fas fa-angle-down"></i></h3>
              <div className="cure-info">
                <p><strong>Treating Methods:</strong></p>
                <ul>
                  <li><strong>Crop Rotation:</strong> Rotate corn with non-host crops to reduce inoculum levels in the soil.</li>
                  <li><strong>Residue Management:</strong> Incorporate crop residues into the soil to speed up decomposition and reduce spore levels. This can help limit the initial source of infection.</li>
                  <li><strong>Fungicide Application:</strong> Use fungicides at the first sign of disease and follow recommended application schedules. Ensure thorough coverage of the foliage to protect against infection.</li>
                  <li><strong>Maintain Good Field Hygiene:</strong> Remove and destroy infected plant debris to prevent the disease from spreading to healthy plants.</li>
                </ul>
              </div>

              <h3 onClick={toggleSection}>Northern Leaf Blight <i className="fas fa-angle-down"></i></h3>
              <div className="cure-info">
                <p><strong>Treating Methods:</strong></p>
                <ul>
                  <li><strong>Plant Resistant Hybrids:</strong> Select corn hybrids with resistance to northern leaf blight. Resistant varieties can help reduce the severity of the disease.</li>
                  <li><strong>Field Sanitation:</strong> Remove and destroy infected plant debris after harvest to reduce the overwintering inoculum.</li>
                  <li><strong>Fungicide Application:</strong> Apply fungicides as needed, especially during periods of high humidity and moderate temperatures that favor the disease. Follow local guidelines for fungicide use and application timing.</li>
                  <li><strong>Improve Air Circulation:</strong> Ensure proper spacing and avoid dense planting to improve air circulation and reduce humidity, which can help prevent the spread of the disease.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CornCare;
