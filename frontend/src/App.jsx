import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Nav, Container, Offcanvas, NavDropdown, Row, Col } from 'react-bootstrap';

import Home from "./pages/Home/Home";
import OurThoughts from "./pages/About/OurThoughts";
import OurStrength from "./pages/About/OurStrength";
import OurRole from "./pages/About/OurRole";
import NavigationBar from "./components/header";
import TechnicalInternTraining from "./pages/System/TechnicalInternTraining";
import SpeccificSkillSystem from "./pages/System/SpecificSkillSystem";
import Overview from "./pages/Overview/Overview";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import NewsDetail from "./pages/News/NewsDetails";
import Footer from "./components/footer";

import './App.css';
function App() {
  return (
    <Router>
      <div className="">

      <Row className="justify-content-center">
          <div className="d-flex flex-column min-vh-100">
            <NavigationBar />

            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mind" element={<OurThoughts />} />
                <Route path="/strength" element={<OurStrength />} />
                <Route path="/mission" element={<OurRole />} />
                <Route path="/regulation" element={<TechnicalInternTraining />} />
                <Route path="/skills" element={<SpeccificSkillSystem />} />
                <Route path="/overview" element ={<Overview />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<NewsDetail />}>NewsDetail</Route>


                {/* <Route path="/contact" element={<Contact />} /> */}
              </Routes>
            </main>
            <Footer />
          </div>
      </Row>
      </div>
    </Router>
    
  );
}

export default App;
