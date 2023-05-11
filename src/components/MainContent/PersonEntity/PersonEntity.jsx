import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useVerificationPersonForm } from "../../../Hooks/useVerificationPersonForm";

export const PersonEntity = () => {
  const { people } = useSelector((state) => state.people);
  const { id } = useParams();
  const person = people.find((p) => p.userId === +id) || {};

  const {
    formField,
    onChangeForm,
    errors,
  } = useVerificationPersonForm(person);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col sm={12} md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Name"
              name='userName'
              isInvalid={!!errors.isNameError}
              value={formField.userName}
              onChange={onChangeForm}
            />
            {errors.isNameError && (
              <Form.Control.Feedback type="invalid">
                {errors.isNameError}
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
              name="userEmail"
              isInvalid={!!errors.isEmailError}
              value={formField.userEmail}
              onChange={onChangeForm}
            />
            {errors.isEmailError && (
              <Form.Control.Feedback type="invalid">
                {errors.isEmailError}
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
              name='userPhone'
              isInvalid={!!errors.isPhoneError}
              value={formField.userPhoneNumber}
              onChange={e => onChangeForm(e)}
            />
            {errors.isPhoneError && (
              <Form.Control.Feedback type="invalid">
                {errors.isPhoneError}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
        <Col sm={12} md={4} className="mb-4">
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
              <Form.Select
                name='userRole'
                onChange={onChangeForm}
              >
                <option value={"Driver"}>Driver</option>
                <option value={"Passenger"}>Passenger</option>
                <option value={"Admin"}>Admin</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={1}>
          <Link to='/' onClick={onChangeForm}>
            <Button variant="success">
              Save
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
