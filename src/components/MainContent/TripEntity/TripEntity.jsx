import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { useVerificationForm } from "../../../Hooks/useVerificationForm";
import { getPersons } from "../../../store/slices/peopleSlice";
import { CustomSelect } from "./CustomSelect/CustomSelect";

export const TripEntity = () => {
  const getData = useCallback((list, id) => {
    if (id === "new") {
      return {};
    }

    return list.find((p) => p.id === +id);
  }, []);

  const initFormField = useCallback((data) => {
    return {
      tripDeparture: data?.from || "",
      tripDestination: data?.to || "",
      tripDriver: data.driver?.userId || "",
      tripCost: data?.cost || "",
      tripPassengers: data.passengers?.map((p) => p.userId) ?? [],
      tripId:
        data?.id || Number(new Date().toLocaleTimeString().split(":").join("")),
    };
  }, []);

  const dispatch = useDispatch();
  const { people } = useSelector((state) => state.people);

  useEffect(() => {
    if (!people.length) {
      dispatch(getPersons());
    }
  }, [dispatch, people.length]);

  const { trips } = useSelector((state) => state.trips);
  const { id } = useParams();
  const allDrivers = people.filter((person) => person.role === "Driver");
  const allPassengers = people.filter((person) => person.role === "Passenger");
  const trip = getData(trips, id);
  const initValues = initFormField(trip);

  const [formValues, onChangeForm, errors, submitForm] = useVerificationForm(
    initValues,
    "trips"
  );

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col sm={12} md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Point of departure:</Form.Label>
            <Form.Control
              placeholder="Departure"
              type="text"
              name="tripDeparture"
              value={formValues.tripDeparture}
              isInvalid={errors.tripDeparture}
              required
              onChange={onChangeForm}
              onBlur={onChangeForm}
            />
            {errors.tripDeparture && (
              <Form.Control.Feedback type="invalid">
                {errors.tripDeparture}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
        <Col sm={12} md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Destination:</Form.Label>
            <Form.Control
              placeholder="Destination"
              name="tripDestination"
              type="text"
              isInvalid={errors.tripDestination}
              required
              value={formValues.tripDestination}
              onChange={onChangeForm}
              onBlur={onChangeForm}
            />
            {errors.tripDestination && (
              <Form.Control.Feedback type="invalid">
                {errors.tripDestination}
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
              name="tripDriver"
              isInvalid={errors.tripDriver}
              data-type="tripDriver"
              value={formValues.tripDriver}
              onChange={onChangeForm}
              onBlur={onChangeForm}
            >
              <option value="" disabled>
                select a driver
              </option>
              {allDrivers.map((driver) => (
                <option key={driver.userId} value={driver.userId}>
                  {driver.displayName}
                </option>
              ))}
            </Form.Select>
            {errors.tripDriver && (
              <Form.Control.Feedback type="invalid">
                {errors.tripDriver}
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
              isInvalid={errors.tripCost}
              required
              value={formValues.tripCost}
              onChange={onChangeForm}
              onBlur={onChangeForm}
            />
            {errors.tripCost && (
              <Form.Control.Feedback type="invalid">
                {errors.tripCost}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col sm={12} md={4} className="mb-4">
          <CustomSelect
            list={allPassengers}
            defaultSatate={formValues.tripPassengers}
            isInvalid={errors.tripPassengers}
            onChange={onChangeForm}
          />
          {/* <Form.Group className="mb-3">
            <Form.Label>Passengers:</Form.Label>
            <Form.Select
              multiple
              name="tripPassengers"
              isInvalid={errors.tripPassengers}
              // value={formValues.tripPassengers}
              onChange={(e) => console.log(e.target.value)}
              // onBlur={onChangeForm}
              required
            >
              <option disabled>select a passenger</option>
              {allPassengers.map((passenger) => (
                <option key={passenger.userId} value={passenger.userId}>
                  {passenger.displayName}
                </option>
              ))}
            </Form.Select>
            {true && (
              <Form.Control.Feedback type="invalid">
                {errors.tripPassengers}
              </Form.Control.Feedback>
            )}
          </Form.Group> */}
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={1}>
          <Link to="/trips" onClick={(e) => submitForm(e)}>
            <Button variant="success">Save</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
