import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { actions } from "../../../store/slices/tripsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export const EditOrCreateTrip = () => {
  const { trips } = useSelector((state) => state.trips);
  const { people } = useSelector((state) => state.people);
  const dispatch = useDispatch();
  const { id = 'new' } = useParams();

  const allDrivers = people.filter((person) => person.role === "Driver");
  const allPassengers = people.filter((person) => person.role === "Passenger");
  const trip = id === 'new' ? null : trips.find((t) => t.id === +id);

  const [departure, setDeparture] = useState(!trip ? '' : trip.from);
  const [isDepartureError, setIsDepartureError] = useState(false);
  const [destination, setDestination] = useState(!trip ? '' : trip.to);
  const [isDestinationError, setIsDestinationError] = useState(false);
  const [cost, setCost] = useState(!trip ? '' : trip.cost);
  const [isCostError, setIsCostError] = useState(false);
  const [driver, setDriver] = useState(!trip ? allDrivers[0] : trip.driver);
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

    if (id === 'new') {
      const newTrip = {
        id: getNewId(),
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
      id: +id,
      from: departure,
      to: destination,
      driver,
      passengers,
      cost,
    };

    dispatch(actions.editTrip(newTrip));
  };

  function getNewId() {
    let newId = 1;
    const ids = trips.map((p) => p.id);

    while (ids.includes(newId)) {
      newId++;
    }

    return newId;
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col sm={12} md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Point of departure:</Form.Label>
            <Form.Control
              placeholder="Departure"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              isInvalid={isDepartureError}
              required
            />
            {isDepartureError && (
              <Form.Control.Feedback type="invalid">
                {errorMessage}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
        <Col sm={12} md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Destination:</Form.Label>
            <Form.Control
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              isInvalid={isDestinationError}
              required
            />
            {isDestinationError && (
              <Form.Control.Feedback type="invalid">
                {errorMessage}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col sm={12} md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Driver:</Form.Label>
            <Form.Select onChange={(e) => selectDriver(e.target.value)}>
              {allDrivers.map((driver) => (
                <option
                  key={driver.userId}
                  value={driver.userId}
                  isInvalid={isDriverError}
                  required
                >
                  {driver.displayName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col sm={12} md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Rate:</Form.Label>
            <Form.Control
              placeholder="100"
              value={cost}
              onChange={(e) => setCost(+e.target.value)}
              isInvalid={isCostError}
              required
            />
            {isCostError && (
              <Form.Control.Feedback type="invalid">
                {errorMessage}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col sm={12} md={4} className="mb-4">
          <Form.Group className="mb-3">
            <Form.Label>Passengers:</Form.Label>
            <Form.Select
              multiple
              onChange={(e) => selectPassengers(e.target.value)}
              value={passengers.map((p) => p.userId)}
              required
              isInvalid={isPassengersError}
            >
              {allPassengers.map((passenger) => (
                <option key={passenger.userId} value={passenger.userId}>
                  {passenger.displayName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={1}>
          <Link to='/trips' onClick={e => submitForm(e)}>
            <Button variant="success">
              Save
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  )
}