import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Container, Row, Col, Table } from 'react-bootstrap';
import ContactSection from '../../components/contact';
import { Helmet } from 'react-helmet';
import { useLanguage } from '../../context/LanguageContext';

export default function TechnicalInternTraining() {
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
            const contentCol = language === 'en' ? 'technicalItern' : 'technicalInternjp';

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
                <title>Technical Intern Training Program - {language === 'en' ? 'English' : 'Japanese'}</title>
                <meta name="description" content="Technical Intern Training Program" />
            </Helmet>


            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <>
                    {/* Section ti01 */}
                    {sections.ti01 && (
                        
                            <img src={sections.ti01?.img} className="w-100" style={{ display: "block" }} alt="" />
            
                    )}

                    {/* Section ti02 */}
                    {sections.ti02 && (
                        <img src={sections.ti02?.img} className="w-100" style={{ display: "block" }} alt="" />

                    )}

                    {/* Section ti03 */}
                    {sections.ti03 && (
                        <img src={sections.ti03?.img} className="w-100" style={{ display: "block" }} alt="" />

                    )}

                    {/* Section ti04 */}
                    {sections.ti04 && (
                        <img src={sections.ti04?.img} className="w-100" style={{ display: "block" }} alt="" />

                    )}

                                        {/* Section ti05 */}
                    {sections.ti05 && (
                        <img src={sections.ti05?.img} className="w-100" style={{ display: "block" }} alt="" />

                    )}

                </>
            )}

            <ContactSection />
        </Container>
    );
}
