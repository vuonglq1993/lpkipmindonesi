import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Container, Row, Col, Table } from 'react-bootstrap';
import ContactSection from '../../components/contact';
import { Helmet } from 'react-helmet';
import { useLanguage } from '../../context/LanguageContext';

export default function TechnicalInternTraining() {
    const { language } = useLanguage();
    const [sections, setSections] = useState({});
    const [comparisonTable, setComparisonTable] = useState({ rows: [], header: { th1: '', th2: '' } });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const contentCol = language === 'en' ? 'technicalItern' : 'technicalInternjp';
            const comparisonCol = language === 'en' ? 'comparisonTable' : 'comparisonTablejp';

            const contentSnap = await getDocs(collection(db, contentCol));
            const contentData = {};
            contentSnap.forEach((doc) => {
                contentData[doc.id] = doc.data();
            });

            const tableSnap = await getDocs(collection(db, comparisonCol));
            const rows = [];
            let header = { th1: '', th2: '' };
            tableSnap.forEach((doc) => {
                if (doc.id === 'th') {
                    header = doc.data();
                } else {
                    rows.push({ id: doc.id, ...doc.data() });
                }
            });

            setSections(contentData);
            setComparisonTable({ rows, header });
            setLoading(false);
        };

        fetchData();
    }, [language]);

    return (
        <Container className="py-5 bg-white">
            <Helmet>
                <title>Technical Intern Training Program - {language === 'en' ? 'English' : 'Japanese'}</title>
                <meta name="description" content="Technical Intern Training Program" />
            </Helmet>

            <Row className="system-head">
                <p className="text-center fs-1 mb-5">Technical Intern Training Program</p>
            </Row>

            {/* Section ti01 */}
            {sections.ti01 && (
                <>
                    <Row className="text-center py-5 justify-content-center">
                        <Col xs={9} md={8}>
                            <img src={sections.ti01.img1} className="img-fluid" alt="ti01 banner" />
                        </Col>
                    </Row>
                    <Row className="px-4 mb-5 justify-content-center">
                        <Col md={11}>
                            <Row>
                                {Object.entries(sections.ti01)
                                    .filter(([key]) => key.startsWith('title'))
                                    .map(([key, value]) => {
                                        const index = key.replace('title', '');
                                        const description = sections.ti01[`description${index}`];
                                        return (
                                            <Col md={4} className="p-4" key={key}>
                                                <h2 className="text-start">{value}</h2>
                                                <hr
                                                    style={{
                                                        border: 'none',
                                                        height: '6px',
                                                        backgroundColor: '#b70000',
                                                        margin: '1.5rem 0',
                                                        opacity: 1,
                                                    }}
                                                />
                                                <p className="fs-5">{description}</p>
                                            </Col>
                                        );
                                    })}
                            </Row>
                        </Col>
                    </Row>
                </>
            )}

            {/* Section ti02 */}
            {sections.ti02 && (
                <Row className="text-center mt-5 mb-5 step-01">
                    <h1>
                        {sections.ti02.boldtext1}{' '}
                        <span className="text-danger">{sections.ti02.dangertext1}</span>
                    </h1>
                    <h2 className="text-danger mt-5">{sections.ti02.title}</h2>
                    <h2>{sections.ti02.description}</h2>
                </Row>
            )}

            {/* Section ti03 */}
            {sections.ti03 && (
                <Row className="text-center mt-5 mb-5 step-01">
                    <h1>
                        {sections.ti03?.bigtext}{' '}
                        <span className="text-danger">{sections.ti03?.dangertext}</span>
                    </h1>
                    {Object.entries(sections.ti03)
                        .filter(([key]) => key.startsWith('text'))
                        .map(([key, value]) => (
                            <Row className="justify-content-center" key={key}>
                                <Col xs={10} md={9} className="border-border-danger">
                                    <h3 className="fw-bold">{value}</h3>
                                </Col>
                            </Row>
                        ))}
                    <Row className="justify-content-center">
                        <Col xs={10} md={9}>
                            <img src={sections.ti03.img1} alt="step visual" className="img-fluid mt-5" />
                        </Col>
                    </Row>
                </Row>
            )}

            {/* Section ti04 */}
            {sections.ti04 && (
                <Row className="text-center mt-5 step-02 justify-content-center">
                    <Col xs={10}>
                        <h2 className="text-danger mt-5">{sections.ti04.title}</h2>
                        <h2>{sections.ti04.description}</h2>

                        <Row className="justify-content-center">
                            <Col xs={10} md={9} className="border-border-danger">
                                <h3 className="fw-bold">{sections.ti04.prep1}</h3>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col xs={10} md={9} className="border-border-danger bg-warning-subtle">
                                <Row className="justify-content-center">
                                    <Col xs={9} md={8}>
                                        <p className="step2 fs-6">{sections.ti04.smalltext1}</p>
                                    </Col>
                                </Row>

                                {Object.entries(sections.ti04)
                                    .filter(([key]) => key.startsWith('text'))
                                    .map(([key, value]) => (
                                        <Row className="justify-content-center" key={key}>
                                            <Col xs={10} className="border-border-danger bg-white">
                                                <h3 className="fw-bold">{value}</h3>
                                            </Col>
                                        </Row>
                                    ))}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )}

            {/* Section ti05 */}
            {sections.ti05 && (
                <Row className="text-center mt-5 step-03 justify-content-center">
                    <Col xs={10}>
                        <h2 className="text-danger mt-5">{sections.ti05.title}</h2>
                        <h2>{sections.ti05.description}</h2>

                        {Object.entries(sections.ti05)
                            .filter(([key]) => key.startsWith('text'))
                            .map(([key, value]) => (
                                <p key={key}>{value}</p>
                            ))}

                        <img src={sections.ti05.img1} alt="Step 03" className="img-fluid my-4" />
                    </Col>
                </Row>
            )}

            {/* Comparison Table */}
            {comparisonTable.rows.length > 0 && (
                <Row className="bg-light py-5 justify-content-center">
                    <Col xs={10}>
                        <h1 className="text-center mb-4">
                            Comparison of the Technical Intern Training Program and the Specified Skills Program
                        </h1>
                        <Table bordered responsive className="w-120 mx-auto text-center">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th className="bg-black text-white p-3">{comparisonTable.header.th1}</th>
                                    <th className="bg-black text-white p-3">{comparisonTable.header.th2}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonTable.rows.map((row, index) => (
                                    <tr key={index}>
                                        <td className="py-4">
                                            <p className="fw-bold">{row.id}</p>
                                        </td>
                                        <td className="py-4">
                                            <p className="fw-bold">{row.col1}</p>
                                        </td>
                                        <td className="py-4">
                                            <p className="fw-bold">{row.col2}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            )}

            {/* Section contact */}
            <ContactSection />
        </Container>
    );
}
