import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NakedForm from './NakedForm';

describe('NakedForm Component', () => {
  it('renders the form with input fields and a submit button', () => {
    render(<NakedForm />);

    // Check if the form elements are rendered
    expect(screen.getByText(/username/i)).toBeInTheDocument();
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/do you play games/i)).toBeInTheDocument();
    const passwordInputFields = screen.getAllByText(/password/i);
    expect(passwordInputFields).toHaveLength(2);
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('validates form and displays errors on submit', () => {
    render(<NakedForm />);

    // Trigger form submission without filling in any fields
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Check if error messages are displayed
    expect(
      screen.getByText(/Username has to be at least 4 characters/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Please enter an email adress/i)
    ).toBeInTheDocument();
  });

  it('validates form and displays errors when playing games without entering a favorite game', () => {
    render(<NakedForm />);

    // Check the playGames checkbox
    fireEvent.click(screen.getByLabelText(/do you play games/i));

    // Trigger form submission without entering a favorite game
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Check if error message for favoriteGame is displayed
    expect(
      screen.getByText(/Please provide a favorite game/i)
    ).toBeInTheDocument();
  });

  it('submits the form successfully with valid data', () => {
    render(<NakedForm />);

    // Fill in valid data
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'JohnDoe' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.click(screen.getByLabelText(/do you play games/i));
    fireEvent.change(screen.getByLabelText(/what is your favourite game/i), {
      target: { value: 'Chess' },
    });

    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: '1234' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password:'), {
      target: { value: '1234' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(
      screen.getByText(/form submitted successfully/i)
    ).toBeInTheDocument();
  });
});
