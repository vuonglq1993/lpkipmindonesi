import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/LPKPMINDONESIA.png';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./footer.css";

export default function Footer() {
    const { language } = useLanguage();
    const [footerInfo, setFooterInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const footerCol = language === 'en' ? 'footer' : 'footerjp';
            const footerDoc = await getDoc(doc(db, footerCol, 'menu'));
            if (footerDoc.exists()) {
                setFooterInfo(footerDoc.data());
            }
        };
        fetchData();
    }, [language]);

    if (!footerInfo) return null;

    // Partner logos: partner1 ~ partner8
    const partners = [
        footerInfo.partner1,
        footerInfo.partner2,
        footerInfo.partner3,
        footerInfo.partner4,
        footerInfo.partner5,
        footerInfo.partner6,
        footerInfo.partner7,
        footerInfo.partner8,
    ].filter(Boolean);

    // Branch offices: b1title, b1addr, b1email ... b5title, b5addr, b5email
    const branches = [1, 2, 3, 4, 5].map(i => ({
        title: footerInfo[`b${i}title`],
        addr: footerInfo[`b${i}addr`],
        email: footerInfo[`b${i}email`],
    })).filter(b => b.title);

    // Member organizations: member1img~member4img, member1label~member4label
    const members = [1, 2, 3, 4].map(i => ({
        img: footerInfo[`member${i}`],
        name: footerInfo[`member${i}name`],
        label: footerInfo[`member${i}label`],
    })).filter(m => m.img);

    return (
        <Container className="footer text-dark px-0 pb-4">

            {/* ── Row 1: Partner logos ── */}
            <div className="partner-row">
                {partners.map((src, idx) => (
                    <div key={idx} className="partner-cell">
                        <img src={src} alt={`partner-${idx + 1}`} className="partner-logo" />
                    </div>
                ))}
            </div>

            {/* ── Row 2: Company info + Branch offices ── */}
            <Row className="px-4 py-3 g-0">
                {/* Left col – small: company info */}
                <Col xs={12} md={4} className="pe-md-4 mb-4 mb-md-0">
                    {/* Sub-row 1: logo + company name + tagline */}
                    <Row className="align-items-center g-0 mb-3">
                        <Col xs="auto">
                            <img src={logo} alt="logo" className="footer-logo me-3" />
                        </Col>
                        <Col>
                            <p className="fw-bold mb-1 footer-company-name">
                                {footerInfo.companyName || 'LPK INTERNASIONAL PERSONEL MANAJEMEN INDONESIA'}
                            </p>
                            {footerInfo.tagline && (
                                <p className="text-muted small mb-0">{footerInfo.tagline}</p>
                            )}
                        </Col>
                    </Row>

                    {/* Sub-row 2: address info */}
                    <p className="fw-bold mb-1 small">{footerInfo.addressLabel || '本社所在地'}</p>
                    <p className="footer-info-text mb-2">
                        <a href="https://maps.app.goo.gl/taATnNaYqpNzd3dL6?g_st=iz" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-geo-alt-fill footer-icon"></i> {footerInfo.address}
                        </a>
                    </p>
                    <p className="footer-info-text mb-2">
                        <i className="bi bi-telephone-fill footer-icon"></i> {footerInfo.phone}
                    </p>
                    <p className="footer-info-text mb-0">
                        <i className="bi bi-envelope-fill footer-icon"></i> {footerInfo.email}
                    </p>
                </Col>

                {/* Right col – large: branch offices */}
                {/* Right col – large: branch offices */}
                <Col xs={12} md={8}>
                    <Row className="g-3">

                        {/* ── Fixed: b1 & b2 (có link riêng) ── */}
                        {[1, 2].map((i, idx) => (
                            <Col key={idx} xs={6} sm={4} md={3} className="d-flex flex-column">
                                <p className="fw-bold footer-branch-title mb-2">
                                    {footerInfo[`b${i}title`]}
                                </p>
                                <p className="footer-info-text mb-2">
                                    <a
                                        href={i === 1
                                            ? "https://maps.app.goo.gl/KYXmBFMn2GjXKCAQ9?g_st=iz"
                                            : " https://maps.app.goo.gl/bWS2cbwx5qmj7wBv8?g_st=il"
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="bi bi-geo-alt-fill footer-icon"></i>
                                        {footerInfo[`b${i}addr`]}
                                    </a>
                                </p>
                                <p className="footer-info-text mb-0 mt-auto">
                                    <i className="bi bi-envelope-fill footer-icon"></i>
                                    {footerInfo[`b${i}email`] || 'aloimtjapan@gmail.com'}
                                </p>
                            </Col>
                        ))}

                        {/* ── Dynamic: b3 → b5 (map như cũ) ── */}
                        {branches.slice(2).map((branch, idx) => (
                            <Col key={idx} xs={6} sm={4} md={3} className="d-flex flex-column">
                                <p className="fw-bold footer-branch-title mb-2">{branch.title}</p>
                                <p className="footer-info-text mb-2">
                                    <i className="bi bi-geo-alt-fill footer-icon"></i>
                                    {branch.addr}
                                </p>
                                <p className="footer-info-text mb-0 mt-auto">
                                    <i className="bi bi-envelope-fill footer-icon"></i>
                                    {branch.email || 'aloimtjapan@gmail.com'}
                                </p>
                            </Col>
                        ))}

                    </Row>
                </Col>
            </Row>

            <hr className="footer-divider mx-4" />

            {/* ── Row 3: 2 Col lớn ── */}
            <Row className="align-items-center px-4 py-2 g-0 mb-5">

                {/* Col lớn trái: ご連絡先 + social icons */}
                <Col xs={12} md={3} className="d-flex align-items-center gap-3 mb-3 mb-md-0">
                    <Link to="/contact" className="d-flex align-items-center gap-1 text-decoration-none text-dark">
                        <i className="bi bi-check-circle-fill footer-contact-check"></i>
                        <span className="footer-contact-label fw-bold small text-nowrap">
                            {footerInfo.contact || 'ご連絡先'}
                        </span>
                    </Link>
                    {footerInfo.facebook && (
                        <a href={footerInfo.facebookUrl || 'https://www.facebook.com/profile.php?id=61577544040985'} target="_blank" rel="noopener noreferrer">
                            <img src={footerInfo.facebook} alt="facebook" className="social-icon" />
                        </a>
                    )}
                    {footerInfo.youtube && (
                        <a href={footerInfo.youtubeUrl || 'https://www.youtube.com/@IMTJAPANESESCHOOL'} target="_blank" rel="noopener noreferrer">
                            <img src={footerInfo.youtube} alt="youtube" className="social-icon" />
                        </a>
                    )}
                </Col>

                {/* Col lớn phải: label + 4 member orgs */}
                <Col xs={12} md={9}>
                    <Row className="align-items-center g-0">

                        {/* Col nhỏ: label 所属団体 */}
                        <Col xs={12} sm={3} className="mb-3 mb-sm-0">
                            <p className="fw-bold small mb-0">
                                {footerInfo.member || 'LPK IPM INDONESIAの所属団体'}
                            </p>
                        </Col>

                        {/* Col nhỏ: mỗi member org */}
                        {members.map((m, idx) => (
                            <Col key={idx} xs={3} sm={true} className="d-flex flex-column align-items-center">
                                <img src={m.img} alt={`member-${idx + 1}`} className="member-logo mb-1" />
                                {m.name && (
                                    <span className="footer-member-name fw-bold text-center">{m.name}</span>
                                )}
                                {m.label && (
                                    <span className="footer-member-label text-center">{m.label}</span>
                                )}
                            </Col>
                        ))}

                    </Row>
                </Col>

            </Row>

        </Container>
    );
}
