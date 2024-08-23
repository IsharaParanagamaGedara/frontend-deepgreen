import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AIDetector from './components/AIDetector';
import PlantCare from './components/PlantCare';
import History from './components/History';
import Profile from './components/Profile';
import Help from './components/Help';
import UserSatisfactionSurvey from './components/UserSatisfactionSurvey';
import StrawberryCare from './components/StrawberryCare';
import PotatoCare from './components/PotatoCare';
import CornCare from './components/CornCare';
import Stat from './components/Stat';

const App = () => {
  const location = useLocation();

  // Function to check if the current route is a special route (Dashboard, AI Detector, Plant Care, History, Profile, Help, Stat, UserSatisfactionSurvey, StrawberryCare, PotatoCare and CornCare)
  const isSpecialRoute = [
    '/dashboard',
    '/ai-detector',
    '/plant-care',
    '/history',
    '/profile',
    '/help',
    '/feedback',
    '/strawberry-care',
    '/potato-care',
    '/corn-care',
    '/stat',
  ].includes(location.pathname);

  return (
    <>
      {!isSpecialRoute && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-detector" element={<AIDetector />} />
        <Route path="/plant-care" element={<PlantCare />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/help" element={<Help />} />
        <Route path="/feedback" element={<UserSatisfactionSurvey />} />
        <Route path="/strawberry-care" element={<StrawberryCare />} />
        <Route path="/potato-care" element={<PotatoCare />} />
        <Route path="/corn-care" element={<CornCare />} />
        <Route path="/stat" element={<Stat />} />
      </Routes>
      {!isSpecialRoute && <Footer />}
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
