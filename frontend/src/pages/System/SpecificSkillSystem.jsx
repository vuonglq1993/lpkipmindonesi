import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Row, Col, Container, Table } from 'react-bootstrap';
import ContactSection from '../../components/contact';
import { Helmet } from 'react-helmet';
import { useLanguage } from '../../context/LanguageContext';
import './System.css';


export default function SpecificSkillSystem() {
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
            const contentCol = language === 'en' ? 'skillSystem' : 'skillSystemjp';

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
                <title>Specific Skill System - {language === 'en' ? 'English' : 'Japanese'}</title>
                <meta name="description" content="Specific Skill System" />
            </Helmet>


            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <>
                    {/* Section sk01 */}
                    {sections.sk01 && (
                        <>
                        <img src={sections.sk01?.img} className="w-100" style={{ display: "block" }}  alt="" />
                        </>
                    )}

                    {/* Section sk02 */}
                    {sections.sk02 && (
                        <img src={sections.sk02?.img} className="w-100" style={{ display: "block" }}  alt="" />

                    )}

                    {/* Section sk03 */}
                    {sections.sk03 && (
                        <img src={sections.sk03?.img} className="w-100" style={{ display: "block" }}  alt="" />

                    )}

                    {/* Section sk04 */}
                    {sections.sk04 && (
                        <img src={sections.sk04?.img} className="w-100" style={{ display: "block" }}  alt="" />

                    )}
                    {sections.sk05 && (
                        <img src={sections.sk05?.img} className="w-100" style={{ display: "block" }}  alt="" />

                    )}

                    {sections.sk06 && (
                        <img src={sections.sk06?.img} className="w-100" style={{ display: "block" }}  alt="" />

                    )}
                </>
            )}
                                        {/* PDF Viewer */}
                            <div className="pdf-viewer-wrapper">
                                <iframe
                                    src="/docs/giay-phep1.pdf"
                                    className="pdf-viewer-frame"
                                    title="Giấy phép kinh doanh"
                                />
                            </div>

            <ContactSection />
        </Container>
    );
}
