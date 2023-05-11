import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { useVerificationTripForm } from "../../../Hooks/useVerificationTripForm";

export const TripEntity = () => {
  const { trips } = useSelector((state) => state.trips);
  const { people } = useSelector((state) => state.people);
  const { id } = useParams();

  const allDrivers = people.filter((person) => person.role === "Driver");
  const allPassengers = people.filter((person) => person.role === "Passenger");
  const trip = id === 'new' ? {} : trips.find((t) => t.id === +id);

  const {
    formField,
    onChangeForm,
    errors,
  } = useVerificationTripForm(trip);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col sm={12} md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Point of departure:</Form.Label>
            <Form.Control
              placeholder="Departure"
              name='tripDeparture'
              value={formField.tripDeparture}
              onChange={onChangeForm}
              isInvalid={!!errors.isDepartureError}
              required
            />
            {errors.isDepartureError && (
              <Form.Control.Feedback type="invalid">
                {errors.isDepartureError}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
        <Col sm={12} md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Destination:</Form.Label>
            <Form.Control
              placeholder="Destination"
              name='tripDestination'
              value={formField.tripDestination}
              onChange={onChangeForm}
              isInvalid={!!errors.isDestinationError}
              required
            />
            {errors.isDestinationError && (
              <Form.Control.Feedback type="invalid">
                {errors.isDestinationError}
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
              name='tripDriver'
              onChange={onChangeForm}
            >
              <option disabled>select a driver</option>
              {allDrivers.map((driver) => (
                <option
                  key={driver.userId}
                  value={driver.userId}
                  isInvalid={!!errors.isDriverError}
                  required
                >
                  {driver.displayName}
                </option>
              ))}
            </Form.Select>
            {errors.isDriverError && (
              <Form.Control.Feedback type="invalid">
                {errors.isDriverError}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
        <Col sm={12} md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Rate:</Form.Label>
            <Form.Control
              placeholder="100"
              name="tripCost"
              value={formField.tripCost}
              onChange={onChangeForm}
              isInvalid={!!errors.isCostError}
              required
            />
            {errors.isCostError && (
              <Form.Control.Feedback type="invalid">
                {errors.isCostError}
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
              name="tripPassenger"
              onChange={onChangeForm}
              value={formField.tripPassenger.map((p) => p.userId)}
              required
              isInvalid={!!errors.isPassengerError}
            >
              <option disabled>select a passengers</option>
              {allPassengers.map((passenger) => (
                <option key={passenger.userId} value={passenger.userId}>
                  {passenger.displayName}
                </option>
              ))}
            </Form.Select>
            {errors.isPassengerError && (
              <Form.Control.Feedback type="invalid">
                {errors.isPassengerError}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={1}>
          <Link to='/trips' onClick={onChangeForm}>
            <Button variant="success">
              Save
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  )
}