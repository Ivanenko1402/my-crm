import { Link, useLocation  } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

export const LoginOrRegistrForm = () => {
  const params = useLocation();
  const currentPage = params.pathname === '/login'

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false)
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false)
  const [displayName, setDisplayName] = useState('');
  const [displayNameError, setDisplayNameError] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');

  const resetErrors = () => {
    setEmailError(false);
    setPasswordError(false);
    setDisplayNameError(false);
    setPhoneNumberError(false);
    setErrorMessage('');
  }

  const checkLogin = (arg) => {
    if (!email) {
      setEmailError(true);
      setErrorMessage('Поле є обов\'язковим')
      return false;
    }

    if (password.length < 6) {
      setPasswordError(true);
      setErrorMessage('Пароль не менше 6 символів')
      return false;
    }

    if (arg) {
      if (!email) {
        setEmailError(true);
        setErrorMessage('Поле є обов\'язковим')
        return false;
      }
      
      if (password.length < 6) {
        setPasswordError(true);
        setErrorMessage('Пароль не менше 6 символів')
        return false;
      }

      if (displayName.length < 4) {
        console.log('error')
        setDisplayNameError(true);
        setErrorMessage('Ім\'я не менше 4 символів')
        return false;
      }

      if (phoneNumber.length < 9) {
        setPhoneNumberError(true);
        setErrorMessage('Телефон не менше 9 символів')
        return false;
      }
    }

    return true;
  }

  const submitForm = () => {
    resetErrors();

    if (currentPage) {
      if (!checkLogin(false)) {
        return;
      }
    } else {
      if (!checkLogin(true)) {
        return;
      }
    }
  }
  
  return (
    <div className="modal position-static d-block">
      <Modal.Dialog className='window'>
        <Modal.Header>
          <Modal.Title>{
            currentPage
              ? 'Login...'
              : 'Create an account...'
          }</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={(event) => {
            event.preventDefault();
            submitForm();
          }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                isInvalid={emailError}
                value={email}
                onChange={(event) => setEmail(event.target.value.trim())}
              />
              {emailError && (
                <Form.Control.Feedback type="invalid">
                  {errorMessage}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                isInvalid={passwordError}
                value={password}
                onChange={(event) => setPassword(event.target.value.trim())}
              />
              {passwordError && (
              <Form.Control.Feedback type="invalid">
                {errorMessage}
              </Form.Control.Feedback>)}
            </Form.Group>

            {!currentPage && (
              <>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First name"
                    required
                    isInvalid={displayNameError}
                    value={displayName}
                    onChange={(event) => setDisplayName(event.target.value.trim())}
                  />
                  {displayNameError && (
                    <Form.Control.Feedback type="invalid">
                      {errorMessage}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control
                    type="phone"
                    placeholder="Phone number"
                    required
                    isInvalid={phoneNumberError}
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value.trim())}
                  />
                  {phoneNumberError && (
                    <Form.Control.Feedback type="invalid">
                      {errorMessage}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </>
            )}
            <Button
              variant="primary"
              type="submit"
            >
              Submit
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
