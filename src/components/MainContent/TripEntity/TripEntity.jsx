import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { useVerificationTripForm } from "../../../Hooks/useVerificationTripForm";

export const TripEntity = () => {
  const { trips } = useSelector((state) => state.trips);
  const { people } = useSelector((state) => state.people);
  const { id = 'new' } = useParams();

  const allDrivers = people.filter((person) => person.role === "Driver");
  const allPassengers = people.filter((person) => person.role === "Passenger");
  const trip = id === 'new' ? null : trips.find((t) => t.id === +id);

  const {
    departure,
    setDeparture,
    isDepartureError,
    destination,
    setDestination,
    isDestinationError,
    cost,
    setCost,
    isCostError,
    isDriverError,
    passengers,
    isPassengersError,
    errorMessage,
    submitForm,
    selectDriver,
    selectPassengers,
  } = useVerificationTripForm(trip, people);

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
            <Form.Select
              onChange={(e) => selectDriver(e.target.value)}
            >
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