import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../store/slices/peopleSlice";

export const useVerificationPersonForm = (data) => {
  const [formField, setFormField] = useState(initFormField);
  const [errors, setErrors] = useState(initErrors);
  const dispatch = useDispatch();

  function initFormField() {
    return {
      userName: data.displayName ?? '',
      userEmail: data.email ?? '',
      userPhoneNumber: data.phoneNumber ?? '',
      userRole: data.role ?? 'Driver',
    };
  };

  function initErrors() {
    return {
      isNameError: '',
      isEmailError: '',
      isPhoneError: '',
    };
  };

  const submitForm = (event) => {
    if (checkForm()) {
      event.preventDefault();
      return;
    }

    if (!data) {
      const newPerson = {
        userId: +(new Date().toLocaleTimeString().split(':').join('')),
        displayName: formField.userName,
        email: formField.useEmail,
        phoneNumber: formField.userPhoneNumber,
        role: formField.userRole,
      };

      dispatch(actions.addPerson(newPerson));
    } else {
      const newPerson = {
        userId: +data.userId,
        displayName: formField.userName,
        email: formField.useEmail,
        phoneNumber: formField.userPhoneNumber,
        role: formField.userRole,
      };

      dispatch(actions.editPerson(newPerson));
    }
  };

  function checkForm() {
    resetErrors();
    let formHasErrors = false;

    if (formField.userName.length < 3) {
      setErrors(prev => ({
        ...prev,
        isNameError: 'Name must be at least 3 letters'
      }));

      formHasErrors = true;
    }

    if (!formField.userEmail) {
      setErrors(prev => ({
        ...prev,
        isEmailError: 'Email cannot be empty'
      }));

      formHasErrors = true;
    }

    if (formField.userPhoneNumber.length < 8) {
      setErrors(prev => ({
        ...prev,
        isPhoneError: 'Phone number must be at least 8 digits'
      }));

      formHasErrors = true;
    }

    if (formHasErrors) {
      return true;
    }

    return false;
  }

  function resetErrors() {
    setErrors({
      isNameError: '',
      isEmailError: '',
      isPhoneError: '',
    });
  }

  function onChangeForm(event) {
    checkForm();
    const value = event.target.value;

    switch (event.target.name) {
      case 'userName':
        setFormField(prev => ({...prev, userName: value}));
        break;

      case 'userEmail':
        setFormField(prev => ({...prev, userEmail: value}));
        break;

      case 'userPhone':
        setFormField(prev => ({...prev, userPhone: value}));
        break;

      case 'userRole':
        setFormField(prev => ({...prev, userRole: value}));
        break;

      case '':
        submitForm(event);
        break;

      default:
        break;
    }
  }

  return {
    formField,
    onChangeForm,
    errors,
  }
};
