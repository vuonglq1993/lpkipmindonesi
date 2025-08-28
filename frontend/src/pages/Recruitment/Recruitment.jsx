import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import ContactSection from '../../components/contact';
import './Recruitment.css';

export default function Recruitment() {
  const { language } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecruitment = async () => {
      const col = language === 'en' ? 'recruitment' : 'recruitmentjp';
      const snap = await getDocs(collection(db, col));
      const items = [];
      snap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      items.sort((a, b) => b.date?.seconds - a.date?.seconds); // sort by newest
      setArticles(items);
      setLoading(false);
    };

    fetchRecruitment();
  }, [language]);

  return (
    <Container className="py-5 bg-white">
      {/* Header */}
      <Row className="about-head">
        <h1 className="text-white text-center fs-1 mb-5">{language === 'en' ? 'Recruitment' : '募集'}</h1>
      </Row>

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
              <p className="me-3"><i className="bi bi-geo-alt"></i> {recruitment.name}</p>
              <p className="me-3"><i className="bi bi-briefcase"></i> {recruitment.description}</p>
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
          <Col xs={3} className="text-end d-flex flex-column justify-content-between">
            <span className="fw-bold text-success">{recruitment.salary}</span>
            <Button variant="link" onClick={() => navigate(`/recruitment/${recruitment.id}`)}>
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
  );
}
