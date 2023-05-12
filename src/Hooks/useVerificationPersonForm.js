import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions, init } from "../store/slices/peopleSlice";
import { getDatabase, ref, set } from "firebase/database";

export const useVerificationPersonForm = (data) => {
  const [formField, setFormField] = useState(initFormField);
  const [errors, setErrors] = useState(initErrors);
  const db = getDatabase();
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

  const submitForm = async (event) => {
    if (checkForm()) {
      event.preventDefault();
      return;
    }

    if (!data.userId) {
      const newPerson = {
        userId: String(new Date().toLocaleTimeString().split(':').join('')),
        displayName: formField.userName,
        email: formField.userEmail,
        phoneNumber: formField.userPhoneNumber,
        role: formField.userRole,
      };

      await set(ref(db, `people/${newPerson.userId}`), newPerson);

    } else {
      const newPerson = {
        userId: data.userId,
        displayName: formField.userName,
        email: formField.userEmail,
        phoneNumber: formField.userPhoneNumber,
        role: formField.userRole,
      };

      await set(ref(db, `people/${newPerson.userId}`), newPerson);
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
    const value = event.target.value;

    switch (event.target.name) {
      case 'userName':
        setFormField(prev => ({...prev, userName: value}));
        break;

      case 'userEmail':
        setFormField(prev => ({...prev, userEmail: value}));
        break;

      case 'userPhone':
        setFormField(prev => ({...prev, userPhoneNumber: value}));
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
