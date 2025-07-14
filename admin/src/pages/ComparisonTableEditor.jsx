import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import {
    collection,
    getDocs,
    doc,
    deleteDoc,
    setDoc
} from 'firebase/firestore';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Alert
} from 'react-bootstrap';

export default function ComparisonTableEditor() {
    const [tableEn, setTableEn] = useState([]);
    const [tableJp, setTableJp] = useState([]);
    const [loading, setLoading] = useState(true);
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const enSnap = await getDocs(collection(db, "comparisonTable"));
            const jpSnap = await getDocs(collection(db, "comparisonTablejp"));

            const enData = [];
            enSnap.forEach((doc) =>
                enData.push({ originalId: doc.id, id: doc.id, ...doc.data() })
            );

            const jpData = [];
            jpSnap.forEach((doc) =>
                jpData.push({ originalId: doc.id, id: doc.id, ...doc.data() })
            );

            setTableEn(enData);
            setTableJp(jpData);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleChange = (lang, index, field, value) => {
        const updater = lang === 'en' ? setTableEn : setTableJp;
        const current = lang === 'en' ? [...tableEn] : [...tableJp];
        current[index][field] = value;
        updater(current);
    };

    const handleDeleteRow = (lang, index) => {
        const updater = lang === 'en' ? setTableEn : setTableJp;
        const current = lang === 'en' ? [...tableEn] : [...tableJp];

        const row = current[index];
        if (row.originalId === 'th') return; // không xoá header

        updater(current.filter((_, i) => i !== index));
    };

    const handleAddRow = (lang) => {
        const updater = lang === 'en' ? setTableEn : setTableJp;
        const current = lang === 'en' ? [...tableEn] : [...tableJp];

        updater([
            ...current,
            {
                id: `row${current.length + 1}`,
                originalId: `row${current.length + 1}`,
                col1: '',
                col2: ''
            }
        ]);
    };

    const handleSave = async () => {
        try {
            const saveTable = async (data, collectionName) => {
                const currentDocs = await getDocs(collection(db, collectionName));
                const existingIds = new Set();
                currentDocs.forEach((doc) => existingIds.add(doc.id));

                // Xoá toàn bộ trước
                for (const id of existingIds) {
                    await deleteDoc(doc(db, collectionName, id));
                }

                // Ghi lại toàn bộ mới
                for (const row of data) {
                    await setDoc(doc(db, collectionName, row.id), {
                        ...(row.th1 && { th1: row.th1 }),
                        ...(row.th2 && { th2: row.th2 }),
                        ...(row.col1 && { col1: row.col1 }),
                        ...(row.col2 && { col2: row.col2 }),
                    });
                }
            };

            await saveTable(tableEn, "comparisonTable");
            await saveTable(tableJp, "comparisonTablejp");

            setSuccessMsg("✅ Saved successfully!");
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (error) {
            console.error("Save error:", error);
            alert("❌ Error when saving. Please try again.");
        }
    };

    const renderTableEditor = (data, langLabel, lang) => (
        <div className="mb-5">
            <h3 className="mb-3">{langLabel}</h3>
            {data.map((row, idx) => (
                <div key={`${lang}-${row.originalId}-${idx}`} className="p-3 border rounded mb-3 bg-light">
                    <Form.Group className="mb-2">
                        <Form.Label>Row ID</Form.Label>
                        <Form.Control
                            type="text"
                            value={row.id}
                            onChange={(e) => handleChange(lang, idx, "id", e.target.value)}
                        />
                    </Form.Group>

                    {row.originalId === "th" ? (
                        <>
                            <Form.Group className="mb-2">
                                <Form.Label>th1</Form.Label>
                                <Form.Control
                                    value={row.th1 || ''}
                                    onChange={(e) => handleChange(lang, idx, "th1", e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>th2</Form.Label>
                                <Form.Control
                                    value={row.th2 || ''}
                                    onChange={(e) => handleChange(lang, idx, "th2", e.target.value)}
                                />
                            </Form.Group>
                        </>
                    ) : (
                        <>
                            <Form.Group className="mb-2">
                                <Form.Label>col1</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    value={row.col1 || ''}
                                    onChange={(e) => handleChange(lang, idx, "col1", e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>col2</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    value={row.col2 || ''}
                                    onChange={(e) => handleChange(lang, idx, "col2", e.target.value)}
                                />
                            </Form.Group>

                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteRow(lang, idx)}
                            >
                                ❌ Delete Row
                            </Button>
                        </>
                    )}
                </div>
            ))}

            <Button variant="secondary" onClick={() => handleAddRow(lang)}>
                ➕ Add Row
            </Button>
        </div>
    );

    return (
        <Container fluid className="py-5 px-4">
            <h2 className="text-center mb-4">🛠️ Edit Comparison Table (With Add/Delete)</h2>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <>
                    <Row>
                        <Col md={6}>{renderTableEditor(tableEn, "🇺🇸 English", "en")}</Col>
                        <Col md={6}>{renderTableEditor(tableJp, "🇯🇵 Japanese", "jp")}</Col>
                    </Row>

                    {successMsg && (
                        <Alert variant="success" className="text-center mt-3">
                            {successMsg}
                        </Alert>
                    )}

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
