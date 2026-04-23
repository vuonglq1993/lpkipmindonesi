import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Row, Container } from 'react-bootstrap';
import ContactSection from '../../../components/contact';
import { Helmet } from 'react-helmet';
import { useLanguage } from '../../../context/LanguageContext';
import './Service.css';

export default function ComprehensiveSupportforMarketEntryintoIndonesia() {
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
            const contentCol = language === 'en' ? 'sv1en' : 'sv1jp';

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
                <title>Comprehensive Support for Market Entry into Indonesia - {language === 'en' ? 'English' : 'Japanese'}</title>
                <meta name="description" content="Comprehensive Support for Market Entry into Indonesia" />
            </Helmet>


            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <>
                    {/* Section sv101 */}
                    {sections.sv101 && (
                        <>
                        <img src={sections.sv101?.img} className="w-100" style={{ display: "block" }}  alt="" />
                        </>
                    )}

                    {/* Section sv102 */}
                    {sections.sv102 && (
                        <img src={sections.sv102?.img} className="w-100" style={{ display: "block" }}  alt="" />

                    )}

                    {/* Section sv103 */}
                    {sections.sv103 && (
                        <img src={sections.sv103?.img} className="w-100" style={{ display: "block" }}  alt="" />

                    )}

                    {/* Section sv104 */}
                    {sections.sv104 && (
                        <img src={sections.sv104?.img} className="w-100" style={{ display: "block" }}  alt="" />

                    )}


                    {/* Section sv105 */}
                    {sections.sv105 && (
                        <img src={sections.sv105?.img} className="w-100" style={{ display: "block" }}  alt="" />

                    )}

                </>
            )}


            <ContactSection />
        </Container>
    );
}
