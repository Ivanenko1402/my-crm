import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../store/slices/peopleSlice";

export const useVerificationPersonForm = (person) => {
  const [name, setName] = useState(person ? person.displayName : '');
  const [isNameError, setIsNameError] = useState(false);
  const [email, setEmail] = useState(person ? person.email : '');
  const [isEmailError, setIsEmailError] = useState(false);
  const [phone, setPhone] = useState(person ? person.phoneNumber : '');
  const [isPhoneError, setIsPhoneError] = useState(false);
  const [role, setRole] = useState(person ? person.role : 'Driver')
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  const submitForm = (event) => {
    if (checkForm()) {
      event.preventDefault();
      return;
    }

    if (!person) {
      const newPerson = {
        userId: new Date(),
        displayName: name,
        email,
        phoneNumber: phone,
        role,
      };

      dispatch(actions.addPerson(newPerson));
    } else {
      const newPerson = {
        userId: +person.userId,
        displayName: name,
        email: email,
        phoneNumber: phone,
        role: role,
      };

      dispatch(actions.editPerson(newPerson));
    }
  };

  function checkForm() {
    resetErrors();

    if (name.length < 3) {
      setIsNameError(true);
      setErrorMessage("Name must be at least 3 letters");
      return true;
    }

    if (!email) {
      setIsEmailError(true);
      setErrorMessage("Email cannot be empty");
      return true;
    }

    if (phone.length < 8) {
      setIsPhoneError(true);
      setErrorMessage("Phone number must be at least 8 digits");
      return true;
    }

    return false;
  }

  function resetErrors() {
    setIsEmailError(false);
    setIsNameError(false);
    setIsPhoneError(false);
    setErrorMessage("");
  }

  return {
    name,
    setName,
    isNameError,
    email,
    setEmail,
    isEmailError,
    phone,
    setPhone,
    isPhoneError,
    role,
    setRole,
    errorMessage,
    submitForm,
  }
};
