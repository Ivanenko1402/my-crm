import { Col, Container, Form, Row, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../../Hooks/useForm";
import { validatePerson } from "./validatePerson";
import { useEffect } from "react";
import { createPerson, getTargetPerson, updatePerson } from "../../../store/slices/peopleSlice";

function initPersonForm(data = {}) {
  return {
    userName: data?.userName ?? "",
    userEmail: data?.userEmail ?? "",
    userPhone: data?.userPhone || "",
    userRole: data?.userRole || "",
    id:
      data?.id ||
      Number(new Date().toLocaleTimeString().split(":").join("")),
  };
};

export const PersonEntity = () => {
  const { targetPerson, isLoading, showSpiner } = useSelector((state) => state.people);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== 'new') {
      dispatch(getTargetPerson(id));
    }
  }, [dispatch, id]);

  const [
    formValues,
    onChangeForm,
    errors,
    isPristine,
    submitForm,
    formValuesTouched,
  ] = useForm({
      data: targetPerson,
      initData: initPersonForm,
      validateForm: validatePerson,
      submitForm: submitFunction,
    });

  function submitFunction() {
    if (id === "new") {
      dispatch(createPerson(formValues));
      navigate(`/people/${formValues.id}`);
      return;
    }

    dispatch(updatePerson(formValuesTouched));
  }

  return (
    <>
      {showSpiner ? (
        <div className='d-flex justify-content-center align-items-center h-100 w-100'>
          <Spinner animation="border" role="status" />
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
                <Button
                  variant="success"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading' : 'Save'}
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      )}
    </>
  );
};
