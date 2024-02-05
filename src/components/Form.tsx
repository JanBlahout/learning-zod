import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formDataSchema } from '../schemas';
import { z } from 'zod';

type FormValues = z.infer<typeof formDataSchema>;

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
    },
  });

  const watchPlayGames = watch('playGames');

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <>
        <label htmlFor="username">
          Username: <input {...register('username')} />
        </label>
      </>
      {errors.username?.message && <p>{errors.username?.message}</p>}
      <>
        <label htmlFor="email">
          Email: <input type="email" {...register('email')} />
        </label>
        {errors.email?.message && <p>{errors.email?.message}</p>}
      </>
      <>
        <label htmlFor="playGames">
          Do you play games?:{' '}
          <input type="checkbox" {...register('playGames')} />
        </label>
      </>
      {watchPlayGames && (
        <>
          <label htmlFor="email">
            What is your favourite game?{' '}
            <input type="text" {...register('favoriteGame')} />
          </label>
          {errors.favoriteGame?.message && (
            <p>{errors.favoriteGame?.message}</p>
          )}
        </>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
