import { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { actions } from "../../../store/slices/peopleSlice";

export const EditOrCreatePerson = () => {
  const { people } = useSelector((state) => state.people);
  const dispatch = useDispatch();
  const { id } = useParams();
  const person = people.find((p) => p.userId === +id) || null;

  const [name, setName] = useState(person ? person.displayName : '');
  const [isNameError, setIsNameError] = useState(false);
  const [email, setEmail] = useState(person ? person.email : '');
  const [isEmailError, setIsEmailError] = useState(false);
  const [phone, setPhone] = useState(person ? person.phoneNumber : '');
  const [isPhoneError, setIsPhoneError] = useState(false);
  const [role, setRole] = useState(person ? person.role : 'Driver')

  const [errorMessage, setErrorMessage] = useState('');

  const submitForm = (event) => {
    if (checkForm()) {
      event.preventDefault();
      return;
    }

    if (id === 'new') {
      const newPerson = {
        userId: getNewId(),
        displayName: name,
        email,
        phoneNumber: phone,
        role,
      };

      dispatch(actions.addPerson(newPerson));
    } else {
      const newPerson = {
        userId: +id,
        displayName: name,
        email: email,
        phoneNumber: phone,
        role: role,
      };

      dispatch(actions.editPerson(newPerson));
    }
  };

  function getNewId() {
    let newId = 1;
    const ids = people.map((p) => p.userId);

    while (ids.includes(newId)) {
      newId++;
    }

    return newId;
  }

  function checkForm() {
    resetErrors();

    if (name.length < 3) {
      setIsNameError(true);
      setErrorMessage("Name must be at least 3 letters");
      return true;
    }

    if (!email) {
      setIsEmailError(true);
      setErrorMessage("Email cannot be empty");
      return true;
    }

    if (phone.length < 8) {
      setIsPhoneError(true);
      setErrorMessage("Phone number must be at least 8 digits");
      return true;
    }

    return false;
  }

  function resetErrors() {
    setIsEmailError(false);
    setIsNameError(false);
    setIsPhoneError(false);
    setErrorMessage("");
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col sm={12} md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Name"
              isInvalid={isNameError}
              value={name}
              onChange={(e) => setName(e.target.value.trim())}
            />
            {isNameError && (
              <Form.Control.Feedback type="invalid">
                {errorMessage}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
        <Col sm={12} md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="example@example.com"
              type="email"
              isInvalid={isEmailError}
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
            />
            {isEmailError && (
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
            <Form.Label>Phone</Form.Label>
            <Form.Control
              placeholder="0631533344"
              type="number"
              isInvalid={isPhoneError}
              value={phone}
              onChange={(e) => setPhone(e.target.value.trim())}
            />
            {isPhoneError && (
              <Form.Control.Feedback type="invalid">
                {errorMessage}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
        <Col sm={12} md={4} className="mb-4">
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
              <Form.Select value={role} onChange={(e) => setRole(e.target.value.trim())}>
                <option value={"Driver"}>Driver</option>
                <option value={"Passenger"}>Passenger</option>
                <option value={"Admin"}>Admin</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={1}>
          <Link to='/' onClick={e => submitForm(e)}>
            <Button variant="success">
              Save
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
