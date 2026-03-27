import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/LPKPMINDONESIA.png';
import "./footer.css";

export default function Footer() {
    const { language } = useLanguage();
    const [menuItems, setMenuItems] = useState({});
    const [footerInfo, setFooterInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const navCol = language === 'en' ? 'navigation' : 'navigationjp';
            const footerCol = language === 'en' ? 'footer' : 'footerjp';

            const navDoc = await getDoc(doc(db, navCol, 'menu'));
            const footerDoc = await getDoc(doc(db, footerCol, 'menu'));

            if (navDoc.exists()) {
                setMenuItems(navDoc.data());
            }

            if (footerDoc.exists()) {
                setFooterInfo(footerDoc.data());
            }
        };

        fetchData();
    }, [language]);

    if (!menuItems.about || !footerInfo) return null;

    return (
        <Container fluid className="bg-white footer text-dark px-0">
            <Row className="text-start justify-content-center pb-4 pt-5">
                <Col xs={11} md={5} className="pt-0">
                    <img
                        src={logo}
                        alt="logo"
                        className="mb-3"
                        height={120}
                    />
                    <p className="mt-1 fs-5"><strong>Head office: </strong>{footerInfo.address}</p>
                    <p className="mt-1 fs-5"><strong>Japanese School: </strong><br />{footerInfo.japaneseschool} <br />{footerInfo.japaneseschool2}</p>
                    <p className="mt-1 fs-5"><strong>Hotline: </strong>{footerInfo.phone}</p>
                    <p className="mt-1 fs-5"><strong>Email: </strong>{footerInfo.email}</p>



                </Col>
                <Col xs={11} md={6}>
                    <Row className="">
                        <Col xs={6} md={3} className="px-3">
                            <h5 className="fw-bold">{menuItems.about}</h5>
                            <ul className="list-unstyled text-start mt-3">
                                <li className="mt-2"><Link to="/mind" className="text-black text-decoration-none">{menuItems.thoughts}</Link></li>
                                <li className="mt-2"><Link to="/strength" className="text-black text-decoration-none">{menuItems.strength}</Link></li>
                                <li className="mt-2"><Link to="/mission" className="text-black text-decoration-none">{menuItems.mission}</Link></li>
                            </ul>
                        </Col>

                        <Col xs={6} md={5} className="px-3">
                            <h5 className="fw-bold">{menuItems.system}</h5>
                            <ul className="list-unstyled mt-3">
                                <li className="mt-2"><Link to="/regulation" className="text-black text-decoration-none">{menuItems.intern}</Link></li>
                                <li className="mt-2"><Link to="/skills" className="text-black text-decoration-none">{menuItems.skill}</Link></li>
                            </ul>
                        </Col>

                        <Col xs={6} md={4} className="px-3">
                            <h5 className="fw-bold">{menuItems.overview}</h5>
                            <ul className="list-unstyled mt-3">
                                <li className="mt-2"><Link to="/news" className="text-black text-decoration-none">{menuItems.news}</Link></li>
                                <li className="mt-2"><Link to="/contact" className="text-black text-decoration-none">{menuItems.contact}</Link></li>
                            </ul>
                        </Col>

                    </Row>

                    <Row className="Justify-content-center">
                        <Col xs={5} md={3}>
                            <Row>
                                <p className="fs-4 fw-bold">{footerInfo.contact}</p>
                            </Row>
                            <Row className="">
                                <Col xs={4}>
                                    <img
                                        src={footerInfo.facebook}
                                        alt="logo"
                                        className="img-fluid"
                                    />
                                </Col>
                                <Col xs={4}>
                                    <img
                                        src={footerInfo.youtube}
                                        alt="logo"
                                        className="img-fluid"

                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={7} md={9}>
                            <Row>
                                <p className="fs-4 fw-bold text-center">{footerInfo.member}</p>
                            </Row>
                            <Row className="justify-content-center mt-3">
                                <Col xs={3}>
                                <img
                                        src={footerInfo.member1}
                                        alt="logo"
                                        className="img-fluid"
                                    />
                                </Col>
                                <Col xs={3}>
                                <img
                                        src={footerInfo.member2}
                                        alt="logo"
                                        className="img-fluid"
                                    />
                                </Col>
                                <Col xs={3}>
                                <img
                                        src={footerInfo.member3}
                                        alt="logo"
                                        className="img-fluid"
                                    />
                                </Col>
                            </Row>
                            <Row className="justify-content-center mt-3">
                            <Col xs={3}>
                                <img
                                        src={footerInfo.member4}
                                        alt="logo"
                                        className="img-fluid"
                                    />
                                </Col>
                                <Col xs={3}>
                                <img
                                        src={footerInfo.member5}
                                        alt="logo"
                                        className="img-fluid"
                                    />
                                </Col>
                                <Col xs={3}>
                                <img
                                        src={footerInfo.member6}
                                        alt="logo"
                                        className="img-fluid"
                                    />
                                </Col>
                                <Col xs={3}>
                                <img
                                        src={footerInfo.member7}
                                        alt="logo"
                                        className="img-fluid"
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </Container>
    );
}
