import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/Profile.css';
import deepgreenLogo from '../assets/images/deepgreen-icon.jpg'; // Import the logo image
import userProfileImage from '../assets/images/user-profile.jpg'; // Import the user profile image

const Profile = () => {
  const [profile, setProfile] = useState({ first_name: '', last_name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/profile/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.put('http://localhost:5000/profile/update_profile', {
        first_name: profile.first_name,
        last_name: profile.last_name
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
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
          <li className="nav-item"><a href="#" onClick={() => navigate('/dashboard')}><i className="fas fa-tachometer-alt nav-icon"></i><span className="nav-text">Dashboard</span></a></li>
          <li className="nav-item"><a href="#" onClick={() => navigate('/ai-detector')}><i className="fas fa-leaf nav-icon"></i><span className="nav-text">AI Detector</span></a></li>
          <li className="nav-item"><a href="#" onClick={() => navigate('/plant-care')}><i className="fas fa-seedling nav-icon"></i><span className="nav-text">Plant Care</span></a></li>
          <li className="nav-item"><a href="#" onClick={() => navigate('/history')}><i className="fas fa-history nav-icon"></i><span className="nav-text">History</span></a></li>
          <li className="nav-item active"><a href="#"><i className="fas fa-user nav-icon"></i><span className="nav-text">Profile</span></a></li>
          <li className="nav-item"><a href="#" onClick={() => navigate('/stat')}><i className="fas fa-poll nav-icon"></i><span className="nav-text">Statistics</span></a></li>
          <li className="nav-item"><a href="#" onClick={() => navigate('/help')}><i className="fas fa-exclamation-circle nav-icon"></i><span className="nav-text">Help</span></a></li>
        </ul>
      </nav>

      <main>
        <header>
          <h1>User Profile</h1>
        </header>
        <section className="content">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {error && <p className="error-message">{error}</p>}
              <div className="profile-image-section">
                <div className="profile-image-container">
                  <img src={userProfileImage} alt="Profile" className="profile-image" />
                  <div className="profile-message">
                    <h3>Hello, {profile.first_name} {profile.last_name}!</h3>
                    <p>{profile.email}</p>
                  </div>
                </div>
              </div>
              <div className="profile-info-section">
                <h2>Update Profile Information</h2>
                <form id="profile-form" onSubmit={handleSubmit}>
                  <label htmlFor="first_name">First Name:</label>
                  <input type="text" id="first_name" name="first_name" value={profile.first_name} onChange={handleChange} required />

                  <label htmlFor="last_name">Last Name:</label>
                  <input type="text" id="last_name" name="last_name" value={profile.last_name} onChange={handleChange} required />

                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" value={profile.email} readOnly />

                  <button type="submit" className="update-btn" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Profile'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Profile;
