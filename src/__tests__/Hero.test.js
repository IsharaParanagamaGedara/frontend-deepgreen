// src/__tests__/Hero.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Hero from '../components/Hero';

describe('Hero Component', () => {
  test('renders the hero section with text and images', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    // Check if the hero text is rendered
    const heading = screen.getByText(/Revolutionize Plant Care with Real-Time Disease Detection/i);
    const description = screen.getByText(/DeepGreen helps you diagnose plant diseases instantly and provides effective cure suggestions./i);

    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();

    // Check if the CTA button is rendered
    const ctaButton = screen.getByText(/Get Started/i);
    expect(ctaButton).toBeInTheDocument();

    // Check if the images are rendered
    const strawberryImage = screen.getByAltText('Strawberry Plant');
    const potatoImage = screen.getByAltText('Potato Plant');
    const cornImage = screen.getByAltText('Corn Plant');

    expect(strawberryImage).toBeInTheDocument();
    expect(potatoImage).toBeInTheDocument();
    expect(cornImage).toBeInTheDocument();
  });

  test('navigates to register page on clicking Get Started button', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    const ctaButton = screen.getByText(/Get Started/i);
    expect(ctaButton.closest('a')).toHaveAttribute('href', '/register');
  });
});
