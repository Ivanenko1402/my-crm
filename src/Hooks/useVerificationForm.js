import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrEditPerson } from "../store/slices/peopleSlice";
import { createOrEditTrip } from "../store/slices/tripsSlice";

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

  arrayMultiSelect: [],

  'select-multiple'(e) {
    if (this.arrayMultiSelect.includes(+e.target.value)) {
      this.arrayMultiSelect = this.arrayMultiSelect.filter(v => v !== +e.target.value)
    } else {
      this.arrayMultiSelect.push(+e.target.value);
    }

    return this.arrayMultiSelect;
  }
};

function inputProcessor(event) {
  const fieldName = event.target.name;
  const fieldValue = inputStrategies[event.target.type](event);

  return [fieldName, fieldValue];
}

export const useVerificationForm = (data, type) => {
  const { people } = useSelector(state => state.people);
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState(data);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log(formValues.tripPassengers)
    inputStrategies.arrayMultiSelect = formValues.tripPassengers ?? [];
  }, [formValues.tripPassengers, people]);


  function onChangeForm(event) {
    const [fieldName, fieldValue] = inputProcessor(event);
    const [errorName, errorValue] = errorProcesser(event);

    setFormValues(prev => ({ ...prev, [fieldName]: fieldValue }));
    setErrors(prev => ({ ...prev, [errorName]: errorValue }));
  }

  const submitForm = (event) => {
    const formHasError = Object.values(errors).some(e => e !== false);
    const formFilled = Object.values(formValues).every(f => f !== '');

    if (formHasError || !formFilled) {
      event.preventDefault();

      Object.entries(formValues).forEach(([fieldName, fieldValue]) => {
        if (!fieldValue) {
          setErrors(prev => ({ ...prev, [fieldName]: errorStrategies[fieldName](fieldValue) }));
        }

        if (type === 'trips' && !fieldValue.passengersList?.length) {
          setErrors(prev => ({ ...prev, tripPassengers: 'Select a passenger' })); 
        }
      });

      return;
    }

    switch (type) {
      case 'person':
        dispatch(createOrEditPerson({
          displayName: formValues.userName,
          email: formValues.userEmail,
          phoneNumber: formValues.userPhone,
          role: formValues.userRole,
          userId: formValues.userId,
        }));
        break;

      case 'trips':
        dispatch(createOrEditTrip({
          from: formValues.tripDeparture,
          to: formValues.tripDestination,
          driver: people.find(p => p.userId === +formValues.tripDriver),
          cost: formValues.tripCost,
          passengers: formValues.tripPassengers.map(id => {
            return people.find(p => p.userId === id);
          }),
          id: formValues.tripId,
        }))
        break;
    
      default:
        break;
    }
  };

  return [
    formValues,
    onChangeForm,
    errors,
    submitForm,
  ];
};
