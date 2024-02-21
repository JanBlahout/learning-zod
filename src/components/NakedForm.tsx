import { ChangeEvent, FormEvent, useState } from 'react';
import { FormValues } from './Form';
import { z } from 'zod';
import { formDataSchema, mappedMonths } from '../schemas';

interface FormErrors {
  [key: string]: string | undefined;
}

export const monthOptions = Object.entries(mappedMonths).map(
  ([value, label]) => (
    <option value={value} key={value}>
      {label}
    </option>
  )
);

function NakedForm() {
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState<FormValues>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    monthofBirth: 'january',
    playGames: false,
    favoriteGame: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData({ ...formData, [name]: inputValue });

    // Clear the error message for the corresponding field when it changes
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  const handleMonthOfBirthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      monthofBirth: value as keyof typeof mappedMonths,
    });
  };

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
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <div className="mb-4">
        <label className="block mb-2" htmlFor="username">
          Username:
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 w-full rounded-sm"
        />
        {formErrors.username && (
          <span className="text-red-500">{formErrors.username}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="email">
          Email:
        </label>
        <input
          type="text"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 w-full rounded-sm"
        />
        {formErrors.email && (
          <span className="text-red-500">{formErrors.email}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 w-full rounded-sm"
        />
        {formErrors.password && (
          <span className="text-red-500">{formErrors.password}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="confirmPassword">
          Confirm Password:
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 w-full rounded-sm"
        />
        {formErrors.confirmPassword && (
          <span className="text-red-500">{formErrors.confirmPassword}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="monthOfBirth">
          Month of birth:
        </label>
        <select
          name="monthOfBirth"
          id="monthOfBirth"
          value={formData.monthofBirth}
          onChange={(e) => handleMonthOfBirthChange(e)}
          className="border border-gray-300 p-2 w-full rounded-sm"
        >
          {monthOptions}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="playGames">
          Do you play games?
        </label>
        <input
          type="checkbox"
          name="playGames"
          id="playGames"
          checked={formData.playGames}
          onChange={handleInputChange}
          className="mr-2"
        />
      </div>
      {formData.playGames && (
        <div className="mb-4">
          <label className="block mb-2" htmlFor="favoriteGame">
            What is your favourite game?
          </label>
          <input
            type="text"
            name="favoriteGame"
            id="favoriteGame"
            value={formData.favoriteGame}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded-sm"
          />
          {formErrors.favoriteGame && (
            <span className="text-red-500">{formErrors.favoriteGame}</span>
          )}
        </div>
      )}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
      {successMessage && <h1>{successMessage}</h1>}
    </form>
  );
}

export default NakedForm;
