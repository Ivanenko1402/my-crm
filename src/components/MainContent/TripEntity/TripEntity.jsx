import React, { useEffect, useCallback, useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../../Hooks/useForm';
import { getPersons } from '../../../store/slices/peopleSlice';
import {
  createTrip,
  editTrip,
  getTargetTrip,
} from '../../../store/slices/tripsSlice';
import { CustomSelect } from './CustomSelect/CustomSelect';
import { validateTrip } from './validateTrip';

export const TripEntity = () => {
  const dispatch = useDispatch();
  const { people } = useSelector((state) => state.people);
  const { targetTrip, isLoading } = useSelector(state => state.trips);

  const { id } = useParams();
  const allDrivers = people.filter((person) => person.userRole === 'Driver');
  const allPassengers = people.filter((person) => person.userRole === 'Passenger');
  const navigate = useNavigate();

  const getData = useCallback((id) => {
    if (id === 'new') {
      return {};
    }

    return targetTrip;
  }, [targetTrip]);

  useEffect(() => {
    if (id !== 'new') {
      dispatch(getTargetTrip(+id));
    }
  }, [dispatch, id]);

  const initFormField = useCallback(
    (data) => {
      return {
        tripDeparture: data?.tripDeparture || '',
        tripDestination: data?.tripDestination || '',
        tripDriver: data?.tripDriver || '',
        tripCost: data?.tripCost || '',
        tripPassengers: data?.tripPassengers || [],
        id: data?.id || Number(new Date().toLocaleTimeString().split(':').join('')),
      };
    }, []);

  const [trip, setTrip] = useState(getData(id));
  const [initValues, setInitValues] = useState(initFormField(trip));

  useEffect(() => {
    setInitValues(initFormField(trip));
  }, [initFormField, targetTrip, trip])

  useEffect(() => {
    setTrip(targetTrip);
  }, [targetTrip])

  const [
    formValues,
    onChangeForm,
    errors,
    isPristine,
    submitForm,
    formValuesTouched,
  ] = useForm(initValues, validateTrip, submtFn);

  useEffect(() => {
    if (!people.length) {
      dispatch(getPersons());
    }
  }, [dispatch, people.length]);

  function submtFn() {
    if (id === 'new') {
      dispatch(createTrip(formValues));
      navigate(`/trips/${formValues.id}`);

    } else {
      dispatch(editTrip({data: formValuesTouched, id: formValues.id}));
    }
  };

  const changeCheckedPerson = (person) => {
    const updatedState = formValues.tripPassengers.includes(person.id)
      ? formValues.tripPassengers.filter((p) => p !== person.id)
      : [...formValues.tripPassengers, person.id];

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
                value={formValues.tripDriver}
                onChange={onChangeForm}
              >
                <option value="" disabled>
                  Select a driver
                </option>
                {allDrivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.userName}
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
            <CustomSelect
              items={allPassengers}
              isInvalid={!isPristine && errors.tripPassengers}
              checkedModel={formValues.tripPassengers}
              onCheckedModelChange={changeCheckedPerson}
            />
          </Col>
        </Row>
      </Form>
      <Button className="mx-auto" variant="success" onClick={submitForm} type="submit">
        {isLoading ? 'Loading' : 'Save'}
      </Button>
    </Container>
  );
};