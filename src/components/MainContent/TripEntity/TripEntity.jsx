import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { useVerificationForm } from "../../../Hooks/useVerificationForm";
import { getPersons } from "../../../store/slices/peopleSlice";
import { CustomSelect } from "./CustomSelect/CustomSelect";
import { validateTrip } from "./validateTrip";
import { createOrEditTrip } from "../../../store/slices/tripsSlice";

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
      tripId: data?.id || Number(new Date().toLocaleTimeString().split(":").join("")),
    };
  }, []);

  const dispatch = useDispatch();
  const { people } = useSelector((state) => state.people);

  useEffect(() => {
    if (!people.length) {
      dispatch(getPersons());
    }
  }, [dispatch, people.length]);

  const { trips, isLoading } = useSelector((state) => state.trips);
  const { id } = useParams();
  const allDrivers = people.filter((person) => person.role === "Driver");
  const allPassengers = people.filter((person) => person.role === "Passenger");
  const trip = getData(trips, id);
  const initValues = initFormField(trip);
  const navigate = useNavigate();

  const submitFunction = useCallback((data, dataTouched) => {
    if (id === "new") {
      // create trip
      const newTrip = {
        from: data.tripDeparture,
        to: data.tripDestination,
        driver: people.find(person => +person.userId === +data.tripDriver),
        cost: data.tripCost,
        passengers: data.tripPassengers?.map((id) => people.find(person => +person.userId === +id)),
        id: data.tripId,
      };

      dispatch(createOrEditTrip(newTrip))
      setTimeout(() => {
        navigate(`/trips/${newTrip.id}`)
      }, 1000)
      return;
    }

    console.log('edit trip')
  }, [dispatch, id, navigate, people])

  const [
    formValues,
    onChangeForm,
    errors,
    isPristine,
    submitForm,
  ] = useVerificationForm(initValues, validateTrip, submitFunction);

  const changeCheckedPerson = (person) => {
    const updatedState = formValues.tripPassengers.includes(person.userId)
      ? formValues.tripPassengers.filter((p) => p !== person.userId)
      : [...formValues.tripPassengers, person.userId];

    const event = {
      target: {
        name: 'tripPassengers',
        type: 'my-select',
        value: updatedState,
      },
    };

    onChangeForm(event);
  };

  return (
    <>
      {isLoading ? (
        <div>
          Loading
        </div>
      ) : (
      <Container className="d-flex flex-column">
        <Form onSubmit={submitForm}>
          <Row className="justify-content-md-center">
            <Col sm={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Point of departure:</Form.Label>
                <Form.Control
                  placeholder="Departure"
                  type="text"
                  name="tripDeparture"
                  value={formValues.tripDeparture}
                  isInvalid={!isPristine && errors.tripDeparture}
                  onChange={onChangeForm}
                />
                {!isPristine && (
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
                  isInvalid={!isPristine && errors.tripDestination}
                  value={formValues.tripDestination}
                  onChange={onChangeForm}
                />
                {!isPristine && (
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
                  isInvalid={!isPristine && errors.tripDriver}
                  data-type="tripDriver"
                  value={formValues.tripDriver}
                  onChange={onChangeForm}
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
                {!isPristine && (
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
                  isInvalid={!isPristine && errors.tripCost}
                  value={formValues.tripCost}
                  onChange={onChangeForm}
                />
                {!isPristine && (
                  <Form.Control.Feedback type="invalid">
                    {errors.tripCost}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col sm={12} md={4} className="mb-4">
              <CustomSelect isInvalid={!isPristine && errors.tripPassengers}>
                {allPassengers.map(person => (
                  <label
                    className={formValues.tripPassengers.includes(person.userId) ? 'd-flex justify-content-between align-items-center p-1 bg-light' : 'd-flex justify-content-between align-items-center p-1'}
                    key={person.userId}
                  >
                    {`${person.displayName} tel:${person.phoneNumber}`}
                    <input
                      type="checkbox"
                      checked={formValues.tripPassengers.includes(person.userId)}
                      onChange={() => changeCheckedPerson(person)}
                    />
                  </label>
                ))}
              </CustomSelect>
            </Col>
          </Row>
        </Form>
        <Button className="mx-auto" variant="success" onClick={submitForm} type="submit">Save</Button>
      </Container>
      )}
    </>
  );
};
