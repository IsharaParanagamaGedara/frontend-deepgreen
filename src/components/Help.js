import React from 'react';
import '../assets/styles/Help.css';
import { useNavigate } from 'react-router-dom';
import deepgreenLogo from '../assets/images/deepgreen-icon.jpg'; // Import the logo image


const Help = () => {
  const navigate = useNavigate();

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
          <li className="nav-item"><a href="#" onClick={() => navigate('/plant-care')}><i className="fas fa-seedling nav-icon"></i><span className="nav-text">Plant Care</span></a></li>
          <li className="nav-item"><a href="#" onClick={() => navigate('/history')}><i className="fas fa-history nav-icon"></i><span className="nav-text">History</span></a></li>
          <li className="nav-item"><a href="#" onClick={() => navigate('/profile')}><i className="fas fa-user nav-icon"></i><span className="nav-text">Profile</span></a></li>
          <li className="nav-item"><a href="#" onClick={() => navigate('/stat')}><i className="fas fa-poll nav-icon"></i><span className="nav-text">Statistics</span></a></li>
          <li className="nav-item active"><a href="#"><i className="fas fa-exclamation-circle nav-icon"></i><span className="nav-text">Help</span></a></li> 
        </ul>
      </nav>

      {/* Main Content Area */}
      <main>
        {/* Header */}
        <header>
          <h1>Help</h1>
        </header>

        {/* Content Section */}
        <section className="content">
          <div className="help-section">
            <div className="help-item">
              <i className="fas fa-question-circle help-icon"></i>
              <div className="help-text">
                <h3>How to use the AI Detector?</h3>
                <p>Our AI Detector allows you to upload images of your plants to identify any diseases they might have. Simply click on the 'AI Detector' in the sidebar, and follow the instructions to upload your image.</p>
              </div>
            </div>
            <div className="help-item">
              <i className="fas fa-seedling help-icon"></i>
              <div className="help-text">
                <h3>What is Plant Care?</h3>
                <p>Plant Care provides guidelines on how to take care of your plants to prevent diseases and promote healthy growth. Click on 'Plant Care' in the sidebar to access these resources.</p>
              </div>
            </div>
            <div className="help-item">
              <i className="fas fa-history help-icon"></i>
              <div className="help-text">
                <h3>How to view my history?</h3>
                <p>To view your history of plant disease detections, click on 'History' in the sidebar. You'll see a list of all the images you've uploaded and the results of the AI detections.</p>
              </div>
            </div>
            <div className="help-item">
              <i className="fas fa-user help-icon"></i>
              <div className="help-text">
                <h3>How to update my profile?</h3>
                <p>To update your profile information, click on 'Profile' in the sidebar. You can change your name, email, and password there.</p>
              </div>
            </div>
            <div className="help-item">
              <i className="fas fa-sign-out-alt help-icon"></i>
              <div className="help-text">
                <h3>How to logout?</h3>
                <p>Click on 'Logout' in the sidebar to safely log out of your account. Remember to save any changes before you do.</p>
              </div>
            </div>
            <div className="help-item">
              <i className="fas fa-comments help-icon"></i>
              <div className="help-text">
                <h3>User Satisfaction Survey</h3>
                <p>We are conducting a survey to gather valuable feedback from users to enhance our plant disease detection system. Your insights will help us create a more effective and user-friendly application. This brief questionnaire should take only a few minutes to complete. Thank you for your participation!</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Help;

