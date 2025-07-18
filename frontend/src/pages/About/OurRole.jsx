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
            {/* r01 */}
            {sections.r01 && (
                <Row className="justify-content-center ms-01">
                    <Col md={12}>
                        <Row className="justify-content-center">
                            <Col xs={10}>
                                <img src={sections.r01.img} className="img-fluid" alt="" />
                            </Col>
                        </Row>
                        <Row className="mt-5 pb-5">
                            <p className="fs-1 text-center text-black">{sections.r01.text}</p>
                        </Row>
                    </Col>
                </Row>
            )}

            {/* r02 + r03 */}
            {sections.r02 && (
                <>
                    <Row className="mt-4 justify-content-center text-center">
                        <Col xs={10} md={8}>
                            {sections.r02.img && (
                                <img src={sections.r02.img} className="img-fluid" alt="" />
                            )}
                        </Col>
                    </Row>

                    <Row className="ms-02 text-center">
                        <Col>
                            <h1>{sections.r02.bigtext}</h1>
                            {renderTextFields(sections.r02, "fs-2 mt-2")}
                        </Col>
                    </Row>
                </>
            )}

            {/* r04 */}
            {sections.r03 && (
                <Row className="ms-03 justify-content-center text-center">
                    <Col md={10}>
                        <img src={sections.r03.img} className="img-fluid" alt="" />
                    </Col>
                </Row>
            )}

            {/* r05 */}
            {sections.r04 && (
                <Row className="ms-04 justify-content-center text-center pb-5">
                    <Col md={7}>
                        <img src={sections.r04.img} className="img-fluid" alt="" />
                        <p className="fs-1 mt-5 mb-5">{sections.r04.text}</p>
                    </Col>
                </Row>
            )}

            {/* r06 */}
            {sections.r05 && (
                <Row className="ms-05">
                    <Col>
                        <h1>{sections.r05.bigtext}</h1>
                        {renderTextFields(sections.r05, "fs-1 mt-3")}
                    </Col>
                </Row>
            )}

            {/* r07 */}
            {sections.r06 && (
                <Row className="ms-06 text-center justify-content-center">
                    <Col md={10}>
                        <img src={sections.r06.img} className="img-fluid" alt="" />
                    </Col>
                </Row>
            )}
        </>
    );

    return (
        <>
            <Helmet>
                <title>Our Role - {language === "en" ? "English" : "Japanese"}</title>
                <meta name="description" content="Our company role content based on selected language" />
            </Helmet>

            <Container className="py-5 bg-white">
                {/* Header */}
                <Row className="about-head">
                <h1 className="text-white text-center fs-1 mb-5">{language === 'en' ? 'Our Role' : '私たちの役割'}</h1>
                </Row>

                {loading ? (
                    <p className="text-center">⏳ Loading content...</p>
                ) : (
                    renderSection(sections)
                )}

                {/* Contact */}
                <ContactSection />
            </Container>
        </>
    );
}