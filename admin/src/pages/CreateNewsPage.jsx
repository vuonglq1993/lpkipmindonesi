import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { db } from '../firebase/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import TiptapEditor from '../components/TiptapEditor';
import '../components/tiptap.css';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function CreateNewsPage() {
    const [enData, setEnData] = useState({ title: '', image: '', summary: '', content: '' });
    const [jpData, setJpData] = useState({ title: '', image: '', summary: '', content: '' });
    const [loadingEn, setLoadingEn] = useState(false);
    const [loadingJp, setLoadingJp] = useState(false);

    // 🔥 upload function dùng chung
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await res.json();
        return data.secure_url;
    };

    const handleUploadEn = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const url = await uploadImage(file);

        setEnData(prev => ({
            ...prev,
            image: url
        }));
    };

    const handleUploadJp = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const url = await uploadImage(file);

        setJpData(prev => ({
            ...prev,
            image: url
        }));
    };

    const handleSaveEnglish = async () => {
        setLoadingEn(true);
        try {
            const now = Timestamp.now();
            await addDoc(collection(db, 'news'), { ...enData, date: now });
            alert('Đã lưu bài viết tiếng Anh!');
            setEnData({ title: '', image: '', summary: '', content: '' });
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
            await addDoc(collection(db, 'newsjp'), { ...jpData, date: now });
            alert('日本語の記事を保存しました！');
            setJpData({ title: '', image: '', summary: '', content: '' });
        } catch (err) {
            console.error(err);
            alert('日本語の記事の保存に失敗しました。');
        }
        setLoadingJp(false);
    };

    return (
        <Container className="py-5">
            <h2 className="mb-4">Tạo bài viết mới</h2>
            <Row>

                {/* EN */}
                <Col md={6}>
                    <h4>Tiếng Anh</h4>

                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            value={enData.title}
                            onChange={(e) => setEnData({ ...enData, title: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control type="file" onChange={handleUploadEn} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Summary</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={enData.summary}
                            onChange={(e) => setEnData({ ...enData, summary: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <TiptapEditor
                            content={enData.content}
                            onChange={(val) => setEnData({ ...enData, content: val })}
                        />
                    </Form.Group>

                    {/* preview */}
                    <h5>Preview</h5>
                    <h4>{enData.title}</h4>
                    {enData.image && <img src={enData.image} className="img-fluid mb-3" />}
                    <div dangerouslySetInnerHTML={{ __html: enData.content }} />

                    <Button onClick={handleSaveEnglish} disabled={loadingEn}>
                        {loadingEn ? 'Đang lưu...' : 'Lưu EN'}
                    </Button>
                </Col>

                {/* JP */}
                <Col md={6}>
                    <h4>日本語</h4>

                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            value={jpData.title}
                            onChange={(e) => setJpData({ ...jpData, title: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control type="file" onChange={handleUploadJp} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Summary</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={jpData.summary}
                            onChange={(e) => setJpData({ ...jpData, summary: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <TiptapEditor
                            content={jpData.content}
                            onChange={(val) => setJpData({ ...jpData, content: val })}
                        />
                    </Form.Group>

                    <h5>Preview</h5>
                    <h4>{jpData.title}</h4>
                    {jpData.image && <img src={jpData.image} className="img-fluid mb-3" />}
                    <div dangerouslySetInnerHTML={{ __html: jpData.content }} />

                    <Button onClick={handleSaveJapanese} disabled={loadingJp}>
                        {loadingJp ? '保存中...' : 'Lưu JP'}
                    </Button>
                </Col>

            </Row>
        </Container>
    );
}