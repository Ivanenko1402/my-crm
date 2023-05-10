import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useVerificationPersonForm } from "../../../Hooks/useVerificationPersonForm";

export const PersonEntity = () => {
  const { people } = useSelector((state) => state.people);
  const { id } = useParams();
  const person = people.find((p) => p.userId === +id) || null;

  const {
    name,
    setName,
    isNameError,
    email,
    setEmail,
    isEmailError,
    phone,
    setPhone,
    isPhoneError,
    role,
    setRole,
    errorMessage,
    submitForm,
  } = useVerificationPersonForm(person);

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
