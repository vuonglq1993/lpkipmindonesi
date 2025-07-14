import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import './Contact.css';
import { db } from '../../firebase/firebase';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useLanguage } from '../../context/LanguageContext';

export default function Contact() {
    const { language } = useLanguage();
    const [formData, setFormData] = useState({
        companyName: '',
        location: '',
        phone1: '',
        phone2: '',
        personInCharge: '',
        personFurigana: '',
        email: '',
        industry: '',
        inquiry: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const col = language === 'jp' ? 'contactMessagesjp' : 'contactMessages';
            await addDoc(collection(db, col), {
                ...formData,
                createdAt: Timestamp.now()
            });
            setSubmitted(true);
        } catch (err) {
            console.error("Submit failed:", err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="py-5 bg-white">
            <Row className="about-head">
                <h1 className="text-white text-center fw-bold">
                    {language === 'en' ? 'Contact' : 'お問い合わせ'}
                </h1>
            </Row>

            <Row className="justify-content-center">
                <Col md={8}>
                    {submitted ? (
                        <h4 className="text-success text-center mb-5">
                            {language === 'en'
                                ? 'Your inquiry has been submitted. Thank you!'
                                : '送信が完了しました。ありがとうございました。'}
                        </h4>
                    ) : (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    {language === 'en' ? 'Company name (or individual name)' : '会社名または個人名'} <strong>[Required]</strong>
                                </Form.Label>
                                <Form.Control name="companyName" required value={formData.companyName} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>{language === 'en' ? 'Location' : '所在地'} <strong>[Required]</strong></Form.Label>
                                <Form.Control name="location" required value={formData.location} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>{language === 'en' ? 'Phone number' : '電話番号'} <strong>[Required]</strong></Form.Label>
                                <Row>
                                    <Col xs={3}><Form.Control name="phone1" required value={formData.phone1} onChange={handleChange} /></Col>
                                    <Col xs={7}><Form.Control name="phone2" required value={formData.phone2} onChange={handleChange} /></Col>
                                </Row>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>{language === 'en' ? 'Person in charge' : 'ご担当者様'} <strong>[Required]</strong></Form.Label>
                                <Form.Control name="personInCharge" required value={formData.personInCharge} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>{language === 'en' ? 'Furigana' : 'ふりがな'} <strong>[Required]</strong></Form.Label>
                                <Form.Control name="personFurigana" required value={formData.personFurigana} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>{language === 'en' ? 'Email address' : 'メールアドレス'} <strong>[Required]</strong></Form.Label>
                                <Form.Control name="email" type="email" required value={formData.email} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>{language === 'en' ? 'Industry (optional)' : '業種（任意）'}</Form.Label>
                                <Form.Control name="industry" value={formData.industry} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label>{language === 'en' ? 'Inquiry details (optional)' : 'お問い合わせ内容（任意）'}</Form.Label>
                                <Form.Control as="textarea" rows={4} name="inquiry" value={formData.inquiry} onChange={handleChange} />
                            </Form.Group>

                            <div className="text-center">
                                <Button variant="danger" type="submit" disabled={submitting}>
                                    {submitting
                                        ? (language === 'en' ? 'Submitting...' : '送信中...')
                                        : (language === 'en' ? 'Check your input' : '入力内容を確認する')}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
