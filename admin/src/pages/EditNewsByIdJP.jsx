// src/pages/admin/EditNewsPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import TiptapEditor from '../components/TiptapEditor';
import '../components/tiptap.css';


export default function EditNewsPagejp() {
  const { id } = useParams(); // news/:id
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch bài viết
  useEffect(() => {
    const fetchArticle = async () => {
      const docRef = doc(db, 'newsjp', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title || '');
        setSummary(data.summary || '');
        setImage(data.image || '');
        setDate(new Date(data.date.seconds * 1000).toISOString().slice(0, 10));
        setContent(data.content || '');
        setLoading(false);
      } else {
        alert('Bài viết không tồn tại');
        navigate('/admin/news');
      }
    };
    fetchArticle();
  }, [id, navigate]);

  // Lưu chỉnh sửa
  const handleSave = async () => {
    try {
      await updateDoc(doc(db, 'newsjp', id), {
        title,
        summary,
        image,
        date: new Date(date),
        content,
      });
      alert('Đã lưu thành công');
    } catch (error) {
      console.error(error);
      alert('Lỗi khi lưu bài viết');
    }
  };

  // Xoá bài viết
  const handleDelete = async () => {
    const confirm = window.confirm('Bạn có chắc muốn xoá bài viết này?');
    if (confirm) {
      try {
        await deleteDoc(doc(db, 'newsjp', id));
        alert('Đã xoá bài viết');
        navigate('/admin/news');
      } catch (error) {
        console.error(error);
        alert('Lỗi khi xoá bài viết');
      }
    }
  };

  if (loading) return <p className="text-center my-5">Đang tải bài viết...</p>;

  return (
    <Container className="py-5">
      <h2 className="mb-4">Chỉnh sửa bài viết</h2>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Tiêu đề</Form.Label>
            <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tóm tắt</Form.Label>
            <Form.Control as="textarea" rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ảnh đại diện (URL)</Form.Label>
            <Form.Control value={image} onChange={(e) => setImage(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ngày đăng</Form.Label>
            <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nội dung</Form.Label>
            <TiptapEditor content={content} onChange={setContent} />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="primary" onClick={handleSave}>
              Lưu bài viết
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Xoá bài viết
            </Button>
          </div>
        </Col>

        <Col md={6}>
          <h5 className="mb-3">Preview</h5>
          <Card className="shadow-sm border-0">
            <Card.Img variant="top" src={image} />
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text className="text-muted">{date}</Card.Text>
              <Card.Text>{summary}</Card.Text>
              <div className="rendered-article" dangerouslySetInnerHTML={{ __html: content }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
