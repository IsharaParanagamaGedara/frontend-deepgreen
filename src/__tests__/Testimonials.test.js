// src/__tests__/Testimonials.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Testimonials from '../components/Testimonials';

describe('Testimonials Component', () => {
  test('renders the Testimonials component with heading and testimonials', () => {
    render(<Testimonials />);

    // Check if the main heading is rendered
    const mainHeading = screen.getByText('Testimonials');
    expect(mainHeading).toBeInTheDocument();

    // Check if all testimonials are rendered
    const testimonialQuotes = [
      "DeepGreen has been a game-changer for our farm. The disease detection is spot on!",
      "Thanks to DeepGreen, we have saved countless crops from disease.",
      "The accuracy and speed of DeepGreen's predictions are impressive!"
    ];

    testimonialQuotes.forEach((quote) => {
      const testimonialQuote = screen.getByText(quote);
      expect(testimonialQuote).toBeInTheDocument();
    });

    const testimonialNames = [
      "Gamini Dissanayake",
      "Dinesh Priyantha",
      "Nuwan Herath"
    ];

    testimonialNames.forEach((name) => {
      const testimonialName = screen.getByText(name);
      expect(testimonialName).toBeInTheDocument();
    });

    const testimonialImages = [
      'testimonial1.jpg',
      'testimonial2.jpg',
      'testimonial3.jpg'
    ];

    testimonialImages.forEach((image, index) => {
      const testimonialImage = screen.getByAltText(testimonialNames[index]);
      expect(testimonialImage).toBeInTheDocument();
    });
  });
});
