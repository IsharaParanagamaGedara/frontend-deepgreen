import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Register from '../components/Register';

const mock = new MockAdapter(axios);

describe('Register Component', () => {
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

  test('renders the Register component', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByTestId('register-title')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText(/Already have an account\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test('shows error when fields are empty and submit is clicked', async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.click(screen.getAllByText('Register')[1]);

    await waitFor(() => {
      expect(screen.getByText('All fields are required.')).toBeInTheDocument();
    });
  });

  test('shows password validation errors', async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'short' } });

    await waitFor(() => {
      expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'NoNumber!' } });

    await waitFor(() => {
      expect(screen.getByText('Password must contain at least one number')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'nonumberlower!' } });

    await waitFor(() => {
      expect(screen.getByText('Password must contain at least one uppercase letter')).toBeInTheDocument();
    });
  });

  test('registers successfully', async () => {
    mock.onPost('http://localhost:5000/auth/register').reply(200, {
      message: 'Registration successful',
    });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password1!' } });

    fireEvent.click(screen.getAllByText('Register')[1]);

    await waitFor(() => {
      expect(screen.queryByText('Registering...')).not.toBeInTheDocument();
    });

    // Check for navigation to login page
    expect(window.location.pathname).toBe('/login');
  });

  test('shows error message on registration failure', async () => {
    mock.onPost('http://localhost:5000/auth/register').reply(400, {
      error: 'Registration failed. Please try again.',
    });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password1!' } });

    fireEvent.click(screen.getAllByText('Register')[1]);

    await waitFor(() => {
      expect(screen.getByText('Registration failed. Please try again.')).toBeInTheDocument();
    });
  });
});
