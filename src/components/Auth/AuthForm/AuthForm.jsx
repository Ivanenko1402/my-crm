import { Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';

export const AuthForm = ({
  currentPage,
  isLoading,
  isPristine,
  formValues,
  errors,
  onChangeForm,
  submitForm,
}) => {
  return (
    <div className='d-block modal position-static'>
      <Modal.Dialog className='window'>
        <Modal.Header>
          <Modal.Title>
            {currentPage ? 'Login...' : 'Create an account...'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitForm}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="example@example.com"
              type="email"
              name="email"
              isInvalid={!isPristine && errors.email}
              value={formValues.email}
              onChange={onChangeForm}
            />
            {!isPristine && (
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            )}
          </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder='Password'
                type='password'
                name='password'
                isInvalid={!isPristine && errors.password}
                value={formValues.password}
                onChange={onChangeForm}
              />
              {!isPristine && (
                <Form.Control.Feedback type='invalid'>
                  {errors.password}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {!currentPage && (
              <>
                <Form.Group className='mb-3'>
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='First name'
                    name='displayName'
                    isInvalid={!isPristine && errors.displayName}
                    value={formValues.displayName}
                    onChange={onChangeForm}
                  />
                  {!isPristine && (
                    <Form.Control.Feedback type='invalid'>
                      {errors.displayName}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control
                    type='phone'
                    placeholder='Phone number'
                    name='phoneNumber'
                    isInvalid={!isPristine && errors.phoneNumber}
                    value={formValues.phoneNumber}
                    onChange={onChangeForm}
                  />
                  {!isPristine && (
                    <Form.Control.Feedback type='invalid'>
                      {errors.phoneNumber}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </>
            )}
            <Button
              variant='primary'
              type='submit'
              disabled={isLoading}
            >
              {isLoading? 'Loading...' : 'Submit'}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {currentPage ? (
            <Link to='/registr'>Create an account</Link>
          ) : (
            <Link to='/login'>I have an account</Link>
          )}
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};
