import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Row } from 'react-bootstrap';

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
import Recruitment from "./pages/Recruitment/Recruitment";
import NewsDetail from "./pages/News/NewsDetails";
import RecruitmentDetail from "./pages/Recruitment/RecruitmentDetails";
import ComprehensiveSupportforMarketEntryintoIndonesia from "./pages/System/Service/Service4";
import JapaneseLanguageCultureEducation from "./pages/System/Service/Service1";
import DispatchofIndonesianTechnicalInternTrainees from "./pages/System/Service/Service2";
import DomesticRecruitmentofIndonesianTalent from "./pages/System/Service/Service3";
import SpecifiedSkilledWorkerDispatchfromIndonesia from "./pages/System/Service/Service5";
import Footer from "./components/footer";

import './App.css';
function App() {
  return (
    <Router>

      <Row className="justify-content-center">
          <div className="d-flex flex-column min-vh-100">
            <NavigationBar />

            <main className="flex-grow-1 bg-white">
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
                <Route path="/news/:id" element={<NewsDetail />} />
                <Route path="/recruitment" element={<Recruitment />} />
                <Route path="/recruitment/:id" element={<RecruitmentDetail />} />
                <Route path="/our-service/3" element={<ComprehensiveSupportforMarketEntryintoIndonesia />} />
                <Route path="/our-service/0" element={<JapaneseLanguageCultureEducation />} />
                <Route path="/our-service/1" element={<DispatchofIndonesianTechnicalInternTrainees />} />
                <Route path="/our-service/2" element={<DomesticRecruitmentofIndonesianTalent />} />
                <Route path="/our-service/4" element={<SpecifiedSkilledWorkerDispatchfromIndonesia />} />
                {/* <Route path="/contact" element={<Contact />} /> */}
              </Routes>
            </main>
            <Footer />
          </div>
      </Row>
    </Router>
    
  );
}

export default App;
