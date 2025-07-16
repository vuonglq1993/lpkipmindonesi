import { useEffect, useState } from 'react';
import { Navbar, Nav, Offcanvas, NavDropdown, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import logo from '../assets/LPKPMINDONESIA.png';
import LanguageSwitcherNav from './LanguageSwitcher';

export default function NavigationBar() {
  const { language } = useLanguage();
  const location = useLocation();
  const [labels, setLabels] = useState({});

  useEffect(() => {
    const fetchLabels = async () => {
      const collectionName = language === 'en' ? 'navigation' : 'navigationjp';
      const snap = await getDoc(doc(db, collectionName, 'menu'));
      if (snap.exists()) {
        setLabels(snap.data());
      }
    };
    fetchLabels();
  }, [language]);

  const isActive = (path) => location.pathname === path ? 'fw-bold text-primary' : '';

  return (
    <Navbar key="lg" expand="lg" fixed="top" bg="light" className="shadow-sm">
      <Container className="bg-white">
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center py-2">
          <img src={logo} alt="Logo" style={{ height: '36px', maxHeight: '5vh' }} className="me-2" />
          LPK IPM Indonesia
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
        <Navbar.Offcanvas id="offcanvasNavbar-expand-lg" placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              {labels.menu || "Menu"}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <NavDropdown title={labels.about || "About"} id="about-dropdown" className="me-3">
                <NavDropdown.Item as={Link} to="/mind" className={isActive('/mind')}>
                  {labels.thoughts}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/strength" className={isActive('/strength')}>
                  {labels.strength}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/mission" className={isActive('/mission')}>
                  {labels.mission}
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title={labels.system || "System"} id="system-dropdown" className="me-3">
                <NavDropdown.Item as={Link} to="/regulation" className={isActive('/regulation')}>
                  {labels.intern}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/skills" className={isActive('/skills')}>
                  {labels.skill}
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={Link} to="/overview" className={`me-3 ${isActive('/overview')}`}>
                {labels.overview}
              </Nav.Link>

              <Nav.Link as={Link} to="/news" className={`me-3 ${isActive('/news')}`}>
                {labels.news}
              </Nav.Link>

              <Nav.Link as={Link} to="/contact" className={`me-3 ${isActive('/contact')}`}>
                {labels.contact}
              </Nav.Link>

              <div className="d-flex align-items-center ms-3">
                <LanguageSwitcherNav />
              </div>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
