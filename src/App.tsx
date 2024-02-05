import { ChangeEvent, FormEvent, useState } from 'react';
import './App.css';
import { formDataSchema } from './schemas';
import { z } from 'zod';
import Form from './components/Form';

export type FormData = {
  username: string;
  email: string;
  playGames: boolean;
  favoriteGame: string;
};

interface FormErrors {
  [key: string]: string | undefined;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    playGames: false,
    favoriteGame: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const [showZodOnly, setShowZodOnly] = useState<boolean>(true);
  const [showRHF, setShowRHF] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData({ ...formData, [name]: inputValue });

    // Clear the error message for the corresponding field when it changes
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate the form data using the Zod schema
      const validatedData = formDataSchema.parse(formData) as FormData;
      console.log('Form data is valid:', validatedData);
      // Perform form submission or other actions

      // Reset errors if successful
      setFormErrors({});
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
        <button
          onClick={() => {
            setShowZodOnly(true);
            setShowRHF(false);
          }}
        >
          Show Zod only
        </button>
        <button
          onClick={() => {
            setShowZodOnly(false);
            setShowRHF(true);
          }}
        >
          Show Zod With react Hook form
        </button>
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
        </form>
      )}
      {showRHF && <Form />}
    </>
  );
}

export default App;
