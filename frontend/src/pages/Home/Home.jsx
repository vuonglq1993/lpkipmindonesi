import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from "react-router-dom";

import './Home.css';

export default function Home() {
    const { language } = useLanguage();
    const [content, setContent] = useState(null);

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
        <Container className="home-head pt-5 bg-white">
            <Row className="justify-content-center">
                {/* Slide */}
                <div className="banner">
                    <Container>
                        <Col sm={6}>
                            <p className="fs-1 fw-bold ms-4 text-white">{content.banner.title}</p>
                            <p className="fs-4 ms-4 text-black">{content.banner.description}</p>

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
                <div className="h03 pt-5">
                    <Row className="py-5 justify-content-center my-5">
                        <Col sm={3}>
                            <Link to="/mind" className="text-white text-decoration-none"><img src={content.h03.img1} className="img-fluid rounded shadow-lg" alt="" /></Link>
                        </Col>
                        <Col sm={3}>
                            <Link to="/strength" className="text-white text-decoration-none"><img src={content.h03.img2} className="img-fluid rounded shadow-lg" alt="" /></Link>
                        </Col>
                        <Col sm={3}>
                            <Link to="/mission" className="text-white text-decoration-none"><img src={content.h03.img3} className="img-fluid rounded shadow-lg" alt="" /></Link>
                        </Col>
                    </Row>
                </div>

                {/* H05 */}
                <Row className="h05 text-white justify-content-center mt-5 mb-5">
                    <Col md={4} xs={10} className="text-start">
                        <Row>
                            <p className="fs-1 text-primary fw-bolder">{content.h05.lefttitle}</p>
                        </Row>
                        <Row className="mt-4">
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
                <Row className="h07 justify-content-center text-white pt-5">
                <p className="fs-2 fw-bold text-white text-center mt-3 mb-5">{content.h07.title}</p>

                    <Row className="justify-content-center text-white mb-1">
                        <Col xs={6} className="bg-opacity-25 bg-white mx-1 ps-4 pe-5 pt-3">
                            <Row>
                                <p className="fs-5 fw-bold">{content.h07.col1title}</p>
                            </Row>
                            <Row>
                                <Col xs={2}>
                                    <img src={content.h07.col1icon} className="img-fluid border p-2" alt="" />

                                </Col>
                                <Col xs={10}>
                                    <p className="fs-6 me-5 mt-3">{content.h07.col1des}</p>

                                </Col>
                            </Row>



                        </Col>
                        <Col xs={5} className="bg-opacity-25 bg-white ps-4 pt-3">
                            <Row>
                                <p className="fs-5 fw-bold">{content.h07.col2title}</p>
                            </Row>
                            <Row>
                                <Col xs={2}>
                                    <img src={content.h07.col2icon} className="img-fluid border p-2" alt="" />

                                </Col>
                                <Col xs={10}>
                                    <p className="fs-6 me-4 mt-2">{content.h07.col2des}</p>

                                </Col>
                            </Row>



                        </Col>
                    </Row>
                    <Row className="justify-content-center text-start">
                        <Col xs={5} className="bg-opacity-25 bg-white mx-1 ps-4 pe-2 pt-3">
                            <Row>
                                <p className="fs-5 fw-bold">{content.h07.col3title}</p>
                            </Row>
                            <Row>
                                <Col xs={2}>
                                    <img src={content.h07.col3icon} className="img-fluid border p-2" alt="" />

                                </Col>
                                <Col xs={10}>
                                    <p className="fs-6 me-4 mt-1">{content.h07.col3des}</p>

                                </Col>
                            </Row>



                        </Col>
                        <Col xs={6} className="bg-opacity-25 bg-white ps-4 pe-5 pt-3">
                            <Row>
                                <p className="fs-5 fw-bold">{content.h07.col4title}</p>
                            </Row>
                            <Row>
                                <Col xs={2}>
                                    <img src={content.h07.col4icon} className="img-fluid border p-3" alt="" />

                                </Col>
                                <Col xs={10}>
                                    <p className="fs-6 me-4 mt-3">{content.h07.col4des}</p>

                                </Col>
                            </Row>



                        </Col>
                    </Row>
                </Row>
            </Row>
        </Container>
    );
}
