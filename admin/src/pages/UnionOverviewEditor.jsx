import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, doc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';

export default function OverviewEditor() {
    const [dataEn, setDataEn] = useState([]);
    const [dataJp, setDataJp] = useState([]);
    const [loading, setLoading] = useState(true);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const fetchCollection = async (colName) => {
                const snap = await getDocs(collection(db, colName));
                const rows = [];
                snap.forEach(doc => rows.push({ id: doc.id, ...doc.data() }));
                rows.sort((a, b) => parseInt(a.id.replace('Row', '')) - parseInt(b.id.replace('Row', '')));
                return rows;
            };

            const enData = await fetchCollection('UnionTable');
            const jpData = await fetchCollection('UnionTablejp');

            setDataEn(enData);
            setDataJp(jpData);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleChange = (lang, index, field, value) => {
        const setter = lang === 'en' ? setDataEn : setDataJp;
        const current = lang === 'en' ? dataEn : dataJp;
        const updated = [...current];
        updated[index][field] = value;
        setter(updated);
    };

    const handleAddRow = (lang) => {
        const setter = lang === 'en' ? setDataEn : setDataJp;
        const current = lang === 'en' ? dataEn : dataJp;
        const nextIndex = current.length + 1;
        const newRow = { id: `Row${nextIndex}`, th1: '', td1: '' };
        setter([...current, newRow]);
    };

    const handleDeleteRow = (lang, index) => {
        const setter = lang === 'en' ? setDataEn : setDataJp;
        const current = lang === 'en' ? dataEn : dataJp;
        const rowToDelete = current[index];
        deleteDoc(doc(db, lang === 'en' ? 'UnionTable' : 'UnionTablejp', rowToDelete.id));
        const updated = current.filter((_, i) => i !== index);
        setter(updated);
    };

    const handleSave = async () => {
        try {
            const save = async (data, col) => {
                for (const row of data) {
                    const { id, ...rest } = row;
                    await setDoc(doc(db, col, id), rest);
                }
            };

            await save(dataEn, 'UnionTable');
            await save(dataJp, 'UnionTablejp');

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
            <Button variant="secondary" size="sm" className="mb-3" onClick={() => handleAddRow(lang)}>➕ Add new row</Button>
            {data.map((row, idx) => (
                <div key={row.id} className="bg-light p-3 my-3 border rounded">
                    <h5 className="mb-3">Document ID: {row.id}</h5>
                    {Object.entries(row).map(([key, value]) => (
                        key !== 'id' && (
                            <Form.Group key={key} className="mb-3">
                                <Form.Label>{key}</Form.Label>
                                <Form.Control
                                    as={key.startsWith('td') ? 'textarea' : 'input'}
                                    rows={2}
                                    value={value}
                                    onChange={(e) => handleChange(lang, idx, key, e.target.value)}
                                    autoFocus={idx === data.length - 1 && value === ''}
                                />
                            </Form.Group>
                        )
                    ))}
                    <Button variant="danger" size="sm" onClick={() => handleDeleteRow(lang, idx)}>
                        🗑️ Delete row
                    </Button>
                </div>
            ))}
        </div>
    );

    return (
        <Container className="py-5 px-4">
            <h2 className="text-center mb-4">🛠️ Edit "Union Overview" Content</h2>

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
