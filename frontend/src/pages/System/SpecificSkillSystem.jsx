import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Row, Col, Container, Table } from 'react-bootstrap';
import ContactSection from '../../components/contact';
import { Helmet } from 'react-helmet';
import { useLanguage } from '../../context/LanguageContext';
import './System.css';


export default function SpecificSkillSystem() {
    const { language } = useLanguage();
    const [sections, setSections] = useState({});
    const [comparisonTable, setComparisonTable] = useState({ rows: [], header: { th1: '', th2: '' } });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const contentCol = language === 'en' ? 'skillSystem' : 'skillSystemjp';
            const tableCol = language === 'en' ? 'comparisonTable' : 'comparisonTablejp';

            // Load sections
            const contentSnap = await getDocs(collection(db, contentCol));
            const contentData = {};
            contentSnap.forEach((doc) => {
                contentData[doc.id] = doc.data();
            });

            // Load table
            const tableSnap = await getDocs(collection(db, tableCol));
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
                <title>Specific Skill System - {language === 'en' ? 'English' : 'Japanese'}</title>
                <meta name="description" content="Specific Skill System" />
            </Helmet>

            <Row className="about-head">
            <h1 className="text-white text-center fs-1 mb-5">{language === 'en' ? 'Specific skill system' : '特定技能制度'}</h1>
            </Row>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <>
                    {/* Section sk01 */}
                    {sections.sk01 && (
                        <>
                            <Row className="text-center py-5 justify-content-center system-intro">
                                <Col md={8}>
                                    <img src={sections.sk01?.img1} className="img-fluid" alt="" />
                                </Col>
                            </Row>
                            <Row className="px-4 mb-5 justify-content-center">
                                <Col md={11}>
                                    <Row>
                                        {Object.entries(sections.sk01)
                                            .filter(([key]) => key.startsWith('title'))
                                            .map(([key, value], index) => {
                                                const descKey = `description${key.replace('title', '')}`;
                                                const description = sections.sk01[descKey];
                                                return (
                                                    <Col md={4} className="p-4" key={key}>
                                                        <h2 className="text-start">{value}</h2>
                                                        <hr
                                                            style={{
                                                                border: "none",
                                                                height: "6px",
                                                                backgroundColor: "#b70000",
                                                                margin: "1.5rem 0",
                                                                opacity: 1,
                                                            }}
                                                        />
                                                        <p className="fs-5">{description}</p>
                                                    </Col>
                                                );
                                            })}
                                    </Row>
                                    <Row className="text-center justify-content-center">
                                        <Col xs={10}>
                                            <img src={sections.sk01?.img2} className="text-center skill-img img-fluid" alt="" />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </>
                    )}

                    {/* Section sk02 */}
                    {sections.sk02 && (
                        <Row className="bg-light py-5 justify-content-center text-center">
                            <Col xs={10}>
                                <Row className="justify-content-center text-center">
                                    {Object.entries(sections.sk02)
                                        .filter(([key]) => key.startsWith('img'))
                                        .map(([key, value]) => (
                                            <Col md={3} className="mt-5" key={key}>
                                                <img src={value} className="img-fluid" alt="field" />
                                            </Col>
                                        ))}
                                </Row>
                            </Col>
                        </Row>
                    )}

                    {/* Section sk03 */}
                    {sections.sk03 && (
                        <Row className="text-center mt-5 mb-5 step-01">
                            <h1 className="mb-5">
                                {sections.sk03?.bigtext}{' '}
                                <span className="text-danger">{sections.sk03?.dangertext}</span>
                            </h1>
                            {Object.entries(sections.sk03)
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
                                    <img src={sections.sk03.img1} alt="step visual" className="img-fluid mt-5" />
                                </Col>
                            </Row>
                        </Row>
                    )}

                    {/* Section sk04 */}
                    {sections.sk04 && (
                        <Row className="text-center mt-5 step-02 justify-content-center">
                            <Col xs={10}>
                                <h1>{sections.sk04.title}                                
                                <span className="text-danger">{sections.sk04?.description}</span>
</h1>
                                <img src={sections.sk04.img1} alt="step image" className="img-fluid mt-5 mb-5" />
                            </Col>
                        </Row>
                    )}

                    {/* Comparison Table */}
                    {comparisonTable.rows?.length > 0 && (
                        <Row className="bg-light py-5 justify-content-center">
                            <Col xs={10}>
                                <h1 className="text-center mb-4">Comparison Table</h1>
                                <Table bordered responsive className="w-120 mx-auto text-center">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th className="bg-black text-white p-3">{comparisonTable.header.th1}</th>
                                            <th className="bg-black text-white p-3">{comparisonTable.header.th2}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comparisonTable.rows.map((row, idx) => (
                                            <tr key={idx}>
                                                <td className="py-4">
                                                    <p className="fw-bold">{row.id}</p>
                                                </td>
                                                <td className="py-4">
                                                    <p className="fw-bold">{row.col1}</p>
                                                </td>
                                                <td className="py-4">
                                                    <p className="fw-bold">{row.col2 || ''}</p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    )}
                </>
            )}

            <ContactSection />
        </Container>
    );
}
