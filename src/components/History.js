import React, { useEffect, useState } from 'react';
import '../assets/styles/History.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveAs } from 'file-saver';
import deepgreenLogo from '../assets/images/deepgreen-icon.jpg';

const History = () => {
  const navigate = useNavigate();
  const [predictions, setPredictions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredPredictions, setFilteredPredictions] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(''); // Add state for error message

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async (start_date, end_date) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:5000/history/view_prediction_history', {
        headers: { Authorization: `Bearer ${token}` },
        params: { start_date, end_date },
      });
      setPredictions(response.data);
      setFilteredPredictions(response.data);
      setError(''); // Clear any error when data is successfully fetched
    } catch (error) {
      console.error('Error fetching prediction history:', error);
      setError('Error fetching prediction history.');
    }
  };

  const handleFilter = () => {
    if (startDate === '' && endDate === '') {
      setFilteredPredictions(predictions);
    } else {
      fetchHistory(startDate, endDate);
    }
  };

  const downloadReport = () => {
    if (filteredPredictions.length === 0) {
      setError('No data available to download.');
      return;
    }

    const csvRows = [
      ['Image', 'Predicted Class', 'Confidence Level', 'Date'],
      ...filteredPredictions.map(prediction => [
        prediction.image_url,
        prediction.predicted_class,
        `${prediction.confidence_percentage}%`,
        new Date(prediction.prediction_date).toLocaleDateString()
      ])
    ];

    const csvContent = csvRows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'prediction_history.csv');
    setSuccessMessage('CSV Report Downloaded Successfully');
    setError('');  // Clear any previous error message
  };

  const downloadPDFReport = async () => {
    if (filteredPredictions.length === 0) {
      setError('No data available to download.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:5000/history/download_prediction_history_pdf', {
        headers: { Authorization: `Bearer ${token}` },
        params: { start_date: startDate, end_date: endDate },
        responseType: 'blob',
      });
      saveAs(response.data, 'prediction_history.pdf');
      setSuccessMessage('PDF Report Downloaded Successfully');
      setError('');  // Clear any previous error message
    } catch (error) {
      console.error('Error downloading PDF report:', error);
      setError('Error downloading PDF report.');
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
          <li className="nav-item active"><a href="#"><i className="fas fa-history nav-icon"></i><span className="nav-text">History</span></a></li>
          <li className="nav-item"><a href="#" onClick={() => navigate('/profile')}><i className="fas fa-user nav-icon"></i><span className="nav-text">Profile</span></a></li>
          <li className="nav-item"><a href="#" onClick={() => navigate('/stat')}><i className="fas fa-poll nav-icon"></i><span className="nav-text">Statistics</span></a></li>
          <li className="nav-item"><a href="#" onClick={() => navigate('/help')}><i className="fas fa-exclamation-circle nav-icon"></i><span className="nav-text">Help</span></a></li>
        </ul>
      </nav>

      <main>
        <header>
          <h1>Prediction History</h1>
        </header>

        <section className="content">
          <div className="filter-section">
            <label htmlFor="filter-start-date">Start Date:</label>
            <input type="date" id="filter-start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <label htmlFor="filter-end-date">End Date:</label>
            <input type="date" id="filter-end-date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <button id="filter-report" className="filter-btn" onClick={handleFilter}><i className="fas fa-filter"></i> Apply Filters</button>
            <button id="download-report" className="download-btn" onClick={downloadReport}><i className="fas fa-download"></i> Download CSV</button>
            <button id="download-pdf-report" className="download-btn" onClick={downloadPDFReport}><i className="fas fa-download"></i> Download PDF</button>
          </div>

          {error && <div className="error-message">{error}</div>} {/* Display error message */}
          {successMessage && <div className="success-message">{successMessage}</div>} {/* Display success message */}

          <div className="history-section">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Predicted Class</th>
                  <th>Confidence Level</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredPredictions.map(prediction => (
                  <tr key={prediction.id}>
                    <td><img src={prediction.image_url} alt="Plant" /></td>
                    <td>{prediction.predicted_class}</td>
                    <td>{prediction.confidence_percentage}%</td>
                    <td>{new Date(prediction.prediction_date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default History;
