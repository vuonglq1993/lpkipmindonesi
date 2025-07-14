import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

export default function OurRoleEditor() {
    const [dataEn, setDataEn] = useState({});
    const [dataJp, setDataJp] = useState({});
    const [loading, setLoading] = useState(true);
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const enSnap = await getDocs(collection(db, "ourRole"));
            const jpSnap = await getDocs(collection(db, "ourRolejp"));

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

    const handleAddField = (lang, sectionId) => {
        const updater = lang === 'en' ? setDataEn : setDataJp;
        const current = lang === 'en' ? dataEn : dataJp;

        const section = current[sectionId];
        const textKeys = Object.keys(section).filter((k) => k.startsWith('text'));
        const newKey = `text${textKeys.length + 1}`;

        updater({
            ...current,
            [sectionId]: {
                ...section,
                [newKey]: ""
            }
        });
    };

    const handleDeleteField = (lang, sectionId, field) => {
        const updater = lang === 'en' ? setDataEn : setDataJp;
        const current = lang === 'en' ? dataEn : dataJp;
        const updatedSection = { ...current[sectionId] };
        delete updatedSection[field];

        updater({
            ...current,
            [sectionId]: updatedSection
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

            await saveLangData(dataEn, "ourRole");
            await saveLangData(dataJp, "ourRolejp");

            setSuccessMsg("✅ Successfull!");
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (error) {
            console.error("Update failed:", error);
            alert("Lỗi khi lưu. Vui lòng thử lại.");
        }
    };

    const renderEditor = (langData, langLabel) => (
        <div className="mb-5">
            <h3 className="mb-3">{langLabel}</h3>
            {Object.keys(langData).map((sectionId) => {
                const section = langData[sectionId];
                return (
                    <div key={`${langLabel}-${sectionId}`} className="mb-4 p-3 border rounded bg-light">
                        <h5 className="mb-3">Section: {sectionId}</h5>
                        {Object.entries(section).map(([field, value]) => (
                            field !== 'id' && (
                                <Form.Group className="mb-2" controlId={`${langLabel}-${sectionId}-${field}`} key={field}>
                                    <Form.Label>{field}</Form.Label>
                                    <div className="d-flex gap-2">
                                        <Form.Control
                                            as="textarea"
                                            rows={field.includes('text') ? 2 : 1}
                                            value={value}
                                            onChange={(e) =>
                                                handleChange(langLabel === "🇺🇸 English" ? 'en' : 'jp', sectionId, field, e.target.value)
                                            }
                                        />
                                        {field.startsWith("text") && (
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDeleteField(langLabel === "🇺🇸 English" ? 'en' : 'jp', sectionId, field)}
                                            >
                                                ❌
                                            </Button>
                                        )}
                                    </div>
                                </Form.Group>
                            )
                        ))}
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleAddField(langLabel === "🇺🇸 English" ? 'en' : 'jp', sectionId)}
                        >
                            ➕ Thêm dòng text
                        </Button>
                    </div>
                );
            })}
        </div>
    );

    return (
        <Container fluid className="py-5 px-4">
            <h2 className="text-center mb-4">🛠️ Edit "Our Role" Content</h2>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <>
                    <Row>
                        <Col md={6}>{renderEditor(dataEn, "🇺🇸 English")}</Col>
                        <Col md={6}>{renderEditor(dataJp, "🇯🇵 Japanese")}</Col>
                    </Row>

                    {successMsg && <Alert variant="success" className="text-center mt-3">{successMsg}</Alert>}

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
