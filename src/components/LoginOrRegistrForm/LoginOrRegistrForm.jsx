import { Link, useLocation  } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { useCheckedLoginForm } from '../../Hooks/useCheckedLoginForm';

export const LoginOrRegistrForm = () => {
  const params = useLocation();
  const currentPage = params.pathname === '/login'
  const [formField, onChangeForm, errors] = useCheckedLoginForm(currentPage);

  return (
    <div className="d-block modal position-static">
      <Modal.Dialog className='window'>
        <Modal.Header>
          <Modal.Title>{
            currentPage
              ? 'Login...'
              : 'Create an account...'
          }</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={onChangeForm}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                isInvalid={errors.email}
                value={formField.email}
                onChange={onChangeForm}
              />
              {errors.email && (
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                isInvalid={errors.password}
                value={formField.password}
                onChange={onChangeForm}
              />
              {errors.password && (
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>)}
            </Form.Group>

            {!currentPage && (
              <>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First name"
                    name="displayName"
                    isInvalid={errors.displayName}
                    value={formField.displayName}
                    onChange={onChangeForm}
                  />
                  {errors.displayName && (
                    <Form.Control.Feedback type="invalid">
                      {errors.displayName}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control
                    type="phone"
                    placeholder="Phone number"
                    name="phoneNumber"
                    isInvalid={errors.phoneNumber}
                    value={formField.phoneNumber}
                    onChange={onChangeForm}
                  />
                  {errors.phoneNumber && (
                    <Form.Control.Feedback type="invalid">
                      {errors.phoneNumber}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </>
            )}
            <Button
              variant="primary"
              type="submit"
            >
              {formField.isLoading ? 'Loading...' : 'Submit'}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {currentPage ? (
            <Link to='/registr'>
              Create an account
            </Link>
          ) : (
          <Link to='/login'>
             I have an account
          </Link>
          )}
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  )
}
