import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Row, Container } from 'react-bootstrap';
import ContactSection from '../../../components/contact';
import { Helmet } from 'react-helmet';
import { useLanguage } from '../../../context/LanguageContext';
import './Service.css';

export default function DomesticRecruitmentofIndonesianTalent() {
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
            const contentCol = language === 'en' ? 'sv3en' : 'sv3jp';

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
                <title>Domestic Recruitment of Indonesian Talent - {language === 'en' ? 'English' : 'Japanese'}</title>
                <meta name="description" content="Domestic Recruitment of Indonesian Talent" />
            </Helmet>


            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <>
                    {/* Section sv301 */}
                    {sections.sv301 && (
                        <>
                        <img src={sections.sv301?.img} className="w-100" style={{ display: "block" }}  alt="" />
                        </>
                    )}
                    {/* Section sv302 */}
                    {sections.sv302 && (
                        <>
                        <img src={sections.sv302?.img} className="w-100" style={{ display: "block" }}  alt="" />
                        </>
                    )}



                </>
            )}

            <ContactSection />
        </Container>
    );
}
