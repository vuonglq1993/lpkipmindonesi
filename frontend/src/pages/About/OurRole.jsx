import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Row, Col, Container } from 'react-bootstrap';
import ContactSection from '../../components/contact';
import { Helmet } from "react-helmet";
import './About.css';
import { useLanguage } from '../../context/LanguageContext'; // ✅ dùng context

export default function OurRole() {
    const { language } = useLanguage(); // ✅ dùng context thay vì useState
    const [sections, setSections] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleContextMenu = (e) => {
          if (e.target.tagName === "IMG") {
            e.preventDefault();
          }
        };
      
        document.addEventListener("contextmenu", handleContextMenu);
      
        return () => {
          document.removeEventListener("contextmenu", handleContextMenu);
        };
      }, []);

      
    useEffect(() => {
        const fetchData = async () => {
            const colName = language === "en" ? "ourRole" : "ourRolejp";
            const querySnapshot = await getDocs(collection(db, colName));
            const data = {};
            querySnapshot.forEach((doc) => {
                data[doc.id] = doc.data();
            });
            setSections(data);
            setLoading(false);
        };

        fetchData();
    }, [language]);

    const renderTextFields = (section, className) => {
        return Object.entries(section)
            .filter(([key]) => key.startsWith("text"))
            .map(([key, value]) => (
                <p key={key} className={className}>{value}</p>
            ));
    };

    const renderSection = (sections) => (
        <>
        <Row className="r-01">
            {/* Section st01 */}

            <img src={sections.r01?.img} className="w-100" style={{ display: "block" }}  alt="" />
            {/* Section st02 */}
            <img src={sections.r02?.img} className="img-fluid"  alt="" />


            {/* Section st03 */}
            <img src={sections.r03?.img} className="img-fluid"  alt="" />


        </Row>
        </>
    );

    return (
        <>
            <Helmet>
                <title>Our Role - {language === "en" ? "English" : "Japanese"}</title>
                <meta name="description" content="Our company role content based on selected language" />
            </Helmet>

            <Container fluid className="px-0 mt-0 mb-0">
                {/* Header */}

                {loading ? (
                    <p className="text-center">⏳ Loading content...</p>
                ) : (
                    renderSection(sections)
                )}

                <ContactSection />
            </Container>
        </>
    );
}