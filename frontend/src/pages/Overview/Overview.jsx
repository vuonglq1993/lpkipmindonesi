import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Container, Row, Col, Table } from 'react-bootstrap';
import ContactSection from '../../components/contact';
import { useLanguage } from '../../context/LanguageContext';

export default function Overview() {
    const { language } = useLanguage();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const colName = language === 'en' ? 'UnionTable' : 'UnionTablejp';
            const snap = await getDocs(collection(db, colName));
            const data = [];
            snap.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
            data.sort((a, b) => parseInt(a.id.replace('Row', '')) - parseInt(b.id.replace('Row', '')));
            setRows(data);
            setLoading(false);
        };

        fetchData();
    }, [language]);

    const renderRow = (row) => {
        const header = Object.entries(row).find(([key]) => key.startsWith('th'))?.[1];
        const cells = Object.entries(row)
            .filter(([key]) => key.startsWith('td'))
            .map(([key, value]) => value)
            .join('<br/>'); // Will render as raw HTML

        return (
            <tr key={row.id}>
                <th className="py-3">{header}</th>
                <td className="py-3" dangerouslySetInnerHTML={{ __html: cells }} />
            </tr>
        );
    };

    return (
        <Container className="py-5 bg-white">
            {/* Section Header */}
            <Row className="about-head">
                <p className="text-center fs-1 mb-5">Union Overview</p>
            </Row>

            {/* Section Table */}
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <Row className="justify-content-center">
                    <Col xs={12} md={8}>
                        <Table responsive className="table table-striped table-top-bottom-border">
                            <tbody>
                                {rows.map(renderRow)}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            )}

            {/* Contact section */}
            <ContactSection />
        </Container>
    );
}
