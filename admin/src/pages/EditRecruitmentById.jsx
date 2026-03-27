// src/pages/admin/EditRecruitmentById.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import TiptapEditor from '../components/TiptapEditor';
import '../components/tiptap.css';

export default function EditRecruitmentById() {
  const { id } = useParams(); // recruitment/:id
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch recruitment
  useEffect(() => {
    const fetchRecruitment = async () => {
      const docRef = doc(db, 'recruitment', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name || '');
        setSalary(data.salary || '');
        setImage(data.image || '');
        setDate(new Date(data.date.seconds * 1000).toISOString().slice(0, 10));
        setDescription(data.description || '');
        setLoading(false);
      } else {
        alert('Bài tuyển dụng không tồn tại');
        navigate('/admin/recruitment');
      }
    };
    fetchRecruitment();
  }, [id, navigate]);

  // Lưu chỉnh sửa
  const handleSave = async () => {
    try {
      await updateDoc(doc(db, 'recruitment', id), {
        name,
        salary,
        image,
        date: new Date(date),
        description,
      });
      alert('Đã lưu thành công');
    } catch (error) {
      console.error(error);
      alert('Lỗi khi lưu bài tuyển dụng');
    }
  };

  // Xoá bài
  const handleDelete = async () => {
    const confirm = window.confirm('Bạn có chắc muốn xoá bài tuyển dụng này?');
    if (confirm) {
      try {
        await deleteDoc(doc(db, 'recruitment', id));
        alert('Đã xoá thành công');
        navigate('/admin/recruitment');
      } catch (error) {
        console.error(error);
        alert('Lỗi khi xoá bài tuyển dụng');
      }
    }
  };

  if (loading) return <p className="text-center my-5">Đang tải dữ liệu...</p>;

  return (
    <Container className="py-5">
      <h2 className="mb-4">Chỉnh sửa tuyển dụng</h2>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Tên công việc</Form.Label>
            <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Lương</Form.Label>
            <Form.Control value={salary} onChange={(e) => setSalary(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ảnh (URL)</Form.Label>
            <Form.Control value={image} onChange={(e) => setImage(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ngày đăng</Form.Label>
            <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả chi tiết</Form.Label>
            <TiptapEditor content={description} onChange={setDescription} />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="primary" onClick={handleSave}>
              Lưu
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Xoá
            </Button>
          </div>
        </Col>

        <Col md={6}>
          <h5 className="mb-3">Preview</h5>
          <Card className="shadow-sm border-0">
            {image && <Card.Img variant="top" src={image} />}
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text className="text-muted">{date}</Card.Text>
              <Card.Text><strong>Lương: </strong>{salary}</Card.Text>
              <div
                className="rendered-article"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
