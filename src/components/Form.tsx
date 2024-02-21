import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formDataSchema } from '../schemas';
import { z } from 'zod';
import { monthOptions } from './NakedForm';

export type FormValues = z.infer<typeof formDataSchema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      username: '',
      email: 'email@email.com',
      playGames: true,
      favoriteGame: '',
      monthofBirth: 'january',
    },
  });

  const watchPlayGames = watch('playGames');

  return (
    <form
      onSubmit={handleSubmit((d: FormValues) => console.log(d))}
      className="max-w-md mx-auto mt-8 p-4 bg-gray-200 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label htmlFor="username" className="block mb-2 text-gray-700">
          Username:
          <input
            {...register('username')}
            className="border border-gray-300 p-2 w-full rounded-sm"
          />
        </label>
        {errors.username?.message && (
          <p className="text-red-500">{errors.username?.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 text-gray-700">
          Email:
          <input
            type="email"
            {...register('email')}
            className="border border-gray-300 p-2 w-full rounded-sm"
          />
        </label>
        {errors.email?.message && (
          <p className="text-red-500">{errors.email?.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2 text-gray-700">
          Password:
          <input
            type="password"
            {...register('password')}
            className="border border-gray-300 p-2 w-full rounded-sm"
          />
        </label>
        {errors.password?.message && (
          <p className="text-red-500">{errors.password?.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block mb-2 text-gray-700">
          Confirm Password:
          <input
            type="password"
            {...register('confirmPassword')}
            className="border border-gray-300 p-2 w-full rounded-sm"
          />
        </label>
        {errors.confirmPassword?.message && (
          <p className="text-red-500">{errors.confirmPassword?.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="monthofBirth" className="block mb-2 text-gray-700">
          Month of Birth:
          <select
            {...register('monthofBirth')}
            className="border border-gray-300 p-2 w-full rounded-sm"
          >
            {monthOptions}
          </select>
        </label>
        {errors.monthofBirth?.message && (
          <p className="text-red-500">{errors.monthofBirth?.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="playGames" className="block mb-2 text-gray-700">
          Do you play games?:
          <input type="checkbox" {...register('playGames')} />
        </label>
      </div>
      {watchPlayGames && (
        <div className="mb-4">
          <label htmlFor="favoriteGame" className="block mb-2 text-gray-700">
            What is your favourite game?{' '}
            <input
              type="text"
              {...register('favoriteGame')}
              className="border border-gray-300 p-2 w-full rounded-sm"
            />
          </label>
          {errors.favoriteGame?.message && (
            <p className="text-red-500">{errors.favoriteGame?.message}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
