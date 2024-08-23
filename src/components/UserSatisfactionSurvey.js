import React, { useState } from 'react';
import '../assets/styles/Survey.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import deepgreenLogo from '../assets/images/deepgreen-icon.jpg'; // Import the logo image


const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked
          ? [...prevState[name], value]
          : prevState[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  return [formData, handleInputChange, setFormData];
};

const UserSatisfactionSurvey = () => {
  const navigate = useNavigate();
  const [formData, handleInputChange, setFormData] = useForm({
    satisfaction: '',
    usefulness: [],
    desiredFeatures: [],
    recommendation: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    if (!formData.satisfaction || !formData.recommendation) {
      setErrorMessage('Please complete all required fields.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:5000/survey/submit', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSuccessMessage(response.data.message);
      setFormData({
        satisfaction: '',
        usefulness: [],
        desiredFeatures: [],
        recommendation: '',
      });
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred. Please try again.';
      if (error.response?.status === 401) {
        setErrorMessage('You are not authorized. Please log in.');
        navigate('/login'); // Redirect to login if unauthorized
      } else {
        setErrorMessage(message);
      }
    } finally {
      setIsLoading(false);
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
          <li className="nav-item"><a href="#" onClick={() => navigate('/plant-care')}><i className="fas fa-seedling nav-icon"></i><span className="nav-text">Plant Care</span></a></li>
          <li className="nav-item"><a href="#" onClick={() => navigate('/history')}><i className="fas fa-history nav-icon"></i><span className="nav-text">History</span></a></li>
          <li className="nav-item"><a href="#" onClick={() => navigate('/profile')}><i className="fas fa-user nav-icon"></i><span className="nav-text">Profile</span></a></li>
          <li className="nav-item"><a href="#" onClick={() => navigate('/stat')}><i className="fas fa-poll nav-icon"></i><span className="nav-text">Statistics</span></a></li>
          <li className="nav-item"><a href="#" onClick={() => navigate('/help')}><i className="fas fa-exclamation-circle nav-icon"></i><span className="nav-text">Help</span></a></li>
          <li className="nav-item active"><a href="#"><i className="fas fa-comment-dots nav-icon"></i><span className="nav-text">Feedback</span></a></li>
        </ul>
      </nav>

      <main>
        <header>
          <h1>User Satisfaction Survey</h1>
        </header>

        <section className="content">
          <p>We are conducting a survey to gather valuable feedback from users to enhance our plant disease detection system. Your insights will help us create a more effective and user-friendly application. This brief questionnaire should take only a few minutes to complete. <b>Thank you for your participation!</b></p>
          
          <form id="survey-form" onSubmit={handleSubmit}>
            <div className="card">
              <div className="form-group">
                <label htmlFor="satisfaction"><b>1. Overall Satisfaction </b><i className="fas fa-smile"></i></label>
                <p>How satisfied are you with the current features of the plant disease detection system?</p>
                <div className="radio-group">
                  <input type="radio" id="very-satisfied" name="satisfaction" value="Very satisfied" checked={formData.satisfaction === 'Very satisfied'} onChange={handleInputChange} />
                  <label htmlFor="very-satisfied"><i className="fas fa-smile-beam"></i> Very satisfied</label><br />
                  <input type="radio" id="satisfied" name="satisfaction" value="Satisfied" checked={formData.satisfaction === 'Satisfied'} onChange={handleInputChange} />
                  <label htmlFor="satisfied"><i className="fas fa-smile"></i> Satisfied</label><br />
                  <input type="radio" id="neutral" name="satisfaction" value="Neutral" checked={formData.satisfaction === 'Neutral'} onChange={handleInputChange} />
                  <label htmlFor="neutral"><i className="fas fa-meh"></i> Neutral</label><br />
                  <input type="radio" id="dissatisfied" name="satisfaction" value="Dissatisfied" checked={formData.satisfaction === 'Dissatisfied'} onChange={handleInputChange} />
                  <label htmlFor="dissatisfied"><i className="fas fa-frown"></i> Dissatisfied</label><br />
                  <input type="radio" id="very-dissatisfied" name="satisfaction" value="Very dissatisfied" checked={formData.satisfaction === 'Very dissatisfied'} onChange={handleInputChange} />
                  <label htmlFor="very-dissatisfied"><i className="fas fa-angry"></i> Very dissatisfied</label>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="form-group">
                <label htmlFor="usefulness"><b>2. Feature Usefulness </b><i className="fas fa-clipboard-list"></i></label>
                <p>Which features do you find most useful? (Select all that apply)</p>
                <div className="checkbox-group">
                  <input type="checkbox" id="upload-images" name="usefulness" value="Uploading images of plant leaves" checked={formData.usefulness.includes('Uploading images of plant leaves')} onChange={handleInputChange} />
                  <label htmlFor="upload-images"><i className="fas fa-image"></i> Uploading images of plant leaves</label><br />
                  <input type="checkbox" id="disease-predictions" name="usefulness" value="Receiving disease predictions with confidence levels" checked={formData.usefulness.includes('Receiving disease predictions with confidence levels')} onChange={handleInputChange} />
                  <label htmlFor="disease-predictions"><i className="fas fa-stethoscope"></i> Receiving disease predictions with confidence levels</label><br />
                  <input type="checkbox" id="detailed-information" name="usefulness" value="Getting cure suggestions for identified diseases" checked={formData.usefulness.includes('Getting cure suggestions for identified diseases')} onChange={handleInputChange} />
                  <label htmlFor="detailed-information"><i className="fas fa-prescription-bottle-alt"></i> Getting cure suggestions for identified diseases</label><br />
                  <input type="checkbox" id="detailed-information" name="usefulness" value="Viewing detailed information about identified diseases" checked={formData.usefulness.includes('Viewing detailed information about identified diseases')} onChange={handleInputChange} />
                  <label htmlFor="detailed-information"><i className="fas fa-info-circle"></i> Viewing detailed information about identified diseases</label><br />
                  <input type="checkbox" id="tips" name="usefulness" value="Accessing prediction history" checked={formData.usefulness.includes('Accessing prediction history')} onChange={handleInputChange} />
                  <label htmlFor="tips"><i className="fas fa-history"></i> Accessing prediction history</label>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="form-group">
                <label htmlFor="desiredFeatures"><b>3. Desired Features </b><i className="fas fa-lightbulb"></i></label>
                <p>What additional features would you like to see in the future? (Select all that apply)</p>
                <div className="checkbox-group">
                  <input type="checkbox" id="real-time-monitoring" name="desiredFeatures" value="Real-time diagnosis through live camera feed" checked={formData.desiredFeatures.includes('Real-time diagnosis through live camera feed')} onChange={handleInputChange} />
                  <label htmlFor="real-time-monitoring"><i className="fas fa-clock"></i> Real-time diagnosis through live camera feed</label><br />
                  <input type="checkbox" id="early-detection" name="desiredFeatures" value="Notification system for disease outbreaks" checked={formData.desiredFeatures.includes('Notification system for disease outbreaks')} onChange={handleInputChange} />
                  <label htmlFor="early-detection"><i className="fas fa-search"></i> Notification system for disease outbreaks</label><br />
                  <input type="checkbox" id="personalized-recommendations" name="desiredFeatures" value="Personalized recommendations based on specific plants and regions" checked={formData.desiredFeatures.includes('Personalized recommendations based on specific plants and regions')} onChange={handleInputChange} />
                  <label htmlFor="personalized-recommendations"><i className="fas fa-map-marker-alt"></i> Personalized recommendations based on specific plants and regions</label><br />
                  <input type="checkbox" id="community-support" name="desiredFeatures" value="Community support and discussion forums" checked={formData.desiredFeatures.includes('Community support and discussion forums')} onChange={handleInputChange} />
                  <label htmlFor="community-support"><i className="fas fa-users"></i> Community support and discussion forums</label>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="form-group">
                <label htmlFor="recommendation"><b>4. Likelihood of Recommendation </b><i className="fas fa-thumbs-up"></i></label>
                <p>How likely are you to recommend our plant disease detection system to others?</p>
                <div className="radio-group">
                  <input type="radio" id="very-likely" name="recommendation" value="Very likely" checked={formData.recommendation === 'Very likely'} onChange={handleInputChange} />
                  <label htmlFor="very-likely"><i className="fas fa-thumbs-up"></i> Very likely</label><br />
                  <input type="radio" id="likely" name="recommendation" value="Likely" checked={formData.recommendation === 'Likely'} onChange={handleInputChange} />
                  <label htmlFor="likely"><i className="fas fa-hand-paper"></i> Likely</label><br />
                  <input type="radio" id="neutral-recommendation" name="recommendation" value="Neutral" checked={formData.recommendation === 'Neutral'} onChange={handleInputChange} />
                  <label htmlFor="neutral-recommendation"><i className="fas fa-question-circle"></i> Neutral</label><br />
                  <input type="radio" id="unlikely" name="recommendation" value="Unlikely" checked={formData.recommendation === 'Unlikely'} onChange={handleInputChange} />
                  <label htmlFor="unlikely"><i className="fas fa-thumbs-down"></i> Unlikely</label><br />
                  <input type="radio" id="very-unlikely" name="recommendation" value="Very unlikely" checked={formData.recommendation === 'Very unlikely'} onChange={handleInputChange} />
                  <label htmlFor="very-unlikely"><i className="fas fa-ban"></i> Very unlikely</label>
                </div>
              </div>
            </div>

            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default UserSatisfactionSurvey;

