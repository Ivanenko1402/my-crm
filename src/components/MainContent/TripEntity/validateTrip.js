export const validateTrip = (values) => {
  const errors = {};

  if (values.tripCost < 1) {
    errors.tripCost = 'Rate must be at least 1';
  }

  if (!values.tripDeparture) {
    errors.tripDeparture = 'Required';
  }

  if (!values.tripDestination) {
    errors.tripDestination = 'Required';
  }

  if (!values.tripDriver) {
    errors.tripDriver = 'Select a driver';
  }

  if (!values.tripPassengers.length) {
    errors.tripPassengers = 'Select a passengers';
  }

  return errors;
};