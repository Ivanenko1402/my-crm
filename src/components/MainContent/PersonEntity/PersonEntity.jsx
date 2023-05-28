import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useVerificationForm } from "../../../Hooks/useVerificationForm";
import { validatePerson } from "./validatePerson";
import { useCallback } from "react";
import { createOrEditPerson } from "../../../store/slices/peopleSlice";

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
  const { people, isLoading } = useSelector((state) => state.people);
  const { id } = useParams();
  const person = getPerson(people, id);
  const initValues = initFormField(person);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitFunction = useCallback((data, dataTouched) => {
    if (id === "new") {
      const newPerson = {
        displayName: data.userName,
        email: data.userEmail,
        phoneNumber: data.userPhone,
        role: data.userRole,
        userId: data.userId
      }

      dispatch(createOrEditPerson(newPerson));
      setTimeout(() => {
        navigate(`/people/${data.userId}`);
      }, 1000)
      return;
    }

    const editPerson = {};

    for (const key in dataTouched) {
      editPerson[key] = data[key];
    }

    dispatch(createOrEditPerson(editPerson));
      setTimeout(() => {
        navigate(`/people/${data.userId}`);
      }, 1000)
  }, [dispatch, id, navigate])

  const [
    formValues,
    onChangeForm,
    errors,
    isPristine,
    submitForm
  ] = useVerificationForm(initValues, validatePerson, submitFunction);

  return (
    <>
      {isLoading ? (
        <div>
          Loading
        </div>
      ) : (
        <Container>
          <Form onSubmit={submitForm}>
            <Row className="justify-content-md-center">
              <Col sm={12} md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder="Name"
                    name="userName"
                    type="text"
                    isInvalid={!isPristine && errors.userName}
                    value={formValues.userName}
                    onChange={onChangeForm}
                  />
                  {!isPristine && (
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
                    isInvalid={!isPristine && errors.userEmail}
                    value={formValues.userEmail}
                    onChange={onChangeForm}
                  />
                  {!isPristine && (
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
                    isInvalid={!isPristine && errors.userPhone}
                    value={formValues.userPhone}
                    onChange={onChangeForm}
                  />
                  {!isPristine && (
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
                    isInvalid={!isPristine && errors.userRole}
                    onChange={onChangeForm}
                  >
                    <option value="" disabled>
                      Select a value
                    </option>
                    <option value="Driver">Driver</option>
                    <option value="Passenger">Passenger</option>
                    <option value="Admin">Admin</option>
                  </Form.Select>
                  {!isPristine && (
                    <Form.Control.Feedback type="invalid">
                      {errors.userRole}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md={1}>
                <Button variant="success" type="submit">Save</Button>
              </Col>
            </Row>
          </Form>
        </Container>
      )}
    </>
  );
};
