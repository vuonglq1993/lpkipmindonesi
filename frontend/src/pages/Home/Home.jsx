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
        <Container className="home-head py-5 bg-white">
            <Row className="justify-content-center">
                {/* Slide */}
                <section>
                    <div id="carouselExampleFade" className="carousel slide carousel-fade">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={content.banner.img1} className="d-block w-100" alt="Slide 1" />
                            </div>
                            <div className="carousel-item">
                                <img src={content.banner.img2} className="d-block w-100" alt="Slide 2" />
                            </div>
                            <div className="carousel-item">
                                <img src={content.banner.img3} className="d-block w-100" alt="Slide 3" />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </section>

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

                {/* H02 */}
                <Row className="text-center justify-content-center py-3 h02">
                    <p className="fs-3 text-white">{content.h02.text1}</p>
                    <p className="fs-2 text-white fw-bold">{content.h02.text2}</p>
                </Row>

                {/* H03 */}
                <Row className="py-5 justify-content-center my-5">
                    <Col md={3}>
                    <Link to="/mind" className="text-white text-decoration-none"><img src={content.h03.img1} className="img-fluid" alt="" /></Link>
                    </Col>
                    <Col md={3}>
                    <Link to="/strength" className="text-white text-decoration-none"><img src={content.h03.img2} className="img-fluid" alt="" /></Link>
                    </Col>
                    <Col md={3}>
                    <Link to="/mission" className="text-white text-decoration-none"><img src={content.h03.img3} className="img-fluid" alt="" /></Link>
                    </Col>
                </Row>

                {/* H04 */}
                <Row className="h04 text-white text-center py-3">
                    <p className="fs-3 text-white">{content.h04.text1}</p>
                    <p className="fs-2 text-white fw-bold">{content.h04.text2}</p>
                </Row>

                {/* H05 */}
                <Row className="h05 text-white justify-content-center">
                    <Col md={5} className="text-end">
                    <Link to="/regulation" className="text-white text-decoration-none">   <img src={content.h05.img1} className="img-fluid" alt="" /></Link>
                    </Col>
                    <Col md={5}>
                    <Link to="/skills" className="text-white text-decoration-none"><img src={content.h05.img2} className="img-fluid" alt="" /></Link>   
                    </Col>
                </Row>

                {/* H06 */}
                <Row className="h06 text-white text-center py-3">
                    <p className="fs-3 text-white">{content.h06.text1}</p>
                    <p className="fs-2 text-white fw-bold">{content.h06.text2}</p>
                </Row>

                {/* H07 */}
                <Row className="h07 justify-content-center text-center py-5">
                    <Col md={7} className="my-5">
                        <iframe
                            width="560"
                            height="315"
                            src={content.h07.link}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </Col>
                </Row>
            </Row>
        </Container>
    );
}
