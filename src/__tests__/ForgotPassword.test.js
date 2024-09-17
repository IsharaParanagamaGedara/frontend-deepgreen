import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ForgotPassword from '../components/ForgotPassword';

const mock = new MockAdapter(axios);

describe('ForgotPassword Component', () => {
  let originalLog;
  let originalError;

  beforeAll(() => {
    originalLog = console.log;
    originalError = console.error;
    console.log = jest.fn();
    console.error = jest.fn();
  });

  afterAll(() => {
    console.log = originalLog;
    console.error = originalError;
  });

  afterEach(() => {
    mock.reset();
  });

  test('renders the ForgotPassword component', () => {
    render(<ForgotPassword />);

    expect(screen.getByTestId('forgot-password-title')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  test('shows error when email is empty and submit is clicked', async () => {
    render(<ForgotPassword />);

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('auth-error')).toHaveTextContent('Email is required.');
    });
  });

  test('shows error message when email is not found', async () => {
    mock.onPost('http://localhost:5000/auth/forgot-password').reply(404);

    render(<ForgotPassword />);

    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john.doe@example.com' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('auth-error')).toHaveTextContent('Email not found. Please try again.');
    });
  });

  test('shows success message when email is found', async () => {
    mock.onPost('http://localhost:5000/auth/forgot-password').reply(200, {
      message: 'Password reset link sent to your email.',
    });

    render(<ForgotPassword />);

    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john.doe@example.com' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('auth-message')).toHaveTextContent('Password reset link sent to your email.');
    });
  });
});
