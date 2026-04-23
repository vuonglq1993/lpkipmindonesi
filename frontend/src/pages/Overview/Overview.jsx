import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Container, Row, Col, Table } from 'react-bootstrap';
import ContactSection from '../../components/contact';
import { useLanguage } from '../../context/LanguageContext';
import "./Overview.css";

export default function Overview() {
    const { language } = useLanguage();
    const [rows, setRows] = useState([]);
    const [prf, setPrf] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleContextMenu = (e) => {
            if (e.target.tagName === "IMG") {
                e.preventDefault();
            }
        };

        document.addEventListener("contextmenu", handleContextMenu);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const colName = language === 'en' ? 'UnionTable' : 'UnionTablejp';
            const snap = await getDocs(collection(db, colName));
            const data = [];
            let prfData = null;

            snap.forEach(doc => {
                if (doc.id === 'prf') {
                    prfData = doc.data(); // lấy prf riêng
                } else {
                    data.push({ id: doc.id, ...doc.data() });
                }
            });

            data.sort((a, b) => parseInt(a.id.replace('Row', '')) - parseInt(b.id.replace('Row', '')));

            setRows(data);
            setPrf(prfData); // set prf
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

        <section className=" bg-white">
            {/* Section Header */}
            {/* Section prf */}
        <img src={prf?.img} className="img-fluid" alt="" />

            {/* Section Table */}
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <Row className="justify-content-center">

                    <Col xs={12} md={10}>
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
        </section>
    );
}
