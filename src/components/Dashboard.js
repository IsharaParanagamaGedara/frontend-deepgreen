import React, { useEffect, useState } from 'react';
import '../assets/styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import deepgreenLogo from '../assets/images/deepgreen-icon.jpg';
import userProfileImage from '../assets/images/user-profile.jpg';
import cornImage from '../assets/images/plant care/Corn/corn.jpg';
import potatoImage from '../assets/images/plant care/Potato/potato.jpg';
import strawberryImage from '../assets/images/plant care/Strawberry/strawberry.jpg';
import { Doughnut } from 'react-chartjs-2';

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [overview, setOverview] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [cropPredictions, setCropPredictions] = useState({ crop_type_counts: {}, crop_type_percentages: {} });


  useEffect(() => {
    fetchProfile();
    fetchOverview();
    fetchRecentActivity();
    fetchCropPredictions();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if token is missing
      return;
    }
    try {
      const response = await axios.get('http://localhost:5000/dashboard/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      navigate('/login'); // Handle error and redirect to login
    }
  };

  const fetchOverview = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if token is missing
      return;
    }
    try {
      const response = await axios.get('http://localhost:5000/dashboard/overview', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOverview(response.data);
    } catch (error) {
      console.error('Error fetching overview:', error);
      navigate('/login'); // Handle error and redirect to login
    }
  };

  const fetchRecentActivity = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if token is missing
      return;
    }
    try {
      const response = await axios.get('http://localhost:5000/dashboard/recent_activity', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecentActivity(response.data);
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      navigate('/login'); // Handle error and redirect to login
    }
  };

  const fetchCropPredictions = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if token is missing
      return;
    }
    try {
      const response = await axios.get('http://localhost:5000/dashboard/predictions_by_crop_type', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCropPredictions(response.data);
    } catch (error) {
      console.error('Error fetching crop predictions:', error);
      navigate('/login'); // Handle error and redirect to login
    }
  };

  const cropData = {
    labels: Object.keys(cropPredictions.crop_type_percentages),
    datasets: [
      {
        data: Object.values(cropPredictions.crop_type_percentages),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
      },
    ],
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.post(
          'http://localhost:5000/auth/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.removeItem('token');  // Remove token from local storage
        navigate('/login');  // Navigate to login page after logout
      } catch (error) {
        console.error('Logout failed:', error);
        // Handle logout failure if needed
      }
    } else {
      navigate('/login');  // If token is not present, navigate to login page
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
          <li className="nav-item active">
            <a href="#">
              <i className="fas fa-tachometer-alt nav-icon"></i>
              <span className="nav-text">Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" onClick={() => navigate('/ai-detector')}>
              <i className="fas fa-leaf nav-icon"></i>
              <span className="nav-text">AI Detector</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" onClick={() => navigate('/plant-care')}>
              <i className="fas fa-seedling nav-icon"></i>
              <span className="nav-text">Plant Care</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" onClick={() => navigate('/history')}>
              <i className="fas fa-history nav-icon"></i>
              <span className="nav-text">History</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" onClick={() => navigate('/profile')}>
              <i className="fas fa-user nav-icon"></i>
              <span className="nav-text">Profile</span>
            </a>
          </li>          
          <li className="nav-item">
            <a href="#" onClick={() => navigate('/stat')}>
              <i className="fas fa-poll nav-icon"></i>
              <span className="nav-text">Statistics</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" onClick={() => navigate('/help')}>
              <i className="fas fa-exclamation-circle nav-icon"></i>
              <span className="nav-text">Help</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" onClick={() => navigate('/feedback')}>
              <i className="fas fa-comment-dots nav-icon"></i>
              <span className="nav-text">Feedback</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" onClick={handleLogout}>
              <i className="fas fa-window-close nav-icon"></i>
              <span className="nav-text">Logout</span>
            </a>
          </li>
        </ul>
      </nav>

      <main>
        <header>
          <h1>Welcome to DeepGreen Dashboard</h1>
        </header>

        <div className="profile-image-section">
          <div className="profile-image-container">
            <img src={userProfileImage} alt="Profile" className="profile-image" />
            <div className="profile-message">
              <h3>Hello, {profile.first_name} {profile.last_name}!</h3>
              <p>{profile.email}</p>
            </div>
          </div>
        </div>

        {/* Overview */}
        <section className="contentdashboard">
          <div className="overview">
            <h2>Overview</h2>
            <div className="stats">
              <div className="stat">
                <i className="fas fa-leaf"></i>
                <p>Predictions Made</p>
                <span>{overview.predictions_made}</span>
              </div>
              <div className="stat">
                <i className="fas fa-heartbeat"></i>
                <p>Healthy Plants</p>
                <span>{overview.healthy_plants}</span>
              </div>
              <div className="stat">
                <i className="fas fa-bug"></i>
                <p>Diseased Plants</p>
                <span>{overview.diseased_plants}</span>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="activities">
            <h2>Recent Activities</h2>
            {recentActivity.length > 0 ? (
              <div className="activity-container">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="activity">
                    <img src={activity.image_url} alt={`Recent Activity ${index + 1}`} />
                    <div className="overlay">
                      <h3>{activity.predicted_class}</h3>
                      <p>Confidence: {activity.confidence_percentage}%</p>
                      <p>Date: {new Date(activity.prediction_date).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No recent activities.</p>
            )}
          </div>

          {/* Plant Care */}
          <div className="plant-care-d">
            <h2>Plant Care</h2>
            <div className="plant-care-container-d">
              <div className="plant-card-d">
                <img src={cornImage} alt="Corn" className="plant-image" />
                <h3>Corn</h3>
                <button className="view-details-btn" onClick={() => navigate('/corn-care')}>
                  View Details
                </button>
              </div>
              <div className="plant-card-d">
                <img src={potatoImage} alt="Potato" className="plant-image" />
                <h3>Potato</h3>
                <button className="view-details-btn" onClick={() => navigate('/potato-care')}>
                  View Details
                </button>
              </div>
              <div className="plant-card-d">
                <img src={strawberryImage} alt="Strawberry" className="plant-image" />
                <h3>Strawberry</h3>
                <button className="view-details-btn" onClick={() => navigate('/strawberry-care')}>
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Crop Predictions */}
          <div className="crop-predictions">
            <h2>Predictions by Crop Type</h2>
            <div className="crop-chart">
              <Doughnut data={cropData} />
            </div>
            <div className="crop-counts">
              {Object.entries(cropPredictions.crop_type_counts).map(([crop, count]) => (
                <div key={crop} className="crop-count">
                  <p>{crop}</p>
                  <span>{count}</span>
                </div>
              ))}
            </div>
          </div>

        </section>
      </main>
    </div>
  );
};

export default Dashboard;

