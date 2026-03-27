import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { db } from '../firebase/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import TiptapEditor from '../components/TiptapEditor';
import '../components/tiptap.css';


export default function CreateNewsPage() {
    const [enData, setEnData] = useState({ title: '', image: '', salary: '' });
    const [jpData, setJpData] = useState({ title: '', image: '', salary: '' });
    const [loadingEn, setLoadingEn] = useState(false);
    const [loadingJp, setLoadingJp] = useState(false);

    const handleSaveEnglish = async () => {
        setLoadingEn(true);
        try {
            const now = Timestamp.now();
            await addDoc(collection(db, 'recruitment'), { ...enData, date: now });
            alert('Đã lưu bài viết tiếng Anh!');
            setEnData({ title: '', image: '', salary: '' });
        } catch (err) {
            console.error(err);
            alert('Lỗi khi lưu bài viết tiếng Anh.');
        }
        setLoadingEn(false);
    };

    const handleSaveJapanese = async () => {
        setLoadingJp(true);
        try {
            const now = Timestamp.now();
            await addDoc(collection(db, 'recruitmentjp'), { ...jpData, date: now });
            alert('日本語の記事を保存しました！');
            setJpData({ title: '', image: '', salary: '' });
        } catch (err) {
            console.error(err);
            alert('日本語の記事の保存に失敗しました。');
        }
        setLoadingJp(false);
    };

    return (
        <Container className="py-5">
            <h2 className="mb-4">Thêm công việc</h2>
            <Row>
                {/* English Section */}
                <Col md={6}>
                    <h4>Tiếng Anh</h4>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={enData.name}
                            onChange={(e) => setEnData({ ...enData, name: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            value={enData.image}
                            onChange={(e) => setEnData({ ...enData, image: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Salary</Form.Label>
                        <Form.Control
                            type="text"
                            value={enData.salary}
                            onChange={(e) => setEnData({ ...enData, salary: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Sumary</Form.Label>
                        <Form.Control
                            type="text"
                            value={enData.sumary}
                            onChange={(e) => setEnData({ ...enData, sumary: e.target.value })}
                            required
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <TiptapEditor
                            content={enData.description}
                            onChange={(val) => setEnData({ ...enData, description: val })}
                        />
                    </Form.Group>



                    <h5 className="mt-4">Preview (EN):</h5>
                    <h4>{enData.title}</h4>
                    {enData.image && <img src={enData.image} alt="preview" className="img-fluid mb-3" />}
                    <div className="border rounded p-3 bg-light rendered-article" dangerouslySetInnerHTML={{ __html: enData.description }} />

                    <Button className="mt-3" onClick={handleSaveEnglish} disabled={loadingEn}>
                        {loadingEn ? 'Đang lưu tiếng Anh...' : 'Lưu bài viết tiếng Anh'}
                    </Button>
                </Col>

                {/* Japanese Section */}
                <Col md={6}>
                    <h4>tiếng Nhật</h4>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={jpData.title}
                            onChange={(e) => setJpData({ ...jpData, title: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>ImageURL</Form.Label>
                        <Form.Control
                            type="text"
                            value={jpData.image}
                            onChange={(e) => setJpData({ ...jpData, image: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Salary</Form.Label>
                        <Form.Control
                            type="text"
                            value={jpData.salary}
                            onChange={(e) => setJpData({ ...jpData, salary: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Sumary</Form.Label>
                        <Form.Control
                            type="text"
                            value={jpData.sumary}
                            onChange={(e) => setJpData({ ...jpData, sumary: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <TiptapEditor
                            content={jpData.description}
                            onChange={(val) => setJpData({ ...jpData, content: val })}
                        />
                    </Form.Group>


                    <h5 className="mt-4">プレビュー (JP):</h5>
                    <h4>{jpData.title}</h4>
                    {jpData.image && <img src={jpData.image} alt="preview" className="img-fluid mb-3" />}
                    <div className="border rounded p-3 bg-light rendered-article" dangerouslySetInnerHTML={{ __html: jpData.content }} />

                    <Button className="mt-3" onClick={handleSaveJapanese} disabled={loadingJp}>
                        {loadingJp ? '日本語を保存中...' : '日本語の記事を保存'}
                    </Button>

                </Col>
            </Row>
        </Container>
    );
}
