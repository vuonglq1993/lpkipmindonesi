import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function EditNewsPage() {
  const [newsEn, setNewsEn] = useState([]);
  const [newsJp, setNewsJp] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      const enSnap = await getDocs(collection(db, 'news'));
      const jpSnap = await getDocs(collection(db, 'newsjp'));

      const enItems = [];
      const jpItems = [];

      enSnap.forEach((doc) => enItems.push({ id: doc.id, ...doc.data() }));
      jpSnap.forEach((doc) => jpItems.push({ id: doc.id, ...doc.data() }));

      enItems.sort((a, b) => b.date?.seconds - a.date?.seconds);
      jpItems.sort((a, b) => b.date?.seconds - a.date?.seconds);

      setNewsEn(enItems);
      setNewsJp(jpItems);
      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Edit News</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Row>
          {/* English column */}
          <Col md={6}>
            <h4 className="text-primary">English News</h4>
            {newsEn.map((article) => (
              <Card key={article.id} className="mb-3 shadow-sm" onClick={() => navigate(`/admin/news/${article.id}`)} style={{ cursor: 'pointer' }}>
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text className="text-muted" style={{ fontSize: '0.8rem' }}>
                    {new Date(article.date?.seconds * 1000).toLocaleDateString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>

          {/* Japanese column */}
          <Col md={6}>
            <h4 className="text-danger">Japanese News</h4>
            {newsJp.map((article) => (
              <Card key={article.id} className="mb-3 shadow-sm" onClick={() => navigate(`/admin/newsjp/${article.id}`)} style={{ cursor: 'pointer' }}>
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text className="text-muted" style={{ fontSize: '0.8rem' }}>
                    {new Date(article.date?.seconds * 1000).toLocaleDateString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      )}

      {/* Create New */}
      <div className="text-center mt-4">
        <Button onClick={() => navigate('/admin/create')} variant="success">
          + Create New Article
        </Button>
      </div>
    </Container>
  );
}
