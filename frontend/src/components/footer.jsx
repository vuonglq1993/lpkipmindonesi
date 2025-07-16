import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/LPKPMINDONESIA.png';

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
        <Container className="bg-dark text-white">
            <Row className="text-start justify-content-center pb-4 pt-5">
                <Col md={9}>
                    <Row className="justify-content-center">
                        <Col md={3} className="px-3">
                            <h5 className="fw-bold">{menuItems.about}</h5>
                            <ul className="list-unstyled mt-3 ms-3">
                                <li className="mt-2"><Link to="/mind" className="text-white text-decoration-none">{menuItems.thoughts}</Link></li>
                                <li className="mt-2"><Link to="/strength" className="text-white text-decoration-none">{menuItems.strength}</Link></li>
                                <li className="mt-2"><Link to="/mission" className="text-white text-decoration-none">{menuItems.mission}</Link></li>
                            </ul>
                        </Col>

                        <Col md={3} className="px-3">
                            <h5 className="fw-bold">{menuItems.system}</h5>
                            <ul className="list-unstyled mt-3 ms-3">
                                <li className="mt-2"><Link to="/regulation" className="text-white text-decoration-none">{menuItems.intern}</Link></li>
                                <li className="mt-2"><Link to="/skills" className="text-white text-decoration-none">{menuItems.skill}</Link></li>
                            </ul>
                        </Col>

                        <Col md={3} className="px-3">
                            <h5 className="fw-bold">{menuItems.overview}</h5>
                            <ul className="list-unstyled mt-3 ms-3">
                                <li className="mt-2"><Link to="/news" className="text-white text-decoration-none">{menuItems.news}</Link></li>
                                <li className="mt-2"><Link to="/contact" className="text-white text-decoration-none">{menuItems.contact}</Link></li>
                            </ul>
                        </Col>

                        <Col md={3} className="text-center mt-4">
                            <Link to="/contact">
                                <img
                                    src={footerInfo.img1}
                                    alt="Contact"
                                    className="img-fluid"
                                />
                            </Link>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row className="text-center mt-4">
                <Col>
                    <img
                        src={logo}
                        alt="logo"
                        className="mb-3"
                        height={120}
                    />
                    <p>{footerInfo.address}</p>
                    <p className="fs-5 fw-bold">{footerInfo.phone}</p>
                    <p className="text-muted small mt-3">
                        {footerInfo.copyright}
                    </p>
                </Col>
            </Row>
        </Container>
    );
}
