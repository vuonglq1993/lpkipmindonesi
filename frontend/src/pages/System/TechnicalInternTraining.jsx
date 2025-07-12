import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import './System.css';
import ContactSection from '../../components/contact';

export default function TechnicalInternTraining() {
    return (
        <Container fluid className="py-5">

            {/* Header Banner */}
            <Row className="system-head">
                <p className="text-center fs-1 mb-5">Technical Intern Training Program</p>
            </Row>

            {/* Intro Section */}
            <Row className="text-center py-5 justify-content-center">
                <Col xs={9} md={8}>
                    <img
                        src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/05/about2.png"
                        className="img-fluid"
                        alt="Quote Visual"
                    />
                </Col>
            </Row>
            <Row className=" px-4 mb-5 justify-content-center">

                <Col md={11}>
                    <Row>
                        <Col md={4} className="p-4">
                            <h2 className="text-start">“Human Resource Development”</h2>
                            <hr
                                style={{
                                    border: "none",
                                    height: "6px",
                                    backgroundColor: "#b70000",
                                    margin: "1.5rem 0",
                                    opacity: 1,
                                }}
                            />
                            <p className="fs-5">This system aims to develop human resources by accepting foreigners as technical intern trainees, who will acquire Japanese skills and knowledge through practical work and contribute to the economic development of their home countries.</p>
                        </Col>
                        <Col md={4} className="p-4"><h2 className="text-start">Acceptance for up to 5 years</h2>
                            <hr
                                style={{
                                    border: "none",
                                    height: "6px",
                                    backgroundColor: "#b70000",
                                    margin: "1.5rem 0",
                                    opacity: 1,
                                }}
                            />
                            <p className="fs-5">Technical intern trainees can stay in Japan for a maximum of five years.</p>
                        </Col>
                        <Col md={4} className="p-4"><h2 className="text-start"> 158 tasks in 86 industries are covered</h2>

                            <hr
                                style={{
                                    border: "none",
                                    height: "6px",
                                    backgroundColor: "#b70000",
                                    margin: "1.5rem 0",
                                    opacity: 1,
                                }}
                            />

                            <p className="fs-5">Companies in a variety of industries, including manufacturing, construction, agriculture, and nursing care, are taking advantage of the technical intern training system.</p>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* Number of trainees accepted */}
            <Row className="bg-light py-5 justify-content-center text-center">
                <Col xs={10}>
                </Col>
            </Row>

            {/* STEP 01 */}
            <Row className="text-center mt-5 mb-5 step-01">
                <h1>Flow of <span className="text-danger">the Technical Intern Training Program</span></h1>
                <h2 className="text-danger mt-5">STEP 01</h2>
                <h2>Application - Interview:</h2>


                <Row className="justify-content-center">
                    <Col xs={10} md={9} className="border-border-danger">
                        <h3 className="">The accepting company applies to the supervising organization (TOYO Cooperative Association)</h3>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={10} md={9} className="border-border-danger">
                        <h3 className="">Supervising organizations request sending organizations to recruit candidates</h3>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={10} md={9} className="border-border-danger">
                        <h3 className=""> Local interviews or online interviews are conducted overseas, and successful applicants are selected.</h3>
                    </Col>
                </Row>
                <img src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/09/g-01.png" alt="step 1" className="img-fluid mt-5" />

            </Row>

            {/* STEP 02 */}
            <Row className="text-center mt-5 step-02">
                <h2 className="text-danger mt-5">STEP 02</h2>
                <h2>Application - Entry:</h2>
                <Row className="justify-content-center">
                    <Col xs={10} md={9} className="border-border-danger">
                        <h3 className="">Preparation of technical intern training plan</h3>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col xs={10} md={9} className="border-border-danger bg-warning-subtle">
                        <Row className="justify-content-center">
                            <Col xs={9} md={8}>
                                <p className="step2 fs-6">During the pre-entry training period review, candidates will take training in their home country.</p>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col xs={10} className="border-border-danger bg-white">
                                <h3 className="">Application for certification of technical intern training plan</h3>
                            </Col>
                            <Col xs={10} className="border-border-danger bg-white">
                                <h3 className="">Examination by the Technical Intern Training Organization</h3>
                            </Col>
                            <Col xs={10} className="border-border-danger bg-white">
                                <h3 className="">Obtained a notification of certification for technical intern training plan</h3>
                            </Col>
                            <Col xs={10} className="border-border-danger bg-white">
                                <h3 className="">Application for Certificate of Eligibility</h3>
                            </Col>
                            <Col xs={10} className="border-border-danger bg-white">
                                <h3 className="">Obtaining a Certificate of Eligibility</h3>
                            </Col>
                            <Col xs={10} className="border-border-danger bg-white">
                                <h3 className="">Obtaining a Visa</h3>
                            </Col>
                            <Col xs={10}>
                                <h3 className="">Technical intern trainees entering the country</h3>

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Row>

            {/* STEP 03 */}
            <Row className="text-center mt-5 step-03 justify-content-center">
                <Col xs={10}>
                    <h2 className="text-danger mt-5">STEP 03</h2>
                    <h2>After entering the country ~ Returning home</h2>
                    <p>After entering the country, you will take a course for about one month and begin your practical training at a company.</p>
                    <p>You will aim to pass the skills certification test or skills evaluation test during the three-year training period.</p>
                    <p>When the Technical Intern Training No. 2 ends, you will return to your home country.</p>
                    <p>Furthermore, if you wish to continue for the fourth or fifth year, you will return to your home country (for more than one month).</p>
                    <p>After re-entry, you will resume your fourth year of training.</p>
                    <img src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/09/flow02.png" alt="Step 03" className="img-fluid my-4" />

                </Col>


            </Row>

            {/* Comparison Table */}
            <Row className="bg-light py-5 justify-content-center">
                <Col xs={10}>
                    <h1 className="text-center mb-4">Comparison of the Technical Intern Training Program and the Specified Skills Program</h1>
                    <Table bordered responsive className="w-120 mx-auto text-center">
                        <thead>
                            <tr>
                                <th></th>
                                <th className="bg-black text-white p-3">Technical Intern Training</th>
                                <th className="bg-black text-white p-3">Specified Skills</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-4"><p className="fw-bold">The purpose</p></td>
                                <td className="py-4"><p className="fw-bold">Human resource development and skill transfer</p></td>
                                <td className="py-4"><p className="fw-bold">Eliminating the labor shortage</p></td>
                            </tr>
                            <tr>
                                <td className="py-4"><p className="fw-bold">Status of residence	</p></td>
                                <td className="py-4"><p className="fw-bold">Technical Intern Training (No. 1, No. 2, No. 3)	</p></td>
                                <td className="py-4"><p className="fw-bold">Specific skills (No. 1 and No. 2)</p></td>
                            </tr>
                            <tr>
                                <td className="py-4"><p className="fw-bold">Period of stay	</p></td>
                                <td className="py-4"><p className="fw-bold">Maximum 5 years	</p></td>
                                <td className="py-4"><p className="fw-bold">Specific Skills No. 1: Total of 5 years
Specific Skills No. 2: Unlimited (Construction, Shipbuilding, Marine Industry)</p></td>
                            </tr>
                            <tr>
                                <td className="py-4"><p className="fw-bold">Job Type</p></td>
                                <td className="py-4"><p className="fw-bold">86 industries, 158 tasks	</p></td>
                                <td className="py-4"><p className="fw-bold">12 fields</p></td>
                            </tr>
                            <tr>
                                <td className="py-4"><p className="fw-bold">business	</p></td>
                                <td className="py-4"><p className="fw-bold">Based on the technical intern training plan	</p></td>
                                <td className="py-4"><p className="fw-bold">Specialized/Technical Fields</p></td>
                            </tr>
                            <tr>
                                <td className="py-4"><p className="fw-bold">Foreigners'skill levels</p></td>
                                <td className="py-4"><p className="fw-bold">none	</p></td>
                                <td className="py-4"><p className="fw-bold">Skills that require a considerable degree of knowledge or experience in a specific industrial field</p></td>
                            </tr>
                            <tr>
                                <td className="py-4"><p className="fw-bold">Number of accepted students	</p></td>
                                <td className="py-4"><p className="fw-bold">Number of staff members according to the number of full-time employees	</p></td>
                                <td className="py-4"><p className="fw-bold">No restrictions (excluding nursing care and construction)</p></td>
                            </tr>
                            <tr>
                                <td className="py-4"><p className="fw-bold">Career change	</p></td>
                                <td className="py-4"><p className="fw-bold">Not possible	</p></td>
                                <td className="py-4"><p className="fw-bold">Possible</p></td>
                            </tr>
                            <tr>
                                <td className="py-4"><p className="fw-bold">merit</p></td>
                                <td className="py-4"><p className="fw-bold">Three- and five-year training programs available
Able to accept ambitious and fresh foreign talent</p></td>
                                <td className="py-4"><p className="fw-bold">Eliminate labor shortages and secure work-ready talent
Enables the acceptance of many foreign workers</p></td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>

            {/* Section contact */}
            <ContactSection />

        </Container>
    );
}
