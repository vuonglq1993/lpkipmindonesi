import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function EditrecruitmentPage() {
  const [recruitmentEn, setrecruitmentEn] = useState([]);
  const [recruitmentJp, setrecruitmentJp] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchrecruitment = async () => {
      const enSnap = await getDocs(collection(db, 'recruitment'));
      const jpSnap = await getDocs(collection(db, 'recruitmentjp'));

      const enItems = [];
      const jpItems = [];

      enSnap.forEach((doc) => enItems.push({ id: doc.id, ...doc.data() }));
      jpSnap.forEach((doc) => jpItems.push({ id: doc.id, ...doc.data() }));

      enItems.sort((a, b) => b.date?.seconds - a.date?.seconds);
      jpItems.sort((a, b) => b.date?.seconds - a.date?.seconds);

      setrecruitmentEn(enItems);
      setrecruitmentJp(jpItems);
      setLoading(false);
    };

    fetchrecruitment();
  }, []);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Edit recruitment</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Row>
          {/* English column */}
          <Col md={6}>
            <h4 className="text-primary">English recruitment</h4>
            {recruitmentEn.map((article) => (
              <Card key={article.id} className="mb-3 shadow-sm" onClick={() => navigate(`/admin/recruitment/${article.id}`)} style={{ cursor: 'pointer' }}>
                <Card.Body>
                  <Card.Title>{article.name}</Card.Title>
                  <Card.Text className="text-muted" style={{ fontSize: '0.8rem' }}>
                    {new Date(article.date?.seconds * 1000).toLocaleDateString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>

          {/* Japanese column */}
          <Col md={6}>
            <h4 className="text-danger">Japanese recruitment</h4>
            {recruitmentJp.map((article) => (
              <Card key={article.id} className="mb-3 shadow-sm" onClick={() => navigate(`/admin/recruitmentjp/${article.id}`)} style={{ cursor: 'pointer' }}>
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
          + Create New Job
        </Button>
      </div>
    </Container>
  );
}
