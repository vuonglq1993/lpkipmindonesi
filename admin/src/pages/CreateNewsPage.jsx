import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { db } from '../firebase/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import TiptapEditor from '../components/TiptapEditor';
import '../components/tiptap.css';


export default function CreateNewsPage() {
    const [enData, setEnData] = useState({ title: '', image: '', content: '' });
    const [jpData, setJpData] = useState({ title: '', image: '', content: '' });
    const [loadingEn, setLoadingEn] = useState(false);
    const [loadingJp, setLoadingJp] = useState(false);

    const handleSaveEnglish = async () => {
        setLoadingEn(true);
        try {
            const now = Timestamp.now();
            await addDoc(collection(db, 'news'), { ...enData, date: now });
            alert('Đã lưu bài viết tiếng Anh!');
            setEnData({ title: '', image: '', content: '' });
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
            setJpData({ title: '', image: '', content: '' });
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
                {/* English Section */}
                <Col md={6}>
                    <h4>Tiếng Anh</h4>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={enData.title}
                            onChange={(e) => setEnData({ ...enData, title: e.target.value })}
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
                        <Form.Label>Content</Form.Label>
                        <TiptapEditor
                            content={enData.content}
                            onChange={(val) => setEnData({ ...enData, content: val })}
                        />
                    </Form.Group>



                    <h5 className="mt-4">Preview (EN):</h5>
                    <h4>{enData.title}</h4>
                    {enData.image && <img src={enData.image} alt="preview" className="img-fluid mb-3" />}
                    <div className="border rounded p-3 bg-light rendered-article" dangerouslySetInnerHTML={{ __html: enData.content }} />

                    <Button className="mt-3" onClick={handleSaveEnglish} disabled={loadingEn}>
                        {loadingEn ? 'Đang lưu tiếng Anh...' : 'Lưu bài viết tiếng Anh'}
                    </Button>
                </Col>

                {/* Japanese Section */}
                <Col md={6}>
                    <h4>日本語</h4>
                    <Form.Group className="mb-3">
                        <Form.Label>タイトル</Form.Label>
                        <Form.Control
                            type="text"
                            value={jpData.title}
                            onChange={(e) => setJpData({ ...jpData, title: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>画像URL</Form.Label>
                        <Form.Control
                            type="text"
                            value={jpData.image}
                            onChange={(e) => setJpData({ ...jpData, image: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>内容</Form.Label>
                        <TiptapEditor
                            content={jpData.content}
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
