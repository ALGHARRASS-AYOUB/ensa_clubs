import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
    

function Header() {
  return (
    
   
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">ENSAF</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#features">Home</Nav.Link>
                <Nav.Link href="#pricing"> Actualités</Nav.Link>
                <NavDropdown title="Actions" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                   Evènement
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Clubs</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                 Réservations
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link href="#deets">Sign in</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                  login out
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
export default Header;