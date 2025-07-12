import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import './System.css';
import ContactSection from '../../components/contact';
export default function SpeccificSkillSystem() {
    return (
        <Container fluid className="py-5">

            {/* Header Banner */}
            <Row className="system-head">
                <p className="text-center fs-1 mb-5">Specific Skill System</p>
            </Row>

            {/* Intro Section */}
            <Row className="text-center py-5 justify-content-center system-intro">
                <Col md={8}>
                    <img
                        src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/05/sswtitle01.png"
                        className="img-fluid"
                        alt="Quote Visual"
                    />
                </Col>
            </Row>
            <Row className=" px-4 mb-5 justify-content-center">

                <Col md={11}>
                    <Row>
                        <Col md={4} className="p-4">
                            <h2 className="text-start">Eliminating labor shortages</h2>
                            <hr
                                style={{
                                    border: "none",
                                    height: "6px",
                                    backgroundColor: "#b70000",
                                    margin: "1.5rem 0",
                                    opacity: 1,
                                }}
                            />
                            <p className="fs-5">In response to the worsening labor shortage, this system allows foreigners who have a certain level of expertise and skills and are ready to work immediately to take up the job.</p>
                        </Col>
                        <Col md={4} className="p-4"><h2 className="text-start">Total of 5 years</h2>
                            <hr
                                style={{
                                    border: "none",
                                    height: "6px",
                                    backgroundColor: "#b70000",
                                    margin: "1.5rem 0",
                                    opacity: 1,
                                }}
                            />
                            <p className="fs-5">The total period of stay for a specific skill status 1 worker is five years.</p>
                        </Col>
                        <Col md={4} className="p-4"><h2 className="text-start"> 12 fields covered</h2>

                            <hr
                                style={{
                                    border: "none",
                                    height: "6px",
                                    backgroundColor: "#b70000",
                                    margin: "1.5rem 0",
                                    opacity: 1,
                                }}
                            />

                            <p className="fs-5">The program targets 12 "specific industrial fields" where it is difficult to secure human resources.</p>
                        </Col>
                    </Row>
                    <Row className="text-center justify-content-center">
                        <Col xs={10}>
                            <img src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/09/aawtitle02.png" className="text-center skill-img img-fluid" alt="Flowchart 1" />
                        </Col>
                    </Row>
                </Col>

            </Row>

            {/* Classification*/}
            <Row className="bg-light py-5 justify-content-center text-center">

                <Col xs={10}>
                    <Row className="justify-content-center text-center">
                        <Col md={3} className="mt-5">
                            <img src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/05/s01.png" className="img-fluid" alt="Flowchart 1" />
                        </Col>
                        <Col md={3} className="mt-5">
                            <img src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/05/s02.png" className="img-fluid" alt="Flowchart 1" />
                        </Col>
                        <Col md={3} className="mt-5">
                            <img src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/09/s03.png" className="img-fluid" alt="Flowchart 1" />
                        </Col>
                        <Col md={3} className="mt-5">
                            <img src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/09/s04.png" className="img-fluid" alt="Flowchart 1" />
                        </Col>
                        <Col md={3} className="mt-5">
                            <img src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/09/s05.png" className="img-fluid" alt="Flowchart 1" />
                        </Col>
                        <Col md={3} className="mt-5">
                            <img src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/09/s06.png" className="img-fluid" alt="Flowchart 1" />
                        </Col>
                        <Col md={3} className="mt-5">
                            <img src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/09/s07.png" className="img-fluid" alt="Flowchart 1" />
                        </Col>
                        <Col md={3} className="mt-5">
                            <img src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/09/s08.png" className="img-fluid" alt="Flowchart 1" />
                        </Col>
                        <Col md={3} className="mt-5">
                            <img src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/09/s09.png" className="img-fluid" alt="Flowchart 1" />
                        </Col>
                        <Col md={3} className="mt-5">
                            <img src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/09/s10.png" className="img-fluid" alt="Flowchart 1" />
                        </Col>
                        <Col md={3} className="mt-5">
                            <img src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/09/s11.png" className="img-fluid" alt="Flowchart 1" />
                        </Col>
                        <Col md={3} className="mt-5">
                            <img src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/09/s12.png" className="img-fluid" alt="Flowchart 1" />
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* How to use*/}
            <Row className="text-center mt-5 mb-5 step-01">
                <h1>How to use <span className="text-danger">the Specified Skills System</span></h1>

                <Row className="justify-content-center">
                    <Col xs={10} md={9} className="border-border-danger">
                        <h3 className="">The host company will enter into a support contract with a registered support organization (TOYO Cooperative Association)</h3>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={10} md={9} className="border-border-danger">
                        <h3 className="">After the accepting company hires the foreign national who applied for the job, the accepting company and the foreign national enter into an employment contract.</h3>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={10} md={9} className="border-border-danger">
                        <h3 className="">Registered support organizations provide support to foreigners</h3>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={10} md={9}>
                        <img src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/09/g-02.png" alt="step 1" className="img-fluid mt-5" />
                    </Col>
                </Row>

            </Row>

            {/* STEP 02 */}
            <Row className="text-center mt-5 step-02 justify-content-center">
                <Col xs={10} >
                    <h1>Steps to start accepting <span className="text-danger">foreign nationals with specific skills</span></h1>
                    <img src="http://toyo-coop.jp/tcsweb/wp-content/uploads/2022/09/g-03.png" alt="step 1" className="img-fluid mt-5 mb-5" />
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
