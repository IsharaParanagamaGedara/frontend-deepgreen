import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Login from '../components/Login';

const mock = new MockAdapter(axios);

describe('Login Component', () => {
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

  test('renders the Login component', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByTestId('login-title')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  });

  test('shows error when fields are empty and submit is clicked', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(screen.getByTestId('auth-error')).toHaveTextContent('All fields are required.');
    });
  });

  test('shows error message on invalid credentials', async () => {
    mock.onPost('http://localhost:5000/auth/login').reply(401);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'wrongpassword' } });

    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(screen.getByTestId('auth-error')).toHaveTextContent('Invalid credentials. Please try again.');
    });
  });

  test('logs in successfully with valid credentials', async () => {
    mock.onPost('http://localhost:5000/auth/login').reply(200, {
      token: 'fake-jwt-token',
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'Password1!' } });

    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('fake-jwt-token');
      expect(window.location.pathname).toBe('/dashboard');
    });
  });
});
