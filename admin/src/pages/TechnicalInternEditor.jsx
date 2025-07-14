import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';

export default function TechnicalInternEditor() {
    const [dataEn, setDataEn] = useState({});
    const [dataJp, setDataJp] = useState({});
    const [loading, setLoading] = useState(true);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const enSnap = await getDocs(collection(db, 'technicalItern'));
            const jpSnap = await getDocs(collection(db, 'technicalInternjp'));

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

    const handleAddPair = (lang, sectionId) => {
        const setter = lang === 'en' ? setDataEn : setDataJp;
        const current = lang === 'en' ? dataEn : dataJp;
        const section = current[sectionId];

        const titleKeys = Object.keys(section).filter((k) => k.startsWith('title'));
        const newIndex = titleKeys.length + 1;
        const newSection = {
            ...section,
            [`title${newIndex}`]: '',
            [`description${newIndex}`]: '',
        };

        setter({ ...current, [sectionId]: newSection });
    };

    const handleDeletePair = (lang, sectionId, index) => {
        const setter = lang === 'en' ? setDataEn : setDataJp;
        const current = lang === 'en' ? dataEn : dataJp;
        const section = { ...current[sectionId] };

        delete section[`title${index}`];
        delete section[`description${index}`];

        setter({ ...current, [sectionId]: section });
    };

    const handleSave = async () => {
        try {
            const save = async (data, col) => {
                for (const id in data) {
                    await updateDoc(doc(db, col, id), data[id]);
                }
            };

            await save(dataEn, 'technicalItern');
            await save(dataJp, 'technicalInternjp');

            setSuccessMsg('✅ Content updated successfully!');
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
                const keys = Object.keys(section);

                return (
                    <div key={sectionId} className="bg-light p-3 my-3 border rounded">
                        <h5 className="mb-3">Section: {sectionId}</h5>

                        {/* For ti01 - title/description pairs */}
                        {keys.filter(k => k.startsWith('title')).map((titleKey) => {
                            const index = titleKey.replace('title', '');
                            const descKey = `description${index}`;
                            return (
                                <div key={titleKey} className="mb-3">
                                    <Form.Group className="mb-2">
                                        <Form.Label>{titleKey}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={section[titleKey]}
                                            onChange={(e) => handleChange(lang, sectionId, titleKey, e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>{descKey}</Form.Label>
                                        <div className="d-flex gap-2">
                                            <Form.Control
                                                as="textarea"
                                                rows={2}
                                                value={section[descKey] || ''}
                                                onChange={(e) => handleChange(lang, sectionId, descKey, e.target.value)}
                                            />
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDeletePair(lang, sectionId, index)}
                                            >
                                                ❌
                                            </Button>
                                        </div>
                                    </Form.Group>
                                </div>
                            );
                        })}

                        {/* For other fields (img, text, bigtext, dangertext...) */}
                        {keys.filter(k =>
                            !k.startsWith('title') &&
                            !k.startsWith('description') &&
                            k !== 'id'
                        ).map((key) => (
                            <Form.Group className="mb-3" key={key}>
                                <Form.Label>{key}</Form.Label>
                                <Form.Control
                                    as={key.startsWith('text') || key.includes('text') ? 'textarea' : 'input'}
                                    rows={2}
                                    value={section[key]}
                                    onChange={(e) => handleChange(lang, sectionId, key, e.target.value)}
                                />
                            </Form.Group>
                        ))}

                        {/* Add title/desc pair button */}
                        {sectionId === 'ti01' && (
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => handleAddPair(lang, sectionId)}
                            >
                                ➕ Add title/description
                            </Button>
                        )}
                    </div>
                );
            })}
        </div>
    );

    return (
        <Container className="py-5 px-4">
            <h2 className="text-center mb-4">🛠️ Edit "Technical Intern Training Program" Content</h2>

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
