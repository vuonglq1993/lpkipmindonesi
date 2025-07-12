import { Navbar, Nav, Offcanvas, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/LPKPMINDONESIA.png';

export default function NavigationBar() {
    return (
        <Navbar key="lg" expand="lg" className="mb-3">
            <Container className="bg-white">
                <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center py-3">
                    <img
                        src={logo}
                        alt="Logo"
                        height="40"
                        className="d-inline-block align-top"
                    />
                    LPK IPM Indonesia
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar-expand-lg"
                    aria-labelledby="offcanvasNavbarLabel-expand-lg"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                            Menu
                        </Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <NavDropdown title="About Us" id="about-dropdown" className="me-3">
                                <NavDropdown.Item as={Link} to="/mind">Our thoughts</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/strength">Our Strength</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/mission">Our role</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="About the system" id="system-dropdown" className="me-3">
                                <NavDropdown.Item as={Link} to="/regulation">Technical Intern Training Program</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/skills">Specific Skill System</NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link as={Link} to="/overview" className="me-3">Union Overview</Nav.Link>
                            <Nav.Link as={Link} to="/news" className="me-3">News</Nav.Link>
                            <Nav.Link as={Link} to="/contact" className="me-3">Contact</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container> 
        </Navbar>
    );
}
