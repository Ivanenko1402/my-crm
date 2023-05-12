import { useState } from "react";
import { useSelector } from "react-redux";
import { getDatabase, ref, set } from "firebase/database";


export const useVerificationTripForm = (data = {}) => {
  const db = getDatabase();
  const { peopleList } = useSelector((state) => state.people);
  const [formField, setFormField] = useState(initFormField);
  const [errors, setErrors] = useState(initErrors);

  function initFormField() {
    return {
      tripDeparture: data.from ?? '',
      tripDestination: data.to ?? '',
      tripCost: data.cost ?? '',
      tripPassenger: data.passengers ?? [],
      tripDriver: data.driver ?? null,
    };
  };

  function initErrors() {
    return {
      isDepartureError: '',
      isDestinationError: '',
      isCostError: '',
      isDriverError: '',
      isPassengersError: '',
    };
  };

  const resetErrors = () => {
    setErrors({
      isDepartureError: '',
      isDestinationError: '',
      isCostError: '',
      isDriverError: '',
      isPassengersError: '',
    });
  };

  const checkAllFields = () => {
    resetErrors();
    let formHasErrors = false;

    if (formField.tripDeparture.length < 3) {
      setErrors(prev => ({...prev, isDepartureError: 'Departure length must be at least 3'}))
      formHasErrors = true;
    }

    if (formField.tripDestination.length < 3) {
      setErrors(prev => ({...prev, isDestinationError: 'Destination length must be at least 3'}))
      formHasErrors = true;
    }

    if (+formField.tripCost < 1) {
      setErrors(prev => ({...prev, isCostError: 'Cost cannot be less than 1'}))
      formHasErrors = true;
    }

    if (!formField.tripDriver) {
      setErrors(prev => ({...prev, isDriverError: 'Select a driver'}))
      formHasErrors = true;
    }

    return formHasErrors
  };

  const selectDriver = (id) => {
    const person = peopleList.find((person) => person.userId === id);
    console.log('driver', person)
    setFormField(prev => ({...prev, tripDriver: person}));
  };

  const selectPassengers = (id) => {
    const person = peopleList.find((person) => person.userId === id);
  
    if (formField.tripPassenger.some(p => p.userId === person.userId)) {
      setFormField(prev => ({...prev, tripPassenger: prev.tripPassenger.filter(p => p.userId !== person.userId)}));
    } else {
      setFormField(prev => ({...prev, tripPassenger: [...prev.tripPassenger, person]}));
    }
  };

  const submitForm = async (e) => {
    const error = checkAllFields();

    if (error) {
      e.preventDefault();
      return;
    }

    const newTrip = {
      id: data.id ? data.id : String(new Date().toLocaleTimeString().split(':').join('')),
      from: formField.tripDeparture,
      to: formField.tripDestination,
      driver: formField.tripDriver,
      passengers: formField.tripPassenger,
      cost: +formField.tripCost,
    }

    if (data.id) {
      await set(ref(db, `trips/${newTrip.id}`), newTrip);
      return;
    }
    console.log('added')
    await set(ref(db, `trips/${newTrip.id}`), newTrip);
  };

  const onChangeForm = (event) => {
    const value = event.target.value;

    switch (event.target.name) {
      case 'tripDeparture':
        setFormField(prev => ({...prev, tripDeparture: value}));
        break;

      case 'tripDestination':
        setFormField(prev => ({...prev, tripDestination: value}));
        break;

      case 'tripCost':
        setFormField(prev => ({...prev, tripCost: value}));
        break;

      case 'tripDriver':
        selectDriver(value);
        break;

      case 'tripPassenger':
        selectPassengers(value);
        break;

      default:
        submitForm(event);
        break;
    }
  }

  return {
    formField,
    onChangeForm,
    errors,
  }
}