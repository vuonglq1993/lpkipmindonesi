import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';

export default function HomeEditor() {
    const [dataEn, setDataEn] = useState({});
    const [dataJp, setDataJp] = useState({});
    const [loading, setLoading] = useState(true);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const enSnap = await getDocs(collection(db, 'home'));
            const jpSnap = await getDocs(collection(db, 'homejp'));

            const enData = {};
            enSnap.forEach((doc) => (enData[doc.id] = { ...doc.data(), id: doc.id }));
            const jpData = {};
            jpSnap.forEach((doc) => (jpData[doc.id] = { ...doc.data(), id: doc.id }));

            setDataEn(enData);
            setDataJp(jpData);
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleChange = (lang, sectionId, field, value) => {
        const setter = lang === 'en' ? setDataEn : setDataJp;
        const current = lang === 'en' ? dataEn : dataJp;

        setter({
            ...current,
            [sectionId]: {
                ...current[sectionId],
                [field]: value,
            },
        });
    };

    const handleSave = async () => {
        try {
            const save = async (data, col) => {
                for (const id in data) {
                    await updateDoc(doc(db, col, id), data[id]);
                }
            };

            await save(dataEn, 'home');
            await save(dataJp, 'homejp');

            setSuccessMsg('✅ Home content updated successfully!');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (error) {
            alert('❌ Error saving data.');
            console.error(error);
        }
    };

    const renderEditor = (data, label, lang) => (
        <div className="mb-5">
            <h3>{label}</h3>
            {Object.keys(data).map((sectionId) => {
                const section = data[sectionId];
                return (
                    <div key={sectionId} className="bg-light p-3 my-3 border rounded">
                        <h5 className="mb-3">Section: {sectionId}</h5>
                        {Object.entries(section).map(([key, value]) => {
                            if (key === 'id') return null;
                            return (
                                <Form.Group className="mb-3" key={key}>
                                    <Form.Label>{key}</Form.Label>
                                    <Form.Control
                                        as={typeof value === 'string' && value.length > 50 ? 'textarea' : 'input'}
                                        rows={3}
                                        value={value}
                                        onChange={(e) => handleChange(lang, sectionId, key, e.target.value)}
                                    />
                                </Form.Group>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );

    return (
        <Container className="py-5 px-4">
            <h2 className="text-center mb-4">🏠 Edit "Home" Page Content</h2>

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
