import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Row, Container } from 'react-bootstrap';
import ContactSection from '../../../components/contact';
import { Helmet } from 'react-helmet';
import { useLanguage } from '../../../context/LanguageContext';
import './Service.css';

export default function SpecifiedSkilledWorkerDispatchfromIndonesia() {
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
            const contentCol = language === 'en' ? 'sv5en' : 'sv5jp';

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
                <title>Specified Skilled Worker Dispatch from Indonesia - {language === 'en' ? 'English' : 'Japanese'}</title>
                <meta name="description" content="Specified Skilled Worker Dispatch from Indonesia" />
            </Helmet>
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <>
                    {/* Section sv501 */}
                    {sections.sv501 && (
                        <>
                            <img src={sections.sv501?.img} className="w-100" style={{ display: "block" }} alt="" />
                        </>
                    )}

                    {/* Section sv502 */}
                    {sections.sv502 && (
                        <>
                            <img src={sections.sv502?.img} className="w-100" style={{ display: "block" }} alt="" />
                        </>
                    )}

                </>
            )}

            <ContactSection />
        </Container>
    );
}
