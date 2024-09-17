import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ResetPassword from '../components/ResetPassword';

const mock = new MockAdapter(axios);

describe('ResetPassword Component', () => {
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

  const renderComponent = () => {
    render(
      <MemoryRouter initialEntries={['/reset-password/token123']}>
        <Routes>
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('renders the ResetPassword component', () => {
    renderComponent();

    expect(screen.getByTestId('reset-password-title')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-password-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  test('shows error when fields are empty and submit is clicked', async () => {
    renderComponent();

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('auth-error')).toHaveTextContent('All fields are required.');
    });
  });

  test('shows password validation error', async () => {
    renderComponent();

    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'short' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('password-error')).toHaveTextContent('Password must be at least 8 characters long');
    });
  });

  test('shows error when passwords do not match', async () => {
    renderComponent();

    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'Password1!' } });
    fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'Password2!' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('auth-error')).toHaveTextContent('Passwords do not match');
    });
  });

  test('shows success message when password is reset successfully', async () => {
    mock.onPost('http://localhost:5000/auth/reset-password/token123').reply(200, {
      message: 'Password reset successfully.',
    });

    renderComponent();

    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'Password1!' } });
    fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'Password1!' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('auth-message')).toHaveTextContent('Password reset successfully.');
    });
  });

  test('shows error message when password reset fails', async () => {
    mock.onPost('http://localhost:5000/auth/reset-password/token123').reply(400, {
      error: 'Failed to reset password. Please try again.',
    });

    renderComponent();

    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'Password1!' } });
    fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'Password1!' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('auth-error')).toHaveTextContent('Failed to reset password. Please try again.');
    });
  });
});
