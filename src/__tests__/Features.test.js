// src/__tests__/Features.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Features from '../components/Features';

describe('Features Component', () => {
  test('renders the Features component with heading and feature items', () => {
    render(<Features />);

    // Check if the main heading is rendered
    const mainHeading = screen.getByText('Features');
    expect(mainHeading).toBeInTheDocument();

    // Check if all feature items are rendered
    const featureTitles = [
      'Real-time Disease Detection',
      'Accurate Predictions',
      'User-friendly Interface'
    ];

    featureTitles.forEach((title) => {
      const featureTitle = screen.getByText(title);
      expect(featureTitle).toBeInTheDocument();
    });

    const featureDescriptions = [
      'Instantly identify plant diseases using advanced AI technology.',
      'Receive precise predictions to help you take timely action.',
      'Easily upload images and receive detailed reports.'
    ];

    featureDescriptions.forEach((description) => {
      const featureDescription = screen.getByText(description);
      expect(featureDescription).toBeInTheDocument();
    });

    const featureImages = [
      'feature1.jpg',
      'feature2.jpg',
      'feature3.jpg'
    ];

    featureImages.forEach((image) => {
      const featureImage = screen.getByAltText(featureTitles[featureImages.indexOf(image)]);
      expect(featureImage).toBeInTheDocument();
    });
  });
});
