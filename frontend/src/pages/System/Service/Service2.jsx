import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Row, Container } from 'react-bootstrap';
import ContactSection from '../../../components/contact';
import { Helmet } from 'react-helmet';
import { useLanguage } from '../../../context/LanguageContext';
import './Service.css';


export default function DispatchofIndonesianTechnicalInternTrainees() {
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
            const contentCol = language === 'en' ? 'sv2en' : 'sv2jp';

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
                <title>Dispatch of Indonesian Technical Intern Trainees - {language === 'en' ? 'English' : 'Japanese'}</title>
                <meta name="description" content="Dispatch of Indonesian Technical Intern Trainees" />
            </Helmet>


            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <>
                    {/* Section sv201 */}
                    {sections.sv201 && (
                        <>
                            <img src={sections.sv201?.img} className="w-100" style={{ display: "block" }} alt="" />
                        </>
                    )}

                    {/* Section sv202 */}
                    {sections.sv202 && (
                        <img src={sections.sv202?.img} className="w-100" style={{ display: "block" }} alt="" />

                    )}

                    {/* Section sv203 */}
                    {sections.sv203 && (
                        <img src={sections.sv203?.img} className="w-100" style={{ display: "block" }} alt="" />

                    )}


                </>
            )}

            <ContactSection />
        </Container>
    );
}
