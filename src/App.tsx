import { ChangeEvent, FormEvent, useState } from 'react';
import './App.css';
import { formDataSchema, mappedMonths } from './schemas';
import { z } from 'zod';
import Form from './components/Form';
import { FormValues } from './components/Form';
import { Button } from '@/components/ui/button';
import { ShadForm } from './components/ShadForm';

interface FormErrors {
  [key: string]: string | undefined;
}

function App() {
  const [formData, setFormData] = useState<FormValues>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    monthofBirth: 'january',
    playGames: false,
    favoriteGame: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [sucessMessage, setSuccessMessage] = useState('');

  const [showZodOnly, setShowZodOnly] = useState<boolean>(true);
  const [showRHF, setShowRHF] = useState<boolean>(false);
  const [showShad, setShowShad] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData({ ...formData, [name]: inputValue });

    // Clear the error message for the corresponding field when it changes
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  const monthOptions = Object.entries(mappedMonths).map(([value, label]) => (
    <option value={value} key={value}>
      {label}
    </option>
  ));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate the form data using the Zod schema
      const validatedData = formDataSchema.parse(formData) as FormValues;
      console.log('Form data is valid:', validatedData);
      // Perform form submission or other actions

      // Reset errors if successful
      setFormErrors({});
      setSuccessMessage('Form submitted successfully');
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Form validation failed:', error.errors);
        // Update the formErrors state with validation errors
        setFormErrors(
          error.errors.reduce((acc: FormErrors, current) => {
            // Type assertion to avoid TypeScript error
            const key = current.path[0] as keyof FormErrors;
            acc[key] = current.message;
            return acc;
          }, {})
        );
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <Button
          onClick={() => {
            setShowZodOnly(true);
            setShowRHF(false);
            setShowShad(false);
          }}
        >
          Show Zod only
        </Button>
        <Button
          onClick={() => {
            setShowZodOnly(false);
            setShowRHF(true);
            setShowShad(false);
          }}
        >
          Show Zod With react Hook form
        </Button>
        <Button
          onClick={() => {
            setShowZodOnly(false);
            setShowRHF(false);
            setShowShad(true);
          }}
        >
          Show ShadCN
        </Button>
      </div>
      {showZodOnly && (
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </label>
          {formErrors.username && (
            <span style={{ color: 'red' }}>{formErrors.username}</span>
          )}
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          {formErrors.email && (
            <span style={{ color: 'red' }}>{formErrors.email}</span>
          )}
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
          {formErrors.password && (
            <span style={{ color: 'red' }}>{formErrors.password}</span>
          )}
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </label>
          {formErrors.confirmPassword && (
            <span style={{ color: 'red' }}>{formErrors.confirmPassword}</span>
          )}

          <label htmlFor="monthOfBirth">
            Month of birth:
            <select name="" id="monthOfBirth">
              {monthOptions}
            </select>
          </label>

          <label>
            Do you play games?
            <input
              type="checkbox"
              name="playGames"
              checked={formData.playGames}
              onChange={handleInputChange}
            />
          </label>

          {formData.playGames && (
            <>
              <label>
                What is your favourite game?
                <input
                  type="text"
                  name="favoriteGame"
                  value={formData.favoriteGame}
                  onChange={handleInputChange}
                />
              </label>
              {formErrors.favoriteGame && (
                <span style={{ color: 'red' }}>{formErrors.favoriteGame}</span>
              )}
            </>
          )}

          <button type="submit">Submit</button>
          {sucessMessage && <h1>{sucessMessage}</h1>}
        </form>
      )}
      {showRHF && <Form />}
      {showShad && <ShadForm />}
    </>
  );
}

export default App;
