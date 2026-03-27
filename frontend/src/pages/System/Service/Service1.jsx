import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Row, Container } from 'react-bootstrap';
import ContactSection from '../../../components/contact';
import { Helmet } from 'react-helmet';
import { useLanguage } from '../../../context/LanguageContext';
import './Service.css';


export default function JapaneseLanguageCultureEducation() {
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
            const contentCol = language === 'en' ? 'sv4en' : 'sv4jp';

            // Load sections
            const contentSnap = await getDocs(collection(db, contentCol));
            const contentData = {};
            contentSnap.forEach((doc) => {
                contentData[doc.id] = doc.data();
            });


            setSections(contentData);
            setLoading(false);
        };

        fetchData();
    }, [language]);

    return (
        <Container fluid className="px-0 s01">
            <Helmet>
                <title>Japanese Language & Culture Education - {language === 'en' ? 'English' : 'Japanese'}</title>
                <meta name="description" content="Japanese Language & Culture Education" />
            </Helmet>


            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <>
                        <Row className="service-head">
                            <h1 className="text-white text-center fs-1 mb-5">{language === 'en' ? 'Japanese Language & Culture Education' : '日本語・日本文化教育'}</h1>
                        </Row>
                    {/* Section sv401 */}
                    {sections.sv401 && (
                        <>
                        <img src={sections.sv401?.img} className="w-100" style={{ display: "block" }}  alt="" />
                        </>
                    )}



                </>
            )}

            <ContactSection />
        </Container>
    );
}
