export const validatePerson = (values) => {
  const errors = {};
  
  if (values.userPhone.length < 8) {
    errors.userPhone = 'Phone number must be at least 8 characters long';
  } else {
    delete errors.userPhone;
  }

  if (!values.userName) {
    errors.userName = 'Required';
  } else {
    delete errors.userName;
  }

  if (!values.userEmail) {
    errors.userEmail = 'Required';
  } else {
    delete errors.userEmail;
  }

  if (!values.userRole) {
    errors.userRole = 'Select a role';
  } else {
    delete errors.userRole;
  }

  return errors;
};
