export const validateRegistr = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Please enter your email address';
  }

  if (!values.password || values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }
  
  if (!values.displayName || values.displayName.length < 3) {
    errors.displayName = 'Name must be at least 3 characters long';
  }
  
  if (!values.phoneNumber || values.phoneNumber.length < 9) {
    errors.phoneNumber = 'Phone number must be at least 9 characters long';
  }

  return errors;
};
