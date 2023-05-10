import { useState } from "react";
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleToggle = () => setShow((s) => !s);

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
            <div className="d-flex flex-column">
              <Button
                as={Link}
                to="/login"
                variant="outline-dark"
                className="mb-4"
                onClick={handleClose}
              >
                Log In
              </Button>
              <Button
                variant="outline-dark"
                className="mb-4"
                onClick={handleClose}
              >
                Log out
              </Button>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
