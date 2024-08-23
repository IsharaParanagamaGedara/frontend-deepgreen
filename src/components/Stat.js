import React, { useEffect, useState } from 'react';
import '../assets/styles/Stat.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import deepgreenLogo from '../assets/images/deepgreen-icon.jpg';

import { Doughnut, Pie, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(BarElement, ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Stat = () => {
  const navigate = useNavigate();
  const [overview, setOverview] = useState({});
  const [statistics, setStatistics] = useState({});
  const [predictionsPerClass, setPredictionsPerClass] = useState({});
  const [predictionsOverTime, setPredictionsOverTime] = useState({});
  const [confidenceDistribution, setConfidenceDistribution] = useState({ bins: [], frequency: [] });

  useEffect(() => {
    fetchOverview();
    fetchStatistics(); // Fetch statistics
    fetchPredictionsPerClass();
    fetchPredictionsOverTime();
    fetchConfidenceDistribution();
  }, []);

  const fetchOverview = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/stat/overview/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setOverview(response.data);
    } catch (error) {
      console.error('Error fetching overview:', error);
    }
  };

  const fetchStatistics = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if token is missing
      return;
    }
    try {
      const response = await axios.get('http://localhost:5000/stat/statistics', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
      navigate('/login'); // Handle error and redirect to login
    }
  };

  const fetchPredictionsPerClass = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/stat/charts/number_of_predictions_per_class', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPredictionsPerClass(response.data);
    } catch (error) {
      console.error('Error fetching predictions per class:', error);
    }
  };

  const fetchPredictionsOverTime = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/stat/charts/predictions_over_time', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPredictionsOverTime(response.data);
    } catch (error) {
      console.error('Error fetching predictions over time:', error);
    }
  };

  const fetchConfidenceDistribution = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/stat/charts/confidence_percentage_distribution', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setConfidenceDistribution(response.data);
    } catch (error) {
      console.error('Error fetching confidence distribution:', error);
    }
  };

  const barChartData = {
    labels: predictionsPerClass.classes || [],
    datasets: [
      {
        label: 'Number of Predictions',
        data: predictionsPerClass.counts || [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const lineChartData = {
    labels: predictionsOverTime.dates || [],
    datasets: [
      {
        label: 'Predictions Over Time',
        data: predictionsOverTime.counts || [],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const histogramData = {
    labels: confidenceDistribution.bins || [],
    datasets: [
      {
        label: 'Confidence Percentage Distribution',
        data: confidenceDistribution.frequency || [],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  // Chart data for satisfaction
  const satisfactionData = {
    labels: Object.keys(statistics.satisfaction || {}),
    datasets: [{
      data: Object.values(statistics.satisfaction || {}),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }],
  };

  // Chart data for recommendation
  const recommendationData = {
    labels: Object.keys(statistics.recommendation || {}),
    datasets: [{
      data: Object.values(statistics.recommendation || {}),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }],
  };

  // Chart data for usefulness
  const usefulnessData = {
    labels: Object.keys(statistics.usefulness || {}),
    datasets: [{
      data: Object.values(statistics.usefulness || {}).map(value => parseFloat(value.toFixed(2))),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
    }],
  };

  // Chart data for desired features
  const desiredFeaturesData = {
    labels: Object.keys(statistics.desiredFeatures || {}),
    datasets: [{
      data: Object.values(statistics.desiredFeatures || {}).map(value => parseFloat(value.toFixed(2))),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
    }],
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
          <li className="nav-item active">
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
          <h1>Overall Statistics</h1>
        </header>

        <section className="content">
          <div className="overview">
            <h2>DeepGreen's Prediction Overview</h2>
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

          

          <div className="sstat-container">
            <h2>Your Prediction Statistics</h2>
            <div className="sstat-cards">
              <div className="sstat-card">
                <h3>Number of Predictions per Disease Class</h3>
                <Bar data={barChartData} />
              </div>
              <div className="sstat-card">
                <h3>Predictions Over Time</h3>
                <Line data={lineChartData} />
              </div>
              <div className="sstat-card">
                <h3>Confidence Percentage Distribution</h3>
                <Bar data={histogramData} />
              </div>
            </div>
          </div>

          {/* User Satisfaction */}
          <div className="statistics-container">
            <h2>Overall User Satisfaction</h2>
            <div className="statistics-cards">
              <div className="statistics-card">
                <h3>Satisfaction</h3>
                <Doughnut data={satisfactionData} />
              </div>
              <div className="statistics-card">
                <h3>Recommendation</h3>
                <Doughnut data={recommendationData} />
              </div>
              <div className="statistics-card">
                <h3>Desired Features</h3>
                <Pie data={desiredFeaturesData} />
              </div>
              <div className="statistics-card">
                <h3>Usefulness</h3>
                <Pie data={usefulnessData} />
              </div>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
};

export default Stat;

