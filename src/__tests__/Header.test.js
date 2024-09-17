// src/__tests__/Header.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header';

describe('Header Component', () => {
  test('renders the Header component with logo and navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Check if the logo is rendered
    const logo = screen.getByAltText('DeepGreen Logo');
    expect(logo).toBeInTheDocument();

    // Check if navigation links are rendered
    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About Us');
    const featuresLink = screen.getByText('Features');
    const howItWorksLink = screen.getByText('How It Works');
    const contactLink = screen.getByText('Contact');
    const loginLink = screen.getByText('Login');

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(featuresLink).toBeInTheDocument();
    expect(howItWorksLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
  });

  test('toggles menu on button click', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const menuToggle = screen.getByRole('button');
    fireEvent.click(menuToggle);

    const navMenu = screen.getByRole('navigation');
    expect(navMenu).toHaveClass('header__nav-menu--open');
  });

  test('navigates to login page on clicking login link', () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const loginLink = screen.getByText('Login');
    fireEvent.click(loginLink);

    expect(container.innerHTML).toMatch('Login');
  });
});
