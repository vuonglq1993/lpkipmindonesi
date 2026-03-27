import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Row, Col, Container } from 'react-bootstrap';
import ContactSection from '../../components/contact';
import { Helmet } from 'react-helmet';
import { useLanguage } from '../../context/LanguageContext';

export default function OurStrength() {
    const { language } = useLanguage();
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
            const colName = language === 'en' ? 'ourStrength' : 'ourStrengthjp';
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

    const renderSection = (sections) => (
        <Row className="st-01">
            {/* Section st01 */}

            <img src={sections.st01?.img1} className="w-100" style={{ display: "block" }}  alt="" />
            {/* Section st02 */}
            <img src={sections.st02?.img} className="img-fluid"  alt="" />


            {/* Section st03 */}
            <img src={sections.st03?.img} className="img-fluid"  alt="" />


        </Row>
    );

    return (
        <Container fluid className="px-0">
            <Helmet>
                <title>Our Strength - {language === 'en' ? 'English' : 'Japanese'}</title>
                <meta name="description" content="Our company strength" />
            </Helmet>


            {loading ? <p className="text-center">Loading...</p> : renderSection(sections)}

            <ContactSection />
        </Container>
    );
}
