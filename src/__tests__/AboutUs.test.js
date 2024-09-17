// src/__tests__/AboutUs.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutUs from '../components/About';

describe('AboutUs Component', () => {
  test('renders the AboutUs component with heading and content sections', () => {
    render(<AboutUs />);

    // Check if the main heading is rendered
    const mainHeading = screen.getByText('About Us');
    expect(mainHeading).toBeInTheDocument();

    // Check if the company story section is rendered
    const companyStoryHeading = screen.getByText('Our Story');
    const companyStoryContent = screen.getByText(/DeepGreen started as a small initiative/i);
    expect(companyStoryHeading).toBeInTheDocument();
    expect(companyStoryContent).toBeInTheDocument();

    // Check if the whom we serve section is rendered
    const whomWeServeHeading = screen.getByText('Whom We Serve');
    const whomWeServeContent = screen.getByText(/We serve farmers, gardeners, and agricultural enthusiasts/i);
    expect(whomWeServeHeading).toBeInTheDocument();
    expect(whomWeServeContent).toBeInTheDocument();

    // Check if the mission statement card is rendered
    const missionHeading = screen.getByText('Mission Statement');
    const missionContent = screen.getByText(/Our mission is to empower individuals/i);
    expect(missionHeading).toBeInTheDocument();
    expect(missionContent).toBeInTheDocument();

    // Check if the vision statement card is rendered
    const visionHeading = screen.getByText('Vision Statement');
    const visionContent = screen.getByText(/Our vision is to be the leading provider/i);
    expect(visionHeading).toBeInTheDocument();
    expect(visionContent).toBeInTheDocument();
  });
});
