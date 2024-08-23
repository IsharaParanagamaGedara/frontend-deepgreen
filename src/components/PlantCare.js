import React, { useState, useEffect } from 'react';
import '../assets/styles/PlantCare.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import deepgreenLogo from '../assets/images/deepgreen-icon.jpg'; // Import the logo image
import cornImage from '../assets/images/plant care/Corn/corn.jpg'; // Import Corn image
import potatoImage from '../assets/images/plant care/Potato/potato.jpg'; // Import Potato image
import strawberryImage from '../assets/images/plant care/Strawberry/strawberry.jpg'; // Import Strawberry image

const PlantCare = () => {
  const navigate = useNavigate();
  const [diseases, setDiseases] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState('');
  const [diseaseInfo, setDiseaseInfo] = useState({});
  const [cureSuggestions, setCureSuggestions] = useState([]);

  useEffect(() => {
    fetchDiseases();
  }, []);

  useEffect(() => {
    if (selectedDisease) {
      fetchDiseaseInfo(selectedDisease);
      fetchCureSuggestions(selectedDisease);
    }
  }, [selectedDisease]);

  const fetchDiseases = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in local storage
      const response = await axios.get('http://127.0.0.1:5000/disease/disease_names', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDiseases(response.data);
    } catch (error) {
      console.error('Error fetching diseases:', error);
    }
  };

  const fetchDiseaseInfo = async (diseaseName) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://127.0.0.1:5000/disease/disease_info/${diseaseName}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDiseaseInfo(response.data);
    } catch (error) {
      console.error('Error fetching disease info:', error);
    }
  };

  const fetchCureSuggestions = async (diseaseName) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:5000/suggestion/detailed_cure_suggestions', {
        headers: { Authorization: `Bearer ${token}` },
        params: { disease_name: diseaseName },
      });
      setCureSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching cure suggestions:', error);
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

      <main>
        <header>
          <h1>Plant Care</h1>
        </header>

        <section className="content">
          <div className="search-section">
            <h2>Select Plant Disease</h2>
            <select
              id="disease-dropdown"
              value={selectedDisease}
              onChange={(e) => setSelectedDisease(e.target.value)}
            >
              <option value="">--Select Disease--</option>
              {diseases.map((disease, index) => (
                <option key={index} value={disease}>
                  {disease}
                </option>
              ))}
            </select>
          </div>

          <div className="info-section">
            <div className="info-card" id="disease-info">
              <h2>Plant Disease Information</h2>
              <p>Plant Name: <span id="plant-name">{diseaseInfo.plant_name || 'N/A'}</span></p>
              <p>Disease Name: <span id="disease-name">{diseaseInfo.disease_name || 'N/A'}</span></p>
              <p>Description: <span id="disease-description">{diseaseInfo.description || 'N/A'}</span></p>
              <p>Symptoms: <span id="disease-symptoms">{diseaseInfo.symptoms || 'N/A'}</span></p>
              <p>Causes: <span id="disease-causes">{diseaseInfo.causes || 'N/A'}</span></p>
            </div>
            <div className="info-card" id="cure-suggestion">
              <h2>Cure Suggestion</h2>
              {cureSuggestions.length > 0 ? (
                <ul>
                  {cureSuggestions.map((suggestion) => (
                    <li key={suggestion.id}>{suggestion.suggestion}</li>
                  ))}
                </ul>
              ) : (
                <p>No suggestions available.</p>
              )}
            </div>
          </div>

          <div className="friendly-message">
            <p>Choose a plant below to learn more about its care and diseases.</p>
          </div>

          <section className="plant-section">
            <div className="plant-card">
              <img src={cornImage} alt="Corn" className="plant-image" />
              <h3>Corn</h3>
              <button className="view-details-btn" onClick={() => navigate('/corn-care')}>View Details</button>
            </div>
            <div className="plant-card">
              <img src={potatoImage} alt="Potato" className="plant-image" />
              <h3>Potato</h3>
              <button className="view-details-btn" onClick={() => navigate('/potato-care')}>View Details</button>
            </div>
            <div className="plant-card">
              <img src={strawberryImage} alt="Strawberry" className="plant-image" />
              <h3>Strawberry</h3>
              <button className="view-details-btn" onClick={() => navigate('/strawberry-care')}>View Details</button>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default PlantCare;

