import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from "react-router-dom";

import './Home.css';

export default function Home() {
    const { language } = useLanguage();
    const [content, setContent] = useState(null);

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
            const col = language === 'en' ? 'home' : 'homejp';

            const bannerSnap = await getDoc(doc(db, col, 'banner'));
            const h01Snap = await getDoc(doc(db, col, 'h01'));
            const h02Snap = await getDoc(doc(db, col, 'h02'));
            const h03Snap = await getDoc(doc(db, col, 'h03'));
            const h04Snap = await getDoc(doc(db, col, 'h04'));
            const h05Snap = await getDoc(doc(db, col, 'h05'));
            const h06Snap = await getDoc(doc(db, col, 'h06'));
            const h07Snap = await getDoc(doc(db, col, 'h07'));

            setContent({
                banner: bannerSnap.data(),
                h01: h01Snap.data(),
                h02: h02Snap.data(),
                h03: h03Snap.data(),
                h04: h04Snap.data(),
                h05: h05Snap.data(),
                h06: h06Snap.data(),
                h07: h07Snap.data()
            });
        };
        fetchData();
    }, [language]);

    if (!content) return null;

    return (
        <Container fluid className="home-head pt-5 bg-white">
            <Row className="justify-content-center">
                {/* Slide */}
                <div className="banner">
                    <Container>
                        <Col sm={12} lg={6}>
                            <p className="fs-1 fw-bold ms-4 text-white">{content.banner.title}</p>
                            <p className="fs-4 ms-4 fw-lighter text-black">{content.banner.description}</p>

                        </Col>
                    </Container>

                </div>

                {/* H01 */}
                <Row className="py-5 text-center justify-content-center">
                    <Col md={10}>
                        <p className="fs-3">{content.h01.text1}</p>
                        <p className="fs-3">{content.h01.text2}</p>
                        <p className="fs-3">{content.h01.text3}</p>
                        <p className="fs-3">{content.h01.text4}</p>
                        <p className="fs-3">{content.h01.text5}</p>
                    </Col>
                </Row>


                {/* H03 */}
                <div className="h03 pt-3">
                    <Row className="py-2 justify-content-center my-5">
                        <p
                            className="fs-1 fw-bold mb-5 text-center"
                            style={{ color: "#0171de" }}
                        >
                            {content.h03.title}
                        </p>
                        <Col sm={3} className="mt-2">
                            <Card className="h-100 d-flex flex-column py-1"
                                style={{
                                    borderRadius: '15px',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                    backgroundColor: '#f4f8ff',
                                }}>
                                <Card.Body className="px-0 d-flex flex-column">
                                    <div style={{ textAlign: 'start' }}>
                                        <img
                                            src={content.h03.icon1}
                                            alt="icon"
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                    </div>
                                    <Card.Title className="text-start mt-4" style={{ fontWeight: 'bold', color: '#0171de', textAlign: 'center' }}>
                                        <p className="fs-3">{content.h03.title1}</p>
                                    </Card.Title>
                                    <Card.Text>
                                        <p className="fs-5 fw-light">{content.h03.description1}</p>
                                    </Card.Text>

                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Card 2 */}
                        <Col sm={3} className="mt-2">
                            <Card className="h-100 d-flex flex-column py-1"
                                style={{
                                    borderRadius: '15px',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                    backgroundColor: '#f4f8ff',
                                }}>
                                <Card.Body className="px-0 d-flex flex-column">
                                    <div style={{ textAlign: 'start' }}>
                                        <img
                                            src={content.h03.icon2}
                                            alt="icon"
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                    </div>
                                    <Card.Title className="text-start mt-4" style={{ fontWeight: 'bold', color: '#0171de', textAlign: 'center' }}>
                                        <p className="fs-3">{content.h03.title2}</p>
                                    </Card.Title>
                                    <Card.Text>
                                        <p className="fs-5 fw-light">{content.h03.description2}</p>
                                    </Card.Text>
                                    <Link
                                        to="/strength"
                                        className="mt-auto"
                                        style={{
                                            color: '#0171de',
                                            fontWeight: '500',
                                            display: 'inline-block',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        <p className="fs-4 fw-light">{content.h03.link}<span style={{ marginLeft: '5px' }}>| &nbsp;&rarr;</span></p>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Card 3 */}
                        <Col sm={3} className="mt-2">
                            <Card className="h-100 d-flex flex-column py-1"
                                style={{
                                    borderRadius: '15px',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                    backgroundColor: '#f4f8ff',
                                }}>
                                <Card.Body className="px-0 d-flex flex-column">
                                    <div style={{ textAlign: 'start' }}>
                                        <img
                                            src={content.h03.icon3}
                                            alt="icon"
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                    </div>
                                    <Card.Title className="text-start mt-4" style={{ fontWeight: 'bold', color: '#0171de', textAlign: 'center' }}>
                                        <p className="fs-3">{content.h03.title3}</p>
                                    </Card.Title>
                                    <Card.Text>
                                        <p className="fs-5 fw-light">{content.h03.description3}</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>

                {/* H05 */}
                <Row className="h05 text-white justify-content-center mt-5 mb-5">
                    <Col xs={10} md={4} className="text-start">
                        <Row>
                            <p className="fs-1 text-primary fw-bolder">{content.h05.lefttitle}</p>
                        </Row>
                        <Row className="mt-4 justify-content-center">
                            <Col xs={3}>
                                <img src={content.h05.lefticon1} className="img-fluid border mt-3" alt="" />
                            </Col>
                            <Col xs={9}>
                                <p className="fs-5 text-black fw-bold">{content.h05.leftsum1}</p>
                                <p className="fs-6 text-black">{content.h05.leftdes1}</p>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col xs={3}>
                                <img src={content.h05.lefticon2} className="img-fluid border mt-3" alt="" />
                            </Col>
                            <Col xs={9}>
                                <p className="fs-5 text-black fw-bold">{content.h05.leftsum2}</p>
                                <p className="fs-6 text-black">{content.h05.leftdes2}</p>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col xs={3}>
                                <img src={content.h05.lefticon3} className="img-fluid border" alt="" />
                            </Col>
                            <Col xs={9}>
                                <p className="fs-5 text-black fw-bold">{content.h05.leftsum3}</p>
                                <p className="fs-6 text-black">{content.h05.leftdes3}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={7}>
                        <Row className="justify-content-center">
                            <Col xs={10} className="text-center">
                                <p className="fs-6 text-black text-start mx-5">{content.h05.rightdes}</p>
                            </Col>
                        </Row>

                        <img src={content.h05.rightimg} className="img-fluid" alt="" />

                    </Col>
                </Row>
                {/* H07 */}
                <Container className="h07 text-white pt-5">
                    <p className="fs-2 fw-bold text-center mt-3 mb-5">
                        {content.h07.title}
                    </p>

                    {/* ROW 1 */}
                    <Row className="justify-content-center gap-3">
                        <Col xs={10} className="col-5-5 bg-custom p-4 rounded-3">
                            <p className="fs-5 fw-bold text-center">{content.h07.col1title}</p>
                            <hr />

                            <Row className="align-items-center">
                                <Col xs={4} md={2}>
                                    <img src={content.h07.col1icon} className="img-fluid border p-2" alt="" />
                                </Col>
                                <Col xs={8} md={10}>
                                    <p className="fs-6 mb-0">{content.h07.col1des}</p>
                                </Col>
                            </Row>
                        </Col>

                        <Col xs={10} className="col-5-5 bg-custom p-4 rounded-3">
                            <p className="fs-5 fw-bold text-center">{content.h07.col2title}</p>
                            <hr />

                            <Row className="align-items-center">
                                <Col xs={4} md={2}>
                                    <img src={content.h07.col2icon} className="img-fluid border p-2" alt="" />
                                </Col>
                                <Col xs={8} md={10}>
                                    <p className="fs-6 mb-0">{content.h07.col2des}</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    {/* ROW 2 */}
                    <Row className="justify-content-center gap-3 mt-3">
                        <Col xs={10} className="col-5-5 bg-custom p-4 rounded-3">
                            <p className="fs-5 fw-bold text-center">{content.h07.col3title}</p>
                            <hr />

                            <Row className="align-items-center">
                                <Col xs={4} md={2}>
                                    <img src={content.h07.col3icon} className="img-fluid border p-2" alt="" />
                                </Col>
                                <Col xs={8} md={10}>
                                    <p className="fs-6 mb-0">{content.h07.col3des}</p>
                                </Col>
                            </Row>
                        </Col>

                        <Col xs={10} className="col-5-5 bg-custom p-4 rounded-3">
                            <p className="fs-5 fw-bold text-center">{content.h07.col4title}</p>
                            <hr />

                            <Row className="align-items-center">
                                <Col xs={4} md={2}>
                                    <img src={content.h07.col4icon} className="img-fluid border p-2" alt="" />
                                </Col>
                                <Col xs={8} md={10}>
                                    <p className="fs-6 mb-0">{content.h07.col4des}</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Container>
    );
}
