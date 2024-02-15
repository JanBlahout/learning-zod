import { z } from 'zod';

export const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
] as const;

export type Months = (typeof months)[number];

export const mappedMonths: { [key in Months]: string } = {
  january: 'January',
  february: 'February',
  march: 'March',
  april: 'April',
  may: 'May',
  june: 'June',
  july: 'July',
  august: 'August',
  september: 'September',
  october: 'October',
  november: 'November',
  december: 'December',
};

export const formDataSchema = z
  .object({
    username: z.string().min(4, 'Username has to be at least 4 characters'),
    email: z
      .string()
      .email('Please enter a valid email address')
      .min(1, 'Please enter an email adress'),
    password: z.string().min(4),
    confirmPassword: z.string(),
    monthofBirth: z.enum(months, {
      errorMap: () => ({ message: 'Please select months of your birth' }),
    }),
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
    if (values.password !== values.confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password did not match',
        path: ['confirmPassword'],
      });
    }
  });
