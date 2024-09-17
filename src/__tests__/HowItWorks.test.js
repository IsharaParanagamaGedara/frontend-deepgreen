// src/__tests__/HowItWorks.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import HowItWorks from '../components/HowItWorks';

describe('HowItWorks Component', () => {
  test('renders the HowItWorks component with heading and steps', () => {
    render(<HowItWorks />);

    // Check if the main heading is rendered
    const mainHeading = screen.getByText('How It Works');
    expect(mainHeading).toBeInTheDocument();

    // Check if all step items are rendered
    const stepTitles = [
      'Step 1',
      'Step 2',
      'Step 3',
      'Step 4'
    ];

    stepTitles.forEach((title) => {
      const stepTitle = screen.getByText(title);
      expect(stepTitle).toBeInTheDocument();
    });

    const stepDescriptions = [
      'Register or log in to your account.',
      'Upload an image of the plant leaf.',
      'Get a detailed prediction with confidence percentage.',
      'View personalized cure suggestions.'
    ];

    stepDescriptions.forEach((description) => {
      const stepDescription = screen.getByText(description);
      expect(stepDescription).toBeInTheDocument();
    });

    const stepImages = [
      'step1.jpg',
      'step2.jpg',
      'step3.jpg',
      'step4.jpg'
    ];

    stepImages.forEach((image, index) => {
      const stepImage = screen.getByAltText(stepTitles[index]);
      expect(stepImage).toBeInTheDocument();
    });
  });
});
