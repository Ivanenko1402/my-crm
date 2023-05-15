import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const useCheckedLoginForm = (isLoginPage) => {
  const auth = getAuth();
  const [formField, setFormField] = useState(initFormField);
  const [errors, setErrors] = useState(initErrors);
  const navigate = useNavigate();

  function initFormField() {
    return {
      email: '',
      password: '',
      displayName: '',
      phoneNumber: '',
      isLoading: false,
    };
  }

  function initErrors() {
    return {
      email: '',
      password: '',
      displayNameError: '',
      phoneNumberError: '',
    };
  }

  const resetErrors = () => {
    setErrors({
      email: '',
      password: '',
      displayNameError: '',
      phoneNumberError: '',
    });
  }

  const checkFormField = () => {
    let isFormHasError = false;

    if (!formField.email) {
      setErrors(prew => ({ ...prew, email: 'Please enter your email address' }))
      isFormHasError = true;
    }

    if (formField.password.length < 6) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 5 characters long' }))
      isFormHasError = true;
    }

    if (!isLoginPage) {
      if (formField.displayName.length < 3) {
        setErrors(prev => ({ ...prev, displayName: 'Name must be at least 2 characters long' }));
        isFormHasError = true;
      }

      if (formField.phoneNumber.length < 9) {
        setErrors(prev => ({ ...prev, phoneNumber: 'Phone number must be at least 9 characters long' }));
        isFormHasError = true;
      }
    }

    return isFormHasError;
  }

  const submitForm = async (event) => {
    resetErrors();
    event.preventDefault();
    const formHasErrors = checkFormField();
    setFormField(prev => ({ ...prev, isLoading: true }));

    if (formHasErrors) {
      return;
    }

    if (!isLoginPage) {
      await createUserWithEmailAndPassword(auth, formField.email, formField.password)
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          const errorCode = error.code;
          alert(errorCode);
        });
    } else {
      await signInWithEmailAndPassword(auth, formField.email, formField.password)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        alert('User not found, please register.');

        if (errorCode === 'auth/user-not-found') {
          navigate('/registr');
        }
      });
    }

    setFormField(prev => ({ ...prev, isLoading: false }));
  }

  const onChangeForm = (event) => {
    const value = event.target.value;

    switch (event.target.name) {
      case 'email':
        setFormField(prev => ({ ...prev, email: value }))
        break;

      case 'password':
        setFormField(prev => ({ ...prev, password: value }))
        break;

      case 'displayName':
        setFormField(prev => ({ ...prev, displayName: value }))
        break;

      case 'phoneNumber':
        setFormField(prev => ({ ...prev, phoneNumber: value }))
        break;
    
      default:
        submitForm(event);
        break;
    }
  }

  return [
    formField,
    onChangeForm,
    errors,
  ];
}