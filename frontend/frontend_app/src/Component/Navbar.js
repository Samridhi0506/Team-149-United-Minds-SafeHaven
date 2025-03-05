import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


export default function CustomNavbar() {
  const location = useLocation(); // Get the current page path

  return (
    <header className="w-100">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
            SafeHaven <span className="text-warning">🛡</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto gap-3">
              <Nav.Link as={Link} to="/" className={location.pathname === "/" ? "active" : ""}>
                Home
              </Nav.Link>

              <Nav.Link as={Link} to="/" className={location.pathname === "/" ? "active" : ""}>
                About us
              </Nav.Link>

              <NavDropdown title="Resources" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/stories" className={location.pathname === "/stories" ? "active" : ""}>
                  Real Story
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/" className={location.pathname === "/" ? "active" : ""}>
                  Safety Tips
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/" className={location.pathname === "/" ? "active" : ""}>
                  Emergency Contacts
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={Link} to="/" className={location.pathname === "/" ? "active" : ""}>
                Contact Us
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="./pages/MapPage"
                className={location.pathname.startsWith("./pages/MapPage") ? "active" : ""}
              >
                Live Location
              </Nav.Link>


              <Nav.Link as={Link} to="./pages/Login" id="login" className={location.pathname === "./pages/Login" ? "active" : ""}>
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}