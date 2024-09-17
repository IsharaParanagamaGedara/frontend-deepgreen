// src/__tests__/Contact.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../components/Contact';

describe('Contact Component', () => {
  test('renders the Contact component with heading and contact information', () => {
    render(<Contact />);

    // Check if the main heading is rendered
    const mainHeading = screen.getByText('Contact Us');
    expect(mainHeading).toBeInTheDocument();

    // Check if the contact information is rendered
    const contactInfoText = screen.getByText('Contact us for questions, technical assistance, or collaboration opportunities via the contact information provided.');
    expect(contactInfoText).toBeInTheDocument();

    // Check if the phone number is rendered
    const phoneNumber = screen.getByText('(031) 222-8888');
    expect(phoneNumber).toBeInTheDocument();

    // Check if the email address is rendered
    const emailAddress = screen.getByText('info@deepgreen.com');
    expect(emailAddress).toBeInTheDocument();

    // Check if the address is rendered
    const address = screen.getByText('153 Minuwangoda Rd., Negombo, 11500');
    expect(address).toBeInTheDocument();
  });

  test('renders the FontAwesome icons correctly', () => {
    render(<Contact />);

    // Check if the phone icon is rendered
    const phoneIcon = screen.getByTestId('phone-icon');
    expect(phoneIcon).toBeInTheDocument();

    // Check if the envelope icon is rendered
    const envelopeIcon = screen.getByTestId('envelope-icon');
    expect(envelopeIcon).toBeInTheDocument();

    // Check if the map marker icon is rendered
    const mapMarkerIcon = screen.getByTestId('map-marker-icon');
    expect(mapMarkerIcon).toBeInTheDocument();
  });
});
