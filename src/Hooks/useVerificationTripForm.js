import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../store/slices/tripsSlice";

export const useVerificationTripForm = (trip, people) => {
  const dispatch = useDispatch();

  const [departure, setDeparture] = useState(!trip ? '' : trip.from);
  const [isDepartureError, setIsDepartureError] = useState(false);
  const [destination, setDestination] = useState(!trip ? '' : trip.to);
  const [isDestinationError, setIsDestinationError] = useState(false);
  const [cost, setCost] = useState(!trip ? '' : trip.cost);
  const [isCostError, setIsCostError] = useState(false);
  const [driver, setDriver] = useState(!trip ? null : trip.driver);
  const [isDriverError, setIsDriverError] = useState(false);
  const [passengers, setPassengers] = useState(!trip ? [] : trip.passengers);
  const [isPassengersError, setIsPassengersError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const resetErrors = () => {
    setIsDepartureError(false);
    setIsDestinationError(false);
    setIsCostError(false);
    setIsDriverError(false);
    setIsPassengersError(false);
    setErrorMessage("");
  };

  const checkAllFields = () => {
    resetErrors();

    if (departure.length < 3) {
      setIsDepartureError(true);
      setErrorMessage("Departure length must be at least 3");
      return false;
    }

    if (destination.length < 3) {
      setIsDestinationError(true);
      setErrorMessage("Destination length must be at least 3");
      return false;
    }

    if (+cost < 1) {
      setIsCostError(true);
      setErrorMessage("Cost cannot be less than 1");
      return false;
    }

    if (!driver) {
      setIsDriverError(true);
      setErrorMessage("Select a driver");
      return false;
    }

    if (passengers.length < 1) {
      setIsPassengersError(true);
      setErrorMessage("passengers length must be at least 1");
      return false;
    }

    return true;
  };

  const selectDriver = (id) => {
    const person = people.find((person) => person.userId === +id);

    setDriver(person);
  };

  const selectPassengers = (id) => {
    const person = people.find((person) => person.userId === +id);

    if (passengers.some((p) => p.userId === +id)) {
      setPassengers((prev) => prev.filter((p) => p.userId !== +id));
    } else {
      setPassengers((prev) => [...prev, person]);
    }
  };

  const submitForm = (e) => {
    if (!checkAllFields()) {
      e.preventDefault();
      return;
    }

    if (!trip) {
      const newTrip = {
        id: +(new Date().toLocaleTimeString().split(':').join('')),
        from: departure,
        to: destination,
        driver,
        passengers,
        cost,
      };

      dispatch(actions.addNewTrip(newTrip));
      return;
    }

    const newTrip = {
      id: trip.id,
      from: departure,
      to: destination,
      driver,
      passengers,
      cost,
    };

    dispatch(actions.editTrip(newTrip));
  };

  return {
    departure,
    setDeparture,
    isDepartureError,
    destination,
    setDestination,
    isDestinationError,
    cost,
    setCost,
    isCostError,
    setDriver,
    isDriverError,
    passengers,
    setPassengers,
    isPassengersError,
    errorMessage,
    submitForm,
    selectDriver,
    selectPassengers,
  }
}