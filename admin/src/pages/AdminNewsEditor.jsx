import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

export default function NewsEditor() {
  const [dataEn, setDataEn] = useState([]);
  const [dataJp, setDataJp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const enSnap = await getDocs(collection(db, "news"));
      const jpSnap = await getDocs(collection(db, "newsjp"));

      const enData = [];
      enSnap.forEach((doc) => enData.push({ id: doc.id, ...doc.data() }));

      const jpData = [];
      jpSnap.forEach((doc) => jpData.push({ id: doc.id, ...doc.data() }));

      setDataEn(enData);
      setDataJp(jpData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleChange = (lang, index, field, value) => {
    const updater = lang === 'en' ? setDataEn : setDataJp;
    const current = lang === 'en' ? [...dataEn] : [...dataJp];
    current[index][field] = value;
    updater(current);
  };

  const handleDelete = async (index) => {
    const id = dataEn[index].id;
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    await deleteDoc(doc(db, "news", id));
    await deleteDoc(doc(db, "newsjp", id));

    const updatedEn = [...dataEn];
    const updatedJp = [...dataJp];
    updatedEn.splice(index, 1);
    updatedJp.splice(index, 1);

    setDataEn(updatedEn);
    setDataJp(updatedJp);
  };

  const handleAdd = () => {
    const newItem = {
      id: `news-${Date.now()}`,
      title: '',
      summary: '',
      content: '',
      image: '',
      date: new Date()
    };
    setDataEn([...dataEn, { ...newItem }]);
    setDataJp([...dataJp, { ...newItem }]);
  };

  const handleSave = async () => {
    try {
      for (let i = 0; i < dataEn.length; i++) {
        const id = dataEn[i].id;
        await setDoc(doc(db, "news", id), {
          ...dataEn[i],
          date: dataEn[i].date instanceof Date ? dataEn[i].date : new Date()
        });
        await setDoc(doc(db, "newsjp", id), {
          ...dataJp[i],
          date: dataJp[i].date instanceof Date ? dataJp[i].date : new Date()
        });
      }
      setSuccessMsg("✅ Saved successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.error("Save failed:", error);
      alert("❌ Error saving. Please try again.");
    }
  };

  const renderTableEditor = (data, langLabel, lang) => (
    <div className="mb-5">
      <h3 className="mb-3">{langLabel}</h3>
      {data.map((item, index) => (
        <div key={`${lang}-${item.id}`} className="p-3 border rounded mb-3 bg-light">
          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={item.title || ''}
              onChange={(e) => handleChange(lang, index, 'title', e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Summary</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={item.summary || ''}
              onChange={(e) => handleChange(lang, index, 'summary', e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={item.content || ''}
              onChange={(e) => handleChange(lang, index, 'content', e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              value={item.image || ''}
              onChange={(e) => handleChange(lang, index, 'image', e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={item.date?.toDate ? item.date.toDate().toISOString().split('T')[0] : item.date?.toISOString().split('T')[0] || ''}
              onChange={(e) => handleChange(lang, index, 'date', new Date(e.target.value))}
            />
          </Form.Group>

          {lang === 'en' && (
            <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>
              ❌ Delete
            </Button>
          )}
        </div>
      ))}

      <Button variant="secondary" onClick={handleAdd}>
        ➕ Add New Article
      </Button>
    </div>
  );

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">🛠️ Edit "News" Articles</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <Row>
            <Col md={6}>{renderTableEditor(dataEn, "🇺🇸 English", "en")}</Col>
            <Col md={6}>{renderTableEditor(dataJp, "🇯🇵 Japanese", "jp")}</Col>
          </Row>

          {successMsg && (
            <Alert variant="success" className="text-center mt-3">
              {successMsg}
            </Alert>
          )}

          <div className="text-center mt-4">
            <Button variant="success" onClick={handleSave} size="lg">
              💾 Save All Changes
            </Button>
          </div>
        </>
      )}
    </Container>
  );
} 
