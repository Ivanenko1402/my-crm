export const validateLogin = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Please enter your email address';
  }

  if (!values.password || values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  return errors;
};
