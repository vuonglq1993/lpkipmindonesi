import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Row, Col, Container } from 'react-bootstrap';
import ContactSection from '../../components/contact';
import { Helmet } from 'react-helmet';
import { useLanguage } from '../../context/LanguageContext';

export default function OurThoughts() {
    const { language } = useLanguage();
    const [sections, setSections] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const colName = language === 'en' ? 'ourThoughts' : 'ourThoughtsjp';
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
            {/* Section t01 */}
            {sections.t01 && (
                <Row className="justify-content-center">
                    <Col md={12}>
                        <Row className="justify-content-center">
                            <Col xs={10}>
                                <img
                                    src={sections.t01.img}
                                    className="passion-img img-fluid"
                                    alt="Main Visual"
                                />
                            </Col>
                        </Row>
                        <Row className="mt-5 passion-text">
                            <p className="fs-1 text-center text-black">{sections.t01.text1}</p>
                            <p className="fs-1 text-center text-black">{sections.t01.text2}</p>
                        </Row>
                    </Col>
                </Row>
            )}

            {/* Section t02 */}
            {sections.t02 && (
                <Row className="mt-4 justify-content-center">
                    <Col xs={10} md={8}>
                        <img
                            src={sections.t02.img}
                            className="img-fluid"
                            alt="Quote Visual"
                        />
                    </Col>
                </Row>
            )}

            {/* Section t03 */}
            {sections.t03 && (
                <Row className="PA-04">
                    <Col>
                        <h1>{sections.t03.bigtext}</h1>
                        {sections.t03.text1 && <p className="fs-3">{sections.t03.text1}</p>}
                        {sections.t03.text2 && <p className="fs-3">{sections.t03.text2}</p>}
                        {sections.t03.text3 && <p className="fs-3">{sections.t03.text3}</p>}
                        {sections.t03.text4 && <p className="fs-3">{sections.t03.text4}</p>}
                    </Col>
                </Row>
            )}

            {/* Section t04 */}
            {sections.t04 && (
                <Row className="PA-05">
                    <Col>
                        <h1 className="mb-5">{sections.t04.bigtext}</h1>
                        {sections.t04.boldtext1 && <p className="fs-3 fw-bold">{sections.t04.boldtext1}</p>}
                        {sections.t04.boldtext2 && <p className="fs-3 fw-bold">{sections.t04.boldtext2}</p>}
                        {sections.t04.smalltext && <p className="fs-6">{sections.t04.smalltext}</p>}
                        {sections.t04.text1 && <p className="fs-3">{sections.t04.text1}</p>}
                        {sections.t04.text2 && <p className="fs-3">{sections.t04.text2}</p>}
                        {sections.t04.text3 && <p className="fs-3">{sections.t04.text3}</p>}
                    </Col>
                </Row>
            )}
        </>
    );

    return (
        <Container className="py-5 bg-white">
            <Helmet>
                <title>Our Thoughts - {language === 'en' ? 'English' : 'Japanese'}</title>
                <meta name="description" content="Company beliefs and philosophies" />
            </Helmet>

            <Row className="about-head">
                <p className="text-center fs-1 mb-5">Our Thoughts</p>
            </Row>

            {loading ? <p className="text-center">Loading...</p> : renderSection(sections)}

            <ContactSection />
        </Container>
    );
}
