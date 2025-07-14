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
        <>
            {/* Section st01 */}
            <Row className="justify-content-center">
                <Col md={12}>
                    <Row className="justify-content-center">
                        <Col xs={10}>
                            <img src={sections.st01?.img1} className="img-fluid" alt="" />
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs={10}>
                            <img src={sections.st01?.img2} className="img-fluid" alt="" />
                        </Col>
                    </Row>
                    <Row className="mt-5 pb-5 justify-content-center">
                        <Col md={10}>
                            <p className="fs-1 text-center text-black">{sections.st01?.text1}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* Section st02 */}
            <Row className="mt-4 justify-content-center">
                <Col xs={10} md={8}>
                    <img src={sections.st02?.img} className="img-fluid" alt="" />
                </Col>
            </Row>

            {/* Section st03 */}
            {sections.st03 && (
                <Row className="st-03">
                    <Col>
                        <img src={sections.st03.img} className="img-fluid" alt="" />
                        {[1, 2, 3].map((i) => (
                            <>
                                {sections.st03[`text${i}`] && <p className="fs-2 mt-5">{sections.st03[`text${i}`]}</p>}
                                {sections.st03[`desc${i}`] && <p className="fs-6">{sections.st03[`desc${i}`]}</p>}
                            </>
                        ))}
                    </Col>
                </Row>
            )}

            {/* Section st04 */}
            {sections.st04 && (
                <Row className="st-04">
                    <Col md={6}></Col>
                    <Col md={6}>
                        <img src={sections.st04.img} className="img-fluid" alt="" />
                        {[1, 2, 3].map((i) => (
                            <>
                                {sections.st04[`text${i}`] && <p className="fs-2 mt-3 fw-bold">{sections.st04[`text${i}`]}</p>}
                                {sections.st04[`desc${i}`] && <p className="fs-6">{sections.st04[`desc${i}`]}</p>}
                            </>
                        ))}
                    </Col>
                </Row>
            )}

            {/* Section st05 */}
            {sections.st05 && (
                <Row className="st-05">
                    <Col>
                        <img src={sections.st05.img} className="img-fluid" alt="" />
                        {[1, 2, 3, 4].map((i) => (
                            <>
                                {sections.st05[`text${i}`] && <p className="fs-2 mt-3 fw-bold">{sections.st05[`text${i}`]}</p>}
                                {sections.st05[`desc${i}`] && <p className="fs-6">{sections.st05[`desc${i}`]}</p>}
                            </>
                        ))}
                    </Col>
                </Row>
            )}

            {/* Section st06 */}
            {sections.st06 && (
                <Row className="st-06 text-center justify-content-center">
                    <Col md={10}>
                        <div className="cycle-text-wrapper">
                            <p className="cycle-text">
                                {sections.st06.text1} <br />
                                {sections.st06.text2} <span className="highlight">{sections.st06.highlightText}</span>
                            </p>
                        </div>
                    </Col>
                </Row>
            )}

            {/* Section st07 */}
            {sections.st07 && (
                <Row className="st-07">
                    {[1, 2, 3, 4].map((i) => (
                        <Col md={5} key={i}>
                            <img src={sections.st07[`img${i}`]} className="img-fluid" alt="" />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );

    return (
        <Container className="py-5 bg-white">
            <Helmet>
                <title>Our Strength - {language === 'en' ? 'English' : 'Japanese'}</title>
                <meta name="description" content="Our company strength" />
            </Helmet>

            <Row className="about-head">
                <p className="text-center fs-1 mb-5">Our Strength</p>
            </Row>

            {loading ? <p className="text-center">Loading...</p> : renderSection(sections)}

            <ContactSection />
        </Container>
    );
}
