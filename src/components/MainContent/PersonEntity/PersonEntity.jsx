import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useVerificationForm } from "../../../Hooks/useVerificationForm";

const getPerson = (list, id) => {
  if (id === "new") {
    return {};
  }

  return list.find((p) => p.userId === +id);
};

const initFormField = (data) => {
  return {
    userName: data.displayName ?? "",
    userEmail: data.email ?? "",
    userPhone: data.phoneNumber || "",
    userRole: data.role || "",
    userId:
      data.userId ||
      Number(new Date().toLocaleTimeString().split(":").join("")),
  };
};

export const PersonEntity = () => {
  const { people } = useSelector((state) => state.people);
  const { id } = useParams();
  const person = getPerson(people, id);
  const initValues = initFormField(person);

  const [formValues, onChangeForm, errors, submitForm] = useVerificationForm(
    initValues,
    "person"
  );

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col sm={12} md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Name"
              name="userName"
              type="text"
              isInvalid={errors?.userName}
              value={formValues.userName}
              onChange={onChangeForm}
              onBlur={onChangeForm}
            />
            {errors?.userName && (
              <Form.Control.Feedback type="invalid">
                {errors.userName}
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
              isInvalid={errors?.userEmail}
              value={formValues.userEmail}
              onChange={onChangeForm}
              onBlur={onChangeForm}
            />
            {errors?.userEmail && (
              <Form.Control.Feedback type="invalid">
                {errors.userEmail}
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
              placeholder="123456789"
              name="userPhone"
              type="tel"
              isInvalid={errors.userPhone}
              value={formValues.userPhone}
              onChange={onChangeForm}
              onBlur={onChangeForm}
            />
            {errors?.userPhone && (
              <Form.Control.Feedback type="invalid">
                {errors.userPhone}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
        <Col sm={12} md={4} className="mb-4">
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              name="userRole"
              value={formValues.userRole}
              isInvalid={errors.userRole}
              onChange={(e) => console.log(e)}
              onBlur={onChangeForm}
            >
              <option value="" disabled>
                Select a value
              </option>
              <option value="Driver">Driver</option>
              <option value="Passenger">Passenger</option>
              <option value="Admin">Admin</option>
            </Form.Select>
            {errors.userRole && (
              <Form.Control.Feedback type="invalid">
                {errors.userRole}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={1}>
          <Link to="/" onClick={(e) => submitForm(e)}>
            <Button variant="success">Save</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
