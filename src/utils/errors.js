import { createError } from 'apollo-errors';

export const UserError = createError('UserError', {
  message: 'User with given email does not exist'
});

export const AuthError = createError('AuthError', {
  message: 'Wrong email or password'
});
