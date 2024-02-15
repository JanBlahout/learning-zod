import { z } from 'zod';

export const formDataSchema = z
  .object({
    username: z.string().min(4, 'Username has to be at least 4 characters'),
    email: z
      .string()
      .email('Please enter a valid email address')
      .min(1, 'Please enter an email adress'),
    playGames: z.boolean(),
    favoriteGame: z.string().optional(),
  })
  .superRefine((values, context) => {
    if (values.playGames === true && values.favoriteGame?.trim().length === 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide a favorite game',
        path: ['favoriteGame'],
      });
    }
    if (values.playGames === false) {
      values.favoriteGame = '';
    }
  });
