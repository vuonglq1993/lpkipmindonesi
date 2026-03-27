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
    <Navbar key="lg" expand="lg" className="mb-0">


      <Container fluid className="bg-white ps-2">
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center py-2">
          <img src={logo} alt="Logo" style={{ height: '36px', maxHeight: '5vh' }} className="me-2" />
          LPK IPM INDONESIA
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
              <Nav.Link as={Link} to="/" className={`me-3 ${isActive('/')}`}>
                {labels.home}
              </Nav.Link>
              <NavDropdown title={labels.about || "About"} id="about-dropdown" className="pe-3">
                <NavDropdown.Item as={Link} to="/strength" className={isActive('/strength')}>
                  {labels.strength}
                </NavDropdown.Item>
              <Nav.Link as={Link} to="/overview" className={`ms-2 ${isActive('/overview')}`}>
                {labels.overview}
              </Nav.Link>
              </NavDropdown>

              <NavDropdown title={labels.system || "System"} id="system-dropdown" className="me-3">
                <NavDropdown.Item as={Link} to="/regulation" className={isActive('/regulation')}>
                  {labels.intern}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/skills" className={isActive('/skills')}>
                  {labels.skill}
                </NavDropdown.Item>

                <NavDropdown title={labels.ourService || "Our Service"} id="our-service-dropdown" className="me-3, ms-2">
                  {labels.ourServiceItems && labels.ourServiceItems.map((item, index) => (
                    <NavDropdown.Item key={index} as={Link} to={`/our-service/${index}`}>
                      {item}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              </NavDropdown>



              <Nav.Link as={Link} to="/news" className={`me-3 ${isActive('/news')}`}>
                {labels.news}
              </Nav.Link>

              <Nav.Link as={Link} to="/recruitment" className={`me-3 ${isActive('/recruitment')}`}>
                {labels.recruitment}
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

