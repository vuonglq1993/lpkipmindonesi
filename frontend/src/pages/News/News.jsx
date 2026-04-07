import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import ContactSection from '../../components/contact';
import './News.css';

export default function News() {
  const { language } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanner = async () => {
      const col = language === 'en' ? 'news' : 'newsjp';
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
    const fetchNews = async () => {
      const col = language === 'en' ? 'news' : 'newsjp';
      const snap = await getDocs(collection(db, col));
      const items = [];
      snap.forEach((doc) => {
        if (doc.id !== 'banner') items.push({ id: doc.id, ...doc.data() });
      });
      items.sort((a, b) => b.date?.seconds - a.date?.seconds); // sort by newest
      setArticles(items);
      setLoading(false);
    };

    fetchNews();
  }, [language]);

  return (
    <>
      {banner?.img && (
        <img src={banner.img} className="w-100" style={{ display: 'block' }} alt="" />
      )}

      {/* News List */}
      <Container className="my-5">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <Row className="g-4">
            {articles.map((news) => (
              <Col md={4} key={news.id}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Img variant="top" src={news.image} />
                  <Card.Body>
                    <Card.Title>{news.title}</Card.Title>
                    <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
                      {new Date(news.date.seconds * 1000).toLocaleDateString()}
                    </Card.Text>
                    <Card.Text>{news.summary}</Card.Text>
                    <Button variant="link" onClick={() => navigate(`/news/${news.id}`)}>
                      {language === 'en' ? 'Read more' : '続きを読む'}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
