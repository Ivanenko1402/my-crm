import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPerson } from "../store/slices/peopleSlice";

const selectPerson = (list, passengersList, id, name) => {
  const person = list.find((person) => person.userId === +id) || null;

  if (name === 'tripDriver') {
    return person;
  }

  if (name === 'tripPassengers') {
    const existingIndex = passengersList.findIndex((p) => p.userId === +id);

    if (existingIndex !== -1) {
      const updatedPassengers = [...passengersList];
      updatedPassengers.splice(existingIndex, 1);
      return updatedPassengers;
    }

    return [...passengersList, person];
  }

  return null;
};

const errorStrategies = {
  userName(value) {
    return !value && 'Can not be empty';
  },

  userEmail(value) {
    return !value && 'Can not be empty';
  },

  userPhone(value) {
    return value.length < 8 && 'Phone number must be at least 8 digits';
  },

  userRole(value) {
    return !value && 'Select a role';
  },

  tripDeparture(value) {
    return !value && 'Departure can not be empty';
  },

  tripDestination(value) {
    return !value && 'Departure can not be empty';
  },

  tripDriver(value) {
    return value === "" && "Select a driver";
  },

  tripCost(value) {
    return value.length < 1 && 'Cost cannot be less than 1';
  },

  tripPassengers(value) {
    console.log(value)
    return !value.length && 'Select a passenger';
  },
};

function errorProcesser(event) {
  const fieldName = event.target.name;
  const fieldValue = errorStrategies[fieldName](event.target.value);

  return [fieldName, fieldValue];
};

const inputStrategies = {
  text(e) {
    return e.target.value;
  },

  number(e) {
    return +e.target.value;
  },

  email(e) {
    return e.target.value;
  },

  tel(e) {
    return e.target.value;
  },

  checkbox(e) {
    return e.target.checked;
  },

  'select-one'(e) {
    return e.target.value;
  },
};

function inputProcessor(event, list, passengersList) {
  const fieldName = event.target.name;

  if (fieldName === 'tripDriver') {
    const fieldValue = selectPerson(list, passengersList, event.target.value, fieldName);

    return [fieldName, fieldValue];
  }

  if (fieldName === 'tripPassengers') {
    const fieldValue = passengersList
      ? selectPerson(list, passengersList, event.target.value, fieldName)
      : selectPerson(list, [], event.target.value, fieldName);

    return [fieldName, fieldValue];
  }

  const fieldValue = inputStrategies[event.target.type](event);

  return [fieldName, fieldValue];
}

export const useVerificationForm = (data) => {
  const { people } = useSelector(state => state.people);
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState(data);
  const [errors, setErrors] = useState({});
  const passengersList = formValues.tripPassengers;

  function onChangeForm(event) {
    const [fieldName, fieldValue] = inputProcessor(event, people, passengersList);
    const [errorName, errorValue] = errorProcesser(event);

    setFormValues(prev => ({ ...prev, [fieldName]: fieldValue }));
    setErrors(prev => ({ ...prev, [errorName]: errorValue }));
  }

  const submitForm = (event) => {
    const formHasError = Object.values(errors).some(e => e !== false);
    const formFilled = Object.values(formValues).every(f => f !== '');

    if (formHasError || !formFilled) {
      event.preventDefault();

      console.log(Object.entries(formValues))

      Object.entries(formValues).forEach(([fieldName, fieldValue]) => {
        if (!fieldValue) {
          setErrors(prev => ({ ...prev, [fieldName]: errorStrategies[fieldName](fieldValue) }));
        }

        if (!fieldValue.length) {
          setErrors(prev => ({ ...prev, tripPassengers: 'Select a passenger' })); 
        }
      });
    
      return;
    }

    const data = {
      displayName: formValues.userName,
      email: formValues.userEmail,
      phoneNumber: formValues.userPhone,
      role: formValues.userRole,
      userId: formValues.userId,
    };
  
    dispatch(addPerson(data));
  };

  return [
    formValues,
    onChangeForm,
    errors,
    submitForm,
  ];
};
