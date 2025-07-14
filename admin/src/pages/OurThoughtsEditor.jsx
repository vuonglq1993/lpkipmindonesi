    import React, { useEffect, useState } from 'react';
    import { db } from '../firebase/firebase';
    import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
    import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

    export default function OurThoughtsEditor() {
        const [dataEn, setDataEn] = useState({});
        const [dataJp, setDataJp] = useState({});
        const [loading, setLoading] = useState(true);
        const [successMsg, setSuccessMsg] = useState("");

        useEffect(() => {
            const fetchData = async () => {
                const enSnap = await getDocs(collection(db, "ourThoughts"));
                const jpSnap = await getDocs(collection(db, "ourThoughtsjp"));

                const enData = {};
                enSnap.forEach((doc) => enData[doc.id] = { ...doc.data(), id: doc.id });
                const jpData = {};
                jpSnap.forEach((doc) => jpData[doc.id] = { ...doc.data(), id: doc.id });

                setDataEn(enData);
                setDataJp(jpData);
                setLoading(false);
            };
            fetchData();
        }, []);

        const handleChange = (lang, sectionId, field, value) => {
            const updater = lang === 'en' ? setDataEn : setDataJp;
            const current = lang === 'en' ? dataEn : dataJp;

            updater({
                ...current,
                [sectionId]: {
                    ...current[sectionId],
                    [field]: value
                }
            });
        };

        const handleSave = async () => {
            try {
                const saveLangData = async (langData, collectionName) => {
                    for (const key in langData) {
                        const ref = doc(db, collectionName, key);
                        await updateDoc(ref, langData[key]);
                    }
                };

                await saveLangData(dataEn, "ourThoughts");
                await saveLangData(dataJp, "ourThoughtsjp");

                setSuccessMsg("✅ Successfully updated both English and Japanese content!");
                setTimeout(() => setSuccessMsg(""), 3000);
            } catch (error) {
                console.error("Update failed:", error);
                alert("Error while saving. Please try again.");
            }
        };

        const renderEditor = (langData, langLabel) => (
            <div className="mb-5">
                <h3 className="mb-3">{langLabel}</h3>
                {Object.keys(langData).map((sectionId) => {
                    const section = langData[sectionId];
                    return (
                        <div key={`${langLabel}-${sectionId}`} className="mb-4 p-3 border rounded bg-light">
                            <h5 className="mb-2">Section: {sectionId}</h5>
                            {Object.entries(section).map(([field, value]) => (
                                field !== 'id' && (
                                    <Form.Group className="mb-2" controlId={`${langLabel}-${sectionId}-${field}`} key={field}>
                                        <Form.Label>{field}</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={field.includes('text') || field.includes('bold') ? 3 : 1}
                                            value={value}
                                            onChange={(e) =>
                                                handleChange(langLabel === "🇺🇸 English" ? 'en' : 'jp', sectionId, field, e.target.value)
                                            }
                                        />
                                    </Form.Group>
                                )
                            ))}
                        </div>
                    );
                })}
            </div>
        );

        return (
            <Container className="py-5">
                <h2 className="text-center mb-4">🛠️ Edit "Our Thoughts" Content</h2>

                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <>
                        <Row>
                            <Col md={6}>{renderEditor(dataEn, "🇺🇸 English")}</Col>
                            <Col md={6}>{renderEditor(dataJp, "🇯🇵 Japanese")}</Col>
                        </Row>

                        {successMsg && <Alert variant="success">{successMsg}</Alert>}

                        <div className="text-center mt-4">
                            <Button variant="success" onClick={handleSave}>
                                💾 Save All Changes
                            </Button>
                        </div>
                    </>
                )}
            </Container>
        );
    }
