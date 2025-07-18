import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';

export default function ContactEditor() {
  const [dataEn, setDataEn] = useState({});
  const [dataJp, setDataJp] = useState({});
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const enDoc = await getDoc(doc(db, 'contactus', 'menu'));
      const jpDoc = await getDoc(doc(db, 'contactusjp', 'menu'));

      if (enDoc.exists()) setDataEn({ ...enDoc.data() });
      if (jpDoc.exists()) setDataJp({ ...jpDoc.data() });

      setLoading(false);
    };
    fetchData();
  }, []);

  const handleChange = (lang, field, value) => {
    if (lang === 'en') {
      setDataEn((prev) => ({ ...prev, [field]: value }));
    } else {
      setDataJp((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, 'contactus', 'menu'), dataEn);
      await updateDoc(doc(db, 'contactusjp', 'menu'), dataJp);

      setSuccessMsg('✅ Contact content updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      alert('❌ Error saving data.');
      console.error(error);
    }
  };

  const renderEditor = (data, label, lang) => (
    <div className="mb-5">
      <h3>{label}</h3>
      {Object.entries(data).map(([key, value]) => (
        <Form.Group className="mb-3" key={key}>
          <Form.Label>{key}</Form.Label>
          <Form.Control
            as={typeof value === 'string' && value.length > 50 ? 'textarea' : 'input'}
            rows={3}
            value={value}
            onChange={(e) => handleChange(lang, key, e.target.value)}
          />
        </Form.Group>
      ))}
    </div>
  );

  return (
    <Container className="py-5 px-4">
      <h2 className="text-center mb-4">📬 Edit "Contact" Section Content</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Row>
          <Col md={6}>{renderEditor(dataEn, '🇺🇸 English', 'en')}</Col>
          <Col md={6}>{renderEditor(dataJp, '🇯🇵 Japanese', 'jp')}</Col>
        </Row>
      )}

      {successMsg && <Alert variant="success" className="text-center mt-3">{successMsg}</Alert>}

      <div className="text-center mt-4">
        <Button variant="success" onClick={handleSave} size="lg">
          💾 Save All Changes
        </Button>
      </div>
    </Container>
  );
}
