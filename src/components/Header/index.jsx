import { getAuth, signOut } from "firebase/auth";
import { useCallback, useState } from "react";
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export function Header() {
  const [show, setShow] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleToggle = () => setShow((s) => !s);

  const logOut = useCallback(async () => {
    await signOut(auth)
      .then(() => {
        navigate('/login');
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  return (
    <Navbar
      bg="light"
      expand={false}
      className="mb-4"
    >
      <Container>
        <Navbar.Toggle onClick={handleToggle} />
        <Navbar.Brand>User name</Navbar.Brand>
        <Navbar.Offcanvas
          placement="start"
          show={show}
          onHide={handleClose}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Navigation</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-column justify-content-between">
            <Nav>
              <Nav.Link as={Link} to="/" onClick={handleClose}>
                People
              </Nav.Link>
              <Nav.Link as={Link} to="/trips" onClick={handleClose}>
                Trips
              </Nav.Link>
            </Nav>
            {auth.currentUser ? (
              <Button
                variant="outline-dark"
                className="mb-4"
                onClick={logOut}
              >
                Log out
              </Button>
            ) : (
              <Button
                as={Link}
                to="/login"
                variant="outline-dark"
                className="mb-4"
                onClick={handleClose}
              >
                Log In
              </Button>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
