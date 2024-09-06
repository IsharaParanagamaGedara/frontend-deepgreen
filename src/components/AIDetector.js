import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import '../assets/styles/AIDetector.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import deepgreenLogo from '../assets/images/deepgreen-icon.jpg';

const AIDetector = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      setError('The file is not accepted for upload');
      setSelectedFile(null);
      return;
    }

    const file = acceptedFiles[0];
    
    if (file && !file.type.startsWith('image/')) {
      setError('The file is not an image');
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setError('');
    setSuccessMessage('');
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 1,
    onDropRejected: (fileRejections) => {
      if (fileRejections.length > 0) {
        setError('The file is not accepted for upload');
      }
    }
  });

  const handlePredict = async () => {
    if (!selectedFile) {
      alert('Please upload a file first.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const uploadResponse = await axios.post('http://localhost:5000/image/upload_image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setSuccessMessage(uploadResponse.data.message);

      const { image_id } = uploadResponse.data;

      const predictionResponse = await axios.get(`http://localhost:5000/prediction/predict_disease/${image_id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const { predicted_class, confidence_percentage, image_url } = predictionResponse.data;

      setPrediction({
        diseaseName: predicted_class,
        confidenceLevel: `${confidence_percentage}%`,
        imageUrl: `http://localhost:5000${image_url}`
      });
    } catch (error) {
      console.error('Prediction error:', error);
      setError('An error occurred while predicting the disease.');
    } finally {
      setLoading(false);
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
          <li className="nav-item">
            <a href="#" onClick={() => navigate('/dashboard')}>
              <i className="fas fa-tachometer-alt nav-icon"></i>
              <span className="nav-text">Dashboard</span>
            </a>
          </li>
          <li className="nav-item active">
            <a href="#">
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
        </ul>
      </nav>

      <main>
        <header>
          <h1>AI Detector</h1>
        </header>

        <section className="content">
          <div className="upload-section">
            <h2>Upload Plant Leaf Image</h2>
            <div {...getRootProps({ className: 'upload-container' })}>
              <input {...getInputProps()} />
              <div className={`upload-box ${isDragActive ? 'active' : ''}`}>
                <div className="upload-icon">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <p>{isDragActive ? 'Drop the files here...' : 'Drag & Drop your image here or click to select'}</p>
                </div>
              </div>
            </div>
            <button className="predict-btn" onClick={handlePredict} disabled={loading}>
              {loading ? 'Predicting...' : 'Predict'}
            </button>
            <p className="friendly-message">Please upload a clear image of the plant leaf for accurate disease detection.</p>
          </div>

          {error && <p className="error-message">{error}</p>}

          {successMessage && <p className="success-message">{successMessage}</p>}

          {prediction && (
            <div className="prediction-result">
              <h2>Prediction Result</h2>
              <div className="result-container">
                <img src={prediction.imageUrl} alt="Uploaded Image" id="uploaded-image" />
                <div className="result-details">
                  <p>Predicted Disease: <span className="disease-name">{prediction.diseaseName}</span></p>
                  <p>Confidence Level: <span className="confidence-level">{prediction.confidenceLevel}</span></p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AIDetector;
