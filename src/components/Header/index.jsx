import { useState } from "react";
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutAuth } from "../../store/slices/authSlice";

export function Header() {
  const [show, setShow] = useState(false);
  const { auth } = useSelector(store => store.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleToggle = () => setShow((s) => !s);

  const handleLogOut = () => {
    dispatch(logoutAuth());
    navigate('/login');
  }

  return (
    <Navbar
      bg="light"
      expand={false}
      className="mb-4"
    >
      <Container>
        <Navbar.Toggle onClick={handleToggle} />
        <Navbar.Brand>
          {`Hi, ${auth?.displayName}`}
        </Navbar.Brand>
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
            {auth ? (
              <Button
                variant="outline-dark"
                className="mb-4"
                onClick={handleLogOut}
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
