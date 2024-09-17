// src/__tests__/Footer.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer Component', () => {
  test('renders the Footer component with links and copyright', () => {
    render(<Footer />);

    // Check if the links are rendered
    const privacyLink = screen.getByText('Privacy Policy');
    const termsLink = screen.getByText('Terms of Service');
    const faqLink = screen.getByText('FAQs');

    expect(privacyLink).toBeInTheDocument();
    expect(termsLink).toBeInTheDocument();
    expect(faqLink).toBeInTheDocument();

    // Check if the copyright text is rendered
    const copyrightText = screen.getByText('© 2024 DeepGreen. All rights reserved.');
    expect(copyrightText).toBeInTheDocument();
  });

  test('scrolls to top when the go-to-top icon is clicked', () => {
    render(<Footer />);

    // Mock the scrollTo function
    window.scrollTo = jest.fn();

    // Click the go-to-top icon
    const goToTopIcon = screen.getByTestId('go-to-top');
    fireEvent.click(goToTopIcon);

    // Check if the scrollTo function was called with the correct arguments
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  test('renders the FontAwesome arrow-up icon correctly', () => {
    render(<Footer />);

    // Check if the arrow-up icon is rendered
    const arrowUpIcon = screen.getByRole('img', { hidden: true });
    expect(arrowUpIcon).toBeInTheDocument();
  });
});
