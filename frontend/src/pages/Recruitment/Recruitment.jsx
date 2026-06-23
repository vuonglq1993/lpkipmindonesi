import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

import { doc, getDoc } from 'firebase/firestore';

import ContactSection from '../../components/contact';
import './Recruitment.css';

export default function Recruitment() {
    const { language } = useLanguage();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [banner, setBanner] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBanner = async () => {
            const col = language === 'en' ? 'recruitment' : 'recruitmentjp';
            const snap = await getDoc(doc(db, col, 'banner'));
            if (snap.exists()) setBanner(snap.data());
        };
        fetchBanner();
    }, [language]);

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
        const fetchRecruitment = async () => {
            const col = language === 'en' ? 'recruitment' : 'recruitmentjp';
            const snap = await getDocs(collection(db, col));
            const items = [];
            snap.forEach((doc) => {
                if (doc.id !== 'banner') items.push({ id: doc.id, ...doc.data() });
            });
            items.sort((a, b) => b.date?.seconds - a.date?.seconds); // sort by newest
            setArticles(items);
            setLoading(false);
        };

        fetchRecruitment();
    }, [language]);

    return (
        <>
            {banner?.img && (
                <img src={banner.img} className="w-100" style={{ display: 'block' }} alt="" />
            )}


            <Container fluid className="pt-0 mt-3 bg-white">
                {/* recruitment List */}
                <Container className="my-5">
                    {loading ? (
                        <p className="text-center">Loading...</p>
                    ) : (
                        <Row className="g-4">
                            {articles.map((recruitment) => (
                                <Row className="justify-content-center" key={recruitment.id}>
                                    <Col xs={10} className="mb-3">
                                        <Card className="shadow-sm border rounded p-3">
                                            <Row>
                                                {/* Logo bên trái */}
                                                <Col xs={2} className="d-flex align-items-center justify-content-center">
                                                    <img
                                                        src={recruitment.image}
                                                        alt="logo"
                                                        style={{ width: "60px", height: "60px", objectFit: "contain" }}
                                                    />
                                                </Col>

                                                {/* Nội dung giữa */}
                                                <Col xs={7}>
                                                    <h6 className="fw-bold mb-1">{recruitment.title}</h6>
                                                    <div className="text-muted small mb-1">{recruitment.company}</div>
                                                    <div className=" flex-wrap text-muted small">
                                                        <p className="me-3 fw-bold fs-5"><i className="bi bi-geo-alt"></i> {recruitment.name}</p>
                                                        <p className="me-3 fs-6"><i className="bi bi-briefcase"></i> {recruitment.summary}</p>
                                                    </div>
                                                    {/* Tags */}
                                                    <div className="mt-2">
                                                        {recruitment.tags?.map((tag, i) => (
                                                            <span key={i} className="badge bg-light text-dark border me-2">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </Col>

                                                {/* Mức lương bên phải */}
                                                <Col xs={3} className="text-end">
                                                    <span className="fw-bold text-success">{recruitment.salary}</span>

                                                </Col>

                                            </Row>
                                            <Row className="justify-content-center">
                                                <Col md={10}
                                                ></Col>
                                                <Col md={2}>
                                                    <Button variant="link" className="ms-4" onClick={() => navigate(`/recruitment/${recruitment.id}`)}>
                                                        {language === 'en' ? 'Read more' : '続きを読む'}
                                                    </Button>
                                                </Col>
                                            </Row>

                                        </Card>
                                    </Col>

                                </Row>

                            ))}
                        </Row>
                    )}
                </Container>

                {/* Contact Section */}
                <ContactSection />
            </Container>
        </>
    );
}
